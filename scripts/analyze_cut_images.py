import glob
from PIL import Image
from common import regulateXYWH

# 带有通配符的目录路径
wildcard_paths = [
    "resources/Assets/Female3DCG/ClothOuter/**/大衣_*.png"
]

# 新前发参数
reference_topleft = [50, 0]
minimum_height = 400

# 口中食物参数
reference_topleft = [160, 160]
minimum_height = 200

# 手中食物参数
reference_topleft = [160, 300]
minimum_height = 200

# 参考左上角，如果设置，则会以此作为裁剪区域的左上角
reference_topleft = None

# 最小高度，如果设置，则会以此作为裁剪区域的最小高度
minimum_height = None

# 是否要求水平对称
axisym = True


def analyze_and_crop_images(file_paths):
    """分析图片并裁剪到左右对称的最小矩形区域。"""
    # 初始化变量
    min_x, min_y = float('inf'), float('inf')
    max_x, max_y = float('-inf'), float('-inf')
    image_width, image_height = None, None

    if len(file_paths) == 0:
        raise ValueError("没有找到任何匹配的文件。")

    for file_path in file_paths:
        with Image.open(file_path) as img:
            # 检查图片尺寸是否一致
            if image_width is None or image_height is None:
                image_width, image_height = img.width, img.height
            elif img.width != image_width or img.height != image_height:
                raise ValueError(f"图片尺寸不一致: {file_path}")

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

    
    if reference_topleft is not None:
        if min_x < reference_topleft[0]:
            raise ValueError(f"裁剪区域超出参考区域: min_x {min_x} < {reference_topleft[0]}") 
        if max_x > image_width - reference_topleft[0]:
            raise ValueError(f"裁剪区域超出参考区域: max_x {max_x} > {image_width - reference_topleft[0]}")
        if min_y < reference_topleft[1]:
            raise ValueError(f"裁剪区域超出参考区域: min_y {min_y} < {reference_topleft[1]}")
        ref_x, ref_y = reference_topleft
    else:
        ref_x, ref_y = min_x, min_y

    x,y,w,h = regulateXYWH(ref_x, ref_y, max_x, max_y, image_width, axisym)
    h = minimum_height if (not minimum_height is None) and h < minimum_height else h
    
    print(f"裁剪区域: 左上角({x}, {y}), 宽: {w}, 高: {h}")
    print(f"Left: {x}, \nTop: {y},")

    for file_path in file_paths:
        with Image.open(file_path) as img:
            cropped_img = img.crop(( x, y, x + w, y + h))
            cropped_img.save(file_path)
            print(f"已裁剪: {file_path}")
            
    return True


# 使用glob获取匹配通配符的所有文件
matching_files = []
for wildcard in wildcard_paths:
    matching_files.extend(glob.glob(wildcard, recursive=True))

# 打印找到的文件数量
print(f"找到 {len(matching_files)} 个匹配文件")

if __name__ == "__main__":
    # 分析并裁剪图片
    if matching_files:
        analyze_and_crop_images(matching_files)
        print("分析和裁剪完成。")
    else:
        print("未找到任何匹配的文件。")
