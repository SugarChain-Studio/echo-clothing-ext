import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "袜子蝴蝶结",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    ParentGroup: {},
    DefaultColor: [
        "#991d1d", 
        "#991d1d", 
        "#991d1d", 
        "#991d1d", 
        "#991d1d", 
        "#991d1d", 
        "#991d1d", 
        "#991d1d"
    ],
    Priority: 22,
    PoseMapping: {
        Kneel: "Kneel",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        KneelingSpread: "KneelingSpread",
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        { Name: "蝴蝶结1 左"},
        { Name: "蝴蝶结2 左", PoseMapping: {LegsClosed: "LegsClosed", Kneel: PoseType.HIDE, KneelingSpread: PoseType.HIDE}},
        { Name: "蝴蝶结3 左", PoseMapping: {LegsClosed: "LegsClosed", Kneel: PoseType.HIDE, KneelingSpread: PoseType.HIDE}},
        { Name: "蝴蝶结4 左", PoseMapping: {LegsClosed: "LegsClosed", Kneel: PoseType.HIDE, KneelingSpread: PoseType.HIDE}},
        { Name: "蝴蝶结1 右"},
        { Name: "蝴蝶结2 右", PoseMapping: {LegsClosed: "LegsClosed", Kneel: PoseType.HIDE, KneelingSpread: PoseType.HIDE}},
        { Name: "蝴蝶结3 右", PoseMapping: {LegsClosed: "LegsClosed", Kneel: PoseType.HIDE, KneelingSpread: PoseType.HIDE}},
        { Name: "蝴蝶结4 右", PoseMapping: {LegsClosed: "LegsClosed", Kneel: PoseType.HIDE, KneelingSpread: PoseType.HIDE}},
    ],
};


const translations = {
    CN: "袜子蝴蝶结",
    EN: "Socks Bow",
};


export default function () {
    AssetManager.addAsset("Garters", asset, undefined, translations);
}
