import { AssetManager } from "../../assetForward";
import { DialogTools, Tools } from "@mod-utils/Tools";

import { ChatRoomEvents } from "@sugarch/bc-event-handler";

/**
 * @typedef { { Masturbate:boolean, Glow: boolean } } LewdCrestData
 */

/**
 * @typedef { globalThis.ItemProperties & LewdCrestData } ExtendItemProperties
 */

/**
 * @typedef { Object } MyDataType
 * @property { number } ArousalCheckTimer
 * @property { number } NextMasturbateTime
 * @property { number } BlinkCycle
 * @property { number } BlinkTimer
 */

/**
 * @typedef { Object } Rect
 * @property {number} X
 * @property {number} Y
 * @property {number} W
 * @property {number} H
 */

/** @type { CustomAssetDefinition} */
const asset = {
    Name: "淫纹_Luzi",
    Random: false,
    Top: 308,
    Left: 54,
    Priority: 10,
    AllowLock: true,
    AllowTighten: false,
    DrawLocks: false,
    Extended: true,
    AlwaysExtend: true,
    Difficulty: 20,
    RemoveTime: 15,
    Time: 10,
    DynamicScriptDraw: true,
    DynamicBeforeDraw: true,
    ParentGroup: {},
    DefaultColor: ["#EA3E74"],
    PoseMapping: {
        Hogtied: "Hide",
        AllFours: "Hide",
    },
    Layer: [
        {
            Name: "淫纹",
            AllowTypes: { t: 0 },
        },
        {
            Name: "预设淫纹1",
            AllowColorize: false,
            AllowTypes: { t: 1 },
        },
        {
            Name: "预设淫纹2",
            AllowColorize: false,
            AllowTypes: { t: 2 },
        },
        {
            Name: "预设淫纹3",
            AllowColorize: false,
            AllowTypes: { t: 3 },
        },
        {
            Name: "发光",
        },
    ],
};

/** @type { CustomAssetDefinition} */
const asset_lock = {
    Name: "淫纹锁_Luzi_Padlock",
    Random: false,
    Wear: false,
    Enable: false,
    Effect: [],
    IsLock: true,
    ExclusiveUnlock: true,
    Time: 10,
    Extended: true,
};

/**
 * @param {Character} C 玩家自身
 */
function AssetsItemPelvis随机自慰(C) {
    if (!C.IsPlayer()) return;

    DrawFlashScreen("#F347B4", 1500, 500);

    const customDialog = DialogTools.makeCustomDialogGenerator(asset.Name);

    const whenBlocked = () => {
        ServerSend("ChatRoomChat", {
            Content: customDialog("自慰Block", Player.HasPenis() ? "P" : "V", `${Math.floor(Math.random() * 5)}`),
            Type: "Action",
            Dictionary: [{ SourceCharacter: Player.MemberNumber }],
        });
    };

    if (!Player.CanInteract()) {
        whenBlocked();
        return;
    }

    const activity = AssetGetActivity("Female3DCG", "MasturbateHand");
    if (!activity) {
        whenBlocked();
        return;
    }

    const groups = activity.Target.filter((x) => ActivityCanBeDone(Player, "MasturbateHand", x));
    if (groups.length === 0) {
        whenBlocked();
        return;
    }

    const targetGroupName = groups[Math.floor(Math.random() * groups.length)];
    const targetGroup = AssetGroupGet("Female3DCG", targetGroupName);
    ActivityRun(
        Player,
        Player,
        targetGroup,
        {
            Activity: AssetGetActivity("Female3DCG", "MasturbateHand"),
            Group: targetGroupName,
        },
        true
    );
}

/**
 * @param {Character} player
 * @param {MyDataType} data
 * @param {ExtendItemProperties} property
 */
function updateRuns(player, data, property) {
    if (!player.IsPlayer()) return;

    const now = CommonTime();
    if (!data.ArousalCheckTimer) data.ArousalCheckTimer = now;

    const delta = now - data.ArousalCheckTimer;
    data.ArousalCheckTimer += delta;

    // LSCG 联动
    if (property.TypeRecord.a === 1) {
        const LSCG = /** @type {any} */ (player).LSCG;
        if (LSCG && LSCG.InjectorModule && LSCG.InjectorModule.enabled && LSCG.InjectorModule.enableHorny) {
            const { drugLevelMultiplier, hornyLevelMax, hornyLevel } = LSCG.InjectorModule;
            LSCG.InjectorModule.hornyLevel = Math.min(
                hornyLevel + 0.05 * drugLevelMultiplier * (delta / 1000),
                hornyLevelMax * drugLevelMultiplier
            );
        }
    }

    // 随机自慰
    const nextTime = () =>
        now + (Math.random() * 10 + (15 * (100 - (Player.ArousalSettings?.Progress ?? 0))) / 100 + 10) * 1000;
    if (!data.NextMasturbateTime) data.NextMasturbateTime = nextTime();
    if (property.Masturbate && ServerPlayerIsInChatRoom()) {
        if (now > data.NextMasturbateTime) {
            data.NextMasturbateTime = nextTime();
            AssetsItemPelvis随机自慰(player);
        }
    } else {
        data.NextMasturbateTime = nextTime();
    }
}

