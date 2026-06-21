from PIL import Image
import os

src = r"C:\Users\shiri\.cursor\projects\c-Users-shiri-OneDrive-Desktop-SEG3125-Assignment-3\assets\c__Users_shiri_AppData_Roaming_Cursor_User_workspaceStorage_3921fdbcfacbf6aacbc7efb6a1eef80f_images_image-793af637-1bb3-4ce4-83af-82b040346bcd.png"
out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "decor", "setup")
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src).convert("RGBA")

crops = {
    "parfait": (5, 15, 235, 285),
    "toaster": (235, 25, 495, 295),
    "berry-drink": (490, 35, 730, 305),
    "donut": (0, 285, 245, 535),
    "chocolate": (245, 310, 495, 575),
    "roses": (500, 295, 735, 535),
    "books": (10, 535, 245, 830),
    "tea-set": (250, 555, 500, 835),
    "lamp": (495, 535, 735, 880),
}


def trim_transparent(im, threshold=240):
    pixels = im.load()
    bw, bh = im.size
    for y in range(bh):
        for x in range(bw):
            r, g, b, a = pixels[x, y]
            if r > threshold and g > threshold and b > threshold:
                pixels[x, y] = (r, g, b, 0)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    return im


for name, box in crops.items():
    cropped = trim_transparent(img.crop(box))
    path = os.path.join(out_dir, f"{name}.png")
    cropped.save(path)
    print(name, cropped.size)

print("done")
