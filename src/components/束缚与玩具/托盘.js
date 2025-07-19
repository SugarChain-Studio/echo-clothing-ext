import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "托盘",
    Random: false,
    Gender: "F",
    Left: 70,
    Top: 300,
    Difficulty: 5,
    Time: 10,
    AllowLock: true,
    AllowTighten: true,
    Priority: 44,
    DynamicGroupName: "ItemTorso",
    ParentGroup: {},
    ExpressionTrigger: [
        { Name: "Closed", Group: "Eyes", Timer: 2 },
        { Name: "Medium", Group: "Blush", Timer: 10 },
    ],
    Layer: [
        {
            Name: "皮带",
            Priority: 15,
            PoseMapping: {
                AllFours: "Hide",
                Hogtied: "Hide",
            },
        },
        { Name: "盘手柄" },
        { Name: "盘" },
        { Name: "橙汁", AllowTypes: { d: 1 } },
        { Name: "盘前", CopyLayerColor: "盘" },
        { Name: "盘绳柄" },
        { Name: "链条", ParentGroup: "BodyUpper" },
    ],
};

const layerNames = {
    CN: {
        链条: "链条",
        盘绳柄: "锁链固定",
        橙汁: "橙汁",
        盘: "托盘",
        盘手柄: "托盘手柄",
        皮带: "腰部皮带",
    },
    EN: {
        链条: "Chain",
        盘绳柄: "Chain Handle",
        橙汁: "Orange Juice",
        盘: "Tray",
        盘手柄: "Tray Handle",
        皮带: "Belt",
    },
};

/**@type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    ChatTags: Tools.CommonChatTags(),
    Modules: [
        {
            Name: "放置物",
            DrawImages: false,
            Key: "d",
            Options: [{}, {}],
        },
    ],
};

/**@type {Translation.Dialog} */
const assetDialogs = {
    CN: {
        SelectBase: "配置托盘",
        Module放置物: "放置物",

        Select放置物: "配置放置物",
        Optiond0: "不放置",
        Optiond1: "放置橙汁",

        Setd0: "SourceCharacter从DestinationCharacterAssetName移除了放置物",
        Setd1: "SourceCharacter将橙汁放置到DestinationCharacterAssetName上",
    },
    EN: {
        SelectBase: "Configure Tray",
        Module放置物: "Place Item",

        Select放置物: "Configure Placed Item",
        Optiond0: "No Item",
        Optiond1: "Place Orange Juice",

        Setd0: "SourceCharacter removed Placed Item from DestinationCharacter AssetName",
        Setd1: "SourceCharacter placed Orange Juice on DestinationCharacter AssetName",
    },
};

const translation = {
    CN: "托盘",
    EN: "Tray",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemTorso", asset, { extended, translation, layerNames, assetDialogs });
}
