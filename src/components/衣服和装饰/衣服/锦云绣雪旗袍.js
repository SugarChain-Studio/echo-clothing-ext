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
                OverTheHead: "OverTheHead",
                Yoked: "Yoked",
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "B2",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                OverTheHead: "OverTheHead",
                Yoked: "Yoked",
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "B3",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                OverTheHead: "OverTheHead",
                Yoked: "Yoked",
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "B4",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                OverTheHead: "OverTheHead",
                Yoked: "Yoked",
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "B5",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                OverTheHead: "OverTheHead",
                Yoked: "Yoked",
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
    ],
};

const description = {
    CN: "锦云绣雪旗袍",
    EN: "Brocade Clouds & Snow Embroidery Qipao",
};

const layerNames = {
    CN: {
        A1: "内衬裙子",
        A2: "内衬裙子阴影",
        A3: "内衬裙子边沿",
        B1: "旗袍",
        B2: "旗袍阴影",
        B3: "旗袍边沿",
        B4: "旗袍图案",
        B5: "扣子",
    },
    EN: {
        A1: "Lining Skirt",
        A2: "Lining Skirt Shadow",
        A3: "Lining Skirt Edge",
        B1: "Qipao",
        B2: "Qipao Shadow",
        B3: "Qipao Edge",
        B4: "Qipao Pattern",
        B5: "Button",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("Cloth", asset, {
        description,
        layerNames,
    });
}
