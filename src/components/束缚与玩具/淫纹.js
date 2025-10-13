import { monadic } from "@mod-utils/monadic";
import { AssetManager } from "../../assetForward";
import { DialogTools, Tools } from "@mod-utils/Tools";
import { createItemDialogModular } from "../../lib";
import { LSCG } from "../../lib/lscg";

/**
 * @typedef { { Masturbate:boolean, InstantOrgasm: boolean } } LewdCrestProps
 */

/**
 * @typedef { globalThis.ItemProperties & LewdCrestProps } ExtendItemProperties
 */

/**
 * @typedef { Object } LewdCrestData
 * @property { number } ArousalCheckTimer
 * @property { number } NextMasturbateTime
 * @property { number } LSCGTimer
 * @property { number } GlowOffset
 * @property { number } V1GlowTimer
 * @property { number } V1GlowCycle
 * @property { HTMLCanvasElement } GlowCanvas
 */

const ASSET_NAME = "淫纹_Luzi";

/** @type { (item: Item) => ExtendItemProperties } */
const extProp = (item) => /** @type {ExtendItemProperties}*/ (item.Property);

// #region 交互界面
const dialog = createItemDialogModular([
    {
        location: { x: 1265, y: 600, w: 225, h: 55 },
        show: ({ data }) => data.currentModule === "Base",
        key: "淫纹魔法电流按钮",
        onclick: ({ item, chara }) => PropertyShockPublishAction(chara, item, true),
    },
    {
        location: { x: 1510, y: 600, w: 225, h: 55 },
        show: ({ data }) => data.currentModule === "Base",
        key: "淫纹强制高潮按钮",
        actionKey: "淫纹强制高潮",
        onclick: ({ item }) => {
            const property = extProp(item);
            property.InstantOrgasm = true;
        },
    },
]).addCheckBoxes([
    {
        location: { x: 1185, y: 750 },
        show: ({ data }) => data.currentModule === "Base",
        text: ({ text }) => text("淫纹强制自慰按钮"),
        enable: ({ item, chara }) => !InventoryGetItemProperty(item, "LockedBy") || DialogCanUnlock(chara, item),
        checked: ({ item }) => extProp(item).Masturbate,
        onclick: ({ item }) => {
            const property = extProp(item);
            property.Masturbate = !property.Masturbate;
        },
        actionKey: ({ item }) => `${extProp(item).Masturbate ? "开始" : "停止"}淫纹强制自慰`,
    },
]);
// #endregion

