import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "宠物服上",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 12,
    SelfBondage: 8,
    Time: 40,
    RemoveTime: 30,
    AllowLock: true,
    AllowTighten: true,
    Hide: [
        "ArmsLeft",
        "ArmsRight",
        "HandsLeft",
        "HandsRight",
        "AnkletLeft",
        "AnkletRight",
        "ItemHands",
        "Gloves",
        "Bracelet",
        "HandAccessoryLeft",
        "HandAccessoryRight",
    ],
    ParentGroup: "BodyUpper",
    Fetish: ["Leather", "Pet"],
    Prerequisite: ["HasBreasts"],
    AllowActivePose: ["BackElbowTouch", "OverTheHead", "Yoked", "AllFours"],
    SetPose: ["BackElbowTouch"],
    Effect: [E.Block, E.BlockWardrobe],
    Block: ["ItemHands", "ItemHandheld"],
    PoseMapping: {
        BackElbowTouch: "BackElbowTouch",
        OverTheHead: "OverTheHead",
        Yoked: "Yoked",
        AllFours: "AllFours",
    },
    Layer: [
        {
            Name: "手臂",
            Priority: 9,
            Alpha: [
                {
                    Group: [
                        "Suit",
                        "Bra",
                        "Bra_笨笨蛋Luzi",
                        "Gloves",
                        "HandsLeft",
                        "HandsRight",
                        "Bracelet",
                        "ItemTorso",
                        "ItemTorso2",
                        "Gloves_笨笨蛋Luzi",
                    ],
                    Masks: [
                        [90, 0, 120, 180],
                        [300, 0, 120, 180],
                    ],
                    Pose: ["OverTheHead"],
                },
                {
                    Group: [
                        "Suit",
                        "Bra",
                        "Bra_笨笨蛋Luzi",
                        "Gloves",
                        "HandsLeft",
                        "HandsRight",
                        "Bracelet",
                        "ItemTorso",
                        "ItemTorso2",
                        "Gloves_笨笨蛋Luzi",
                    ],
                    Masks: [
                        [0, 100, 120, 240],
                        [370, 100, 120, 240],
                    ],
                    Pose: ["Yoked"],
                },
            ],
        },
        { Name: "拘束" },
        { Name: "拘束高光" },
        { Name: "束带" },
        { Name: "搭扣" },
        {
            Name: "手链链子",
            Priority: 8,
            AllowTypes: { l: 1 },
            Top: -430,
            Left: 0,
        },
        {
            Name: "脚链链子",
            Priority: 8,
            AllowTypes: { ll: 1 },
            Top: 530,
            Left: 0,
        },
    ],
};

/** @type {CustomAssetDefinition} */
const asset2 = {
    Name: "宠物服下",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: {
        Kneel: 0,
        KneelingSpread: 60,
        AllFours: 0,
    },
    Difficulty: 12,
    SelfBondage: 8,
    Time: 40,
    RemoveTime: 30,
    AllowLock: true,
    AllowTighten: true,
    ParentGroup: "BodyLower",
    Fetish: ["Leather", "Pet"],
    AllowActivePose: ["Kneel", "KneelingSpread", "AllFours"],
    SetPose: ["Kneel"],
    PoseMapping: {
        Kneel: "Kneel",
        KneelingSpread: "KneelingSpread",
        AllFours: "AllFours",
    },
    Layer: [{ Name: "拘束" }, { Name: "拘束高光" }, { Name: "束带" }, { Name: "搭扣" }],
};

