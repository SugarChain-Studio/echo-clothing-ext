import { AssetManager } from "../../assetForward";

/** @type {AddAssetWithConfigParams} */
const assets = [
    "ItemDevices",
    {
        Name: "电钢琴",
        Random: false,
        Left: -40,
        Top: 420,
        DynamicGroupName: "ItemDevices",
        FixedPosition: true,
        Layer: [
            { Name: "SupportScrew" },
            { Name: "SupportPillars" },
            { Name: "Wood" },
            { Name: "BlackKeys" },
            { Name: "WhiteKeys" },
            { Name: "BodyBack" },
            { Name: "ControlsTop2", ColorGroup: "Controls" },
            { Name: "BodyFront", CopyLayerColor: "BodyBack" },
            { Name: "ControlsTop", ColorGroup: "Controls" },
            { Name: "ControlsFront", ColorGroup: "Controls" },
        ],
    },
    {
        translation: { CN: "电钢琴", EN: "Electric Piano" },
        layerNames: {
            CN: {
                SupportScrew: "支撑螺丝",
                SupportPillars: "支撑柱",
                Wood: "木质部分",
                BlackKeys: "黑键",
                WhiteKeys: "白键",
                BodyBack: "琴身",
                ControlsTop2: "左侧",
                ControlsTop: "主体",
                ControlsFront: "前面",

                Controls: "控制面板",
            },
            EN: {
                SupportScrew: "Support Screw",
                SupportPillars: "Support Pillars",
                Wood: "Wood",
                BlackKeys: "Black Keys",
                WhiteKeys: "White Keys",
                BodyBack: "Body",

                ControlsTop2: "Left Side",
                ControlsTop: "Main Body",
                ControlsFront: "Front",
                Controls: "Controls",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...assets);
}
