import { AssetManager } from "../../../assetForward";

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    Cloth: [
        {
            Name: "披肩_Luzi",
            Random: false,
            Gender: "F",
            Top: -110,
            Left: 0,
            Prerequisite: ["HasBreasts"],
            Layer: [
                {
                    Name: "Band",
                    Priority: 34,
                    ParentGroup: {},
                    PoseMapping: {},
                },
                {
                    Name: "Shawl",
                    Priority: 34,
                    ParentGroup: {},
                    PoseMapping: {
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                    },
                },
            ],
        },
    ],
    ClothAccessory: [
        {
            Name: "披肩短_Luzi",
            Random: false,
            Gender: "F",
            Top: 0,
            Left: 0,
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            DefaultColor: ["#490707", "#490707", "#FFFFFF", "#FFFFFF"],
            Layer: [
                {
                    Name: "衣左",
                    ColorGroup: "衣",
                    Priority: 34,
                    PoseMapping: {
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                    },
                },
                {
                    Name: "衣右",
                    ColorGroup: "衣",
                    Priority: 34,
                    PoseMapping: {
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                    },
                },
                {
                    Name: "绒左",
                    ColorGroup: "绒",
                    Priority: 34,
                    PoseMapping: {
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                    },
                },
                {
                    Name: "绒右",
                    ColorGroup: "绒",
                    Priority: 34,
                    PoseMapping: {
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                    },
                },
            ],
        },
        {
            Name: "披肩长_Luzi",
            Random: false,
            Gender: "F",
            Top: 0,
            Left: 0,
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            DefaultColor: ["#490707", "#490707", "#FFFFFF", "#FFFFFF"],
            Layer: [
                {
                    Name: "衣左",
                    ColorGroup: "衣",
                    Priority: 32,
                    PoseMapping: {
                        TapedHands: PoseType.DEFAULT,
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                        BackBoxTie: PoseType.DEFAULT,
                        BackElbowTouch: PoseType.DEFAULT,
                        BackCuffs: PoseType.DEFAULT,
                        AllFours: PoseType.DEFAULT,
                        Hogtied: PoseType.DEFAULT,
                    },
                },
                {
                    Name: "衣右",
                    ColorGroup: "衣",
                    Priority: 32,
                    PoseMapping: {
                        TapedHands: PoseType.DEFAULT,
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                        BackBoxTie: PoseType.DEFAULT,
                        BackElbowTouch: PoseType.DEFAULT,
                        BackCuffs: PoseType.DEFAULT,
                        AllFours: PoseType.DEFAULT,
                        Hogtied: PoseType.DEFAULT,
                    },
                },
                {
                    Name: "绒左",
                    ColorGroup: "绒",
                    Priority: 32,
                    PoseMapping: {
                        TapedHands: PoseType.DEFAULT,
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                        BackBoxTie: PoseType.DEFAULT,
                        BackElbowTouch: PoseType.DEFAULT,
                        BackCuffs: PoseType.DEFAULT,
                        AllFours: PoseType.DEFAULT,
                        Hogtied: PoseType.DEFAULT,
                    },
                },
                {
                    Name: "绒右",
                    ColorGroup: "绒",
                    Priority: 32,
                    PoseMapping: {
                        TapedHands: PoseType.DEFAULT,
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                        BackBoxTie: PoseType.DEFAULT,
                        BackElbowTouch: PoseType.DEFAULT,
                        BackCuffs: PoseType.DEFAULT,
                        AllFours: PoseType.DEFAULT,
                        Hogtied: PoseType.DEFAULT,
                    },
                },
            ],
        },
        {
            Name: "立领披肩_Luzi",
            Random: false,
            Gender: "F",
            Top: 0,
            Left: 0,
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            Layer: [
                {
                    Name: "披肩",
                    Priority: 34,
                    PoseMapping: {
                        BackCuffs: "BackCuffs",
                        BackElbowTouch: "BackElbowTouch",
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                    },
                },
                {
                    Name: "披肩后",
                    Priority: 1,
                    PoseMapping: {
                        Yoked: "Yoked",
                    },
                },
            ],
        },
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        Cloth: {
            披肩_Luzi: "天主披肩",
        },
        ClothAccessory: {
            披肩短_Luzi: "圣诞披肩短",
            披肩长_Luzi: "圣诞披肩长",
            立领披肩_Luzi: "血族斗篷",
        },
    },
    EN: {
        Cloth: {
            披肩_Luzi: "Christian Shawl",
        },
        ClothAccessory: {
            披肩短_Luzi: "Xmas Short Shawl",
            披肩长_Luzi: "Xmas Long Shawl",
            立领披肩_Luzi: "Vampiric Cloak",
        },
    },
    RU: {
        Cloth: {
            披肩_Luzi: "Палантин",
        },
        ClothAccessory: {
            披肩短_Luzi: "Короткий палантин",
            披肩长_Luzi: "Длинный палантин",
        },
    },
    UA: {
        Cloth: {
            披肩_Luzi: "Палантин",
        },
        ClothAccessory: {
            披肩短_Luzi: "Короткий палантин",
            披肩长_Luzi: "Довгий палантин",
        },
    },
};

export default function () {
    AssetManager.addGroupedAssets(assets, translations);
}
