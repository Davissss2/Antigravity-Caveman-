# 🦖 Antigravity Caveman Mode — Save 75% of your AI Tokens!

> **"Why use many token when few do trick"**

[![GitHub](https://img.shields.io/badge/GitHub-Davissss2%2FAntigravity--Caveman-181717?style=flat&logo=github)](https://github.com/Davissss2/Antigravity-Caveman-)
[![Issues](https://img.shields.io/github/issues/Davissss2/Antigravity-Caveman-?style=flat&label=Issues)](https://github.com/Davissss2/Antigravity-Caveman-/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)](https://github.com/Davissss2/Antigravity-Caveman-/blob/main/LICENSE)

Antigravity Caveman is a powerful extension that optimizes the context window and speed of your AI model in Antigravity IDE. It modifies system instructions and deploys specialized agent skills to make the model speak with maximum conciseness while preserving 100% technical accuracy.

---

## ⚡ Key Features

- **🚀 Token Reduction**: Save ~75% of output tokens, resulting in ~3x faster response times!
- **🌐 Universal Language Support**: Caveman compresses style, not language. Spanish, Portuguese, French, etc., stay intact.
- **🦖 Built-in Status Toggle**: Instantly activate, deactivate, or change levels via the VS Code Status Bar.
- **📂 One-Click File Compression**: Command to run Python-based compress script on natural language documents (`CLAUDE.md`, markdown notes) to shrink input tokens by ~46%.
- **🛠️ 7 Advanced Skills Included**: Seamlessly loaded by the IDE.

---

## 📊 Intensity Levels

| Level | Badge | Rule Description | Example Output |
| :--- | :---: | :--- | :--- |
| **lite** | ⬜ | Drop filler/hedging. Keep full sentences. | *"Wrap in `useMemo` to prevent re-renders caused by new object references."* |
| **full** | 🟦 | Classic caveman. Drop articles. Fragments OK. | *"New object ref each render. Inline object prop = re-render. Use `useMemo`."* |
| **ultra** | 🟥 | Telegraphic shorthand. Abbreviate prose terms. | *"Inline obj prop → new ref → re-render. `useMemo`."* |
| **wenyan-lite** | 🟨 | Classical Chinese grammar, light compression. | *"組件頻重繪，以每繪新生對象參照故。以 useMemo 包之。"* |
| **wenyan-full** | 🟧 | Fully 文言文 (Classical Chinese). | *"每繪新生對象參照，故重繪；以 useMemo 包之則免。"* |
| **wenyan-ultra**| 🟫 | Extreme Classical Chinese shorthand. | *"新參照→重繪。useMemo Wrap。"* |

---

## ⚙️ Skills Guide

When Caveman Mode is active, Antigravity has automatic access to the following slash commands and skills:

1. **`/caveman [lite|full|ultra|wenyan]`**: Switch the current conversation's compression level.
2. **`/caveman-commit`**: Automatically analyzes staged changes and generates a Conventional Commit message under 50 characters focusing on *why* rather than *what*.
3. **`/caveman-review`**: Audits a diff or file and generates a one-line code review finding list: `L123: 🔴 bug: user can be null. Add guard.`
4. **`/caveman-compress <file>`**: Rewrites reference markdown files in caveman speak, saving massive input token context.
5. **`/cavecrew`**: Presets guide to spawn subagents (`investigator`, `builder`, `reviewer`) with compressed output.
6. **`/caveman-help`**: Displays a reference card.
7. **`/caveman-stats`**: Session tracking data.

---

## ⌨️ Extension Commands

Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to access:

- **`🦖 Caveman: Open Menu`**: Opens the Status Bar QuickPick menu.
- **`🦖 Caveman: Activate`**: Direct activation prompt.
- **`🛑 Caveman: Deactivate`**: Instantly revert the AI to normal mode.
- **`🦖 Caveman: Compress Active File`**: Runs memory compression on the current open markdown/text document.
- **`🦖 Caveman: Generate Commit Message`**: Automatically gathers your staged git diff (falls back to unstaged or git status if nothing is staged), wraps it in `/caveman-commit`, and copies it to your clipboard for instant paste into the AI chat.
- **`🦖 Caveman: Code Review`**: Compiles the git diff of your active file (falls back to selection or full file text if no diff exists), formats it into `/caveman-review`, and copies it to your clipboard.
- **`🦖 Caveman: Show Session Stats`**: Scans the IDE conversation logs in the background and opens a dedicated VS Code Output Channel showing total output tokens, cached input tokens, and estimated cost savings.

---

## 🛠️ Requirements & Installation

1. Download the latest `.vsix` file from the [Releases page](https://github.com/Davissss2/Antigravity-Caveman-/releases) or the repository.
2. In Antigravity IDE: `Extensions` → `...` → `Install from VSIX`.
3. **Compress CLI requirement**: The command `Compress Active File` requires `python` or `python3` in your PATH.

---

## 🔗 Links

| | |
|---|---|
| 📦 **Repository** | [github.com/Davissss2/Antigravity-Caveman-](https://github.com/Davissss2/Antigravity-Caveman-) |
| 🐛 **Report a Bug** | [Open an Issue](https://github.com/Davissss2/Antigravity-Caveman-/issues/new?template=bug_report.md) |
| 💡 **Request a Feature** | [Open an Issue](https://github.com/Davissss2/Antigravity-Caveman-/issues/new?template=feature_request.md) |
| 📋 **All Issues** | [github.com/.../issues](https://github.com/Davissss2/Antigravity-Caveman-/issues) |
| 📜 **Changelog** | [CHANGELOG.md](https://github.com/Davissss2/Antigravity-Caveman-/blob/main/CHANGELOG.md) |
| ⚖️ **License** | [MIT](https://github.com/Davissss2/Antigravity-Caveman-/blob/main/LICENSE) |
| 🙏 **Based on** | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) |

---

## 🤝 Contributing

Pull requests welcome! Open an issue first for big changes.

1. Fork the repo
2. Create your branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m 'feat: add my feature'`
4. Push: `git push origin feat/my-feature`
5. Open a Pull Request

---

*Made with 🦖 by [Davissss2](https://github.com/Davissss2) — based on the excellent [caveman](https://github.com/JuliusBrussee/caveman) project by Julius Brussee.*
