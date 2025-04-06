import { DialogTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";

/**
 * @typedef {Object} TattooLayerDefinitionExtension
 * @property {string} DefaultColor - 默认颜色
 * @property {Translation.Entry} Localized - 本地化名称
 * @property {string} ConfigKey - 配置键
 */

/**
 * 表示带有默认颜色和配置键的图层定义
 * @typedef {AssetLayerDefinition & TattooLayerDefinitionExtension} TattooLayerDefinition
 */

/** @type { TattooLayerDefinition [] } */
const LayerSettings = [
    {
        Name: "部落胸上",
        Localized: {
            CN: "部落胸上",
            EN: "Tribal Chest",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "Ta",
    },
    {
        Name: "胸上1",
        Localized: {
            CN: "胸上1",
            EN: "Chest 1",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "UBa",
    },
    {
        Name: "胸上2",
        Localized: {
            CN: "胸上2",
            EN: "Chest 2",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "UBb",
    },
    {
        Name: "梵花胸骨1",
        Localized: {
            CN: "梵花胸骨1",
            EN: "Sanskrit Chestbone 1",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        ParentGroup: "BodyUpper",
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "SFSa",
    },
    {
        Name: "梵花胸骨2",
        Localized: {
            CN: "梵花胸骨2",
            EN: "Sanskrit Chestbone 2",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        ParentGroup: "BodyUpper",
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "SFSb",
    },
    {
        Name: "梵花胸骨3",
        Localized: {
            CN: "梵花胸骨3",
            EN: "Sanskrit Chestbone 3",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        ParentGroup: "BodyUpper",
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "SFSc",
    },
    {
        Name: "石蒜1左",
        Localized: {
            CN: "石蒜1左",
            EN: "Lycoris 1 Left",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "Default",
        ConfigKey: "LaL",
    },
    {
        Name: "石蒜1右",
        Localized: {
            CN: "石蒜1右",
            EN: "Lycoris 1 Right",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "Default",
        ConfigKey: "LaR",
    },
    {
        Name: "部落右胸",
        Localized: {
            CN: "部落右胸",
            EN: "Tribal Right Chest",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "Td",
        ParentGroup: "BodyUpper",
    },
    {
        Name: "部落左胸",
        Localized: {
            CN: "部落左胸",
            EN: "Tribal Left Chest",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "Tf",
        ParentGroup: "BodyUpper",
    },
    {
        Name: "部落右臂",
        Localized: {
            CN: "部落右臂",
            EN: "Tribal Right Arm",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "Tc",
        ParentGroup: "BodyUpper",
        PoseMapping: {
            OverTheHead: PoseType.HIDE,
            Yoked: PoseType.HIDE,
            BackElbowTouch: PoseType.HIDE,
        },
    },
    {
        Name: "左肩翅膀",
        Localized: {
            CN: "左肩翅膀",
            EN: "Left Shoulder Wing",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "W",
        ParentGroup: "BodyUpper",
        PoseMapping: {
            OverTheHead: PoseType.HIDE,
            Yoked: PoseType.HIDE,
            AllFours: PoseType.HIDE,
            Hogtied: PoseType.HIDE,
        },
    },
    {
        Name: "部落左锁骨",
        Localized: {
            CN: "部落左锁骨",
            EN: "Tribal Left Collarbone",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "Te",
        PoseMapping: {
            AllFours: PoseType.HIDE,
            Hogtied: PoseType.HIDE,
        },
    },
    {
        Name: "梅花1",
        Localized: {
            CN: "梅花1",
            EN: "Plum Blossom 1",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "Default",
        ConfigKey: "Ca",
        ParentGroup: "BodyUpper",
        PoseMapping: {
            AllFours: PoseType.HIDE,
            Hogtied: PoseType.HIDE,
        },
    },
    {
        Name: "梅花2",
        Localized: {
            CN: "梅花2",
            EN: "Plum Blossom 2",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "Default",
        ConfigKey: "Cb",
        ParentGroup: "BodyUpper",
        PoseMapping: {
            AllFours: PoseType.HIDE,
            Hogtied: PoseType.HIDE,
        },
    },
    {
        Name: "心经",
        Localized: {
            CN: "心经",
            EN: "Heart Sutra",
        },
        Priority: 9,
        Left: 130,
        Top: 200,
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "SSa",
        ParentGroup: "BodyUpper",
        PoseMapping: {
            AllFours: PoseType.HIDE,
            Hogtied: PoseType.HIDE,
        },
    },
    {
        Name: "右腿花",
        Localized: {
            CN: "右腿花",
            EN: "Right Leg Flower",
        },
        Left: 100,
        Top: 470,
        Priority: 9,
        BlendingMode: "source-atop",
        DefaultColor: "#000000",
        ConfigKey: "Fa",
        ParentGroup: "BodyLower",
        PoseMapping: {
            AllFours: PoseType.HIDE,
            Hogtied: PoseType.HIDE,
            Kneel: "LegsClosed",
            LegsClosed: "LegsClosed",
            KneelingSpread: "KneelingSpread",
        },
    },
];

/** @type { TattooLayerDefinition [] } */
const attrLayer = [
    {
        Name: "右腿花_花",
        Localized: {
            CN: "右腿花(花)",
            EN: "Right Leg Flower(Flower)",
        },
        Left: 100,
        Top: 470,
        Priority: 13,
        BlendingMode: "source-atop",
        DefaultColor: "#FE3636",
        ConfigKey: "Fa",
        ParentGroup: "BodyLower",
        PoseMapping: {
            AllFours: PoseType.HIDE,
            Hogtied: PoseType.HIDE,
            Kneel: "LegsClosed",
            LegsClosed: "LegsClosed",
            KneelingSpread: "KneelingSpread",
        },
    },
];

/** @param {TattooLayerDefinition} layer */
function layerMapping(layer) {
    return {
        Name: layer.Name,
        Priority: layer.Priority,
        BlendingMode: /** @type {GlobalCompositeOperation}*/ (layer.BlendingMode),
        Left: layer.Left || 0,
        Top: layer.Top || 0,
        AllowTypes: { [layer.ConfigKey]: 1 },
        ParentGroup: layer.ParentGroup,
        PoseMapping: layer.PoseMapping,
    };
}

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "大纹身_Luzi",
    Value: -1,
    Time: 5,
    RemoveTime: 5,
    IsRestraint: false,
    DefaultColor: LayerSettings.map((layer) => layer.DefaultColor),
    Extended: true,
    BodyCosplay: true,
    Layer: LayerSettings.map(layerMapping).concat(attrLayer.map(layerMapping)),
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChatSetting: ModularItemChatSetting.PER_MODULE,
    DrawImages: false,
    Modules: LayerSettings.map((layer) => ({
        Name: layer.Name,
        Key: layer.ConfigKey,
        Options: [{}, {}],
    })),
    DrawData: {
        elementData: LayerSettings.map((_, idx) => ({
            position: [1135 + 250 * (idx % 3), 450 + 75 * Math.floor(idx / 3)],
        })),
        itemsPerPage: LayerSettings.length,
    },
};

/** @type {Translation.Dialog} */
const dialogs = DialogTools.replicateGroupedItemDialog(["BodyMarkings", "BodyMarkings2_Luzi"], ["大纹身_Luzi"], {
    CN: {
        SelectBase: "选择要显示的纹身",
        ...LayerSettings.reduce((pv, layer) => {
            pv[`Module${layer.Name}`] = layer.Localized["CN"];
            pv[`Select${layer.Name}`] = `设置 "${layer.Localized["CN"]}" 是否显示`;
            pv[`Option${layer.ConfigKey}0`] = "隐藏";
            pv[`Option${layer.ConfigKey}1`] = "显示";
            return pv;
        }, {}),
    },
    EN: {
        SelectBase: "Select the tattoo to show",
        ...LayerSettings.reduce((pv, layer) => {
            pv[`Module${layer.Name}`] = layer.Localized["EN"];
            pv[`Select${layer.Name}`] = `Set "${layer.Localized["EN"]}" is shown`;
            pv[`Option${layer.ConfigKey}0`] = "Hide";
            pv[`Option${layer.ConfigKey}1`] = "Show";
            return pv;
        }, {}),
    },
});

/** @type {Translation.Dialog} */
const layerNames = [...LayerSettings, ...attrLayer].reduce((pv, layer) => {
    for (const [lang, entry] of Object.entries(layer.Localized)) {
        if (!pv[lang]) pv[lang] = {};
        pv[lang][layer.Name] = entry;
    }
    return pv;
}, {});

export default function () {
    AssetManager.addAsset("BodyMarkings", asset, extended, {
        CN: "大纹身",
        EN: "Large Tattoo",
    });
    AssetManager.addCustomDialog(dialogs);
    AssetManager.addLayerNamesByEntry("BodyMarkings", "大纹身_Luzi", layerNames);
}