// #region 文本
const custom_dialogs = {
    CN: {
        淫纹强制自慰按钮: "淫纹强制自慰",

        淫纹魔法电流按钮: "魔法电流",
        淫纹强制高潮按钮: "强制高潮",

        开始淫纹强制自慰: "SourceCharacter通过AssetName上的魔法令TargetCharacter开始不停地自慰.",
        停止淫纹强制自慰: "SourceCharacter通过AssetName上的魔法解除了TargetCharacter的强制自慰.",

        淫纹强制高潮: "SourceCharacter通过AssetName上的魔法令TargetCharacter强制高潮.",

        自慰Block0: "SourceCharacter急切的想要抚慰PronounSelf,颤抖着夹紧双腿,尽可能刺激自己的FocusAssetGroup.",
        自慰Block1: "SourceCharacter急切的想要抚慰PronounSelf,扭动肩膀,尽可能让FocusAssetGroup受到进一步刺激.",
        自慰Block2: "SourceCharacter急切的想要抚慰PronounSelf,夹紧双腿摩擦FocusAssetGroup,但仍难以得到刺激.",
        自慰Block3:
            "SourceCharacter急切的想要抚慰PronounSelf,徒劳地向着FocusAssetGroup摸索尝试,近在咫尺的快乐此时却是如此遥不可及.",
    },
    EN: {
        淫纹强制自慰按钮: "Forced Masturbation",

        淫纹魔法电流按钮: "Magical Shock",
        淫纹强制高潮按钮: "Force Orgasm",

        开始淫纹强制自慰:
            "SourceCharacter uses magic on AssetName to make TargetCharacter start continuous masturbation.",
        停止淫纹强制自慰: "SourceCharacter uses magic on AssetName to stop the forced masturbation of TargetCharacter.",

        淫纹强制高潮: "SourceCharacter uses magic on AssetName to force TargetCharacter to orgasm.",

        自慰Block0:
            "SourceCharacter eagerly wants to pleasure PronounSelf, trembling and squeezing PronounPossessive thighs together to stimulate PronounPossessive FocusAssetGroup as much as possible.",
        自慰Block1:
            "SourceCharacter eagerly wants to pleasure PronounSelf, wriggling PronounPossessive shoulders to further stimulate PronounPossessive FocusAssetGroup.",
        自慰Block2:
            "SourceCharacter eagerly wants to pleasure PronounSelf, squeezing PronounPossessive thighs together to rub PronounPossessive FocusAssetGroup but still finding it difficult to stimulate themselves.",
        自慰Block3:
            "SourceCharacter eagerly wants to pleasure PronounSelf, PronounPossessive futilely reaching towards PronounPossessive FocusAssetGroup, the close proximity of pleasure now seeming so unreachable.",
    },
    UA: {
        淫纹强制自慰按钮: "Розпусний гребінь примусової мастурбації",
        淫纹魔法电流按钮: "Магічний шок Lewd Crest",
        淫纹强制高潮按钮: "Візерунок хтивості. Чарівний оргазм",
        开始淫纹强制自慰:
            "SourceCharacter використовує магію на AssetName, щоб змусити TargetCharacter почати безперервну мастурбацію.",
        停止淫纹强制自慰:
            "SourceCharacter використовує магію на AssetName, щоб зупинити примусову мастурбацію TargetCharacter.",
        淫纹强制高潮: "SourceCharacter використовує магію на AssetName, щоб змусити TargetCharacter досягти оргазму.",
        自慰Block0:
            "SourceCharacter з нетерпінням хоче чіпати себе, стискає свої лахи як їхні ноги трусяться від жаги стимулювати себе якомога більше.",
        自慰Block1:
            "SourceCharacter з нетерпінням хоче чіпати себе, трусячи своїми плечима з жагою стимулювати свої груди й соски.",
        自慰Block2:
            "SourceCharacter з нетерпінням хоче чіпати себе, стискає свої лахи як їхні ноги трусяться від жаги стимулювати себе якомога більше але натомість не получається стимулювати себе так просто.",
        自慰Block3:
            "SourceCharacter з нетерпінням хоче чіпати себе, пробуючи чинити опір проти щупальевого косьюму як їхні руки зв'язані позаду їх.",
    },
    RU: {
        淫纹发光按钮: "Светящийся Lewd Crest",
        淫纹强制自慰按钮: "Принудительная мастурбация Lewd Crest",
        淫纹魔法电流按钮: "Магический шок Lewd Crest",
        淫纹强制高潮按钮: "Узор похоти Магический оргазм",

        开始淫纹强制自慰:
            "SourceCharacter использует магию на AssetName, чтобы TargetCharacter начал непрерывную мастурбацию.",
        停止淫纹强制自慰:
            "SourceCharacter использует магию на AssetName, чтобы остановить принудительную мастурбацию TargetCharacter.",
        淫纹强制高潮: "SourceCharacter использует магию на AssetName, чтобы заставить TargetCharacter кончить.",
    },
};

