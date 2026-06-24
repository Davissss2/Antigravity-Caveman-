const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const os = require('os');
const cp = require('child_process');

// ── Paths ──────────────────────────────────────────────────────────────────
const GLOBAL_CONFIG_DIR = path.join(os.homedir(), '.gemini', 'config');
const SKILLS_DIR        = path.join(GLOBAL_CONFIG_DIR, 'skills');
const AGENTS_MD         = path.join(GLOBAL_CONFIG_DIR, 'AGENTS.md');
const GEMINI_MD         = path.join(os.homedir(), '.gemini', 'GEMINI.md');
const CAVEMAN_START     = '<!-- CAVEMAN_START -->';
const CAVEMAN_END       = '<!-- CAVEMAN_END -->';

const CAVEMAN_SKILLS = ['caveman', 'caveman-commit', 'caveman-review', 'caveman-compress', 'cavecrew', 'caveman-help', 'caveman-stats'];

const INTENSITIES = {
  lite:          'No filler/hedging. Keep articles + full sentences. Professional but tight.',
  full:          'Smart caveman. Drop articles, pronouns, filler. Fragments OK. Short synonyms. No conversational padding, only direct technical facts.',
  ultra:         'Telegraphic mode. Zero verbs/pronouns/articles/framing. Output only raw keywords, symbols, and status. Abbreviate prose aggressively (DB/auth/config/req/res/fn/impl/err/usr/msg/env). Use X → Y for steps/causality. Max 3-5 words per line.',
  'wenyan-lite': 'Semi-classical Chinese. Drop filler/hedging, keep grammar structure, classical register.',
  'wenyan-full': 'Fully 文言文. 80-90% character reduction. Classical patterns, verbs before objects, classical particles (之/乃/為/其).',
  'wenyan-ultra':'Extreme classical Chinese abbreviation. Maximum compression, ultra terse.'
};

const INTENSITY_LABELS = {
  lite:          '⬜ lite   — drop filler, keep sentences',
  full:          '🟦 full   — classic caveman (default)',
  ultra:         '🟥 ultra  — extreme compression',
  'wenyan-lite': '🟨 wenyan-lite  — semi-classical Chinese',
  'wenyan-full': '🟧 wenyan-full  — full 文言文',
  'wenyan-ultra':'🟫 wenyan-ultra — extreme classical Chinese'
};

// ── State helpers ──────────────────────────────────────────────────────────
function isActive() {
  if (fs.existsSync(AGENTS_MD) && fs.readFileSync(AGENTS_MD, 'utf-8').includes(CAVEMAN_START)) return true;
  if (fs.existsSync(GEMINI_MD) && fs.readFileSync(GEMINI_MD, 'utf-8').includes(CAVEMAN_START)) return true;
  return false;
}

function getIntensity() {
  let content = '';
  if (fs.existsSync(AGENTS_MD)) content = fs.readFileSync(AGENTS_MD, 'utf-8');
  else if (fs.existsSync(GEMINI_MD)) content = fs.readFileSync(GEMINI_MD, 'utf-8');
  
  if (!content) return 'full';
  const m = content.match(/## Intensity Level: ([a-zA-Z0-9-]+)/);
  return m ? m[1] : 'full';
}

// ── File operations ────────────────────────────────────────────────────────
function installSkills(extensionPath) {
  if (!fs.existsSync(SKILLS_DIR)) fs.mkdirSync(SKILLS_DIR, { recursive: true });
  for (const skill of CAVEMAN_SKILLS) {
    const src  = path.join(extensionPath, 'skills', skill);
    const dest = path.join(SKILLS_DIR, skill);
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true, force: true });
    }
  }
}

// Write same block helper
function updateRuleFile(filePath, dirPath, block) {
  let content = '';
  if (fs.existsSync(filePath)) content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes(CAVEMAN_START)) {
    const s = content.indexOf(CAVEMAN_START);
    const e = content.indexOf(CAVEMAN_END) + CAVEMAN_END.length;
    content  = content.substring(0, s) + block + content.substring(e);
  } else {
    content = content.trim() ? content.trim() + '\n\n' + block : block;
  }

  if (dirPath && !fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}

