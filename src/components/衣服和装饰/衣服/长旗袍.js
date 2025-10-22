import { PoseMapTool } from "../../../lib";
import { ArmMaskTool, Typing } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { Tools } from "@mod-utils/Tools";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "Cloth",
    {
        Name: "长旗袍",
        Random: false,
        Gender: "F",
        ...Tools.topLeftBuilder(
            { Left: 170, Top: 210 },
            ["AllFours", { Left: 180, Top: 190 }],
            ["Hogtied", { Left: 180, Top: 210 }]
        ),
        Priority: 30,
        Prerequisite: ["HasBreasts"],
        PoseMapping: PoseMapTool.Config(["Hogtied", "AllFours"]),
        DefaultColor: [
            "Default",
            "Default",
            "Default",
            "Default",
            "#000000",
            "Default",
            "Default",
            "Default",
            "Default",
            "#000000",
            "Default",
            "Default",
            "Default",
        ],
        Layer: [
            { Name: "A1", ColorGroup: "Base" },
            { Name: "A2", ColorGroup: "Shade" },
            { Name: "A3", ColorGroup: "Highlight" },
            { Name: "B1", ColorGroup: "Trim" },
            { Name: "B2", ColorGroup: "Outline" },
            { Name: "C1", ColorGroup: "Base" },
            { Name: "C2", ColorGroup: "Shade" },
            { Name: "C3", ColorGroup: "Highlight" },
            { Name: "C5", ColorGroup: "Trim" },
            { Name: "C4", ColorGroup: "Outline" },
            { Name: "D1", ColorGroup: "Accessory", InheritPoseMappingFields: true, PoseMapping: { Hogtied: "Hide" } },
            { Name: "D2", ColorGroup: "Accessory", InheritPoseMappingFields: true, PoseMapping: { Hogtied: "Hide" } },
            { Name: "D3", ColorGroup: "Accessory" },
        ],
    },
    {
        translation: { CN: "长旗袍", EN: "Long Qipao Dress" },
        layerNames: {
            CN: {
                ...Typing.stringEntries(
                    [["A1", "A2", "A3", "B1", "B2"], "主体"],
                    [["C1", "C2", "C3", "C4", "C5"], "肩部"]
                ),
                D1: "吉祥结A",
                D2: "吉祥结B",
                D3: "纽扣结",

                Base: "基础",
                Shade: "阴影",
                Highlight: "高光",
                Trim: "边饰",
                Outline: "轮廓",
                Accessory: "配件",
            },
            EN: {
                ...Typing.stringEntries(
                    [["A1", "A2", "A3", "B1", "B2"], "Main"],
                    [["C1", "C2", "C3", "C4", "C5"], "Shoulder"]
                ),
                D1: "Lucky Knot A",
                D2: "Lucky Knot B",
                D3: "Button Knot",
                Base: "Base",
                Shade: "Shade",
                Highlight: "Highlight",
                Trim: "Trim",
                Outline: "Outline",
                Accessory: "Accessory",
            },
        },
    },
];

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset[1]);
    AssetManager.addAssetWithConfig(...asset);
}