const assetStrings = {
    CN: {
        SelectBase: "淫纹设置",
        Module样式: "样式",
        Module性刺激: "性刺激",
        Module发光: "发光",

        Select样式: "设置淫纹样式",
        Optiont0: "默认样式",
        Optiont1: "样式1",
        Optiont2: "样式2",
        Optiont3: "样式3",
        Sett0: "SourceCharacter将DestinationCharacter淫纹设置为默认样式.",
        Sett1: "SourceCharacter将DestinationCharacter淫纹设置为样式1.",
        Sett2: "SourceCharacter将DestinationCharacter淫纹设置为样式2.",
        Sett3: "SourceCharacter将DestinationCharacter淫纹设置为样式3.",

        Select性刺激: "设置淫纹性刺激",
        Optiona0: "无",
        Optiona1: "持续发情",
        Optiona2: "寸止",
        Optiona3: "拒绝",
        Seta0: "SourceCharacter关闭了AssetName上的催情魔法.",
        Seta1: "SourceCharacter通过AssetName上的魔法令TargetCharacter的小穴保持湿润,持续处于发情状态.",
        Seta2: "SourceCharacter通过AssetName上的魔法令TargetCharacter仅能够处于高潮边缘.",
        Seta3: "SourceCharacter通过AssetName上的魔法令TargetCharacter仅能够拒绝高潮.",

        Select发光: "设置淫纹发光",
        Optiong0: "关闭",
        Optiong1: "流动光",
        Optiong2: "泛光",
        Setg0: "SourceCharacter将DestinationCharacter淫纹发光关闭.",
        Setg1: "SourceCharacter将DestinationCharacter淫纹发光设置为流动光.",
        Setg2: "SourceCharacter将DestinationCharacter淫纹发光设置为泛光.",

        ...custom_dialogs.CN,
    },
    EN: {
        SelectBase: "Lewd Crest Settings",
        Module样式: "Style",
        Module性刺激: "Arousal",
        Module发光: "Glow",

        Select样式: "Select Lewd Crest Style",
        Optiont0: "Default Style",
        Optiont1: "Style 1",
        Optiont2: "Style 2",
        Optiont3: "Style 3",
        Sett0: "SourceCharacter sets DestinationCharacter AssetName to the default style.",
        Sett1: "SourceCharacter sets DestinationCharacter AssetName to Style 1.",
        Sett2: "SourceCharacter sets DestinationCharacter AssetName to Style 2.",
        Sett3: "SourceCharacter sets DestinationCharacter AssetName to Style 3.",

        Select性刺激: "Lewd Crest Sexual Stimulation Settings",
        Optiona0: "Idle",
        Optiona1: "Continuous Heat",
        Optiona2: "Edge",
        Optiona3: "Deny",
        Seta0: "SourceCharacter uses magic on AssetName to disable the arousal effect.",
        Seta1: "SourceCharacter uses magic on AssetName to keep DestinationCharacter intimate area moist and in a continuous state of heat.",
        Seta2: "SourceCharacter uses magic on AssetName to keep TargetCharacter at the edge of orgasm.",
        Seta3: "SourceCharacter uses magic on AssetName to make TargetCharacter able to only reject orgasm.",

        Select发光: "Set Lewd Crest Glow",
        Optiong0: "Off",
        Optiong1: "Flowing Light",
        Optiong2: "Bloom Light",
        Setg0: "SourceCharacter turns off DestinationCharacter Lewd Crest glow.",
        Setg1: "SourceCharacter sets DestinationCharacter Lewd Crest glow to Flowing Light.",
        Setg2: "SourceCharacter sets DestinationCharacter Lewd Crest glow to Bloom Light.",

        ...custom_dialogs.EN,
    },
    UA: {
        SelectBase: "Налаштування Lewd Crest",
        Module样式: "Розпусний стиль Crest",
        Module性刺激: "Сексуальна стимуляція Lewd Crest",

        Select样式: "Виберіть стиль Lewd Crest",
        Optiont0: "Типовий стиль",
        Optiont1: "Стиль 1",
        Optiont2: "Стиль 2",
        Optiont3: "Стиль 3",
        Sett0: "SourceCharacter встановлює для шаблону Lust DestinationCharacter стиль за замовчуванням.",
        Sett1: "SourceCharacter встановлює стиль 1 для моделі Lust для персонажа призначення.",
        Sett2: "SourceCharacter встановлює шаблон хтивості DestinationCharacter на стиль 2.",
        Sett3: "SourceCharacter встановлює стиль 3 для шаблону хтивості DestinationCharacter.",
        Select性刺激: "Налаштування сексуальної стимуляції Lewd Crest",
        Optiona0: "нормальний",
        Optiona1: "Безперервне тепло",
        Optiona2: "Край",
        Optiona3: "Заперечувати",
        Seta0: "SourceCharacter використовує магію на AssetName, щоб відновити шаблон хіть TargetCharacter до його природного стану.",
        Seta1: "SourceCharacter використовує магію на AssetName, щоб підтримувати інтимну зону TargetCharacter вологою та постійно нагріватись.",
        Seta2: "SourceCharacter використовує магію на AssetName, щоб утримувати TargetCharacter на межі оргазму.",
        Seta3: "SourceCharacter використовує магію на AssetName, щоб зробити TargetCharacter здатним лише відкидати оргазм.",

        ...custom_dialogs.UA,
    },
    RU: {
        SelectBase: "Настройки Lewd Crest",
        Module样式: "Стиль Lewd Crest",
        Module性刺激: "Сексуальная стимуляция Lewd Crest",

        Select样式: "Выбрать стиль Lewd Crest",
        Optiont0: "Стиль по умолчанию",
        Optiont1: "Стиль 1",
        Optiont2: "Стиль 2",
        Optiont3: "Стиль 3",
        Sett0: "SourceCharacter устанавливает узор похоти DestinationCharacter на стиль по умолчанию.",
        Sett1: "SourceCharacter устанавливает Lust Pattern DestinationCharacter на Style 1.",
        Sett2: "SourceCharacter устанавливает Lust Pattern DestinationCharacter на Style 2.",
        Sett3: "SourceCharacter устанавливает Lust Pattern DestinationCharacter на Style 3.",

        Select性刺激: "Настройки сексуальной стимуляции Lewd Crest",
        Optiona0: "Обычный",
        Optiona1: "Постоянный нагрев",
        Optiona2: "Грань",
        Optiona3: "Запретить",
        Seta0: "SourceCharacter использует магию на AssetName, чтобы восстановить Lust Pattern TargetCharacter до его естественного состояния.",
        Seta1: "SourceCharacter использует магию на AssetName, чтобы поддерживать интимную зону TargetCharacter влажной и в постоянном состоянии тепла.",
        Seta2: "SourceCharacter использует магию на AssetName, чтобы удерживать TargetCharacter на грани оргазма.",
        Seta3: "SourceCharacter использует магию на AssetName, чтобы TargetCharacter мог только отвергать оргазм.",

        ...custom_dialogs.RU,
    },
};
// #endregion

