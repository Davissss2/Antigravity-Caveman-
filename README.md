# 🦖 Caveman Mode for Antigravity IDE

Toggle caveman token compression for Antigravity AI directly inside the IDE.

## Features

- **Status Bar Toggle**: Fast toggle and change intensity levels from the status bar.
- **Intensities**: Switch between `lite`, `full` (recommended), `ultra`, and Classical Chinese (`wenyan-lite`, `wenyan-full`, `wenyan-ultra`).
- **All 7 Skills Included**:
  - `caveman`: Default compression for all turns.
  - `caveman-commit`: Conventional Commits, ≤50 char subjects.
  - `caveman-review`: One-line PR feedback.
  - `caveman-compress`: Natural language file compression.
  - `cavecrew`: Presets for subagents.
  - `caveman-help`: Quick command reference card.
  - `caveman-stats`: Session token tracking.
- **Command Palette**: Run `🦖 Caveman: Compress Active File` to compress the current active markdown/text file on disk and create a backup.

## Commands

- `caveman.menu` (`🦖 Caveman: Open Menu`)
- `caveman.activate` (`🦖 Caveman: Activate`)
- `caveman.deactivate` (`🛑 Caveman: Deactivate`)
- `caveman.compressActiveFile` (`🦖 Caveman: Compress Active File`)

## Configuration

The extension updates your global rules in `~/.gemini/config/AGENTS.md` and installs skills to `~/.gemini/config/skills/`.
