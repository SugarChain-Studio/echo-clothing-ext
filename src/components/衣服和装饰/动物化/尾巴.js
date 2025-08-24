import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinitionAppearance[]} */
const assets = [
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
    {
        Name: "雪豹尾巴_Luzi",
        Random: false,
        Top: 0,
        Left: 0,
        Layer: [{ Name: "1" }, { Name: "2" }],
    },
    {
        Name: "雪豹尾巴镜像_Luzi",
        Random: false,
        Top: 0,
        Left: 0,
        Layer: [{ Name: "1" }, { Name: "2" }],
    },
    {
        Name: "鱼尾1_Luzi",
        Random: false,
        Top: 0,
        Left: 0,
        Layer: [{ Name: "1" }, { Name: "2" }],
    },
    {
        Name: "鱼尾2_Luzi",
        Random: false,
        Top: 0,
        Left: 0,
        Layer: [{ Name: "1" }, { Name: "2" }],
    },
];

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        TailStraps: {
            尾巴1_Luzi: "尾巴 1",
            尾巴2_Luzi: "尾巴 2",
            尾巴3_Luzi: "尾巴 3",
            雪豹尾巴_Luzi: "雪豹尾巴",
            雪豹尾巴镜像_Luzi: "雪豹尾巴镜像",
            鱼尾1_Luzi: "鱼尾 1",
            鱼尾2_Luzi: "鱼尾 2",
        },
    },
    EN: {
        TailStraps: {
            尾巴1_Luzi: "Tail 1",
            尾巴2_Luzi: "Tail 2",
            尾巴3_Luzi: "Tail 3",
            雪豹尾巴_Luzi: "Wearable Snow Leopard Tail",
            雪豹尾巴镜像_Luzi: "Wearable Snow Leopard Tail",
            鱼尾1_Luzi: "Fish Tail 1",
            鱼尾2_Luzi: "Fish Tail 2",
        },
    },
};

export default function () {
    AssetManager.addGroupedAssets({ TailStraps: assets }, translations);
}
