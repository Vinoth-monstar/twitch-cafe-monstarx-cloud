"""Optimise the client's coffee photographs without changing the originals."""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageOps

parser = argparse.ArgumentParser()
parser.add_argument('--source-dir', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
manifest_path = root / 'src/data/assets.json'
manifest = json.loads(manifest_path.read_text())
names = {
    1: 'client-iced-coffee', 2: 'client-coffee-beans',
    3: 'client-latte-art', 4: 'client-coffee-and-cookie',
    5: 'client-spanish-latte', 6: 'client-sunlit-latte',
    7: 'client-dirty-latte', 8: 'client-latte-and-shadow',
    9: 'client-coffee-preparation', 10: 'client-signature-drink',
    11: 'client-espresso-craft',
}
for source in sorted(args.source_dir.glob('*')):
    if source.suffix.lower() not in ['.jpg', '.jpeg', '.png']:
        continue
    index = int(''.join(filter(str.isdigit, source.stem)))
    key = names[index]
    image = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    original = image.size
    image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
    target = root / 'public/assets' / f'{key}.webp'
    image.save(target, 'WEBP', quality=86, method=6)
    manifest[key] = {
        'src': f'/assets/{key}.webp', 'width': image.width, 'height': image.height,
        'originalWidth': original[0], 'originalHeight': original[1],
        'source': f'Client-supplied coffee photograph: {source.name}',
        'bytes': target.stat().st_size,
    }
# This real crop is bundled; it must not point at a generated placeholder.
manifest['slide2-slide-2']['src'] = '/assets/slide2-slide-2.webp'
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Imported {len(names)} client coffee photographs; {len(manifest)} assets available.')
