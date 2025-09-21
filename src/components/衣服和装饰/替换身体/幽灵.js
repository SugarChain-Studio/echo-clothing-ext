import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../lib";
import { adjustCanvasAlpha, partialDraw } from "./metaDraw";
import { ImageMapTools, PoseMapTools, Tools } from "@mod-utils/Tools";

const mergingClothes = Typing.groups([
    "Bra",
    "Panties",
    "Suit",
    "SuitLower",
    "Bra_笨笨蛋Luzi",
    "Panties_笨笨蛋Luzi",
    "Suit_笨笨蛋Luzi",
    "SuitLower_笨笨蛋Luzi",
    "Socks",
    "SocksLeft",
    "SocksRight",
    "Corset",
    "Garters",
]);

/** @type {(AssetLayerDefinition & {PGroups:CustomGroupName[], PGShow?:boolean})[]} */
const baseBodyLayers = [
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
        AllowTypes: { h: [0, 1] },
        Priority: 7,
    },
    {
        Name: "Eyes",
        PGroups: ["Eyebrows", "Eyes", "右眼_Luzi", "Eyes2", "左眼_Luzi"],
        AllowTypes: { h: [0, 1] },
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
        AllowTypes: { h: [0, 1] },
        Priority: 10,
    },
    {
        Name: "Nipples",
        PGroups: ["Nipples"],
        AllowTypes: { h: [0, 1] },
        Priority: 11,
    },
    {
        Name: "Pussy",
        PGroups: ["Pussy"],
        AllowTypes: { h: [0, 1] },
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

const fullGroups = baseBodyLayers
    .filter((l) => !l.PGShow)
    .map((l) => l.PGroups)
    .flat();

const noHandsGroups = fullGroups.filter((g) => !["HandsLeft", "HandsRight"].includes(g));

const bodyLayers = baseBodyLayers.concat([
    {
        Name: "FullBody",
        PGroups: noHandsGroups,
        AllowTypes: { h: 2 },
        Priority: 12,
    },
    {
        Name: "FullBody2",
        PGroups: [...noHandsGroups, ...mergingClothes],
        AllowTypes: { h: 3 },
        Priority: 15,
    },
]);

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
        const pChara = { ...C, DrawAppearance: C.DrawAppearance.filter((a) => a.Asset.Name !== A.Name) };
        const groups = (layerDef.PGroups || [])
            .map((g) => C.Appearance.find((a) => a.Asset.Group.Name === g))
            .filter(Boolean)
            .filter((a) => CharacterAppearanceVisible(pChara, a.Asset.Name, a.Asset.Group.Name))
            .map((a) => a.Asset.Group.Name);

        if (groups.length === 0) return;

        const { Canvas, CanvasBlink } = partialDraw(C, A, groups);
        const adjustedCanvas = adjustCanvasAlpha(C, A, Canvas, 0.5);
        const adjustedCanvasBlink = adjustCanvasAlpha(C, A, CanvasBlink, 0.5);

        if (L === "Body" || L === "FullBody" || L === "FullBody2") {
            const ctx = adjustedCanvas.getContext("2d");
            const ctxBlink = adjustedCanvasBlink.getContext("2d");
            if (C.PoseMapping.BodyUpper === "BaseUpper" || C.PoseMapping.BodyUpper === "TapedHands") {
                const bodySize = C.Appearance.find((a) => a.Asset.Group.Name === "BodyUpper");
                if (bodySize) {
                    for (const g of Typing.groups(["HandsLeft", "HandsRight"])) {
                        const armMask = ImageMapTools.assetLayer(
                            g,
                            `${bodySize.Asset.Name}_Asian`,
                            C.PoseMapping.BodyUpper === "TapedHands" ? "TapedHands" : undefined
                        );
                        DrawImageEx(armMask, ctx, X, Y, { BlendingMode: "destination-out" });
                        DrawImageEx(armMask, ctxBlink, X, Y, { BlendingMode: "destination-out" });
                    }
                }
            }
            if (Property.TypeRecord?.f === 1) {
                const mask = Tools.getAssetURL(drawData, "Fade");
                DrawImageEx(mask, adjustedCanvas.getContext("2d"), X, Y, { BlendingMode: "destination-out" });
                DrawImageEx(mask, adjustedCanvasBlink.getContext("2d"), X, Y, { BlendingMode: "destination-out" });
            }
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
    ParentGroup: {},
    PoseMapping: {},
    AllowColorize: true,
    EditOpacity: true,
    DefaultColor: ["#DDDDDD", "#DDDDDD"],
    OverrideHeight: { Height: 30, Priority: 0 },
    Hide: fullGroups,
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
        {
            Name: "HandMask",
            Priority: 26,
            ParentGroup: "BodyUpper",
            TextureMask: {},
            BlendingMode: "destination-out",
            PoseMapping: PoseMapTools.FromTopHide({
                BaseUpper: "",
                TapedHands: "TapedHands",
            }),
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
            Name: "图层",
            Key: "h",
            Options: [{}, {}, {}, { Property: { Hide: mergingClothes } }],
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

const assetStrings = {
    CN: {
        SelectBase: "选择幽灵身体设置",
        Module眼睛发光: "眼睛发光",
        Module脚渐隐: "脚渐隐",
        Module耳朵尾巴: "耳朵尾巴",

        Select眼睛发光: "选择眼睛发光设置",
        Optionle0: "关闭",
        Optionle1: "开启",

        Select脚渐隐: "选择脚渐隐设置",
        Optionf0: "正常",
        Optionf1: "渐隐",

        Module图层: "图层",
        Select图层: "选择图层合并设置",
        Optionh0: "默认分离图层",
        Optionh1: "合并头发和头",
        Optionh2: "合并所有身体图层",
        Optionh3: "合并身体和贴身衣服",

        Select耳朵尾巴: "选择耳朵尾巴设置",
        Optionet0: "实体化",
        Optionet1: "幽灵化",
    },
    EN: {
        SelectBase: "Select Ghost Body Settings",
        Module眼睛发光: "Eye Glow",
        Module脚渐隐: "Foot Fade",
        Module耳朵尾巴: "Ear and Tail",

        Select眼睛发光: "Select Eye Glow Settings",
        Optionle0: "Off",
        Optionle1: "On",

        Select脚渐隐: "Select Foot Fade Settings",
        Optionf0: "Normal",
        Optionf1: "Fade",

        Module图层: "Layering",
        Select图层: "Select Layering Settings",
        Optionh0: "Default Separate Layers",
        Optionh1: "Merge Hair and Head",
        Optionh2: "Merge All Body Layers",
        Optionh3: "Merge Body and Underwear",

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

    AssetManager.addAssetWithConfig(assetGroup, asset, {
        translation,
        layerNames,
        extended,
        assetStrings,
    });
}
