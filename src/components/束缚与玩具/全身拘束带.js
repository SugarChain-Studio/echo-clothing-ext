import { AssetManager } from "../../assetForward";
import { PoseMapTool } from "../../lib";

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const asset = [
    [
        {
            Name: "全身条带拘束",
            Random: false,
            Gender: "F",
            Left: 0,
            Top: 0,
            Time: 15,
            Difficulty: 25,
            AllowLock: true,
            DrawLocks: false,
            Effect: [E.Block, E.BlockWardrobe, E.Slow],
            DynamicGroupName: "ItemTorso",
            Prerequisite: ["HasBreasts"],
            SetPose: ["BackElbowTouch", "LegsClosed"],
            AllowActivePose: ["BackElbowTouch", "Kneel", "LegsClosed"],
            ParentGroup: {},
            DefaultColor: ["Default", "#4A4A4A", "Default", "#E2C443", "Default", "#4A4A4A", "Default", "#E2C443"],
            Layer: [
                { Name: "A1_U", ColorGroup: "环", ParentGroup: "BodyUpper" },
                { Name: "A1_L", CopyLayerColor: "A1_U", ParentGroup: "BodyLower" },
                { Name: "B1", ColorGroup: "条带" },
                { Name: "B2", ColorGroup: "阴影" },
                { Name: "B3", ColorGroup: "轮廓线" },
                { Name: "C1", ColorGroup: "环" },
                { Name: "D1_U", ColorGroup: "条带", ParentGroup: "BodyUpper" },
                { Name: "D1_L", CopyLayerColor: "D1_U", ParentGroup: "BodyLower" },
                { Name: "D2_U", ColorGroup: "阴影", ParentGroup: "BodyUpper" },
                { Name: "D2_L", CopyLayerColor: "D2_U", ParentGroup: "BodyLower" },
                { Name: "D3_U", ColorGroup: "轮廓线", ParentGroup: "BodyUpper" },
                { Name: "D3_L", CopyLayerColor: "D3_U", ParentGroup: "BodyLower" },
                {
                    Name: "↑_遮罩",
                    BlendingMode: "destination-out",
                    TextureMask: {},
                    ParentGroup: "BodyUpper",
                    PoseMapping: PoseMapTool.config(["Kneel", "Hogtied"]),
                },
                {
                    Name: "↓_遮罩",
                    BlendingMode: "destination-out",
                    TextureMask: {},
                    ParentGroup: "BodyLower",
                    PoseMapping: PoseMapTool.config(["Kneel"]),
                },
            ],
        },
        {
            translation: { CN: "全身条带", EN: "Full Body Straps" },
            layerNames: {
                CN: { 环: "环", 条带: "条带", 阴影: "阴影", 轮廓线: "轮廓线" },
                EN: { 环: "Ring", 条带: "Strap", 阴影: "Shadow", 轮廓线: "Edge" },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(["ItemArms", "ItemTorso"], asset);
}
