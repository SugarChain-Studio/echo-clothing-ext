import { ImageMapTools } from "@mod-utils/Tools/imageMapTools";
import { AssetManager } from "../../../assetForward";
import { ArmMaskTool } from "../../../lib";

/** @type {Partial<CustomAssetDefinitionItem>} */
const mouthFoodDef = {
    Top: 160,
    Left: 160,
    Random: false,
    Difficulty: -10,
    Effect: [],
    IsRestraint: false,
    ParentGroup: {},
    PoseMapping: {},
    Priority: 55,
};

/** @type {Partial<CustomAssetDefinitionItem>} */
const handFoodDef = {
    Random: false,
    Left: 160,
    Top: 300,
    Difficulty: -10,
    Priority: 55,
    IsRestraint: false,
    ParentGroup: {},
    AllowActivity: ["RubItem"],
    InheritPoseMappingFields: true,
};

/**
 * 创建食物，注意使用这个方法创建的食物必须以 [160, 160] 作为左上角
 * @param {string} name 资源名称
 * @param {Partial<CustomAssetDefinitionItem>} [args] 额外补充其他资源参数
 * @returns {CustomAssetDefinitionItem}
 */
const mouthFood = (name, args) => ({ Name: name, ...mouthFoodDef, ...args });

/**
 * @param {string} name 资源名称
 * @param {Partial<CustomAssetDefinitionItem>} [args] 额外补充其他资源参数
 * @returns {CustomAssetDefinitionItem}
 */
const handFood = (name, args) => ({ Name: name, ...handFoodDef, ...args });

/** @type {CustomAssetDefinitionItem} */
const hambAsset = {
    Name: "汉堡_Luzi",
    Random: false,
    Top: -50,
    Left: 150,
    DynamicGroupName: "ItemHood",
    Block: [],
    Difficulty: -10,
    ParentGroup: {},
    PoseMapping: {},
};

/** @type {CustomGroupedAssetDefinitions} */
const assets = {
    ItemMouth: [
        mouthFood("蛋糕卷_Luzi"),
        mouthFood("棒棒糖_Luzi", { Layer: [{ Name: "棒子" }, { Name: "糖" }, { Name: "条纹" }] }),
        mouthFood("烤鱼_Luzi"),
        mouthFood("鸡腿_Luzi"),
        mouthFood("煎包_Luzi"),
        mouthFood("曲奇"),
        mouthFood("吐司"),
        mouthFood("蛋挞"),
        mouthFood("月饼"),
    ],
    ItemHandheld: [
        hambAsset,
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
        handFood("棒棒糖_Luzi", { Layer: [{ Name: "棒子" }, { Name: "糖" }, { Name: "条纹" }] }),
        handFood("烤鱼_Luzi", { Layer: [{ Name: "竹签" }, { Name: "鱼" }] }),
        handFood("鸡腿_Luzi"),
        handFood("曲奇"),
        handFood("吐司"),
        handFood("蛋挞"),
        handFood("月饼"),
    ],
    ItemHood: [hambAsset],
};

/** @type {Translation.String} */
const hmSharedTranslation = {
    CN: {
        棒棒糖_Luzi: "棒棒糖",
        烤鱼_Luzi: "烤鱼",
        鸡腿_Luzi: "烤鸡腿",
        蛋糕卷_Luzi: "蛋糕卷",
        曲奇: "曲奇",
        吐司: "吐司",
        蛋挞: "蛋挞",
        月饼: "月饼",
    },
    EN: {
        棒棒糖_Luzi: "Lollipop",
        烤鱼_Luzi: "Grilled Fish",
        鸡腿_Luzi: "Roasted Chicken Leg",
        蛋糕卷_Luzi: "Cake Roll",
        曲奇: "Cookie",
        吐司: "Toast",
        蛋挞: "Egg Tart",
        月饼: "Mooncake",
    },
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        ItemHandheld: {
            汉堡_Luzi: "汉堡",
            奶茶: "奶茶",
            ...hmSharedTranslation.CN,
        },
        ItemMouth: {
            煎包_Luzi: "煎包",
            ...hmSharedTranslation.CN,
        },
        ItemHood: {
            汉堡_Luzi: "汉堡",
        },
    },
    EN: {
        ItemHandheld: {
            汉堡_Luzi: "Hamburger",
            奶茶: "Milk Tea",
            ...hmSharedTranslation.EN,
        },
        ItemMouth: {
            煎包_Luzi: "Fried Bun",
            ...hmSharedTranslation.EN,
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
    const iconMapping = ["曲奇", "吐司", "蛋挞", "月饼"].reduce((prev, item) => {
        prev[ImageMapTools.assetPreview("ItemHandheld", item)] = ImageMapTools.assetPreview("ItemMouth", item);
        return prev;
    }, {});

    AssetManager.addImageMapping(iconMapping);
    assets.ItemHandheld?.filter((i) => ["蛋挞", "月饼"].includes(i.Name))?.forEach((i) => {
        ArmMaskTool.createArmMaskForCloth("ItemHandheld", i, "Right");
    });
    AssetManager.addGroupedAssetsWithConfig(assets, translations, layerNames);
}
