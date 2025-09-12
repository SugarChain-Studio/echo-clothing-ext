import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";
import { createItemDialog, Typing } from "../../lib";
import { monadic } from "@mod-utils/monadic";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "托盘",
    Random: false,
    Gender: "F",
    Left: 80,
    Top: 300,
    Difficulty: 5,
    Time: 10,
    AllowLock: true,
    AllowTighten: true,
    Priority: 44,
    DynamicGroupName: "ItemTorso",
    ParentGroup: {},
    ExpressionTrigger: [
        { Name: "Closed", Group: "Eyes", Timer: 2 },
        { Name: "Medium", Group: "Blush", Timer: 10 },
    ],
    Layer: [
        {
            Name: "皮带",
            Priority: 15,
            PoseMapping: {
                AllFours: "Hide",
                Hogtied: "Hide",
            },
        },
        { Name: "盘手柄" },
        { Name: "盘" },
        { Name: "曲奇", Left: 170, Top: 360, HasImage: false, AllowColorize: false },
        { Name: "饮料", Left: 0, Top: 320, HasImage: false, AllowColorize: false },
        { Name: "盘前", CopyLayerColor: "盘" },
        { Name: "盘绳柄" },
        { Name: "链条", ParentGroup: "BodyUpper" },
    ],
};

const layerNames = {
    CN: {
        链条: "链条",
        盘绳柄: "锁链固定",
        橙汁: "橙汁",
        盘: "托盘",
        盘手柄: "托盘手柄",
        皮带: "腰部皮带",
    },
    EN: {
        链条: "Chain",
        盘绳柄: "Chain Handle",
        橙汁: "Orange Juice",
        盘: "Tray",
        盘手柄: "Tray Handle",
        皮带: "Belt",
    },
};

const drinkType = /** @type {["橙汁", "牛奶", "可乐"]}*/ (["橙汁", "牛奶", "可乐"]);
const drinkTypeWEmpty = ["空杯", "橙汁", "可乐", "牛奶"];

/**
 * @typedef { "曲奇" | "饮料" } ContentsType
 */

/**
 * @typedef { Omit<Item,"Asset"> & { IAsset?: string} } ContentData
 */

/**
 * @typedef { { Luzi_InventoryContent: ContentData[], Luzi_InventoryType?: ContentsType } } TrayData
 */

/**
 * @typedef { globalThis.ItemProperties & TrayData } ExtendItemProperties
 */

const maxv = Typing.record({
    曲奇: 12,
    饮料: 4,
});

/** @typedef {(property:ExtendItemProperties)=>boolean} PropCheck */

const checks = Typing.transform(
    {
        IsExtend: /** @type {(property:ItemProperties)=> property is ExtendItemProperties} */ (property) =>
            property && Array.isArray(/** @type {any}*/ (property).Luzi_InventoryContent),
        Empty: /** @type {PropCheck} */ (property) => property.Luzi_InventoryContent.length === 0,
        Is曲奇: /** @type {PropCheck} */ (property) => property.Luzi_InventoryType === "曲奇",
        Is饮料: /** @type {PropCheck} */ (property) => property.Luzi_InventoryType === "饮料",
    },
    (prev) => ({
        ...prev,
        曲奇CanInc: /** @type {PropCheck} */ (property) =>
            prev.Empty(property) || (prev.Is曲奇(property) && property.Luzi_InventoryContent.length < maxv.曲奇),
        曲奇CanDec: /** @type {PropCheck} */ (property) =>
            prev.Is曲奇(property) && property.Luzi_InventoryContent.length > 0,
        饮料CanInc: /** @type {PropCheck} */ (property) =>
            prev.Empty(property) ||
            (prev.Is饮料(property) && property.Luzi_InventoryContent.filter((it) => it.IAsset).length < maxv.饮料),
        可乐CanDec: /** @type {PropCheck} */ (property) =>
            prev.Is饮料(property) && property.Luzi_InventoryContent.some((item) => item.IAsset === "可乐"),
        橙汁CanDec: /** @type {PropCheck} */ (property) =>
            prev.Is饮料(property) && property.Luzi_InventoryContent.some((item) => item.IAsset === "橙汁"),
        牛奶CanDec: /** @type {PropCheck} */ (property) =>
            prev.Is饮料(property) && property.Luzi_InventoryContent.some((item) => item.IAsset === "牛奶"),

        AnyCanDec: /** @type {PropCheck} */ (property) =>
            (prev.Is曲奇(property) && property.Luzi_InventoryContent.length > 0) ||
            (prev.Is饮料(property) && property.Luzi_InventoryContent.filter((it) => it.IAsset).length > 0),
    })
);

