import { DialogTools, StateTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";
import { OrgasmEvents } from "@sugarch/bc-event-handler";

// Milk Vending by Yaoki

/** @type { CustomAssetDefinition} */
const asset = {
    Name: "奶贩",
    Random: false,
    Top: -125,
    Left: 0,
    Priority: 55,
    Difficulty: 30,
    AllowLock: true,
    DrawLocks: false,
    Prerequisite: ["NotSuspended", "NotLifted", "HasBreasts"],
    ArousalZone: "ItemBreast",
    SetPose: ["Hogtied"],
    Effect: [E.BlockWardrobe, E.Freeze, E.Tethered, E.MapImmobile, E.Block, E.Mounted],
    OverrideHeight: { Height: -230, Priority: 55, HeightRatioProportion: 0 },
    ParentGroup: {},
    Layer: [
        { Name: "通风口", Left: 40, Top: 485, ColorGroup: "装饰", Priority: 2 },
        { Name: "纸卷", Left: 30, Top: 335, ColorGroup: "装饰", Priority: 2 },
        { Name: "箱背", Left: 30, Top: -115, ColorGroup: "箱子", Priority: 2 },
        { Name: "拘束", Left: 170, Top: 255, Priority: 2 },
        {
            Name: "遮罩",
            Left: 170,
            Top: 15,
            TextureMask: { Groups: ["BodyUpper", "Suit"] },
            BlendingMode: "destination-out",
        },
        { Name: "底座", Left: 20, Top: 665 },
        { Name: "箱前", Left: 30, Top: -115, ColorGroup: "箱子" },
        { Name: "箱前图案", Left: 30, Top: -115, ColorGroup: "箱子" },
        { Name: "奶杯后", Left: 170, Top: 295, ColorGroup: "挤奶", AllowTypes: { m: 1 } },
        { Name: "奶杯液", Left: 170, Top: 295, AllowTypes: { m: 1 }, HasImage: false, AllowColorize: false },
        { Name: "奶杯前", Left: 170, Top: 295, ColorGroup: "挤奶", AllowTypes: { m: 1 } },
        { Name: "管液", Left: 170, Top: 295, AllowTypes: { m: 1 }, HasImage: false, AllowColorize: false },
        { Name: "管", Left: 170, Top: 295, ColorGroup: "挤奶", AllowTypes: { m: 1 } },
        { Name: "前面板", Left: 30, Top: -115 },
        { Name: "灯条", Left: 150, Top: 395 },
        { Name: "玻璃", Left: 30, Top: -115, AllowTypes: { w: 0 } },
    ],
};

const mLayers = new Set(asset.Layer.filter((l) => /** @type {any}*/ (l.AllowTypes)?.m === 1).map((l) => l.Name));

const translation = {
    CN: "牛奶贩卖机",
    EN: "Milk Vendor",
};

const layerNames = {
    CN: {
        箱背: "箱子内侧",

        底座: "底部",

        箱前: "箱子前侧",
        箱前图案: "图案",

        挤奶: "挤奶配件",
        奶杯后: "杯后",
        奶杯前: "杯前",
        管: "软管",
    },
    EN: {
        通风口: "Vent",
        纸卷: "Paper Roll",
        装饰: "Decorations",

        箱子: "Box",

        箱背: "Back",
        拘束: "Restraint",

        底座: "Base",
        箱前: "Front",
        箱前图案: "Pattern",

        挤奶: "Milking Attachment",
        奶杯后: "Cup Back",
        奶杯前: "Cup Front",
        管: "Hose",

        前面板: "Front Panel",
        灯条: "Light Strip",
        玻璃: "Glass",
    },
};

/**
 * @typedef {ItemProperties & {Luzi_MilkTotal?:number}} MilkingVendorProperties
 */

/**
 * @typedef {Object} MilkCupData
 * @property {number} MilkTimer
 * @property {number} MilkCupAmount
 * @property {number} MilkProdFlow
 * @property {number} MilkUpdateTimer
 * @property {true} [OrgasmCheckInit]
 * @property {HTMLCanvasElement} [CupCanvas]
 * @property {HTMLCanvasElement} [HoseCanvas]
 */

const maxProdFlow = 10;

const orgasmState = new StateTools.OrgasmState();

/**
 * @param {Character} C
 * @param {Item} Item
 */
function flowAlgorithm(C, Item) {
    if (C.ArousalSettings.Active === "Inactive") return 0;
    if (Item.Property?.TypeRecord?.m !== 1) return 0;

    const arousalFactorF = (group) => {
        const factor = PreferenceGetArousalZone(C, group).Factor;
        if (factor < 2) return 0;
        else return factor - 1;
    };
    // range 0 ~ 6
    const arousalFactorV = arousalFactorF("ItemBreast") + arousalFactorF("ItemNipples");

    const mSpeed = C.ArousalSettings.Progress;

    const orgasmFactor = (() => {
        if (Item.Property?.TimeSinceLastOrgasm) {
            const timeSince = Date.now() - Item.Property.TimeSinceLastOrgasm;
            return Math.pow(0.6, timeSince / 1000) * 2;
        }
        return 0;
    })();

    // 产量流速 = (胸部快感因子 + 乳头快感因子) * 性奋值 / 100 + 高潮因子
    // 然后标准化到 maxProdFlow
    return (((arousalFactorV * mSpeed) / 100 + orgasmFactor) / 8) * maxProdFlow;
}

function flowText(value) {
    // maxProdFlow = 40 mL/min
    return `${(value * 4).toFixed(2)} mL/min`;
}

/**
 * @param {number} delta
 * @param {MilkCupData} data
 * @param {DynamicScriptCallbackData<MilkCupData>} arg0
 */
function playerStateUpdate(delta, data, { C, Item }) {
    let need_push = false;

    Item.Property ??= {};
    const property = /** @type {MilkingVendorProperties}*/ (Item.Property);

    if (!data.OrgasmCheckInit) {
        data.OrgasmCheckInit = true;
        orgasmState.reset();
    } else {
        if (orgasmState.take("Orgasmed")) {
            property.TimeSinceLastOrgasm = Date.now();
            need_push = true;
        }
    }

    property.Luzi_MilkTotal = (property.Luzi_MilkTotal ?? 0) + (data.MilkProdFlow * delta * 4) / 60;

    const now = Date.now();
    if (!data.MilkUpdateTimer) data.MilkUpdateTimer = now;
    else if (now > 5000 + data.MilkUpdateTimer) {
        need_push = true;
        data.MilkUpdateTimer = now;
    }

    if (need_push) {
        ChatRoomCharacterItemUpdate(C, Item.Asset.Group.Name);
    }
}

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, MilkCupData>} */
function scriptDraw(data, originalFunction, drawData) {
    const { C, Item, PersistentData } = drawData;
    if (Item.Property?.TypeRecord?.m !== 1) return;
    const Data = PersistentData();
    Data.MilkProdFlow ??= 0;
    Tools.drawUpdate(C, Data);

    if (!Data.MilkTimer) {
        Data.MilkTimer = Date.now();
        return;
    }

    Data.MilkCupAmount ??= 0;

    const delta = (Date.now() - Data.MilkTimer) / 1000;
    Data.MilkTimer = Date.now();

    Data.MilkProdFlow = flowAlgorithm(C, Item);

    // 每秒钟杯内值都会变成上一秒的 0.8
    const reductioned = Data.MilkCupAmount * Math.pow(0.8, delta);
    Data.MilkCupAmount = Math.min(Math.max(reductioned + Data.MilkProdFlow * delta, 0), 100);

    if (C.IsPlayer()) playerStateUpdate(delta, Data, drawData);
}

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, MilkCupData>} */
function beforeDraw(data, originalFunction, { L, Y, Property }) {
    /** @type {DynamicBeforeDrawOverrides} */
    const ret = {};
    if (mLayers.has(L)) {
        // 上下移动和AlphaMask同时存在时，BC会内存溢出
        const Intensity = Property?.Intensity ?? -1;
        if (Intensity >= 0) {
            const freq = [0.2, 0.6, 1.2, 1.8][Intensity] ?? 0.2;
            ret.Y = Y + Math.round(Math.cos(((Date.now() * freq) / 1000) * 2 * Math.PI));
        }
    }
    return ret;
}

