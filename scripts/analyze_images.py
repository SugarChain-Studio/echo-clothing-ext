import glob
from PIL import Image

# 带有通配符的目录路径
wildcard_path = "resources/Assets/Female3DCG/*眼_Luzi/**/眼睛2*.png"


def analyze_images(file_paths):
    """分析图片尺寸并找到最小的包含所有非透明部分的方形区域。"""
    min_x, min_y = float('inf'), float('inf')
    max_x, max_y = float('-inf'), float('-inf')

    for file_path in file_paths:
        try:
            with Image.open(file_path) as img:
                # 检查图片尺寸是否为宽500高1000
                if img.width != 500 or img.height != 1000:
                    print(f"警告: 图片尺寸不符合要求 (500x1000): {file_path}")
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

    # 计算最小矩形区域
    if min_x < float('inf') and min_y < float('inf'):
        width = max_x - min_x + 1
        height = max_y - min_y + 1
        print(f"最小矩形区域: 左上角({min_x}, {min_y}), 宽: {width}, 高: {height}")

        # 计算取整到10像素的版本
        rounded_min_x = (min_x // 10) * 10
        rounded_min_y = (min_y // 10) * 10
        rounded_width = ((max_x - rounded_min_x + 9) // 10) * 10
        rounded_height = ((max_y - rounded_min_y + 9) // 10) * 10
        print(
            f"取整到10像素的矩形区域: 左上角({rounded_min_x}, {rounded_min_y}), 宽: {rounded_width}, 高: {rounded_height}")

        # 计算取整到10像素且关于水平轴对称的最小矩形区域
        center_x = 250  # 原图宽度的一半 (500 / 2)

        symmetric_min_x = center_x - \
            max(center_x - rounded_min_x, rounded_width // 2)
        symmetric_width = max(rounded_width, 2 * (center_x - symmetric_min_x))

        # 确保对称区域的宽度是10的倍数
        symmetric_width = ((symmetric_width + 9) // 10) * 10

        print(
            f"取整到10像素且关于水平轴对称的矩形区域: 左上角({symmetric_min_x}, {rounded_min_y}), 宽: {symmetric_width}, 高: {rounded_height}")
    else:
        print("未找到任何非透明部分。")

    return True


# 使用glob获取匹配通配符的所有文件
matching_files = glob.glob(wildcard_path, recursive=True)

# 打印找到的文件数量
print(f"找到 {len(matching_files)} 个匹配文件")

# 分析图片
if matching_files:
    if analyze_images(matching_files):
        print("分析完成。")
    else:
        print("分析失败。")
else:
    print("未找到任何匹配的文件。")
