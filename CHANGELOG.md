# Changelog

## 1.6.0

- **Fixed mode-switching sync bug**: Changing caveman intensity (e.g. from `nano` to `ultra` or vice versa) or deactivating it via VS Code Status Bar Menu or web dashboard now correctly synchronizes the `.caveman-active` flag file, ensuring active terminal sessions immediately reflect the updated style rules instead of staying locked to the previous mode.
- **Detailed Documentation**: Fully updated and improved the README.md and codebase instructions for all commands, capabilities, and settings.

## 1.5.0

- **Fixed Rules Target Path**: Writes strictly to `~/.gemini/config/AGENTS.md` instead of `GEMINI.md` so Antigravity IDE immediately loads the custom rule configurations.
- **Enhanced ultra mode**: Strictly bans conversational words, limits prose to 10-15 tokens, and outputs code/diffs only.
- **Added nano mode**: Extreme symbolic compression level using mathematical and logical symbols (∴, ∵, ⇒, ∅, +, -) for maximum token savings with zero prose.
- **Dynamic Context VS Code Commands**:
  - `🦖 Caveman: Generate Commit Message`: Automatically runs `git diff --cached` (falls back to unstaged diff / status), formats the prompt, and copies it to the clipboard.
  - `🦖 Caveman: Code Review`: Dynamically compiles active file diff (falls back to selection / full text), formats the review request, and copies it to the clipboard.
  - `🦖 Caveman: Show Session Stats`: Scans session logs and displays actual token metrics, turns, and estimated savings in a custom VS Code Output Channel.

## 1.3.0

- **full** mode now drops articles, pronouns and filler — less chatter, only technical facts.
- **ultra** mode now fully telegraphic: zero verbs/pronouns/articles, raw keywords only, X → Y causality, max 3-5 words per line.
- Updated SKILL.md intensity table to reflect new definitions.
- Packaged as `antigravity-caveman-1.3.0.vsix`.

## 1.1.0

- Ported missing skills: `cavecrew`, `caveman-help`, `caveman-stats`.
- Added command `caveman.compressActiveFile` (`🦖 Caveman: Compress Active File`) to run Python compress script on current file.
- Added README.md and CHANGELOG.md documentation.

## 1.0.0

- Initial release.
- Status bar item and QuickPick menu.
- Caveman modes: `lite`, `full`, `ultra`, `wenyan-lite`, `wenyan-full`, `wenyan-ultra`.
- Core skills: `caveman`, `caveman-commit`, `caveman-review`, `caveman-compress`.