/**
 * @param {ServerChatRoomMessage} data
 */
function onActionHandler(data) {
    const { Type, Content, Dictionary } = data;
    if (
        Type === "Action" &&
        Array.isArray(Dictionary) &&
        Dictionary.find((x) => "TargetCharacter" in x)?.TargetCharacter === Player.MemberNumber
    ) {
        if (Content.includes("ActionUse")) {
            const assetName = Dictionary.find((x) => "AssetName" in x)?.AssetName;
            const groupName = /** @type {any}*/ (Dictionary.find((x) => "FocusGroupName" in x))?.FocusGroupName;
            if (assetName !== asset.Name || !groupName) return;

            const sourceChara = Dictionary.find((x) => "SourceCharacter" in x)?.SourceCharacter;
            const item = InventoryGet(Player, groupName);
            const lock = { Asset: AssetGet(Player.AssetFamily, "ItemMisc", asset_lock.Name) };
            InventoryLock(Player, item, lock, sourceChara);
            item.Property.MemberNumberListKeys = CommonConvertArrayToString([sourceChara]);
            ChatRoomCharacterItemUpdate(Player, groupName);
        } else if (Content.endsWith(`${asset.Name}淫纹强制高潮`)) {
            if (!!Player.ArousalSettings) Player.ArousalSettings.Progress = 100;
            ActivityOrgasmPrepare(Player);
        } else if (Content.endsWith(`${asset.Name}Seta1`)) {
            DrawFlashScreen("#F347B4", 1500, 500);
        }
    }
}

/** @type {Record<string, Rect>} */
const buttons = {
    电流按钮: { X: 1265, Y: 600, W: 225, H: 55 },
    高潮按钮: { X: 1510, Y: 600, W: 225, H: 55 },

    发光开关: { X: 1185, Y: 675, W: 64, H: 64 },
    自慰开关: { X: 1185, Y: 750, W: 64, H: 64 },
};

/** @type { ExtendedItemScriptHookCallbacks.Draw<ModularItemData> } */
function dialogDrawHook(Data, originalFunction) {
    originalFunction();
    if (!DialogFocusItem) return;
    if (Data.currentModule === "样式" || Data.currentModule === "性刺激") {
    } else {
        const customDialog = DialogTools.makeCustomDialogGenerator(DialogFocusItem.Asset.Name);

        const prevAlign = MainCanvas.textAlign;
        MainCanvas.textAlign = "center";
        ExtendedItemCustomDraw(customDialog("淫纹魔法电流按钮"), buttons.电流按钮.X, buttons.电流按钮.Y);
        ExtendedItemCustomDraw(customDialog("淫纹强制高潮按钮"), buttons.高潮按钮.X, buttons.高潮按钮.Y);

        MainCanvas.textAlign = "left";
        const property = /** @type {ExtendItemProperties} */ (DialogFocusItem.Property);
        const 强制自慰ON = property.Masturbate;
        const 发光ON = property.Glow;
        ExtendedItemDrawCheckbox("GlowSwitch", buttons.发光开关.X, buttons.发光开关.Y, 发光ON, {
            text: AssetTextGet(customDialog("淫纹发光按钮")),
            textColor: "White",
        });
        ExtendedItemDrawCheckbox("MastSwitch", buttons.自慰开关.X, buttons.自慰开关.Y, 强制自慰ON, {
            text: AssetTextGet(customDialog("淫纹强制自慰按钮")),
            textColor: "White",
        });
        MainCanvas.textAlign = prevAlign;
    }
}

/**
 * @param {Rect} rect
 * @returns {boolean}
 */
export function RMouseIn(rect) {
    return MouseIn(rect.X, rect.Y, rect.W, rect.H);
}

