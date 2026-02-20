import { StateTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";
import { OrgasmEvents } from "@sugarch/bc-event-handler";
import { flowAlgorithm, flowText, maxProdFlow } from "../套装/Yaoki/牛奶贩卖机";
import { createItemDialogModular, Typing } from "../../lib";
import { holdsEmptyGlass, setGlassContent } from "./手持物/玻璃杯饮料";

const orgasmState = new StateTools.OrgasmState();

/**
 * @typedef {Object} MilkCupData
 * @property {number} MilkTimer
 * @property {number} MilkCupAmount
 * @property {number} MilkProdFlow
 * @property {number} MilkUpdateTimer
 * @property {true} [OrgasmCheckInit]
 * @property {number} RandomOffsetLeft
 * @property {number} RandomOffsetRight
 * @property {HTMLCanvasElement} [HoseCanvas]
 */

/**
 * @typedef {Object} PortableMilkPumpCustomProperties
 * @property {number} Luzi_MilkTotal
 */

/**
 * @typedef {ItemProperties & PortableMilkPumpCustomProperties} PortableMilkPumpProperties
 */

const vIsWorking = (item) => item.Property?.TypeRecord?.s === 0;

const MilkMax = 3000;

/**
 * @param {number} delta
 * @param {MilkCupData} data
 * @param {DynamicScriptCallbackData<MilkCupData>} arg0
 * @returns {boolean} 是否需要推送
 */
function milkerStateUpdate(delta, data, { Item }) {
    let need_push = false;

    Item.Property ??= {};
    const property = /** @type {PortableMilkPumpProperties}*/ (Item.Property);

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
    if (property.Luzi_MilkTotal > MilkMax) property.Luzi_MilkTotal = MilkMax;

    const now = Date.now();
    if (!data.MilkUpdateTimer) data.MilkUpdateTimer = now;
    else if (now > 5000 + data.MilkUpdateTimer) {
        need_push = true;
        data.MilkUpdateTimer = now;
    }

    return need_push;
}

/**
 * @template T
 * @param {Item} item
 * @param {(p: PortableMilkPumpProperties) => T} cb
 * @returns T
 */
const propValue = (item, cb) => cb(/** @type {PortableMilkPumpProperties} */ (item.Property ?? {}));

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, MilkCupData>} */
function scriptDraw(data, originalFunction, drawData) {
    const { C, Item, PersistentData } = drawData;
    const Data = PersistentData();
    if (!vIsWorking(Item)) {
        delete Data.RandomOffsetLeft;
        delete Data.RandomOffsetRight;
        Data.MilkProdFlow = 0;
        Data.MilkCupAmount = 0;
    }
    Data.MilkProdFlow ??= 0;

    if (vIsWorking(Item)) {
        Tools.drawUpdate(C, Data);
    }

    const now = Date.now();

    let need_push = false;

    if (vIsWorking(Item)) {
        Data.MilkTimer ??= now;
        Data.MilkCupAmount ??= 0;
        Data.RandomOffsetLeft ??= Math.floor(Math.random() * 100);
        Data.RandomOffsetRight ??= Math.floor(Math.random() * 100);

        const delta = (now - Data.MilkTimer) / 1000;
        Data.MilkTimer = now;
        Data.MilkProdFlow = flowAlgorithm(C, Item, vIsWorking);

        // 每秒钟杯内值都会变成上一秒的 0.8
        const reductioned = Data.MilkCupAmount * Math.pow(0.8, delta);
        Data.MilkCupAmount = Math.min(Math.max(reductioned + Data.MilkProdFlow * delta, 0), 100);
        if (C.IsPlayer()) {
            if (milkerStateUpdate(delta, Data, drawData)) need_push = true;
        }
    }

    if (need_push) {
        ChatRoomCharacterItemUpdate(C, Item.Asset.Group.Name);
    }
}

