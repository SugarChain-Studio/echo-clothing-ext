import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../../assetForward";

/** @type {ExpressionName[]} */
const eyeExpressions = [
    "Closed",
    "Dazed",
    "Shy",
    "Sad",
    "Horny",
    "Lewd",
    "VeryLewd",
    "Heart",
    "HeartPink",
    "LewdHeart",
    "LewdHeartPink",
    "Dizzy",
    "Daydream",
    "ShylyHappy",
    "Angry",
    "Surprised",
    "Scared",
];

/** @type { {groupDef: CustomGroupDefinition, description: Translation.Entry }[]} */
const groups = [
    {
        groupDef: {
            Group: "左眼_Luzi",
            Priority: 9,
            Left: 200,
            Top: 140,
            Blink: true,
            Random: false,
            Default: false,
            Hide: ["Eyes2"],
            AllowExpression: eyeExpressions,
            PreviewZone: [190, 100, 120, 120],
            Asset: [],
        },
        description: {
            CN: "🍔左眼(覆盖)",
            EN: "🍔Left Eye (Over)",
        },
    },
    {
        groupDef: {
            Group: "右眼_Luzi",
            Priority: 9,
            Left: 250,
            Top: 140,
            Blink: true,
            Random: false,
            Default: false,
            Hide: ["Eyes"],
            AllowExpression: eyeExpressions,
            PreviewZone: [190, 100, 120, 120],
            Asset: [],
        },
        description: {
            CN: "🍔右眼(覆盖)",
            EN: "🍔Right Eye (Over)",
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
            Hide: ["HairFront"],
            Color: ["Default"],
        },
        description: {
            CN: "🍔前发(覆盖)",
            EN: "🍔Front Hair (Over)",
            RU: "🍔новые волосы на лице",
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
            Hide: ["HairBack"],
            Color: ["Default"],
        },
        description: {
            CN: "🍔后发(覆盖)",
            EN: "🍔Back Hair (Over)",
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
];

/** @type {Set<CustomGroupName>} */
const prevGroups = new Set(groups.filter((g) => !!g.groupDef.PreviewZone).map((g) => g.groupDef.Group));

export default function () {
    groups.forEach((definition) => {
        AssetManager.addGroup(definition.groupDef, definition.description);
    });

    // 眼睛和头发组使用预览图
    HookManager.hookFunction("AppearancePreviewUseCharacter", 0, (args, next) => {
        if (args[0] && prevGroups.has(args[0].Name)) return true;
        return next(args);
    });

    const backOverrides = {
        新前发_Luzi: "HairFront",
        新后发_Luzi: "HairBack",
        右眼_Luzi: "Eyes",
        左眼_Luzi: "Eyes2",
    };

    HookManager.hookFunction("CharacterAppearanceVisible", 0, (args, next) => {
        const [C, _, GroupName] = args;

        if (GroupName in backOverrides) {
            const oldda = C.DrawAppearance;
            C.DrawAppearance = oldda.filter((i) => i.Asset.Group.Name !== GroupName);
            args[2] = backOverrides[GroupName];
            const result = next(args);
            C.DrawAppearance = oldda;
            return result;
        }
        return next(args);
    });
}
