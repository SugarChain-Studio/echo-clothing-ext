def regulateXYWH(minx:int, miny:int, maxx:int, maxy:int, w:int, axisym: bool = True):
    """从给定的最小和最大坐标以及宽度和高度中，计算出一个包含给出范围的，规范化的矩形区域。
    这个矩形区域的垂直对称轴和图片的垂直对称轴重合，并且边缘坐标都是10的倍数。

    Args:
        minx (int): 有效范围的最小x坐标
        miny (int): 有效范围的最小y坐标
        maxx (int): 有效范围的最大x坐标
        maxy (int): 有效范围的最大y坐标
        w (int): 图片宽度
        axisym (bool, optional): 是否要求水平对称. Defaults to True.

    Returns:
        [int,int,int,int]: 包含规范化的左上角坐标、宽度和高度的元组
    """
    # 计算规范化的矩形区域
    norm_min_x = (minx // 10) * 10
    norm_min_y = (miny // 10) * 10
    norm_max_x = ((maxx + 9) // 10) * 10
    norm_max_y = ((maxy + 9) // 10) * 10

    if axisym:
        # 调整x坐标以确保水平对称
        if norm_min_x < w - norm_max_x:
            norm_max_x = w - norm_min_x
        else:
            norm_min_x = w - norm_max_x

    norm_width = norm_max_x - norm_min_x
    norm_height = norm_max_y - norm_min_y

    return (norm_min_x, norm_min_y, norm_width, norm_height)