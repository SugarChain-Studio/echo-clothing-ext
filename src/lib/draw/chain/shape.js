/**
 * @typedef {object} ChainShapeParam
 * @property {{x: number, y: number}} start - 链条起点
 * @property {{x: number, y: number}} end - 链条终点
 * @property {number} sagFactor - 链条下垂因子
 * @property {number} linkSize - 链条链接大小
 */

/**
 * 计算链条的下垂点
 * @param {ChainShapeParam} param0
 */
export function calculateCatenaryPoints({ start, end, sagFactor, linkSize }) {
    // 计算两点间距离
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 计算控制点（决定下垂程度）
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;

    // 计算下垂量（基于两点距离和下垂因子）
    const sag = distance * 0.3 * sagFactor;

    // 控制点位置（实现下垂效果）
    const controlX = midX;
    const controlY = midY + sag;

    // 计算曲线总长度（近似）
    let totalLength = 0;
    const tempPoints = [];

    // 使用200段来估算曲线长度
    for (let i = 0; i <= 200; i++) {
        const t = i / 200;
        const x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * controlX + t * t * end.x;
        const y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * controlY + t * t * end.y;
        tempPoints.push({ x, y });
        if (i > 0) {
            totalLength += Math.hypot(x - tempPoints[i - 1].x, y - tempPoints[i - 1].y);
        }
    }

    // 自动计算线段数量（至少5个）
    const linkCount = Math.max(5, Math.round(totalLength / linkSize));

    // 等距采样点
    const segmentLength = totalLength / linkCount;
    const points = [];
    points.push({ x: start.x, y: start.y });

    for (let i = 1; i < linkCount; i++) {
        const targetLength = i * segmentLength;
        let accumulatedLength = 0;

        for (let j = 1; j < tempPoints.length; j++) {
            const dx = tempPoints[j].x - tempPoints[j - 1].x;
            const dy = tempPoints[j].y - tempPoints[j - 1].y;
            const segment = Math.hypot(dx, dy);

            if (accumulatedLength + segment >= targetLength) {
                const ratio = (targetLength - accumulatedLength) / segment;
                const x = tempPoints[j - 1].x + dx * ratio;
                const y = tempPoints[j - 1].y + dy * ratio;

                points.push({ x, y });
                break;
            }

            accumulatedLength += segment;
        }
    }

    points.push({ x: end.x, y: end.y });

    return { points, linkCount, totalLength };
}