/** @type {ExtendedItemScriptHookCallbacks.Click<ModularItemData>} */
function dialogClickHook(Data, originalFunction) {
    originalFunction();
    if (!DialogFocusItem) return;
    if (Data.currentModule === "样式" || Data.currentModule === "性刺激") {
    } else {
        const property = /** @type {ExtendItemProperties} */ (DialogFocusItem.Property);

        const clickPush = (key, func) =>
            ExtendedItemCustomClickAndPush(CharacterGetCurrent(), DialogFocusItem, key, () => func(), false, false);

        const customDialog = DialogTools.makeCustomDialogGenerator(DialogFocusItem.Asset.Name);

        if (RMouseIn(buttons.高潮按钮)) {
            const Dictionary = new DictionaryBuilder()
                .sourceCharacter(Player)
                .targetCharacter(CharacterGetCurrent())
                .destinationCharacterName(CharacterGetCurrent())
                .asset(DialogFocusItem.Asset, "AssetName", DialogFocusItem.Craft && DialogFocusItem.Craft.Name)
                .build();
            ChatRoomPublishCustomAction(customDialog("淫纹强制高潮"), true, Dictionary);
        } else if (RMouseIn(buttons.电流按钮)) {
            ExtendedItemCustomClick("淫纹魔法电流", PropertyShockPublishAction, false, false);
        } else if (RMouseIn(buttons.发光开关)) {
            clickPush("Glow", () => {
                property.Glow = !property.Glow;
                property.OverridePriority = property.Glow ? 44 : undefined;
            });
        } else if (RMouseIn(buttons.自慰开关)) {
            clickPush("Masturbate", () => (property.Masturbate = !property.Masturbate));
            const Dictionary = new DictionaryBuilder()
                .sourceCharacter(Player)
                .destinationCharacterName(CharacterGetCurrent())
                .asset(DialogFocusItem.Asset, "AssetName", DialogFocusItem.Craft && DialogFocusItem.Craft.Name)
                .build();
            ChatRoomPublishCustomAction(
                customDialog(`${property.Masturbate ? "开始" : "停止"}淫纹强制自慰`),
                false,
                Dictionary
            );
        }
    }
}

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, MyDataType>} */
function scriptDraw(data, originalFunction, { C, Item, PersistentData }) {
    const Data = PersistentData();

    if (C.IsPlayer()) updateRuns(C, Data, /**@type {ExtendItemProperties}*/ (Item.Property));

    if (/**@type {ExtendItemProperties}*/ (Item.Property)?.Glow) Tools.drawUpdate(C, Data);
}

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, MyDataType>} */
function beforeDraw(data, originalFunction, { PersistentData, L, Property, C }) {
    if (L === "发光") {
        const property = /** @type {ExtendItemProperties} */ (Property);

        if (!property.Glow) return { Opacity: 0 };

        const Data = PersistentData();

        const now = Date.now();

        // 闪烁周期时间, 0.5 ~ 5 秒
        const TwinkleCycleTime = (C.ArousalSettings ? Math.max(10, 110 - C.ArousalSettings.Progress) : 100) * 50;

        // 随机偏移一点时间，避免同步闪烁
        if (!Data.BlinkCycle) Data.BlinkCycle = Math.floor(Math.random() * 1000);
        if (!Data.BlinkTimer) Data.BlinkTimer = now;

        const delta = now - Data.BlinkTimer;
        Data.BlinkTimer = now;
        Data.BlinkCycle += (delta / TwinkleCycleTime) * Math.PI * 2;

        return { Opacity: 0.7 + 0.3 * Math.cos(Data.BlinkCycle) };
    }
}

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    DrawImages: false,
    ChatTags: Tools.CommonChatTags(),
    Modules: [
        { Name: "样式", Key: "t", Options: [{}, {}, {}, {}], DrawImages: true },
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
    ],
    ScriptHooks: {
        Draw: dialogDrawHook,
        Click: dialogClickHook,
        BeforeDraw: beforeDraw,
        ScriptDraw: scriptDraw,
    },
    BaselineProperty: /** @type {ExtendItemProperties}*/ ({
        Masturbate: false,
        Glow: false,
    }),
};

/** @type {AssetArchetypeConfig} */
const extended2 = {
    Archetype: ExtendedArchetype.NOARCH,
    ScriptHooks: {
        Init: InventoryItemMiscHighSecurityPadlockInitHook,
        Load: InventoryItemMiscHighSecurityPadlockLoadHook,
        Draw: InventoryItemMiscHighSecurityPadlockDrawHook,
        Click: InventoryItemMiscHighSecurityPadlockClickHook,
        Exit: InventoryItemMiscHighSecurityPadlockExitHook,
    },
    BaselineProperty: {
        MemberNumberListKeys: "",
    },
};