const buttons = Typing.record({
    曲奇加一: { x: 1265, y: 500, w: 225, h: 55 },
    曲奇减一: { x: 1510, y: 500, w: 225, h: 55 },
    曲奇加满: { x: 1385, y: 560, w: 225, h: 55 },

    加橙汁: { x: 1140, y: 650, w: 225, h: 55 },
    加牛奶: { x: 1385, y: 650, w: 225, h: 55 },
    加可乐: { x: 1630, y: 650, w: 225, h: 55 },

    拿橙汁: { x: 1140, y: 710, w: 225, h: 55 },
    拿牛奶: { x: 1385, y: 710, w: 225, h: 55 },
    拿可乐: { x: 1630, y: 710, w: 225, h: 55 },

    清空: { x: 1385, y: 800, w: 225, h: 55 },

    手上拿: { x: 1265, y: 890, w: 225, h: 55 },
    手上放: { x: 1510, y: 890, w: 225, h: 55 },
});

/** @type {ItemDialog.ButtonConfig<NoArchItemData>["actionProcess"]} */
const actionProcess = (dict, item) =>
    dict.text("TCounter", `${/** @type {ExtendItemProperties}*/ (item.Property).Luzi_InventoryContent.length}`);

/**
 * @param {Item} item
 * @returns {Item | null}
 */
function takeItem(item) {
    const props = /**@type {ExtendItemProperties}*/ (item.Property);
    const type = props?.Luzi_InventoryType;
    if (!type) return null;
    if (type === "饮料") {
        const validTarget = props.Luzi_InventoryContent.filter((it) => it.IAsset);
        const target = Math.floor(Math.random() * validTarget.length);
        const value = validTarget[target];

        const idx = props.Luzi_InventoryContent.indexOf(value);
        props.Luzi_InventoryContent[idx] = {};

        const item = InventoryWear(Player, "杯饮", "ItemHandheld");
        if (!item) return undefined;
        Object.assign(item, { ...value, IAsset: undefined, Asset: item.Asset });
        const typed = drinkTypeWEmpty.indexOf(value.IAsset);
        if (typed < 0) return undefined;
        item.Property ??= {};
        ExtendedItemSetOptionByRecord(Player, item, { typed });
        return item;
    } else if (type === "曲奇") {
        const target = Math.floor(Math.random() * props.Luzi_InventoryContent.length);
        const value = props.Luzi_InventoryContent.splice(target, 1)[0];

        const item = InventoryWear(Player, "曲奇", "ItemHandheld");
        if (!item) return undefined;
        Object.assign(item, { ...value, IAsset: undefined, Asset: item.Asset });
        return item;
    }
    return null;
}

