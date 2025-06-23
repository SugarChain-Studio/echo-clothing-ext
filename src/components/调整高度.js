import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../assetForward";
import { Typing } from "../utils";

/** @type {AssetPoseName[]} */
/** @type {CustomAssetDefinition} */
const asset = {
    Name: "调整高度_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Extended: true,
    ParentGroup: {},
    PoseMapping: {},
};

const layerNames = {
    CN: {
    },
    EN: {
    },
};

/**@type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    ChatTags: Tools.CommonChatTags(),
    Modules: [
        {
            Name: "高度",
            Key: "h",
            Options: [
                {},
                {
                    Property: { Effect: [E.Suspended] },
                    HasSubscreen: true,
                    ArchetypeConfig: {
                        Archetype: ExtendedArchetype.VARIABLEHEIGHT,
                        MaxHeight: 0,
                        MinHeight: -350,
                        DrawData: {
                            elementData: [{ position: [1140, 650, 100, 500], icon: "rope" }],
                        },
                        DialogPrefix: {
                            Chat: "SuspensionChange",
                        },
                    },
                },
            ],
        },
    ],
};

/**@type {Translation.Dialog} */
const dialog = {
    CN: {
        SelectBase: "选择高度配置",
        Module高度: "调整高度",
        Select高度: "调整高度",
        Optionh0: "无",
        Optionh1: "调整高度",
        Seth0: "SourceCharacter取消了DestinationCharacter高度调整",
        Seth1: "SourceCharacter调整了DestinationCharacter悬挂高度",
    },
    EN: {
        SelectBase: "Select Invisibility Potion Config",
        Module高度: "Adjust Height",
        Select高度: "Adjust Height",
        Optionh0: "None",
        Optionh1: "Adjust Height",
        Seth0: "SourceCharacter removed the height adjustment from DestinationCharacter",
        Seth1: "SourceCharacter adjusted the suspension height of DestinationCharacter",
    },
};

const translation = {
    CN: "调整高度",
    EN: "调整高度",
    RU: "调整高度",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemAddon", asset, { translation, layerNames, extended, assetStrings: dialog });
}
