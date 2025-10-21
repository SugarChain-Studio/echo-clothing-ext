import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { PoseMapTools } from "@mod-utils/Tools";

// Originally Designed by: 01musume

/** @type {AssetLayerDefinition} */
const main = { PoseMapping: { Hogtied: "Hogtied", AllFours: "AllFours", Kneel: "Kneel", KneelingSpread: "Kneel" } };

/** @type {AssetLayerDefinition} */
const upper = { PoseMapping: { Hogtied: "Hogtied", AllFours: "AllFours" } };

/** @type {AssetLayerDefinition} */
const lower = { PoseMapping: PoseMapTools.HideFullBody() };

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, {}>} */
function beforeDraw(data, originalFunction, drawData) {
    const { C, L, Pose } = drawData;
    if ((L === "g_3" || L === "d_3") && C.HasEffect(E.Suspended)) {
        if (Pose === "Kneel") return { Pose: /** @type {AssetPoseName} */ ("") };
        else return { Pose };
    }
}

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "Cloth",
        {
            Name: "白色礼服",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: "BodyUpper",
            DynamicGroupName: "Cloth",
            PoseMapping: {},
            DefaultColor: [
                "Default",
                "Default",
                "Default",
                "#D3CAAE",
                "Default",
                "Default",
                "Default",
                "Default",
                "#4E6F7A",
            ],
            Layer: [
                { Left: 190, Top: 210, Name: "d_1", ...upper, ColorGroup: "strap" },
                { Left: 190, Top: 210, Name: "d_2", ...upper, ColorGroup: "strap" },
                { Left: 170, Top: 280, Name: "d_3", ...main },
                { Left: 180, Top: 320, Name: "d_8", ...upper },
                { Left: 190, Top: 210, Name: "g_1", ...upper, BlendingMode: "screen", AllowColorize: false },
                { Left: 190, Top: 210, Name: "g_2", ...upper, BlendingMode: "screen", AllowColorize: false },
                { Left: 170, Top: 280, Name: "g_3", ...main, BlendingMode: "screen", AllowColorize: false },
                { Left: 190, Top: 210, Name: "d_5", ...upper, ColorGroup: "chain" },
                { Left: 150, Top: 340, Name: "d_6", ...lower, ColorGroup: "chain" },
                { Left: 150, Top: 340, Name: "d_7", ...lower, ColorGroup: "chain" },
                { Left: 190, Top: 210, Name: "g_5", ...upper, BlendingMode: "screen", AllowColorize: false },
                { Left: 150, Top: 340, Name: "g_6", ...lower, BlendingMode: "screen", AllowColorize: false },
                { Left: 150, Top: 340, Name: "g_7", ...lower, BlendingMode: "screen", AllowColorize: false },
                { Left: 150, Top: 340, Name: "d_4", ...lower },
                { Left: 150, Top: 340, Name: "g_4", ...lower, BlendingMode: "screen", AllowColorize: false },
                { Left: 240, Top: 340, Name: "d_f", ...lower },
                { Left: 240, Top: 340, Name: "g_f", ...lower, BlendingMode: "screen", AllowColorize: false },
            ],
        },
        {
            translation: { CN: "白色礼服", EN: "White Dress" },
            layerNames: {
                CN: {
                    d_1: "胸口",
                    d_2: "肩",
                    d_3: "主体",
                    d_4: "珠子",
                    d_5: "胸口",
                    d_6: "胯部",
                    d_7: "腰部",
                    d_8: "图案",
                    d_f: "花饰品",

                    strap: "带子",
                    chain: "链子",
                },
                EN: {
                    d_1: "Chest Strap",
                    d_2: "Shoulder Strap",
                    d_3: "Main",
                    d_4: "Beads",
                    d_5: "Chest",
                    d_6: "Hip",
                    d_7: "Waist",
                    d_8: "Pattern",
                    d_f: "Floral Acc.",

                    strap: "Strap",
                    chain: "Chain",
                },
            },
            extended: {
                Archetype: ExtendedArchetype.MODULAR,
                DrawImages: false,
                ScriptHooks: { BeforeDraw: beforeDraw },
                Modules: [
                    {
                        Name: "隐藏乳头",
                        Key: "hn",
                        Options: [{ Property: { Hide: ["Nipples"] } }, {}],
                    },
                ],
            },
            assetStrings: {
                CN: {
                    SelectBase: "配置白色礼服",

                    Module隐藏乳头: "隐藏乳头",
                    Select隐藏乳头: "配置隐藏乳头",
                    Optionhn0: "隐藏",
                    Optionhn1: "不隐藏",
                },
                EN: {
                    SelectBase: "Configure White Dress",

                    Module隐藏乳头: "Hide Nipples",
                    Select隐藏乳头: "Configure Hide Nipples",
                    Optionhn0: "Hide",
                    Optionhn1: "Don't Hide",
                },
            },
        },
    ],
    [
        ["ClothAccessory", "长袖子_Luzi"],
        {
            Name: "白色礼服丝巾",
            Random: false,
            Left: 60,
            Top: 150,
            ParentGroup: {},
            DynamicGroupName: "ClothAccessory",
            PoseMapping: {
                BackBoxTie: "",
                BackElbowTouch: "Hide",
                BackCuffs: "Hide",
                OverTheHead: "OverTheHead",
                Yoked: "Yoked",
            },
            Priority: 35,
            Layer: [
                { Name: "后d", Priority: 6 },
                { Name: "后g", BlendingMode: "screen", AllowColorize: false, Priority: 6 },
                {
                    Name: "后xd",
                    InheritPoseMappingFields: true,
                    PoseMapping: { OverTheHead: "Hide", Yoked: "Hide" },
                    CopyLayerColor: "后d",
                },
                {
                    Name: "后xg",
                    InheritPoseMappingFields: true,
                    PoseMapping: { OverTheHead: "Hide", Yoked: "Hide" },
                    BlendingMode: "screen",
                    AllowColorize: false,
                },
                { Name: "前d", CopyLayerColor: "后d" },
                { Name: "前g", BlendingMode: "screen", AllowColorize: false },
            ],
        },
        {
            translation: { CN: "白色礼服丝巾", EN: "White Dress Scarf" },
        },
    ],
];

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset[0][1]);
    ArmMaskTool.createArmMaskForCloth("ClothAccessory", asset[1][1], "Short");
    AssetManager.addAssetWithConfig(asset);
}
