from PIL import Image
import numpy as np
from scipy import ndimage
import os

src = r"C:\Users\shiri\.cursor\projects\c-Users-shiri-OneDrive-Desktop-SEG3125-Assignment-3\assets\c__Users_shiri_AppData_Roaming_Cursor_User_workspaceStorage_3921fdbcfacbf6aacbc7efb6a1eef80f_images_image-2cb37b8c-67f6-431f-b66a-47c394ae902a.png"
out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "menu")
os.makedirs(out_dir, exist_ok=True)

sheet = Image.open(src).convert("RGBA")
sheet_w, sheet_h = sheet.size

# Tight regions — one sticker per box. (name, box, allow_multi_part)
crops = [
    ("strawberry-parfait", (39, 58, 145, 250), False),
    ("strawberry-shortcake", (190, 67, 418, 264), False),
    ("mitarashi-dango-trio", (422, 51, 608, 178), True),
    ("cookie-box", (31, 251, 226, 380), True),
    ("mitarashi-dango", (245, 272, 395, 355), False),
    ("fruit-parfait-tall", (478, 188, 620, 425), False),
    ("citrus-parfait", (37, 396, 162, 597), False),
    ("custard-purin", (180, 372, 398, 506), False),
    ("ube-soft-serve", (330, 250, 518, 455), False),
    ("taiyaki-duo", (161, 521, 300, 615), True),
    ("taiyaki-trio", (304, 515, 481, 641), True),
    ("deluxe-parfait", (468, 432, 625, 648), False),
    ("anmitsu", (32, 612, 192, 765), False),
    ("checkered-cake", (179, 660, 374, 780), True),
    ("melon-pan", (391, 639, 618, 769), True),
    ("daifuku-mochi", (33, 775, 235, 908), True),
    ("macaron-pair", (252, 797, 399, 908), True),
    ("dorayaki-duo", (422, 783, 617, 904), True),
]

MULTI_PART = {
    "mitarashi-dango-trio",
    "cookie-box",
    "taiyaki-duo",
    "taiyaki-trio",
    "checkered-cake",
    "melon-pan",
    "daifuku-mochi",
    "macaron-pair",
    "dorayaki-duo",
}

# Stickers whose white halos split the art into separate fragments in one crop box.
SPLIT_HALO = {
    "ube-soft-serve",
}


def clamp_box(box):
    x0, y0, x1, y1 = box
    return max(0, x0), max(0, y0), min(sheet_w, x1), min(sheet_h, y1)


def is_sheet_background(r, g, b, a):
    if a < 8:
        return True
    # Sticker sheet grey
    if r > 198 and g > 198 and b > 198 and abs(int(r) - g) < 12 and abs(int(g) - b) < 12:
        return True
    # Sticker white border
    if r > 242 and g > 242 and b > 242:
        return True
    return False


def flood_background_mask(arr):
    h, w = arr.shape[:2]
    bg = np.zeros((h, w), dtype=bool)
    for y in range(h):
        for x in range(w):
            r, g, b, a = arr[y, x]
            bg[y, x] = is_sheet_background(int(r), int(g), int(b), int(a))

    visited = np.zeros((h, w), dtype=bool)
    stack = []
    for x in range(w):
        stack.extend([(0, x), (h - 1, x)])
    for y in range(h):
        stack.extend([(y, 0), (y, w - 1)])

    while stack:
        y, x = stack.pop()
        if y < 0 or y >= h or x < 0 or x >= w:
            continue
        if visited[y, x] or not bg[y, x]:
            continue
        visited[y, x] = True
        stack.extend([(y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)])

    return visited


