import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { createAfterDrawProcess } from "../../../lib";
import { LSCG } from "../../../lib/lscg";

/** @type {Partial<CustomAssetDefinitionItem>} */
const itemAttr = {
    AllowLock: true,
    Difficulty: 8,
    Time: 30,
    Audio: "FuturisticApply",
    Prerequisite: ["GagFlat"],
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "EFGlass",
    Random: false,
    Left: 160,
    Top: 130,
    ParentGroup: {},
    Priority: 55,
    DynamicGroupName: "ItemHead",
    Category: ["SciFi"],
    Fetish: ["Metal"],
    DrawLocks: false,
    DefaultColor: ["#4D305B", "#555555", "#000000", "#B57CC1", "#F4A9FF"],
    Layer: [
        { Name: "visor_diff", Priority: 54 },
        { Name: "cover1", Priority: 54, AllowTypes: { v: 1 }, CopyLayerColor: "visor_diff" },
        { Name: "cover2", Priority: 54, AllowTypes: { v: 2 }, CopyLayerColor: "visor_diff" },
        { Name: "visor_gloss", Priority: 54, BlendingMode: "screen", AllowColorize: false },
        { Name: "metal_diff" },
        { Name: "metal_gloss", BlendingMode: "screen", AllowColorize: false },
        { Name: "frame_diff" },
        { Name: "frame_gloss", BlendingMode: "screen", AllowColorize: false },
        { Name: "light1", HasImage: false },
        { Name: "light2", Priority: 54, HasImage: false },
        { Name: "effect", Priority: 54, HasImage: false, AllowTypes: { m: [1, 2] }, CopyLayerColor: "light2" },
    ],
};

const layerNames = {
    CN: {
        frame_diff: "边框",
        metal_diff: "金属",
        visor_diff: "护目镜",
        light2: "灯光2",
        light1: "灯光1",
    },
    EN: {
        frame_diff: "Frame",
        metal_diff: "Metal",
        visor_diff: "Visor",
        light2: "Light 2",
        light1: "Light 1",
    },
};

const translation = {
    CN: "EvilFall 护目镜",
    EN: "EvilFall Visor",
};

/**
 * @typedef {object} EFClassesData
 * @property {number} LSCGTimer
 * @property {HTMLCanvasElement} canvas
 */

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, EFClassesData>} */
function scriptDraw(data, originalFunction, drawData) {
    const { C, Item, PersistentData } = drawData;
    const Data = PersistentData();

    const now = Date.now();
    // LSCG 联动
    if (Item.Property?.TypeRecord?.m === 1) {
        Data.LSCGTimer ??= now;
        if (now - Data.LSCGTimer > LSCG.breathInterval) {
            Data.LSCGTimer = now;
            const randomLevelIncrease = Math.random() * 0.3 + 0.2; // 0.2 ~ 0.5
            if (LSCG.random(45) === 0) {
                LSCG.injectModule.AddMindControl(randomLevelIncrease + 1, LSCG.random(3) === 0);
            } else LSCG.injectModule.AddMindControl(randomLevelIncrease / 4, false);
        }
    } else {
        Data.LSCGTimer = now;
    }

    // 动画
    if (Item.Property?.TypeRecord?.f === 0) {
        Tools.drawUpdate(C, Data);
    }
}

const afterDraw = createAfterDrawProcess("modular", /** @type {EFClassesData} */ ({}), () => {}).onLayer(
    ["effect", "light2", "light1"],
    (_, drawData) => {
        const resource = Tools.getAssetURL(drawData);
        const { C, A, X, Y, L, Color, Property, PersistentData, drawCanvas, drawCanvasBlink, AlphaMasks } = drawData;

        const phase = {
            effect: 0,
            light2: 0.7,
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
        {
            Name: "透明度",
            Key: "v",
            Options: [{}, { Property: { Effect: [E.BlindNormal] } }, { Property: { Effect: [E.BlindHeavy] } }],
        },
        { Name: "催眠", Key: "m", Options: [{}, {}] },
        { Name: "流光", Key: "f", Options: [{}, {}] },
    ],
};

const assetStrings = {
    CN: {
        SelectBase: "配置恶堕护目镜",

        Module透明度: "透明度",
        Select透明度: "设置透明度",
        Optionv0: "默认",
        Optionv1: "半透明",
        Optionv2: "几乎不透明",
        Setv0: "SourceCharacter配置DestinationCharacterAssetName为默认透明度",
        Setv1: "SourceCharacter配置DestinationCharacterAssetName为半透明",
        Setv2: "SourceCharacter配置DestinationCharacterAssetName为几乎不透明",

        Module催眠: "催眠",
        Select催眠: "设置催眠效果",
        Optionm0: "无催眠",
        Optionm1: "启动催眠",
        Setm0: "SourceCharacter使DestinationCharacterAssetName无催眠效果",
        Setm1: "SourceCharacter使DestinationCharacterAssetName启动催眠程序",

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

        Module催眠: "Hypnosis",
        Select催眠: "Set Hypnosis Effect",
        Optionm0: "No Hypnosis",
        Optionm1: "Hypnosis",
        Setm0: "SourceCharacter makes DestinationCharacter AssetName have no hypnosis effect",
        Setm1: "SourceCharacter makes DestinationCharacter AssetName initiate hypnosis protocol",

        Module流光: "Light Animation",
        Select流光: "Set Light Animation Effect",
        Optionf0: "Animation",
        Optionf1: "No Animation",
        Setf0: "SourceCharacter makes DestinationCharacter AssetName have light animation effect",
        Setf1: "SourceCharacter makes DestinationCharacter AssetName have no light animation effect",
    },
};

const itemAssetBase = /** @type {CustomAssetDefinition} */ ({ ...asset, ...itemAttr });

/** @type {AddAssetWithConfigParams[]} */
const assetN = [
    [
        ["Glasses", "Mask"],
        asset,
        {
            layerNames,
            translation,
            extended: { ...extended, Modules: extended.Modules.filter((m) => m.Key !== "m") },
            assetStrings,
        },
    ],
    ["ItemHead", itemAssetBase, { layerNames, translation, extended, assetStrings }],
];

export default function () {
    AssetManager.addAssetWithConfig(assetN);
}
