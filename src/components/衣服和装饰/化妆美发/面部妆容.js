import { AssetManager } from "../../../assetForward";

/**
 * @typedef {Object} AssetDefinitionParam
 * @property {CustomGroupName[]} groups 物品组名
 * @property {CustomAssetDefinition} asset 物品
 * @property {Translation.Entry} translation 物品翻译
 * @property {Translation.String} layerNames 图层名翻译
 */

/** @type {AssetDefinitionParam[]} */
const defs = [
    {
        groups: ["EyeShadow", "FaceMarkings"],
        asset: {
            Name: "面部妆容_Luzi",
            Random: false,
            Left: 200,
            Top: 120,
            DefaultColor: ["#000000"],
            ParentGroup: {},
            DynamicGroupName: "FaceMarkings",
        },
        translation: {
            CN: "泪痕仪轨",
            EN: "Tear Track Ritual",
            RU: "Ритуал слезной дорожки",
        },
        layerNames: {},
    },
    {
        groups: ["EyeShadow", "FaceMarkings"],
        asset: {
            Name: "面部妆容1_Luzi",
            Random: false,
            Left: 200,
            Top: 120,
            DefaultColor: ["#000000"],
            ParentGroup: {},
            DynamicGroupName: "FaceMarkings",
        },
        translation: {
            CN: "五星显相",
            EN: "Five-Star Manifestation",
            RU: "Пятизвездочное проявление",
        },
        layerNames: {},
    },
    {
        groups: ["EyeShadow", "FaceMarkings"],
        asset: {
            Name: "小丑面妆",
            Random: false,
            Left: 200,
            Top: 120,
            ParentGroup: {},
            DynamicGroupName: "FaceMarkings",
            Layer: [{ Name: "←" }, { Name: "→" }],
        },
        translation: {
            CN: "小丑",
            EN: "The Clown",
            RU: "Клоун",
        },
        layerNames: {},
    },
    {
        groups: ["BodyMarkings", "FaceMarkings"],
        asset: {
            Name: "番茄酱_Luzi",
            Random: false,
            Left: 200,
            Top: 120,
            Priority: 9,
            ParentGroup: {},
        },
        translation: {
            CN: "病娇的证据",
            EN: "Evidence of Yandere",
            RU: "Доказательства яндера",
        },
        layerNames: {},
    },
];

export default function () {
    for (const { groups, asset, translation, layerNames } of defs) {
        for (const g of groups) {
            AssetManager.addAssetWithConfig(g, asset, { translation, layerNames });
        }
    }
}
