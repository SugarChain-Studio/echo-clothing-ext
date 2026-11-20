import { AssetManager } from "@local/AssetManager";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "星紫下",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    ParentGroup: "BodyLower",
    PoseMapping: {
        Kneel: "Kneel",
        KneelingSpread: "KneelingSpread",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        { Name: "A1", Priority: 26 },
        { Name: "A2", Priority: 26 },
        { Name: "A3", Priority: 26 },
        { Name: "A4", Priority: 26 },
        { Name: "B1", Priority: 1 },
        { Name: "B2", Priority: 1 },
        { Name: "C1", Priority: 26 },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "星紫",
    EN: "星紫",
};

/** @type {Translation.Dialog} */
const layerNames = {
    EN: {
        A1: "1",
        A2: "2",
        A3: "3",
        A4: "4",
        B1: "1",
        B2: "2",
        C1: "1",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { translation, layerNames });
}
