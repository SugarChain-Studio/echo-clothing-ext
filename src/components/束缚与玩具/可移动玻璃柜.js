import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "可移动玻璃柜",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 20,
    SelfBondage: 8,
    Time: 40,
    RemoveTime: 30,
    Extended: true,
    AllowLock: true,
    DrawLocks: false,
    AllowActivePose: ["BackElbowTouch", "LegsClosed", "Kneel"],
    Effect: [E.Block, E.BlockWardrobe, E.Slow],
    SetPose: ["BackElbowTouch", "LegsClosed"],
    Priority: 62,
    Layer: [
        { Name: "框架", ParentGroup: {} },
        { Name: "颈部护垫", ParentGroup: {} },
        { Name: "腿部护垫", ParentGroup: "BodyLower" },
        { Name: "不透明玻璃后", ParentGroup: {}, AllowTypes: { t: 1 }, Priority: 6 },
        { Name: "透明玻璃后", ParentGroup: {}, AllowTypes: { t: 0 }, Priority: 6 },
        { Name: "分隔", ParentGroup: {}, Priority: 6 },
        { Name: "不透明玻璃上", ParentGroup: {}, AllowTypes: { t: 1, up: 0 } },
        { Name: "透明玻璃上", ParentGroup: {}, AllowTypes: { t: 0, up: 0 } },
        { Name: "不透明玻璃下", ParentGroup: {}, AllowTypes: { t: 1, down: 0 } },
        { Name: "透明玻璃下", ParentGroup: {}, AllowTypes: { t: 0, down: 0 } },
        { Name: "反光上", ParentGroup: {}, AllowTypes: { up: 0 } },
        { Name: "反光下", ParentGroup: {}, AllowTypes: { down: 0 } },
        { Name: "铰链上", ParentGroup: {}, AllowTypes: { up: 0 } },
        { Name: "铰链下", ParentGroup: {}, AllowTypes: { down: 0 } },
    ],
};

const layerNames = {
    EN: {
        框架: "Frame",
        颈部护垫: "Neck Pad",
        腿部护垫: "Leg Pad",
        不透明玻璃后: "Opaque Glass Back",
        透明玻璃后: "Transparent Glass Back",
        分隔: "Divider",
        不透明玻璃上: "Opaque Glass Top",
        透明玻璃上: "Transparent Glass Top",
        不透明玻璃下: "Opaque Glass Bottom",
        透明玻璃下: "Transparent Glass Bottom",
        反光上: "Reflective Top",
        反光下: "Reflective Bottom",
        铰链上: "Hinge Top",
        铰链下: "Hinge Bottom",
    },
};

