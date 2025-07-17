import glob
from PIL import Image
import colorsys

# 通配符数组
wildcard_paths = [
    "resources/Assets/Female3DCG/Suit/**/透明兔女郎_Luzi_*_A1.png",
    "resources/Assets/Female3DCG/Suit/**/透明兔女郎_Luzi_*_A2.png",
]


def process_images(file_paths):
    for file_path in file_paths:
        try:
            with Image.open(file_path) as img:
                img = img.convert("RGBA")
                pixels = img.load()
                width, height = img.size

                # 找到最暗的不透明像素的V值
                min_v = 1.0
                for y in range(height):
                    for x in range(width):
                        r, g, b, a = pixels[x, y]
                        if a > 0:
                            h, s, v = colorsys.rgb_to_hsv(
                                r / 255, g / 255, b / 255)
                            if v < min_v:
                                min_v = v

                diff = 0.6 - min_v

                # 应用k到所有像素的V分量
                for y in range(height):
                    for x in range(width):
                        r, g, b, a = pixels[x, y]
                        h, s, v = colorsys.rgb_to_hsv(
                            r / 255, g / 255, b / 255)
                        new_v = max(0, min(1, v + diff))
                        nr, ng, nb = colorsys.hsv_to_rgb(h, 0, new_v)
                        pixels[x, y] = (
                            int(nr * 255), int(ng * 255), int(nb * 255), a)

                img.save(file_path)
                print(f"已处理: {file_path}")
        except Exception as e:
            print(f"处理图像时出错 {file_path}: {e}")


all_files = []
for wildcard in wildcard_paths:
    all_files.extend(glob.glob(wildcard, recursive=True))

print(f"共找到 {len(all_files)} 个文件")
process_images(all_files)
