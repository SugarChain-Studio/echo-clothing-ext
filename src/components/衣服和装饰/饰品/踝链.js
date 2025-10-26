import { DialogTools, ImageMapTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { PostPass, PoseMapTool, Typing } from "../../../lib";
import { LRTool } from "../../../lib/sockLR";

const LRStringGen = (base, key, blr = [0, 1, 2]) =>
    DialogTools.combine(
        {
            CN: {
                [`Option${key}${blr[0]}`]: "都有",
                [`Option${key}${blr[1]}`]: "左",
                [`Option${key}${blr[2]}`]: "右",
                ...(blr.length > 3 ? { [`Option${key}${blr[3]}`]: "无" } : {}),
            },
            EN: {
                [`Option${key}${blr[0]}`]: "Both",
                [`Option${key}${blr[1]}`]: "Left",
                [`Option${key}${blr[2]}`]: "Right",
                ...(blr.length > 3 ? { [`Option${key}${blr[3]}`]: "None" } : {}),
            },
        },
        base
    );

const LRStrings = LRStringGen(
    {
        CN: {
            Module左右: "左右",
            Select左右: "选择佩戴哪一边",
        },
        EN: {
            Module左右: "Side",
            Select左右: "Select which side to wear",
        },
    },
    "lr"
);

/** @type { AddAssetWithConfigParams[] } */
const asset = [
    [
        ["Jewelry", "ClothAccessory"],
        PostPass.asset(
            {
                Name: "踝链A",
                Random: false,
                Left: 130,
                Top: 850,
                Priority: 20,
                DynamicGroupName: "Jewelry",
                ParentGroup: "BodyLower",
                DefaultColor: ["Default", "#9FEEFF", "Default"],
                PoseMapping: PoseMapTool.config(["Spread", "LegsClosed"], ["Kneel", "KneelingSpread"]),
                Layer: [
                    { Name: "链" },
                    { Name: "钻", AllowTypes: { s: 0 } },
                    { Name: "珠", AllowTypes: { s: 1 } },
                    { Name: "链2", Priority: 7, CopyLayerColor: "链" },
                ],
            },
            (asset) => {
                AssetManager.addImageMapping(
                    ImageMapTools.mirrorBodyTypeLayer("Jewelry", asset, "Normal", ["Small", "Large"])
                );
                LRTool.createLRConfig("Jewelry", asset, { key: "lr", Left: 1, Right: 2 });
            }
        ),
        {
            translation: { CN: "踝链A", EN: "Anklet A" },
            layerNames: {
                CN: { 链: "链条", 钻: "钻石", 珠: "珍珠" },
                EN: { 链: "Chain", 钻: "Diamond", 珠: "Pearl" },
            },
            extended: {
                Archetype: "modular",
                DrawImages: false,
                Modules: [
                    { Name: "左右", Key: "lr", Options: [{}, {}, {}] },
                    { Name: "样式", Key: "s", Options: [{}, {}] },
                ],
            },
            assetStrings: DialogTools.combine(
                {
                    CN: {
                        SelectBase: "配置踝链样式",

                        Module样式: "样式",
                        Select样式: "选择踝链样式",
                        Options0: "钻石",
                        Options1: "珍珠",
                    },
                    EN: {
                        SelectBase: "Select Anklet Style",

                        Module样式: "Style",
                        Select样式: "Select anklet style",
                        Options0: "Diamond",
                        Options1: "Pearl",
                    },
                },
                LRStrings
            ),
        },
    ],
    [
        ["Jewelry", "ClothAccessory"],
        PostPass.asset(
            {
                Name: "踝链B",
                Random: false,
                Left: 130,
                Top: 850,
                Priority: 20,
                DynamicGroupName: "Jewelry",
                ParentGroup: "BodyLower",
                PoseMapping: PoseMapTool.config(["Spread", "LegsClosed"], ["Kneel", "KneelingSpread"]),
                Layer: [{ Name: "环" }, { Name: "饰", AllowTypes: { o: 0 } }],
            },
            (asset) => {
                AssetManager.addImageMapping(
                    ImageMapTools.mirrorBodyTypeLayer("Jewelry", asset, "Normal", ["Small", "Large"])
                );
                LRTool.createLRConfig("Jewelry", asset, { key: "lr", Left: 1, Right: 2 });
            }
        ),
        {
            translation: { CN: "踝链B", EN: "Anklet B" },
            layerNames: {
                CN: { 环: "环", 饰: "饰品" },
                EN: { 环: "Ring", 饰: "Ornament" },
            },
            extended: {
                Archetype: "modular",
                DrawImages: false,
                Modules: [
                    { Name: "左右", Key: "lr", Options: [{}, {}, {}] },
                    { Name: "饰品", Key: "o", Options: [{}, {}] },
                ],
            },
            assetStrings: DialogTools.combine(
                {
                    CN: {
                        SelectBase: "配置踝链样式",

                        Module饰品: "饰品",
                        Select饰品: "选择是否有饰品",
                        Optiono0: "有",
                        Optiono1: "无",
                    },
                    EN: {
                        SelectBase: "Select Anklet Style",

                        Module饰品: "Ornament",
                        Select饰品: "Select whether to have ornament",
                        Optiono0: "Yes",
                        Optiono1: "No",
                    },
                },
                LRStrings
            ),
        },
    ],
    [
        ["Jewelry", "ClothAccessory"],
        PostPass.asset(
            {
                Name: "踝链C",
                Random: false,
                Priority: 20,
                DynamicGroupName: "Jewelry",
                ParentGroup: {},
                PoseMapping: {},
                Layer: [
                    ...Typing.layerMap(
                        [
                            { Name: "环_左", ColorGroup: "脚环", AllowTypes: { a: [0, 1] } },
                            { Name: "环_右", ColorGroup: "脚环", AllowTypes: { a: [0, 2] } },
                        ],
                        (def) => ({
                            ...def,
                            Left: 140,
                            Top: 830,
                            ParentGroup: "BodyLower",
                            PoseMapping: PoseMapTool.config(["Spread", "LegsClosed"], ["Kneel", "KneelingSpread"]),
                        })
                    ),
                    ...Typing.layerMap(
                        [
                            { Name: "手环_左", ColorGroup: "手环", AllowTypes: { w: [0, 1] } },
                            { Name: "手环_右", ColorGroup: "手环", AllowTypes: { w: [0, 2] } },
                        ],
                        (def) => ({
                            ...def,
                            ...Tools.topLeftBuilder(
                                { Left: 160, Top: 370 },
                                ["OverTheHead", { Left: 110, Top: 80 }],
                                ["Yoked", { Left: 60, Top: 230 }]
                            ),
                            ParentGroup: {},
                            PoseMapping: PoseMapTool.config(
                                ["Yoked", "OverTheHead"],
                                ["BackBoxTie", "BackCuffs", "BackElbowTouch"]
                            ),
                        })
                    ),
                ],
            },
            (asset) => {
                AssetManager.addImageMapping(
                    ImageMapTools.mirrorBodyTypeLayer("Jewelry", asset, "Normal", ["Small", "Large"])
                );
            }
        ),
        {
            translation: { CN: "手镯/踝链C", EN: "Wristlet/Anklet C" },
            layerNames: {
                CN: { 环_左: "左", 环_右: "右", 手环_左: "左", 手环_右: "右", 手环: "手环", 脚环: "脚环" },
                EN: { 环_左: "L", 环_右: "R", 手环_左: "L", 手环_右: "R", 手环: "Wristlet", 脚环: "Anklet" },
            },
            extended: {
                Archetype: "modular",
                DrawImages: false,
                Modules: [
                    { Name: "手环", Key: "w", Options: [{}, {}, {}, {}] },
                    { Name: "脚环", Key: "a", Options: [{}, {}, {}, {}] },
                ],
            },
            assetStrings: DialogTools.combine(
                { CN: { SelectBase: "配置踝链样式" }, EN: { SelectBase: "Select Anklet Style" } },
                LRStringGen(
                    {
                        CN: { Module手环: "手环", Select手环: "配置手环" },
                        EN: { Module手环: "Wristlet", Select手环: "Configure Wristlet" },
                    },
                    "w",
                    [0, 1, 2, 3]
                ),
                LRStringGen(
                    {
                        CN: { Module脚环: "脚环", Select脚环: "配置脚环" },
                        EN: { Module脚环: "Anklet", Select脚环: "Configure Anklet" },
                    },
                    "a",
                    [0, 1, 2, 3]
                )
            ),
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}
