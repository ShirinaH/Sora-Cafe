import sys

msg = sys.stdin.read()
lines = [line for line in msg.splitlines(True) if not line.strip().startswith("Co-authored-by: Cursor")]
out = "".join(lines)
out = out.replace(
    "Initial commit: Momo Cafe Memory game prototype for SEG3125",
    "Initial commit: Sora Cafe memory game for SEG3125",
)
out = out.replace(
    "Fix GitHub Pages base path for Momo-s-Cafe-Memory-Game repo",
    "Fix GitHub Pages base path for Sora-Cafe repo",
)
if out and not out.endswith("\n"):
    out += "\n"
sys.stdout.write(out)
