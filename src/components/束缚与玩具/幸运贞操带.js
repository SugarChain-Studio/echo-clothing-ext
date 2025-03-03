import AssetManager from "@mod-utils/AssetManager";
import { ChatRoomEvents } from "@mod-utils/Events";
import { Tools } from "@mod-utils/Tools";
import { VersionSupport } from "@mod-utils/VersionSupport";

/**
 * @typedef {Object} ExtendItemPropertiesPart
 * @property {number} LastStruggleTime
 * @property {number} StruggleCount
 * @property {number} WornTime
 * @property {number} LastOrgasmTime
 * @property {number} OrgasmCount
 * @property {number} RuinedOrgasmCount
 */

/**
 * @typedef {globalThis.ItemProperties & ExtendItemPropertiesPart} ExtendItemProperties
 */

/**
 * @typedef {Object} FortuneChastityBeltPersistentData
 * @property {boolean} InOrgasm
 * @property {boolean} InDenial
 * @property {number} Timer
 */

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "幸运贞操带",
    Random: false,
    Gender: "F",
    Fetish: ["Metal"],
    Top: 390,
    Left: 140,
    Difficulty: 42,
    Time: 50,
    RemoveTime: 60,
    AllowLock: true,
    AllowTighten: false,
    Audio: "CuffsMetal",
    ParentGroup: VersionSupport.NoParentGroup,
    DefaultColor: ["#000000", "#deedff", "#d28b81", "#f9fbfe"],
    Prerequisite: ["AccessCrotch", "HasVagina", "CanCoverVulva"],
    ExpressionTrigger: [{ Name: "Soft", Group: "Eyebrows", Timer: 10 }],
    Layer: [{ Name: "底色" }, { Name: "色调" }, { Name: "反射" }, { Name: "高光" }],
    Effect: [E.Chaste],
    Hide: ["Pussy"],
    Extended: true,
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    ChatTags: Tools.CommonChatTags(),
    ScriptHooks: {
        ScriptDraw: scriptDraw,
        Draw: dialogDrawHook,
    },
    BaselineProperty: {
        OrgasmCount: 0,
    },
    Modules: [
        {
            Name: "Shield",
            Key: "s",
            DrawImages: false,
            Options: [
                {},
                {
                    Prerequisite: ["CanCoverVulva"],
                    Property: {
                        Effect: [E.Chaste],
                        Block: ["ItemVulva", "ItemVulvaPiercings"],
                    },
                },
                {
                    Property: {
                        Effect: [E.ButtChaste],
                        Block: ["ItemButt"],
                    },
                },
                {
                    Prerequisite: ["CanCoverVulva"],
                    Property: {
                        Effect: [E.Chaste, E.ButtChaste],
                        Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
                    },
                },
            ],
        },
        {
            Name: "Orgasm",
            Key: "o",
            DrawImages: false,
            Options: [
                {},
                { Property: { Effect: ["DenialMode"] } },
                { Property: { Effect: ["DenialMode", "RuinOrgasms"] } },
            ],
        },
        {
            Name: "TemperBlock",
            Key: "t",
            DrawImages: false,
            Options: [
                {},
                { Property: { ShockLevel: 2 } }, // only struggle
                { Property: { ShockLevel: 2 } }, // struggle and activity
            ],
        },
    ],
};

/**
 * @param {Partial<FortuneChastityBeltPersistentData>} data
 */
const tryInitData = (data) => {
    if (typeof data.InOrgasm !== "boolean") data.InOrgasm = false;
    if (typeof data.InDenial !== "boolean") data.InDenial = false;
    if (typeof data.Timer !== "number") data.Timer = Date.now();
};

/** @type {AssetGroupItemName[]} */
const tamperArea = ["ItemPelvis", "ItemVulva", "ItemVulvaPiercings", "ItemButt"];

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, FortuneChastityBeltPersistentData>} */
function scriptDraw(itemData, originalFunction, { C, Item, PersistentData }) {
    if (!C.IsPlayer()) return;

    const data = PersistentData();
    tryInitData(data);

    let need_push = false;

    const property = /**@type {ExtendItemProperties}*/ (Item.Property);

    // 初次处理穿戴时间
    if (!(property.WornTime > 0)) {
        property.WornTime = Date.now();
        need_push = true;
    }

    // 后续的检测以最快 100ms 的间隔处理
    const delta = Date.now() - data.Timer;
    if (delta < 100) return;

    data.Timer = Date.now();

    // 高潮检测
    if (C.ArousalSettings?.OrgasmStage > 1) {
        // undefined > 1 为 false
        if (!data.InOrgasm) {
            data.InOrgasm = true;
            property.OrgasmCount = (property.OrgasmCount || 0) + 1;
            need_push = true;
            property.LastOrgasmTime = Date.now();
        }
    } else {
        data.InOrgasm = false;
    }

    // 擅动检测
    if (property.TypeRecord?.["t"] > 0) {
        if (
            C.FocusGroup &&
            StruggleProgressPrevItem != null &&
            StruggleProgressStruggleCount > 0 &&
            (StruggleProgress > 3 || StruggleLockPickProgressCurrentTries > 0)
        ) {
            if (tamperArea.includes(C.FocusGroup.Name)) {
                PropertyShockPublishAction(C, Item, true);
                StruggleProgressStruggleCount = 0;
                StruggleProgress = 0;
                DialogLeaveDueToItem = true;
            }
        }
    }

    if (need_push) {
        ChatRoomCharacterItemUpdate(C, Item.Asset.Group.Name);
    }
}

