import { AssetManager } from "../../assetForward";
import { luziFixups } from "../../lib/fixups";
import { FullMask } from "../功能调整/全身遮罩";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "垃圾桶-Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    AllowLock: true,
    Extended: true,
    EditOpacity: true,
    MinOpacity: 0,
    Opacity: 0,
    Priority: 58,
    AllowActivePose: ["Kneel"],
    SetPose: ["Kneel"],
    Layer: [
        {
            Name: "垃圾桶遮罩",
            HasImage: false,
            AllowColorize: false,
            Alpha: [
                {
                    Masks: [
                        [0, 695, 500, 120], //下
                        [0, 175, 160, 1000], //左
                        [340, 175, 160, 1000], //右
                    ],
                },
            ],
        },
        {
            Name: "盖子遮罩",
            HasImage: false,
            AllowColorize: false,
            AllowTypes: { typed: [1, 2] },
            Alpha: [
                {
                    Masks: [
                        [0, -100, 500, 150], //上
                        [0, 0, 160, 1000], //左
                        [340, 0, 160, 1000], //右
                    ],
                },
            ],
        },
        { Name: "轮子", Priority: 1, MinOpacity: 1 },
        { Name: "背景", Priority: 2, MinOpacity: 1 },
        { Name: "外框", MinOpacity: 1 },
        { Name: "垃圾桶" },
        { Name: "盖子", AllowTypes: { typed: [1, 2] } },
        { Name: "挡板", AllowTypes: { typed: 1 } },
        { Name: "图案", AllowTypes: { typed: 1 } },
    ],
};

const layerNames = {
    EN: {
        轮子: "Wheels",
        背景: "Background",
        外框: "Outer Frame",
        垃圾桶: "Trash Bin",
        盖子: "Lid",
        挡板: "Baffle",
        图案: "Pattern",
    },
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "打开盖子" }, { Name: "合上盖子" }, { Name: "打开挡板" }],
    BaselineProperty: { Opacity: 1 },
    ScriptHooks: {
        Init: PropertyOpacityInit,
        Load: PropertyOpacityLoad,
        Draw: PropertyOpacityDraw,
        Exit: PropertyOpacityExit,
    },
    DrawData: { elementData: ExtendedXYClothes[3].map((tuple) => ({ position: [tuple[0], tuple[1] + 100] })) },
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "选择垃圾桶配置",
        打开盖子: "打开盖子",
        合上盖子: "合上盖子",
        打开挡板: "打开挡板",

        Set合上盖子: "SourceCharacter合上了DestinationCharacter盖子",
        Set打开盖子: "SourceCharacter打开了DestinationCharacter盖子",
        Set打开挡板: "SourceCharacter打开了DestinationCharacter挡板",
    },
    EN: {
        Select: "Select Trash Bin Configuration",
        打开盖子: "Open Lid",
        合上盖子: "Close Lid",
        打开挡板: "Open Flap",

        Set合上盖子: "SourceCharacter closed DestinationCharacter lid",
        Set打开盖子: "SourceCharacter opened DestinationCharacter lid",
        Set打开挡板: "SourceCharacter opened DestinationCharacter baffle",
    },
    UA: {
        Select: "Виберіть конфігурацію для смітника",
        打开盖子: "Відкрити накривку",
        合上盖子: "Закрити накривку",
        打开挡板: "Відкрити клапоть",

        Set合上盖子: "SourceCharacter закрили DestinationCharacter накривкою",
        Set打开盖子: "SourceCharacter відкрили накривку DestinationCharacter",
        Set打开挡板: "SourceCharacter відкрили перегородку DestinationCharacter",
    },
    RU: {
        Select: "Выбор конфигурации мусорного бака",
        打开盖子: "Открыть крышку",
        合上盖子: "Закрыть крышку",
        打开挡板: "Открыть заслонку",

        Set合上盖子: "SourceCharacter закрыл крышку DestinationCharacter",
        Set打开盖子: "SourceCharacter открыл крышку DestinationCharacter",
        Set打开挡板: "SourceCharacter открыл заслонку DestinationCharacter",
    },
};

const translation = {
    CN: "垃圾桶",
    EN: "Trash Can",
    UA: "Смітник",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, { translation, layerNames, extended, assetStrings });
    FullMask.push("ItemDevices", asset.Name, ["垃圾桶遮罩", "盖子遮罩"]);
    luziFixups("ItemDevices", asset.Name);
}
