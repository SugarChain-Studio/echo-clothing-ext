import { AssetManager } from "../../../assetForward";

/** @type {(AssetLayerDefinition & {Localized: Translation.Entry})[]} */
const layers = [
    {
        Name: "狗爪",
        ColorGroup: "动物",
        Localized: {
            CN: "狗爪",
            EN: "Dog Paw",
        },
    },
    {
        Name: "猫爪",
        ColorGroup: "动物",
        Localized: {
            CN: "猫爪",
            EN: "Cat Paw",
        },
    },
    {
        Name: "马蹄铁",
        ColorGroup: "动物",
        Localized: {
            CN: "马蹄铁",
            EN: "Horseshoe",
        },
    },
    {
        Name: "小丑",
        ColorGroup: "扑克",
        Localized: {
            CN: "小丑",
            EN: "Jester (Poker)",
        },
    },
    {
        Name: "红桃",
        ColorGroup: "扑克",
        Localized: {
            CN: "红桃",
            EN: "Heart (Poker)",
        },
    },
    {
        Name: "方片",
        ColorGroup: "扑克",
        Localized: {
            CN: "方片",
            EN: "Diamond (Poker)",
        },
    },
    {
        Name: "黑桃",
        ColorGroup: "扑克",
        Localized: {
            CN: "黑桃",
            EN: "Spade (Poker)",
        },
    },
    {
        Name: "草花",
        ColorGroup: "扑克",
        Localized: {
            CN: "草花",
            EN: "Club (Poker)",
        },
    },
    {
        Name: "东风",
        ColorGroup: "麻将",
        Localized: {
            CN: "东风",
            EN: "East Wind (Mahjong)",
        },
    },
    {
        Name: "南风",
        ColorGroup: "麻将",
        Localized: {
            CN: "南风",
            EN: "South Wind (Mahjong)",
        },
    },
    {
        Name: "西风",
        ColorGroup: "麻将",
        Localized: {
            CN: "西风",
            EN: "West Wind (Mahjong)",
        },
    },
    {
        Name: "北风",
        ColorGroup: "麻将",
        Localized: {
            CN: "北风",
            EN: "North Wind (Mahjong)",
        },
    },
    {
        Name: "红中",
        ColorGroup: "麻将",
        Localized: {
            CN: "红中",
            EN: "Red Dragon (Mahjong)",
        },
    },
    {
        Name: "发财",
        ColorGroup: "麻将",
        Localized: {
            CN: "发财",
            EN: "Green Dragon (Mahjong)",
        },
    },
    {
        Name: "白板",
        ColorGroup: "麻将",
        Localized: {
            CN: "白板",
            EN: "White Dragon (Mahjong)",
        },
    },
    {
        Name: "篮球",
        Localized: {
            CN: "篮球",
            EN: "Basketball",
        },
    },
    {
        Name: "钻石",
        Localized: {
            CN: "钻石",
            EN: "Diamond",
        },
    },
    {
        Name: "黑8",
        Localized: {
            CN: "黑8",
            EN: "Black 8",
        },
    },
];

