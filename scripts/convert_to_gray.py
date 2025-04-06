import os
import glob
from PIL import Image

# 带有通配符的目录路径
wildcard_path = "resources/Assets/Female3DCG/BodyMarkings/**/大纹身_Luzi_*_左肩翅膀.png"

# 50%灰色的RGB值
GRAY_COLOR = (128, 128, 128)


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
matching_files = glob.glob(wildcard_path, recursive=True)

# 打印找到的文件数量
print(f"找到 {len(matching_files)} 个匹配文件")

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
