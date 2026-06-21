"""Generate persona cards and storyboard mockup PNGs for SEG3125 Assignment 3."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assignment-images"


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        if draw.textlength(test, font=font) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines or [""]


def draw_bullet_block(
    draw: ImageDraw.ImageDraw,
    x: int,
    y: int,
    width: int,
    title: str,
    items: list[str],
    title_font,
    body_font,
    title_color: str,
    body_color: str,
) -> int:
    draw.text((x, y), title, font=title_font, fill=title_color)
    y += title_font.size + 10
    for item in items:
        lines = wrap_text(draw, item, body_font, width - 24)
        draw.ellipse((x, y + 6, x + 8, y + 14), fill=title_color)
        draw.text((x + 18, y), lines[0], font=body_font, fill=body_color)
        y += body_font.size + 6
        for extra in lines[1:]:
            draw.text((x + 18, y), extra, font=body_font, fill=body_color)
            y += body_font.size + 4
        y += 8
    return y


def draw_persona_card(
    filename: str,
    name: str,
    age_role: str,
    accent: str,
    bg: str,
    surface: str,
    characteristics: list[str],
    tech: str,
    domain: str,
    goal: str,
    emoji: str,
) -> None:
    w, h = 900, 1100
    img = Image.new("RGB", (w, h), bg)
    draw = ImageDraw.Draw(img)

    title_font = load_font(34, bold=True)
    sub_font = load_font(22)
    section_font = load_font(20, bold=True)
    body_font = load_font(18)
    label_font = load_font(14, bold=True)

    draw.rounded_rectangle((40, 40, w - 40, h - 40), radius=28, fill=surface, outline=accent, width=3)
    draw.rounded_rectangle((80, 80, 820, 280), radius=120, fill=accent)
    draw.text((450, 170), emoji, font=load_font(96), fill="white", anchor="mm")

    draw.text((450, 320), name, font=title_font, fill="#2f2f2f", anchor="mm")
    draw.text((450, 365), age_role, font=sub_font, fill="#666666", anchor="mm")

    y = 420
    y = draw_bullet_block(
        draw, 90, y, 720, "Intrinsic characteristics", characteristics,
        section_font, body_font, accent, "#333333",
    )
    y += 10
    draw.text((90, y), "Relation to technology", font=section_font, fill=accent)
    y += section_font.size + 8
    for line in wrap_text(draw, tech, body_font, 720):
        draw.text((90, y), line, font=body_font, fill="#333333")
        y += body_font.size + 4
    y += 16
    draw.text((90, y), "Relation to domain (café / memory games)", font=section_font, fill=accent)
    y += section_font.size + 8
    for line in wrap_text(draw, domain, body_font, 720):
        draw.text((90, y), line, font=body_font, fill="#333333")
        y += body_font.size + 4
    y += 16
    draw.rounded_rectangle((90, y, 810, y + 120), radius=16, fill=bg, outline=accent, width=2)
    draw.text((110, y + 16), "GOAL", font=label_font, fill=accent)
    gy = y + 42
    for line in wrap_text(draw, goal, body_font, 680):
        draw.text((110, gy), line, font=body_font, fill="#222222")
        gy += body_font.size + 4

    draw.text((450, h - 70), "Sora Café Memory · Persona", font=load_font(14), fill="#888888", anchor="mm")
    img.save(OUT / "personas" / filename)


def draw_phone_frame(draw, x, y, pw, ph, title, accent, bg):
    draw.rounded_rectangle((x, y, x + pw, y + ph), radius=24, fill="#ffffff", outline="#cccccc", width=2)
    draw.rounded_rectangle((x + 16, y + 16, x + pw - 16, y + 56), radius=12, fill=accent)
    draw.text((x + pw // 2, y + 36), title, font=load_font(16, bold=True), fill="white", anchor="mm")
    draw.rounded_rectangle((x + 16, y + 72, x + pw - 16, y + ph - 16), radius=16, fill=bg)


def draw_menu_grid(draw, x, y, cols, rows, cell, gap, colors):
    idx = 0
    for r in range(rows):
        for c in range(cols):
            cx = x + c * (cell + gap)
            cy = y + r * (cell + gap)
            draw.rounded_rectangle((cx, cy, cx + cell, cy + cell), radius=10, fill=colors[idx % len(colors)], outline="#ffffff", width=2)
            idx += 1


def draw_storyboard_a_level() -> None:
    w, h = 1000, 700
    img = Image.new("RGB", (w, h), "#E8F2FA")
    draw = ImageDraw.Draw(img)
    draw.text((500, 36), "Storyboard A: Minimal Sky · Step 1: Level & Options", font=load_font(22, bold=True), fill="#3A6EA5", anchor="mm")

    pw, ph = 420, 560
    x, y = 60, 90
    draw_phone_frame(draw, x, y, pw, ph, "Sora Café · Level Map", "#7BAFD4", "#E8F2FA")
    ix, iy = x + 36, y + 100
    for i, (label, active) in enumerate([
        ("Counter · Morning Rush", True),
        ("Patio · Afternoon Tea", False),
        ("Rooftop · Sunset Shift", False),
    ]):
        cy = iy + i * 92
        fill = "#FFFFFF" if not active else "#D6EBFA"
        outline = "#7BAFD4" if active else "#C8DFF0"
        draw.rounded_rectangle((ix, cy, ix + 348, cy + 72), radius=14, fill=fill, outline=outline, width=2 if active else 1)
        draw.text((ix + 18, cy + 22), label, font=load_font(16, bold=active), fill="#2F5678")
        if active:
            draw.text((ix + 300, cy + 24), "▶", font=load_font(16), fill="#7BAFD4")

    x2 = 520
    draw_phone_frame(draw, x2, y, pw, ph, "Shift Setup", "#7BAFD4", "#F7FBFF")
    sx, sy = x2 + 36, y + 100
    draw.text((sx, sy), "Menu Set", font=load_font(14, bold=True), fill="#3A6EA5")
    chips = ["Sweets", "Teaware", "Full Café"]
    cx = sx
    for chip in chips:
        active = chip == "Full Café"
        draw.rounded_rectangle((cx, sy + 28, cx + 98, sy + 58), radius=16, fill="#7BAFD4" if active else "#EEF6FC", outline="#7BAFD4", width=1)
        draw.text((cx + 49, sy + 43), chip, font=load_font(12, bold=True), fill="white" if active else "#3A6EA5", anchor="mm")
        cx += 108
    draw.text((sx, sy + 90), "Difficulty", font=load_font(14, bold=True), fill="#3A6EA5")
    for i, chip in enumerate(["Beginner", "Advanced"]):
        active = chip == "Beginner"
        draw.rounded_rectangle((sx + i * 118, sy + 118, sx + i * 118 + 108, sy + 148), radius=16, fill="#7BAFD4" if active else "#EEF6FC", outline="#7BAFD4", width=1)
        draw.text((sx + i * 118 + 54, sy + 133), chip, font=load_font(12, bold=True), fill="white" if active else "#3A6EA5", anchor="mm")
    draw.rounded_rectangle((sx, sy + 190, sx + 348, sy + 240), radius=18, fill="#7BAFD4")
    draw.text((sx + 174, sy + 215), "Start Shift", font=load_font(18, bold=True), fill="white", anchor="mm")

    img.save(OUT / "storyboard-a" / "01-level-and-options.png")


def draw_storyboard_a_gameplay() -> None:
    w, h = 1000, 700
    img = Image.new("RGB", (w, h), "#E8F2FA")
    draw = ImageDraw.Draw(img)
    draw.text((500, 36), "Storyboard A: Minimal Sky · Step 2: Gameplay & Feedback", font=load_font(22, bold=True), fill="#3A6EA5", anchor="mm")

    pw, ph = 420, 560
    x, y = 60, 90
    draw_phone_frame(draw, x, y, pw, ph, "Recall Phase · Correct", "#7BAFD4", "#E8F2FA")
    draw.text((x + pw // 2, y + 92), "Customer Order", font=load_font(14, bold=True), fill="#3A6EA5", anchor="mm")
    tray_x, tray_y = x + 70, y + 118
    for i, color in enumerate(["#F5C6D0", "#C8E6C9", "#FFF3B0"]):
        draw.rounded_rectangle((tray_x + i * 88, tray_y, tray_x + i * 88 + 72, tray_y + 72), radius=12, fill=color, outline="#7BAFD4", width=2)
    draw.text((x + pw // 2, y + 220), "Tap items in order · 2 / 3", font=load_font(13), fill="#5A7FA0", anchor="mm")
    colors = ["#F5C6D0", "#B3E5FC", "#FFF3B0", "#C8E6C9", "#E1BEE7", "#FFCCBC"]
    draw_menu_grid(draw, x + 56, y + 250, 3, 2, 56, 14, colors)
    draw.text((x + pw // 2, y + 430), "♥ ♥ ♡   Replay hint available", font=load_font(13), fill="#7BAFD4", anchor="mm")
    draw.rounded_rectangle((x + 90, y + 460, x + pw - 90, y + 500), radius=12, fill="#DFF3E5", outline="#7BC47F", width=2)
    draw.text((x + pw // 2, y + 480), "Nice! Correct item.", font=load_font(14, bold=True), fill="#3D7A45", anchor="mm")

    x2 = 520
    draw_phone_frame(draw, x2, y, pw, ph, "Recall Phase · Wrong", "#7BAFD4", "#E8F2FA")
    draw.text((x2 + pw // 2, y + 92), "Customer Order", font=load_font(14, bold=True), fill="#3A6EA5", anchor="mm")
    for i, color in enumerate(["#F5C6D0", "#FFCDD2", "#FFF3B0"]):
        outline = "#D9534F" if i == 1 else "#7BAFD4"
        draw.rounded_rectangle((tray_x - x + x2 + i * 88, tray_y, tray_x - x + x2 + i * 88 + 72, tray_y + 72), radius=12, fill=color, outline=outline, width=3 if i == 1 else 2)
    draw_menu_grid(draw, x2 + 56, y + 250, 3, 2, 56, 14, colors)
    draw.rounded_rectangle((x2 + 90, y + 460, x2 + pw - 90, y + 500), radius=12, fill="#FCE4E4", outline="#D9534F", width=2)
    draw.text((x2 + pw // 2, y + 480), "Oops. Try the sequence again.", font=load_font(14, bold=True), fill="#A94442", anchor="mm")

    img.save(OUT / "storyboard-a" / "02-gameplay-feedback.png")


def draw_storyboard_a_end() -> None:
    w, h = 1000, 700
    img = Image.new("RGB", (w, h), "#E8F2FA")
    draw = ImageDraw.Draw(img)
    draw.text((500, 36), "Storyboard A: Minimal Sky · Step 3: End of Game", font=load_font(22, bold=True), fill="#3A6EA5", anchor="mm")

    pw, ph = 420, 560
    x, y = 290, 90
    draw_phone_frame(draw, x, y, pw, ph, "Shift Complete", "#7BAFD4", "#F7FBFF")
    cx = x + pw // 2
    draw.text((cx, y + 130), "Shift Complete!", font=load_font(28, bold=True), fill="#2F5678", anchor="mm")
    draw.text((cx, y + 175), "Morning Rush · Counter", font=load_font(15), fill="#5A7FA0", anchor="mm")
    for i, filled in enumerate([True, True, False]):
        color = "#FFD966" if filled else "#D8E6F0"
        draw.text((cx - 50 + i * 50, y + 220), "★", font=load_font(36), fill=color, anchor="mm")
    draw.text((cx, y + 290), "Every order served perfectly.\nWell done!", font=load_font(16), fill="#3A6EA5", anchor="mm")
    draw.rounded_rectangle((cx - 130, y + 360, cx + 130, y + 410), radius=18, fill="#7BAFD4")
    draw.text((cx, y + 385), "Next Shift", font=load_font(17, bold=True), fill="white", anchor="mm")
    draw.rounded_rectangle((cx - 130, y + 430, cx + 130, y + 475), radius=18, fill="#EEF6FC", outline="#7BAFD4", width=2)
    draw.text((cx, y + 452), "Back to Map", font=load_font(16, bold=True), fill="#3A6EA5", anchor="mm")

    img.save(OUT / "storyboard-a" / "03-end-of-game.png")


def draw_storyboard_b_level() -> None:
    w, h = 1000, 700
    img = Image.new("RGB", (w, h), "#FFF5EB")
    draw = ImageDraw.Draw(img)
    draw.text((500, 36), "Storyboard B: Cozy Counter · Step 1: Level & Options", font=load_font(22, bold=True), fill="#8B6558", anchor="mm")

    pw, ph = 460, 560
    x, y = 40, 90
    draw.rounded_rectangle((x, y, x + pw, y + ph), radius=24, fill="#FFF9F2", outline="#D4B8A8", width=2)
    draw.text((x + pw // 2, y + 34), "Choose Your Shift", font=load_font(20, bold=True), fill="#5C4338", anchor="mm")
    sy = y + 80
    for label, active in [
        ("1  Counter · Morning Rush", True),
        ("2  Patio · Afternoon Tea", False),
        ("3  Rooftop · Sunset Shift", False),
    ]:
        fill = "#F0DCC8" if active else "#FFF9F2"
        draw.rounded_rectangle((x + 24, sy, x + pw - 24, sy + 72), radius=12, fill=fill, outline="#C49090", width=3 if active else 1)
        draw.text((x + 44, sy + 24), label, font=load_font(17, bold=active), fill="#5C4338")
        sy += 88

    x2 = 520
    draw.rounded_rectangle((x2, y, x2 + 440, y + ph), radius=24, fill="#FFF9F2", outline="#D4B8A8", width=2)
    draw.text((x2 + 220, y + 34), "Large Setup Panel", font=load_font(20, bold=True), fill="#5C4338", anchor="mm")
    sx = x2 + 30
    sy = y + 90
    sections = [
        ("Menu Set", ["Sweets", "Teaware", "Full Café"], 2),
        ("Difficulty", ["Beginner", "Advanced"], 0),
        ("Sound", ["On", "Off"], 1),
    ]
    for title, opts, active_idx in sections:
        draw.text((sx, sy), title, font=load_font(16, bold=True), fill="#8B6558")
        oy = sy + 28
        for i, opt in enumerate(opts):
            active = i == active_idx
            draw.rounded_rectangle((sx, oy + i * 52, sx + 380, oy + i * 52 + 44), radius=10, fill="#C49090" if active else "#F5EBE0", outline="#8B6558", width=2 if active else 1)
            draw.text((sx + 20, oy + i * 52 + 12), opt, font=load_font(18, bold=active), fill="white" if active else "#5C4338")
        sy = oy + len(opts) * 52 + 24
    draw.rounded_rectangle((sx, sy + 10, sx + 380, sy + 62), radius=14, fill="#8B6558")
    draw.text((sx + 190, sy + 36), "Begin Shift", font=load_font(20, bold=True), fill="white", anchor="mm")

    img.save(OUT / "storyboard-b" / "01-level-and-options.png")


def draw_storyboard_b_gameplay() -> None:
    w, h = 1000, 700
    img = Image.new("RGB", (w, h), "#FFF5EB")
    draw = ImageDraw.Draw(img)
    draw.text((500, 36), "Storyboard B: Cozy Counter · Step 2: Gameplay & Feedback", font=load_font(22, bold=True), fill="#8B6558", anchor="mm")

    pw, ph = 920, 560
    x, y = 40, 90
    draw.rounded_rectangle((x, y, x + pw, y + ph), radius=24, fill="#FFF9F2", outline="#D4B8A8", width=2)

    draw.rounded_rectangle((x + 20, y + 20, x + 220, y + ph - 20), radius=16, fill="#F5EBE0", outline="#D4B8A8", width=1)
    draw.text((x + 120, y + 50), "Shift Info", font=load_font(16, bold=True), fill="#8B6558", anchor="mm")
    draw.text((x + 120, y + 90), "Lives\n♥ ♥ ♡", font=load_font(18), fill="#C49090", anchor="mm")
    draw.text((x + 120, y + 170), "Step 2 of 4", font=load_font(15, bold=True), fill="#5C4338", anchor="mm")
    draw.text((x + 120, y + 220), "Sound: Off", font=load_font(14), fill="#8A7268", anchor="mm")
    draw.rounded_rectangle((x + 40, y + 280, x + 200, y + 330), radius=10, fill="#E8D0C4")
    draw.text((x + 120, y + 305), "Replay Hint", font=load_font(14, bold=True), fill="#5C4338", anchor="mm")

    main_x = x + 250
    draw.text((main_x + 300, y + 50), "Remember the Order", font=load_font(22, bold=True), fill="#5C4338", anchor="mm")
    for i, color in enumerate(["#E8C4B8", "#C8E6C9", "#FFF3B0", "#D4C4E8"]):
        draw.rounded_rectangle((main_x + 80 + i * 92, y + 90, main_x + 80 + i * 92 + 76, y + 166), radius=12, fill=color, outline="#C49090", width=2)
    draw.text((main_x + 300, y + 200), "Tap large menu buttons below", font=load_font(15), fill="#8A7268", anchor="mm")
    colors = ["#E8C4B8", "#B3E5FC", "#FFF3B0", "#C8E6C9", "#E1BEE7", "#FFCCBC"]
    for i, color in enumerate(colors):
        cx = main_x + 40 + (i % 3) * 130
        cy = y + 240 + (i // 3) * 120
        draw.rounded_rectangle((cx, cy, cx + 110, cy + 96), radius=14, fill=color, outline="#8B6558", width=2)
    draw.rounded_rectangle((main_x + 80, y + 470, main_x + 520, y + 520), radius=12, fill="#DFF3E5", outline="#7BC47F", width=2)
    draw.text((main_x + 300, y + 495), "Correct! Keep going.", font=load_font(16, bold=True), fill="#3D7A45", anchor="mm")

    img.save(OUT / "storyboard-b" / "02-gameplay-feedback.png")


def draw_storyboard_b_end() -> None:
    w, h = 1000, 700
    img = Image.new("RGB", (w, h), "#FFF5EB")
    draw = ImageDraw.Draw(img)
    draw.text((500, 36), "Storyboard B: Cozy Counter · Step 3: End of Game", font=load_font(22, bold=True), fill="#8B6558", anchor="mm")

    pw, ph = 460, 560
    x, y = 270, 90
    draw.rounded_rectangle((x, y, x + pw, y + ph), radius=24, fill="#FFF9F2", outline="#D4B8A8", width=2)
    cx = x + pw // 2
    draw.text((cx, y + 120), "Shift Over", font=load_font(30, bold=True), fill="#5C4338", anchor="mm")
    draw.text((cx, y + 175), "Morning Rush · Counter", font=load_font(16), fill="#8A7268", anchor="mm")
    draw.text((cx, y + 240), "Don't worry. Even the best\nbaristas need practice.\nTry again!", font=load_font(17), fill="#5C4338", anchor="mm")
    draw.rounded_rectangle((cx - 150, y + 340, cx + 150, y + 405), radius=16, fill="#C49090")
    draw.text((cx, y + 372), "Try Again", font=load_font(20, bold=True), fill="white", anchor="mm")
    draw.rounded_rectangle((cx - 150, y + 425, cx + 150, y + 480), radius=16, fill="#F5EBE0", outline="#8B6558", width=2)
    draw.text((cx, y + 452), "Back to Map", font=load_font(17, bold=True), fill="#5C4338", anchor="mm")

    img.save(OUT / "storyboard-b" / "03-end-of-game.png")


def main() -> None:
    (OUT / "personas").mkdir(parents=True, exist_ok=True)
    (OUT / "storyboard-a").mkdir(parents=True, exist_ok=True)
    (OUT / "storyboard-b").mkdir(parents=True, exist_ok=True)

    draw_persona_card(
        "persona-yuki.png",
        "Yuki Tanabe",
        "22 · Design student",
        "#7BAFD4",
        "#E8F2FA",
        "#FFFFFF",
        [
            "Visual-oriented: notices color, spacing, and cute details first",
            "Plays in short 5-10 minute sessions between classes",
            "Prefers calm, polished interfaces without harsh sounds or timers",
        ],
        "Daily laptop user; comfortable with web apps, design tools, and mobile browsers.",
        "Enjoys cozy Japanese café aesthetics and casual puzzle games on itch.io.",
        "Relax between classes with a cute, low-stress memory game that feels aesthetically pleasing.",
        "🎨",
    )

    draw_persona_card(
        "persona-tanaka.png",
        "Mr. Kenji Tanaka",
        "58 · Retired office worker",
        "#C49090",
        "#FFF5EB",
        "#FFF9F2",
        [
            "Patient and methodical: reads instructions before tapping",
            "Values clarity over flashy animation",
            "Mild interest in keeping memory sharp with gentle daily practice",
        ],
        "Uses a tablet at home; prefers large buttons, readable text, and predictable navigation.",
        "Occasionally visits neighborhood cafés; curious about barista work but new to memory games.",
        "Do a gentle daily memory exercise without time pressure in Beginner mode with sound off.",
        "☕",
    )

    draw_storyboard_a_level()
    draw_storyboard_a_gameplay()
    draw_storyboard_a_end()
    draw_storyboard_b_level()
    draw_storyboard_b_gameplay()
    draw_storyboard_b_end()

    print(f"Generated images in {OUT}")


if __name__ == "__main__":
    main()
