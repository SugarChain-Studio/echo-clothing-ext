import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "裙子-Luzi",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Priority: 26,
    DefaultColor: ["#560E0E", "#560E0E", "#1F1F1F"],
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        {
            Name: "上",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
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
    luziFixups("ClothLower", asset.Name);
}
