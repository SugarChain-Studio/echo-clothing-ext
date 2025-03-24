import { AssetManager } from "../../assetForward";
import { DialogTools, Tools } from "@mod-utils/Tools";

/** @type { CustomAssetDefinition} */
const asset = {
    Name: "乳胶带床_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Effect: [E.Tethered, E.Freeze, E.BlockWardrobe, E.Block, E.Mounted, E.MapImmobile, E.OnBed],
    SetPose: ["BackElbowTouch", "LegsClosed"],
    LayerVisibility: true,
    Difficulty: 25,
    DefaultColor: [
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "Default",
        "#000000",
        "Default",
        "Default",
        "Default",
        "#232323",
        "#000000",
        "#FFFFFF",
        "#232323",
        "#000000",
        "#FFFFFF",
    ],
    Layer: [
        {
            Name: "外壳盖子关闭",
            Priority: 63,
            AllowTypes: { g: 2 },
            Visibility: "Others",
        },
        {
            Name: "外壳盖子打开下",
            Priority: 63,
            AllowTypes: { g: 3 },
            Visibility: "AllExceptPlayerDialog",
        },
        {
            Name: "外壳盖子打开上",
            Priority: 63,
            AllowTypes: { g: 4 },
            Visibility: "AllExceptPlayerDialog",
        },
        {
            Name: "盖子关闭边缘",
            Priority: 62,
            AllowTypes: { g: [2, 3, 4] },
            Alpha: [
                {
                    Masks: [
                        [0, 0, 500, 43], //上
                        [0, 957, 500, 43], //下
                        [0, 0, 155, 1000], //左
                        [345, 0, 155, 1000], //右
                        AssetUpperOverflowAlpha,
                        AssetLowerOverflowAlpha,
                    ],
                },
            ],
        },
        {
            Name: "外壳",
            Priority: 1,
        },
        {
            Name: "外壳盖子打开",
            Priority: 1,
            AllowTypes: { g: 1 },
        },
        {
            Name: "床垫",
            Priority: 1,
        },
        {
            Name: "床带上",
            Priority: 1,
            ParentGroup: "BodyUpper",
        },
        {
            Name: "床带下",
            Priority: 1,
            ParentGroup: "BodyLower",
        },
        {
            Name: "床环上",
            Priority: 1,
            ParentGroup: "BodyUpper",
        },
        {
            Name: "床环下",
            Priority: 1,
            ParentGroup: "BodyLower",
        },
        {
            Name: "内衬",
            Priority: 24,
            AllowTypes: { l: 0 },
        },
        {
            Name: "圆环",
            Priority: 25,
            AllowTypes: { l: 0 },
        },
        {
            Name: "绳子",
            Priority: 25,
            AllowTypes: { l: 0 },
        },
        {
            Name: "拉链",
            Priority: 24,
            AllowTypes: { l: 0 },
        },
        {
            Name: "拘束带上",
            Priority: 53,
            ParentGroup: "BodyUpper",
        },
        {
            Name: "拘束带下",
            Priority: 53,
            ParentGroup: "BodyLower",
        },
        {
            Name: "乳胶上底色",
            Priority: 23,
            AllowTypes: { l: 0 },
            ParentGroup: "BodyUpper",
        },
        {
            Name: "乳胶上阴影",
            Priority: 23,
            AllowTypes: { l: 0 },
            ParentGroup: "BodyUpper",
        },
        {
            Name: "乳胶上高光",
            Priority: 23,
            AllowTypes: { l: 0 },
            ParentGroup: "BodyUpper",
        },
        {
            Name: "乳胶下底色",
            Priority: 23,
            AllowTypes: { l: 0 },
            ParentGroup: "BodyLower",
        },
        {
            Name: "乳胶下阴影",
            Priority: 23,
            AllowTypes: { l: 0 },
            ParentGroup: "BodyLower",
        },
        {
            Name: "乳胶下高光",
            Priority: 23,
            AllowTypes: { l: 0 },
            ParentGroup: "BodyLower",
        },
    ],
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    DrawImages: true,
    ChatTags: Tools.CommonChatTags(),
    Modules: [
        {
            Name: "盖子",
            Key: "g",
            Options: [
                {},
                {},
                { Property: { Effect: [E.BlindHeavy, E.GagLight, E.BlockWardrobe, E.Freeze, E.Enclose] } },
                {
                    Property: {
                        Block: Tools.AllItemGroups([
                            "ItemDevices",
                            "ItemPelvis",
                            "ItemVulva",
                            "ItemVulvaPiercings",
                            "ItemButt",
                            "ItemLegs",
                        ]),
                        Effect: [E.BlindHeavy, E.GagLight, E.BlockWardrobe, E.Freeze],
                    },
                },
                {
                    Property: {
                        Block: Tools.AllItemGroups([
                            "ItemDevices",
                            "ItemHead",
                            "ItemHood",
                            "ItemEars",
                            "ItemMouth",
                            "ItemMouth2",
                            "ItemMouth3",
                            "ItemNeck",
                            "ItemNose",
                            "ItemNeckAccessories",
                            "ItemNeckRestraints",
                        ]),
                        Effect: [E.BlockWardrobe, E.Freeze],
                    },
                },
            ],
        },
        {
            Name: "乳胶睡袋",
            Key: "l",
            Options: [{}, {}],
        },
    ],
};