const itemDialog = createItemDialog("noarch", [
    {
        location: buttons.曲奇加一,
        key: "D曲奇加一",
        enable: ({ item }) => checks.IsExtend(item.Property) && checks.曲奇CanInc(item.Property),
        onclick: ({ item }) => {
            const property = /** @type {ExtendItemProperties}*/ (item.Property);
            property.Luzi_InventoryType = "曲奇";
            if (!Array.isArray(property.Luzi_InventoryContent)) property.Luzi_InventoryContent = [];
            property.Luzi_InventoryContent.push({});
        },
        actionKey: "A曲奇加一",
        actionProcess,
    },
    {
        location: buttons.曲奇减一,
        key: "D曲奇减一",
        enable: ({ item }) => checks.IsExtend(item.Property) && checks.曲奇CanDec(item.Property),
        onclick: ({ item }) => {
            const property = /** @type {ExtendItemProperties}*/ (item.Property);
            property.Luzi_InventoryType = "曲奇";
            property.Luzi_InventoryContent.shift();
        },
        actionKey: "A曲奇减一",
        actionProcess,
    },
    {
        location: buttons.曲奇加满,
        key: "D曲奇加满",
        enable: ({ item }) => checks.IsExtend(item.Property) && checks.曲奇CanInc(item.Property),
        onclick: ({ item }) => {
            const property = /** @type {ExtendItemProperties}*/ (item.Property);
            property.Luzi_InventoryType = "曲奇";
            property.Luzi_InventoryContent = Array.from({ length: maxv.曲奇 }, () => ({}));
        },
        actionKey: "A曲奇加满",
        actionProcess,
    },
    .../** @type {["橙汁", "牛奶", "可乐"]}*/ (["橙汁", "牛奶", "可乐"]).flatMap(
        (drink) =>
            /** @type {ItemDialog.ButtonConfig<ModularItemData>[]}*/ ([
                {
                    location: buttons[`加${drink}`],
                    key: `D加${drink}`,
                    enable: ({ item }) => checks.IsExtend(item.Property) && checks.饮料CanInc(item.Property),
                    onclick: ({ item }) => {
                        const property = /** @type {ExtendItemProperties}*/ (item.Property);
                        property.Luzi_InventoryType = "饮料";
                        if (property.Luzi_InventoryContent.length < maxv.饮料)
                            property.Luzi_InventoryContent.push({ IAsset: drink });
                        else property.Luzi_InventoryContent.find((it) => !it.IAsset).IAsset = drink;
                    },
                    actionKey: `A加${drink}`,
                    actionProcess,
                },
                {
                    location: buttons[`拿${drink}`],
                    key: `D拿${drink}`,
                    enable: ({ item }) => checks.IsExtend(item.Property) && checks[`${drink}CanDec`](item.Property),
                    onclick: ({ item }) => {
                        const property = /** @type {ExtendItemProperties}*/ (item.Property);
                        property.Luzi_InventoryType = "饮料";
                        const targets = property.Luzi_InventoryContent.filter((it) => it.IAsset === drink);
                        if (targets.length > 0) {
                            targets[Math.floor(Math.random() * targets.length)].IAsset = undefined;
                        }
                    },
                    actionKey: `A拿${drink}`,
                    actionProcess,
                },
            ])
    ),
    {
        location: buttons.清空,
        key: "D清空",
        enable: ({ item }) => checks.IsExtend(item.Property) && !checks.Empty(item.Property),
        onclick: ({ item }) => {
            const property = /** @type {ExtendItemProperties}*/ (item.Property);
            property.Luzi_InventoryType = null;
            property.Luzi_InventoryContent = [];
        },
        actionKey: `A清空`,
        actionProcess,
    },
    {
        location: buttons.手上拿,
        key: "D拿到手上",
        enable: ({ item }) =>
            !InventoryGet(Player, "ItemHandheld") && checks.IsExtend(item.Property) && checks.AnyCanDec(item.Property),
        hover: () => (!InventoryGet(Player, "ItemHandheld") && Player.CanInteract() ? undefined : "手必须空"),
        actionKey: "A拿到手上",
        actionProcess: (dict, item) => {
            const taken = takeItem(item);
            if (taken) dict.asset(taken.Asset, "TakedItemName", taken.Craft?.Name);
        },
    },
]);

const drinksImgs = { 橙汁: "橙汁", 牛奶: "牛奶", 可乐: "可乐", 空杯: "空杯" };

/** @type {ExtendedItemScriptHookCallbacks.AfterDraw<NoArchItemData, {}>} */
function afterDraw(data, originalFunction, drawData) {
    const { L, Property, C, X, Y, A, AlphaMasks, drawCanvas, drawCanvasBlink } = drawData;
    const property = /** @type {ExtendItemProperties} */ (Property);
    if (!Array.isArray(property.Luzi_InventoryContent) && typeof property.Luzi_InventoryType !== "string") return;
    if (L === "曲奇" && property.Luzi_InventoryType === "曲奇") {
        const canvas = AnimationGenerateTempCanvas(C, A, 160, 40);
        const idx = property.Luzi_InventoryContent.length.toString().padStart(2, "0");
        const imgURL = Tools.getAssetURL(drawData, `曲奇${idx}`);
        const ctx = canvas.getContext("2d");
        DrawImageEx(imgURL, ctx, 0, 0);
        drawCanvas(canvas, X, Y, AlphaMasks);
        drawCanvasBlink(canvas, X, Y, AlphaMasks);
    } else if (L === "饮料" && property.Luzi_InventoryType === "饮料") {
        const canvas = AnimationGenerateTempCanvas(C, A, 500, 70);
        const ctx = canvas.getContext("2d");
        for (let i = 0; i < maxv.饮料; i++) {
            const a = property.Luzi_InventoryContent[i];
            if (!a) continue;
            const name = a.IAsset && drinksImgs[a.IAsset];
            if (!name) continue;
            const imgURL = Tools.getAssetURL(drawData, name);
            const margin = 170;
            DrawImageEx(imgURL, ctx, margin + (i * (500 - margin * 2 - 40)) / (maxv.饮料 - 1), 0);
        }
        drawCanvas(canvas, X, Y, AlphaMasks);
        drawCanvasBlink(canvas, X, Y, AlphaMasks);
    }
    return undefined;
}

