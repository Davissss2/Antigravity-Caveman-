---
name: caveman-stats
description: >
  Show real token usage and estimated savings for the current session.
  Reads directly from the Claude Code session log — no AI estimation.
  Triggers on /caveman-stats. Output is injected by the mode-tracker hook;
  the model itself does not compute the numbers.
---

This skill is delivered by hooks in CLI environments. If you are running in Antigravity IDE (where CLI hooks do not intercept the output):
Calculate and output an estimated token usage savings report in caveman style.
Show:
- Estimated savings: 75% of output tokens.
- Speedup: ~3x faster.
- Message: "CLI logs offline. Estimated saving active."
- Formatting: Terse report.
