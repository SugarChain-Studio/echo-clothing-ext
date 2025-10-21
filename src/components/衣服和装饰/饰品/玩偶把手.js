import { AssetManager } from "../../../assetForward";

/** @type {AssetLayerDefinition} */
const propsS = {
    Left: 130,
    Top: 210,
    Priority: 4,
    PoseMapping: {
        BackCuffs: "BackCuffs",
        BackElbowTouch: "BackElbowTouch",
        Yoked: "Yoked",
        OverTheHead: "OverTheHead",
        AllFours: "Hide",
    },
};

/** @type {AssetLayerDefinition} */
const propsT = {
    Left: 140,
    Top: 440,
    Priority: 5,
    PoseMapping: {
        Kneel: "LegsClosed",
        LegsClosed: "LegsClosed",
        KneelingSpread: "KneelingSpread",
        Hogtied: "Hide",
        AllFours: "Hide",
    },
};

/** @type {AssetLayerDefinition} */
const propsAf = { Left: 180, Top: 180, Priority: 8, PoseMapping: { AllFours: "AllFours" } };

/** @type { AddAssetWithConfigParams } */
const asset = [
    "ClothAccessory",
    {
        Name: "把手",
        Random: false,
        ParentGroup: {},
        PoseMapping: {},
        Fetish: ["Latex", "Forniphilia"],
        Effect: [E.Leash],
        DefaultColor: ["#111111", "#FFFFFF"],
        Layer: [
            ...["base", "hlight"].flatMap((s) => [
                { Name: `s_${s}`, ...propsS, AllowTypes: { typed: [0, 1] } },
                { Name: `t_${s}`, ...propsT, CopyLayerColor: `s_${s}`, AllowTypes: { typed: [0, 2] } },
                { Name: `af_${s}`, ...propsAf, CopyLayerColor: `s_${s}`, AllowTypes: { typed: [0, 2] } },
            ]),
        ],
    },
    {
        translation: { CN: "玩偶把手", EN: "Doll Handle" },
        layerNames: {
            CN: { s_base: "色调", s_hlight: "高光" },
            EN: { s_base: "Tone", s_hlight: "Highlight" },
        },
        extended: {
            Archetype: ExtendedArchetype.TYPED,
            DrawImages: false,
            Options: [{ Name: "B" }, { Name: "S" }, { Name: "T" }],
        },
        assetStrings: {
            CN: {
                Select: "选择玩偶把手样式",
                B: "肩和髋",
                S: "仅肩部",
                T: "仅髋部",
            },
            EN: {
                Select: "Select Doll Handle Style",
                B: "Shoulder and Hip",
                S: "Shoulder Only",
                T: "Hip Only",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
