import { AssetManager } from "../../../assetForward";
import { createItemDialogModular } from "../../../lib";

/**
 * @typedef {Object} GradientCustomProperty
 * @property {number} [upperBound]
 * @property {number} [gradientSize]
 */

/**
 * @typedef {GradientCustomProperty & ItemProperties} GradientItemProperties
 */

/** @type {GradientCustomProperty} */
const baseline = { upperBound: 125, gradientSize: 300 };

/**
 * @typedef {[string,number,number][]} PartialDrawState
 * @param {Character} C
 * @param {CustomGroupName[]} groups
 * @return {PartialDrawState}
 */
function partialDraw(C, groups) {
    /** @type {PartialDrawState} */
    const state = [];

    /** @type {AssetLayer[]} */
    const layers = groups.flatMap((g) => C.AppearanceLayers.filter((l) => l.Asset.Group.Name === g));
    for (const layer of layers) {
        const asset = layer.Asset;
        const group = asset.Group;
        const item = C.Appearance.find((i) => i.Asset === asset);
        const pose = CommonDrawResolveAssetPose(C, layer);
        const groupName = asset.DynamicGroupName;
        const { X, Y } = CommonDrawComputeDrawingCoordinates(C, asset, layer, groupName, item.Property);

        const typeRecord = item.Property?.TypeRecord || {};
        const layerType = layer.CreateLayerTypes.map((k) => `${k}${typeRecord[k] || 0}`).join("");
        const layerSegment = layer.Name || "";

        const parentGroupName = layer.ParentGroup[pose] ?? layer.ParentGroup[PoseType.DEFAULT];
        const parentAssetName = parentGroupName
            ? C.Appearance.find((i) => i.Asset.Group.Name === parentGroupName)?.Asset.Name || ""
            : "";

        const poseSegment = ((p) =>
            /** @type {string[]}*/ ([PoseType.HIDE, PoseType.DEFAULT]).includes(p) ? null : p)(layer.PoseMapping[pose]);

        const baseURL = AssetBaseURL(C, group, groupName, poseSegment, layer, layerType, asset);

        const layerURL = `${[asset.Name, parentAssetName, layerType, layerSegment].filter(Boolean).join("_")}.png`;
        state.push([`${baseURL}${layerURL}`, X, Y]);
    }
    return state;
}

/**
 *
 * @param {PartialDrawState} s1
 * @param {PartialDrawState} s2
 */
function stateCompare(s1, s2) {
    if (s1.length !== s2.length) return false;
    for (let i = 0; i < s1.length; i++) {
        const [url1, x1, y1] = s1[i];
        const [url2, x2, y2] = s2[i];
        if (url1 !== url2 || x1 !== x2 || y1 !== y2) return false;
    }
    return true;
}

/**
 * @typedef {Object} GradientOverlayLayer
 * @property {HTMLCanvasElement} mask
 * @property {PartialDrawState} maskState
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

    const upper = /** @type {GradientItemProperties}*/ (Property).upperBound ?? baseline.upperBound;
    const size = /** @type {GradientItemProperties}*/ (Property).gradientSize ?? baseline.gradientSize;

    /** @type {CustomGroupName[]} */
    const frontGroups = ["HairFront", "新前发_Luzi"];
    /** @type {CustomGroupName[]} */
    const backGroups = ["HairBack", "新后发_Luzi"];

    data.front ??= { mask: null, maskState: null, canvas: null };
    data.back ??= { mask: null, maskState: null, canvas: null };

    const layerData = L === "Front" ? data.front : L === "Back" ? data.back : null;
    const groups = L === "Front" ? frontGroups : L === "Back" ? backGroups : null;

    const nState = partialDraw(C, groups);
    if (C.MustDraw || !layerData.maskState || !stateCompare(nState, layerData.maskState)) {
        layerData.mask ??= AnimationGenerateTempCanvas(C, A, 500, 1000);
        const ctx = layerData.mask.getContext("2d");
        ctx.clearRect(0, 0, layerData.mask.width, layerData.mask.height);
        for (const [url, x, y] of nState) {
            DrawImageEx(url, ctx, x, y - CanvasUpperOverflow);
        }
        layerData.maskState = nState;
    }

    layerData.canvas ??= AnimationGenerateTempCanvas(C, A, 500, 1000);
    const ctx = layerData.canvas.getContext("2d");
    ctx.clearRect(0, 0, layerData.canvas.width, layerData.canvas.height);

    const gradient = ctx.createLinearGradient(250, upper, 250, upper + size);
    gradient.addColorStop(0, `${c}00`);
    gradient.addColorStop(1, `${c}FF`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, layerData.canvas.width, layerData.canvas.height);

    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(layerData.mask, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    drawCanvas(layerData.canvas, 0, CanvasUpperOverflow, AlphaMasks);
    drawCanvasBlink(layerData.canvas, 0, CanvasUpperOverflow, AlphaMasks);
}

const dialog = createItemDialogModular({
    sliders: [
        {
            location: { x: 1250, y: 650, w: 500 },
            config: { min: 0, max: 500 },
            show: ({ data }) => data.currentModule === "Base",
            value: ({ item }) => {
                const property = /** @type {GradientItemProperties}*/ (item.Property);
                return property?.upperBound ?? 0;
            },
            onChange: ({ item, chara }, value) => {
                item.Property ??= {};
                const property = /** @type {GradientItemProperties}*/ (item.Property);
                property.upperBound = value;
                CharacterRefresh(chara, false, false);
            },
            leftLabel: ({ text }) => text("GradientPos"),
        },
        {
            location: { x: 1250, y: 730, w: 500 },
            config: { min: 1, max: 500 },
            show: ({ data }) => data.currentModule === "Base",
            value: ({ item }) => {
                const property = /** @type {GradientItemProperties}*/ (item.Property);
                return property?.gradientSize ?? 1;
            },
            onChange: ({ item, chara }, value) => {
                item.Property ??= {};
                const property = /** @type {GradientItemProperties}*/ (item.Property);
                property.gradientSize = value;
                CharacterRefresh(chara, false, false);
            },
            leftLabel: ({ text }) => text("GradientSize"),
        },
    ],
});

/** @type {AddAssetWithConfigParams} */
const asset = [
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
        layerNames: {
            CN: { Front: "前发", Back: "后发" },
            EN: { Front: "Front", Back: "Back" },
        },
        extended: {
            Archetype: "modular",
            DrawImages: false,
            BaselineProperty: /** @type {GradientItemProperties}*/ (baseline),
            Modules: [
                { Name: "Front", Key: "f", Options: [{}, {}] },
                { Name: "Back", Key: "b", Options: [{}, {}] },
            ],
            ScriptHooks: dialog.createHooks({ AfterDraw: afterDraw }),
        },
        assetStrings: {
            CN: {
                SelectBase: "渐变头发叠加层配置",

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
            },
            EN: {
                SelectBase: "Gradient Hair Overlay Configuration",

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
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
