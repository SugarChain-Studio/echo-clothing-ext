import os
import glob
import fnmatch
from typing import Dict, List, Optional, Tuple
from PIL import Image

# 使用通配符的路径列表（可按需修改/扩展）
wildcard_paths: List[str] = [
    "resources/Assets/Female3DCG/Shoes/Kneel/ThighBoots_*.png",
    "resources/Assets/Female3DCG/Shoes/LegsClosed/ThighBoots_*.png",
]

# 平移配置：按匹配模式设置 dx, dy（像素）。
# 先匹配到的项优先级更高；若无匹配则使用默认值。
# 示例：{"pattern": "**/帽子_*.png", "dx": 10, "dy": -5}
translation_rules: List[Dict[str, int]] = [
    # {"pattern": "resources/Assets/Female3DCG/Hats/**/帽子_*.png", "dx": 10, "dy": -5},
]

# 默认平移（若没有命中任何规则时生效）
default_dx: int = 3
default_dy: int = 0

# 是否覆盖写回原文件
overwrite: bool = True


def pick_translation_for(path: str) -> Tuple[int, int]:
    norm = path.replace("\\", "/")
    for rule in translation_rules:
        pattern = rule.get("pattern", "")
        if pattern and fnmatch.fnmatch(norm, pattern):
            return int(rule.get("dx", 0)), int(rule.get("dy", 0))
    return default_dx, default_dy


def translate_image(source_path: str, dx: int, dy: int, dest_path: Optional[str] = None) -> None:
    """将图像在原尺寸画布上进行平移，超出画布的部分将被裁切。

    - 画布尺寸与原图一致；
    - 背景填充透明（RGBA）；
    - 使用原图作为 alpha mask，保留透明度；
    - 若 dest_path 为空，则原地覆盖。
    """
    out_path = dest_path or source_path

    with Image.open(source_path) as img:
        img = img.convert("RGBA")
        w, h = img.size

        # 新建透明背景
        canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))

        # 在 (dx, dy) 位置贴图，超出画布部分会被裁切
        canvas.paste(img, (dx, dy), mask=img)

        # 保存
        os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)
        canvas.save(out_path)


def collect_files(patterns: List[str]) -> List[str]:
    files: List[str] = []
    for wc in patterns:
        files.extend(glob.glob(wc, recursive=True))
    # 去重并规范分隔符
    seen = set()
    uniq: List[str] = []
    for f in files:
        nf = f.replace("\\", "/")
        if nf not in seen:
            seen.add(nf)
            uniq.append(nf)
    return uniq


def main() -> None:
    files = collect_files(wildcard_paths)
    if not files:
        print("未找到任何匹配的文件，请检查 wildcard_paths 配置。")
        return

    print(f"共找到 {len(files)} 个文件，将按配置进行平移处理…")

    processed = 0
    for idx, path in enumerate(files, 1):
        try:
            dx, dy = pick_translation_for(path)
            if dx == 0 and dy == 0:
                # 无需平移也计入统计，但标记为跳过
                print(f"[{idx}/{len(files)}] 跳过(无位移): {path}")
                processed += 1
                continue

            dest = None if overwrite else path  # 目前未实现输出目录，后续可扩展
            translate_image(path, dx, dy, dest)
            print(f"[{idx}/{len(files)}] 已平移(dx={dx}, dy={dy}): {path}")
            processed += 1
        except Exception as e:
            print(f"[{idx}/{len(files)}] 处理失败: {path} -> {e}")

    print(f"处理完成：共处理 {processed} 个文件。")


if __name__ == "__main__":
    main()
