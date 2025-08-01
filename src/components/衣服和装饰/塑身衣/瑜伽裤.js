import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "瑜伽裤_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 24,
    Layer: [
        {
            Name: "上",
            PoseMapping: {
                LegsClosed: PoseType.DEFAULT,
                KneelingSpread: PoseType.DEFAULT,
                Kneel: PoseType.DEFAULT,
                Spread: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                KneelingSpread: "KneelingSpread",
                Kneel: "Kneel",
                Spread: "Spread",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
    ],
};

const layerNames = {
    EN: {
        上: "Top",
        下: "Bottom",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "瑜伽裤",
    EN: "Yoga Pants",
};

export default function () {
    AssetManager.addAssetWithConfig(
        "ClothLower",
        {
            ...asset,
            Left: {
                [PoseType.DEFAULT]: 0,
                KneelingSpread: 90,
            },
        },
        { layerNames, translation }
    );
    AssetManager.addAssetWithConfig("SuitLower", asset, { layerNames, translation });
}
