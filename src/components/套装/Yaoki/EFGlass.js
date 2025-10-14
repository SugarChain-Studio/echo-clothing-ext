import { DialogTools, Tools } from "@mod-utils/Tools";
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
        {
            Name: "effect",
            Priority: 54,
            HasImage: false,
            AllowTypes: { m: [1, 2, 3, 4] },
            CopyLayerColor: "light2",
            CreateLayerTypes: ["m"],
        },
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
    if (C.IsPlayer()) {
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
        { Name: "催眠", Key: "m", Options: [{}, {}, {}, {}, {}] },
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
        ...DialogTools.modularSetMessage(
            "v",
            ["默认透明度", "半透明", "几乎不透明"],
            (field) => `SourceCharacter配置DestinationCharacterAssetName为${field}`
        ),

        Module催眠: "催眠",
        Select催眠: "设置催眠效果",
        Optionm0: "无催眠",
        Optionm1: "催眠中",
        Optionm2: "惩罚中",
        Optionm3: "任务中",
        Optionm4: "训练中",
        ...DialogTools.modularSetMessage(
            "m",
            ["无催眠效果", "催眠", "惩罚", "任务", "训练"],
            (field, idx) => `SourceCharacter使DestinationCharacterAssetName${idx === 0 ? field : `启动${field}程序`}`
        ),

        Module流光: "灯光动画",
        Select流光: "设置灯光动画效果",
        Optionf0: "有",
        Optionf1: "无",
        ...DialogTools.modularSetMessage(
            "f",
            ["有", "无"],
            (field) => `SourceCharacter使DestinationCharacterAssetName${field}灯光动画`
        ),
    },
    EN: {
        SelectBase: "Configure EvilFall Visor",

        Module透明度: "Opacity",
        Select透明度: "Set Opacity",
        Optionv0: "Default",
        Optionv1: "Semi-Transparent",
        Optionv2: "Nearly Opaque",
        ...DialogTools.modularSetMessage(
            "v",
            ["default", "semi-transparent", "nearly opaque"],
            (field) => `SourceCharacter makes DestinationCharacter AssetName have ${field} opacity`
        ),

        Module催眠: "Hypnosis",
        Select催眠: "Set Hypnosis Effect",
        Optionm0: "No Hypnosis",
        Optionm1: "Hypnotized",
        Optionm2: "Punishment",
        Optionm3: "Mission",
        Optionm4: "Training",
        ...DialogTools.modularSetMessage(
            "m",
            ["no hypnosis effect", "hypnosis", "punishment", "mission", "training"],
            (field, idx) =>
                `SourceCharacter makes DestinationCharacter AssetName ${
                    idx === 0 ? field : `initiate ${field} protocol`
                }.`
        ),

        Module流光: "Light Animation",
        Select流光: "Set Light Animation Effect",
        Optionf0: "Animation",
        Optionf1: "No Animation",
        ...DialogTools.modularSetMessage(
            "f",
            ["animation", "no animation"],
            (field) => `SourceCharacter makes DestinationCharacter AssetName have ${field} effect`
        ),
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
