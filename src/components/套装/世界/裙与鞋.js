import { AssetManager } from "@local/AssetManager";
import { PoseMapTool } from "@local/lib/generator";

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "Shoes",
        {
            Name: "蝴蝶结鞋子",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            PoseMapping: PoseMapTool.config(
                ["LegsClosed", "Spread"],
                ["AllFours", "Kneel", "KneelingSpread", "Hogtied"]
            ),
            Layer: [],
        },
        {
            translation: { CN: "蝴蝶结鞋子", EN: "Bow Shoes" },
        },
    ],
    [
        "Cloth",
        {
            Name: "粉蓝白裙",
            Random: false,
            Left: 0,
            Top: 0,
            DynamicGroupName: "Cloth",
            PoseMapping: PoseMapTool.hideFullBody(),
            ParentGroup: {},
            Layer: [{ Name: "衣服", ParentGroup: "BodyUpper" }, { Name: "围脖" }, { Name: "尾巴带子" }],
        },
        {
            translation: { CN: "粉蓝白裙 (制作中)", EN: "PBW Skirt (WIP)" },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}