const itemDialog = createItemDialogModular(
    [
        {
            location: { x: 1385, y: 850, w: 225, h: 55 },
            show: ({ data }) => data.currentModule === "Base",
            enable: ({ item, chara }) => !!holdsEmptyGlass(chara) && propValue(item, (p) => p.Luzi_MilkTotal > 200),
            hover: ({ item, chara }) => {
                if (!holdsEmptyGlass(chara)) return "D_NeedEmptyGlass";
                if (propValue(item, (p) => p.Luzi_MilkTotal <= 200)) return "D_NeedMoreMilk";
            },
            onclick: ({ item }) => {
                propValue(item, (p) => (p.Luzi_MilkTotal = Math.max((p.Luzi_MilkTotal ?? 0) - 200, 0)));
                const glass = holdsEmptyGlass(Player);
                setGlassContent(Player, glass, "牛奶");
                ChatRoomCharacterItemUpdate(Player, glass.Asset.Group.Name);
            },
            key: "D_TakeDrink",
            actionKey: "A_TakeDrink",
            leaveDialog: true,
        },
    ],
    [
        {
            Y: 700,
            key: "产率",
            show: ({ data }) => data.currentModule === "Base",
            value: ({ item, chara }) => flowText(flowAlgorithm(chara, item, vIsWorking)),
        },
        {
            Y: 765,
            key: "存量",
            show: ({ data }) => data.currentModule === "Base",
            value: ({ item }) =>
                propValue(
                    item,
                    (p) => `${(p.Luzi_MilkTotal ?? 0).toFixed(2)} mL ${p.Luzi_MilkTotal >= MilkMax ? "(满)" : ""}`
                ),
        },
    ]
);

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, MilkCupData>} */
function beforeDraw(mdata, originalFunction, { L, CA, PersistentData }) {
    const data = PersistentData();
    if (vIsWorking(CA) && data.MilkProdFlow / maxProdFlow < 0.1) {
        if (L === "不透明内" || L === "2_不透明") {
            return { Opacity: 0 };
        }
    }
}

