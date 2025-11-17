import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../lib";
import { customFixup } from "../../../lib/fixups";

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const assets = [
    [
        {
            Name: "单边眼镜左-Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        { translation: { CN: "单边眼镜左", EN: "Monocle Left" } },
    ],
    [
        {
            Name: "单边眼镜右-Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        { translation: { CN: "单边眼镜右", EN: "Monocle Right" } },
    ],
    [
        {
            Name: "眼镜卡-Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Layer: [{ Name: "眼镜", Priority: 56 }],
        },
        { translation: { CN: "眼镜卡", EN: "Nose Clip Glasses" } },
    ],
    [
        {
            Name: "爱心眼镜-Luzi",
            Random: false,
            Left: 200,
            Top: 80,
            Priority: 56,
            Layer: [{ Name: "1" }, { Name: "2" }, { Name: "3" }, { Name: "4" }],
        },
        {
            translation: { CN: "爱心眼镜", EN: "Heart-shaped Glasses" },
            layerNames: {
                CN: { 1: "镜片", 2: "镜框", 3: "高光", 4: "暗色" },
                EN: { 1: "Lens", 2: "Frame", 3: "Highlight", 4: "Shadow" },
            },
        },
    ],
    [
        {
            Name: "下半框眼镜-Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        { translation: { CN: "下半框眼镜", EN: "Semi-rimless Glasses" } },
    ],
    [
        {
            Name: "色散墨镜",
            Random: false,
            Left: 190,
            Top: 80,
            Layer: [
                { Name: "r", CreateLayerTypes: ["typed"] },
                Typing.screenLayer({ Name: "rg", CreateLayerTypes: ["typed"] }),
                { Name: "g", CreateLayerTypes: ["typed"] },
            ],
            DefaultColor: ["#050505", "Default"],
        },
        {
            translation: { CN: "色散墨镜", EN: "Iridescent Sunglasses" },
            layerNames: {
                CN: { r: "眼镜框", g: "镜片" },
                EN: { r: "Frame", g: "Lens" },
            },
            extended: {
                Archetype: ExtendedArchetype.TYPED,
                DrawImages: false,
                Options: [{ Name: "Down" }, { Name: "Up", Property: { OverridePriority: 56 } }],
            },
            assetStrings: {
                CN: { Select: "选择墨镜佩戴方式", Down: "戴好", Up: "挂头顶" },
                EN: { Select: "Select Sunglasses Wearing Style", Down: "Worn", Up: "On Head" },
            },
        },
    ],
    [
        {
            Name: "墨镜A",
            Random: false,
            Left: 190,
            Top: 80,
            Layer: [
                { Name: "垫", CreateLayerTypes: ["typed"] },
                { Name: "架", CreateLayerTypes: ["typed"] },
                { Name: "镜", CreateLayerTypes: ["typed"] },
            ],
        },
        {
            translation: { CN: "飞行员墨镜", EN: "Aviator Sunglasses" },
            layerNames: {
                CN: { 垫: "鼻垫", 架: "镜架", 镜: "镜片" },
                EN: { 垫: "Pad", 架: "Frame", 镜: "Lens" },
            },
            extended: {
                Archetype: ExtendedArchetype.TYPED,
                DrawImages: false,
                Options: [{ Name: "Down" }, { Name: "Up", Property: { OverridePriority: 56 } }],
            },
            assetStrings: {
                CN: { Select: "选择墨镜佩戴方式", Down: "戴好", Up: "挂头顶" },
                EN: { Select: "Select Sunglasses Wearing Style", Down: "Worn", Up: "On Head" },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig("Glasses", assets);

    for (const [asset] of assets) {
        customFixup({
            New: { Group: "Glasses", Name: asset.Name },
            Old: { Group: "Glasses", Name: asset.Name.replace("-Luzi", "_Luzi") },
        });
    }
}