// #region 拘束
/** @type {AddAssetWithConfigParams} */
const asset = [
    ["ItemPelvis", "ItemTorso"],
    {
        Name: ASSET_NAME,
        Random: false,
        Left: 150,
        Top: 380,
        Priority: 10,
        AllowLock: true,
        AllowTighten: false,
        DrawLocks: false,
        Difficulty: 20,
        RemoveTime: 15,
        Time: 10,
        ParentGroup: {},
        DefaultColor: ["#EA3E74", "Default", "Default", "Default", "#D75CFF", "#72B5FF", "#FFBFF1"],
        DynamicGroupName: "ItemPelvis",
        PoseMapping: { Hogtied: "Hide", AllFours: "Hide" },
        Layer: [
            { Name: "淫纹", AllowTypes: { t: 0 } },
            { Name: "预设淫纹1", AllowTypes: { t: 1 } },
            { Name: "预设淫纹2", AllowTypes: { t: 2 } },
            { Name: "预设淫纹3", AllowTypes: { t: 3 } },
            { Name: "渐变层", HasImage: false, AllowColorize: false, AllowTypes: { g: 1 } },
            { Name: "发光1", HasImage: false },
            { Name: "发光2", HasImage: false },
            { Name: "泛光", HasImage: false, AllowTypes: { g: 2 } },
        ],
    },
    {
        translation: { CN: "淫纹", EN: "Lewd Crest", RU: "Порнографический знак", UA: "Хтивий візерунок" },
        layerNames: {
            CN: { 发光1: "发光颜色1", 发光2: "发光颜色2", 泛光: "泛光式发光" },
            EN: {
                淫纹: "Lewd Crest",
                预设淫纹1: "Preset Lewd Crest 1",
                预设淫纹2: "Preset Lewd Crest 2",
                预设淫纹3: "Preset Lewd Crest 3",
                发光1: "Glow Color1",
                发光2: "Glow Color2",
                泛光: "Bloom Style Glow",
            },
        },
        extended: {
            Archetype: ExtendedArchetype.MODULAR,
            ChangeWhenLocked: false,
            DrawImages: false,
            ChatTags: Tools.CommonChatTags(),
            Modules: [
                { Name: "样式", Key: "t", DrawImages: true, Options: [{}, {}, {}, {}] },
                {
                    Name: "性刺激",
                    Key: "a",
                    Options: [
                        {},
                        {},
                        { Property: { Effect: [E.DenialMode] } },
                        { Property: { Effect: [E.DenialMode, E.RuinOrgasms] } },
                    ],
                },
                {
                    Name: "发光",
                    Key: "g",
                    Options: [{}, { Property: { OverridePriority: 44 } }, { Property: { OverridePriority: 44 } }],
                },
            ],
            ScriptHooks: dialog.createHooks(["Click", "Draw"], {
                AfterDraw: afterDraw,
                ScriptDraw: scriptDraw,
            }),
            BaselineProperty: /** @type {ExtendItemProperties}*/ ({
                Masturbate: false,
            }),
        },
        assetStrings,
    },
];
// #endregion