/**@type {AssetArchetypeConfig} */
const extened = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    Modules: [
        {
            Name: "锁链手",
            DrawImages: false,
            Key: "l",
            Options: [
                {
                    Property: {
                        Difficulty: 8,
                        Effect: [E.Block, E.BlockWardrobe],
                        AllowActivePose: ["BackElbowTouch", "OverTheHead", "Yoked", "AllFours"],
                        SetPose: ["BackElbowTouch"],
                    },
                    Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
                },
                {
                    Property: {
                        Difficulty: 8,
                        Effect: [E.CuffedArms, E.Mounted],
                        SetPose: ["OverTheHead"],
                    },
                    Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
                },
            ],
        },
        {
            Name: "锁链腿",
            DrawImages: false,
            Key: "ll",
            Options: [
                {},
                {
                    Property: {
                        Difficulty: 8,
                        Effect: [E.CuffedFeet, E.Mounted],
                        SetPose: ["KneelingSpread"],
                    },
                    Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
                },
            ],
        },
        {
            Name: "自定义高度",
            DrawImages: false,
            Key: "lll",
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

/**@type {Translation.Dialog} */
const dialog = {
    CN: {
        ItemArms宠物服上SelectBase: "添加锁链",
        ItemArms宠物服上Select锁链手: "添加锁链",
        ItemArms宠物服上Module锁链手: "手部铐子",
        ItemArms宠物服上Optionl0: "无",
        ItemArms宠物服上Optionl1: "添加锁链",
        ItemArms宠物服上Setl0: "SourceCharacter移除了DestinationCharacter身上的锁链",
        ItemArms宠物服上Setl1: "SourceCharacter在DestinationCharacter手臂加上了锁链",

        ItemArms宠物服上Select锁链腿: "添加锁链",
        ItemArms宠物服上Module锁链腿: "腿部铐子",
        ItemArms宠物服上Optionll0: "无",
        ItemArms宠物服上Optionll1: "添加锁链",
        ItemArms宠物服上Setll0: "SourceCharacter移除了DestinationCharacter身上的锁链",
        ItemArms宠物服上Setll1: "SourceCharacter在DestinationCharacter腿上加上了锁链",

        ItemArms宠物服上Select自定义高度: "设置高度",
        ItemArms宠物服上Module自定义高度: "调整高度",
        ItemArms宠物服上Optionlll0: "无",
        ItemArms宠物服上Optionlll1: "自定义高度",
        ItemArms宠物服上Setlll0: "SourceCharacter还原DestinationCharacter高度",
        ItemArms宠物服上Setlll1: "SourceCharacter调整DestinationCharacter高度",
    },
    EN: {
        ItemArms宠物服上SelectBase: "Add Chains",
        ItemArms宠物服上Select锁链手: "Add Hand Chains",
        ItemArms宠物服上Module锁链手: "Hand Cuffs",
        ItemArms宠物服上Optionl0: "None",
        ItemArms宠物服上Optionl1: "Add Chains",
        ItemArms宠物服上Setl0: "SourceCharacter removed chains from DestinationCharacter's arms",
        ItemArms宠物服上Setl1: "SourceCharacter added chains to DestinationCharacter's arms",

        ItemArms宠物服上Select锁链腿: "Add Leg Chains",
        ItemArms宠物服上Module锁链腿: "Leg Cuffs",
        ItemArms宠物服上Optionll0: "None",
        ItemArms宠物服上Optionll1: "Add Chains",
        ItemArms宠物服上Setll0: "SourceCharacter removed chains from DestinationCharacter's legs",
        ItemArms宠物服上Setll1: "SourceCharacter added chains to DestinationCharacter's legs",

        ItemArms宠物服上Select自定义高度: "Set Height",
        ItemArms宠物服上Module自定义高度: "Adjust Height",
        ItemArms宠物服上Optionlll0: "None",
        ItemArms宠物服上Optionlll1: "Custom Height",
        ItemArms宠物服上Setlll0: "SourceCharacter restored DestinationCharacter's height",
        ItemArms宠物服上Setlll1: "SourceCharacter adjusted DestinationCharacter's height",
    },
};

const translations = {
    CN: "宠物服上",
    EN: "Pet Upper Suit",
    RU: "Верхний костюм для питомца",
    UA: "Верхній костюм для вихованця",
};

const translations2 = {
    CN: "宠物服下",
    EN: "Pet Lower Suit",
    RU: "Нижний костюм для питомца",
    UA: "Нижній костюм для вихованця",
};

export default function () {
    AssetManager.addAsset("ItemArms", asset, extened, translations);
    AssetManager.addAsset("ItemLegs", asset2, undefined, translations2);
    AssetManager.addCustomDialog(dialog);
}
