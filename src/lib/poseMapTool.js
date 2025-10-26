/**
 * 所有上半身动作都隐藏的 PoseMapping
 * @type {Readonly<AssetPoseMapping>}
 */
const PoseHideTop = {
    // "BaseUpper" | "BackBoxTie" | "BackCuffs" | "BackElbowTouch" | "OverTheHead" | "Yoked" | "TapedHands"
    BaseUpper: PoseType.HIDE,
    BackBoxTie: PoseType.HIDE,
    BackCuffs: PoseType.HIDE,
    BackElbowTouch: PoseType.HIDE,
    OverTheHead: PoseType.HIDE,
    Yoked: PoseType.HIDE,
};

/**
 * 所有下半身动作都隐藏的 PoseMapping
 * @type {Readonly<AssetPoseMapping>}
 */
const PoseHideBottom = {
    // "BaseLower" | "Kneel" | "KneelingSpread" | "LegsClosed" | "LegsOpen" | "Spread"
    BaseLower: PoseType.HIDE,
    Kneel: PoseType.HIDE,
    KneelingSpread: PoseType.HIDE,
    LegsClosed: PoseType.HIDE,
    LegsOpen: PoseType.HIDE,
    Spread: PoseType.HIDE,
};

const Constants = {
    /**
     * 隐藏所有物品的 PoseMapping
     * @type {Readonly<AssetPoseMapping>}
     */
    PoseHideAll: {
        ...PoseHideTop,

        // "BaseLower" | "Kneel" | "KneelingSpread" | "LegsClosed" | "LegsOpen" | "Spread"
        BaseLower: PoseType.HIDE,
        Kneel: PoseType.HIDE,
        KneelingSpread: PoseType.HIDE,
        LegsClosed: PoseType.HIDE,
        LegsOpen: PoseType.HIDE,
        Spread: PoseType.HIDE,

        // "Hogtied" | "AllFours" | "Suspension"
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },

    PoseHideTop,
    PoseHideBottom,
};

/**
 * 姿势映射工具类
 */
export class PoseMapTool {
    /**
     * 合成姿势映射，基础数据是所有姿势都隐藏。根据参数补充显示的姿势。
     *
     * @example
     * // 合成一个姿势映射，在Yoked姿势显示默认图片，在BackBoxTie姿势显示BackBoxTie目录下的图片，其他姿势都隐藏
     * const poseMapping = PoseMapTool.Compose({
     *     "Yoked": "",
     *     "BackBoxTie": "BackBoxTie"
     * });
     *
     * @param {AssetPoseMapping} posem 用于合成的姿势映射
     * @returns {AssetPoseMapping}
     */
    static fromHide(posem) {
        return { ...Constants.PoseHideAll, ...posem };
    }

    /**
     * 合成姿势映射，基础数据是所有上半身姿势都隐藏。根据参数补充显示的姿势。
     *
     * @param {AssetPoseMapping} posem 用于合成的姿势映射
     * @returns {AssetPoseMapping}
     */
    static fromTopHide(posem) {
        return { ...Constants.PoseHideTop, ...posem };
    }

    /**
     * 合成姿势映射，基础数据是所有下半身姿势都隐藏。根据参数补充显示的姿势。
     *
     * @param {AssetPoseMapping} posem 用于合成的姿势映射
     * @returns {AssetPoseMapping}
     */
    static fromBottomHide(posem) {
        return { ...Constants.PoseHideBottom, ...posem };
    }

    /**
     * 合成姿势映射，隐藏AllFours和Hogtied
     *
     * @example
     * // 如同 const poseMapping = { AllFours: "Hide", Hogtied: "Hide" }
     * const poseMapping = PoseMapTool.HideFullBody();
     *
     * // 如同 const poseMapping = { Yoked: "Hide", AllFours: "Hide", Hogtied: "Hide" }
     * const poseMapping = PoseMapTool.HideFullBody({Yoked: "Hide"});
     *
     * @param {AssetPoseMapping} [posem] 用于合成的姿势映射
     * @returns {AssetPoseMapping}
     */
    static hideFullBody(posem) {
        return { AllFours: "Hide", Hogtied: "Hide", ...posem };
    }

    /**
     * 配置姿势映射。
     * *注意：默认情况下的姿势均显示默认图片，只有在配置中明确指定的姿势，才会显示独特图片或者隐藏。*
     *
     * @example
     * // 配置一个姿势映射，AllFours和Hogtied姿势显示独特图片，BackBoxTie姿势隐藏
     * const poseMapping = PoseMapTool.Config(["AllFours", "Hogtied"], ["BackBoxTie"]);
     *
     * @param  {(keyof AssetPoseMapping)[]} poses 需要配置有独特路径的姿势
     * @param  {(keyof AssetPoseMapping)[]} [hides] 需要隐藏的姿势
     * @param {AssetPoseMapping} [base] 用于扩展的基础姿势映射
     * @returns {AssetPoseMapping}
     */
    static config(poses, hides, base) {
        const ret = { ...base };
        for (const p of poses) {
            ret[p] = p;
        }
        if (hides) {
            for (const h of hides) {
                ret[h] = PoseType.HIDE;
            }
        }
        return ret;
    }

    /**
     * 配置图层姿势映射。返回部分的图层定义，并且额外包含是否继承父级的 PoseMapping 字段。
     * *注意：默认情况下的姿势均显示默认图片，只有在配置中明确指定的姿势，才会显示独特图片或者隐藏。*
     *
     * @example
     * // 配置一个姿势映射，AllFours和Hogtied姿势显示独特图片，BackBoxTie姿势隐藏
     * const poseMapping = PoseMapTool.Config(["AllFours", "Hogtied"], ["BackBoxTie"]);
     * @param {boolean} inherit 是否继承父级的 PoseMapping 字段
     * @param  {(keyof AssetPoseMapping)[]} poses 需要配置有独特路径的姿势
     * @param  {(keyof AssetPoseMapping)[]} [hides] 需要隐藏的姿势
     * @param {AssetPoseMapping} [base] 用于扩展的基础姿势映射
     * @returns {Pick<AssetLayerDefinition, "PoseMapping" | "InheritPoseMappingFields">}
     */
    static LayerConfig(inherit, poses, hides, base) {
        return {
            InheritPoseMappingFields: inherit,
            PoseMapping: PoseMapTool.config(poses, hides, base),
        };
    }
}
