# 🦖 Antigravity Caveman Mode — Save 75% of your AI Tokens!

> **"Why use many token when few do trick"**

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

---

## 🛠️ Requirements & Installation

1. Package and install the VSIX in your project workspace.
2. **Compress CLI requirement**: The command `Compress Active File` requires `python` or `python3` configured in your PATH.
