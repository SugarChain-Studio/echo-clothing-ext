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

/** @type { CustomAssetDefinition } */
const asset = {
    Name: "把手",
    Random: false,
    ParentGroup: {},
    PoseMapping: {},
    Fetish: ["Latex", "Forniphilia"],
    Effect: [E.Leash],
    DefaultColor: ["#111111", "#FFFFFF"],
    Layer: [
        ...["base", "hlight"].flatMap((s) => [
            { Name: `s_${s}`, ...propsS },
            { Name: `t_${s}`, ...propsT, CopyLayerColor: `s_${s}` },
            { Name: `af_${s}`, ...propsAf, CopyLayerColor: `s_${s}` },
        ]),
    ],
};

const translation = {
    CN: "玩偶把手",
    EN: "Doll Handle",
};

const layerNames = {
    CN: { s_base: "色调", s_hlight: "高光" },
    EN: { s_base: "Tone", s_hlight: "Highlight" },
};

export default function () {
    AssetManager.addAssetWithConfig("ClothAccessory", asset, { translation, layerNames });
}
