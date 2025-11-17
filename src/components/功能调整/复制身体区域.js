import { AssetManager } from "../../assetForward";
import { GroupConfig } from "./身体组调整";

/**
 * @typedef {Object} CopyGroupInfo
 * @property {details.StrictCustomGroupBodyName} mirror
 * @property {CustomGroupBodyName} source
 * @property {Translation.Entry} description
 * @property {Partial<CustomGroupDefinition>} [overrides]
 */

/** @type {Map<AssetGroupName, Set<CustomGroupName>>} */
const mirrorMap = new Map();

function addMirror(groupName, mirrorName) {
    if (!mirrorMap.has(groupName)) {
        mirrorMap.set(groupName, new Set([groupName]));
    }
    mirrorMap.get(groupName).add(mirrorName);
}

/** @param {AssetGroupName} groupName */
export function getMirrors(groupName) {
    if (!mirrorMap.has(groupName)) return new Set([groupName]);
    return mirrorMap.get(groupName);
}

/** @type {CopyGroupInfo[]} */
const copyGroups = [
    {
        mirror: "新前发_Luzi_stack",
        source: "新前发_Luzi",
        description: {
            CN: "🍔前发(叠加)",
            EN: "🍔Front Hair (Stack)",
        },
        overrides: { Hide: undefined },
    },
    {
        mirror: "新后发_Luzi_stack",
        source: "新后发_Luzi",
        description: {
            CN: "🍔后发(叠加)",
            EN: "🍔Back Hair (Stack)",
        },
        overrides: { Hide: undefined },
    },
    {
        mirror: "BodyMarkings2_Luzi",
        source: "BodyMarkings",
        description: {
            CN: "🍔身体涂画 2",
            EN: "🍔Body Markings 2",
            RU: "🍔Нарисованные отметины на теле 2",
        },
    },
    {
        mirror: "Cloth_笨笨蛋Luzi",
        source: "Cloth",
        description: {
            CN: "🍔衣服 2",
            EN: "🍔Cloth 2",
            RU: "🍔Одежда 2",
        },
    },
    {
        mirror: "Cloth_笨笨笨蛋Luzi2",
        source: "Cloth",
        description: {
            CN: "🍔衣服 3",
            EN: "🍔Cloth 3",
            RU: "🍔Одежда 3",
        },
    },
    {
        mirror: "ClothLower_笨笨蛋Luzi",
        source: "ClothLower",
        description: {
            CN: "🍔下装 2",
            EN: "🍔Bottom 2",
            RU: "🍔Нижняя одежда 2",
        },
    },
    {
        mirror: "ClothLower_笨笨笨蛋Luzi2",
        source: "ClothLower",
        description: {
            CN: "🍔下装 3",
            EN: "🍔Bottom 3",
            RU: "🍔Нижняя одежда 3",
        },
    },
    {
        mirror: "Bra_笨笨蛋Luzi",
        source: "Bra",
        description: {
            CN: "🍔胸罩 2",
            EN: "🍔Bra 2",
            RU: "🍔Бюстгальтер 2",
        },
    },
    {
        mirror: "Panties_笨笨蛋Luzi",
        source: "Panties",
        description: {
            CN: "🍔内裤 2",
            EN: "🍔Panties 2",
            RU: "🍔Трусики 2",
        },
    },
    {
        mirror: "Suit_笨笨蛋Luzi",
        source: "Suit",
        description: {
            CN: "🍔套装(上身) 2",
            EN: "🍔Suit Upper 2",
        },
    },
    {
        mirror: "SuitLower_笨笨蛋Luzi",
        source: "SuitLower",
        description: {
            CN: "🍔套装(下身) 2",
            EN: "🍔Suit Lower 2",
        },
    },
    {
        mirror: "ClothAccessory_笨笨蛋Luzi",
        source: "ClothAccessory",
        description: {
            CN: "🍔服装配饰 2",
            EN: "🍔Cloth Accessory 2",
            RU: "🍔Аксессуары одежды 2",
        },
    },
    {
        mirror: "ClothAccessory_笨笨笨蛋Luzi2",
        source: "ClothAccessory",
        description: {
            CN: "🍔服装配饰 3",
            EN: "🍔Cloth Accessory 3",
            RU: "🍔Аксессуары одежды 3",
        },
    },
    {
        mirror: "Necklace_笨笨蛋Luzi",
        source: "Necklace",
        description: {
            CN: "🍔项链 2",
            EN: "🍔Necklace 2",
            RU: "🍔Цепочка 2",
        },
    },
    {
        mirror: "Luzi_Jewelry_0",
        source: "Jewelry",
        description: {
            CN: "🍔珠宝 1",
            EN: "🍔Jewelry 1",
        },
    },
    {
        mirror: "Shoes_笨笨蛋Luzi",
        source: "Shoes",
        description: {
            CN: "🍔鞋子 2",
            EN: "🍔Shoes 2",
            RU: "🍔Обувь 2",
        },
    },
    {
        mirror: "Hat_笨笨蛋Luzi",
        source: "Hat",
        description: {
            CN: "🍔帽子 2",
            EN: "🍔Hat 2",
            RU: "🍔Шляпа 2",
        },
    },
    {
        mirror: "HairAccessory3_笨笨蛋Luzi",
        source: "HairAccessory3",
        description: {
            CN: "🍔发饰 +1",
            EN: "🍔Hair Accessory +1",
            RU: "🍔Головной убор +1",
        },
    },
    {
        mirror: "Luzi_HairAccessory3_1",
        source: "HairAccessory3",
        description: {
            CN: "🍔发饰 +2",
            EN: "🍔Hair Accessory +2",
            RU: "🍔Головной убор +2",
        },
    },
    {
        mirror: "Luzi_HairAccessory3_2",
        source: "HairAccessory3",
        description: {
            CN: "🍔发饰 +3",
            EN: "🍔Hair Accessory +3",
            RU: "🍔Головной убор +3",
        },
    },
    {
        mirror: "Gloves_笨笨蛋Luzi",
        source: "Gloves",
        description: {
            CN: "🍔手套 2",
            EN: "🍔Gloves 2",
            RU: "🍔Перчатки 2",
        },
    },
    {
        mirror: "Mask_笨笨蛋Luzi",
        source: "Mask",
        description: {
            CN: "🍔面具 2",
            EN: "🍔Mask 2",
            RU: "🍔Маска 2",
        },
    },
    {
        mirror: "Wings_笨笨蛋Luzi",
        source: "Wings",
        description: {
            CN: "🍔翅膀 2",
            EN: "🍔Wings 2",
            RU: "🍔Крылья 2",
        },
    },
];

export default function () {
    GroupConfig.forceCharaPreview(["新前发_Luzi_stack", "新后发_Luzi_stack"]);

    GroupConfig.spHideAs({
        新前发_Luzi: "HairFront",
        新后发_Luzi: "HairBack",
        右眼_Luzi: "Eyes",
        左眼_Luzi: "Eyes2",
    });

    copyGroups.forEach((definition) => {
        addMirror(definition.source, definition.mirror);

        AssetManager.addCopyGroup(definition.mirror, definition.source, definition.description, definition.overrides);
    });
}
