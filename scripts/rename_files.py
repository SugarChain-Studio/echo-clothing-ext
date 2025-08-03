import glob
import os
from pathlib import Path

# 通配符数组
wildcard_paths = [
    "./resources/Assets/Female3DCG/Cloth/BackBoxTie/敞夹克_*_D1.png",
    "./resources/Assets/Female3DCG/Cloth/BackCuffs/敞夹克_*_D1.png",
    "./resources/Assets/Female3DCG/Cloth/BackElbowTouch/敞夹克_*_D1.png",
]


def example_rename_function(full_path, filename, extension, name_parts):
    """
    示例重命名函数 - 用户需要自定义此函数
    
    Args:
        full_path: 完整文件路径 (例如: "resources/Assets/Female3DCG/ItemTorso/StuddedHarness_Body.png")
        filename: 完整文件名 (例如: "StuddedHarness_Body.png")
        extension: 文件扩展名 (例如: ".png")
        name_parts: 以"_"分隔的文件名片段 (例如: ["StuddedHarness", "Body"])
    
    Returns:
        新的文件名 (不包含路径)，返回None表示不重命名
    """
    return f"{filename[:-4]}B{extension}"


def rename_files(file_paths, rename_function):
    """
    根据用户提供的重命名函数重命名文件
    
    Args:
        file_paths: 文件路径列表
        rename_function: 用户提供的重命名函数
    """
    rename_operations = []
    
    # 第一阶段：分析所有文件并生成重命名操作
    for file_path in file_paths:
        try:
            path_obj = Path(file_path)
            
            # 提取文件信息
            full_path = str(path_obj)
            filename = path_obj.name
            extension = path_obj.suffix
            name_without_ext = path_obj.stem
            name_parts = name_without_ext.split('_')
            
            # 调用用户提供的重命名函数
            new_filename = rename_function(full_path, filename, extension, name_parts)
            
            if new_filename and new_filename != filename:
                new_path = path_obj.parent / new_filename
                rename_operations.append((file_path, str(new_path), filename, new_filename))
                print(f"计划重命名: {filename} -> {new_filename}")
            else:
                print(f"跳过: {filename}")
                
        except Exception as e:
            print(f"分析文件时出错 {file_path}: {e}")
    
    if not rename_operations:
        print("没有需要重命名的文件")
        return
    
    print(f"\n共有 {len(rename_operations)} 个文件需要重命名")
    
    # 询问用户确认
    response = input("是否继续执行重命名操作? (y/N): ")
    if response.lower() not in ['y', 'yes', '是', 'Y']:
        print("操作已取消")
        return
    
    # 第二阶段：执行重命名操作
    success_count = 0
    error_count = 0
    
    for old_path, new_path, old_filename, new_filename in rename_operations:
        try:
            # 检查目标文件是否已存在
            if os.path.exists(new_path):
                print(f"错误: 目标文件已存在 {new_filename}")
                error_count += 1
                continue
            
            # 执行重命名
            os.rename(old_path, new_path)
            print(f"✓ 已重命名: {old_filename} -> {new_filename}")
            success_count += 1
            
        except Exception as e:
            print(f"✗ 重命名失败 {old_filename}: {e}")
            error_count += 1
    
    print(f"\n重命名完成！成功: {success_count}, 失败: {error_count}")


def main():
    """主函数"""
    # 收集所有匹配的文件
    all_files = []
    for wildcard in wildcard_paths:
        found_files = glob.glob(wildcard, recursive=True)
        all_files.extend(found_files)
    
    # 去重
    all_files = list(set(all_files))
    
    print(f"共找到 {len(all_files)} 个文件")
    print("使用的通配符模式:")
    for wildcard in wildcard_paths:
        print(f"  - {wildcard}")
    
    if all_files:
        print(f"\n找到的文件:")
        for file_path in all_files:
            print(f"  - {file_path}")
        
        print(f"\n当前使用的重命名函数: {example_rename_function.__name__}")
        print("请根据需要修改脚本中的重命名函数")
        
        # 预览重命名效果
        print(f"\n预览重命名效果:")
        rename_files(all_files, example_rename_function)
    else:
        print("未找到匹配的文件")
        print("请检查通配符路径是否正确")


if __name__ == "__main__":
    main()
