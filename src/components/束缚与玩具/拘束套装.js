import { AssetManager } from "../../assetForward";
import { PathTools } from "@sugarch/bc-mod-utility";

/** @type {AssetPoseMapping} */
const upperMapping = {
    BackElbowTouch: "BackElbowTouch",
    Hogtied: "Hogtied",
};

/** @type {AssetPoseMapping} */
const lowerMapping = {
    Kneel: "Kneel",
    KneelingSpread: "KneelingSpread",
    LegsClosed: "LegsClosed",
    Spread: "Spread",
    Hogtied: "Hide",
};

/** @type {AssetPoseMapping} */
const suitMapping = {
    BackElbowTouch: "BackElbowTouch",
    Hogtied: PoseType.DEFAULT,
};

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
            ColorGroup: "皮带",
            Priority: 31,
            ParentGroup: "BodyLower",
            PoseMapping: lowerMapping,
        },
        {
            Name: "上半身",
            ColorGroup: "皮带",
            Priority: 31,
            ParentGroup: "BodyUpper",
            PoseMapping: upperMapping,
        },
        {
            Name: "下半身圆环",
            ColorGroup: "环",
            Priority: 31,
            ParentGroup: "BodyLower",
            PoseMapping: lowerMapping,
        },
        {
            Name: "上半身圆环",
            ColorGroup: "环",
            Priority: 32,
            ParentGroup: "BodyUpper",
            PoseMapping: upperMapping,
        },
        {
            Name: "下半身松紧扣",
            ColorGroup: "松紧扣",
            Priority: 32,
            ParentGroup: "BodyLower",
            PoseMapping: lowerMapping,
        },
        {
            Name: "上半身松紧扣",
            ColorGroup: "松紧扣",
            Priority: 32,
            ParentGroup: "BodyUpper",
            PoseMapping: upperMapping,
        },
        {
            Name: "链子",
            Priority: 30,
            ParentGroup: "BodyLower",
            PoseMapping: lowerMapping,
        },
        {
            Name: "手臂",
            Priority: 5,
            ParentGroup: "BodyUpper",
            PoseMapping: suitMapping,
        },
        {
            Name: "乳胶衣",
            Priority: 6,
            AllowTypes: { typed: 1 },
            PoseMapping: suitMapping,
        },
        {
            Name: "透视紧身衣",
            Priority: 6,
            AllowTypes: { typed: 2 },
            PoseMapping: suitMapping,
        },
        {
            Name: "紧身衣",
            Priority: 6,
            AllowTypes: { typed: 3 },
            PoseMapping: suitMapping,
        },
    ],
};

const layerNames = {
    EN: {
        下半身: "Lower Body",
        上半身: "Upper Body",
        下半身圆环: "Lower Body",
        上半身圆环: "Upper Body",
        下半身松紧扣: "Lower Body Strap",
        上半身松紧扣: "Upper Body Strap",
        皮带: "Belt",
        环: "Ring",
        松紧扣: "Strap",
        链子: "Chain",
        手臂: "Arms",
        乳胶衣: "Latex Suit",
        透视紧身衣: "Sheer Bodysuit",
        紧身衣: "Bodysuit",
    },
};

/** @type { TypedItemConfig } */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    ChangeWhenLocked: false,
    ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
    DrawImages: false,
    Options: [{ Name: "无" }, { Name: "乳胶衣" }, { Name: "透视紧身衣" }, { Name: "紧身衣" }],
};

/** @type {Record<string, string>} */
const icons = {
    "Screens/Inventory/ItemTorso/拘束套装_Luzi/无.png": PathTools.emptyImage,
    "Screens/Inventory/ItemTorso/拘束套装_Luzi/乳胶衣.png": PathTools.emptyImage,
    "Screens/Inventory/ItemTorso/拘束套装_Luzi/透视紧身衣.png": PathTools.emptyImage,
    "Screens/Inventory/ItemTorso/拘束套装_Luzi/紧身衣.png": PathTools.emptyImage,
};

const assetStrings = {
    CN: {
        无: "无",
        乳胶衣: "乳胶衣",
        透视紧身衣: "透视紧身衣",
        紧身衣: "紧身衣",

        Select: "选择附带服装配置",
        Set无: "SourceCharacter将DestinationCharacter拘束套装设置为无附带服装",
        Set乳胶衣: "SourceCharacter将DestinationCharacter拘束套装设置为附带乳胶衣",
        Set透视紧身衣: "SourceCharacter将DestinationCharacter拘束套装设置为附带透视紧身衣",
        Set紧身衣: "SourceCharacter将DestinationCharacter拘束套装设置为附带紧身衣",
    },
    EN: {
        无: "No",
        乳胶衣: "Latex Suit",
        透视紧身衣: "Sheer Bodysuit",
        紧身衣: "Bodysuit",

        Select: "Select Additional Clothing Configuration",
        Set无: "SourceCharacter set DestinationCharacter's Restraint Set to No Additional Clothing",
        Set乳胶衣: "SourceCharacter set DestinationCharacter's Restraint Set to with Latex Suit",
        Set透视紧身衣: "SourceCharacter set DestinationCharacter's Restraint Set to with Sheer Bodysuit",
        Set紧身衣: "SourceCharacter set DestinationCharacter's Restraint Set to with Bodysuit",
    },
};

const translation = {
    CN: "拘束套装",
    EN: "Restraint Set",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemTorso", asset, { extended, translation, layerNames, assetStrings });
    AssetManager.addImageMapping(icons);
}
