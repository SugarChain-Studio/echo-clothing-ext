import { AssetManager } from "../../assetForward";
import { PathTools } from "@sugarch/bc-mod-utility";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "拘束套装_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 25,
    AllowLock: true,
    DrawLocks: false,
    Effect: [E.Block, E.BlockWardrobe, E.Slow],
    Prerequisite: ["HasBreasts"],
    SetPose: ["BackElbowTouch"],
    AllowActivePose: ["BackElbowTouch"],
    Layer: [
        {
            Name: "下半身",
            Priority: 31,
            ParentGroup: "BodyLower",
            PoseMapping: {
                Kneel: "Kneel",
                KneelingSpread: "KneelingSpread",
                LegsClosed: "LegsClosed",
                Spread: "Spread",
                Hogtied: "Hide",
            },
        },
        {
            Name: "上半身",
            Priority: 31,
            ParentGroup: "BodyUpper",
            PoseMapping: {
                BackElbowTouch: "BackElbowTouch",
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "下半身圆环",
            Priority: 31,
            ParentGroup: "BodyLower",
            PoseMapping: {
                Kneel: "Kneel",
                KneelingSpread: "KneelingSpread",
                LegsClosed: "LegsClosed",
                Spread: "Spread",
                Hogtied: "Hide",
            },
        },
        {
            Name: "上半身圆环",
            Priority: 32,
            ParentGroup: "BodyUpper",
            PoseMapping: {
                BackElbowTouch: "BackElbowTouch",
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "下半身松紧扣",
            Priority: 32,
            ParentGroup: "BodyLower",
            PoseMapping: {
                Kneel: "Kneel",
                KneelingSpread: "KneelingSpread",
                LegsClosed: "LegsClosed",
                Spread: "Spread",
                Hogtied: "Hide",
            },
        },
        {
            Name: "上半身松紧扣",
            Priority: 32,
            ParentGroup: "BodyUpper",
            PoseMapping: {
                BackElbowTouch: "BackElbowTouch",
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "链子",
            Priority: 30,
            ParentGroup: "BodyLower",
            PoseMapping: {
                Kneel: "Kneel",
                KneelingSpread: "KneelingSpread",
                LegsClosed: "LegsClosed",
                Spread: "Spread",
                Hogtied: "Hide",
            },
        },
        {
            Name: "手臂",
            Priority: 5,
            ParentGroup: "BodyUpper",
            PoseMapping: {
                BackElbowTouch: "BackElbowTouch",
                Hogtied: PoseType.DEFAULT,
            },
        },
        {
            Name: "乳胶衣",
            Priority: 6,
            AllowTypes: { typed: 1 },
            PoseMapping: {
                BackElbowTouch: "BackElbowTouch",
                Hogtied: PoseType.DEFAULT,
            },
        },
        {
            Name: "透视紧身衣",
            Priority: 6,
            AllowTypes: { typed: 2 },
            PoseMapping: {
                BackElbowTouch: "BackElbowTouch",
                Hogtied: PoseType.DEFAULT,
            },
        },
        {
            Name: "紧身衣",
            Priority: 6,
            AllowTypes: { typed: 3 },
            PoseMapping: {
                BackElbowTouch: "BackElbowTouch",
                Hogtied: PoseType.DEFAULT,
            },
        },
    ],
};

/** @type { TypedItemConfig } */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    ChangeWhenLocked: false,
    ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
    DrawImages: false,
    Options: [
        {
            Name: "无",
        },
        {
            Name: "乳胶衣",
        },
        {
            Name: "透视紧身衣",
        },
        {
            Name: "紧身衣",
        },
    ],
};

/** @type {Record<string, string>} */
const icons = {
    "Screens/Inventory/ItemTorso/拘束套装_Luzi/无.png": PathTools.emptyImage,
    "Screens/Inventory/ItemTorso/拘束套装_Luzi/乳胶衣.png": PathTools.emptyImage,
    "Screens/Inventory/ItemTorso/拘束套装_Luzi/透视紧身衣.png": PathTools.emptyImage,
    "Screens/Inventory/ItemTorso/拘束套装_Luzi/紧身衣.png": PathTools.emptyImage,
};

const dialogs = DialogTools.replicateGroupedItemDialog(["ItemTorso"], ["拘束套装_Luzi"], {
    CN: {
        无: "无",
        乳胶衣: "乳胶衣",
        透视紧身衣: "透视紧身衣",
        紧身衣: "紧身衣",

        Select: "选择配置",
        Set无: "",
        Set乳胶衣: "",
        Set透视紧身衣: "",
        Set紧身衣: "",
    },
    EN: {
        无: "No",
        乳胶衣: "Latex Suit",
        透视紧身衣: "Sheer Bodysuit",
        紧身衣: "Bodysuit",

        Select: "Select Configuration",
        Set无: "",
        Set乳胶衣: "",
        Set透视紧身衣: "",
        Set紧身衣: "",
    },
    RU: {
        无: "Нет",
        乳胶衣: "Латексный костюм",
        透视紧身衣: "Прозрачный комбинезон",
        紧身衣: "Комбинезон",

        Select: "Выбор конфигурации",
        Set无: "",
        Set乳胶衣: "",
        Set透视紧身衣: "",
        Set紧身衣: "",
    },
    UA: {
        无: "Ні",
        乳胶衣: "Латексний костюм",
        透视紧身衣: "Напівпрозорий комбінезон",
        紧身衣: "Комбінезон",

        Select: "Виберіть конфігурацію предмету",
        Set无: "",
        Set乳胶衣: "",
        Set透视紧身衣: "",
        Set紧身衣: "",
    },
});

const translations = {
    CN: "拘束套装",
    EN: "Restraint Set",
    UA: "Набір обмежувачів",
};

export default function () {
    AssetManager.addAsset("ItemTorso", asset, extended, translations);
    AssetManager.addImageMapping(icons);
    AssetManager.addCustomDialog(dialogs);
}
