import glob
import os
from PIL import Image
import colorsys
from typing import List, TypedDict, Callable

# 通配符数组
wildcard_paths = [
    "resources/Assets/Female3DCG/Cloth/一块布_*_A6.png",
]

# 定义亮度范围的类型
class BrightnessRange(TypedDict):
    min: float
    max: float

# 目标亮度范围配置
TARGET_BRIGHTNESS_RANGE: BrightnessRange = {'min': 0.5, 'max': 0.6}


def get_brightness_range(file_paths: List[str]) -> BrightnessRange:
    """分析所有图片，找到全局的亮度范围"""
    brightness_range: BrightnessRange = {'min': 1.0, 'max': 0.0}
    
    print("正在分析图片亮度范围...")
    for i, file_path in enumerate(file_paths):
        try:
            with Image.open(file_path) as img:
                img = img.convert("RGBA")
                pixels = img.load()
                width, height = img.size

                # 找到当前图片的亮度范围
                for y in range(height):
                    for x in range(width):
                        r, g, b, a = pixels[x, y]
                        if a > 0:  # 只处理不透明像素
                            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
                            brightness_range['min'] = min(brightness_range['min'], v)
                            brightness_range['max'] = max(brightness_range['max'], v)
            
            print(f"已分析: {i+1}/{len(file_paths)} - {file_path}")
            
        except Exception as e:
            print(f"分析图像时出错 {file_path}: {e}")
    
    return brightness_range


def linear_normalize_brightness(source_range: BrightnessRange, 
                               target_range: BrightnessRange) -> Callable[[float], float]:
    """返回一个将亮度值从源范围线性映射到目标范围的闭包函数"""
    source_width = source_range['max'] - source_range['min']
    target_width = target_range['max'] - target_range['min']
    
    if source_width == 0:
        # 如果源范围为0，返回固定值
        return lambda _: target_range['min']
    
    # 预计算转换参数
    scale = target_width / source_width
    offset = target_range['min'] - source_range['min'] * scale
    
    def normalize(value: float) -> float:
        return max(0, min(1, value * scale + offset))
    
    return normalize


def process_images(file_paths: List[str], brightness_normalizer: Callable[[float], float]) -> None:
    """处理图片，应用灰度化和亮度归一化"""
    print(f"\n开始处理图片...")
    
    for i, file_path in enumerate(file_paths):
        try:
            with Image.open(file_path) as img:
                img = img.convert("RGBA")
                pixels = img.load()
                width, height = img.size

                # 处理所有像素
                for y in range(height):
                    for x in range(width):
                        r, g, b, a = pixels[x, y]
                        if a > 0:  # 只处理不透明像素
                            # 转换到HSV
                            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
                            
                            # 使用闭包函数归一化亮度
                            new_v = brightness_normalizer(v)
                            
                            # 转换为灰度 (S=0) 并转回RGB
                            nr, ng, nb = colorsys.hsv_to_rgb(h, 0, new_v)
                            pixels[x, y] = (int(nr * 255), int(ng * 255), int(nb * 255), a)

                dir_name = os.path.dirname(file_path)
                base_name = os.path.splitext(os.path.basename(file_path))[0]
                base_name = base_name.replace("_base", "_plain")
                output_path = os.path.join(dir_name, f"{base_name}.png")
                img.save(output_path)
                print(f"已处理: {i+1}/{len(file_paths)} - {file_path}")
                
        except Exception as e:
            print(f"处理图像时出错 {file_path}: {e}")


def main() -> None:
    # 收集所有文件
    all_files = []
    for wildcard in wildcard_paths:
        all_files.extend(glob.glob(wildcard, recursive=True))

    if not all_files:
        print("未找到匹配的文件")
        return

    print(f"共找到 {len(all_files)} 个文件")
    
    # 第一遍：分析所有图片的亮度范围
    source_brightness_range = get_brightness_range(all_files)
    
    if source_brightness_range['min'] < source_brightness_range['max']:
        print(f"原始亮度范围: {source_brightness_range['min']:.3f} ~ {source_brightness_range['max']:.3f}")
        print(f"目标亮度范围: {TARGET_BRIGHTNESS_RANGE['min']:.3f} ~ {TARGET_BRIGHTNESS_RANGE['max']:.3f}")
        
        # 创建亮度归一化函数
        brightness_normalizer = linear_normalize_brightness(source_brightness_range, TARGET_BRIGHTNESS_RANGE)
    elif source_brightness_range['min'] == source_brightness_range['max']:
        print(f"所有图片亮度相同: {source_brightness_range['min']:.3f}，将转换为目标范围的中间值")
        target_brightness = (TARGET_BRIGHTNESS_RANGE['min'] + TARGET_BRIGHTNESS_RANGE['max']) / 2
        print(f"目标亮度: {target_brightness:.3f}")
        brightness_normalizer = lambda _: target_brightness
    else:
        print("无法确定亮度范围，跳过处理")
        return
    
    # 第二遍：应用归一化处理
    process_images(all_files, brightness_normalizer)
    
    print(f"\n处理完成！")
    print(f"已将 {len(all_files)} 个图片的亮度归一化处理")


if __name__ == "__main__":
    main()