import { AssetManager } from "../../../assetForward";

/** @type {Partial<CustomAssetDefinitionItem>} */
const mouthFood = {
    Top: 160,
    Left: 160,
    Random: false,
    Difficulty: -10,
    Effect: [],
    ParentGroup: {},
    PoseMapping: {},
    Priority: 55,
};

/** @type {Partial<CustomAssetDefinitionItem>} */
const handFood = {
    Random: false,
    Left: 160,
    Top: 300,
    Difficulty: -10,
    Priority: 55,
    ParentGroup: {},
    PoseMapping: {},
};

/**
 * 创建食物，注意使用这个方法创建的食物必须以 [160, 160] 作为左上角
 * @param {string} name 资源名称
 * @param {Partial<CustomAssetDefinitionItem>} [args] 额外补充其他资源参数
 * @returns {CustomAssetDefinitionItem}
 */
const makeFood = (name, args) => ({ Name: name, ...mouthFood, ...args });

/** @type {CustomGroupedAssetDefinitions} */
const assets = {
    ItemMouth: [
        makeFood("棒棒糖_Luzi", { Layer: [{ Name: "棒子" }, { Name: "糖" }, { Name: "条纹" }] }),
        makeFood("烤鱼_Luzi"),
        makeFood("鸡腿_Luzi"),
        makeFood("煎包_Luzi"),
        makeFood("蛋糕卷_Luzi"),
        makeFood("曲奇"),
        makeFood("吐司"),
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
            ...handFood,
            Layer: [{ Name: "棒子" }, { Name: "糖" }, { Name: "条纹" }],
        },
        {
            Name: "烤鱼_Luzi",
            ...handFood,
            Layer: [{ Name: "竹签" }, { Name: "鱼" }],
        },
        { Name: "鸡腿_Luzi", ...handFood },
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
            Layer: [{ Name: "底色" }, { Name: "顶色" }, { Name: "盖子" }, { Name: "外观" }, { Name: "吸管" }],
        },
        { Name: "曲奇", ...handFood },
        { Name: "吐司", ...handFood },
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
            曲奇: "曲奇",
            吐司: "吐司",
        },
        ItemMouth: {
            棒棒糖_Luzi: "棒棒糖",
            烤鱼_Luzi: "烤鱼",
            鸡腿_Luzi: "烤鸡腿",
            煎包_Luzi: "煎包",
            蛋糕卷_Luzi: "蛋糕卷",
            曲奇: "曲奇",
            吐司: "吐司",
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
            曲奇: "Cookie",
            吐司: "Toast",
        },
        ItemMouth: {
            棒棒糖_Luzi: "Lollipop",
            烤鱼_Luzi: "Grilled Fish",
            鸡腿_Luzi: "Roasted Chicken Leg",
            煎包_Luzi: "Fried Bun",
            蛋糕卷_Luzi: "Cake Roll",
            曲奇: "Cookie",
            吐司: "Toast",
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
    const iconMapping = ["曲奇", "吐司"].reduce((prev, item) => {
        prev[`Assets/Female3DCG/ItemHandheld/Preview/${item}.png`] = `Assets/Female3DCG/ItemMouth/Preview/${item}.png`;
        return prev;
    }, {});

    AssetManager.addImageMapping(iconMapping);

    AssetManager.addGroupedAssetsWithConfig(assets, translations, layerNames);
}