const lock_dialogs = DialogTools.replicateGroupedItemDialog(["ItemMisc"], ["淫纹锁_Luzi_Padlock"], {
    CN: {
        Intro: "画着复杂的文字",
    },
    EN: {
        Intro: "Inscripted with complex symbols",
    },
    RU: {
        Intro: "Намальовано складними літерами",
    },
    UA: {
        Intro: "Намальовано складними літерами",
    },
});

const custom_dialogs = DialogTools.replicateCustomDialog(["淫纹_Luzi"], {
    CN: {
        淫纹发光按钮: "淫纹发光",
        淫纹强制自慰按钮: "淫纹强制自慰",

        淫纹魔法电流按钮: "淫纹魔法电流",
        淫纹强制高潮按钮: "淫纹强制高潮",

        开始淫纹强制自慰: "SourceCharacter通过AssetName上的魔法令TargetCharacter开始不停地自慰.",
        停止淫纹强制自慰: "SourceCharacter通过AssetName上的魔法解除了TargetCharacter的强制自慰.",

        淫纹强制高潮: "SourceCharacter通过AssetName上的魔法令TargetCharacter强制高潮.",

        自慰BlockV0: "SourceCharacter急切的想要抚慰自己,颤抖着夹紧双腿,尽可能刺激自己的私处.",
        自慰BlockV1: "SourceCharacter急切的想要抚慰自己,扭动肩膀,尽可能让乳尖受到进一步刺激.",
        自慰BlockV2: "SourceCharacter急切的想要抚慰自己,夹紧双腿摩擦私处,但仍难以得到刺激.",
        自慰BlockV3: "SourceCharacter急切的想要抚慰自己,手臂挣扎着想要自慰,但她的手臂完全无法动弹.",
        自慰BlockV4: "SourceCharacter急切的想要抚慰自己,手臂徒劳地向着私处摸索尝试,近在咫尺的快乐此时却是如此遥不可及.",
        自慰BlockP0: "SourceCharacter急切的想要抚慰自己,颤抖着夹紧双腿,尽可能刺激自己的阴茎.",
        自慰BlockP1: "SourceCharacter急切的想要抚慰自己,扭动身体,尽可能磨蹭阴茎龟头.",
        自慰BlockP2: "SourceCharacter急切的想要抚慰自己,夹紧双腿摩擦龟头,但仍难以得到刺激.",
        自慰BlockP3: "SourceCharacter急切的想要抚慰自己,手臂挣扎着想要自慰,但他的手臂完全无法动弹.",
        自慰BlockP4: "SourceCharacter急切的想要抚慰自己,手臂徒劳地向着阴茎摸索尝试,近在咫尺的快乐此时却是如此遥不可及.",
    },
    EN: {
        淫纹发光按钮: "Lewd Crest Glowing",
        淫纹强制自慰按钮: "Lewd Crest Forced Masturbation",

        淫纹魔法电流按钮: "Lewd Crest Magical Shock",
        淫纹强制高潮按钮: "Lust Pattern Magical Orgasm",

        开始淫纹强制自慰:
            "SourceCharacter uses magic on AssetName to make TargetCharacter start continuous masturbation.",
        停止淫纹强制自慰: "SourceCharacter uses magic on AssetName to stop the forced masturbation of TargetCharacter.",

        淫纹强制高潮: "SourceCharacter uses magic on AssetName to force TargetCharacter to orgasm.",

        自慰BlockV0:
            "SourceCharacter eagerly wants to pleasure themselves, trembling and squeezing their thighs together to stimulate their private areas as much as possible.",
        自慰BlockV1:
            "SourceCharacter eagerly wants to pleasure themselves, wriggling their shoulders to further stimulate their nipples.",
        自慰BlockV2:
            "SourceCharacter eagerly wants to pleasure themselves, squeezing their thighs together to rub their private areas but still finding it difficult to stimulate themselves.",
        自慰BlockV3:
            "SourceCharacter eagerly wants to pleasure themselves, struggling with their arms to masturbate, but their arms are completely immobilized.",
        自慰BlockV4:
            "SourceCharacter eagerly wants to pleasure themselves, their arms futilely reaching towards their private areas, the close proximity of pleasure now seeming so unreachable.",
        自慰BlockP0:
            "SourceCharacter was eager to soothe himself, trembling and gripping his legs, trying to stimulate his penis as much as possible.",
        自慰BlockP1:
            "SourceCharacter is eager to soothe himself, twisting his body and rubbing against the glans penis as much as possible.",
        自慰BlockP2:
            "SourceCharacter urgently wanted to comfort himself, clamping his legs and rubbing his glans, but still struggled to get stimulation.",
        自慰BlockP3:
            "SourceCharacter desperately wanted to comfort himself, struggling with his arms to masturbate, but his arms were completely immobile.",
        自慰BlockP4:
            "SourceCharacter urgently wanted to comfort himself, and in vain, his arm groped towards his penis, but the joy that was so close at hand was so unattainable at this moment.",
    },
    UA: {
        淫纹发光按钮: "Розпусний гребінь, що світиться",
        淫纹强制自慰按钮: "Розпусний гребінь примусової мастурбації",
        淫纹魔法电流按钮: "Магічний шок Lewd Crest",
        淫纹强制高潮按钮: "Візерунок хтивості. Чарівний оргазм",
        开始淫纹强制自慰:
            "SourceCharacter використовує магію на AssetName, щоб змусити TargetCharacter почати безперервну мастурбацію.",
        停止淫纹强制自慰:
            "SourceCharacter використовує магію на AssetName, щоб зупинити примусову мастурбацію TargetCharacter.",
        淫纹强制高潮: "SourceCharacter використовує магію на AssetName, щоб змусити TargetCharacter досягти оргазму.",
        自慰BlockV0:
            "SourceCharacter з нетерпінням хоче чіпати себе, стискає свої лахи як їхні ноги трусяться від жаги стимулювати себе якомога більше.",
        自慰BlockV1:
            "SourceCharacter з нетерпінням хоче чіпати себе, трусячи своїми плечима з жагою стимулювати свої груди й соски.",
        自慰BlockV2:
            "SourceCharacter з нетерпінням хоче чіпати себе, стискає свої лахи як їхні ноги трусяться від жаги стимулювати себе якомога більше але натомість не получається стимулювати себе так просто.",
        自慰BlockV3:
            "SourceCharacter з нетерпінням хоче чіпати себе, пробуючи чинити опір проти щупальевого косьюму як їхні руки зв'язані позаду їх.",
        自慰BlockV4:
            "SourceCharacter з нетерпінням хоче чіпати себе, their arms futilely reaching towards their private areas, the close proximity of pleasure now seeming so unreachable.",
        自慰BlockP0:
            "SourceCharacter з нетерпінням хоче охолодити свою жагу, як його тіло труситься і він стискає свої ляхи, пробуючи стимулювати себе якомога більше.",
        自慰BlockP1:
            "SourceCharacter з нетерпінням хоче охолодити свою жагу, як він повертає своє тіло всік і всяк якомога більше.",
        自慰BlockP2:
            "SourceCharacter терміново хоче знизити жагу, як він стискає свої ляхи і тре свою голівку пісюна, але з невдалою спробою пробує стимулювати себе.",
        自慰BlockP3:
            "SourceCharacter терміново хоче знизити жагу, намагаючись використати свої руки з користю і мастурбувати, але натомість його руки жалюгідно нерухомі.",
        自慰BlockP4:
            "SourceCharacter з гіганською жагою чіпати себе, цого рука слідує до його пісюна стискаючи з впевненістю, натомість не отримує доступне задоволення в руці.",
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
        自慰BlockV0:
            "SourceCharacter eagerly wants to pleasure themselves, trembling and squeezing their thighs together to stimulate their private areas as much as possible.",
        自慰BlockV1:
            "SourceCharacter eagerly wants to pleasure themselves, wriggling their shoulders to further stimulate their nipples.",
        自慰BlockV2:
            "SourceCharacter eagerly wants to pleasure themselves, squeezing their thighs together to rub their private areas but still finding it difficult to stimulate themselves.",
        自慰BlockV3:
            "SourceCharacter eagerly wants to pleasure themselves, struggling with their arms to masturbate, but their arms are completely immobilized.",
        自慰BlockV4:
            "SourceCharacter eagerly wants to pleasure themselves, their arms futilely reaching towards their private areas, the close proximity of pleasure now seeming so unreachable.",
        自慰BlockP0:
            "SourceCharacter was eager to soothe himself, trembling and gripping his legs, trying to stimulate his penis as much as possible.",
        自慰BlockP1:
            "SourceCharacter is eager to soothe himself, twisting his body and rubbing against the glans penis as much as possible.",
        自慰BlockP2:
            "SourceCharacter urgently wanted to comfort himself, clamping his legs and rubbing his glans, but still struggled to get stimulation.",
        自慰BlockP3:
            "SourceCharacter desperately wanted to comfort himself, struggling with his arms to masturbate, but his arms were completely immobile.",
        自慰BlockP4:
            "SourceCharacter urgently wanted to comfort himself, and in vain, his arm groped towards his penis, but the joy that was so close at hand was so unattainable at this moment.",
    },
});