//#region 衣服
const clothLCSetting = [
    { Name: "样式0", EN: "Style 0", Src: "淫纹", ConfigKey: "t0" },
    { Name: "样式1", EN: "Style 1", Src: "预设淫纹1", ConfigKey: "t1" },
    { Name: "样式2", EN: "Style 2", Src: "预设淫纹2", ConfigKey: "t2" },
    { Name: "样式3", EN: "Style 3", Src: "预设淫纹3", ConfigKey: "t3" },
];

/** @type {AddAssetWithConfigParams} */
const clothAsset = [
    ["Panties", "BodyMarkings", "Decals"],
    {
        Name: ASSET_NAME,
        Random: false,
        Gender: "F",
        Left: 150,
        Top: 380,
        Priority: 9,
        DefaultColor: ["#E975A0", "Default", "Default", "Default"],
        Extended: true,
        PoseMapping: { ...AssetPoseMapping.Panties },
        Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
        ParentGroup: {},
        DynamicGroupName: "ItemPelvis",
        Layer: clothLCSetting.map((layer, index) => ({ Name: layer.Src, AllowTypes: { typed: index } })),
    },
    {
        translation: { CN: "淫纹", EN: "Lewd Crest" },
        layerNames: {
            CN: { 样式0: "样式0", 样式1: "样式1", 样式2: "样式2", 样式3: "样式3" },
            EN: { 样式0: "Style 0", 样式1: "Style 1", 样式2: "Style 2", 样式3: "Style 3" },
        },
        extended: {
            Archetype: ExtendedArchetype.TYPED,
            Options: clothLCSetting.map((layer, index) => ({
                Name: layer.ConfigKey,
                AllowTypes: { typed: index },
            })),
        },
        assetStrings: {
            CN: {
                Select: "选择样式",
                ...Object.fromEntries(clothLCSetting.map((layer) => [layer.ConfigKey, layer.Name])),
            },
            EN: {
                Select: "Select Style",
                ...Object.fromEntries(clothLCSetting.map((layer) => [layer.ConfigKey, layer.EN])),
            },
        },
    },
];
//#endregion

//#region 功能
/**
 * @param {Character} C 玩家自身
 * @param {Item} item 物品
 */
