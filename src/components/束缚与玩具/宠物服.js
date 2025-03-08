import AssetManager from "@mod-utils/AssetManager";
import { VersionSupport } from "@mod-utils/VersionSupport";

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
        { Name: "手臂",
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
    AssetManager.addAsset("ItemArms", asset, undefined, translations);
    AssetManager.addAsset("ItemLegs", asset2, undefined, translations2);
}
