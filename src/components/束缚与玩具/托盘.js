import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";
import { Typing } from "../../lib";
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

/**@type {NoArchItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.NOARCH,
    ChatTags: Tools.CommonChatTags(),
    ScriptHooks: {
        Draw: dialogDrawHook,
        Click: dialogClickHook,
        AfterDraw: afterDraw,
    },
    BaselineProperty: /** @type {ExtendItemProperties}*/ ({ Luzi_InventoryContent: [] }),
};

const maxv = Typing.record({
    曲奇: 12,
    饮料: 4,
});

const checks = Typing.transform(
    Typing.record({
        Empty: (property) => property.Luzi_InventoryContent.length === 0,
        Is曲奇: (property) => property.Luzi_InventoryType === "曲奇",
        Is饮料: (property) => property.Luzi_InventoryType === "饮料",
    }),
    (prev) =>
        Typing.record({
            ...prev,
            曲奇CanInc: (property) =>
                prev.Empty(property) || (prev.Is曲奇(property) && property.Luzi_InventoryContent.length < maxv.曲奇),
            曲奇CanDec: (property) => prev.Is曲奇(property) && property.Luzi_InventoryContent.length > 0,
            饮料CanInc: (property) =>
                prev.Empty(property) ||
                (prev.Is饮料(property) && property.Luzi_InventoryContent.filter((it) => it.IAsset).length < maxv.饮料),
            可乐CanDec: (property) =>
                prev.Is饮料(property) && property.Luzi_InventoryContent.some((item) => item.IAsset === "可乐"),
            橙汁CanDec: (property) =>
                prev.Is饮料(property) && property.Luzi_InventoryContent.some((item) => item.IAsset === "橙汁"),
            牛奶CanDec: (property) =>
                prev.Is饮料(property) && property.Luzi_InventoryContent.some((item) => item.IAsset === "牛奶"),
        })
);

/**
 * @typedef {Object} ButtonProperty
 * @property {Rect} location
 * @property {(item:Item) => boolean} enable
 * @property {string} key
 * @property {(item:Item) => void} onclick
 * @property {true} [update]
 * @property {true | ((dict:DictionaryBuilder, item:Item)=>DictionaryBuilder)} [action]
 */

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
});

/** @type {ButtonProperty["action"]} */
const action = (dict, item) =>
    dict.text("TCounter", `${/** @type {ExtendItemProperties}*/ (item.Property).Luzi_InventoryContent.length}`);

/** @type {ButtonProperty[]} */
const buttonProps = [
    {
        location: buttons.曲奇加一,
        key: "曲奇加一",
        enable: (item) => checks.曲奇CanInc(item.Property),
        onclick: (item) => {
            const property = /** @type {ExtendItemProperties}*/ (item.Property);
            property.Luzi_InventoryType = "曲奇";
            if (!Array.isArray(property.Luzi_InventoryContent)) property.Luzi_InventoryContent = [];
            property.Luzi_InventoryContent.push({});
        },
    },
    {
        location: buttons.曲奇减一,
        key: "曲奇减一",
        enable: (item) => checks.曲奇CanDec(item.Property),
        onclick: (item) => {
            const property = /** @type {ExtendItemProperties}*/ (item.Property);
            property.Luzi_InventoryType = "曲奇";
            property.Luzi_InventoryContent.shift();
        },
    },
    {
        location: buttons.曲奇加满,
        key: "曲奇加满",
        enable: (item) => checks.曲奇CanInc(item.Property),
        onclick: (item) => {
            const property = /** @type {ExtendItemProperties}*/ (item.Property);
            property.Luzi_InventoryType = "曲奇";
            property.Luzi_InventoryContent = Array.from({ length: maxv.曲奇 }, () => ({}));
        },
    },
    .../** @type {["橙汁", "牛奶", "可乐"]}*/ (["橙汁", "牛奶", "可乐"]).flatMap(
        (drink) =>
            /** @type {ButtonProperty[]}*/ ([
                {
                    location: buttons[`加${drink}`],
                    key: `加${drink}`,
                    enable: (item) => checks.饮料CanInc(item.Property),
                    onclick: (item) => {
                        const property = /** @type {ExtendItemProperties}*/ (item.Property);
                        property.Luzi_InventoryType = "饮料";
                        if (property.Luzi_InventoryContent.length < maxv.饮料)
                            property.Luzi_InventoryContent.push({ IAsset: drink });
                        else property.Luzi_InventoryContent.find((it) => !it.IAsset).IAsset = drink;
                    },
                },
                {
                    location: buttons[`拿${drink}`],
                    key: `拿${drink}`,
                    enable: (item) => checks[`${drink}CanDec`](item.Property),
                    onclick: (item) => {
                        const property = /** @type {ExtendItemProperties}*/ (item.Property);
                        property.Luzi_InventoryType = "饮料";
                        const targets = property.Luzi_InventoryContent.filter((it) => it.IAsset === drink);
                        if (targets.length > 0) {
                            targets[Math.floor(Math.random() * targets.length)].IAsset = undefined;
                        }
                    },
                },
            ])
    ),
    {
        location: buttons.清空,
        key: "清空",
        enable: (item) => !checks.Empty(item.Property),
        onclick: (item) => {
            const property = /** @type {ExtendItemProperties}*/ (item.Property);
            property.Luzi_InventoryType = null;
            property.Luzi_InventoryContent = [];
        },
    },
].map((v) => /** @type {ButtonProperty}*/ ({ ...v, update: true, action }));

