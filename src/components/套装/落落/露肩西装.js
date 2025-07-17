import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "西装露肩_Luzi",
    Random: false,
    Left: 30,
    Top: 50,
    Priority: 35,
    ParentGroup: "BodyUpper",
    DynamicGroupName: "Cloth",
    PoseMapping: {
        ...AssetPoseMapping.Cloth,
        AllFours: PoseType.HIDE,
        BackCuffs: PoseType.HIDE,
        Hogtied: PoseType.HIDE,
    },
};

const translation = {
    CN: "随意滑落西装",
    EN: "Casual Dropped Suit",
};

export default function () {
    /** @type {AssetGroupBodyName[]} */
    const groups = ["Cloth", "ClothOuter"];
    for (const group of groups) {
        AssetManager.addAssetWithConfig(group, asset, {
            translation,
            layerNames: {},
        });
    }
}