function randomMastur(C, item) {
    if (!C.IsPlayer()) return;
    DrawFlashScreen("#F347B4", 1500, 500);
    const customDialog = DialogTools.dialogKey(item);

    monadic("Activity", AssetGetActivity("Female3DCG", "MasturbateHand"))
        .filter(() => Player.CanInteract())
        .then((activity) => activity.Target.filter((x) => ActivityCanBeDone(Player, "MasturbateHand", x)))
        .filter((groups) => groups.length > 0)
        .then((groups) => groups[Math.floor(Math.random() * groups.length)])
        .then((g) => AssetGroupGet("Female3DCG", g))
        .then((group, { Activity }) => (ActivityRun(Player, Player, group, { Activity, Group: group.Name }, true), {}))
        .valueOr(() => {
            const act = AssetGetActivity("Female3DCG", "MasturbateHand");
            const g = act.Target[Math.floor(Math.random() * act.Target.length)];

            // 产生如同抚摸对应区域的动作，仅自己可见
            const dictionary = new DictionaryBuilder()
                .sourceCharacter(Player)
                .targetCharacter(Player)
                .focusGroup(g)
                .build();
            dictionary.push({ ActivityName: "Caress" });

            ChatRoomMessage({
                Sender: Player.MemberNumber,
                Content: customDialog(`自慰Block${Math.floor(Math.random() * 4)}`),
                Type: "Action",
                Dictionary: dictionary,
            });
        });
}

/**
 * @param {Character} player
 * @param {LewdCrestData} data
 * @param {Item} item
 */
function updateRuns(player, data, item) {
    if (!player.IsPlayer()) return;

    const property = extProp(item);

    // 立即高潮
    if (property.InstantOrgasm) {
        property.InstantOrgasm = false;
        if (!!player.ArousalSettings) player.ArousalSettings.Progress = 100;
        ActivityOrgasmPrepare(player);
        ChatRoomCharacterItemUpdate(player, item.Asset.Group.Name);
    }

    const now = CommonTime();
    if (!data.ArousalCheckTimer) data.ArousalCheckTimer = now;

    const delta = now - data.ArousalCheckTimer;
    data.ArousalCheckTimer += delta;

    // LSCG 联动
    if (property.TypeRecord.a === 1) {
        data.LSCGTimer ??= now;
        if (now - data.LSCGTimer > LSCG.breathInterval) {
            data.LSCGTimer = now;
            const randomLevelIncrease = Math.random() * 0.3 + 0.2; // 0.2 ~ 0.5
            if (LSCG.random(45) === 0) {
                LSCG.injectModule.AddHorny(randomLevelIncrease + 1, LSCG.random(3) === 0);
            } else LSCG.injectModule.AddHorny(randomLevelIncrease / 4, false);
        }
    } else {
        data.LSCGTimer = now;
    }

    // 随机自慰
    const nextTime = () =>
        now + (Math.random() * 10 + (15 * (100 - (Player.ArousalSettings?.Progress ?? 0))) / 100 + 10) * 1000;
    if (!data.NextMasturbateTime) data.NextMasturbateTime = nextTime();
    if (property.Masturbate && ServerPlayerIsInChatRoom()) {
        if (now > data.NextMasturbateTime) {
            data.NextMasturbateTime = nextTime();
            randomMastur(player, item);
        }
    } else {
        data.NextMasturbateTime = nextTime();
    }
}
//#endregion

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, LewdCrestData>} */
function scriptDraw(data, originalFunction, { C, Item, PersistentData }) {
    const Data = PersistentData();
    if (C.IsPlayer()) updateRuns(C, Data, Item);
    if (Item.Property?.TypeRecord && [1, 2].includes(Item.Property.TypeRecord.g)) Tools.drawUpdate(C, Data);
}

//#region 动画绘制
const type2Layer = Object.fromEntries(
    /** @type {AssetLayerDefinition[]}*/ (asset[1].Layer)
        .filter((l) => typeof l.AllowTypes?.["t"] === "number")
        .map((l) => /** @type {[string, string]}*/ ([l.AllowTypes["t"], l.Name]))
);

/** @type {(c: string) => [number, number, number]} */
const parse = (c) => {
    if (c.length === 4) return [parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16)];
    if (c.length === 7) return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
    throw new Error(`Invalid color format: ${c}`);
};

/** @type {(a: number, b: number, f: number) => number} */
const mix = (a, b, f) => Math.round(a * (1 - f) + b * f);

/** @type {(c1:string, c2:string, factor:number) => string} */
const colorMix = (c1, c2, factor) => {
    const f = Math.max(0, Math.min(1, factor));
    const [r1, g1, b1] = parse(c1);
    const [r2, g2, b2] = parse(c2);
    const r = mix(r1, r2, f).toString(16).padStart(2, "0");
    const g = mix(g1, g2, f).toString(16).padStart(2, "0");
    const b = mix(b1, b2, f).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
};

