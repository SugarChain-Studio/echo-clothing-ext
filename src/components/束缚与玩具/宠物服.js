import AssetManager from "@mod-utils/AssetManager";
import { VersionSupport } from "@mod-utils/VersionSupport";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "宠物服上",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    // Difficulty: 12,
    // SelfBondage: 8,
    // Time: 40,
    // RemoveTime: 30,
    // AllowLock: true,
    // AllowTighten: true,
    Hide: [
        "ArmsLeft",
        "ArmsRight",
        "HandsLeft",
        "HandsRight",
    ],
    ParentGroup: "BodyUpper",
    Fetish: ["Leather", "Pet"],
    Prerequisite: ["HasBreasts"],
    AllowActivePose: ["BaseUpper", "OverTheHead", "Yoked", "AllFours"],
    SetPose: ["BaseUpper"],
    Effect: [E.Block, E.BlockWardrobe],
    Block: ["ItemHands", "ItemHandheld"],
    PoseMapping: {
        OverTheHead: "OverTheHead",
        Yoked: "Yoked",
        AllFours: "AllFours",
    },
    Layer: [
        { Name: "手臂" },
        { Name: "拘束" },
        { Name: "拘束高光" },
        { Name: "束带" },
        { Name: "搭扣" },
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
    // Difficulty: 12,
    // SelfBondage: 8,
    // Time: 40,
    // RemoveTime: 30,
    // AllowLock: true,
    // AllowTighten: true,
    ParentGroup: "BodyLower",
    Fetish: ["Leather", "Pet"],
    AllowActivePose: ["Kneel", "KneelingSpread", "AllFours"],
    SetPose: ["Kneel"],
    PoseMapping: {
        Kneel: "Kneel",
        KneelingSpread: "KneelingSpread",
        AllFours: "AllFours",
    },
    Layer: [
        { Name: "拘束" },
        { Name: "拘束高光" },
        { Name: "束带" },
        { Name: "搭扣" },
    ],
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
    // AssetManager.addAsset("ItemArms", asset, undefined, translations);
    // AssetManager.addAsset("ItemLegs", asset2, undefined, translations2);
}
