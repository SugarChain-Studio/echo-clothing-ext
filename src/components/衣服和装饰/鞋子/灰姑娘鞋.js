import { ImageMapTools, PoseMapTools } from "@mod-utils/Tools";
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
    Top: 515,
    ParentGroup: {},
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
    ParentGroup: "BodyLower",
    Layer: [
        baseLayer({ Name: "du", Priority: 7 }),
        baseLayer({ Name: "gu", BlendingMode: "screen", Priority: 7 }),
        baseLayer({ Name: "dt", CopyLayerColor: "du" }),
        baseLayer({ Name: "gt", BlendingMode: "screen", CopyLayerColor: "gu" }),
        hogLayer({ Name: "dh", CopyLayerColor: "du" }),
        hogLayer({ Name: "gh", BlendingMode: "screen", CopyLayerColor: "gu" }),
    ],
};

const layerNames = {
    CN: { du: "透明色", gu: "光泽色" },
    EN: { du: "Trans Color", gu: "Gloss Color" },
};

const translation = {
    CN: "灰姑娘高跟鞋",
    EN: "Cinderella Heels",
};

export default function () {
    AssetManager.addImageMapping(ImageMapTools.mirrorBodyTypeLayer("Shoes", asset, "Normal", ["Small", "Large"]));
    AssetManager.addAssetWithConfig("Shoes", asset, { layerNames, translation });
}
