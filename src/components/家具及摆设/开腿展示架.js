import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "开腿展示架_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Difficulty: 8,
    AllowLock: true,
    AllowTighten: true,
    DrawLocks: false,
    RemoveTime: 5,
    Time: 10,
    Extended: true,
    Effect: [E.Freeze, E.BlockWardrobe, E.Block, E.Mounted, E.MapImmobile, E.OnBed, E.OneWayEnclose],
    Hide: [
        "ItemHandheld",
        "BodyLower",
        "ItemLegs",
        "ItemFeet",
        "ItemBoots",
        "Shoes",
        "Garters",
        "AnkletLeft",
        "AnkletRight",
        "SocksLeft",
        "SocksRight",
        "Socks",
        "SuitLower",
    ],
    Layer: [
        {
            Name: "框架抬手",
            Priority: 1,
            AllowTypes: { o: 1 },
        },
        {
            Name: "框架",
            Priority: 1,
            AllowTypes: { o: 0 },
        },
        {
            Name: "下半身开腿",
            Priority: 7,
            ParentGroup: "BodyLower",
            InheritColor: "BodyLower",
            HideColoring: true,
            ColorSuffix: { HEX_COLOR: "White" },
        },
        {
            Name: "手固定",
            Priority: 50,
            AllowTypes: { o: 1 },
            ParentGroup: "BodyUpper",
        },
        {
            Name: "腿固定",
            Priority: 50,
            ParentGroup: "BodyLower",
        },
        {
            Name: "身体固定",
            Priority: 50,
            ParentGroup: "BodyUpper",
        },
        {
            Name: "嘴巴固定",
            Priority: 50,
            AllowTypes: { g: 1 },
        },
        {
            Name: "脖子固定",
            Priority: 50,
        },
        {
            Name: "下体棒子",
            Priority: 13,
            AllowTypes: { v: 1 },
        },
        {
            Name: "链条",
            Priority: 1,
            Top: -760,
            Left: 0,
        },
    ],
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    Modules: [
        {
            Name: "姿势",
            DrawImages: false,
            Key: "o",
            Options: [
                { Property: { SetPose: ["BackElbowTouch", "KneelingSpread"] } },
                { Property: { SetPose: ["OverTheHead", "KneelingSpread"] } },
            ],
        },
        {
            Name: "嘴巴固定",
            DrawImages: false,
            Key: "g",
            Options: [{}, {}],
        },
        {
            Name: "下体棒子",
            DrawImages: false,
            Key: "v",
            Options: [{}, {}],
        },
        {
            Name: "自定义高度",
            DrawImages: false,
            Key: "d",
            Options: [
                {},
                {
                    HasSubscreen: true,
                    ArchetypeConfig: {
                        Archetype: ExtendedArchetype.VARIABLEHEIGHT,
                        MaxHeight: 0,
                        MinHeight: -250,
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

/** @type {Translation.Dialog} */
const dialog = DialogTools.replicateGroupedItemDialog(["ItemDevices"], ["开腿展示架_Luzi"], {
    CN: {
        SelectBase: "选择开腿展示架配置",

        Select姿势: "选择姿势",
        Module姿势: "姿势",
        Optiono0: "背后",
        Optiono1: "抬手",

        Select嘴巴固定: "选择嘴部拘束",
        Module嘴巴固定: "嘴部拘束",
        Optiong0: "无",
        Optiong1: "添加嘴部拘束",

        Select下体棒子: "选择阴部道具",
        Module下体棒子: "阴部道具",
        Optionv0: "无",
        Optionv1: "添加阴部道具",

        Select自定义高度: "设置高度",
        Module自定义高度: "调整高度",
        Optiond0: "无",
        Optiond1: "自定义高度",

        Seto1: "SourceCharacter修改了DestinationCharacter手部拘束",
        Seto0: "SourceCharacter修改了DestinationCharacter手部拘束",

        Setg0: "SourceCharacter移除了DestinationCharacter嘴部的拘束",
        Setg1: "SourceCharacter添加了DestinationCharacter嘴部的拘束",

        Setv0: "SourceCharacter移除了DestinationCharacter阴部的道具",
        Setv1: "SourceCharacter添加了DestinationCharacter阴部的道具",

        Setd0: "SourceCharacter还原DestinationCharacter高度",
        Setd1: "SourceCharacter调整DestinationCharacter高度",
    },
    EN: {
        SelectBase: "Select Leg Spread Display Configuration",

        Select姿势: "Select Pose",
        Module姿势: "Pose",
        Optiono0: "Behind Back",
        Optiono1: "Lift Hands",

        Select嘴巴固定: "Select Mouth Restraint",
        Module嘴巴固定: "Mouth Restraint",
        Optiong0: "None",
        Optiong1: "Add Mouth Restraint",

        Select下体棒子: "Select Genital Prop",
        Module下体棒子: "Genital Prop",
        Optionv0: "None",
        Optionv1: "Add Genital Prop",

        Select自定义高度: "Set Height",
        Module自定义高度: "Adjust Height",
        Optiond0: "None",
        Optiond1: "Custom Height",

        Seto1: "SourceCharacter modifies DestinationCharacter hand restraints",
        Seto0: "SourceCharacter modifies DestinationCharacter hand restraints",

        Setg0: "SourceCharacter removes DestinationCharacter mouth restraint",
        Setg1: "SourceCharacter adds DestinationCharacter mouth restraint",

        Setv0: "SourceCharacter removes DestinationCharacter genital prop",
        Setv1: "SourceCharacter adds DestinationCharacter genital prop",

        Setd0: "SourceCharacter resets DestinationCharacter height",
        Setd1: "SourceCharacter adjusts DestinationCharacter height",
    },
    RU: {
        SelectBase: "Выбор конфигурации дисплея для раздвигания ног",

        Select姿势: "Выбор позы",
        Module姿势: "Поза",
        Optiono0: "Задняя",
        Optiono1: "Поднять руки",

        Select嘴巴固定: "Выбор фиксации рта",
        Module嘴巴固定: "Фиксация рта",
        Optiong0: "Нет",
        Optiong1: "Добавить фиксацию рта",

        Select下体棒子: "Выбор приспособления для гениталий",
        Module下体棒子: "Приспособление для гениталий",
        Optionv0: "Нет",
        Optionv1: "Добавить приспособление для гениталий",

        Select自定义高度: "Установка высоты",
        Module自定义高度: "Настройка высоты",
        Optiond0: "Нет",
        Optiond1: "Настроить высоту",

        Seto1: "SourceCharacter изменяет фиксацию рук DestinationCharacter",
        Seto0: "SourceCharacter изменяет фиксацию рук DestinationCharacter",

        Setg0: "SourceCharacter убирает фиксацию рта DestinationCharacter",
        Setg1: "SourceCharacter добавляет фиксацию рта DestinationCharacter",

        Setv0: "SourceCharacter убирает приспособление для гениталий DestinationCharacter",
        Setv1: "SourceCharacter добавляет приспособление для гениталий DestinationCharacter",

        Setd0: "SourceCharacter восстанавливает высоту DestinationCharacter",
        Setd1: "SourceCharacter настраивает высоту DestinationCharacter",
    },
    UA: {
        SelectBase: "Виберіть конфігурацію для розширювача ніг",

        Select姿势: "Виберіть позу",
        Module姿势: "Поза",
        Optiono0: "За спиною",
        Optiono1: "Підняти руки",

        Select嘴巴固定: "Виберіть обмежувач на рот",
        Module嘴巴固定: "Обмежувач на рот",
        Optiong0: "Нічого",
        Optiong1: "Додати обмежувач на рот",

        Select下体棒子: "Виберіть ",
        Module下体棒子: "Генітальна опора",
        Optionv0: "Нічого",
        Optionv1: "Додати генітальну опору",

        Select自定义高度: "Виберіть висоту",
        Module自定义高度: "Калібрація висоти",
        Optiond0: "Нічого",
        Optiond1: "Налаштувати висоту",

        Seto1: "SourceCharacter модифікує обмежувачі для рук на тілі DestinationCharacter",
        Seto0: "SourceCharacter модифікує обмежувачі для рук на тілі DestinationCharacter",

        Setg0: "SourceCharacter знімає металевий обмежувач з рота DestinationCharacter",
        Setg1: "SourceCharacter прикріплює металевий обмежувач до DestinationCharacter рота",

        Setv0: "SourceCharacter знімає генітальну опору з тіла DestinationCharacter",
        Setv1: "SourceCharacter додає DestinationCharacter генітальну опору",

        Setd0: "SourceCharacter скинув конфігураю висоти на тілі DestinationCharacter",
        Setd1: "SourceCharacter налаштовує висоту DestinationCharacter",
    },
});

const translations = {
    CN: "开腿展示架",
    EN: "Leg-Spread Display Stand",
    UA: "Розширювач ніг",
    RU: "Leg-Spread Display Stand",
};

export default function () {
    AssetManager.addAsset("ItemDevices", asset, extended, translations);
    AssetManager.addCustomDialog(dialog);
}
