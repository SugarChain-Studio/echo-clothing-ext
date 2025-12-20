import { Tools } from "@mod-utils/Tools";
import { ArmMaskTool, createItemDialogModular } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/**
 * @typedef {ItemProperties & {LuziRid?:number, LuziCid?:number}} ChocolateItemProperties
 */

/** @type {(p:ItemProperties)=>ChocolateItemProperties} */
const extProp = (p) => p;

/**
 * hash numbers, input is array of int32 numbers
 * @param {number[]} values
 * @returns {number}
 */
function hash(values) {
    let h = 0x811c9dc5; // FNV offset basis (32-bit)

    for (const v of values) {
        const x = Number(v) | 0; // 确保是32bit整数
        h ^= x;
        h = Math.imul(h, 0x01000193); // FNV prime
    }

    return h | 0; // 强制32bit有符号整数
}

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, {}>} */
function scriptDraw(data, originalFunction, drawData) {
    const { C, Item } = drawData;

    if (C.IsPlayer()) {
        Item.Property ??= {};
        const p = extProp(Item.Property);
        if (!p.LuziRid || !p.LuziCid) {
            p.LuziRid = (Math.random() * 0x100000000) >>> 0;
            p.LuziCid = C.MemberNumber;
            ChatRoomCharacterItemUpdate(C, Item.Asset.Group.Name);
        }
    }
}

/** @type {(item:ItemProperties)=>boolean} */
function prized(props) {
    const p = extProp(props);
    if (p.LuziRid && p.LuziCid) {
        const hashValue = hash([p.LuziRid, p.LuziCid, 0x9e3779b9]); // 使用一个大质数作为混合因子
        const prizeChance = (hashValue >>> 0) % 100;
        return prizeChance < 5; // 5% chance of being prized
    }
    return false;
}

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, {}>} */
function beforeDraw(data, originalFunction, drawData) {
    const { L, Property } = drawData;
    if (L === "Gt") {
        if (prized(Property)) return { Opacity: 1 };
        return { Opacity: 0 };
    }
}

const itemDialog = createItemDialogModular().addTexts([
    {
        location: { x: 1500, y: 675, w: 750 },
        text: ({ data, text, item }) =>
            data.currentModule === "Base" && item.Property?.TypeRecord?.p === 2 && prized(item.Property)
                ? text("T_Prized")
                : undefined,
    },
    {
        location: { x: 1500, y: 745, w: 750 },
        text: ({ data, text, item }) =>
            data.currentModule === "Base" && extProp(item.Property).LuziCid
                ? text("T_OpenID").replace("$ID", `${extProp(item.Property).LuziCid}`)
                : undefined,
    },
]);

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ItemHandheld",
    {
        Name: "巧克力",
        Random: false,
        ...Tools.topLeftBuilder(
            { Left: 190, Top: 350 },
            ["Yoked", { Top: 120, Left: 30 }],
            ["OverTheHead", { Top: -10, Left: 110 }]
        ),
        Difficulty: -10,
        ParentGroup: {},
        IsRestraint: false,
        PoseMapping: { ...AssetPoseMapping.ItemHandheld, Yoked: "", OverTheHead: "" },
        AllowActivity: ["EatItem"],
        Layer: [
            { Name: "Ch", AllowTypes: { p: [2] } },
            { Name: "Gt", AllowTypes: { p: [2] } },
            { Name: "Al", AllowTypes: { p: [0, 1] } },
            { Name: "Wr", AllowTypes: { p: [0] } },
        ],
    },
    {
        translation: { CN: "巧克力", EN: "Chocolate" },
        layerNames: {
            CN: { Ch: "巧克力块", Gt: "金票", Al: "铝箔纸", Wr: "包装纸" },
            EN: { Ch: "Chocolate Bar", Gt: "Gold Ticket", Al: "Aluminum Foil", Wr: "Wrapping Paper" },
        },
        extended: {
            Archetype: "modular",
            ChatTags: Tools.CommonChatTags(),
            DrawImages: false,
            Modules: [{ Name: "包装", Key: "p", Options: [{}, {}, {}] }],
            ScriptHooks: itemDialog.createHooks(["Draw"], {
                BeforeDraw: beforeDraw,
                ScriptDraw: scriptDraw,
            }),
        },
        assetStrings: {
            CN: {
                SelectBase: "巧克力外观配置",

                Module包装: "包装",
                Select包装: "选择巧克力包装类型",
                Optionp0: "完整包装",
                Optionp1: "铝箔纸",
                Optionp2: "露出巧克力块",

                Setp0: "SourceCharacter使DestinationCharacterAssetName显示完整包装。",
                Setp1: "SourceCharacter使DestinationCharacterAssetName显示包装纸里面的铝箔。",
                Setp2: "SourceCharacter使DestinationCharacterAssetName显示露出巧克力块。",

                T_Prized: "打开巧克力，发现里面有一张金票！",
                T_OpenID: "巧克力的开包者编号是 $ID .",
            },
            EN: {
                SelectBase: "Chocolate Appearance Config",

                Module包装: "Wrapping",
                Select包装: "Select Chocolate Wrapping Type",
                Optionp0: "Fully Wrapped",
                Optionp1: "Aluminum Foil",
                Optionp2: "Exposed Chocolate",

                Setp0: "SourceCharacter makes DestinationCharacterAssetName show fully wrapped.",
                Setp1: "SourceCharacter makes DestinationCharacterAssetName show aluminum foil inside the wrapping paper.",
                Setp2: "SourceCharacter makes DestinationCharacterAssetName show exposed chocolate.",

                T_Prized: "Opened the chocolate and found a gold ticket inside!",
                T_OpenID: "The chocolate's opener ID is $ID .",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
    // ArmMaskTool.createArmMaskForCloth(asset[0], asset[1], "Right");
}
