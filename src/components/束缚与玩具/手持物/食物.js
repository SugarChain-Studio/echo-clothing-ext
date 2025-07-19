import { AssetManager } from "../../../assetForward";

/** @type {CustomGroupedAssetDefinitions} */
const assets = {
    ItemMouth: [
        {
            Name: "棒棒糖_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: -10,
            ParentGroup: {},
            Effect: [],
            PoseMapping: {},
            Priority: 55,
            Layer: [{ Name: "棒子" }, { Name: "糖" }, { Name: "条纹" }],
        },
        {
            Name: "烤鱼_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Priority: 55,
            Difficulty: -10,
            ParentGroup: {},
            Effect: [],
            PoseMapping: {},
        },
        {
            Name: "鸡腿_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Priority: 55,
            Difficulty: -10,
            ParentGroup: {},
            Effect: [],
        },
        {
            Name: "煎包_Luzi",
            Random: false,
            Top: 160,
            Left: 160,
            Priority: 55,
            Difficulty: -10,
            ParentGroup: {},
            Effect: [],
            PoseMapping: {},
        },
        {
            Name: "蛋糕卷_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Priority: 55,
            Difficulty: -10,
            ParentGroup: {},
            Effect: [],
        },
    ],
    ItemHandheld: [
        {
            Name: "汉堡_Luzi",
            Random: false,
            Top: 0,
            Left: 2,
            Difficulty: -10,
            ParentGroup: {},
            PoseMapping: {},
        },
        {
            Name: "棒棒糖_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: -10,
            ParentGroup: {},
            PoseMapping: {},
            Layer: [
                {
                    Name: "棒子",
                    Priority: 55,
                },
                {
                    Name: "糖",
                    Priority: 55,
                },
                {
                    Name: "条纹",
                    Priority: 55,
                },
            ],
        },
        {
            Name: "烤鱼_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: -10,
            ParentGroup: {},
            PoseMapping: {},
            Layer: [
                {
                    Name: "竹签",
                    Priority: 55,
                },
                {
                    Name: "鱼",
                    Priority: 55,
                },
            ],
        },
        {
            Name: "鸡腿_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: -10,
            ParentGroup: {},
            PoseMapping: {},
        },
        {
            Name: "奶茶",
            Random: false,
            Left: 220,
            Top: 350,
            Difficulty: -10,
            ParentGroup: {},
            Priority: 55,
            DefaultColor: ["#BA9273", "#F9F4E0", "#B4B4B4", "Default", "#878787"],
            AllowActivity: ["RubItem", "SipItem"],
            PoseMapping: {},
            Layer: [
                {
                    Name: "底色",
                },
                {
                    Name: "顶色",
                },
                {
                    Name: "盖子",
                },
                {
                    Name: "外观",
                },
                {
                    Name: "吸管",
                },
            ],
        },
    ],
    ItemHood: [
        {
            Name: "汉堡_Luzi",
            Random: false,
            Top: 0,
            Left: 2,
            Block: [],
            Difficulty: -10,
            ParentGroup: {},
        },
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        ItemHandheld: {
            汉堡_Luzi: "汉堡",
            棒棒糖_Luzi: "棒棒糖",
            烤鱼_Luzi: "烤鱼",
            鸡腿_Luzi: "烤鸡腿",
            蛋糕卷_Luzi: "蛋糕卷",
            奶茶: "奶茶",
        },
        ItemMouth: {
            棒棒糖_Luzi: "棒棒糖",
            烤鱼_Luzi: "烤鱼",
            鸡腿_Luzi: "烤鸡腿",
            煎包_Luzi: "煎包",
            蛋糕卷_Luzi: "蛋糕卷",
        },
        ItemHood: {
            汉堡_Luzi: "汉堡",
        },
    },
    EN: {
        ItemHandheld: {
            汉堡_Luzi: "Hamburger",
            棒棒糖_Luzi: "Lollipop",
            烤鱼_Luzi: "Grilled Fish",
            鸡腿_Luzi: "Roasted Chicken Leg",
            蛋糕卷_Luzi: "Cake Roll",
            奶茶: "Milk Tea",
        },
        ItemMouth: {
            棒棒糖_Luzi: "Lollipop",
            烤鱼_Luzi: "Grilled Fish",
            鸡腿_Luzi: "Roasted Chicken Leg",
            煎包_Luzi: "Fried Bun",
            蛋糕卷_Luzi: "Cake Roll",
        },
        ItemHood: {
            汉堡_Luzi: "Hamburger",
        },
    },
    RU: {
        ItemHandheld: {
            汉堡_Luzi: "Гамбургер",
            棒棒糖_Luzi: "Леденец",
            烤鱼_Luzi: "Запечённая рыба",
            鸡腿_Luzi: "Запечённая куриная нога",
            奶茶: "чай с молоком",
        },
        ItemMouth: {
            棒棒糖_Luzi: "Леденец",
            烤鱼_Luzi: "Запечённая рыба",
            鸡腿_Luzi: "Запечённая куриная нога",
            蛋糕卷_Luzi: "Рулет",
        },
        ItemHood: {
            汉堡_Luzi: "Гамбургер",
        },
    },
};

const layerNames = {
    EN: {
        ItemMouth: {
            棒棒糖_Luzi: {
                棒子: "Stick",
                糖: "Candy",
                条纹: "Stripes",
            },
        },
        ItemHandheld: {
            棒棒糖_Luzi: {
                棒子: "Stick",
                糖: "Candy",
                条纹: "Stripes",
            },
            烤鱼_Luzi: {
                竹签: "Bamboo Skewer",
                鱼: "Fish",
            },
            奶茶: {
                底色: "Base Color",
                顶色: "Top Color",
                盖子: "Lid Color",
                外观: "Appearance Color",
                吸管: "Straw Color",
            },
        },
    },
};

export default function () {
    AssetManager.addGroupedAssetsWithConfig(assets, translations, layerNames);
}
