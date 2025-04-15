import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "皮革中空短裙",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    ParentGroup: {},
    Layer: [
        {
            Name: "底",
            Priority: 26,
        },
        {
            Name: "反光",
            Priority: 26,
        },
    ],
};

/** @type {Translation.Dialog} */
const layerNames = {
    CN: {
        底: "底色",
        反光: "反光",
    },
    EN: {
        底: "Base",
        反光: "Reflective",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "皮革中空短裙",
    EN: "Leather Sideway Skirt",
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { translation, layerNames });
}
