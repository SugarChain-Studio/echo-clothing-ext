import os
import glob
from PIL import Image

# 带有通配符的目录路径
wildcard_path = "resources\Assets\Female3DCG\ItemHandheld\分层剑_*.png"


def analyze_and_crop_images(file_paths):
    """分析图片并裁剪到左右对称的最小矩形区域。"""
    # 初始化变量
    min_x, min_y = float('inf'), float('inf')
    max_x, max_y = float('-inf'), float('-inf')
    image_width, image_height = None, None

    for file_path in file_paths:
        try:
            with Image.open(file_path) as img:
                # 检查图片尺寸是否一致
                if image_width is None or image_height is None:
                    image_width, image_height = img.width, img.height
                elif img.width != image_width or img.height != image_height:
                    print(f"错误: 图片尺寸不一致: {file_path}")
                    return False

                # 转换为RGBA模式以处理透明度
                img = img.convert("RGBA")
                pixels = img.load()

                # 遍历图片像素，找到非透明部分的边界
                for y in range(img.height):
                    for x in range(img.width):
                        if pixels[x, y][3] > 0:  # Alpha通道大于0表示非透明
                            min_x = min(min_x, x)
                            min_y = min(min_y, y)
                            max_x = max(max_x, x)
                            max_y = max(max_y, y)

        except Exception as e:
            print(f"处理图像时出错 {file_path}: {e}")
            return False

    # 计算左右对称的最小矩形区域
    if min_x < float('inf') and min_y < float('inf'):
        # 取整到10像素
        rounded_min_x = (min_x // 10) * 10
        rounded_min_y = (min_y // 10) * 10
        rounded_max_x = ((max_x + 9) // 10) * 10
        rounded_max_y = ((max_y + 9) // 10) * 10
        rounded_width = (rounded_max_x - rounded_min_x)
        rounded_height = (rounded_max_y - rounded_min_y)

        # 计算左右对称的矩形区域
        symmetric_min_x = min(rounded_min_x, image_width - rounded_max_x)
        symmetric_width = image_width - 2 * symmetric_min_x

        # 确保对称区域的宽度是10的倍数
        symmetric_width = ((symmetric_width + 9) // 10) * 10

        print(
            f"最终对称矩形区域: 左上角({symmetric_min_x}, {rounded_min_y}), 宽: {symmetric_width}, 高: {rounded_height}")

        print(f"Left: {symmetric_min_x}, \nTop: {rounded_min_y},")

        # 裁剪图片
        for file_path in file_paths:
            try:
                with Image.open(file_path) as img:
                    cropped_img = img.crop((
                        symmetric_min_x,
                        rounded_min_y,
                        symmetric_min_x + symmetric_width,
                        rounded_min_y + rounded_height
                    ))
                    cropped_img.save(file_path)
                    print(f"已裁剪: {file_path}")
            except Exception as e:
                print(f"裁剪图像时出错 {file_path}: {e}")
                return False
    else:
        print("未找到任何非透明部分。")
        return False

    return True


# 使用glob获取匹配通配符的所有文件
matching_files = glob.glob(wildcard_path, recursive=True)

# 打印找到的文件数量
print(f"找到 {len(matching_files)} 个匹配文件")

# 分析并裁剪图片
if matching_files:
    if analyze_and_crop_images(matching_files):
        print("分析和裁剪完成。")
    else:
        print("分析或裁剪失败。")
else:
    print("未找到任何匹配的文件。")
