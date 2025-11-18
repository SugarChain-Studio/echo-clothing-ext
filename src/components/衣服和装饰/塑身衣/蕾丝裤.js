import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "蕾丝裤",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Priority: 20,
    Layer: [
        {
            Name: "裤子",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                KneelingSpread: "KneelingSpread",
                Kneel: "Kneel",
                Spread: "Spread",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "图案",
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
        裤子: "Pants",
        图案: "Pattern",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "蕾丝裤",
    EN: "Lace Pants",
    RU: "Рюнорные штанишки",
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { layerNames, translation });
    luziSuffixFixups("ClothLower", asset.Name);
}
