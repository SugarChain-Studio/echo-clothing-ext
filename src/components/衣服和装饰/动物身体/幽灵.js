import { AssetManager } from "../../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { adjustCanvasAlpha, partialDraw } from "./metaDraw";
import { Tools } from "@mod-utils/Tools";

/** @type {(AssetLayerDefinition & {PGroups:CustomGroupName[], PGShow?:boolean})[]} */
const bodyLayers = [
    {
        Name: "HairBack",
        PGroups: ["HairBack", "新后发_Luzi"],
        AllowTypes: { h: 0 },
        Priority: 5,
    },
    {
        Name: "Head",
        PGroups: ["Head"],
        AllowTypes: { h: 0 },
        Priority: 7,
    },
    {
        Name: "HairFront",
        PGroups: ["HairFront", "新前发_Luzi"],
        AllowTypes: { h: 0 },
        Priority: 52,
    },
    {
        Name: "Head2",
        PGroups: ["HairBack", "新后发_Luzi", "Head", "HairFront", "新前发_Luzi"],
        AllowTypes: { h: 1 },
        Priority: 7,
    },
    {
        Name: "Body",
        PGroups: ["BodyUpper", "BodyLower", "ArmsLeft", "ArmsRight"],
        Priority: 7,
    },
    {
        Name: "Eyes",
        PGroups: ["Eyebrows", "Eyes", "右眼_Luzi", "Eyes2", "左眼_Luzi"],
        Priority: 9,
    },
    {
        Name: "Hands",
        PGroups: ["HandsLeft", "HandsRight"],
        Priority: 27,
    },
    {
        Name: "Mouth",
        PGroups: ["Mouth"],
        Priority: 10,
    },
    {
        Name: "Nipples",
        PGroups: ["Nipples"],
        Priority: 11,
    },
    {
        Name: "Pussy",
        PGroups: ["Pussy"],
        Priority: 12,
    },
    {
        Name: "Ears",
        PGroups: ["HairAccessory2"],
        PGShow: true,
        AllowTypes: { et: 1 },
        Priority: 53,
    },
    {
        Name: "Tail",
        PGroups: ["TailStraps"],
        PGShow: true,
        AllowTypes: { et: 1 },
        Priority: 4,
    },
];

const bodyLayerNames = new Map(bodyLayers.map((layer) => [layer.Name, layer]));

/**
 * @param {string} layerName
 * @returns {layerName is string}
 */
