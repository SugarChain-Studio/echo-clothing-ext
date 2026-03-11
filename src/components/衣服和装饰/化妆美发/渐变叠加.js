import { DialogTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { createItemDialogModular } from "../../../lib";
import { PartsMask } from "../../../lib/partsMask";

/**
 * @typedef {Object} GradientCustomProperty
 * @property {number} [upperBound]
 * @property {number} [gradientSize]
 * @property {number} [rotation]
 */

/**
 * @typedef {GradientCustomProperty & ItemProperties} GradientItemProperties
 */

/** @type {(p:ItemProperties)=>GradientItemProperties} */
const props = (p) => p;

/** @type {GradientCustomProperty} */
const baseline = { upperBound: 125, gradientSize: 300, rotation: 180 };

/**
 * @typedef {Object} GradientOverlayLayer
 * @property {PartsMask} mask
 * @property {HTMLCanvasElement} canvas
 */

/**
 * @typedef {Object} GradientOverlayData
 * @property {GradientOverlayLayer} front
 * @property {GradientOverlayLayer} back
 */

/** @type {ExtendedItemScriptHookCallbacks.AfterDraw<ModularItemData, GradientOverlayData>} */
function afterDraw(mdata, originalFunction, drawData) {
    const { C, A, Color, Property, drawCanvas, drawCanvasBlink, AlphaMasks, L, PersistentData } = drawData;
    if (L !== "Front" && L !== "Back") return;

    const typeRecord = Property?.TypeRecord || {};

    if (L === "Front" && typeRecord.f !== 0) return;
    if (L === "Back" && typeRecord.b !== 0) return;

    const c = Color === "Default" ? "#FF8888" : Color;

    const data = PersistentData();

    const upper = props(Property).upperBound ?? baseline.upperBound;
    const size = props(Property).gradientSize ?? baseline.gradientSize;

    /** @type {CustomGroupName[]} */
    const frontGroups = ["HairFront", "新前发_Luzi"];
    /** @type {CustomGroupName[]} */
    const backGroups = ["HairBack", "新后发_Luzi"];

    data.front ??= { mask: null, canvas: null };
    data.back ??= { mask: null, canvas: null };

    const layerData = L === "Front" ? data.front : L === "Back" ? data.back : null;
    const groups = L === "Front" ? frontGroups : L === "Back" ? backGroups : null;

    if (!layerData || !groups) return;

    layerData.mask = new PartsMask(AnimationGenerateTempCanvas(C, A, 500, 1000), groups);
    layerData.mask.draw(C);
    layerData.canvas ??= AnimationGenerateTempCanvas(C, A, 500, 1000);

    const ctx = layerData.canvas.getContext("2d");
    ctx.clearRect(0, 0, layerData.canvas.width, layerData.canvas.height);

    ctx.save();

    const rotation = (((props(Property).rotation ?? baseline.rotation) - 180) * Math.PI) / 180;
    ctx.translate(250, upper);
    ctx.rotate(rotation);

    const gradient = ctx.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, `${c}00`);
    gradient.addColorStop(1, `${c}FF`);

    ctx.fillStyle = gradient;
    ctx.fillRect(-1200, 0, 2400, size);
    ctx.fillStyle = `${c}FF`;
    ctx.fillRect(-1200, size - 1, 2400, 1200);

    if (A.Name === "双渐变叠加") {
        const gradient = ctx.createLinearGradient(0, 0, 0, -size);
        gradient.addColorStop(0, `${c}00`);
        gradient.addColorStop(1, `${c}FF`);

        ctx.fillStyle = gradient;
        ctx.fillRect(-1200, -size, 2400, size);
        ctx.fillStyle = `${c}FF`;
        ctx.fillRect(-1200, -size - 1199, 2400, 1200);
    }

    ctx.translate(-250, -upper);
    ctx.restore();
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(layerData.mask.result, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    drawCanvas(layerData.canvas, 0, CanvasUpperOverflow, AlphaMasks);
    drawCanvasBlink(layerData.canvas, 0, CanvasUpperOverflow, AlphaMasks);
}

/** @type {Parameters<typeof createItemDialogModular>[0]} */
const monoConfig = {
    sliders: [
        {
            location: { x: 1250, y: 650, w: 500 },
            config: { min: 0, max: 500 },
            show: ({ data }) => data.currentModule === "Base",
            value: ({ item }) => props(item.Property)?.upperBound ?? baseline.upperBound,
            onChange: ({ item, chara }, value) => {
                item.Property ??= {};
                props(item.Property).upperBound = value;
                CharacterRefresh(chara, false, false);
            },
            leftLabel: ({ text }) => text("GradientPos"),
        },
        {
            location: { x: 1250, y: 730, w: 500 },
            config: { min: 1, max: 500 },
            show: ({ data }) => data.currentModule === "Base",
            value: ({ item }) => props(item.Property)?.gradientSize ?? baseline.gradientSize,
            onChange: ({ item, chara }, value) => {
                item.Property ??= {};
                props(item.Property).gradientSize = value;
                CharacterRefresh(chara, false, false);
            },
            leftLabel: ({ text }) => text("GradientSize"),
        },
        {
            location: { x: 1250, y: 810, w: 500 },
            config: { min: 0, max: 360 },
            show: ({ data }) => data.currentModule === "Base",
            value: ({ item }) => props(item.Property)?.rotation ?? baseline.rotation,
            onChange: ({ item, chara }, value) => {
                item.Property ??= {};
                props(item.Property).rotation = value;
                CharacterRefresh(chara, false, false);
            },
            leftLabel: ({ text }) => text("GradientRotation"),
        },
    ],
};

const dialog = createItemDialogModular(monoConfig);

/** @type {Translation.String} */
const assetStrings = {
    CN: {
        ModuleFront: "前发",
        SelectFront: "配置前发渐变叠加",
        Optionf0: "有",
        Optionf1: "无",

        ModuleBack: "后发",
        SelectBack: "配置后发渐变叠加",
        Optionb0: "有",
        Optionb1: "无",

        GradientPos: "位置",
        GradientSize: "大小",
        GradientRotation: "旋转",
    },
    EN: {
        ModuleFront: "Front Hair",
        SelectFront: "Configure front hair gradient overlay",
        Optionf0: "Yes",
        Optionf1: "No",

        ModuleBack: "Back Hair",
        SelectBack: "Configure back hair gradient overlay",
        Optionb0: "Yes",
        Optionb1: "No",

        GradientPos: "Position",
        GradientSize: "Size",
        GradientRotation: "Rotation",
    },
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: "modular",
    DrawImages: false,
    BaselineProperty: /** @type {GradientItemProperties}*/ (baseline),
    Modules: [
        { Name: "Front", Key: "f", Options: [{}, {}] },
        { Name: "Back", Key: "b", Options: [{}, {}] },
    ],
    ScriptHooks: dialog.createHooks({ AfterDraw: afterDraw }),
};

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "额外头发_Luzi",
        {
            Name: "渐变叠加",
            Random: false,
            Top: 0,
            Left: 250,
            Priority: 54,
            ParentGroup: {},
            InheritColor: "HairFront",
            DefaultColor: ["#FF8888", "#FF8888"],
            Layer: [
                { Name: "Back", HasImage: false, Priority: 6 },
                { Name: "Front", HasImage: false, Priority: 53 },
            ],
        },
        {
            translation: { CN: "渐变叠加", EN: "Gradient Overlay" },
            layerNames: { CN: { Front: "前发", Back: "后发" }, EN: { Front: "Front", Back: "Back" } },
            extended,
            assetStrings: DialogTools.combine(assetStrings, {
                CN: { SelectBase: "渐变头发叠加层配置" },
                EN: { SelectBase: "Gradient Hair Overlay Configuration" },
            }),
        },
    ],
    [
        "额外头发_Luzi",
        {
            Name: "双渐变叠加",
            Random: false,
            Top: 0,
            Left: 250,
            Priority: 54,
            ParentGroup: {},
            InheritColor: "HairFront",
            DefaultColor: ["#FF88E7", "#FF88E7"],
            Layer: [
                { Name: "Back", HasImage: false, Priority: 6 },
                { Name: "Front", HasImage: false, Priority: 53 },
            ],
        },
        {
            translation: { CN: "双渐变叠加", EN: "Double Gradient Overlay" },
            layerNames: { CN: { Front: "前发", Back: "后发" }, EN: { Front: "Front", Back: "Back" } },
            extended,
            assetStrings: DialogTools.combine(assetStrings, {
                CN: { SelectBase: "双渐变头发叠加层配置" },
                EN: { SelectBase: "Double Gradient Hair Overlay Configuration" },
            }),
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}
