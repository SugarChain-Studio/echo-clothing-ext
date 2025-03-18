import { AssetManager } from "../assetForward";

/** @type { {groupDef: CustomGroupDefinition, description: Translation.Entry }[]} */
const groups = [
    {
        groupDef: {
            Group: "Liquid2_Luzi",
            ParentGroup: "BodyLower",
            PoseMapping: { ...AssetPoseMapping.BodyLower },
            Priority: 53,
            Left: 0,
            Top: 0,
            BodyCosplay: true,
            Asset: [
                {
                    Name: "少_Luzi",
                    Random: false,
                    Priority: 9,
                    DefaultColor: ["#D9DCFF"],
                },
                {
                    Name: "中_Luzi",
                    Random: false,
                    Priority: 9,
                    DefaultColor: ["#D9DCFF"],
                },
            ],
        },
        description: {
            CN: "🍔液体",
            EN: "🍔Liquid",
            RU: "🍔Жидкость",
        },
    },
    {
        groupDef: {
            Group: "身体痕迹_Luzi",
            Priority: 10,
            BodyCosplay: true,
            Default: false,
            Random: false,
            Asset: [],
            Color: ["Default"],
        },
        description: {
            CN: "🍔鞭痕",
            EN: "🍔Whip Marks",
            RU: "🍔Побои от плети",
        },
    },
    {
        groupDef: {
            Group: "动物身体_Luzi",
            Priority: 10,
            Default: false,
            Random: false,
            Asset: [],
            Color: ["Default"],
        },
        description: {
            CN: "🍔替用身体",
            EN: "🍔Alter Body",
            RU: "🍔Замена тела",
        },
    },
    {
        groupDef: {
            Group: "额外身高_Luzi",
            Priority: 10,
            Default: false,
            Random: false,
            BodyCosplay: true,
            Asset: [],
            Color: ["Default"],
        },
        description: {
            CN: "🍔身高调整",
            EN: "🍔Height Adjustment",
            RU: "🍔Регулировка высоты",
        },
    },
    {
        groupDef: {
            Group: "长袖子_Luzi",
            Priority: 10,
            Clothing: true,
            Default: false,
            Random: false,
            EditOpacity: true,
            MinOpacity: 0,
            MaxOpacity: 1,
            Asset: [],
            Color: ["Default"],
        },
        description: {
            CN: "🍔长袖子",
            EN: "🍔Long Sleeves",
            RU: "🍔Длинные рукава",
        },
    },
    {
        groupDef: {
            Group: "新前发_Luzi",
            Priority: 52,
            Default: false,
            Random: false,
            PreviewZone: [140, 40, 220, 220],
            EditOpacity: true,
            MinOpacity: 0,
            MaxOpacity: 1,
            Asset: [],
            Color: ["Default"],
        },
        description: {
            CN: "🍔新前发",
            EN: "🍔New front hair",
            RU: "🍔новые волосы на спине",
        },
    },
    {
        groupDef: {
            Group: "新后发_Luzi",
            Priority: 5,
            Default: false,
            Random: false,
            PreviewZone: [55, 0, 390, 390],
            EditOpacity: true,
            MinOpacity: 0,
            MaxOpacity: 1,
            Asset: [],
            Color: ["Default"],
        },
        description: {
            CN: "🍔新后发",
            EN: "🍔New back hair",
            RU: "🍔новые волосы на спине",
        },
    },
    {
        groupDef: {
            Group: "额外头发_Luzi",
            Priority: 53,
            Default: false,
            Random: false,
            EditOpacity: true,
            MinOpacity: 0,
            MaxOpacity: 1,
            Asset: [],
            Color: ["Default"],
        },
        description: {
            CN: "🍔额外头发",
            EN: "🍔Extra hair",
            RU: "🍔дополнительные волосы",
        },
    },
];

export default function () {
    groups.forEach((definition) => {
        AssetManager.addGroup(definition.groupDef, definition.description);
    });
}
