import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";

/** @type { CustomAssetDefinition} */
const asset = {
    Name: "时尚口罩",
    Random: false,
    Left: 200,
    Top: 160,
    ParentGroup: {},
    PoseMapping: {},
    Priority: 53,
    DynamicGroupName: "Mask",
    IsRestraint: false,
    DefaultColor: ["Default", "Default", "Default", "#000000"],
    Hide: ["Mouth"],
    Layer: [
        { Name: "1", AllowTypes: { c: 0, w: 0 } },
        { Name: "2", CopyLayerColor: "1", AllowTypes: { c: 0, w: 1 } },
        { Name: "W1", AllowTypes: { c: 1, w: 0 } },
        { Name: "W2", CopyLayerColor: "W1", AllowTypes: { c: 1, w: 1 } },
        { Name: "Sx1", AllowTypes: { c: 2, w: 0 } },
        { Name: "S1", AllowTypes: { c: 2, w: 0 } },
        { Name: "Sx2", CopyLayerColor: "Sx1", AllowTypes: { c: 2, w: 1 } },
        { Name: "S2", CopyLayerColor: "S1", AllowTypes: { c: 2, w: 1 } },
    ],
};

/** @type {Translation.String} */
const assetStrings = {
    CN: {
        SelectBase: "配置口罩样式",

        Module戴好: "戴好",
        Select戴好: "选择口罩状态",
        Optionw0: "戴好",
        Optionw1: "摘下来",
        Setw0: "SourceCharacter使DestinationCharacterAssetName盖住嘴巴。",
        Setw1: "SourceCharacter将DestinationCharacterAssetName拉到下巴下面。",

        Module颜色: "颜色模式",
        Select颜色: "选择口罩颜色模式",
        Optionc0: "暗色",
        Optionc1: "亮色",
        Optionc2: "暗色调分层",

        Setc0: "SourceCharacter将DestinationCharacterAssetName设置为暗色。",
        Setc1: "SourceCharacter将DestinationCharacterAssetName设置为亮色。",
        Setc2: "SourceCharacter将DestinationCharacterAssetName设置为暗色调分层。",
    },
    EN: {
        SelectBase: "Configure Mask Style",

        Module戴好: "Worn",
        Select戴好: "Select Mask State",
        Optionw0: "Worn",
        Optionw1: "Taken Off",
        Setw0: "SourceCharacter makes DestinationCharacter AssetName cover DestinationCharacter mouth.",
        Setw1: "SourceCharacter pulls DestinationCharacter AssetName down to below DestinationCharacter chin.",

        Module颜色: "Color Mode",
        Select颜色: "Select Mask Color Mode",
        Optionc0: "Dark",
        Optionc1: "Light",
        Optionc2: "Dark Tone Layered",
        Setc0: "SourceCharacter sets DestinationCharacter AssetName to dark color.",
        Setc1: "SourceCharacter sets DestinationCharacter AssetName to light color.",
        Setc2: "SourceCharacter sets DestinationCharacter AssetName to dark tone layered.",
    },
};

/** @type {AddAssetWithConfigParams[2]} */
const config = {
    translation: { CN: "时尚口罩", EN: "Fashion Mask" },
    layerNames: {
        CN: { 1: "暗色", W1: "亮色", Sx1: "分层-暗色", S1: "分层-基础" },
        EN: { 1: "Dark", W1: "Light", Sx1: "Layered-Dark", S1: "Layered-Base" },
    },
    assetStrings,
};

export default function () {
    AssetManager.addAssetWithConfig([
        [
            "Mask",
            asset,
            {
                ...config,
                extended: {
                    Archetype: "modular",
                    ChatTags: Tools.CommonChatTags(),
                    Modules: [
                        { Name: "戴好", Key: "w", Options: [{}, {}] },
                        { Name: "颜色", Key: "c", Options: [{}, {}, {}] },
                    ],
                },
            },
        ],
        [
            ["ItemMouth", "ItemMouth2", "ItemMouth3"],
            { ...asset, Prerequisite: ["GagFlat"] },
            {
                ...config,
                extended: {
                    Archetype: "modular",
                    ChatTags: Tools.CommonChatTags(),
                    Modules: [
                        { Name: "戴好", Key: "w", Options: [{ Property: { Effect: [E.BlockMouth] } }, {}] },
                        { Name: "颜色", Key: "c", Options: [{}, {}, {}] },
                    ],
                },
            },
        ],
    ]);
}