const item_dialogs = DialogTools.replicateGroupedItemDialog(["ItemPelvis", "ItemTorso", "ItemTorso2"], ["淫纹_Luzi"], {
    CN: {
        SelectBase: "淫纹设置",
        Module样式: "淫纹样式",
        Module性刺激: "淫纹性刺激",

        Select样式: "设置淫纹样式",
        Optiont0: "默认样式",
        Optiont1: "样式1",
        Optiont2: "样式2",
        Optiont3: "样式3",
        Sett0: "SourceCharacter将DestinationCharacter淫纹设置为默认样式.",
        Sett1: "SourceCharacter将DestinationCharacter淫纹设置为样式1.",
        Sett2: "SourceCharacter将DestinationCharacter淫纹设置为样式2.",
        Sett3: "SourceCharacter将DestinationCharacter淫纹设置为样式3.",

        Select性刺激: "淫纹性刺激设置",
        Optiona0: "正常",
        Optiona1: "持续发情",
        Optiona2: "寸止",
        Optiona3: "拒绝",
        Seta0: "SourceCharacter通过AssetName上的魔法令TargetCharacter的淫纹恢复自然状态.",
        Seta1: "SourceCharacter通过AssetName上的魔法令TargetCharacter的小穴保持湿润,持续处于发情状态.",
        Seta2: "SourceCharacter通过AssetName上的魔法令TargetCharacter仅能够处于高潮边缘.",
        Seta3: "SourceCharacter通过AssetName上的魔法令TargetCharacter仅能够拒绝高潮.",
    },
    EN: {
        SelectBase: "Lewd Crest Settings",
        Module样式: "Lewd Crest Style",
        Module性刺激: "Lewd Crest Sexual Stimulation",

        Select样式: "Select Lewd Crest Style",
        Optiont0: "Default Style",
        Optiont1: "Style 1",
        Optiont2: "Style 2",
        Optiont3: "Style 3",
        Sett0: "SourceCharacter sets DestinationCharacter Lust Pattern to the default style.",
        Sett1: "SourceCharacter sets DestinationCharacter Lust Pattern to Style 1.",
        Sett2: "SourceCharacter sets DestinationCharacter Lust Pattern to Style 2.",
        Sett3: "SourceCharacter sets DestinationCharacter Lust Pattern to Style 3.",

        Select性刺激: "Lewd Crest Sexual Stimulation Settings",
        Optiona0: "Normal",
        Optiona1: "Continuous Heat",
        Optiona2: "Edge",
        Optiona3: "Deny",
        Seta0: "SourceCharacter uses magic on AssetName to restore DestinationCharacter Lust Pattern to its natural state.",
        Seta1: "SourceCharacter uses magic on AssetName to keep DestinationCharacter intimate area moist and in a continuous state of heat.",
        Seta2: "SourceCharacter uses magic on AssetName to keep TargetCharacter at the edge of orgasm.",
        Seta3: "SourceCharacter uses magic on AssetName to make TargetCharacter able to only reject orgasm.",
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
    },
});

const translations = {
    CN: "淫纹",
    EN: "Lewd Crest",
    RU: "Порнографический знак",
    UA: "Хтивий візерунок",
};
const translations2 = {
    CN: "魔法刻印",
    EN: "Lewd Crest lock",
    RU: "Порнографический знак",
    UA: "Замок хтивого візерунку",
};

export default function () {
    ChatRoomEvents.on("Action", (data) => onActionHandler(data));

    AssetManager.addAsset("ItemPelvis", asset, extended, translations);
    AssetManager.addAsset("ItemTorso", { ...asset, DynamicGroupName: "ItemPelvis" }, extended, translations);
    AssetManager.addAsset("ItemMisc", asset_lock, extended2, translations2);
    AssetManager.addCustomDialog(item_dialogs);
    AssetManager.addCustomDialog(custom_dialogs);
    AssetManager.addCustomDialog(lock_dialogs);
}
