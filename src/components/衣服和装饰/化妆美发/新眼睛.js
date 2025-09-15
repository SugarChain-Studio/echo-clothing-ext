import { PathTools } from "@sugarch/bc-mod-utility";
import { AssetManager } from "../../../assetForward";

/**
 * @typedef {object} SpecialExpressionDefinition
 * @property {string} dizzy
 * @property {string} daydream
 */

/**
 * @typedef {object} EyeDefinition
 * @property {CustomAssetDefinitionAppearance} asset
 * @property {AddAssetWithConfigParams[2]["translation"]} translation
 * @property {AddAssetWithConfigParams[2]["layerNames"]} layerNames
 * @property {SpecialExpressionDefinition} specials
 */

/** @type {EyeDefinition["layerNames"]}*/
const commonLayerNames = {
    CN: {
        1: "眼睑",
        2: "眼球",
        3: "虹膜",
        4: "亮斑",
        5: "睫毛",
        6: "睫毛（次要）",
    },
    EN: {
        1: "Eyelid",
        2: "Eyeball",
        3: "Iris",
        4: "Highlight",
        5: "Lash",
        6: "Lash (Secondary)",
    },
};

/** @type {EyeDefinition["specials"]}*/
const commonSpecials = {
    dizzy: "5",
    daydream: "5",
};

/** @type {EyeDefinition[]} */
const assets = [
    {
        asset: {
            Name: "眼睛1",
            Left: 180,
            Top: 119,
            DefaultColor: ["Default", "Default", "Default", "#111"],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
            ],
        },
        specials: {
            dizzy: "4",
            daydream: "4",
        },
        translation: {
            CN: "红宝石",
            EN: "Ruby",
        },
        layerNames: {
            CN: {
                1: "眼球",
                2: "虹膜（暗部）",
                3: "虹膜",
                4: "睫毛",
            },
            EN: {
                1: "Eyeball",
                2: "Iris (Dark)",
                3: "Iris",
                4: "Lash",
            },
        },
    },
    {
        asset: {
            Name: "眼睛2",
            Left: 180,
            Top: 119,
            DefaultColor: ["Default", "Default", "Default", "Default", "Default", "Default", "#111", "#111"],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
                { Name: "5", AllowColorize: true },
                { Name: "6", AllowColorize: true },
                { Name: "7", AllowColorize: true },
                { Name: "8", AllowColorize: true },
            ],
        },
        specials: {
            dizzy: "7",
            daydream: "7",
        },
        translation: {
            CN: "天狐",
            EN: "Celestial Vixen",
        },
        layerNames: {
            CN: {
                1: "下眼睑",
                2: "上眼睑",
                3: "眼球",
                4: "虹膜",
                5: "虹膜边缘",
                6: "瞳孔",
                7: "下睫毛",
                8: "上睫毛",
            },
            EN: {
                1: "Lower Eyelid",
                2: "Upper Eyelid",
                3: "Eyeball",
                4: "Iris",
                5: "Iris Edge",
                6: "Pupil",
                7: "Lower Lash",
                8: "Upper Lash",
            },
        },
    },
    {
        asset: {
            Name: "眼睛3",
            Left: 180,
            Top: 119,
            DefaultColor: ["Default", "Default", "#5AFFD1", "Default", "#111"],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
                { Name: "5", AllowColorize: true },
            ],
        },
        translation: {
            CN: "青玉",
            EN: "Jade",
        },
        layerNames: commonLayerNames,
        specials: commonSpecials,
    },
    {
        asset: {
            Name: "眼睛4",
            Left: 180,
            Top: 119,
            DefaultColor: ["Default", "Default", "#9CFFF9", "Default", "#111"],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
                { Name: "5", AllowColorize: true },
            ],
        },
        translation: {
            CN: "水晶",
            EN: "Crystal",
        },
        layerNames: commonLayerNames,
        specials: commonSpecials,
    },
    {
        asset: {
            Name: "眼睛5",
            Left: 180,
            Top: 119,
            DefaultColor: ["Default", "Default", "#9CFFF9", "Default", "#111"],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
                { Name: "5", AllowColorize: true },
            ],
        },
        translation: {
            CN: "水晶（长睫毛）",
            EN: "Crystal (Long Lash)",
        },
        layerNames: commonLayerNames,
        specials: commonSpecials,
    },
    {
        asset: {
            Name: "眼睛6",
            Left: 180,
            Top: 119,
            DefaultColor: ["Default", "Default", "#FFE695", "Default", "#111", "Default"],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
                { Name: "5", AllowColorize: true },
                { Name: "6", AllowColorize: true },
            ],
        },
        translation: {
            CN: "黄玉",
            EN: "Topaz",
        },
        layerNames: commonLayerNames,
        specials: commonSpecials,
    },
    {
        asset: {
            Name: "眼睛7",
            Left: 180,
            Top: 119,
            DefaultColor: ["Default", "Default", "#9CFFF9", "Default", "#111"],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
                { Name: "5", AllowColorize: true },
                { Name: "6", AllowColorize: true },
            ],
        },
        translation: {
            CN: "水晶（锐利）",
            EN: "Crystal (Sharp)",
        },
        layerNames: commonLayerNames,
        specials: commonSpecials,
    },
    {
        asset: {
            Name: "眼睛8",
            Left: 180,
            Top: 119,
            DefaultColor: ["Default", "Default", "#5AFFD1", "Default", "#111"],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
                { Name: "5", AllowColorize: true },
            ],
        },
        translation: {
            CN: "青玉（睁大）",
            EN: "Jade (Wide Open)",
        },
        layerNames: commonLayerNames,
        specials: commonSpecials,
    },
    {
        asset: {
            Name: "眼睛9",
            Left: 180,
            Top: 119,
            DefaultColor: ["Default", "Default", "#5AFFD1", "Default", "#111"],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
                { Name: "5", AllowColorize: true },
            ],
        },
        translation: {
            CN: "青玉（眼影）",
            EN: "Jade (Eyeshadow)",
        },
        layerNames: commonLayerNames,
        specials: commonSpecials,
    },
    {
        asset: {
            Name: "眼睛10",
            Left: 180,
            Top: 119,
            DefaultColor: ["Default", "Default", "#5AFFD1", "Default", "#111"],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
                { Name: "5", AllowColorize: true },
            ],
        },
        translation: {
            CN: "青玉（眼影2）",
            EN: "Jade (Eyeshadow 2)",
        },
        layerNames: commonLayerNames,
        specials: commonSpecials,
    },
];

export default function () {
    /** @type {Record<string,string>} */
    const mappings = {};

    for (const asset of assets) {
        for (const group of /** @type {CustomGroupBodyName[]} */ (["左眼_Luzi", "右眼_Luzi"])) {
            AssetManager.addAssetWithConfig(group, asset.asset, {
                translation: asset.translation,
                layerNames: asset.layerNames,
            });

            asset.asset.Layer.forEach((layer) => {
                const daydreamKey = `Assets/Female3DCG/${group}/Daydream/${asset.asset.Name}_${layer.Name}.png`;
                const dizzyKey = `Assets/Female3DCG/${group}/Dizzy/${asset.asset.Name}_${layer.Name}.png`;

                mappings[daydreamKey] =
                    layer.Name === asset.specials.dizzy
                        ? `Assets/Female3DCG/${group}/daydream.png`
                        : PathTools.emptyImage;

                mappings[dizzyKey] =
                    layer.Name === asset.specials.dizzy ? `Assets/Female3DCG/${group}/dizzy.png` : PathTools.emptyImage;
            });
        }
    }

    AssetManager.addImageMapping(mappings);
}
