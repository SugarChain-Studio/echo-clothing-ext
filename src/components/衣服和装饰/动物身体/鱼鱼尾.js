import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "鱼鱼尾_Luzi",
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

const dialog = DialogTools.replicateGroupedItemDialog(["动物身体_Luzi"], ["鱼鱼尾_Luzi"], {
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
});

const translations = {
    CN: "鱼鱼尾",
    EN: "Fishy Tail",
    RU: "Рыбий хвост",
};

export default function () {
    AssetManager.addAsset("动物身体_Luzi", asset, extended, translations);
    AssetManager.addCustomDialog(dialog);
}
