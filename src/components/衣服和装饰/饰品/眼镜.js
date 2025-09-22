import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const assets = [
    [
        {
            Name: "单边眼镜左_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        { translation: { CN: "单边眼镜左", EN: "Monocle Left" } },
    ],
    [
        {
            Name: "单边眼镜右_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        { translation: { CN: "单边眼镜右", EN: "Monocle Right" } },
    ],
    [
        {
            Name: "眼镜卡_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Layer: [{ Name: "眼镜", Priority: 56 }],
        },
        { translation: { CN: "眼镜卡", EN: "Nose Clip Glasses" } },
    ],
    [
        {
            Name: "爱心眼镜_Luzi",
            Random: false,
            Left: 200,
            Top: 80,
            Priority: 56,
            Layer: [{ Name: "1" }, { Name: "2" }, { Name: "3" }, { Name: "4" }],
        },
        {
            translation: { CN: "爱心眼镜", EN: "Heart-shaped Glasses" },
            layerNames: {
                CN: {
                    1: "镜片",
                    2: "镜框",
                    3: "高光",
                    4: "暗色",
                },
                EN: {
                    1: "Lens",
                    2: "Frame",
                    3: "Highlight",
                    4: "Shadow",
                },
            },
        },
    ],
    [
        {
            Name: "下半框眼镜_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        { translation: { CN: "下半框眼镜", EN: "Semi-rimless Glasses" } },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig("Glasses", assets);
}