/**
 * @param {number} seconds
 * @returns {string}
 */
function toDDHHMMSS(seconds) {
    const twodigit = (number) => {
        const ret = number.toString();
        if (ret.length < 2) return "0" + ret;
        return ret;
    };

    seconds = Math.floor(seconds);

    const days = Math.floor(seconds / 86400);
    seconds -= days * 86400;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return `${days}d ${twodigit(hours)}:${twodigit(minutes)}:${twodigit(seconds)}`;
}

/** @type { ExtendedItemScriptHookCallbacks.Draw<ModularItemData> } */
function dialogDrawHook(Data, originalFunction) {
    originalFunction();

    const Item = DialogFocusItem;
    if (!Item || Item.Asset.Name !== asset.Name) return;

    const customDialog = Tools.makeCustomDialogGenerator(asset.Name);
    const customDialogText = (...keys) => AssetTextGet(customDialog(...keys));

    const property = /**@type {ExtendItemProperties}*/ (Item.Property);

    const oldAlign = MainCanvas.textAlign;
    // 1500 = center X

    MainCanvas.textAlign = "center";

    if (Data.currentModule === "Base") {
        DrawTextFit(customDialogText("ShieldState", property.TypeRecord?.s), 1250, 550, 200, "White", "Gray");
        DrawTextFit(customDialogText("OrgasmState", property.TypeRecord?.o), 1500, 550, 200, "White", "Gray");
        DrawTextFit(customDialogText("TamperState", property.TypeRecord?.t), 1750, 550, 200, "White", "Gray");
    }

    MainCanvas.textAlign = "right";
    const now = Date.now();
    DrawTextFit(customDialogText("WornTime"), 1470, 650, 300, "White", "Gray");
    DrawTextFit(customDialogText("LastOrgasmTime"), 1470, 725, 300, "White", "Gray");
    DrawTextFit(customDialogText("OrgasmCount"), 1470, 800, 300, "White", "Gray");

    MainCanvas.textAlign = "left";
    DrawTextFit(toDDHHMMSS((now - property.WornTime) / 1000), 1530, 650, 300, "White", "Gray");

    if (property.LastOrgasmTime > 0)
        DrawTextFit(toDDHHMMSS((now - property.LastOrgasmTime) / 1000), 1550, 725, 300, "White", "Gray");
    else DrawTextFit(customDialogText("NeverTime"), 1530, 725, 300, "White", "Gray");

    DrawTextFit(`${property.OrgasmCount}`, 1530, 800, 300, "White", "Gray");

    MainCanvas.textAlign = oldAlign;
}

/**
 * @param {ServerChatRoomMessage} data
 */
function onAction(data) {
    const { Type, Content, Dictionary } = data;

    const thisItem = InventoryGet(Player, "ItemPelvis");
    if (!thisItem || thisItem.Asset.Name !== asset.Name) return;

    if (thisItem.Property?.TypeRecord?.["t"] !== 2) return;

    // 对自己使用喜欢的动作会触发惩罚
    if (
        Type == "Activity" &&
        Array.isArray(Dictionary) &&
        Dictionary.find((x) => "TargetCharacter" in x)?.TargetCharacter === Player.MemberNumber &&
        Dictionary.find((x) => "SourceCharacter" in x)?.SourceCharacter === Player.MemberNumber
    ) {
        const FocusGroupName = Dictionary.find((x) => "FocusGroupName" in x)?.FocusGroupName;
        if (!tamperArea.includes(FocusGroupName)) return;
        const ActivityName = Dictionary.find((x) => "ActivityName" in x)?.ActivityName;
        const factor = PreferenceGetActivityFactor(Player, ActivityName, true);
        if (factor >= 2) PropertyShockPublishAction(Player, thisItem, true);
    }
}

const custom_dialogs = Tools.replicateCustomDialog(["幸运贞操带"], {
    CN: {
        ShieldState0: "都打开",
        ShieldState1: "前部关闭",
        ShieldState2: "后部关闭",
        ShieldState3: "都关闭",

        OrgasmState0: "关闭",
        OrgasmState1: "寸止",
        OrgasmState2: "拒绝",

        TamperState0: "关闭",
        TamperState1: "挣扎",
        TamperState2: "挣扎和动作",

        WornTime: "穿戴时间:",
        LastOrgasmTime: "距离上次高潮时间:",
        OrgasmCount: "高潮次数:",

        NeverTime: "未曾发生",
    },
    EN: {
        ShieldState0: "Open All",
        ShieldState1: "Close Front",
        ShieldState2: "Close Rear",
        ShieldState3: "Close All",

        OrgasmState0: "Off",
        OrgasmState1: "Edge",
        OrgasmState2: "Deny",

        TamperState0: "Off",
        TamperState1: "Struggle",
        TamperState2: "Strg. and Acti.",

        WornTime: "Worn Time:",
        LastOrgasmTime: "Since Last Orgasm:",
        OrgasmCount: "Orgasm Count:",

        NeverTime: "Never Occurred",
    },
});

