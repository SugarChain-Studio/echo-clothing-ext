import glob
import os
from pathlib import Path

# 通配符数组（可按需修改）
wildcard_paths = [
    "resources/Assets/Female3DCG/ItemBreast/**/LeatherBreastBinder_*.png",
]


def collect_files(patterns):
    """根据通配符收集文件并去重。"""
    all_files = []
    for wildcard in patterns:
        try:
            found_files = glob.glob(wildcard, recursive=True)
            all_files.extend(found_files)
        except Exception as e:
            print(f"通配符解析出错: {wildcard}: {e}")
    # 去重并排序，便于阅读
    unique_files = sorted(set(all_files))
    return unique_files


def confirm(prompt: str) -> bool:
    """简单的确认提示。"""
    resp = input(f"{prompt} (y/N): ").strip()
    return resp.lower() in ["y", "yes", "是", "Y", "✔"]


def delete_files(files):
    """删除文件并统计结果。"""
    success = 0
    failed = 0
    for fp in files:
        try:
            if not os.path.exists(fp):
                print(f"跳过（不存在）: {fp}")
                continue
            # 仅删除文件，不处理目录
            if Path(fp).is_file():
                os.remove(fp)
                print(f"✓ 已删除: {fp}")
                success += 1
            else:
                print(f"跳过（不是文件）: {fp}")
        except Exception as e:
            print(f"✗ 删除失败: {fp}: {e}")
            failed += 1
    print(f"\n删除完成！成功: {success}, 失败: {failed}")


def main():
    print("收集匹配文件…")
    files = collect_files(wildcard_paths)

    print(f"共找到 {len(files)} 个文件")
    print("使用的通配符模式:")
    for w in wildcard_paths:
        print(f"  - {w}")

    if not files:
        print("未找到匹配的文件\n请检查通配符路径是否正确")
        return

    print("\n找到的文件:")
    for f in files:
        print(f"  - {f}")

    print("\n注意：此操作会永久删除以上文件，无法撤销！")
    if not confirm("是否继续执行删除操作?"):
        print("操作已取消")
        return

    delete_files(files)


if __name__ == "__main__":
    main()
