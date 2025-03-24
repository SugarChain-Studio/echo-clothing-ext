import { AssetManager } from "../../../assetForward";

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    左眼_Luzi: [
        {
            Name: "眼睛1",
            Top: 0,
            Left: 0,
            FullAlpha: false,
        },
    ],
    右眼_Luzi: [
        {
            Name: "眼睛1",
            ParentItem: "眼睛1",
            Top: 0,
            Left: 0,
            FullAlpha: false,
        },
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        左眼_Luzi: {
            眼睛1: "红宝石",
        },
        右眼_Luzi: {
            眼睛1: "红宝石",
        },
    },
    EN: {
        左眼_Luzi: {
            眼睛1: "Ruby",
        },
        右眼_Luzi: {
            眼睛1: "Ruby",
        },
    },
};

export default function () {
    AssetManager.addGroupedAssets(assets, translations);
}
