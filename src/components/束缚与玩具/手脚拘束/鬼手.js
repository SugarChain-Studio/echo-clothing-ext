import { DialogTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { ImmPass, PoseMapTool, Typing } from "../../../lib";
import { customFixup } from "../../../lib/fixups";

/** @type {Omit<Partial<CustomAssetDefinitionBase>, "BodyCosplay">} */
const sharedProps = {
    Random: false,
    CraftGroup: "鬼手",
    Time: 5,
    Difficulty: 7,
    RemoveTime: 30,
    DrawLocks: false,
    DynamicGroupName: "ItemArms",
    ParentGroup: {},
};

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "ItemArms",
        {
            Name: "鬼手",
            Left: 50,
            Top: 40,
            ...sharedProps,
            SetPose: ["Yoked"],
            Effect: [E.Freeze, E.MapImmobile, E.Block, E.BlockWardrobe],
            PoseMapping: PoseMapTool.config(
                ["OverTheHead", "Yoked", "BackBoxTie", "BackElbowTouch"],
                ["BackCuffs", "BaseUpper"]
            ),
            Layer: [
                { Name: "A_B2", Priority: 6 },
                {
                    Name: "A_B1",
                    CopyLayerColor: "A_B2",
                    ...PoseMapTool.layerConfig(true, [], ["BackElbowTouch"]),
                },
            ],
        },
        ImmPass.assetConfig(
            {
                translation: { CN: "鬼手", EN: "Ghost Hand" },
                extended: {
                    Archetype: "typed",
                    ChatTags: Tools.CommonChatTags(),
                    DrawImages: false,
                    Options: [
                        { Name: "P1", Property: { SetPose: ["Yoked"] } },
                        { Name: "P2", Property: { SetPose: ["OverTheHead"] } },
                        { Name: "P3", Property: { SetPose: ["BackBoxTie"] } },
                        { Name: "P4", Property: { SetPose: ["BackElbowTouch"] } },
                    ],
                },
                assetStrings: {
                    CN: { Select: "选择鬼手样式", P1: "举手", P2: "高举手", P3: "双手背后", P4: "紧缚背后" },
                    EN: {
                        Select: "Select Ghost Hand Style",
                        P1: "Hands Up",
                        P2: "Hands High",
                        P3: "Hands Behind",
                        P4: "Tight Behind",
                    },
                },
            },
            (config) => {
                config.assetStrings = DialogTools.autoItemStrings(
                    config.assetStrings,
                    /** @type {TypedItemConfig}*/ (config.extended)
                );
            }
        ),
    ],
    [
        "ItemFeet",
        {
            Name: "鬼手",
            Left: 90,
            Top: 740,
            ...sharedProps,
            Effect: [E.Freeze, E.MapImmobile, E.BlockWardrobe],
            SetPose: ["BaseLower"],
            PoseMapping: PoseMapTool.config([], ["Kneel", "KneelingSpread", "LegsClosed", "Spread"]),
            Layer: [
                { Name: "L2", Priority: 6 },
                { Name: "L1", CopyLayerColor: "L2" },
            ],
        },
        { translation: { CN: "鬼手", EN: "Ghost Hand" } },
    ],
    [
        "ItemLegs",
        {
            Name: "鬼手",
            Left: 90,
            Top: 460,
            ...sharedProps,
            Effect: [E.Freeze, E.MapImmobile, E.BlockWardrobe],
            SetPose: ["BaseLower"],
            PoseMapping: PoseMapTool.config([], ["Kneel", "KneelingSpread", "LegsClosed", "Spread"]),
            Layer: [
                { Name: "T1", Priority: 6 },
                { Name: "T2", CopyLayerColor: "T1" },
            ],
        },
        { translation: { CN: "鬼手", EN: "Ghost Hand" } },
    ],
    [
        "ItemTorso",
        {
            Name: "鬼手",
            Left: 150,
            Top: 360,
            ...sharedProps,
            PoseMapping: PoseMapTool.hideFullBody(),
            Layer: [{ Name: "S1" }],
        },
        { translation: { CN: "鬼手", EN: "Ghost Hand" } },
    ],
    [
        "ItemMouth",
        {
            Name: "鬼手",
            Left: 170,
            Top: 170,
            ...sharedProps,
            Effect: [E.GagMedium],
            PoseMapping: {},
            Layer: [
                { Name: "M2", Priority: 6 },
                { Name: "M1", CopyLayerColor: "M2" },
            ],
        },
        { translation: { CN: "鬼手", EN: "Ghost Hand" } },
    ],
    [
        "ItemHead",
        {
            Name: "鬼手",
            Left: 160,
            Top: 130,
            ...sharedProps,
            Effect: [E.BlindNormal],
            PoseMapping: {},
            Layer: [
                { Name: "E2", Priority: 6 },
                { Name: "E1", CopyLayerColor: "E2" },
            ],
        },
        { translation: { CN: "鬼手", EN: "Ghost Hand" } },
    ],
    [
        "ItemVulva",
        {
            Name: "鬼手",
            Left: 210,
            Top: 420,
            ...sharedProps,
            Prerequisite: ["HasVagina"],
            PoseMapping: PoseMapTool.hideFullBody(),
            Layer: [{ Name: "G1" }],
        },
        { translation: { CN: "鬼手", EN: "Ghost Hand" }, extended: { Archetype: "vibrating" } },
    ],
    [
        "ItemBreast",
        {
            Name: "鬼手",
            Left: 90,
            Top: 270,
            ...sharedProps,
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            PoseMapping: {},
            Layer: [{ Name: "B" }],
        },
        { translation: { CN: "鬼手", EN: "Ghost Hand" }, extended: { Archetype: "vibrating" } },
    ],
    [
        "ItemNeckRestraints",
        {
            Name: "鬼手",
            Left: 130,
            Top: 200,
            ...sharedProps,
            PoseMapping: {},
            Effect: [E.Freeze, E.MapImmobile],
            Layer: [
                { Name: "C_L1", Priority: 6 },
                { Name: "C_R1", Priority: 6 },
                { Name: "C_L2", CopyLayerColor: "C_L1" },
                { Name: "C_R2", CopyLayerColor: "C_R1" },
            ],
        },
        {
            translation: { CN: "鬼手", EN: "Ghost Hand" },
            layerNames: {
                CN: { C_L1: "左", C_R1: "右" },
                EN: { C_L1: "Left", C_R1: "Right" },
            },
        },
    ],
    [
        "ItemAddon",
        {
            Name: "鬼手",
            Left: 100,
            Top: -120,
            ...sharedProps,
            PoseMapping: {},
            Prerequisite: ["CanBeCeilingTethered"],
            Effect: [E.Freeze, E.MapImmobile],
            Priority: 6,
            Layer: [
                { Name: "R_H1_2", ColorGroup: "手" },
                { Name: "R_H2_2", ColorGroup: "手" },
                { Name: "R_H3_2", ColorGroup: "手" },
                { Name: "R_R1_2", ColorGroup: "绳" },
                { Name: "R_R2_2", ColorGroup: "绳" },
                { Name: "R_R3_2", ColorGroup: "绳" },
                { Name: "R_H1_1", CopyLayerColor: "R_H1_2" },
                { Name: "R_H2_1", CopyLayerColor: "R_H2_2" },
                { Name: "R_H3_1", CopyLayerColor: "R_H3_2" },
                { Name: "R_R1_1", CopyLayerColor: "R_R1_2" },
                { Name: "R_R2_1", CopyLayerColor: "R_R2_2" },
                { Name: "R_R3_1", CopyLayerColor: "R_R3_2" },
                { Name: "R_S1_2", ColorGroup: "绳头" },
                { Name: "R_S2_2", ColorGroup: "绳头" },
                { Name: "R_S3_2", ColorGroup: "绳头" },
            ],
        },
        {
            translation: { CN: "鬼手", EN: "Ghost Hand" },
            layerNames: DialogTools.combine(
                Typing.repeatEntries([
                    ["CN", "EN"],
                    Typing.stringEntries(
                        ...[1, 2, 3].map(
                            (num) =>
                                /** @type {[string[],string]}*/ ([
                                    [`R_H${num}_2`, `R_R${num}_2`, `R_S${num}_2`],
                                    `${num}`,
                                ])
                        )
                    ),
                ]),
                {
                    CN: { 手: "手", 绳: "绳", 绳头: "绳头" },
                    EN: { 手: "Hand", 绳: "Rope", 绳头: "Rope End" },
                }
            ),
            extended: {
                Archetype: "typed",
                DrawImages: false,
                Options: [
                    {
                        Name: "H",
                        HasSubscreen: true,
                        ArchetypeConfig: {
                            Archetype: ExtendedArchetype.VARIABLEHEIGHT,
                            MaxHeight: 0,
                            MinHeight: -250,
                            DrawData: { elementData: [{ position: [1140, 650, 100, 500], icon: "rope" }] },
                            DialogPrefix: { Chat: "SuspensionChange" },
                        },
                    },
                ],
            },
            assetStrings: {
                CN: { Select: "配置鬼手样式", H: "调整高度" },
                EN: { Select: "Configure Ghost Hand Style", H: "Adjust Height" },
            },
        },
    ],
];

/** @type {{Group:AssetGroupName,Name:string}[]} */
const fixups = [
    { Group: "ItemArms", Name: "鬼手A" },
    { Group: "ItemFeet", Name: "鬼手L" },
    { Group: "ItemMouth", Name: "鬼手M" },
    { Group: "ItemHead", Name: "鬼手E" },
    { Group: "ItemVulva", Name: "鬼手G" },
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
    for (const fixup of fixups) {
        customFixup({ Old: fixup, New: { Group: fixup.Group, Name: "鬼手" } });
    }
}
