import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "绛云墨韵旗袍裙_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Prerequisite: ["HasBreasts"],
    PoseMapping: {
        AllFours: PoseType.HIDE,
        Hogtied: "Hogtied",
    },
    DefaultColor: [
        "Default", 
        "Default", 
        "Default", 
        "Default", 
        "#302D2D", 
        "#2C2626", 
        "Default", 
        "#000000", 
        "Default", 
        "#302D2D", 
        "#2C2626", 
        "Default", 
        "#000000", 
        "Default", 
        "#302D2D", 
        "#2C2626",  
        "Default", 
        "Default", 
        "Default", 
        "Default", 
    ],
    Layer: [
        { Name: "A1", Priority: 1 },
        { Name: "A2", Priority: 26 },
        { Name: "A3", Priority: 26 },
        { Name: "B1", Priority: 26 },
        { Name: "B2", Priority: 26 },
        { Name: "B3", Priority: 26 },
        { Name: "B4", Priority: 26 },
        { Name: "B5", Priority: 26 },
        { Name: "B6", Priority: 26 },
        { Name: "C1", Priority: 26 },
        { Name: "C2", Priority: 26 },
        { Name: "C3", Priority: 26 },
        { Name: "C4", Priority: 26 },
        { Name: "D1", Priority: 26 },
        { Name: "D2", Priority: 26 },
        { Name: "D3", Priority: 26 },
        { Name: "D4", Priority: 26 },
        { Name: "D5", Priority: 26 },
        { Name: "D6", Priority: 26 },
        { Name: "D7", Priority: 26 },

    ],
};

const translations = {
    CN: "绛云墨韵旗袍裙",
    EN: "Cheongsam with Dark - cloud and Ink - rhyme Patterns",
    RU: "Чэньшань с узорами тёмных облаков и инк-ритма",
};

export default function () {
    AssetManager.addAsset("Cloth", asset, undefined, translations);
}
