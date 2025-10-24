import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../lib";

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
                Typing.screenLayer({ Name: "cg" }),
                { Name: "td" },
                Typing.screenLayer({ Name: "tg" }),
                { Name: "bd", CopyLayerColor: "2d", Priority: 5 },
                Typing.screenLayer({ Name: "bg", Priority: 5 }),
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