// Remove block helper
function removeRuleFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes(CAVEMAN_START)) return;

  const s    = content.indexOf(CAVEMAN_START);
  const e    = content.indexOf(CAVEMAN_END) + CAVEMAN_END.length;
  const pre  = content.substring(0, s).trim();
  const post = content.substring(e).trim();
  content    = [pre, post].filter(Boolean).join('\n\n');

  if (!content.trim()) fs.rmSync(filePath, { force: true });
  else fs.writeFileSync(filePath, content, 'utf-8');
}

function removeSkills() {
  for (const skill of CAVEMAN_SKILLS) {
    const dest = path.join(SKILLS_DIR, skill);
    if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
  }
}

function writeAgentsMd(intensity) {
  const block = `${CAVEMAN_START}
# Caveman Mode Rules (Active)
Respond terse like smart caveman. All technical substance stay. Only fluff die.

## Persistence
ACTIVE EVERY RESPONSE. No revert after many turns. No filler drift. Still active if unsure. Off only: "stop caveman" / "normal mode".

## Intensity Level: ${intensity}
Rule: ${INTENSITIES[intensity]}

## General Rules
- Drop: articles (a/an/the), filler (just/really/basically/actually/simply), pleasantries (sure/certainly/of course/happy to), hedging. Fragments OK. Short synonyms (big not extensive, fix not "implement a solution for"). No tool-call narration, no decorative tables/emoji, no dumping long raw error logs unless asked. Standard well-known tech acronyms OK. Technical terms exact. Code blocks unchanged. Errors quoted exact.
- Preserve user's dominant language.
- No self-reference. Never name or announce the style. No "caveman mode on", "me caveman think", no third-person caveman tags.
- Pattern: \`[thing] [action] [reason]. [next step].\`
${CAVEMAN_END}`;

  // Clean old AGENTS.md to avoid duplicate global rules in UI
  removeRuleFile(AGENTS_MD);
  
  // Write only to GEMINI.md (which is user-facing global rules file)
  updateRuleFile(GEMINI_MD, path.dirname(GEMINI_MD), block);
}

function removeFromAgentsMd() {
  removeRuleFile(AGENTS_MD);
  removeRuleFile(GEMINI_MD);
}

// ── Status bar ─────────────────────────────────────────────────────────────
function updateStatusBar(bar) {
  if (isActive()) {
    const intensity = getIntensity();
    bar.text        = `🦖 Caveman: ${intensity}`;
    bar.tooltip     = 'Caveman Mode is ACTIVE — click to change or deactivate';
    bar.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
  } else {
    bar.text        = '👤 Caveman: off';
    bar.tooltip     = 'Caveman Mode is OFF — click to activate';
    bar.backgroundColor = undefined;
  }
}

// ── Main menu ──────────────────────────────────────────────────────────────
async function openMenu(bar, extensionPath) {
  const active = isActive();
  const items  = [];

  if (active) {
    const cur = getIntensity();
    items.push({ label: '🛑 Deactivate Caveman Mode', action: 'deactivate' });
    items.push({ label: '$(blank)', kind: vscode.QuickPickItemKind.Separator });
    items.push({ label: 'Change intensity:', kind: vscode.QuickPickItemKind.Separator });
    for (const [key, label] of Object.entries(INTENSITY_LABELS)) {
      items.push({
        label: (key === cur ? '$(check) ' : '       ') + label,
        action: 'intensity',
        intensity: key
      });
    }
  } else {
    items.push({ label: '🦖 Activate Caveman Mode', action: 'activate_prompt' });
  }

  const pick = await vscode.window.showQuickPick(items, {
    title: '🦖 Caveman Mode',
    placeHolder: active ? `Active — intensity: ${getIntensity()}` : 'Inactive'
  });
  if (!pick) return;

  if (pick.action === 'deactivate') {
    removeSkills();
    removeFromAgentsMd();
    vscode.window.showInformationMessage('🛑 Caveman Mode deactivated. AI back to normal.');
  } else if (pick.action === 'activate_prompt') {
    const intensityPick = await vscode.window.showQuickPick(
      Object.entries(INTENSITY_LABELS).map(([key, label]) => ({ label, key })),
      { title: '🦖 Choose intensity level', placeHolder: 'full = classic caveman (recommended)' }
    );
    if (!intensityPick) return;
    installSkills(extensionPath);
    writeAgentsMd(intensityPick.key);
    vscode.window.showInformationMessage(`🦖 Caveman Mode activated! Intensity: ${intensityPick.key}`);
  } else if (pick.action === 'intensity') {
    installSkills(extensionPath);
    writeAgentsMd(pick.intensity);
    vscode.window.showInformationMessage(`🦖 Intensity changed to: ${pick.intensity}`);
  }

  updateStatusBar(bar);
}

