import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "长裙_Luzi",
    Random: false,
    Left: 20,
    Top: 200,
    Priority: 30,
    ParentGroup: "BodyUpper",
    DynamicGroupName: "Cloth",
    PoseMapping: {
        ...AssetPoseMapping.ClothLower,
        Kneel: "LegsClosed",
        KneelingSpread: PoseType.DEFAULT,
    },
    Layer: [{ Name: "1" }, { Name: "2" }, { Name: "3" }, { Name: "4" }],
};

const translation = {
    CN: "夜空银海礼服裙",
    EN: "Starry Ocean Evening Gown",
};

/** @type { Translation.String } */
const layerNames = {
    CN: {
        1: "裙装",
        2: "腰带",
        3: "身体珠宝",
        4: "裙珠宝",
    },
    EN: {
        1: "Dress",
        2: "Belt",
        3: "Body Jewelry",
        4: "Dress Jewelry",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, {
        translation,
        layerNames,
    });
}
