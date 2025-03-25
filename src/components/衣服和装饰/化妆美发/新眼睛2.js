import { AssetManager } from "../../../assetForward";

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    右眼_Luzi: [
        {
            Name: "眼睛1",
            Top: 120,
            Left: 180,
            FullAlpha: false,
        },
        {
            Name: "眼睛2",
            Top: 0,
            Left: 0,
            DefaultColor: [
                "Default",
                "#6B82A2",
                "Default",
                "Default",
                "Default",
                "#242424",
            ],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "2i", AllowColorize: false },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
                { Name: "5", AllowColorize: true },
                { Name: "6", AllowColorize: true },
            ],
        },
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        右眼_Luzi: {
            眼睛1: "红宝石",
        },
    },
    EN: {
        右眼_Luzi: {
            眼睛1: "Ruby",
        },
    },
};

export default function () {
    AssetManager.addGroupedAssets(assets, translations);
}
