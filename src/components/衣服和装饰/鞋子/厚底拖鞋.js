import { PoseMapTools } from "@mod-utils/Tools";
import { ImageMapTools } from "@mod-utils/Tools/imageMapTools";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "厚拖",
    Random: false,
    Height: 2,
    Left: 120,
    Top: 860,
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
        { Name: "u", Priority: 7, InheritPoseMappingFields: true, PoseMapping: { Hogtied: "Hide" } },
        { Name: "t", CopyLayerColor: "u", InheritPoseMappingFields: true, PoseMapping: { Hogtied: "Hide" } },
        {
            Name: "h",
            CopyLayerColor: "u",
            ParentGroup: {},
            Top: 500,
            Left: 200,
            PoseMapping: PoseMapTools.FromHide({ Hogtied: "Hogtied" }),
        },
    ],
};

const layerNames = {};

const translation = {
    CN: "厚底拖鞋",
    EN: "Thick Slippers",
};

export default function () {
    AssetManager.addImageMapping(ImageMapTools.mirrorBodyTypeLayer("Shoes", asset, "Normal", ["Small", "Large"]));
    AssetManager.addAssetWithConfig("Shoes", asset, { layerNames, translation });
}