const translation = {
    CN: "可移动玻璃柜",
    EN: "Movable glass cabinet",
    RU: "Перемещаемый стеклянный шкаф",
    UA: "Рухомий скляний шаф",
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    Modules: [
        {
            Name: "玻璃类型",
            Key: "t",
            DrawImages: false,
            Options: [{}, {}],
        },
        {
            Name: "胸部玻璃门",
            Key: "up",
            DrawImages: false,
            Options: [
                {
                    Property: {
                        Block: [
                            "ItemHands",
                            "ItemHandheld",
                            "ItemArms",
                            "ItemBreast",
                            "ItemTorso2",
                            "ItemNipples",
                            "ItemNipplesPiercings",
                        ],
                    },
                },
                {},
            ],
        },
        {
            Name: "腹部玻璃门",
            Key: "down",
            DrawImages: false,
            Options: [
                {
                    Property: {
                        Block: ["ItemPelvis", "ItemButt", "ItemVulva", "ItemVulvaPiercings"],
                    },
                },
                {},
            ],
        },
    ],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        SelectBase: "选择状态",
        Select玻璃类型: "选择玻璃类型",
        Module玻璃类型: "玻璃类型",
        Optiont0: "透明玻璃",
        Optiont1: "不透明玻璃",
        Sett0: "SourceCharacter将DestinationCharacter身上的AssetName换成了透明玻璃",
        Sett1: "SourceCharacter将DestinationCharacter身上的AssetName换成了不透明玻璃",
        Select胸部玻璃门: "选择胸部玻璃门",
        Module胸部玻璃门: "胸部玻璃门",
        Optionup0: "关上",
        Optionup1: "打开",
        Setup0: "SourceCharacter关上了DestinationCharacter胸部的玻璃门",
        Setup1: "SourceCharacter打开了DestinationCharacter胸部的玻璃门",
        Select腹部玻璃门: "选择腹部玻璃门",
        Module腹部玻璃门: "腹部玻璃门",
        Optiondown0: "关上",
        Optiondown1: "打开",
        Setdown0: "SourceCharacter关上了DestinationCharacter腹部的玻璃门",
        Setdown1: "SourceCharacter打开了DestinationCharacter腹部的玻璃门",
    },
    EN: {
        SelectBase: "Select Attachment",
        Select玻璃类型: "Select Glass Type",
        Module玻璃类型: "Glass Type",
        Optiont0: "Transparent Glass",
        Optiont1: "Opaque Glass",
        Sett0: "SourceCharacter replaced DestinationCharacter AssetName with transparent glass",
        Sett1: "SourceCharacter replaced DestinationCharacter AssetName with opaque glass",
        Select胸部玻璃门: "Select Breast Glass Door",
        Module胸部玻璃门: "Breast Glass Door",
        Optionup0: "Close",
        Optionup1: "Open",
        Setup0: "SourceCharacter closed the glass door at DestinationCharacter chest",
        Setup1: "SourceCharacter opened the glass door at DestinationCharacter chest",
        Select腹部玻璃门: "Select Abdominal Glass Door",
        Module腹部玻璃门: "Abdominal Glass Door",
        Optiondown0: "Close",
        Optiondown1: "Open",
        Setdown0: "SourceCharacter closed the glass door at DestinationCharacter abdomen",
        Setdown1: "SourceCharacter opened the glass door at DestinationCharacter abdomen",
    },
    RU: {
        SelectBase: "Выберите крепление",
        Select玻璃类型: "Выберите тип стекла",
        Module玻璃类型: "Тип стекла",
        Optiont0: "Прозрачное стекло",
        Optiont1: "Непрозрачное стекло",
        Sett0: "SourceCharacter заменил(а) стеклянный шкаф DestinationCharacter на прозрачное стекло",
        Sett1: "SourceCharacter заменил(а) стеклянный шкаф DestinationCharacter на непрозрачное стекло",
        Select胸部玻璃门: "Выберите стеклянную дверцу груди",
        Module胸部玻璃门: "Стеклянная дверца груди",
        Optionup0: "Закрыть",
        Optionup1: "Открыть",
        Setup0: "SourceCharacter закрыл(а) стеклянную дверцу груди DestinationCharacter",
        Setup1: "SourceCharacter открыл(а) стеклянную дверцу груди DestinationCharacter",
        Select腹部玻璃门: "Выберите стеклянную дверцу живота",
        Module腹部玻璃门: "Стеклянная дверца живота",
        Optiondown0: "Закрыть",
        Optiondown1: "Открыть",
        Setdown0: "SourceCharacter закрыл(а) стеклянную дверцу живота DestinationCharacter",
        Setdown1: "SourceCharacter открыл(а) стеклянную дверцу живота DestinationCharacter",
    },
    UA: {
        SelectBase: "Виберіть кріплення",
        Select玻璃类型: "Виберіть тип скла",
        Module玻璃类型: "Тип скла",
        Optiont0: "Прозоре скло",
        Optiont1: "Непрозоре скло",
        Sett0: "SourceCharacter замінив(ла) скляну шафу DestinationCharacter на прозоре скло",
        Sett1: "SourceCharacter замінив(ла) скляну шафу DestinationCharacter на непрозоре скло",
        Select胸部玻璃门: "Виберіть скляні дверцята грудей",
        Module胸部玻璃门: "Скляні дверцята грудей",
        Optionup0: "Закрити",
        Optionup1: "Відкрити",
        Setup0: "SourceCharacter закрив(ла) скляні дверцята грудей DestinationCharacter",
        Setup1: "SourceCharacter відкрив(ла) скляні дверцята грудей DestinationCharacter",
        Select腹部玻璃门: "Виберіть скляні дверцята живота",
        Module腹部玻璃门: "Скляні дверцята живота",
        Optiondown0: "Закрити",
        Optiondown1: "Відкрити",
        Setdown0: "SourceCharacter закрив(ла) скляні дверцята живота DestinationCharacter",
        Setdown1: "SourceCharacter відкрив(ла) скляні дверцята живота DestinationCharacter",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ItemTorso", asset, {
        extended,
        layerNames,
        translation,
        assetStrings,
        noMirror: true,
    });
}
