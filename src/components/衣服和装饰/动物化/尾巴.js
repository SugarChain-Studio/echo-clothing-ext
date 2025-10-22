import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const assets = [
    [
        {
            Name: "尾巴1_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            DefaultColor: ["#3B0505"],
            PoseMapping: {
                Kneel: "Kneel",
                KneelingSpread: "Kneel",
                Hogtied: "Kneel",
                AllFours: "Kneel",
            },
        },
        { translation: { CN: "❤尖尾巴1", EN: "❤ Tip Tail 1" } },
    ],
    [
        {
            Name: "尾巴2_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            DefaultColor: ["#3B0505"],
            Layer: [
                { Name: "1", Priority: 1 },
                { Name: "2", Priority: 40, CopyLayerColor: "1" },
            ],
        },
        { translation: { CN: "❤尖尾巴2", EN: "❤ Tip Tail 2" } },
    ],
    [
        {
            Name: "尾巴3_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            DefaultColor: ["#3B0505"],
            Layer: [
                { Name: "1", Priority: 1 },
                { Name: "2", Priority: 40, CopyLayerColor: "1" },
            ],
        },
        { translation: { CN: "❤尖尾巴3", EN: "❤ Tip Tail 3" } },
    ],
    [
        {
            Name: "雪豹尾巴_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Layer: [{ Name: "1" }, { Name: "2" }],
        },
        { translation: { CN: "雪豹尾巴", EN: "Snow Leopard Tail" } },
    ],
    [
        {
            Name: "雪豹尾巴镜像_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Layer: [{ Name: "1" }, { Name: "2" }],
        },
        { translation: { CN: "雪豹尾巴(镜像)", EN: "Snow Leopard Tail (Mirror)" } },
    ],
    [
        {
            Name: "鱼尾1_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Layer: [{ Name: "1" }, { Name: "2" }],
        },
        { translation: { CN: "鱼尾1", EN: "Fish Tail 1" } },
    ],
    [
        {
            Name: "鱼尾2_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Layer: [{ Name: "1" }, { Name: "2" }],
        },
        { translation: { CN: "鱼尾2", EN: "Fish Tail 2" } },
    ],
    [
        {
            Name: "蝎子尾巴",
            Random: false,
            Left: 50,
            Top: 170,
            Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }],
        },
        {
            translation: { CN: "蝎子尾巴", EN: "Scorpion Tail" },
            layerNames: {
                CN: {
                    A1: "底色",
                    A2: "高光",
                    A3: "描边",
                },
                EN: {
                    A1: "Base Color",
                    A2: "Highlight",
                    A3: "Outline",
                },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig("TailStraps", assets);
}