/**@type {NoArchItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.NOARCH,
    ChatTags: Tools.CommonChatTags(),
    ScriptHooks: itemDialog.createHooks(["Draw", "Click"], {
        AfterDraw: afterDraw,
    }),
    BaselineProperty: /** @type {ExtendItemProperties}*/ ({ Luzi_InventoryContent: [] }),
};

const translation = {
    CN: "托盘",
    EN: "Tray",
};

const assetStrings = {
    CN: {
        DBase: "配置托盘的内容物",

        D曲奇加一: "曲奇加一",
        D曲奇加满: "曲奇加满",
        D曲奇减一: "曲奇减一",

        A曲奇加一: "SourceCharacter在DestinationCharacterAssetName中放了一片曲奇，现在有TCounter片曲奇。",
        A曲奇加满: "SourceCharacter在DestinationCharacterAssetName中放满了曲奇，现在有TCounter片曲奇。",
        A曲奇减一: "SourceCharacter从DestinationCharacterAssetName中拿走了一片曲奇，现在有TCounter片曲奇。",

        D加牛奶: "放一杯牛奶",
        D加可乐: "放一杯可乐",
        D加橙汁: "放一杯橙汁",

        A加牛奶: "SourceCharacter在DestinationCharacterAssetName中放了一杯牛奶。",
        A加可乐: "SourceCharacter在DestinationCharacterAssetName中放了一杯可乐。",
        A加橙汁: "SourceCharacter在DestinationCharacterAssetName中放了一杯橙汁。",

        D拿牛奶: "拿一杯牛奶",
        D拿可乐: "拿一杯可乐",
        D拿橙汁: "拿一杯橙汁",

        A拿牛奶: "SourceCharacter从DestinationCharacterAssetName中拿走了一杯牛奶。",
        A拿可乐: "SourceCharacter从DestinationCharacterAssetName中拿走了一杯可乐。",
        A拿橙汁: "SourceCharacter从DestinationCharacterAssetName中拿走了一杯橙汁。",

        D清空: "清空托盘",
        A清空: "SourceCharacter清空了DestinationCharacterAssetName中的内容物。",

        D拿到手上: "🖐拿到手上",
        手必须空: "你必须手中为空才能拿走",
        A拿到手上: "SourceCharacter从DestinationCharacterAssetName中拿走了TakedItemName",
    },
    EN: {
        DBase: "Configure the contents of the Tray",

        D曲奇加一: "Add one Cookie",
        D曲奇加满: "Fill Cookies",
        D曲奇减一: "Remove one Cookie",

        A曲奇加一: "SourceCharacter added a Cookie to DestinationCharacter AssetName, now there are TCounter Cookies.",
        A曲奇加满:
            "SourceCharacter filled DestinationCharacter AssetName with Cookies, now there are TCounter Cookies.",
        A曲奇减一:
            "SourceCharacter removed a Cookie from DestinationCharacter AssetName, now there are TCounter Cookies.",

        D加牛奶: "Add Milk",
        D加可乐: "Add Cola",
        D加橙汁: "Add Orange Juice",

        A加牛奶: "SourceCharacter added a cup of milk to DestinationCharacter AssetName.",
        A加可乐: "SourceCharacter added a cup of cola to DestinationCharacter AssetName.",
        A加橙汁: "SourceCharacter added a cup of orange juice to DestinationCharacter AssetName.",

        D拿牛奶: "Take Milk",
        D拿可乐: "Take Cola",
        D拿橙汁: "Take Orange Juice",

        A拿牛奶: "SourceCharacter took a cup of milk from DestinationCharacter AssetName.",
        A拿可乐: "SourceCharacter took a cup of cola from DestinationCharacter AssetName.",
        A拿橙汁: "SourceCharacter took a cup of orange juice from DestinationCharacter AssetName.",

        D清空: "Clear the tray",
        A清空: "SourceCharacter cleared the contents of DestinationCharacter AssetName.",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ItemTorso", asset, { extended, translation, layerNames, assetStrings });
}
