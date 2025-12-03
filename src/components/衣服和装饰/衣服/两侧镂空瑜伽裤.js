import { PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { Tools } from "@mod-utils/Tools";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ClothLower",
    {
        Name: "两侧镂空瑜伽裤",
        Random: false,
        ...Tools.topLeftBuilder({ Left: 100, Top: 420 }, ["KneelingSpread", { Left: 190 }]),
        ParentGroup: "BodyLower",
        DynamicGroupName: "ClothLower",
        PoseMapping: PoseMapTool.config(["Kneel", "KneelingSpread", "Spread", "LegsClosed"], ["AllFours", "Hogtied"]),
        Layer: [
            // 1~5
            { Name: "1" },
            { Name: "2" },
            { Name: "3" },
            { Name: "4" },
            { Name: "5" },
            { Name: "7", ParentGroup: {}, PoseMapping: PoseMapTool.hideFullBody(), ColorGroup: "String" },
            { Name: "8", ParentGroup: {}, PoseMapping: PoseMapTool.hideFullBody(), ColorGroup: "String" },
        ],
    },
    {
        translation: { CN: "两侧镂空瑜伽裤", EN: "Side Cutout Yoga Pants" },
        layerNames: {
            CN: { 1: "底色", 2: "暗色调", 3: "细节暗色调", 4: "中缝", 5: "描边", 7: "左", 8: "右", String: "绳带" },
            EN: {
                1: "Base",
                2: "Dark Tone",
                3: "Detail Dark Tone",
                4: "Crotch Seam",
                5: "Outline",
                7: "Left",
                8: "Right",
                String: "String",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
