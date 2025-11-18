import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/**
 * @typedef {Object} AssetDefinitionParam
 * @property {CustomGroupName[]} groups 物品组名
 * @property {CustomAssetDefinition} asset 物品
 * @property {Translation.Entry} translation 物品翻译
 * @property {Translation.String} layerNames 图层名翻译
 */

/** @type {AddAssetWithConfigParams[]} */
const defs = [
    [
        ["EyeShadow", "FaceMarkings"],
        {
            Name: "面部妆容",
            Random: false,
            Left: 200,
            Top: 120,
            DefaultColor: ["#000000"],
            ParentGroup: {},
            DynamicGroupName: "FaceMarkings",
        },
        {
            translation: {
                CN: "泪痕仪轨",
                EN: "Tear Track Ritual",
                RU: "Ритуал слезной дорожки",
            },
        },
    ],
    [
        ["EyeShadow", "FaceMarkings"],
        {
            Name: "面部妆容1",
            Random: false,
            Left: 200,
            Top: 120,
            DefaultColor: ["#000000"],
            ParentGroup: {},
            DynamicGroupName: "FaceMarkings",
        },
        {
            translation: {
                CN: "五星显相",
                EN: "Five-Star Manifestation",
                RU: "Пятизвездочное проявление",
            },
        },
    ],
    [
        ["EyeShadow", "FaceMarkings"],
        {
            Name: "小丑面妆",
            Random: false,
            Left: 200,
            Top: 120,
            ParentGroup: {},
            DynamicGroupName: "FaceMarkings",
            Layer: [{ Name: "←" }, { Name: "→" }],
        },
        { translation: { CN: "小丑", EN: "The Clown", RU: "Клоун" } },
    ],
    [
        ["BodyMarkings", "FaceMarkings"],
        {
            Name: "番茄酱",
            Random: false,
            Left: 200,
            Top: 120,
            Priority: 9,
            DynamicGroupName: "FaceMarkings",
            ParentGroup: {},
        },
        {
            translation: {
                CN: "病娇的证据",
                EN: "Evidence of Yandere",
                RU: "Доказательства яндера",
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(defs);
    for (const a of defs) {
        luziSuffixFixups(a[0], a[1].Name);
    }
}
