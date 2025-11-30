"""Split 500x1000 PNG images into upper and lower layers.

For each 500x1000 source image this script produces two new PNG files:
- <original>_U.png : Contains only the upper 500x462 region in its original position; the remainder is transparent. Final size 500x1000.
- <original>_L.png : Contains only the lower 500x538 region (y=462..999) in its original position; the upper part is transparent. Final size 500x1000.

After successful generation the original source file is deleted.

Usage (PowerShell examples):
  # Process explicit files
  pwsh scripts/split_500x1000.py image1.png image2.png

  # Process glob pattern (quote to avoid shell expansion issues)
  pwsh scripts/split_500x1000.py "resources/Assets/Female3DCG/**/*.png"

If no arguments are given, it uses the default wildcard list defined below.

Requirements: Pillow
  pnpm exec python -m pip install Pillow  (adjust environment as needed)
"""

import sys
import glob
import os
from typing import List
from PIL import Image

# Default wildcard paths (edit as needed)
DEFAULT_WILDCARDS: List[str] = [
    "resources/Assets/Female3DCG/Suit/**/时韵B_*.png",
]

WIDTH = 500
HEIGHT = 1000
UPPER_HEIGHT = 462
LOWER_HEIGHT = HEIGHT - UPPER_HEIGHT  # 538
LOWER_Y = UPPER_HEIGHT  # 462


def validate_image(img: Image.Image, path: str) -> None:
    if img.width != WIDTH or img.height != HEIGHT:
        raise ValueError(f"图像尺寸不是 {WIDTH}x{HEIGHT}: {path} ({img.width}x{img.height})")


def create_layer_image(img: Image.Image, part: str) -> Image.Image:
    """Return a 500x1000 RGBA image with only the requested part visible.
    part: 'U' for upper, 'L' for lower.
    """
    base = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    if part == "U":
        crop = img.crop((0, 0, WIDTH, UPPER_HEIGHT))
        base.paste(crop, (0, 0))
    elif part == "L":
        crop = img.crop((0, LOWER_Y, WIDTH, HEIGHT))
        base.paste(crop, (0, LOWER_Y))
    else:
        raise ValueError("part must be 'U' or 'L'")
    return base


def process_file(path: str) -> None:
    try:
        with Image.open(path) as img:
            img = img.convert("RGBA")
            validate_image(img, path)
            upper_img = create_layer_image(img, "U")
            lower_img = create_layer_image(img, "L")

        stem, ext = os.path.splitext(path)
        upper_path = f"{stem}_U{ext}"
        lower_path = f"{stem}_L{ext}"
        upper_img.save(upper_path)
        lower_img.save(lower_path)
        try:
            os.remove(path)
            removed = True
        except Exception as re:
            removed = False
            print(f"删除原文件失败 {path}: {re}")
        status = "并已删除原文件" if removed else "(原文件未删除)"
        print(f"生成: {upper_path} 和 {lower_path} {status}")
    except Exception as e:
        print(f"处理失败 {path}: {e}")


def expand_inputs(args: List[str]) -> List[str]:
    if not args:
        patterns = DEFAULT_WILDCARDS
    else:
        patterns = args
    files: List[str] = []
    for pattern in patterns:
        matched = glob.glob(pattern, recursive=True)
        files.extend(matched)
    # Deduplicate while preserving order
    seen = set()
    unique_files = []
    for f in files:
        if f not in seen:
            seen.add(f)
            unique_files.append(f)
    return unique_files


def main() -> None:
    input_patterns_or_files = sys.argv[1:]
    targets = expand_inputs(input_patterns_or_files)
    if not targets:
        print("未找到任何文件。请提供文件或修改 DEFAULT_WILDCARDS。")
        return
    print(f"待处理文件数量: {len(targets)}")
    for path in targets:
        process_file(path)
    print("处理完成。")


if __name__ == "__main__":
    main()
