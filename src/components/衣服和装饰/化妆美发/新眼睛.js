import { AssetManager } from "../../../assetForward";

/**
 * @typedef {object} EyeDefinition
 * @property {CustomAssetDefinitionAppearance} asset
 * @property {Parameters<typeof AssetManager.addAssetWithConfig>[2]["translation"]} translation
 * @property {Parameters<typeof AssetManager.addAssetWithConfig>[2]["layerNames"]} layerNames
 */

/**
 * @param {EyeDefinition} eyeDef
 */
export function addEyeAsset(eyeDef) {
    for (const group of /** @type {CustomGroupBodyName[]} */ (["左眼_Luzi", "右眼_Luzi"])) {
        AssetManager.addAssetWithConfig(group, eyeDef.asset, {
            translation: eyeDef.translation,
            layerNames: eyeDef.layerNames,
        });
    }
}

const layerNames = {
    CN: {
        1: "眼睑",
        2: "眼球",
        3: "虹膜",
        4: "亮斑",
        5: "睫毛",
        6: "睫毛（扩展）",
    },
    EN: {
        1: "Eyelid",
        2: "Eyeball",
        3: "Iris",
        4: "Highlight",
        5: "Lash",
        6: "Lash (Extended)",
    },
};

/** @type {EyeDefinition[]} */
const assets = [
    {
        asset: {
            Name: "眼睛1",
            Top: 120,
            Left: 180,
            Layer: [
                { Name: "1", AllowColorize: true },
                { Name: "2", AllowColorize: true },
                { Name: "3", AllowColorize: true },
                { Name: "4", AllowColorize: true },
            ],
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
            Top: 120,
            Left: 180,
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
            Top: 0,
            Left: 0,
            DefaultColor: ["Default", "Default", "#5AFFD1", "Default", "Default"],
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
        layerNames,
    },
    {
        asset: {
            Name: "眼睛4",
            Top: 0,
            Left: 0,
            DefaultColor: ["Default", "Default", "#9CFFF9", "Default", "Default"],
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
        layerNames,
    },
    {
        asset: {
            Name: "眼睛5",
            Top: 0,
            Left: 0,
            DefaultColor: ["Default", "Default", "#9CFFF9", "Default", "Default"],
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
        layerNames,
    },
    {
        asset: {
            Name: "眼睛6",
            Top: 0,
            Left: 0,
            DefaultColor: ["Default", "Default", "#FFE695", "Default", "Default", "Default"],
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
        layerNames,
    },
    {
        asset: {
            Name: "眼睛7",
            Top: 0,
            Left: 0,
            DefaultColor: ["Default", "Default", "#9CFFF9", "Default", "Default"],
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
        layerNames,
    },
    {
        asset: {
            Name: "眼睛8",
            Top: 0,
            Left: 0,
            DefaultColor: ["Default", "Default", "#5AFFD1", "Default", "Default"],
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
        layerNames,
    },
    {
        asset: {
            Name: "眼睛9",
            Top: 0,
            Left: 0,
            DefaultColor: ["Default", "Default", "#5AFFD1", "Default", "Default"],
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
        layerNames,
    },
    {
        asset: {
            Name: "眼睛10",
            Top: 0,
            Left: 0,
            DefaultColor: ["Default", "Default", "#5AFFD1", "Default", "Default"],
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
        layerNames,
    },
];

export default function () {
    for (const asset of assets) {
        addEyeAsset(asset);
    }
}
