import { StateTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { OrgasmEvents } from "@sugarch/bc-event-handler";
import { Container, createAfterDrawProcess, createItemDialogModular, Typing } from "../../../lib";

// Milk Vending by Yaoki

/** @type { CustomAssetDefinition} */
const asset = {
    Name: "奶贩",
    Random: false,
    Top: -125,
    Left: 0,
    Priority: 65,
    Difficulty: 30,
    AllowLock: true,
    DrawLocks: false,
    Time: 10,
    RemoveTime: 10,
    Prerequisite: ["NotSuspended", "NotLifted", "HasBreasts"],
    ArousalZone: "ItemBreast",
    SetPose: ["Hogtied"],
    Effect: [E.BlockWardrobe, E.Freeze, E.Tethered, E.MapImmobile, E.Block, E.Mounted],
    OverrideHeight: { Height: -230, Priority: 55, HeightRatioProportion: 1 },
    ParentGroup: {},
    Hide: ["SuitLower", "ClothLower", "Socks", "SocksLeft", "SocksRight", "Shoes", "TailStraps"],
    Layer: [
        { Name: "通风口", Left: 40, Top: 485, ColorGroup: "装饰" },
        { Name: "纸卷", Left: 30, Top: 335, ColorGroup: "装饰" },
        { Name: "箱背", Left: 30, Top: -115, ColorGroup: "箱子", Priority: 2 },
        { Name: "拘束", Left: 170, Top: 255, Priority: 2 },
        {
            Name: "箱轮廓",
            AllowColorize: false,
            Alpha: [
                {
                    Masks: [
                        [0, -CanvasUpperOverflow, 500, CanvasUpperOverflow - 90],
                        [0, 280, 60, 1000],
                        [440, 280, 60, 1000],
                    ],
                },
                {
                    Masks: [
                        [0, -CanvasUpperOverflow, 60, CanvasUpperOverflow + 280],
                        [440, -CanvasUpperOverflow, 60, CanvasUpperOverflow + 280],
                    ],
                    AllowTypes: { w: 0 },
                },
            ],
        },
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
        { Name: "出液", Left: 190, Top: 435, HasImage: false },
        { Name: "杯液", Left: 190, Top: 435, HasImage: false },
        { Name: "杯半", Left: 190, Top: 435, HasImage: false },
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
 * @typedef {Object} MilkingVendorCustomProperties
 * @property {number} Luzi_MilkTotal
 * @property {number} [Luzi_OutputStartLeft]
 * @property {number} [Luzi_OutputStartRight]
 * @property {true} [Luzi_OutputDoneLeft]
 * @property {true} [Luzi_OutputDoneRight]
 * @property {ContainerProperty.ContainerData} [Luzi_ContentLeft]
 * @property {ContainerProperty.ContainerData} [Luzi_ContentRight]
 */

/**
 * @typedef {ItemProperties & MilkingVendorCustomProperties} MilkingVendorProperties
 */

/**
 * @typedef {Object} MilkCupData
 * @property {number} MilkTimer
 * @property {number} MilkCupAmount
 * @property {number} MilkProdFlow
 * @property {number} MilkUpdateTimer
 * @property {true} [OrgasmCheckInit]
 * @property {number} RandomOffsetLeft
 * @property {number} RandomOffsetRight
 * @property {HTMLCanvasElement} [CupCanvas]
 * @property {HTMLCanvasElement} [HoseCanvas]
 * @property {HTMLCanvasElement} [OutputFlowCanvas]
 * @property {HTMLCanvasElement} [OutputContentCanvas]
 * @property {HTMLCanvasElement} [OutputCupCanvas]
 */

const maxProdFlow = 10;

const orgasmState = new StateTools.OrgasmState();

/**
 * 产量计算
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
 * @returns {boolean} 是否需要推送
 */
function milkerStateUpdate(delta, data, { Item }) {
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

    return need_push;
}

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, MilkCupData>} */
function scriptDraw(data, originalFunction, drawData) {
    const { C, Item, PersistentData } = drawData;
    const Data = PersistentData();
    if (Item.Property?.TypeRecord?.m !== 1) {
        delete Data.RandomOffsetLeft;
        delete Data.RandomOffsetRight;
        Data.MilkProdFlow = 0;
        Data.MilkCupAmount = 0;
    }
    Data.MilkProdFlow ??= 0;

    const property = /** @type {MilkingVendorProperties} */ (Item.Property);

    if (
        property?.TypeRecord?.m === 1 ||
        typeof property.Luzi_OutputStartLeft === "number" ||
        typeof property.Luzi_OutputStartRight === "number"
    ) {
        Tools.drawUpdate(C, Data);
    }

    const now = Date.now();

    let need_push = false;

    if (property?.TypeRecord?.m === 1) {
        Data.MilkTimer ??= now;
        Data.MilkCupAmount ??= 0;
        Data.RandomOffsetLeft ??= Math.floor(Math.random() * 100);
        Data.RandomOffsetRight ??= Math.floor(Math.random() * 100);

        const delta = (now - Data.MilkTimer) / 1000;
        Data.MilkTimer = now;
        Data.MilkProdFlow = flowAlgorithm(C, Item);

        // 每秒钟杯内值都会变成上一秒的 0.8
        const reductioned = Data.MilkCupAmount * Math.pow(0.8, delta);
        Data.MilkCupAmount = Math.min(Math.max(reductioned + Data.MilkProdFlow * delta, 0), 100);
        if (C.IsPlayer()) {
            if (milkerStateUpdate(delta, Data, drawData)) need_push = true;
        }
    }

    if (typeof property.Luzi_OutputStartLeft === "number") {
        if (now - property.Luzi_OutputStartLeft > 2000) {
            property.Luzi_OutputStartLeft = null;
            property.Luzi_OutputDoneLeft = true;
            need_push = true;
        }
    }

    if (typeof property.Luzi_OutputStartRight === "number") {
        if (now - property.Luzi_OutputStartRight > 2000) {
            property.Luzi_OutputStartRight = null;
            property.Luzi_OutputDoneRight = true;
            need_push = true;
        }
    }
    if (need_push) {
        ChatRoomCharacterItemUpdate(C, Item.Asset.Group.Name);
    }
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

const afterDrawProcess = createAfterDrawProcess(
    "modular",
    /**@type {MilkCupData}*/ ({}),
    ({ Property, PersistentData }) => {
        const property = /** @type {MilkingVendorProperties} */ (Property ?? {});
        return {
            property,
            data: PersistentData(),
            fillingLeft: typeof property.Luzi_OutputStartLeft === "number",
            fillingRight: typeof property.Luzi_OutputStartRight === "number",
            filledLeft: property.Luzi_OutputDoneLeft === true,
            filledRight: property.Luzi_OutputDoneRight === true,
        };
    }
).onLayers({
    奶杯液: ({ data }, drawData) => {
        const { C, A, X, Y, drawCanvas, drawCanvasBlink } = drawData;
        data.CupCanvas ??= AnimationGenerateTempCanvas(C, A, 500, 200);
        const source = Tools.getAssetURL(drawData);
        const canvas = data.CupCanvas.getContext("2d");
        const canvasY = CanvasUpperOverflow + 200;
        // Y范围: 200 ~ 400

        if (typeof data.MilkCupAmount === "number") {
            canvas.clearRect(0, 0, 500, 200);
            DrawImageEx(source, canvas, X, Y - canvasY);
            canvas.clearRect(0, 0, 500, 150 - Math.round((data.MilkCupAmount / 100) * 45));

            drawCanvas(data.CupCanvas, 0, canvasY);
            drawCanvasBlink(data.CupCanvas, 0, canvasY);
        }
    },
    管液: ({ data }, drawData) => {
        const { C, A, X, Y, drawCanvas, drawCanvasBlink } = drawData;
        const ratio1 = ((350 - 327) / (350 - 305)) * 100;
        data.HoseCanvas ??= AnimationGenerateTempCanvas(C, A, 500, 200);
        const source = Tools.getAssetURL(drawData);
        const canvas = data.HoseCanvas.getContext("2d");
        const canvasY = CanvasUpperOverflow + 300;
        // Y范围: 300 ~ 500

        if (typeof data.MilkCupAmount === "number" && typeof data.MilkProdFlow === "number") {
            // 327 ~ 440
            const pLen = 440 - 327;
            // 使用产量流速和杯内液体量的较大者，产量流速大和杯内液体多都会让液柱更长，液柱长度至少30
            const kRatio = Math.min(Math.max(data.MilkCupAmount / ratio1, data.MilkProdFlow / maxProdFlow), 1);

            // 低于 0.1 管子清空
            if (kRatio > 0.1) {
                canvas.clearRect(0, 0, 500, 200);
                DrawImageEx(source, canvas, X, Y - canvasY);

                // 产生液柱动画
                if (data.MilkCupAmount < ratio1 * 100) {
                    const len = Math.round(kRatio * (pLen - 10) + 10);
                    const sep = pLen - len;

                    const flowSpeed = 3;
                    const start = (((Date.now() / 1000) % flowSpeed) * pLen) / flowSpeed;
                    const startL = 27 + Math.round((start + data.RandomOffsetLeft) % pLen);
                    const startR = 27 + Math.round((start + data.RandomOffsetRight) % pLen);

                    for (let i = 0; i < 2; i++) {
                        const start = [startL, startR][i];
                        canvas.clearRect(250 * i, start - pLen, 250, sep);
                        canvas.clearRect(250 * i, start, 250, sep);
                        canvas.clearRect(250 * i, start + pLen, 250, sep);
                    }
                }

                drawCanvas(data.HoseCanvas, 0, canvasY);
                drawCanvasBlink(data.HoseCanvas, 0, canvasY);
            }
        }
    },
    出液: ({ data, fillingLeft, fillingRight }, drawData) => {
        const { C, A, X, Y, drawCanvas, drawCanvasBlink } = drawData;
        data.OutputFlowCanvas ??= AnimationGenerateTempCanvas(C, A, 500, 200);
        const source = Tools.getAssetURL(drawData);
        const canvas = data.OutputFlowCanvas.getContext("2d");
        const canvasY = CanvasUpperOverflow + 400;

        if (fillingLeft || fillingRight) {
            canvas.clearRect(0, 0, 500, 200);
            DrawImageEx(source, canvas, X, Y - canvasY);
            if (!fillingLeft) canvas.clearRect(0, 0, 250, 200);
            if (!fillingRight) canvas.clearRect(250, 0, 250, 200);

            drawCanvas(data.OutputFlowCanvas, 0, canvasY);
            drawCanvasBlink(data.OutputFlowCanvas, 0, canvasY);
        }
    },
    杯液: ({ data, property, fillingLeft, fillingRight, filledLeft, filledRight }, drawData) => {
        const { C, A, X, Y, drawCanvas, drawCanvasBlink } = drawData;
        data.OutputContentCanvas ??= AnimationGenerateTempCanvas(C, A, 500, 200);
        const source = Tools.getAssetURL(drawData);
        const canvas = data.OutputContentCanvas.getContext("2d");
        const canvasY = CanvasUpperOverflow + 400;

        if (fillingLeft || fillingRight || filledLeft || filledRight) {
            canvas.clearRect(0, 0, 500, 200);
            DrawImageEx(source, canvas, X, Y - canvasY);

            // 495 ~ 530
            const now = Date.now();
            const clearTop = (start) => 135 - Math.round(Math.min((now - start) / 2000, 1) * (530 - 495));

            if (fillingLeft) canvas.clearRect(0, 0, 250, clearTop(property.Luzi_OutputStartLeft));
            else if (!filledLeft) canvas.clearRect(0, 0, 250, 200);
            if (fillingRight) canvas.clearRect(250, 0, 250, clearTop(property.Luzi_OutputStartRight));
            else if (!filledRight) canvas.clearRect(250, 0, 250, 200);

            drawCanvas(data.OutputContentCanvas, 0, canvasY);
            drawCanvasBlink(data.OutputContentCanvas, 0, canvasY);
        }
    },
    杯半: ({ data, fillingLeft, fillingRight, filledLeft, filledRight }, drawData) => {
        const { C, A, X, Y, drawCanvas, drawCanvasBlink } = drawData;
        data.OutputCupCanvas ??= AnimationGenerateTempCanvas(C, A, 500, 200);
        const source = Tools.getAssetURL(drawData);
        const canvas = data.OutputContentCanvas.getContext("2d");
        const canvasY = CanvasUpperOverflow + 400;

        if (fillingLeft || fillingRight || filledLeft || filledRight) {
            canvas.clearRect(0, 0, 500, 200);
            DrawImageEx(source, canvas, X, Y - canvasY);
            if (!filledLeft && !fillingLeft) canvas.clearRect(0, 0, 250, 200);
            if (!filledRight && !fillingRight) canvas.clearRect(250, 0, 250, 200);
            drawCanvas(data.OutputContentCanvas, 0, canvasY);
            drawCanvasBlink(data.OutputContentCanvas, 0, canvasY);
        }
    },
});

/** @type {ExtendedItemScriptHookCallbacks.AfterDraw<ModularItemData, MilkCupData>} */
function afterDraw(_, originalFunction, drawData) {
    afterDrawProcess.afterDraw(_, originalFunction, drawData);
}

const buttons = Typing.record({
    左: /** @type {Rect} */ ({ x: 1265, y: 600, w: 225, h: 55 }),
    右: /** @type {Rect} */ ({ x: 1510, y: 600, w: 225, h: 55 }),
    左手: /** @type {Rect} */ ({ x: 1265, y: 890, w: 225, h: 55 }),
    右手: /** @type {Rect} */ ({ x: 1510, y: 890, w: 225, h: 55 }),
});

/**
 * @param {Rect} rect
 * @returns {boolean}
 */
export function RMouseIn(rect) {
    return MouseIn(rect.x, rect.y, rect.w, rect.h);
}

/** @type {(item:Item, cb: (p : MilkingVendorProperties) => boolean ) => boolean} */
const propTest = (item, cb) => cb(/** @type {MilkingVendorProperties} */ (item.Property ?? {}));

/**
 * @template T
 * @param {Item} item
 * @param {(p: MilkingVendorProperties) => T} cb
 * @returns T
 */
const propValue = (item, cb) => cb(/** @type {MilkingVendorProperties} */ (item.Property ?? {}));

const itemDialog = createItemDialogModular(
    [
        {
            location: buttons.左,
            key: "拿左杯",
            show: ({ data, item }) =>
                data.currentModule === "Base" &&
                propTest(item, (p) => p.Luzi_OutputDoneLeft === true || typeof p.Luzi_OutputStartLeft === "number"),
            enable: ({ item }) => propTest(item, (p) => p.Luzi_OutputDoneLeft === true),
            onclick: ({ item }) => propValue(item, (p) => (p.Luzi_OutputDoneLeft = null)),
            actionKey: "A拿左杯",
        },
        {
            location: buttons.左,
            key: "开始左杯",
            show: ({ data, item }) =>
                data.currentModule === "Base" &&
                propTest(item, (p) => p.Luzi_OutputDoneLeft !== true && typeof p.Luzi_OutputStartLeft !== "number"),
            enable: ({ item }) => propTest(item, (p) => p.Luzi_MilkTotal >= 200),
            hover: ({ item }) => propValue(item, (p) => (p.Luzi_MilkTotal < 200 ? "牛奶存量不足" : undefined)),
            onclick: ({ item }) =>
                propValue(item, (p) => {
                    p.Luzi_OutputStartLeft = Date.now();
                    p.Luzi_MilkTotal -= 200;
                }),
            actionKey: "A开始左杯",
        },
        {
            location: buttons.右,
            key: "拿右杯",
            show: ({ data, item }) =>
                data.currentModule === "Base" &&
                propTest(item, (p) => p.Luzi_OutputDoneRight === true || typeof p.Luzi_OutputStartRight === "number"),
            enable: ({ item }) => propTest(item, (p) => p.Luzi_OutputDoneRight === true),
            onclick: ({ item }) => propValue(item, (p) => (p.Luzi_OutputDoneRight = null)),
            actionKey: "A拿右杯",
        },
        {
            location: buttons.右,
            key: "开始右杯",
            show: ({ data, item }) =>
                data.currentModule === "Base" &&
                propTest(item, (p) => p.Luzi_OutputDoneRight !== true && typeof p.Luzi_OutputStartRight !== "number"),
            enable: ({ item }) => propTest(item, (p) => p.Luzi_MilkTotal >= 200),
            hover: ({ item }) => propValue(item, (p) => (p.Luzi_MilkTotal < 200 ? "牛奶存量不足" : undefined)),
            onclick: ({ item }) =>
                propValue(item, (p) => {
                    p.Luzi_OutputStartRight = Date.now();
                    p.Luzi_MilkTotal -= 200;
                }),
            actionKey: "A开始右杯",
        },
        .../** @type {[["左","Left"],["右","Right"]]}*/ ([
            ["左", "Left"],
            ["右", "Right"],
        ]).flatMap(([cn, en]) => [
            {
                location: buttons[`${cn}手`],
                key: `D${cn}放`,
                show: ({ data, item }) =>
                    data.currentModule === "Base" &&
                    propTest(
                        item,
                        (p) => p[`Luzi_OutputDone${en}`] !== true && typeof p[`Luzi_OutputStart${en}`] !== "number"
                    ),
                enable: ({ item }) => {
                    if (!Player.CanInteract()) return false;
                    const handItem = InventoryGet(Player, "ItemHandheld");
                    if (!handItem) return false;
                    if (handItem.Asset.Name !== "杯饮" || handItem.Property?.TypeRecord?.typed !== 0) return false;
                    if (propTest(item, (p) => p.Luzi_MilkTotal < 200)) return false;
                    return true;
                },
                onclick: ({ item }) => {
                    const handItem = InventoryGet(Player, "ItemHandheld");
                    if (!handItem) return;
                    handItem.Property ??= {};
                    propValue(item, (p) => {
                        p[`Luzi_Content${en}`] = Container.item2content(handItem);
                        p[`Luzi_OutputStart${en}`] = Date.now();
                        p.Luzi_MilkTotal -= 200;
                    });
                    InventoryRemove(Player, "ItemHandheld", true);
                },
                hover: ({ item }) => {
                    if (!Player.CanInteract()) return "H互动";
                    const handItem = InventoryGet(Player, "ItemHandheld");
                    if (!handItem) return "H空杯";
                    if (handItem.Asset.Name !== "杯饮" || handItem.Property?.TypeRecord?.typed !== 0) return "H空杯";
                    if (propTest(item, (p) => p.Luzi_MilkTotal < 200)) return "H存量";
                    return undefined;
                },
                actionKey: `A${cn}放`,
            },
            {
                location: buttons[`${cn}手`],
                key: `D${cn}拿`,
                show: ({ data, item }) =>
                    data.currentModule === "Base" &&
                    propTest(
                        item,
                        (p) => p[`Luzi_OutputDone${en}`] === true || typeof p[`Luzi_OutputStart${en}`] === "number"
                    ),
                enable: ({ item }) =>
                    !InventoryGet(Player, "ItemHandheld") &&
                    Player.CanInteract() &&
                    propTest(item, (p) => p[`Luzi_OutputDone${en}`] === true),
                onclick: ({ item }) => {
                    propValue(item, (p) => {
                        if (p[`Luzi_Content${en}`])
                            Container.content2item(Player, p[`Luzi_Content${en}`], { typed: 3 });
                        p[`Luzi_OutputDone${en}`] = null;
                    });
                },
                hover: ({ item }) => {
                    if (!Player.CanInteract()) return "H互动";
                    if (InventoryGet(Player, "ItemHandheld")) return "H空手";
                    if (propTest(item, (p) => p.Luzi_OutputDoneLeft !== true)) return "H未满";
                    return undefined;
                },
                actionKey: `A${cn}拿`,
                leaveDialog: true,
            },
        ]),
    ],
    [
        {
            Y: 700,
            key: "产率",
            show: ({ data }) => data.currentModule === "Base",
            value: ({ item, chara }) => flowText(flowAlgorithm(chara, item)),
        },
        {
            Y: 775,
            key: "存量",
            show: ({ data }) => data.currentModule === "Base",
            value: ({ item }) => propValue(item, (p) => `${(p.Luzi_MilkTotal ?? 0).toFixed(2)} mL`),
        },
    ]
);

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    DrawImages: false,
    ScriptHooks: itemDialog.createHooks(["Draw", "Click"], {
        ScriptDraw: scriptDraw,
        BeforeDraw: beforeDraw,
        AfterDraw: afterDraw,
    }),
    ChatTags: Tools.CommonChatTags(),
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

function capitalizeFirst(str) {
    if (str.length === 0) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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
        牛奶存量不足: "需要至少200 mL牛奶",

        ...Object.fromEntries(
            ["左", "右"].flatMap((lr) => [
                [`拿${lr}杯`, `拿走${lr}边杯子`],
                [`开始${lr}杯`, `灌满${lr}边杯子`],
                [`A拿${lr}杯`, `SourceCharacter从DestinationCharacterAssetName${lr}边拿走一满杯牛奶`],
                [
                    `A开始${lr}杯`,
                    `SourceCharacter在DestinationCharacterAssetName${lr}边放了一个空玻璃杯，并开始注入牛奶`,
                ],
                [`D${lr}放`, `🖐️放在${lr}边`],
                [`D${lr}拿`, `🖐️从${lr}边拿走`],
                [`A${lr}放`, `SourceCharacter将手中的空杯放在DestinationCharacterAssetName${lr}边，并开始注入牛奶`],
                [`A${lr}拿`, `SourceCharacter从DestinationCharacterAssetName${lr}边拿走一满杯牛奶`],
            ])
        ),

        H互动: "你需要解开双手才能操作",
        H空杯: "你需要手持一个空杯才能放入",
        H空手: "你需要空手才能拿走",
        H存量: "机器内至少需要200 mL牛奶才能放入空杯",
        H未满: "杯子还没装满，不能拿走",
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
        牛奶存量不足: "At least 200 mL of milk is required",

        ...Object.fromEntries(
            [
                ["左", "left"],
                ["右", "right"],
            ].flatMap(([zh, en]) => [
                [`拿${zh}杯`, `Take ${capitalizeFirst(en)} Cup`],
                [`开始${zh}杯`, `Fill ${capitalizeFirst(en)} Cup`],
                [
                    `A拿${zh}杯`,
                    `SourceCharacter takes a full cup of milk from ${en} side of DestinationCharacter AssetName`,
                ],
                [
                    `A开始${zh}杯`,
                    `SourceCharacter places an empty glass on ${en} side of DestinationCharacter AssetName and starts filling it with milk`,
                ],
                [`D${zh}放`, `🖐️ Place on ${capitalizeFirst(en)}`],
                [`D${zh}拿`, `🖐️ Take from ${capitalizeFirst(en)}`],
                [
                    `A${zh}放`,
                    `SourceCharacter places an empty cup on ${en} side of DestinationCharacter AssetName and starts filling it with milk`,
                ],
                [
                    `A${zh}拿`,
                    `SourceCharacter takes a full cup of milk from ${en} side of DestinationCharacter AssetName`,
                ],
            ])
        ),

        H互动: "You need to free your hands to operate",
        H空杯: "You need to hold an empty cup to place in",
        H空手: "You need to have empty hands to take out",
        H存量: "The machine needs at least 200 mL of milk to place an empty cup in",
        H未满: "The cup is not full yet, you can't take it out",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, { translation, layerNames, extended, assetStrings });
    orgasmState.watch(OrgasmEvents);
}
