from PIL import Image

src = r'd:\webiste-main\public\logo\thynkteck-icon-white.png'
dst = r'd:\webiste-main\public\logo\thynkteck-icon-transparent.png'

img = Image.open(src).convert('RGBA')
pixels = img.load()
w, h = img.size

threshold = 28
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if r <= threshold and g <= threshold and b <= threshold:
            pixels[x, y] = (0, 0, 0, 0)

bbox = img.getbbox()
if bbox:
    pad = 12
    left = max(0, bbox[0] - pad)
    top = max(0, bbox[1] - pad)
    right = min(w, bbox[2] + pad)
    bottom = min(h, bbox[3] + pad)
    img = img.crop((left, top, right, bottom))

# Normalize to square canvas for consistent nav sizing
side = max(img.size)
canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
ox = (side - img.size[0]) // 2
oy = (side - img.size[1]) // 2
canvas.paste(img, (ox, oy), img)
canvas.save(dst, 'PNG')
print(f'saved {dst} {canvas.size[0]}x{canvas.size[1]}')
