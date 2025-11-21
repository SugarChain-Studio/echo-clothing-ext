import { ImageMapTools, StateTools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";
import { createItemDialogNoArch, Typing } from "../../lib";
import { OrgasmEvents } from "@sugarch/bc-event-handler";

const typeURL = (type) => `luzi-canvas://rakuukan-type-${type}`;

const maskSize = 160;

const vps = [20, 40, 60, 80].map((r, i) => {
    const vp = AssetManager.imageMapping.createVirtualPath(typeURL(i));
    (async () => {
        const canvas = document.createElement("canvas");
        canvas.width = maskSize;
        canvas.height = maskSize;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(maskSize / 2, maskSize / 2, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        canvas.toBlob((blob) => vp.resolve(URL.createObjectURL(blob)));
    })();
    return vp;
});

const clothGroups = Typing.groups([
    "Cloth",
    "Cloth_笨笨蛋Luzi",
    "Cloth_笨笨笨蛋Luzi2",
    "ClothAccessory",
    "ClothAccessory_笨笨蛋Luzi",
    "ClothAccessory_笨笨笨蛋Luzi2",
    "ClothLower_笨笨蛋Luzi",
    "ClothLower_笨笨笨蛋Luzi2",
    "Bra",
    "Bra_笨笨蛋Luzi",
    "Panties",
    "Panties_笨笨蛋Luzi",
    "Suit",
    "Suit_笨笨蛋Luzi",
    "SuitLower",
    "SuitLower_笨笨蛋Luzi",
    "Socks",
    "SocksLeft",
    "SocksRight",
    "Gloves",
    "Decals",
    "Hat",
    "Hat_笨笨蛋Luzi",
    "Mask",
    "Mask_笨笨蛋Luzi",
]);

/**
 * @typedef { 0 | 1 | 2 | 3 } RakuukanType
 */

/**
 * @typedef { {x:number, y:number, type:RakuukanType} } RakuukanConfig
 */

/** @type {RakuukanConfig[]} */
const rakuukanConfigs = [
    { x: 170, y: 894, type: 3 },
    { x: 198, y: 321, type: 3 },
    { x: 269, y: 455, type: 2 },
    { x: 311, y: 591, type: 2 },
    { x: 271, y: 215, type: 1 },
    { x: 183, y: 531, type: 1 },
    { x: 340, y: 381, type: 0 },
    { x: 296, y: 424, type: 3 },
    { x: 310, y: 600, type: 2 },
    { x: 250, y: 257, type: 2 },
    { x: 190, y: 500, type: 1 },
    { x: 339, y: 809, type: 0 },
    { x: 202, y: 687, type: 0 },
    { x: 210, y: 357, type: 0 },
    { x: 332, y: 288, type: 2 },
];

/** @type {(idx:number) => string} */
const num2alphabet = (idx) => String.fromCharCode(65 + idx);

/** @type {(config:RakuukanConfig, idx:number) => AssetLayerDefinition} */
const createLayer = (config, idx) => ({
    Name: `Hole${idx + 1}`,
    Left: config.x - maskSize / 2,
    Top: config.y - maskSize / 2,
    BlendingMode: "destination-out",
    TextureMask: { ApplyToAbove: true, Groups: clothGroups },
    AllowTypes: { [`m${num2alphabet(idx)}`]: 1 },
});

/**
 * @typedef {NoArchItemData & {currentDialog:string}} ExNoArchItemData
 */

/** @type {(arg:NoArchItemData) => ExNoArchItemData} */
const tconfig = (arg) => /** @type {ExNoArchItemData}*/ (arg);

const operations = Typing.transform(
    (item) => {
        item.Property ??= {};
        item.Property.TypeRecord ??= {};
    },
    (prepare) => ({
        randomize: /** @type {(item:Item)=>void}*/ (item) => {
            prepare(item);
            for (const key in item.Property.TypeRecord) {
                if (key.startsWith("m")) {
                    item.Property.TypeRecord[key] = 0;
                }
            }
            /** @type {Set<number>} */
            const target = new Set();
            for (let i = 0; i < 5; i++) {
                target.add(Math.floor(Math.random() * rakuukanConfigs.length));
            }
            for (const i of Array.from(target)) {
                item.Property.TypeRecord[`m${num2alphabet(i)}`] = 1;
            }
        },
        toggleH: /** @type {(item:Item, idx:number)=>void}*/ (item, idx) => {
            prepare(item);
            const key = `m${num2alphabet(idx)}`;
            const old = item.Property.TypeRecord[key];
            item.Property.TypeRecord[key] = old === 1 ? 0 : 1;
        },
        toggleOrgasm: /** @type {(item:Item)=>void}*/ (item) => {
            prepare(item);
            const key = "o";
            const old = item.Property.TypeRecord[key];
            item.Property.TypeRecord[key] = old === 1 ? 0 : 1;
        },
    })
);

const dialog = createItemDialogNoArch([
    {
        location: { x: 1385, y: 430, w: 225, h: 55 },
        show: ({ data }) => tconfig(data).currentDialog === "Base",
        key: "B_Details",
        onclick: ({ data }) => {
            tconfig(data).currentDialog = "Details";
        },
        leaveDialog: false,
    },
    {
        location: { x: 1385, y: 580, w: 225, h: 55 },
        show: ({ data }) => tconfig(data).currentDialog === "Base",
        key: "B_Random",
        onclick: ({ item }) => operations.randomize(item),
        actionKey: "A_Random",
        leaveDialog: true,
    },
])
    .addCheckBoxes([
        {
            location: { x: 1300, y: 650 },
            text: ({ text }) => text("CB_Orgasm"),
            show: ({ data }) => tconfig(data).currentDialog === "Base",
            onclick: ({ item }) => operations.toggleOrgasm(item),
            checked: ({ item }) => item.Property?.TypeRecord?.["o"] === 1,
            actionKey: "A_Orgasm",
        },
    ])
    .addTexts([
        {
            location: { x: 1500, y: 375, w: 750 },
            text: ({ data, text }) => text(`T_${tconfig(data).currentDialog}`),
        },
    ])
    .addCheckBoxes(
        rakuukanConfigs.map((g, i) => ({
            text: ({ text }) => `${text("CB_Hole").replace("$Num", `${i + 1}`)}`,
            show: ({ data }) => tconfig(data).currentDialog === "Details",
            location: { x: 1200 + Math.floor(i / 5) * 200, y: 430 + (i % 5) * 75 },
            textWidth: 120,
            onclick: ({ item }) => operations.toggleH(item, i),
            checked: ({ item }) => item.Property?.TypeRecord?.[`m${num2alphabet(i)}`] === 1,
        }))
    )
    .onLoad((data) => (tconfig(data).currentDialog = "Base"))
    .overrideClickExit((original, data) => {
        if (tconfig(data).currentDialog !== "Base") {
            tconfig(data).currentDialog = "Base";
        } else {
            original();
        }
    });

const orgasmState = new StateTools.OrgasmState();

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<NoArchItemData, {Initialized:boolean}>} */
function scriptDraw(itemData, originalFunction, { C, Item, PersistentData }) {
    if (C.IsPlayer()) {
        const data = PersistentData();

        if (!data.Initialized) {
            data.Initialized = true;
            orgasmState.reset();
        }

        if (orgasmState.take("Orgasmed")) {
            operations.randomize(Item);
            ChatRoomCharacterItemUpdate(C, Item.Asset.Group.Name);
        }
    }
}

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ItemAddon",
    {
        Name: "裸空间",
        Random: false,
        DrawLocks: false,
        ParentGroup: {},
        PoseMapping: {},
        AllowColorize: false,
        Layer: rakuukanConfigs.map((config, idx) => createLayer(config, idx)),
    },
    {
        translation: { CN: "裸空间", EN: "Rakuukan" },
        extended: {
            Archetype: "noarch",
            DrawImages: false,
            ScriptHooks: dialog.createHooks(["Click", "Draw", "Load"], { ScriptDraw: scriptDraw }),
        },
        assetStrings: {
            CN: {
                T_Base: "裸空间配置",
                T_Details: "开孔详情配置",

                B_Details: "开孔详情",
                B_Random: "随机生成开孔",
                CB_Hole: "开孔 $Num",
                CB_Orgasm: "高潮时随机变换",

                A_Random: "SourceCharacter将DestinationCharacterAssetName的开孔随机配置。",
                A_Orgasm: "SourceCharacter设置DestinationCharacterAssetName会在每次高潮时随机变换。",
            },
            EN: {
                T_Base: "Rakuukan Configuration",
                T_Details: "Hole Details Configuration",

                B_Details: "Hole Details",
                B_Random: "Randomize Holes",
                CB_Hole: "Hole $Num",

                CB_Orgasm: "Randomize on Orgasm",

                A_Random: "SourceCharacter randomly configures the holes of DestinationCharacter AssetName.",
                A_Orgasm: "SourceCharacter sets DestinationCharacter AssetName to randomize holes on each orgasm.",
            },
        },
    },
];

const layerMappings = rakuukanConfigs.reduce((acc, config, idx) => {
    acc[config.type] ??= [];
    acc[config.type].push(ImageMapTools.assetLayer("ItemAddon", `${asset[1].Name}_Hole${idx + 1}`));
    return acc;
}, {});

vps.forEach((vp, type) => vp.map(layerMappings[type]));

export default function () {
    orgasmState.watch(OrgasmEvents);
    AssetManager.addAssetWithConfig(...asset);
}