const dialogs = Tools.replicateTypedItemDialog(["ItemPelvis"], ["幸运贞操带"], {
    CN: {
        SelectBase: "选择配置",
        ModuleShield: "选择护盾",
        ModuleOrgasm: "禁欲模式",
        ModuleTemperBlock: "擅动管理",

        SelectShield: "选择护盾",
        Options0: "都打开",
        Options1: "前部关闭",
        Options2: "后部关闭",
        Options3: "都关闭",
        Sets0: "SourceCharacter将DestinationCharacterAssetName设置为打开所有胯部挡板。",
        Sets1: "SourceCharacter将DestinationCharacterAssetName设置为关闭前部胯部挡板。",
        Sets2: "SourceCharacter将DestinationCharacterAssetName设置为关闭后部胯部挡板。",
        Sets3: "SourceCharacter将DestinationCharacterAssetName设置为关闭所有胯部挡板。",

        SelectOrgasm: "选择禁欲模式",
        Optiono0: "关闭",
        Optiono1: "寸止",
        Optiono2: "拒绝",
        Seto0: "SourceCharacter关闭了DestinationCharacterAssetName上的高潮防止系统。",
        Seto1: "SourceCharacter将DestinationCharacterAssetName上的高潮防止系统设置为寸止模式。",
        Seto2: "SourceCharacter将DestinationCharacterAssetName上的高潮防止系统设置为拒绝模式。",

        SelectTemperBlock: "选择擅动管理",
        Optiont0: "关闭",
        Optiont1: "挣扎",
        Optiont2: "挣扎和动作",
        Sett0: "SourceCharacter关闭了DestinationCharacterAssetName上的电击惩罚",
        Sett1: "SourceCharacter设置DestinationCharacterAssetName会用惩罚保护区域的挣扎行为",
        Sett2: "SourceCharacter设置DestinationCharacterAssetName会用惩罚保护区域的挣扎行为和动作",
    },
    EN: {
        SelectBase: "Select Configuration",
        ModuleShield: "Shield",
        ModuleOrgasm: "Orgasm Prevention",
        ModuleTemperBlock: "Temper Block",

        SelectShield: "Configure Shield",
        Options0: "Open All",
        Options1: "Close Front",
        Options2: "Close Rear",
        Options3: "Close All",
        Sets0: "SourceCharacter sets DestinationCharacter AssetName to open all crotch shields.",
        Sets1: "SourceCharacter sets DestinationCharacter AssetName to close front crotch shield.",
        Sets2: "SourceCharacter sets DestinationCharacter AssetName to close rear crotch shield.",
        Sets3: "SourceCharacter sets DestinationCharacter AssetName to close all crotch shields.",

        SelectOrgasm: "Configure Orgasm Prevention Mode",
        Optiono0: "Off",
        Optiono1: "Edge",
        Optiono2: "Deny",
        Setso0: "SourceCharacter deactivates the orgasm prevention system on DestinationCharacter AssetName.",
        Setso1: "SourceCharacter sets the orgasm prevention system on DestinationCharacter AssetName to edging mode.",
        Setso2: "SourceCharacter sets the orgasm prevention system on DestinationCharacter AssetName to denial mode.",

        SelectTemperBlock: "Select Tamper Management",
        Optiont0: "Off",
        Optiont1: "Struggle",
        Optiont2: "Struggle and Activity",
        Sett0: "SourceCharacter deactivates the shock punishment on DestinationCharacter AssetName",
        Sett1: "SourceCharacter sets DestinationCharacterAssetName to shock punishment for struggling in protected area",
        Sett2: "SourceCharacter sets DestinationCharacterAssetName to shock punishment for struggling and activity in protected area",
    },
});

const translations = {
    CN: "幸运贞操带",
    EN: "Fortune Chastity Belt",
};

const layers = {
    CN: {
        底色: "底色",
        色调: "色调",
        反射: "反射",
        高光: "高光",
    },
    EN: {
        底色: "Base",
        色调: "Tone",
        反射: "Reflect",
        高光: "Shine",
    },
};

export default function () {
    ChatRoomEvents.on("Activity", (data) => onAction(data));

    AssetManager.addAsset("ItemPelvis", asset, extended, translations);
    AssetManager.addCustomDialog(dialogs);
    AssetManager.addCustomDialog(custom_dialogs);
    AssetManager.addLayerNames("ItemPelvis", asset, layers);
}