def component_bbox(labeled, label):
    ys, xs = np.where(labeled == label)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def merge_split_halo_fragments(fg):
    labeled, count = ndimage.label(fg)
    if count == 0:
        return fg

    sizes = ndimage.sum(fg, labeled, range(1, count + 1))
    primary = int(np.argmax(sizes)) + 1
    pb = component_bbox(labeled, primary)
    pcx = (pb[0] + pb[2]) / 2
    keep = labeled == primary
    expand = 25

    for label in range(1, count + 1):
        if label == primary:
            continue
        size = float(sizes[label - 1])
        if size < 80:
            continue
        bb = component_bbox(labeled, label)
        cx = (bb[0] + bb[2]) / 2
        if cx < pcx - 15:
            continue
        overlap_y = max(0, min(bb[3], pb[3]) - max(bb[1], pb[1]))
        if overlap_y < 15:
            continue
        if (
            bb[0] <= pb[2] + expand
            and bb[2] >= pb[0] - expand
            and bb[1] <= pb[3] + expand
            and bb[3] >= pb[1] - expand
        ):
            keep |= labeled == label

    return keep


def keep_subject(fg, multi_part=False, merge_split_halo=False):
    labeled, count = ndimage.label(fg)
    if count == 0:
        return fg

    sizes = ndimage.sum(fg, labeled, range(1, count + 1))
    primary = int(np.argmax(sizes)) + 1

    if merge_split_halo:
        return merge_split_halo_fragments(fg)

    keep = labeled == primary
    largest = float(sizes[primary - 1])

    if multi_part:
        pb = component_bbox(labeled, primary)
        pcx = (pb[0] + pb[2]) / 2
        pcy = (pb[1] + pb[3]) / 2
        for label in range(1, count + 1):
            if label == primary:
                continue
            size = float(sizes[label - 1])
            if size < max(80, largest * 0.1):
                continue
            bb = component_bbox(labeled, label)
            cx = (bb[0] + bb[2]) / 2
            cy = (bb[1] + bb[3]) / 2
            if abs(cx - pcx) <= 85 and abs(cy - pcy) <= 70:
                keep |= labeled == label

    return keep


def peel_white_halo(arr, passes=3):
    out = arr.copy()
    for _ in range(passes):
        alpha = out[:, :, 3]
        fg = alpha > 20
        eroded = ndimage.binary_erosion(fg)
        border = fg & ~eroded
        if not border.any():
            break
        ys, xs = np.where(border)
        for y, x in zip(ys, xs):
            r, g, b = out[y, x, :3]
            if r > 238 and g > 238 and b > 238:
                out[y, x, 3] = 0
    return out


def clean_mask(fg):
    structure = np.ones((3, 3), dtype=bool)
    opened = ndimage.binary_opening(fg, structure=structure, iterations=1)
    return ndimage.binary_closing(opened, structure=structure, iterations=1)


def extract_sticker(arr, multi_part=False, merge_split_halo=False, pad_ratio=0.2):
    bg = flood_background_mask(arr)
    fg = ~bg

    labeled, count = ndimage.label(fg)
    if count:
        sizes = ndimage.sum(fg, labeled, range(1, count + 1))
        for label, size in enumerate(sizes, start=1):
            if size < 80:
                fg[labeled == label] = False

    fg = keep_subject(fg, multi_part=multi_part, merge_split_halo=merge_split_halo)
    if not multi_part:
        fg = clean_mask(fg)
    if not fg.any():
        return Image.fromarray(arr)

    out = arr.copy()
    out[:, :, 3] = np.where(fg, out[:, :, 3], 0)
    out = peel_white_halo(out)

    fg = out[:, :, 3] > 20
    if not fg.any():
        return Image.fromarray(out)

    ys, xs = np.where(fg)
    x0, x1 = xs.min(), xs.max() + 1
    y0, y1 = ys.min(), ys.max() + 1
    w, h = x1 - x0, y1 - y0
    pad = max(12, int(max(w, h) * pad_ratio))

    canvas = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    subject = Image.fromarray(out).crop((x0, y0, x1, y1))
    canvas.paste(subject, (pad, pad), subject)
    return canvas


def process_crop(box, multi_part=False, merge_split_halo=False):
    region = np.array(sheet.crop(clamp_box(box)))
    return extract_sticker(
        region,
        multi_part=multi_part,
        merge_split_halo=merge_split_halo,
    )


for name, box, multi_part in crops:
    cropped = process_crop(
        box,
        multi_part=multi_part,
        merge_split_halo=name in SPLIT_HALO,
    )
    cropped.save(os.path.join(out_dir, f"{name}.png"))
    print(name, cropped.size)

print("done")
