import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../lib";

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
        DefaultColor: ["#111111", "#FFFFFF", "#111111", "#FFFFFF"],
        Layer: [
            ...Typing.layerMap(
                [
                    { Name: "s_base", ColorGroup: "base" },
                    { Name: "s_hlight", ColorGroup: "hlight" },
                ],
                (l) => ({
                    ...propsS,
                    ...l,
                    AllowTypes: { typed: [0, 1] },
                })
            ),
            ...Typing.layerMap(
                [
                    { Name: "t_base", ColorGroup: "base" },
                    { Name: "t_hlight", ColorGroup: "hlight" },
                ],
                (l) => ({
                    ...propsT,
                    ...l,
                    AllowTypes: { typed: [0, 2] },
                })
            ),
            ...Typing.layerMap([{ Name: "af_base" }, { Name: "af_hlight" }], (l) => ({
                ...propsAf,
                CopyLayerColor: `t_${l.Name.substring(3)}`,
                ...l,
                AllowTypes: { typed: [0, 2] },
            })),
        ],
    },
    {
        translation: { CN: "玩偶把手", EN: "Doll Handle" },
        layerNames: {
            CN: {
                base: "色调",
                hlight: "高光",
                ...Typing.stringEntries([["s_base", "s_hlight"], "肩"], [["t_base", "t_hlight"], "髋"]),
            },
            EN: {
                base: "Tone",
                hlight: "Highlight",
                ...Typing.stringEntries([["s_base", "s_hlight"], "Shoulder"], [["t_base", "t_hlight"], "Hip"]),
            },
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
