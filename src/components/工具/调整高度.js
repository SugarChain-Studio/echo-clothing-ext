import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";

/** @type {AssetPoseName[]} */
/** @type {CustomAssetDefinition} */
const asset = {
    Name: "调整高度_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Visible: false,
    Extended: true,
    ParentGroup: {},
    PoseMapping: {},
};
/**@type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    ChangeWhenLocked: false,
    ChatTags: Tools.CommonChatTags(),
    DrawImages: false,
    Options: [
        {
            Name: "不调整",
        },
        {
            Name: "高度",
            Property: { Effect: [E.Suspended] },
            HasSubscreen: true,
            ArchetypeConfig: {
                Archetype: ExtendedArchetype.VARIABLEHEIGHT,
                MaxHeight: 100,
                MinHeight: -500,
                DrawData: {
                    elementData: [{ position: [1140, 650, 100, 500], icon: "rope" }],
                },
                DialogPrefix: {
                    Chat: "SuspensionChange",
                },
            },
        },
    ],
};

/**@type {Translation.Dialog} */
const dialog = {
    CN: {
        Select: "选择高度配置",
        不调整: "不调整",
        高度: "调整高度",

        Set不调整: "SourceCharacter设置TargetCharacter不调整高度。",
        Set高度: "SourceCharacter调整DestinationCharacter高度。",
    },
    EN: {
        Select: "Select Height Configuration",
        不调整: "Do Not Adjust",
        高度: "Adjust Height",

        Set不调整: "SourceCharacter sets TargetCharacter to not adjust height.",
        Set高度: "SourceCharacter adjusts DestinationCharacter height.",
    },
};

const translation = {
    CN: "调整高度",
    EN: "Height Tool",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemAddon", asset, {
        translation,
        layerNames: {},
        extended,
        assetStrings: dialog,
    });
}
