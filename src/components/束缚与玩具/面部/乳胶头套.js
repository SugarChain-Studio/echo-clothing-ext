import { DialogTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "乳胶头套",
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
    Alpha: [
        {
            Group: ["Head"],
            Masks: [
                [194, 162, 24, 32],
                [282, 162, 24, 32],
            ],
            AllowTypes: { AC: 0 },
        },
    ],
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
            Options: [{}, { Property: { Effect: [E.BlindHeavy, E.DeafLight, E.BlockWardrobe] } }],
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
            Options: [{}, { Property: { Hide: ["HairBack"] } }],
        },
        {
            Name: "隐藏其他",
            DrawImages: false,
            Key: "AC",
            Options: [{}, { Property: { Hide: ["HairAccessory1", "HairAccessory2", "HairAccessory3"] } }],
        },
        {
            Name: "图层",
            DrawImages: false,
            Key: "P",
            Options: [{}, { Property: { OverridePriority: 12 } }],
        },
    ],
};

/**@type {Translation.Dialog} */
const assetStrings = DialogTools.combine(
    {
        CN: {
            SelectBase: "透光度",
            Module透光度: "透光度",

            Select透光度: "设置阻挡视线",
            Optionl0: "不阻挡视线",
            Optionl1: "阻挡视线",
            Setl0: "SourceCharacter使DestinationCharacterAssetName不阻挡视线",
            Setl1: "SourceCharacter使DestinationCharacterAssetName阻挡视线",

            Module图层: "佩戴位置",
            Select图层: "设置佩戴位置",
            OptionP0: "在头部物品上方",
            OptionP1: "在头部物品下方",
            SetP0: "SourceCharacter使DestinationCharacterAssetName在头部物品上方",
            SetP1: "SourceCharacter使DestinationCharacterAssetName在头部物品下方",
        },
        EN: {
            SelectBase: "Transparency",

            Module透光度: "Hinder Vision",
            Select透光度: "Set Hinder Vision",
            Optionl0: "Not Hinder",
            Optionl1: "Hinder",
            Setl0: "SourceCharacter makes DestinationCharacter AssetName not hinder vision.",
            Setl1: "SourceCharacter makes DestinationCharacter AssetName hinder vision.",

            Module图层: "Wearing Position",
            Select图层: "Set Wearing Position",
            OptionP0: "Above Head Items",
            OptionP1: "Below Head Items",
            SetP0: "SourceCharacter makes DestinationCharacter AssetName above head items",
            SetP1: "SourceCharacter makes DestinationCharacter AssetName below head items",
        },
    },
    DialogTools.showHide({ moduleName: "隐藏前发", key: "F", moduleText: { CN: "前发", EN: "Front Hair" } }),
    DialogTools.showHide({ moduleName: "隐藏后发", key: "B", moduleText: { CN: "后发", EN: "Back Hair" } }),
    DialogTools.showHide({
        moduleName: "隐藏其他",
        key: "AC",
        moduleText: { CN: "发饰和耳朵", EN: "Hair Acc. and Ears" },
        fullText: { CN: "发饰和耳朵", EN: "Hair Accessories and Ears" },
    })
);

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
    luziSuffixFixups(["ItemHood"], asset.Name);
}
