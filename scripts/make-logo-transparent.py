from PIL import Image

src = r'd:\webiste-main\public\logo\thynkteck-wordmark-white.png'
dst = r'd:\webiste-main\public\logo\thynkteck-wordmark-transparent.png'

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
    pad = 8
    left = max(0, bbox[0] - pad)
    top = max(0, bbox[1] - pad)
    right = min(w, bbox[2] + pad)
    bottom = min(h, bbox[3] + pad)
    img = img.crop((left, top, right, bottom))

img.save(dst, 'PNG')
print(f'saved {dst} {img.size[0]}x{img.size[1]}')