function isBodyLayer(layerName) {
    return bodyLayerNames.has(layerName);
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {string} color
 */
function clippingMask(canvas, color) {
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/** @type {ExtendedItemScriptHookCallbacks.AfterDraw<ModularItemData>} */
function afterDraw(data, originalFunction, drawData) {
    const { C, A, X, Y, Color, drawCanvas, drawCanvasBlink, AlphaMasks, L, Property } = drawData;
    const layerDef = bodyLayerNames.get(L);
    if (layerDef && isBodyLayer(L)) {
        const { Canvas, CanvasBlink } = partialDraw(C, A, layerDef.PGroups);
        const adjustedCanvas = adjustCanvasAlpha(C, A, Canvas, 0.5);
        const adjustedCanvasBlink = adjustCanvasAlpha(C, A, CanvasBlink, 0.5);

        if (Property.TypeRecord?.f === 1 && L === "Body") {
            const mask = Tools.getAssetURL(drawData, "Fade");
            DrawImageEx(mask, adjustedCanvas.getContext("2d"), X, Y, { BlendingMode: "destination-out" });
            DrawImageEx(mask, adjustedCanvasBlink.getContext("2d"), X, Y, { BlendingMode: "destination-out" });
        }

        drawCanvas(adjustedCanvas, 0, 0, AlphaMasks);
        drawCanvasBlink(adjustedCanvasBlink, 0, 0, AlphaMasks);
    }
    if (Property.TypeRecord?.le === 1 && L === "发光眼睛") {
        const { Canvas, CanvasBlink } = partialDraw(C, A, ["Eyes", "右眼_Luzi", "Eyes2", "左眼_Luzi"]);

        clippingMask(Canvas, Color);
        clippingMask(CanvasBlink, Color);

        drawCanvas(Canvas, 0, 0, AlphaMasks);
        drawCanvasBlink(CanvasBlink, 0, 0, AlphaMasks);
    }
}

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "幽灵人形_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 10,
    Gender: "F",
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    DynamicAfterDraw: true,
    ParentGroup: {},
    PoseMapping: {},
    AllowColorize: true,
    EditOpacity: true,
    DefaultColor: ["#DDDDDD", "#DDDDDD"],
    OverrideHeight: { Height: 30, Priority: 0 },
    Hide: /**@type {CustomGroupBodyName[]}*/ (
        bodyLayers
            .filter((l) => !l.PGShow)
            .map((layer) => layer.PGroups ?? [layer.Name])
            .flat()
    ),
    Layer: [
        ...bodyLayers.map((l) => ({
            ...l,
            AllowColorize: false,
            HasImage: false,
        })),
        {
            Name: "RimLight",
            Left: 180,
            Top: 120,
            AllowTypes: { le: 1 },
        },
        {
            Name: "发光眼睛",
            HasImage: false,
            AllowTypes: { le: 1 },
        },
    ],
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ScriptHooks: {
        AfterDraw: afterDraw,
    },
    Modules: [
        {
            Name: "眼睛发光",
            Key: "le",
            Options: [{}, {}],
        },
        {
            Name: "脚渐隐",
            Key: "f",
            Options: [{}, {}],
        },
        {
            Name: "头发遮挡",
            Key: "h",
            Options: [{}, {}],
        },
        {
            Name: "耳朵尾巴",
            Key: "et",
            Options: [
                {},
                {
                    Property: {
                        Hide: ["TailStraps", "HairAccessory2"],
                    },
                },
            ],
        },
    ],
};

const assetDialogs = {
    CN: {
        SelectBase: "选择幽灵身体设置",
        Module眼睛发光: "眼睛发光",
        Module脚渐隐: "脚渐隐",
        Module头发遮挡: "头发图层",
        Module耳朵尾巴: "耳朵尾巴",

        Select眼睛发光: "选择眼睛发光设置",
        Optionle0: "关闭",
        Optionle1: "开启",

        Select脚渐隐: "选择脚渐隐设置",
        Optionf0: "正常",
        Optionf1: "渐隐",

        Select头发遮挡: "选择头发遮挡设置",
        Optionh0: "显示头轮廓",
        Optionh1: "结合前发图层",

        Select耳朵尾巴: "选择耳朵尾巴设置",
        Optionet0: "实体化",
        Optionet1: "幽灵化",
    },
    EN: {
        SelectBase: "Select Ghost Body Settings",
        Module眼睛发光: "Eye Glow",
        Module脚渐隐: "Foot Fade",
        Module头发遮挡: "Hair Layering",
        Module耳朵尾巴: "Ear and Tail",

        Select眼睛发光: "Select Eye Glow Settings",
        Optionle0: "Off",
        Optionle1: "On",

        Select脚渐隐: "Select Foot Fade Settings",
        Optionf0: "Normal",
        Optionf1: "Fade",

        Select头发遮挡: "Select Hair Mask Settings",
        Optionh0: "Show Head Shape",
        Optionh1: "Merge Front Hair",

        Select耳朵尾巴: "Select Ear and Tail Settings",
        Optionet0: "Physical",
        Optionet1: "Ghostly",
    },
};

const translation = {
    CN: "幽灵人形",
    EN: "Ghost Body",
};

const layerNames = {
    CN: {
        RimLight: "眼睛轮廓光",
        发光眼睛: "眼睛发光",
    },
    EN: {
        RimLight: "Eye Rim Light",
        发光眼睛: "Eye Glow",
    },
};

export default function () {
    const assetGroup = "动物身体_Luzi";

    HookManager.globalFunction(`Assets${assetGroup}${asset.Name}AfterDraw`, afterDraw);

    AssetManager.addAssetWithConfig(assetGroup, asset, {
        translation,
        layerNames,
        extended,
        assetDialogs,
    });
}
