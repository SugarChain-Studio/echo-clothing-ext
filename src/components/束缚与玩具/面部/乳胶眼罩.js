import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";

/**@type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    ChatTags: Tools.CommonChatTags(),
    Modules: [
        {
            Name: "透光度",
            DrawImages: false,
            Key: "l",
            Options: [
                {},
                {
                    Property: {
                        Effect: [E.BlindHeavy, E.BlockWardrobe],
                    },
                },
            ],
        },
    ],
};

/**@type {Translation.Dialog} */
const assetStrings = {
    CN: {
        SelectBase: "透光度",

        Module透光度: "透光度",
        Select透光度: "设置透光度",
        Optionl0: "透光",
        Optionl1: "不透光",
        Setl0: "SourceCharacter使DestinationCharacterAssetName变得透明",
        Setl1: "SourceCharacter使DestinationCharacterAssetName变得不透明",
    },
    EN: {
        SelectBase: "Transparency",

        Module透光度: "Transparency",
        Select透光度: "Set Transparency",
        Optionl0: "Transparent",
        Optionl1: "Opaque",
        Setl0: "SourceCharacter makes DestinationCharacterAssetName transparent",
        Setl1: "SourceCharacter makes DestinationCharacterAssetName opaque",
    },
};

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const asset = [
    [
        {
            Name: "乳胶眼罩",
            Random: false,
            Gender: "F",
            Left: 190,
            Top: 140,
            Difficulty: 3,
            Time: 10,
            AllowLock: true,
            AllowTighten: true,
            Fetish: ["Leather"],
            Priority: 44,
            DynamicGroupName: "ItemHead",
            Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }],
        },
        {
            translation: { CN: "乳胶眼罩", EN: "Latex Blindfold" },
            layerNames: {
                CN: { A1: "眼罩", A2: "带子", A3: "扣具" },
                EN: { A1: "Blindfold", A2: "Belt", A3: "Buckles" },
            },
        },
    ],
    [
        {
            Name: "乳胶眼罩2",
            Random: false,
            Gender: "F",
            Left: 200,
            Top: 140,
            Difficulty: 3,
            Time: 10,
            AllowLock: true,
            AllowTighten: true,
            Fetish: ["Leather"],
            Priority: 44,
            DynamicGroupName: "ItemHead",
            DefaultColor: ["#0A0A0A", "Default", "Default", "Default", "Default"],
            Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }, { Name: "A4" }, { Name: "A5" }],
        },
        {
            translation: { CN: "乳胶眼罩2", EN: "Latex Blindfold 2" },
            layerNames: {
                CN: { A1: "基础", A2: "光泽", A3: "绑带", A4: "固定环左", A5: "固定环右" },
                EN: { A1: "Base", A2: "Shine", A3: "Strap", A4: "Left Buckle", A5: "Right Buckle" },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(
        "ItemHead",
        asset.map((a) => ((a[1] = { ...a[1], extended, assetStrings }), a))
    );
    AssetManager.addAssetWithConfig(["Glasses", "Mask"], asset);
}