/** @type {ExtendedItemScriptHookCallbacks.AfterDraw<ModularItemData, MilkCupData>} */
function afterDraw(data, originalFunction, drawData) {
    const { C, A, PersistentData, L, X, Y, drawCanvas, drawCanvasBlink } = drawData;
    const Data = PersistentData();

    if (L === "奶杯液") {
        if (!Data.CupCanvas) Data.CupCanvas = AnimationGenerateTempCanvas(C, A, 500, 200);
        const source = Tools.getAssetURL(drawData);
        const canvas = Data.CupCanvas.getContext("2d");
        const canvasY = CanvasUpperOverflow + 200;
        // Y范围: 200 ~ 400

        if (typeof Data.MilkCupAmount === "number") {
            canvas.clearRect(0, 0, 500, 200);
            DrawImageEx(source, canvas, X, Y - canvasY);
            canvas.clearRect(0, 0, 500, 150 - Math.round((Data.MilkCupAmount / 100) * 45));

            drawCanvas(Data.CupCanvas, 0, canvasY);
            drawCanvasBlink(Data.CupCanvas, 0, canvasY);
        }
    } else if (L === "管液") {
        const ratio1 = ((350 - 327) / (350 - 305)) * 100;
        if (!Data.HoseCanvas) Data.HoseCanvas = AnimationGenerateTempCanvas(C, A, 500, 200);
        const source = Tools.getAssetURL(drawData);
        const canvas = Data.HoseCanvas.getContext("2d");
        const canvasY = CanvasUpperOverflow + 300;
        // Y范围: 300 ~ 500

        if (typeof Data.MilkCupAmount === "number" && typeof Data.MilkProdFlow === "number") {
            // 327 ~ 440
            const pLen = 440 - 327;
            // 使用产量流速和杯内液体量的较大者，产量流速大和杯内液体多都会让液柱更长，液柱长度至少30
            const kRatio = Math.min(Math.max(Data.MilkCupAmount / ratio1, Data.MilkProdFlow / maxProdFlow), 1);

            // 低于 0.1 管子清空
            if (kRatio > 0.1) {
                canvas.clearRect(0, 0, 500, 200);
                DrawImageEx(source, canvas, X, Y - canvasY);

                // 产生液柱动画
                if (Data.MilkCupAmount < ratio1 * 100) {
                    const len = Math.round(kRatio * (pLen - 10) + 10);
                    const sep = pLen - len;

                    const start = Math.round((((Date.now() / 1000) % 3) * pLen) / 3);

                    canvas.clearRect(0, 27 + start - pLen, 500, sep);
                    canvas.clearRect(0, 27 + start, 500, sep);
                    canvas.clearRect(0, 27 + start + pLen, 500, sep);
                }

                drawCanvas(Data.HoseCanvas, 0, canvasY);
                drawCanvasBlink(Data.HoseCanvas, 0, canvasY);
            }
        }
    }
}

