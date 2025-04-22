import { AssetManager } from "../../../assetForward";

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    ClothAccessory: [
        {
            Name: "蝴蝶结装饰",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            Extended: true,
            DefaultColor: [
                "#7d7d7d", // 右_底色 (bdbdbd * 0.66)
                "#92a3a8", // 右_装饰 (ddf7ff * 0.66)
                "#a888a7", // 右_本体 (ffcefd * 0.66)
                "#a8a580", // 右_装饰环 (fffac2 * 0.66)
                "#7699a8", // 右_装饰珠 (b2e7ff * 0.66)
                "#7d7d7d", // 左_底色 (bdbdbd * 0.66)
                "#92a3a8", // 左_装饰 (ddf7ff * 0.66)
                "#a888a7", // 左_本体 (ffcefd * 0.66)
                "#a8a580", // 左_装饰环 (fffac2 * 0.66)
                "#7699a8", // 左_装饰珠 (b2e7ff * 0.66)
            ],
            Priority: 34,
            Layer: [
                {
                    Name: "右_底色",
                },
                {
                    Name: "右_装饰",
                },
                {
                    Name: "右_本体",
                },
                {
                    Name: "右_装饰环",
                },
                {
                    Name: "右_装饰珠",
                },
                {
                    Name: "左_底色",
                },
                {
                    Name: "左_装饰",
                },
                {
                    Name: "左_本体",
                },
                {
                    Name: "左_装饰环",
                },
                {
                    Name: "左_装饰珠",
                },
            ],
        },
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        ClothAccessory: {
            蝴蝶结装饰: "蝴蝶结装饰",
        },
    },
    EN: {
        ClothAccessory: {
            蝴蝶结装饰: "Butterfly Decoration",
        },
    },
};

export default function () {
    AssetManager.addGroupedAssets(assets, translations);
}
