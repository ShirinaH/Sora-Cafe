from PIL import Image
import os

script_dir = os.path.dirname(__file__)
setup_dir = os.path.join(script_dir, "..", "public", "decor", "setup")

items = [
    "parfait.png",
    "toaster.png",
    "berry-drink.png",
    "donut.png",
    "chocolate.png",
    "roses.png",
    "books.png",
    "tea-set.png",
    "lamp.png",
]

images = [Image.open(os.path.join(setup_dir, name)).convert("RGBA") for name in items]

gap = 48
target_height = 100
resized = []
for img in images:
    scale = target_height / img.height
    new_w = int(img.width * scale)
    resized.append(img.resize((new_w, target_height), Image.Resampling.LANCZOS))

total_width = sum(im.width for im in resized) + gap * (len(resized) - 1)
strip = Image.new("RGBA", (total_width, target_height), (0, 0, 0, 0))

x = 0
for im in resized:
    strip.paste(im, (x, 0), im)
    x += im.width + gap

out_path = os.path.join(setup_dir, "decor-strip.png")
strip.save(out_path)
print("saved", out_path, strip.size)