/** @type {(ModularItemModuleConfig & {Localized:Translation.Entry} & {LuziAlpha: RectTuple, LuziShowWhenLying?:boolean, LuziLayerC: number})[]} */
const posModules = [
    {
        Name: "右肩",
        Localized: {
            CN: "右肩",
            EN: "Right Shoulder",
        },
        LuziAlpha: [195, 239, 30, 30],
        LuziShowWhenLying: true,
        LuziLayerC: 1,
        Key: "a",
        Options: [{}, {}],
    },
    {
        Name: "左肩",
        Localized: {
            CN: "左肩",
            EN: "Left Shoulder",
        },
        LuziAlpha: [275, 239, 30, 30],
        LuziShowWhenLying: true,
        LuziLayerC: 1,
        Key: "b",
        Options: [{}, {}],
    },
    {
        Name: "右胸口",
        Localized: {
            CN: "右胸口",
            EN: "Right Chest",
        },
        LuziAlpha: [215, 288, 30, 30],
        LuziShowWhenLying: true,
        LuziLayerC: 1,
        Key: "c",
        Options: [{}, {}],
    },
    {
        Name: "中胸口",
        Localized: {
            CN: "中胸口",
            EN: "Middle Chest",
        },
        LuziAlpha: [225, 253, 50, 50],
        LuziShowWhenLying: true,
        LuziLayerC: 2,
        Key: "d",
        Options: [{}, {}],
    },
    {
        Name: "左胸口",
        Localized: {
            CN: "左胸口",
            EN: "Left Chest",
        },
        LuziAlpha: [255, 288, 30, 30],
        LuziShowWhenLying: true,
        LuziLayerC: 1,
        Key: "e",
        Options: [{}, {}],
    },
    {
        Name: "右腰",
        Localized: {
            CN: "右腰",
            EN: "Right Waist",
        },
        LuziAlpha: [191, 405, 40, 60],
        LuziLayerC: 2,
        Key: "f",
        Options: [{}, {}],
    },
    {
        Name: "左腰",
        Localized: {
            CN: "左腰",
            EN: "Left Waist",
        },
        LuziAlpha: [269, 405, 40, 60],
        LuziLayerC: 2,
        Key: "g",
        Options: [{}, {}],
    },
    {
        Name: "右腹股沟",
        Localized: {
            CN: "右腹股沟",
            EN: "Right Groin",
        },
        LuziAlpha: [193, 453, 30, 30],
        LuziLayerC: 1,
        Key: "h",
        Options: [{}, {}],
    },
    {
        Name: "小腹",
        Localized: {
            CN: "小腹",
            EN: "Lower Abdomen",
        },
        LuziAlpha: [225, 465, 50, 50],
        LuziLayerC: 1,
        Key: "i",
        Options: [{}, {}],
    },
    {
        Name: "左腹股沟",
        Localized: {
            CN: "左腹股沟",
            EN: "Left Groin",
        },
        LuziAlpha: [277, 453, 30, 30],
        LuziLayerC: 1,
        Key: "j",
        Options: [{}, {}],
    },
];

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "标志纹饰_Luzi",
    Random: false,
    Top: 240,
    Left: 190,
    Priority: 9,
    Extended: true,
    ParentGroup: {},
    PoseMapping: {},
    DefaultColor: [
        "#4C1919",
        "#906262",
        "#B7B7B7",
        "#7955C1",
        "#5E192F",
        "#2E4B1F",
        "#1D5266",
        "#412B62",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#950000",
        "#00610B",
        "#000000",
        "#7E3A00",
        "#679B96",
        "#3C3C3C",
    ],
    Layer: layers.reduce((acc, layer, idx) => {
        acc.push({
            Name: `${layer.Name}_1`,
            AllowTypes: { p: idx },
            ColorGroup: layer.ColorGroup,
        });
        acc.push({
            Name: `${layer.Name}_2`,
            AllowTypes: { p: idx },
            CopyLayerColor: `${layer.Name}_1`,
        });
        return acc;
    }, []),
};

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData>} */
function BeforeDraw(data, originalFunction, { L, Property, Pose }) {
    const typeRecord = Property.TypeRecord;

    const isLyingPose = Pose === "Hogtied" || Pose === "AllFours";

    const layerC = L.endsWith("_1") ? 1 : 2;

    /** @type {RectTuple[]} */
    const AlphaMasks = posModules
        .filter(
            (layer) =>
                (isLyingPose && !layer.LuziShowWhenLying) ||
                (layer.LuziLayerC === layerC && typeRecord[layer.Key] === 0)
        )
        .map((layer) => layer.LuziAlpha);

    return { AlphaMasks };
}

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    DrawImages: false,
    BaselineProperty: {
        TypeRecord: { p: 0, a: 1, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0 },
    },
    ScriptHooks: { BeforeDraw },
    Modules: [
        {
            Name: "图案",
            Key: "p",
            Options: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            DrawData: {
                elementData: layers.map((_, idx) => ({
                    position: [1135 + 250 * (idx % 3), 450 + 75 * Math.floor(idx / 3)],
                })),
                itemsPerPage: layers.length,
            },
        },
        ...posModules,
    ],
    DrawData: {
        elementData: [
            { position: [1135 + 250, 450] },

            // line 2 - 2 opt
            { position: [1135, 475 + 75] },
            { position: [1135 + 250 * 2, 475 + 75] },

            // line 3 - 3 opt
            { position: [1135, 475 + 75 * 2] },
            { position: [1135 + 250, 475 + 75 * 2] },
            { position: [1135 + 250 * 2, 475 + 75 * 2] },

            // line 4 - 2 opt
            { position: [1135, 475 + 75 * 3] },
            { position: [1135 + 250 * 2, 475 + 75 * 3] },

            // line 5 - 3 opt
            { position: [1135, 475 + 75 * 4] },
            { position: [1135 + 250, 475 + 75 * 4] },
            { position: [1135 + 250 * 2, 475 + 75 * 4] },
        ],
        itemsPerPage: posModules.length + 1,
    },
};

/** @type {Translation.Entry} */
const description = {
    CN: "标志纹饰",
    EN: "Icon Markings",
};

/** @type {Translation.Dialog} */
const assetDialogs = {
    CN: {
        SelectBase: "配置标志纹饰",

        Module图案: "选择图案",
        Select图案: "选择标志纹饰的图案",
        ...layers.reduce((acc, { Localized }, idx) => {
            acc[`Optionp${idx}`] = `${Localized["CN"]}`;
            return acc;
        }, {}),

        ...posModules.reduce((acc, { Name, Localized, Key }) => {
            acc[`Module${Name}`] = `${Localized["CN"]}`;
            acc[`Select${Name}`] = `设置${Localized["CN"]}区域是否显示图案`;
            acc[`Option${Key}0`] = "无";
            acc[`Option${Key}1`] = "显示";
            return acc;
        }, {}),
    },

    EN: {
        SelectBase: "Configure Icon Markings",

        Module图案: "Select Icon",
        Select图案: "Select the icon for the markings",
        ...layers.reduce((acc, { Localized }, idx) => {
            acc[`Optionp${idx}`] = `${Localized["EN"]}`;
            return acc;
        }, {}),

        ...posModules.reduce((acc, { Name, Localized, Key }) => {
            acc[`Module${Name}`] = `${Localized["EN"]}`;
            acc[`Select${Name}`] = `Set ${Localized["EN"]} Area Icon Visible`;
            acc[`Option${Key}0`] = "None";
            acc[`Option${Key}1`] = "Visible";
            return acc;
        }, {}),
    },
};

/** @type {Translation.CustomRecord<string,string>} */
const layerNames = {
    CN: layers.reduce(
        (acc, { Name, Localized }) => {
            acc[`${Name}_1`] = `${Localized["CN"]}`;
            return acc;
        },
        {
            动物: "动物图案",
            扑克: "扑克图案",
            麻将: "麻将图案",
        }
    ),
    EN: layers.reduce(
        (acc, { Name, Localized }) => {
            acc[`${Name}_1`] = `${Localized["EN"]}`;
            return acc;
        },
        {
            动物: "Animal Patterns",
            扑克: "Poker Patterns",
            麻将: "Mahjong Patterns",
        }
    ),
};

export default function () {
    AssetManager.addAssetWithConfig("BodyMarkings", asset, {
        description,
        layerNames,
        extended,
        assetDialogs,
    });
}
