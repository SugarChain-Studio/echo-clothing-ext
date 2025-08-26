import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "乳胶头套_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 6,
    Time: 15,
    AllowLock: true,
    AllowTighten: true,
    Fetish: ["Leather"],
    Block: [],
};

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
                        Effect: [E.BlindHeavy, E.DeafLight, E.BlockWardrobe],
                    },
                },
            ],
        },
        {
            Name: "隐藏前发",
            DrawImages: false,
            Key: "F",
            Options: [{}, { Property: { Hide: ["HairFront"] } }],
        },
        {
            Name: "隐藏后发",
            DrawImages: false,
            Key: "B",
            Options: [
                {},
                {
                    Property: {
                        Hide: [
                            "HairBack",
                            // @ts-ignore
                            "新后发_Luzi",
                        ],
                    },
                },
            ],
        },
        {
            Name: "隐藏其他",
            DrawImages: false,
            Key: "AC",
            Options: [
                {},
                {
                    Property: {
                        Hide: ["HairAccessory1", "HairAccessory2", "HairAccessory3"],
                    },
                },
            ],
        },
        {
            Name: "图层",
            DrawImages: false,
            Key: "P",
            Options: [
                {},
                {
                    Property: {
                        OverridePriority: 12,
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

        Module隐藏前发: "隐藏前发",
        Select隐藏前发: "设置隐藏前发",
        OptionF0: "显示",
        OptionF1: "隐藏",
        SetF0: "SourceCharacter使DestinationCharacterAssetName会露出前发",
        SetF1: "SourceCharacter使DestinationCharacterAssetName会覆盖前发",

        Module隐藏后发: "隐藏后发",
        Select隐藏后发: "设置隐藏后发",
        OptionB0: "显示",
        OptionB1: "隐藏",
        SetB0: "SourceCharacter使DestinationCharacterAssetName会露出后发",
        SetB1: "SourceCharacter使DestinationCharacterAssetName会覆盖后发",

        Module隐藏其他: "隐藏其他头饰",
        Select隐藏其他: "设置隐藏耳朵和其他头饰",
        OptionAC0: "显示",
        OptionAC1: "隐藏",
        SetAC0: "SourceCharacter使DestinationCharacterAssetName会露出耳朵和其他头饰",
        SetAC1: "SourceCharacter使DestinationCharacterAssetName会覆盖耳朵和其他头饰",

        Module图层: "佩戴位置",
        Select图层: "设置佩戴位置",
        OptionP0: "在头部物品上方",
        OptionP1: "在头部物品下方",
        SetP0: "SourceCharacter使DestinationCharacterAssetName在头部物品上方",
        SetP1: "SourceCharacter使DestinationCharacterAssetName在头部物品下方",
    },
    EN: {
        SelectBase: "Transparency",

        Module透光度: "Transparency",
        Select透光度: "Set Transparency",
        Optionl0: "Transparent",
        Optionl1: "Opaque",
        Setl0: "SourceCharacter makes DestinationCharacter AssetName transparent.",
        Setl1: "SourceCharacter makes DestinationCharacter AssetName opaque.",

        Module隐藏前发: "Hide Front Hair",
        Select隐藏前发: "Set Hide Front Hair",
        OptionF0: "Show",
        OptionF1: "Hide",
        SetF0: "SourceCharacter makes DestinationCharacter AssetName reveal the front hair.",
        SetF1: "SourceCharacter makes DestinationCharacter AssetName cover the front hair.",

        Module隐藏后发: "Hide Back Hair",
        Select隐藏后发: "Set Hide Back Hair",
        OptionB0: "Show",
        OptionB1: "Hide",
        SetB0: "SourceCharacter makes DestinationCharacter AssetName reveal the back hair.",
        SetB1: "SourceCharacter makes DestinationCharacter AssetName cover the back hair.",

        Module隐藏其他: "Hide Other Accessories",
        Select隐藏其他: "Set Hide Ears and Other Accessories",
        OptionAC0: "Show",
        OptionAC1: "Hide",
        SetAC0: "SourceCharacter makes DestinationCharacter AssetName reveal the ears and other accessories.",
        SetAC1: "SourceCharacter makes DestinationCharacter AssetName cover the ears and other accessories.",

        Module图层: "Wearing Position",
        Select图层: "Set Wearing Position",
        OptionP0: "Above Head Items",
        OptionP1: "Below Head Items",
        SetP0: "SourceCharacter makes DestinationCharacter AssetName above head items",
        SetP1: "SourceCharacter makes DestinationCharacter AssetName below head items",
    },
};

const translation = {
    CN: "乳胶头套",
    EN: "Latex Hood",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemHood", asset, {
        translation,
        layerNames: {},
        extended,
        assetStrings,
    });
}
