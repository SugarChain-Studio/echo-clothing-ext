import { ImmPass, PoseMapTool, Typing } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { ImageMapTools } from "@mod-utils/Tools";

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        ["Cloth", "Suit", "ClothAccessory"],
        ImmPass.asset(
            {
                Name: "时韵S",
                Random: false,
                Gender: "F",
                Left: 110,
                Top: 170,
                Priority: 18,
                Prerequisite: ["HasBreasts"],
                ParentGroup: "BodyUpper",
                DynamicGroupName: "Suit",
                Expose: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings"],
                PoseMapping: PoseMapTool.config(["BackCuffs", "BackElbowTouch", "Yoked", "OverTheHead"], ["AllFours"]),
                Layer: [
                    { Name: "A1", ColorGroup: "Base" },
                    { Name: "B1", ColorGroup: "Base" },
                    { Name: "A2", ColorGroup: "Sequin" },
                    { Name: "B2", ColorGroup: "Sequin" },
                ],
            },
            (asset) => {
                AssetManager.addImageMapping(
                    ImageMapTools.mirrorBodyTypeLayer("Suit", asset, "XLarge", ["Normal", "Large"])
                );
            }
        ),
        {
            translation: { CN: "时韵（肩部）", EN: "Chrono Pattern (Shoulder)" },
            layerNames: {
                CN: {
                    ...Typing.stringEntries([["A1", "A2"], "左"]),
                    ...Typing.stringEntries([["B1", "B2"], "右"]),
                    Base: "基础",
                    Sequin: "亮片",
                },
                EN: {
                    ...Typing.stringEntries([["A1", "A2"], "Left"]),
                    ...Typing.stringEntries([["B1", "B2"], "Right"]),
                    Base: "Base",
                    Sequin: "Sequin",
                },
            },
        },
    ],
    [
        ["Cloth", "Suit", "Bra"],
        {
            Name: "时韵B",
            Random: false,
            Gender: "F",
            Left: 140,
            Top: 280,
            Priority: 18,
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            DynamicGroupName: "Suit",
            Expose: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings"],
            PoseMapping: PoseMapTool.config(["Kneel", "KneelingSpread", "Hogtied"], ["AllFours"], {
                LegsClosed: "Kneel",
            }),
            Layer: [
                { Name: "A1_U", ColorGroup: "Base", ParentGroup: "BodyUpper" },
                { Name: "B1_U", ColorGroup: "Base", ParentGroup: "BodyUpper" },
                { Name: "A1_L", ColorGroup: "Base", ParentGroup: "BodyLower" },
                { Name: "B1_L", ColorGroup: "Base", ParentGroup: "BodyLower" },
                { Name: "A2_U", ColorGroup: "Sequin", ParentGroup: "BodyUpper" },
                { Name: "B2_U", ColorGroup: "Sequin", ParentGroup: "BodyUpper" },
                { Name: "A2_L", ColorGroup: "Sequin", ParentGroup: "BodyLower" },
                { Name: "B2_L", ColorGroup: "Sequin", ParentGroup: "BodyLower" },
            ],
        },
        {
            translation: { CN: "时韵（身体）", EN: "Chrono Pattern (Body)" },
            layerNames: {
                CN: {
                    ...Typing.stringEntries([["A1_U", "A2_U", "A1_L", "A2_L"], "左"]),
                    ...Typing.stringEntries([["B1_U", "B2_U", "B1_L", "B2_L"], "右"]),
                    Base: "基础",
                    Sequin: "亮片",
                },
                EN: {
                    ...Typing.stringEntries([["A1_U", "A2_U", "A1_L", "A2_L"], "Left"]),
                    ...Typing.stringEntries([["B1_U", "B2_U", "B1_L", "B2_L"], "Right"]),
                    Base: "Base",
                    Sequin: "Sequin",
                },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}
