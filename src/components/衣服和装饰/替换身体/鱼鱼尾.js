import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "鱼鱼尾",
    Random: false,
    Gender: "F",
    Extended: true,
    OverrideHeight: { Height: 30, Priority: 19 },
    SetPose: ["LegsClosed", "Kneel"],
    Hide: ["BodyLower"],
    Layer: [
        {
            Name: "鱼尾下半身",
            Top: {
                Kneel: -110,
                LegsClosed: -110,
                Hogtied: -100,
                AllFours: 0,
            },
            Left: 0,
            Priority: 22,
            ParentGroup: "BodyLower",
            PoseMapping: {
                Kneel: "Kneel",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: "Hogtied",
                AllFours: "AllFours",
            },
        },
        {
            Name: "皮带大腿下",
            ColorGroup: "大腿皮带",
            Top: -110,
            Left: 0,
            Priority: 22,
            AllowTypes: { q: 1 },
            ParentGroup: "BodyLower",
            PoseMapping: {
                Kneel: "Kneel",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: "Hide",
                AllFours: "AllFours",
            },
        },
        {
            Name: "皮带大腿上",
            ColorGroup: "大腿皮带",
            Top: -110,
            Left: 0,
            Priority: 22,
            AllowTypes: { q: 1 },
            ParentGroup: "BodyLower",
            PoseMapping: {
                Kneel: "Kneel",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "皮带小腿上",
            ColorGroup: "小腿皮带",
            Top: -110,
            Left: 0,
            Priority: 22,
            AllowTypes: { q: 1 },
            ParentGroup: "BodyLower",
            PoseMapping: {
                Kneel: "Hide",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "皮带小腿下",
            ColorGroup: "小腿皮带",
            Top: -110,
            Left: 0,
            Priority: 22,
            AllowTypes: { q: 1 },
            ParentGroup: "BodyLower",
            PoseMapping: {
                Kneel: "Hide",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "鱼尾皮带",
            Top: {
                Kneel: -110,
                LegsClosed: -110,
                Hogtied: -100,
                AllFours: 0,
            },
            Left: 0,
            Priority: 22,
            AllowTypes: { q: 1 },
            ParentGroup: "BodyLower",
            PoseMapping: {
                Kneel: "Kneel",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: "Hogtied",
                AllFours: "AllFours",
            },
        },
        {
            Name: "珍珠项链",
            Top: -110,
            Left: 0,
            Priority: 22,
            AllowTypes: { q: 2 },
            ParentGroup: "BodyLower",
            PoseMapping: {
                Kneel: "Hide",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
    ],
};

const layerNames = {
    CN: {
        鱼尾下半身: "鱼尾",

        大腿皮带: "大腿皮带",
        皮带大腿上: "上",
        皮带大腿下: "下",

        小腿皮带: "小腿皮带",
        皮带小腿上: "上",
        皮带小腿下: "下",

        鱼尾皮带: "鱼尾皮带",
        珍珠项链: "珍珠项链",
    },
    EN: {
        鱼尾下半身: "Fish Tail",

        大腿皮带: "Thigh Belt",
        皮带大腿上: "Upper",
        皮带大腿下: "Lower",

        小腿皮带: "Calf Belt",
        皮带小腿上: "Upper",
        皮带小腿下: "Lower",

        鱼尾皮带: "Fish Tail Belt",
        珍珠项链: "Pearl Necklace",
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    Modules: [
        {
            Name: "鱼尾装饰",
            Key: "q",
            DrawImages: false,
            Options: [{}, {}, {}],
        },
    ],
};

const assetStrings = {
    CN: {
        SelectBase: "选择配置",
        Select鱼尾装饰: "设置",
        Module鱼尾装饰: "鱼尾装饰",
        Optionq0: "无",
        Optionq1: "皮带",
        Optionq2: "珍珠项链",
    },
    EN: {
        SelectBase: "Select Configuration",
        Select鱼尾装饰: "Settings",
        Module鱼尾装饰: "Decorations",
        Optionq0: "None",
        Optionq1: "Belt",
        Optionq2: "Pearl Necklace",
    },
    RU: {
        SelectBase: "Выбрать конфигурацию",
        Select鱼尾装饰: "Настройки",
        Module鱼尾装饰: "Декорации хвоста",
        Optionq0: "Нет",
        Optionq1: "Ремень",
        Optionq2: "Жемчужное ожерелье",
    },
};

const translation = {
    CN: "鱼鱼尾",
    EN: "Fishy Tail",
    RU: "Рыбий хвост",
};

export default function () {
    AssetManager.addAssetWithConfig("动物身体_Luzi", asset, { extended, layerNames, translation, assetStrings });
    luziSuffixFixups("动物身体_Luzi", asset.Name);
}
