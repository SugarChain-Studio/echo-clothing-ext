import { AssetManager } from "../../../../assetForward";
import { Type } from "../../../../lib";

/** @type { AddAssetWithConfigParams[] } */
const asset = [
    [
        ["Jewelry", "ClothAccessory", "Necklace"],
        {
            Name: "项链A",
            Random: false,
            Left: 220,
            Top: 220,
            Priority: 20,
            DynamicGroupName: "Jewelry",
            ParentGroup: {},
            PoseMapping: {},
            Layer: [
                { Name: "cd" },
                Type.screenLayer({ Name: "cg" }),
                { Name: "td" },
                Type.screenLayer({ Name: "tg" }),
                { Name: "bd", CopyLayerColor: "2d", Priority: 5 },
                Type.screenLayer({ Name: "bg", Priority: 5 }),
            ],
        },
        {
            translation: { CN: "三曲枝项链", EN: "Triskelion Necklace" },
            layerNames: {
                CN: { cd: "链条", td: "三曲枝" },
                EN: { cd: "Chain", td: "Triskelion" },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}