/** @type {ExtendedItemScriptHookCallbacks.Draw<ModularItemData>} */
function drawHook(data, originalFunction) {
    originalFunction();
    if (!DialogFocusItem || !CurrentCharacter) return;
    if (data.currentModule === "Base") {
        const dialogKey = DialogTools.dialogKey(DialogFocusItem);
        const customDialogText = (keys) => AssetTextGet(dialogKey(keys));

        const oldAlign = MainCanvas.textAlign;
        MainCanvas.textAlign = "right";

        const property = /** @type {MilkingVendorProperties}*/ (DialogFocusItem.Property ?? {});

        const LeftPartX = 1470;
        DrawTextFit(customDialogText("产率"), LeftPartX, 650, 300, "White", "Gray");
        DrawTextFit(customDialogText("存量"), LeftPartX, 725, 300, "White", "Gray");

        MainCanvas.textAlign = "left";
        const RightPartX = 1530;
        const prodflow = flowAlgorithm(CurrentCharacter, DialogFocusItem);

        DrawTextFit(flowText(prodflow), RightPartX, 650, 300, "White", "Gray");
        DrawTextFit(`${(property.Luzi_MilkTotal ?? 0).toFixed(2)} mL`, RightPartX, 725, 300, "White", "Gray");

        MainCanvas.textAlign = oldAlign;
    }
}

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    DrawImages: false,
    ScriptHooks: {
        ScriptDraw: scriptDraw,
        BeforeDraw: beforeDraw,
        AfterDraw: afterDraw,
        Draw: drawHook,
    },
    BaselineProperty: /** @type {MilkingVendorProperties} */ ({
        Luzi_MilkTotal: 0,
    }),
    Modules: [
        {
            Name: "窗户",
            Key: "w",
            DrawImages: false,
            Options: [{ Property: { Effect: [E.Enclose, E.DeafLight, E.GagLight] } }, {}],
        },
        {
            Name: "挤奶",
            Key: "m",
            DrawImages: false,
            Options: [
                {},
                {
                    HasSubscreen: true,
                    Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
                    Property: {
                        Block: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings"],
                    },
                    ArchetypeConfig: { Archetype: ExtendedArchetype.VIBRATING },
                },
            ],
        },
    ],
};

const assetStrings = {
    CN: {
        SelectBase: "配置牛奶贩卖机",
        Module窗户: "窗户",
        Module挤奶: "挤奶",

        Select窗户: "设置窗户",
        Optionw0: "关闭窗户",
        Optionw1: "打开窗户",
        Setw0: "SourceCharacter将DestinationCharacterAssetName的窗户关闭",
        Setw1: "SourceCharacter将DestinationCharacterAssetName的窗户打开",

        Select挤奶: "设置挤奶",
        Optionm0: "停止挤奶",
        Optionm1: "启动挤奶",
        Setm0: "SourceCharacter设置DestinationCharacterAssetName停止挤奶",
        Setm1: "SourceCharacter设置DestinationCharacterAssetName启动挤奶",

        产率: "产率",
        存量: "机器存量",
    },
    EN: {
        SelectBase: "Configure Milk Vending Machine",
        Module窗户: "Window",
        Module挤奶: "Milking",

        Select窗户: "Set Window",
        Optionw0: "Close Window",
        Optionw1: "Open Window",
        Setw0: "SourceCharacter opens window on DestinationCharacter AssetName",
        Setw1: "SourceCharacter closes window on DestinationCharacter AssetName",

        Select挤奶: "Set Milking",
        Optionm0: "Stop Milking",
        Optionm1: "Start Milking",
        Setm0: "SourceCharacter turn off the milking function of DestinationCharacter AssetName",
        Setm1: "SourceCharacter turn on the milking function of DestinationCharacter AssetName",

        产率: "Production Rate",
        存量: "Machine Storage",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, { translation, layerNames, extended, assetStrings });
    orgasmState.watch(OrgasmEvents);
}