const center = {
    0: 107,
    1: 98,
    2: 109,
    3: 108,
};

/** @type {(c:undefined | string, def: string)=> string} */
const colorDefault = (c, def) => (!c || c === "Default" ? def : c);

/** @type {ExtendedItemScriptHookCallbacks.AfterDraw<ModularItemData, LewdCrestData>} */
function afterDraw(data, originalFunction, drawData) {
    const { A, CA, X, Property, Y, C, L, Color, PersistentData, drawCanvas, drawCanvasBlink } = drawData;
    const Data = PersistentData();

    if (L === "渐变层" && Property.TypeRecord?.g === 1) {
        const property = extProp(CA);
        const imgType = type2Layer[property?.TypeRecord?.t ?? 0];
        const mc = center[property?.TypeRecord?.t ?? 0] || center[0];

        Data.GlowOffset ??= Math.floor(Math.random() * 1000);
        Data.GlowCanvas ??= AnimationGenerateTempCanvas(C, A, 200, 200);

        const [c1, c2] = ((colors) => {
            if (!Array.isArray(colors) && colors.length < 6) return ["#D75CFF", "#72B5FF"];
            return [4, 5].map((idx) => colorDefault(colors[idx], A.DefaultColor[idx]));
        })(CA.Color ?? CA.Asset.DefaultColor);

        const ctx = Data.GlowCanvas.getContext("2d");
        ctx.clearRect(0, 0, 200, 200);
        const gradient = ctx.createRadialGradient(100, mc, 0, 100, mc, 60);
        const time = Date.now() / 1000 + Data.GlowOffset;

        const halfInterval = 2.5;
        const offset = 1 - (time % (halfInterval * 2)) / (halfInterval * 2);

        const edgeColor = colorMix(c1, c2, offset < 0.5 ? offset * 2 : 2 - offset * 2);
        gradient.addColorStop(0, edgeColor);
        gradient.addColorStop(1, edgeColor);

        gradient.addColorStop(1 - offset, c1);
        gradient.addColorStop(offset < 0.5 ? 0.5 - offset : 1.5 - offset, c2);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 200, 200);

        const mask = Tools.getAssetURL(drawData, imgType);
        DrawImageEx(mask, ctx, 0, 0, { BlendingMode: "destination-in" });

        drawCanvas(Data.GlowCanvas, X, Y);
        drawCanvasBlink(Data.GlowCanvas, X, Y);
    }
    if (L === "泛光" && Property.TypeRecord?.g === 2) {
        if (Property.TypeRecord?.g !== 2) return;

        Data.GlowCanvas ??= AnimationGenerateTempCanvas(C, A, 200, 200);
        const ctx = Data.GlowCanvas.getContext("2d");
        ctx.clearRect(0, 0, 200, 200);

        const now = Date.now();

        Data.V1GlowTimer ??= now;
        const delta = now - Data.V1GlowTimer;
        Data.V1GlowTimer = now;

        Data.V1GlowCycle ??= Math.random() * Math.PI * 2;

        // 闪烁周期时间, 1 ~ 5 秒
        const TwinkleCycleTime = (C.ArousalSettings ? 100 - (C.ArousalSettings.Progress / 100) * 80 : 100) * 50;
        Data.V1GlowCycle += (delta / TwinkleCycleTime) * Math.PI * 2;

        ctx.globalAlpha = 0.2 + 0.3 * Math.cos(Data.V1GlowCycle);
        const gradient = ctx.createRadialGradient(100, 108, 0, 100, 108, 100);
        const c = colorDefault(Color, A.DefaultColor[6]);
        gradient.addColorStop(0, c);
        gradient.addColorStop(1, `${c}00`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 200, 200);

        drawCanvas(Data.GlowCanvas, X, Y);
        drawCanvasBlink(Data.GlowCanvas, X, Y);
    }
}
//#endregion

export default function () {
    AssetManager.addAssetWithConfig(...asset);
    AssetManager.addAssetWithConfig(...clothAsset);
}
