import { AssetManager } from "../../../assetForward";

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    Gloves: [
        {
            Name: "袖手套_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            PoseMapping: {
                TapedHands: "TapedHands",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "BackBoxTie",
                BackElbowTouch: "Hide",
                BackCuffs: "BackCuffs",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "丝手套2_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            PoseMapping: {
                TapedHands: "TapedHands",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "BackBoxTie",
                BackElbowTouch: "Hide",
                BackCuffs: "Hide",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "手套渐变_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            PoseMapping: {
                TapedHands: "TapedHands",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "BackBoxTie",
                BackElbowTouch: "Hide",
                BackCuffs: "Hide",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        Gloves: {
            袖手套_Luzi: "袖手套",
            丝手套2_Luzi: "丝手套 2",
            手套渐变_Luzi: "手套渐变",
        },
    },
    EN: {
        Gloves: {
            袖手套_Luzi: "Sleeve Gloves",
            丝手套2_Luzi: "丝手套 2",
            手套渐变_Luzi: "手套渐变",
        },
    },
    RU: {
        Gloves: {
            袖手套_Luzi: "Перчатки-рукава",
            丝手套2_Luzi: "丝手套 2",
            手套渐变_Luzi: "手套渐变",
        },
    },
};

export default function () {
    AssetManager.addGroupedAssets(assets, translations);
}
