import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {AddAssetWithConfigParams[]} */
const assets = [
    [
        "Cloth",
        {
            Name: "披肩",
            Random: false,
            Gender: "F",
            Top: -110,
            Left: 0,
            Prerequisite: ["HasBreasts"],
            Layer: [
                {
                    Name: "Band",
                    Priority: 34,
                    ParentGroup: {},
                    PoseMapping: {},
                },
                {
                    Name: "Shawl",
                    Priority: 34,
                    ParentGroup: {},
                    PoseMapping: {
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                    },
                },
            ],
        },
        {
            translation: {
                CN: "天主披肩",
                EN: "Christian Shawl",
                RU: "Палантин",
                UA: "Палантин",
            },
            layerNames: {
                CN: { Band: "披肩带", Shawl: "披肩" },
                EN: { Band: "Band", Shawl: "Shawl" },
            },
        },
    ],
    [
        "ClothAccessory",
        {
            Name: "披肩短",
            Random: false,
            Gender: "F",
            Left: 110,
            Top: 160,
            Priority: 34,
            PoseMapping: {
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
            },
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            DefaultColor: ["#490707", "#490707", "#FFFFFF", "#FFFFFF"],
            Layer: [
                { Name: "衣左", ColorGroup: "衣" },
                { Name: "衣右", ColorGroup: "衣" },
                { Name: "绒左", ColorGroup: "绒" },
                { Name: "绒右", ColorGroup: "绒" },
            ],
        },
        {
            translation: {
                CN: "圣诞披肩短",
                EN: "Xmas Short Shawl",
                RU: "Короткий палантин",
                UA: "Короткий палантин",
            },
            layerNames: {
                CN: { 衣左: "左", 衣右: "右", 绒左: "左", 绒右: "右", 衣: "披风", 绒: "绒毛" },
                EN: { 衣左: "Left", 衣右: "Right", 绒左: "Left", 绒右: "Right", 衣: "Cloth", 绒: "Fur" },
            },
        },
    ],
    [
        "ClothAccessory",
        {
            Name: "披肩长",
            Random: false,
            Gender: "F",
            Left: 80,
            Top: 130,
            Priority: 32,
            PoseMapping: {
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
            },
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            DefaultColor: ["#490707", "#490707", "#FFFFFF", "#FFFFFF"],
            Layer: [
                { Name: "衣左", ColorGroup: "衣" },
                { Name: "衣右", ColorGroup: "衣" },
                { Name: "绒左", ColorGroup: "绒" },
                { Name: "绒右", ColorGroup: "绒" },
            ],
        },
        {
            translation: {
                CN: "圣诞披肩长",
                EN: "Xmas Long Shawl",
                RU: "Длинный палантин",
                UA: "Довгий палантин",
            },
            layerNames: {
                CN: { 衣左: "左", 衣右: "右", 绒左: "左", 绒右: "右", 衣: "披风", 绒: "绒毛" },
                EN: { 衣左: "Left", 衣右: "Right", 绒左: "Left", 绒右: "Right", 衣: "Cloth", 绒: "Fur" },
            },
        },
    ],
    [
        "ClothAccessory",
        {
            Name: "立领披肩",
            Random: false,
            Gender: "F",
            Top: 0,
            Left: 0,
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            Layer: [
                {
                    Name: "披肩",
                    Priority: 34,
                    PoseMapping: {
                        BackCuffs: "BackCuffs",
                        BackElbowTouch: "BackElbowTouch",
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                    },
                },
                {
                    Name: "披肩后",
                    Priority: 1,
                    PoseMapping: {
                        Yoked: "Yoked",
                    },
                },
            ],
        },
        {
            translation: {
                CN: "血族斗篷",
                EN: "Vampiric Cloak",
            },
            layerNames: {
                CN: { 披肩: "披肩", 披肩后: "披肩后" },
                EN: { 披肩: "Shawl", 披肩后: "Shawl Back" },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
    for (const asset of assets) {
        luziSuffixFixups(asset[0], asset[1].Name);
    }
}
