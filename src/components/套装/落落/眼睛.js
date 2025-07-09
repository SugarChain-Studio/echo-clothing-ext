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
 * @property {Parameters<typeof AssetManager.addAssetWithConfig>[2]["translation"]} translation
 * @property {Parameters<typeof AssetManager.addAssetWithConfig>[2]["layerNames"]} layerNames
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
            Name: "眼睛11",
            Left: 180,
            Top: 120,
            DefaultColor: ["Default", "Default", "Default", "Default", "Default"],
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
                { Name: "5", AllowColorize: true },
            ],
        },
        translation: {
            CN: "夜色",
            EN: "Amber",
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
