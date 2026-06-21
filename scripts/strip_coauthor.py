import sys

msg = sys.stdin.read()
lines = [line for line in msg.splitlines(True) if not line.strip().startswith("Co-authored-by: Cursor")]
out = "".join(lines).replace(
    "Initial commit: Momo Cafe Memory game prototype for SEG3125",
    "Initial commit: Sora Cafe memory game for SEG3125",
)
if out and not out.endswith("\n"):
    out += "\n"
sys.stdout.write(out)
