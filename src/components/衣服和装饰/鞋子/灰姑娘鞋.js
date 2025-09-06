import { PoseMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";

/** @type {(layer:AssetLayerDefinition)=>AssetLayerDefinition} */
const baseLayer = (layer) => ({
    ...layer,
    Left: 120,
    Top: 850,
    InheritPoseMappingFields: true,
    PoseMapping: { Hogtied: "Hide" },
});

/** @type {(layer:AssetLayerDefinition)=>AssetLayerDefinition} */
const hogLayer = (layer) => ({
    ...layer,
    Priority: 10,
    Left: 210,
    Top: 505,
    PoseMapping: PoseMapTools.FromHide({ Hogtied: "Hogtied" }),
});

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "灰姑娘",
    Random: false,
    Height: 4,
    PoseMapping: {
        Kneel: "Hide",
        KneelingSpread: "Hide",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: "Hogtied",
        AllFours: "Hide",
    },
    ParentGroup: {},
    Layer: [
        baseLayer({ Name: "tu", Priority: 7 }),
        baseLayer({ Name: "gu", BlendingMode: "screen", AllowColorize: false, Priority: 7 }),
        baseLayer({ Name: "tt", CopyLayerColor: "tu" }),
        baseLayer({ Name: "gt", AllowColorize: false, BlendingMode: "screen" }),
        hogLayer({ Name: "th", CopyLayerColor: "tu" }),
        hogLayer({ Name: "gh", AllowColorize: false, BlendingMode: "screen" }),
    ],
};

const layerNames = {
    CN: { tu: "透明色", gu: "光泽色" },
    EN: { tu: "Trans Color", gu: "Gloss Color" },
};

const translation = {
    CN: "灰姑娘高跟鞋",
    EN: "Cinderella Heels",
};

export default function () {
    AssetManager.addAssetWithConfig("Shoes", asset, { layerNames, translation });
}
