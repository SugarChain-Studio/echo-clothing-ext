import glob
import os
from PIL import Image
import colorsys
from typing import List, TypedDict, Callable, Tuple

# 通配符数组
wildcard_paths = [
    "resources/Assets/Female3DCG/Cloth/**/西装露肩_Luzi_*base.png",
]

# 定义亮度范围的类型
class BrightnessRange(TypedDict):
    min: float
    max: float

CLAMP_BRIGHTNESS_CURVE: List[Tuple[float,float]] = [
    (0, 1),
    (0.15, 0.5),
    (1, 0),
]

SHADOW_GRAY_COLOR = 128  # 中性灰色值 (0-255)


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


def create_alpha_mapper(source_range: BrightnessRange) -> Callable[[float], float]:
    """
    根据CLAMP_BRIGHTNESS_CURVE创建一个将亮度值映射到透明度的函数。
    CLAMP_BRIGHTNESS_CURVE列表中的每个元组表示一个点，格式为 (源亮度，映射亮度)。
    处理完映射亮度后，将其转换为透明度值，越低的亮度越不透明。
    """
    
    source_width = source_range['max'] - source_range['min']
    
    def map_brightness_to_alpha(brightness: float) -> float:
        """将亮度值映射到透明度值"""
        if source_width == 0:
            return 1.0
        # 线性插值计算
        normalized_brightness = (brightness - source_range['min']) / source_width
        for i in range(len(CLAMP_BRIGHTNESS_CURVE) - 1):
            x0, y0 = CLAMP_BRIGHTNESS_CURVE[i]
            x1, y1 = CLAMP_BRIGHTNESS_CURVE[i + 1]
            if x0 <= normalized_brightness <= x1:
                # 线性插值
                alpha = y0 + (y1 - y0) * (normalized_brightness - x0) / (x1 - x0)
                return max(0.0, min(1.0, alpha))
        # 如果不在任何区间内，返回默认值
        return 1.0
    
    return map_brightness_to_alpha


def create_shadow_masks(file_paths: List[str], alpha_mapper: Callable[[float], float]) -> None:
    """创建阴影遮罩文件"""
    print(f"\n开始创建阴影遮罩...")
    
    for i, file_path in enumerate(file_paths):
        try:
            with Image.open(file_path) as img:
                img = img.convert("RGBA")
                pixels = img.load()
                width, height = img.size

                # 创建新的图像用于阴影遮罩
                shadow_mask = Image.new("RGBA", (width, height), (0, 0, 0, 0))
                shadow_pixels = shadow_mask.load()

                # 处理所有像素
                for y in range(height):
                    for x in range(width):
                        r, g, b, a = pixels[x, y]
                        if a > 0:  # 只处理不透明像素
                            # 转换到HSV获取亮度
                            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
                            
                            # 根据亮度计算新的透明度
                            brightness_alpha = alpha_mapper(v)
                            
                            # 保持原图片透明度（相乘）
                            final_alpha = int((a / 255) * brightness_alpha * 255)
                            
                            # 使用中性灰色
                            shadow_pixels[x, y] = (0, 0, 0, final_alpha)

                # 生成输出文件名
                dir_name = os.path.dirname(file_path)
                base_name = os.path.splitext(os.path.basename(file_path))[0]
                base_name = base_name.replace("_base", "_shadow")
                output_path = os.path.join(dir_name, f"{base_name}.png")
                shadow_mask.save(output_path)
                print(f"已创建: {i+1}/{len(file_paths)} - {output_path}")
                
        except Exception as e:
            print(f"创建阴影遮罩时出错 {file_path}: {e}")


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
    
    if source_brightness_range['min'] >= source_brightness_range['max']:
        print("警告: 检测到的亮度范围无效，跳过处理")
        return
    
    print(f"原始亮度范围: {source_brightness_range['min']:.3f} ~ {source_brightness_range['max']:.3f}")

    # 创建亮度到透明度的映射函数
    alpha_mapper = create_alpha_mapper(source_brightness_range)
    
    # 第二遍：创建阴影遮罩
    create_shadow_masks(all_files, alpha_mapper)
    
    print(f"\n处理完成！")
    print(f"已为 {len(all_files)} 个图片创建阴影遮罩")


if __name__ == "__main__":
    main()