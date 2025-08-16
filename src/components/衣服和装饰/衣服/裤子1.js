import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "裤子1_Luzi",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Priority: 26,
    DynamicGroupName: "ClothLower",
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    Layer: [
        { Name: "右_A0", ColorGroup: "吊带" },
        { Name: "右_A1", ColorGroup: "内侧", Priority: 3 },
        { Name: "右_B1", ColorGroup: "外侧" },
        { Name: "右_B2", ColorGroup: "外侧" },
        { Name: "右_C1", ColorGroup: "束带(下)" },
        { Name: "右_C2", ColorGroup: "搭扣(下)" },
        { Name: "右_C3", ColorGroup: "束带(上)" },
        { Name: "右_C4", ColorGroup: "搭扣(上)" },

        { Name: "左_A0", ColorGroup: "吊带" },
        { Name: "左_A1", ColorGroup: "内侧", Priority: 3 },
        { Name: "左_B1", ColorGroup: "外侧" },
        { Name: "左_B2", ColorGroup: "外侧" },
        { Name: "左_C1", ColorGroup: "束带(下)" },
        { Name: "左_C2", ColorGroup: "搭扣(下)" },
        { Name: "左_C3", ColorGroup: "束带(上)" },
        { Name: "左_C4", ColorGroup: "搭扣(上)" },
    ],
};

const layerNames = {
    CN: {
        "吊带": "吊带",
        "内侧": "内侧",
        "外侧": "外侧",
        "束带打底": "束带打底",
        "束带(下)": "束带(下)",
        "束带(上)": "束带(上)",
        "搭扣(下)": "搭扣(下)",
        "搭扣(上)": "搭扣(上)",

        "右_A0": "右",
        "右_A1": "右",
        "右_B1": "右",
        "右_B2": "右(附加)",
        "右_C1": "右",
        "右_C2": "右",
        "右_C3": "右",
        "右_C4": "右",
        "左_A0": "左",
        "左_A1": "左",
        "左_B1": "左",
        "左_B2": "左(附加)",
        "左_C1": "左",
        "左_C2": "左",
        "左_C3": "左",
        "左_C4": "左",
    },
    EN: {
        "吊带": "Straps",
        "内侧": "Inner",
        "外侧": "Outer",
        "束带打底": "Belt Liner",
        "束带(下)": "Belt (Lower)",
        "束带(上)": "Belt (Upper)",
        "搭扣(下)": "Buckle (Lower)",
        "搭扣(上)": "Buckle (Upper)",
        "右_A0": "Right",
        "右_A1": "Right",
        "右_B1": "Right",
        "右_B2": "Right (Attached)",
        "右_C1": "Right",
        "右_C2": "Right",
        "右_C3": "Right",
        "右_C4": "Right",
        "左_A0": "Left",
        "左_A1": "Left",
        "左_B1": "Left",
        "左_B2": "Left (Attached)",
        "左_C1": "Left",
        "左_C2": "Left",
        "左_C3": "Left",
        "左_C4": "Left",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "吊带式裤",
    EN: "Suspender Pants",
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { translation, layerNames });
}