const dialog = DialogTools.replicateGroupedItemDialog(["ItemDevices"], ["乳胶带床_Luzi"], {
    CN: {
        Select: "选择乳胶带床配置",
        SelectBase: "选择配置",

        Select盖子: "选择盖子",
        Module盖子: "盖子",
        Optiong0: "无",
        Optiong1: "添加盖子",
        Optiong2: "盖上盖子",
        Optiong3: "露出腹部",
        Optiong4: "露出头部",

        Setg0: "SourceCharacter去掉了DestinationCharacterAssetName盖子",
        Setg1: "SourceCharacter为DestinationCharacterAssetName添加了盖子",
        Setg2: "SourceCharacter关上了DestinationCharacterAssetName的盖子",
        Setg3: "SourceCharacter关上了DestinationCharacterAssetName的盖子, 但是打开了腹部的盖子.",
        Setg4: "SourceCharacter关上了DestinationCharacterAssetName的盖子, 但是打开了头部的盖子.",

        Select乳胶睡袋: "选择使用默认乳胶衣",
        Module乳胶睡袋: "默认乳胶衣",
        Optionl0: "使用",
        Optionl1: "不使用",

        Setl0: "SourceCharacter给TargetCharacter穿上了乳胶衣.",
        Setl1: "SourceCharacter脱掉了TargetCharacter的乳胶衣.",
    },
    EN: {
        Select: "Select Latex Bed Configuration",
        SelectBase: "Select Configuration",

        Select盖子: "Select Cover",
        Module盖子: "Cover",
        Optiong0: "None",
        Optiong1: "Add Cover",
        Optiong2: "Close Cover",
        Optiong3: "Expose Belly",
        Optiong4: "Expose Head",

        Setg0: "SourceCharacter removed DestinationCharacter AssetName Cover",
        Setg1: "SourceCharacter added Cover to DestinationCharacter AssetName",
        Setg2: "SourceCharacter closed DestinationCharacter AssetName Cover",
        Setg3:
            "SourceCharacter closed DestinationCharacter AssetName Cover, but opened Belly Cover",
        Setg4:
            "SourceCharacter closed DestinationCharacter AssetName Cover, but opened Head Cover",

        Select乳胶睡袋: "Select Default Latex Sleep Bag",
        Module乳胶睡袋: "Latex Sleep Bag",
        Optionl0: "Use",
        Optionl1: "Don't Use",

        Setl0: "SourceCharacter put TargetCharacter in Latex Sleep Bag",
        Setl1: "SourceCharacter removed Latex Sleep Bag from TargetCharacter ",
    },
    UA: {
        Select: "Виберіть Конфігурацію Латексного Ліжка",
        SelectBase: "Виберіть концігурацю",

        Select盖子: "Виберіть Покриття",
        Module盖子: "Накрити",
        Optiong0: "Жодного",
        Optiong1: "Додати покриття",
        Optiong2: "Закрити покриття",

        Setg0: "SourceCharacter забрали DestinationCharacter покриття",
        Setg1: "SourceCharacter додали покриття DestinationCharacter",
        Setg2: "SourceCharacter закрили покриття DestinationCharacter",
    },
});

const translations = {
    CN: "乳胶带床",
    EN: "Latex-belt Bed",
    RU: "Кровать с латексным ремнем",
    UA: "Латексне ліжко із ремнями",
};

export default function () {
    AssetManager.addAsset("ItemDevices", asset, extended, translations);
    AssetManager.addCustomDialog(dialog);
}
