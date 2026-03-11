import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../../assetForward";
import { PoseMapTool, Typing } from "../../../../lib";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ClothLower",
    {
        Name: "裙子2",
        Random: false,
        ...Tools.topLeftBuilder({ Left: 80, Top: 410 }, ["KneelingSpread", { Left: 90 }]),
        Priority: 26,
        ParentGroup: {},
        Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
        PoseMapping: PoseMapTool.hideFullBody(),
        Layer: [
            { Name: "A1", ColorGroup: "Base" },
            { Name: "A2", ColorGroup: "Shade" },
            { Name: "A3", ColorGroup: "Line" },
            { Name: "B1", ColorGroup: "Base" },
            { Name: "B2", ColorGroup: "Shade" },
            { Name: "B3", ColorGroup: "Line" },
            { Name: "C1", ColorGroup: "Base" },
            { Name: "C2", ColorGroup: "Shade" },
            { Name: "C3", ColorGroup: "Line" },
            { Name: "D1", ColorGroup: "Base" },
            { Name: "D2", ColorGroup: "Shade" },
            { Name: "D3", ColorGroup: "Line" },
            { Name: "E1", ColorGroup: "Base" },
            { Name: "E2", ColorGroup: "Shade" },
            { Name: "E3", ColorGroup: "Line" },
        ],
    },
    {
        translation: { CN: "呢子短裙", EN: "Woolen Short Skirt" },
        layerNames: {
            CN: {
                ...Typing.stringEntries([["A1", "A2", "A3"], "左2"]),
                ...Typing.stringEntries([["B1", "B2", "B3"], "左1"]),
                ...Typing.stringEntries([["C1", "C2", "C3"], "右2"]),
                ...Typing.stringEntries([["D1", "D2", "D3"], "右1"]),
                ...Typing.stringEntries([["E1", "E2", "E3"], "前"]),
                Base: "基础",
                Shade: "阴影",
                Line: "线条",
            },
            EN: {
                ...Typing.stringEntries([["A1", "A2", "A3"], "Left2"]),
                ...Typing.stringEntries([["B1", "B2", "B3"], "Left1"]),
                ...Typing.stringEntries([["C1", "C2", "C3"], "Right2"]),
                ...Typing.stringEntries([["D1", "D2", "D3"], "Right1"]),
                ...Typing.stringEntries([["E1", "E2", "E3"], "Front"]),
                Base: "Base",
                Shade: "Shade",
                Line: "Line",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