/** @type { ExtendedItemScriptHookCallbacks.Draw<NoArchItemData> } */
function dialogDrawHook(Data, originalFunction) {
    originalFunction();
    if (!DialogFocusItem) return;
    const customDialog = DialogTools.makeCustomDialogGenerator(DialogFocusItem.Asset.Name);
    const customDialogText = (t) => customDialog("D", t);
    const drawButton = (id, location) => ExtendedItemCustomDraw(customDialogText(id), location.x, location.y);
    const drawButtonDisable = (id, location) => {
        const rect = /** @type {RectTuple} */ (Object.values(location));
        DrawButton(...rect, AssetTextGet(customDialogText(id)), "Gray", null, null, true);
    };

    const prevAlign = MainCanvas.textAlign;
    MainCanvas.textAlign = "center";
    DrawText(customDialogText("Base"), 1385, 460, "White");

    for (const btn of buttonProps) {
        if (btn.enable(DialogFocusItem)) {
            drawButton(btn.key, btn.location);
        } else {
            drawButtonDisable(btn.key, btn.location);
        }
    }
    MainCanvas.textAlign = prevAlign;
}

/**
 * @param {Rect} rect
 * @returns {boolean}
 */
export function RMouseIn(rect) {
    return MouseIn(rect.x, rect.y, rect.w, rect.h);
}

/** @type {ExtendedItemScriptHookCallbacks.Click<NoArchItemData>} */
function dialogClickHook(Data, originalFunction) {
    originalFunction();
    if (!DialogFocusItem) return;

    const update = () => {
        const C = CharacterGetCurrent();
        CharacterRefresh(C);
        ChatRoomCharacterItemUpdate(C, DialogFocusItem.Asset.Group.Name);
    };
    const customDialog = DialogTools.makeCustomDialogGenerator(DialogFocusItem.Asset.Name);
    const customDialogAction = (t) => customDialog("A", t);

    monadic(buttonProps.find((btn) => RMouseIn(btn.location) && btn.enable(DialogFocusItem))).then((btn) => {
        btn.onclick(DialogFocusItem);
        if (btn.update) update();
        if (btn.action) {
            const builder = new DictionaryBuilder()
                .sourceCharacter(Player)
                .targetCharacter(CharacterGetCurrent())
                .destinationCharacterName(CharacterGetCurrent())
                .asset(DialogFocusItem.Asset, "AssetName", DialogFocusItem.Craft && DialogFocusItem.Craft.Name);
            const Dictionary = (
                typeof btn.action === "function" ? btn.action(builder, DialogFocusItem) : builder
            ).build();
            ChatRoomPublishCustomAction(customDialogAction(btn.key), true, Dictionary);
        }
    });
}

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
        DrawImageCanvas(imgURL, ctx, 0, 0);
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
            DrawImageCanvas(imgURL, ctx, margin + (i * (500 - margin * 2 - 40)) / (maxv.饮料 - 1), 0);
        }
        drawCanvas(canvas, X, Y, AlphaMasks);
        drawCanvasBlink(canvas, X, Y, AlphaMasks);
    }
    return undefined;
}

const translation = {
    CN: "托盘",
    EN: "Tray",
};

const customDialogs = DialogTools.replicateCustomDialog([asset.Name], {
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
    },
    EN: {
        DBase: "Configure the contents of the Tray",

        D曲奇加一: "Add one Cookie",
        D曲奇加满: "Fill Cookies",
        D曲奇减一: "Remove one Cookie",

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
});

export default function () {
    AssetManager.addAssetWithConfig("ItemTorso", asset, { extended, translation, layerNames });
    AssetManager.addCustomAssetString(customDialogs);
}