/** @type {ExtendedItemScriptHookCallbacks.AfterDraw<ModularItemData, MilkCupData>} */
function afterDraw(mdata, originalFunction, drawData) {
    // 与牛奶贩卖机相似的液柱算法，只是不处理吸杯内的液体，没有杯内液体太多导致管子直接满的情况
    const { C, A, X, Y, L, PersistentData, drawCanvas, drawCanvasBlink } = drawData;
    if (L === "不透明") {
        const data = PersistentData();
        data.HoseCanvas ??= AnimationGenerateTempCanvas(C, A, 500, 200);
        const source = Tools.getAssetURL(drawData);
        const canvas = data.HoseCanvas.getContext("2d");
        const canvasY = CanvasUpperOverflow + 250;

        if (typeof data.MilkProdFlow === "number") {
            // 302 ~ 372
            const pLen = 372 - 302;
            const kRatio = Math.min(data.MilkProdFlow / maxProdFlow, 1);

            // 低于 0.1 管子清空
            if (kRatio > 0.1) {
                canvas.clearRect(0, 0, 500, 200);
                DrawImageEx(source, canvas, X, Y - canvasY);

                // 产生液柱动画
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

                drawCanvas(data.HoseCanvas, 0, canvasY);
                drawCanvasBlink(data.HoseCanvas, 0, canvasY);
            }
        }
    }
}

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const asset = [
    [
        {
            Name: "便携乳泵",
            Random: false,
            Gender: "F",
            Left: 180,
            Top: 280,
            Time: 20,
            Difficulty: 8,
            AllowLock: true,
            DrawLocks: false,
            DynamicGroupName: "ItemTorso",
            Prerequisite: ["HasBreasts", "AccessBreast", "AccessBreastSuitZip"],
            ParentGroup: "BodyUpper",
            ArousalZone: "ItemBreast",
            Priority: 16,
            PoseMapping: { AllFours: "Hide" },
            Layer: [
                ...Typing.layerMap([{ Name: "瓶子" }, { Name: "固定" }, { Name: "泵体" }, { Name: "泵瓶" }], (l) => ({
                    ParentGroup: {},
                    Priority: 5,
                    ColorGroup: "背包",
                    ...l,
                })),
                { Name: "2_不透明", Priority: 5, AllowTypes: { s: 0 }, AllowColorize: false },
                { Name: "2_管子", Priority: 5, AllowTypes: { s: 0 } },
                { Name: "外橡胶", AllowTypes: { s: 0 }, ColorGroup: "橡胶" },
                { Name: "不透明内", AllowTypes: { s: 0 }, AllowColorize: false },
                { Name: "内玻璃", AllowTypes: { s: 0 }, ColorGroup: "吸杯" },
                { Name: "泵", AllowTypes: { s: 0 } },
                { Name: "外玻璃", AllowTypes: { s: 0 }, ColorGroup: "吸杯" },
                { Name: "内橡胶", AllowTypes: { s: 0 }, ColorGroup: "橡胶" },
                { Name: "不透明", AllowTypes: { s: 0 }, AllowColorize: false, HasImage: false },
                { Name: "管子", AllowTypes: { s: 0 }, CopyLayerColor: "2_管子" },
            ],
        },
        {
            layerNames: {
                CN: {
                    "背包": "背包",
                    "橡胶": "橡胶",
                    "吸杯": "吸杯",

                    "瓶子": "瓶子",
                    "固定": "固定",
                    "泵体": "泵体",
                    "泵瓶": "泵瓶",

                    "2_管子": "管子",

                    "外橡胶": "外",

                    "内玻璃": "内",
                    "泵": "乳泵",
                    "外玻璃": "外",

                    "内橡胶": "内",
                },
                EN: {
                    "背包": "Backpack",
                    "橡胶": "Rubber",
                    "吸杯": "Suction Cup",

                    "瓶子": "Bottle",
                    "固定": "Fixed",
                    "泵体": "Pump Body",
                    "泵瓶": "Pump Bottle",

                    "2_管子": "Tube",

                    "外橡胶": "Outer",

                    "内玻璃": "Inner",
                    "泵": "Pump",
                    "外玻璃": "Outer",

                    "内橡胶": "Inner",
                },
            },
            translation: { CN: "便携乳泵", EN: "Portable Breast Pump" },
            extended: {
                Archetype: "modular",
                ChatTags: Tools.CommonChatTags(),
                ScriptHooks: itemDialog.createHooks(["Draw", "Click"], {
                    ScriptDraw: scriptDraw,
                    BeforeDraw: beforeDraw,
                    AfterDraw: afterDraw,
                }),
                DrawImages: false,
                Modules: [
                    {
                        Name: "Suction",
                        Key: "s",
                        Options: [
                            {
                                HasSubscreen: true,
                                Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
                                Property: { Block: ["ItemNipples"] },
                                ArchetypeConfig: { Archetype: ExtendedArchetype.VIBRATING },
                            },
                            {},
                        ],
                    },
                ],
            },
            assetStrings: {
                CN: {
                    SelectBase: "配置便携乳泵",

                    ModuleSuction: "吸杯",
                    SelectSuction: "配置吸杯",
                    Options0: "配置强度",
                    Options1: "移除吸杯",

                    Sets0: "SourceCharacter给DestinationCharacterAssetName安装上了吸杯。",
                    Sets1: "SourceCharacter移除了DestinationCharacterAssetName的吸杯。",

                    产率: "产率",
                    存量: "机器存量",

                    D_TakeDrink: "🖐装一杯饮料",
                    A_TakeDrink: "SourceCharacter从DestinationCharacterAssetName中装了一杯饮料。",
                    D_NeedEmptyGlass: "需要手持一个空的玻璃杯",
                    D_NeedMoreMilk: "需要机器内有200mL牛奶",
                },
                EN: {
                    SelectBase: "Configure Portable Breast Pump",

                    ModuleSuction: "Suction Cup",
                    SelectSuction: "Configure Suction Cup",
                    Options0: "Configure Strength",
                    Options1: "Remove Suction Cup",

                    Sets0: "SourceCharacter equipped a suction cup on DestinationCharacter AssetName.",
                    Sets1: "SourceCharacter removed the suction cup from DestinationCharacter AssetName.",

                    产率: "Flow Rate",
                    存量: "Total Volume",

                    D_TakeDrink: "🖐Take a Drink",
                    A_TakeDrink: "SourceCharacter took a drink from DestinationCharacter AssetName.",
                    D_NeedEmptyGlass: "Need to hold an empty glass",
                    D_NeedMoreMilk: "Need at least 200mL of milk in the machine",
                },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(["ItemTorso"], asset);
    orgasmState.watch(OrgasmEvents);
}
