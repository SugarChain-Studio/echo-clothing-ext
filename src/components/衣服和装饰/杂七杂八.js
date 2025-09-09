import { AssetManager } from "../../assetForward";

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    Wings: [
        {
            Name: "蝴蝶结背饰_Luzi",
            Random: false,
            Top: -110,
            Left: 0,
        },
    ],
    Glasses: [
        {
            Name: "单边眼镜左_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        {
            Name: "单边眼镜右_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        {
            Name: "眼镜卡_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Layer: [{ Name: "眼镜", Priority: 56 }],
        },
        {
            Name: "爱心眼镜_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Priority: 56,
            Layer: [{ Name: "1" }, { Name: "2" }, { Name: "3" }, { Name: "4" }],
        },
        {
            Name: "下半框眼镜_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        Wings: {
            蝴蝶结背饰_Luzi: "蝴蝶结背饰",
        },
        Glasses: {
            单边眼镜左_Luzi: "单边眼镜左",
            单边眼镜右_Luzi: "单边眼镜右",
            眼镜卡_Luzi: "眼镜卡",
            爱心眼镜_Luzi: "爱心眼镜",
            下半框眼镜_Luzi: "下半框眼镜",
        },
    },
    EN: {
        Wings: {
            蝴蝶结背饰_Luzi: "Bow Back Accessory",
        },
        Glasses: {
            单边眼镜左_Luzi: "Monocle Left",
            单边眼镜右_Luzi: "Monocle Right",
            眼镜卡_Luzi: "Nose Clip Glasses",
            爱心眼镜_Luzi: "Heart-shaped Glasses",
            下半框眼镜_Luzi: "Semi-rimless Glasses",
        },
    },
};

const layerNames = {
    CN: {
        Glasses: {
            爱心眼镜_Luzi: {
                1: "镜片",
                2: "镜框",
                3: "高光",
                4: "暗色",
            },
        },
    },
    EN: {
        Glasses: {
            爱心眼镜_Luzi: {
                1: "Lens",
                2: "Frame",
                3: "Highlight",
                4: "Shadow",
            },
        },
    },
};

export default function () {
    AssetManager.addGroupedAssetsWithConfig(assets, translations, layerNames);
}
