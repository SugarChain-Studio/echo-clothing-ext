import os
import glob
from PIL import Image

# 带有通配符的目录路径（支持多个）
wildcard_paths = [
    # "resources/Assets/Female3DCG/Suit/**/马油袜_*.png",
    "resources/Assets/Female3DCG/SuitLower/**/马油袜下_*.png",
]

# 排除的通配符路径（可选，多项）
exclude_paths = [
    # 示例："resources/Assets/**/temp_*.png",
    "**/*mask.png",
]

# 50%灰色的RGB值
GRAY_COLOR = (255, 255, 255)


def convert_to_gray(source_path, destination_path):
    """将图像所有颜色修改为50%灰色，保持透明度不变。"""
    try:
        with Image.open(source_path) as img:
            # 确保图像有Alpha通道
            if img.mode != 'RGBA':
                img = img.convert('RGBA')

            # 创建新图像
            width, height = img.size
            gray_img = Image.new('RGBA', (width, height))

            # 获取像素数据
            pixels = img.load()
            gray_pixels = gray_img.load()

            # 处理每个像素
            for y in range(height):
                for x in range(width):
                    r, g, b, a = pixels[x, y]
                    # 只修改颜色，保持透明度
                    gray_pixels[x, y] = (
                        GRAY_COLOR[0], GRAY_COLOR[1], GRAY_COLOR[2], a)

            # 保存结果
            gray_img.save(destination_path)
            print(f"已转换为灰色: {source_path}")
            return True
    except Exception as e:
        print(f"处理图像时出错 {source_path}: {e}")
        return False


# 使用glob获取匹配通配符的所有文件
matching_files = []
for wildcard in wildcard_paths:
    matching_files.extend(glob.glob(wildcard, recursive=True))

# 规范分隔符并去重（按出现顺序保留）
seen = set()
normalized_files = []
for p in matching_files:
    np = p.replace("\\", "/")
    if np not in seen:
        seen.add(np)
        normalized_files.append(np)

# 计算需要排除的文件集合（同样规范分隔符）
excluded = []
for pattern in exclude_paths:
    excluded.extend(glob.glob(pattern, recursive=True))
excluded_set = set([p.replace("\\", "/") for p in excluded])

# 过滤排除项
pre_count = len(normalized_files)
matching_files = [p for p in normalized_files if p not in excluded_set]
excluded_count = pre_count - len(matching_files)

# 打印找到的文件数量
print(f"找到 {len(matching_files)} 个匹配文件")
if excluded_count > 0:
    print(f"排除了 {excluded_count} 个文件")

# 初始化计数器
processed_count = 0

# 处理找到的所有图像
for file_path in matching_files:
    # 确保路径格式正确（使用正斜杠）
    file_path = file_path.replace("\\", "/")
    if convert_to_gray(file_path, file_path):
        processed_count += 1

# 输出处理的图片数量
print(f"实际处理了 {processed_count} 张图片")

print("灰色处理完成。")
