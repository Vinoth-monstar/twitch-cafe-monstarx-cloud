"""Prepare supplied café photography. Requires Pillow and Poppler; not needed to run the app."""
import argparse
import json
import pathlib
import re
import subprocess
import tempfile
from PIL import Image, ImageOps

parser = argparse.ArgumentParser()
parser.add_argument('--source-dir', required=True, type=pathlib.Path)
parser.add_argument('--profile', required=True, type=pathlib.Path)
args = parser.parse_args()
root = pathlib.Path(__file__).resolve().parents[1]
destination = root / 'public' / 'assets'
destination.mkdir(parents=True, exist_ok=True)
catalog = {}

def export(source, key, reference):
    image = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    original = image.size
    image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
    target = destination / f'{key}.webp'
    image.save(target, 'WEBP', quality=86, method=6)
    catalog[key] = {
        'src': f'/assets/{key}.webp', 'width': image.width,
        'height': image.height, 'originalWidth': original[0],
        'originalHeight': original[1], 'source': reference,
        'bytes': target.stat().st_size,
    }

for source in sorted(args.source_dir.rglob('*.png')):
    key = re.sub(r'[^a-z0-9]+', '-', source.parent.name.lower() + '-' + source.stem.lower()).strip('-')
    export(source, key, str(source.relative_to(args.source_dir)))

# Embedded image indexes from pdfimages -list; these are photographs, not page renders.
originals = {
    'morning-latte': (5, 2), 'storefront': (8, 3), 'pour-over': (31, 6),
    'coffee-and-chocolate': (40, 7), 'butter-cake': (41, 7),
    'banana-bread': (42, 7), 'local-noodles': (43, 7),
    'window-seat': (70, 10), 'matcha-in-the-cafe': (71, 10),
    'sunlit-interior': (75, 11), 'cafe-interior': (76, 11),
    'family-corner': (77, 11), 'community-table': (82, 11),
    'coffee-beans': (89, 12), 'roaster-beans': (88, 12),
    'tiramisu-latte': (92, 13), 'spanish-latte': (94, 13),
    'espresso-craft': (95, 13), 'matcha-latte': (106, 15),
    'strawberry-matcha': (107, 15), 'tea-pot': (112, 16),
    'strawberry-splash': (113, 16), 'spiced-chai': (114, 16),
    'mac-and-cheese': (118, 17), 'savory-bake': (124, 18),
    'nasi-lemak': (125, 18), 'brownie': (129, 19), 'bagels': (130, 19),
    'banana-loaf': (134, 19), 'gathering': (139, 20),
    'group-gathering': (141, 20), 'scent-workshop': (158, 23),
    'creative-workshop': (151, 22), 'enamel-pins': (165, 24),
    'local-makers': (166, 24), 'bulk-coffee': (171, 25),
    'delivery-boxes': (177, 26),
}
with tempfile.TemporaryDirectory() as temporary:
    subprocess.run(['pdfimages', '-png', '-j', str(args.profile), temporary + '/image'], check=True)
    for key, (index, page) in originals.items():
        matches = list(pathlib.Path(temporary).glob(f'image-{index:03d}.*'))
        if not matches:
            raise RuntimeError(f'Missing embedded image {index}')
        export(matches[0], key, f'Company profile PDF, physical page {page}, embedded image {index}')

(root / 'src' / 'data').mkdir(parents=True, exist_ok=True)
(root / 'src' / 'data' / 'assets.json').write_text(json.dumps(catalog, indent=2) + '\n')
print(f'Prepared {len(catalog)} assets, {sum(a["bytes"] for a in catalog.values()) / 1024 / 1024:.1f} MiB')