// ── Compress command helper ────────────────────────────────────────────────
async function compressActiveFile(extensionPath) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('❌ No active editor found.');
    return;
  }
  const filePath = editor.document.fileName;
  if (!fs.existsSync(filePath)) {
    vscode.window.showErrorMessage('❌ File does not exist on disk.');
    return;
  }

  // File extension/type check
  const allowedExts = ['.md', '.txt', '.typ', '.typst', '.tex'];
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath).toLowerCase();
  const isExtensionless = ext === '';
  const isAllowed = allowedExts.includes(ext) || isExtensionless;

  if (!isAllowed) {
    vscode.window.showErrorMessage('❌ File is not a natural language file (Markdown, text, etc.).');
    return;
  }

  vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: "🦖 Caveman compressing file...",
    cancellable: false
  }, async (progress) => {
    return new Promise((resolve) => {
      const pythonCmd = os.platform() === 'win32' ? 'python' : 'python3';
      const skillPath = path.join(GLOBAL_CONFIG_DIR, 'skills', 'caveman-compress');
      
      if (!fs.existsSync(skillPath)) {
        vscode.window.showErrorMessage('❌ caveman-compress skill is not installed. Please activate Caveman Mode first.');
        resolve();
        return;
      }

      const child = cp.spawn(pythonCmd, ['-m', 'scripts', filePath], {
        cwd: skillPath,
        env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => { stdout += data.toString(); });
      child.stderr.on('data', (data) => { stderr += data.toString(); });

      child.on('close', (code) => {
        if (code === 0) {
          vscode.window.showInformationMessage(`🦖 File compressed successfully! Backup created.`);
        } else {
          vscode.window.showErrorMessage(`❌ Compression failed (code ${code}):\n${stdout || stderr}`);
        }
        resolve();
      });
    });
  });
}

// ── Activate extension ─────────────────────────────────────────────────────
function activate(context) {
  const bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  bar.command = 'caveman.menu';
  updateStatusBar(bar);
  bar.show();
  context.subscriptions.push(bar);

  context.subscriptions.push(
    vscode.commands.registerCommand('caveman.menu', () => openMenu(bar, context.extensionPath))
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('caveman.activate', async () => {
      const pick = await vscode.window.showQuickPick(
        Object.entries(INTENSITY_LABELS).map(([key, label]) => ({ label, key })),
        { title: '🦖 Choose intensity level' }
      );
      if (!pick) return;
      installSkills(context.extensionPath);
      writeAgentsMd(pick.key);
      updateStatusBar(bar);
      vscode.window.showInformationMessage(`🦖 Caveman Mode activated! Intensity: ${pick.key}`);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('caveman.deactivate', () => {
      removeSkills();
      removeFromAgentsMd();
      updateStatusBar(bar);
      vscode.window.showInformationMessage('🛑 Caveman Mode deactivated.');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('caveman.compressActiveFile', () => {
      compressActiveFile(context.extensionPath);
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
