import { AssetManager } from "@local/AssetManager";
import { luziSuffixFixups } from "@local/lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "裙子",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Priority: 26,
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        {
            Color: ["#560E0E"],
            Name: "上",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Color: ["#560E0E"],
            Name: "下",
            PoseMapping: {
                Kneel: "Kneel",
                KneelingSpread: "KneelingSpread",
                LegsClosed: PoseType.DEFAULT,
                Spread: PoseType.DEFAULT,
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Color: ["#1F1F1F"],
            Name: "扣子",
            ParentGroup: {},
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
    ],
};

const layerNames = {
    EN: {
        上: "Top",
        下: "Bottom",
        扣子: "Buttons",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "呢子高腰裙子",
    EN: "Woolen High Waist Skirt",
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { translation, layerNames });
    luziSuffixFixups("ClothLower", asset.Name);
}
