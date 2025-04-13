import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "锦云绣雪旗袍_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Prerequisite: ["HasBreasts"],
    Priority: 26,
    AllowActivePose: ["Kneel", "LegsClosed", "Spread", "BaseLower", "BackBoxTie", "BackCuffs", "BackElbowTouch", "OverTheHead", "Yoked", "Hogtied", "BaseUpper", "AllFours"],
    Layer: [
        {
            Name: "A1",
            ParentGroup: "BodyLower",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "A2",
            ParentGroup: "BodyLower",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "A3",
            ParentGroup: "BodyLower",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "B1",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "B2",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "B3",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "B4",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "B5",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
    ],
};

const translations = {
    CN: "锦云绣雪旗袍",
    EN: "Brocaded Cloud and Embroidered Snow Cheongsam",
    RU: "Воскошенный облако и вышитая снежинка китайская халата",
};

export default function () {
    AssetManager.addAsset("Cloth", asset, undefined, translations);
}
