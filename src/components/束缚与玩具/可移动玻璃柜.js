import { AssetManager } from "../../assetForward";

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

const translations = {
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
const dialogs = {
    CN: {
        ItemTorso可移动玻璃柜SelectBase: "选择状态",
        ItemTorso可移动玻璃柜Select玻璃类型: "选择玻璃类型",
        ItemTorso可移动玻璃柜Module玻璃类型: "玻璃类型",
        ItemTorso可移动玻璃柜Optiont0: "透明玻璃",
        ItemTorso可移动玻璃柜Optiont1: "不透明玻璃",
        ItemTorso可移动玻璃柜Sett0: "SourceCharacter将DestinationCharacter身上的玻璃柜换成了透明玻璃",
        ItemTorso可移动玻璃柜Sett1: "SourceCharacter将DestinationCharacter身上的玻璃柜换成了不透明玻璃",
        ItemTorso可移动玻璃柜Select胸部玻璃门: "选择胸部玻璃门",
        ItemTorso可移动玻璃柜Module胸部玻璃门: "胸部玻璃门",
        ItemTorso可移动玻璃柜Optionup0: "关上",
        ItemTorso可移动玻璃柜Optionup1: "打开",
        ItemTorso可移动玻璃柜Setup0: "SourceCharacter关上了DestinationCharacter胸部的玻璃门",
        ItemTorso可移动玻璃柜Setup1: "SourceCharacter打开了DestinationCharacter胸部的玻璃门",
        ItemTorso可移动玻璃柜Select腹部玻璃门: "选择腹部玻璃门",
        ItemTorso可移动玻璃柜Module腹部玻璃门: "腹部玻璃门",
        ItemTorso可移动玻璃柜Optiondown0: "关上",
        ItemTorso可移动玻璃柜Optiondown1: "打开",
        ItemTorso可移动玻璃柜Setdown0: "SourceCharacter关上了DestinationCharacter腹部的玻璃门",
        ItemTorso可移动玻璃柜Setdown1: "SourceCharacter打开了DestinationCharacter腹部的玻璃门",
    },
    EN: {
        ItemTorso可移动玻璃柜SelectBase: "Select Attachment",
        ItemTorso可移动玻璃柜Select玻璃类型: "Select Glass Type",
        ItemTorso可移动玻璃柜Module玻璃类型: "Glass Type",
        ItemTorso可移动玻璃柜Optiont0: "Transparent Glass",
        ItemTorso可移动玻璃柜Optiont1: "Opaque Glass",
        ItemTorso可移动玻璃柜Sett0:
            "SourceCharacter replaced DestinationCharacter's glass cabinet with transparent glass",
        ItemTorso可移动玻璃柜Sett1: "SourceCharacter replaced DestinationCharacter's glass cabinet with opaque glass",
        ItemTorso可移动玻璃柜Select胸部玻璃门: "Select Breast Glass Door",
        ItemTorso可移动玻璃柜Module胸部玻璃门: "Breast Glass Door",
        ItemTorso可移动玻璃柜Optionup0: "Close",
        ItemTorso可移动玻璃柜Optionup1: "Open",
        ItemTorso可移动玻璃柜Setup0: "SourceCharacter closed DestinationCharacter's breast glass door",
        ItemTorso可移动玻璃柜Setup1: "SourceCharacter opened DestinationCharacter's breast glass door",
        ItemTorso可移动玻璃柜Select腹部玻璃门: "Select Abdominal Glass Door",
        ItemTorso可移动玻璃柜Module腹部玻璃门: "Abdominal Glass Door",
        ItemTorso可移动玻璃柜Optiondown0: "Close",
        ItemTorso可移动玻璃柜Optiondown1: "Open",
        ItemTorso可移动玻璃柜Setdown0: "SourceCharacter closed DestinationCharacter's abdominal glass door",
        ItemTorso可移动玻璃柜Setdown1: "SourceCharacter opened DestinationCharacter's abdominal glass door",
    },
    RU: {
        ItemTorso可移动玻璃柜SelectBase: "Выберите крепление",
        ItemTorso可移动玻璃柜Select玻璃类型: "Выберите тип стекла",
        ItemTorso可移动玻璃柜Module玻璃类型: "Тип стекла",
        ItemTorso可移动玻璃柜Optiont0: "Прозрачное стекло",
        ItemTorso可移动玻璃柜Optiont1: "Непрозрачное стекло",
        ItemTorso可移动玻璃柜Sett0:
            "SourceCharacter заменил(а) стеклянный шкаф DestinationCharacter на прозрачное стекло",
        ItemTorso可移动玻璃柜Sett1:
            "SourceCharacter заменил(а) стеклянный шкаф DestinationCharacter на непрозрачное стекло",
        ItemTorso可移动玻璃柜Select胸部玻璃门: "Выберите стеклянную дверцу груди",
        ItemTorso可移动玻璃柜Module胸部玻璃门: "Стеклянная дверца груди",
        ItemTorso可移动玻璃柜Optionup0: "Закрыть",
        ItemTorso可移动玻璃柜Optionup1: "Открыть",
        ItemTorso可移动玻璃柜Setup0: "SourceCharacter закрыл(а) стеклянную дверцу груди DestinationCharacter",
        ItemTorso可移动玻璃柜Setup1: "SourceCharacter открыл(а) стеклянную дверцу груди DestinationCharacter",
        ItemTorso可移动玻璃柜Select腹部玻璃门: "Выберите стеклянную дверцу живота",
        ItemTorso可移动玻璃柜Module腹部玻璃门: "Стеклянная дверца живота",
        ItemTorso可移动玻璃柜Optiondown0: "Закрыть",
        ItemTorso可移动玻璃柜Optiondown1: "Открыть",
        ItemTorso可移动玻璃柜Setdown0: "SourceCharacter закрыл(а) стеклянную дверцу живота DestinationCharacter",
        ItemTorso可移动玻璃柜Setdown1: "SourceCharacter открыл(а) стеклянную дверцу живота DestinationCharacter",
    },
    UA: {
        ItemTorso可移动玻璃柜SelectBase: "Виберіть кріплення",
        ItemTorso可移动玻璃柜Select玻璃类型: "Виберіть тип скла",
        ItemTorso可移动玻璃柜Module玻璃类型: "Тип скла",
        ItemTorso可移动玻璃柜Optiont0: "Прозоре скло",
        ItemTorso可移动玻璃柜Optiont1: "Непрозоре скло",
        ItemTorso可移动玻璃柜Sett0: "SourceCharacter замінив(ла) скляну шафу DestinationCharacter на прозоре скло",
        ItemTorso可移动玻璃柜Sett1: "SourceCharacter замінив(ла) скляну шафу DestinationCharacter на непрозоре скло",
        ItemTorso可移动玻璃柜Select胸部玻璃门: "Виберіть скляні дверцята грудей",
        ItemTorso可移动玻璃柜Module胸部玻璃门: "Скляні дверцята грудей",
        ItemTorso可移动玻璃柜Optionup0: "Закрити",
        ItemTorso可移动玻璃柜Optionup1: "Відкрити",
        ItemTorso可移动玻璃柜Setup0: "SourceCharacter закрив(ла) скляні дверцята грудей DestinationCharacter",
        ItemTorso可移动玻璃柜Setup1: "SourceCharacter відкрив(ла) скляні дверцята грудей DestinationCharacter",
        ItemTorso可移动玻璃柜Select腹部玻璃门: "Виберіть скляні дверцята живота",
        ItemTorso可移动玻璃柜Module腹部玻璃门: "Скляні дверцята живота",
        ItemTorso可移动玻璃柜Optiondown0: "Закрити",
        ItemTorso可移动玻璃柜Optiondown1: "Відкрити",
        ItemTorso可移动玻璃柜Setdown0: "SourceCharacter закрив(ла) скляні дверцята живота DestinationCharacter",
        ItemTorso可移动玻璃柜Setdown1: "SourceCharacter відкрив(ла) скляні дверцята живота DestinationCharacter",
    },
};

export default function () {
    AssetManager.addAsset("ItemTorso", asset, extended, translations, true);
    AssetManager.addCustomDialog(dialogs);
}
