import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { createAfterDrawProcess } from "../../../lib";

/** @type {Partial<CustomAssetDefinitionItem>} */
const itemAttr = {
    AllowLock: true,
    Difficulty: 8,
    Time: 30,
    Audio: "FuturisticApply",
    Effect: [E.BlockMouth],
    Prerequisite: ["GagFlat"],
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "EFMask",
    Random: false,
    Left: 200,
    Top: 160,
    ParentGroup: {},
    DynamicGroupName: "ItemMouth",
    Category: ["SciFi"],
    Fetish: ["Metal"],
    Prerequisite: "GagFlat",
    DrawLocks: false,
    Effect: [E.BlockMouth],
    DefaultColor: ["#131313", "#7F7F7F", "#4D305B", "#B57CC1", "#F4A9FF"],
    Layer: [
        { Name: "frame_diff" },
        { Name: "frame_gloss", BlendingMode: "screen", AllowColorize: false },
        { Name: "metal_diff" },
        { Name: "metal_gloss", BlendingMode: "screen", AllowColorize: false },
        { Name: "mask_diff" },
        { Name: "cover1", AllowTypes: { v: 1 }, CopyLayerColor: "mask_diff" },
        { Name: "cover2", AllowTypes: { v: 2 }, CopyLayerColor: "mask_diff" },
        { Name: "mask_gloss", BlendingMode: "screen", AllowColorize: false },
        { Name: "light1", HasImage: false },
        { Name: "light2", HasImage: false },
    ],
};

const layerNames = {
    CN: {
        frame_diff: "边框",
        metal_diff: "金属",
        light2: "灯光2",
        mask_diff: "面具",
        light1: "灯光1",
    },
    EN: {
        frame_diff: "Frame",
        metal_diff: "Metal",
        light2: "Light 2",
        mask_diff: "Mask",
        light1: "Light 1",
    },
};

const translation = {
    CN: "EvilFall 面具",
    EN: "EvilFall Mask",
};

const itemAssetBase = /** @type {CustomAssetDefinition} */ ({ ...asset, ...itemAttr });

/**
 * @typedef {object} CanvasCacheData
 * @property {HTMLCanvasElement} canvas
 */

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, CanvasCacheData>} */
function scriptDraw(data, originalFunction, drawData) {
    const { C, Item, PersistentData } = drawData;
    const Data = PersistentData();

    if (Item.Property?.TypeRecord?.f === 0) {
        Tools.drawUpdate(C, Data);
    }
}

const afterDraw = createAfterDrawProcess("modular", /** @type {CanvasCacheData} */ ({}), () => {}).onLayer(
    ["light2", "light1"],
    (_, drawData) => {
        const resource = Tools.getAssetURL(drawData);
        const { C, A, X, Y, L, Color, Property, PersistentData, drawCanvas, drawCanvasBlink, AlphaMasks } = drawData;

        const phase = {
            light2: 0,
            light1: 1.4,
        };

        const thisPhase = phase[L] || 0.1;

        const data = PersistentData();

        if (!data.canvas) {
            data.canvas = AnimationGenerateTempCanvas(C, A, 180, 50);
        }

        const ctx = data.canvas.getContext("2d");
        ctx.clearRect(0, 0, data.canvas.width, data.canvas.height);

        if (Property.TypeRecord.f === 0) {
            const Alpha = Math.sin((Date.now() / 1000 + C.MemberNumber) * Math.PI * 2 * 0.2 + thisPhase) * 0.3 + 0.7;
            ctx.fillStyle = `${Color}${Alpha.toString(16).slice(2, 4)}`;
        } else {
            ctx.fillStyle = `${Color}`;
        }

        ctx.fillRect(0, 0, data.canvas.width, data.canvas.height);
        DrawImageEx(resource, ctx, 0, 0, { BlendingMode: "destination-in" });

        drawCanvas(data.canvas, X, Y, AlphaMasks);
        drawCanvasBlink(data.canvas, X, Y, AlphaMasks);
    }
);

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChatTags: Tools.CommonChatTags(),
    DrawImages: false,
    ScriptHooks: {
        ScriptDraw: scriptDraw,
        ...afterDraw.hooks(),
    },
    ChangeWhenLocked: false,
    Modules: [
        { Name: "透明度", Key: "v", Options: [{}, {}, {}] },
        { Name: "流光", Key: "f", Options: [{}, {}] },
    ],
};

const assetStrings = {
    CN: {
        SelectBase: "配置恶堕面罩",

        Module透明度: "透明度",
        Select透明度: "设置透明度",
        Optionv0: "默认",
        Optionv1: "半透明",
        Optionv2: "几乎不透明",
        Setv0: "SourceCharacter配置DestinationCharacterAssetName为默认透明度",
        Setv1: "SourceCharacter配置DestinationCharacterAssetName为半透明",
        Setv2: "SourceCharacter配置DestinationCharacterAssetName为几乎不透明",

        Module流光: "灯光动画",
        Select流光: "设置灯光动画效果",
        Optionf0: "有灯光动画",
        Optionf1: "无灯光动画",
        Setf0: "SourceCharacter使DestinationCharacterAssetName有灯光动画效果",
        Setf1: "SourceCharacter使DestinationCharacterAssetName无灯光动画效果",
    },
    EN: {
        SelectBase: "Configure EvilFall Visor",

        Module透明度: "Opacity",
        Select透明度: "Set Opacity",
        Optionv0: "Default",
        Optionv1: "Semi-Transparent",
        Optionv2: "Nearly Opaque",
        Setv0: "SourceCharacter makes DestinationCharacter AssetName have default opacity",
        Setv1: "SourceCharacter makes DestinationCharacter AssetName have semi-transparent opacity",
        Setv2: "SourceCharacter makes DestinationCharacter AssetName have nearly opaque opacity",

        Module流光: "Light Animation",
        Select流光: "Set Light Animation Effect",
        Optionf0: "Animation",
        Optionf1: "No Animation",
        Setf0: "SourceCharacter makes DestinationCharacter AssetName have light animation effect",
        Setf1: "SourceCharacter makes DestinationCharacter AssetName have no light animation effect",
    },
};

/** @type {AddAssetWithConfigParams[2]} */
const config = { layerNames, translation, extended, assetStrings };

/** @type {AddAssetWithConfigParams[]} */
const assetN = [
    ["Mask", asset, config],
    ["ItemMouth", itemAssetBase, config],
    ["ItemMouth2", { ...itemAssetBase, Block: ["ItemMouth"] }, config],
    ["ItemMouth3", { ...itemAssetBase, Block: ["ItemMouth", "ItemMouth2"] }, config],
];

export default function () {
    AssetManager.addAssetWithConfig(assetN);
}
