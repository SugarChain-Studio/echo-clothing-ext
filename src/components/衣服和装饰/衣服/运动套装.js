import { ImageMapTools, PoseMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { ArmMaskTool, createAfterDrawProcess } from "../../../lib";

const afterDraw = createAfterDrawProcess("text", {}, (_, data) => data).onLayer("text", (data, drawData) => {
    const { C, A, Color, Property, X, Y, G, AlphaMasks, drawCanvas, drawCanvasBlink } = drawData;

    if (Property.TypeRecord.t !== 0) return;

    const config = {
        Small: { w: 45, y: 8, r: 400 },
        Normal: { w: 60, y: 5, r: 300 },
        Large: { w: 70, y: 3, r: 250 },
        XLarge: { w: 80, y: 5, r: 200 },
    };

    const thisConfig = config[G] || config.Normal;

    const height = 48;
    const width = thisConfig.w;
    const yoff = thisConfig.y;
    const radius = thisConfig.r;
    const canvas = AnimationGenerateTempCanvas(C, A, width, height);
    const ctx = canvas.getContext("2d");

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    DynamicDrawTextArc(Property.Text, ctx, width / 2, height / 2, {
        fontSize: 48,
        fontFamily: data.font,
        width,
        color: Color,
        radius,
    });

    drawCanvas(canvas, X - width / 2, Y + yoff, AlphaMasks);
    drawCanvasBlink(canvas, X - width / 2, Y + yoff, AlphaMasks);
});

const assetStrings = {
    CN: {
        SelectBase: "配置运动套装",
        Module材质: "材质",
        Module文字: "文字",

        Select材质: "配置运动套装材质",
        Optionm0: "布料",
        Optionm1: "乳胶",

        Select文字: "配置运动套装文字",
        Optiont0: "文字",
        Optiont1: "无文字",
    },
    EN: {
        SelectBase: "Configure Sporty Set-up",
        Module材质: "Material",
        Module文字: "Text",

        Select材质: "Configure Sporty Set-up Material",
        Optionm0: "Cloth",
        Optionm1: "Latex",

        Select文字: "Configure Sporty Set-up Text",
        Optiont0: "Text",
        Optiont1: "No Text",
    },
};

/** @type {AddAssetWithConfigParams[]} */
const params = [
    [
        ["Cloth", "Bra"],
        {
            Name: "运动套装top",
            Random: false,
            Gender: "F",
            Left: 170,
            Top: 220,
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            DynamicGroupName: "LuziCustom",
            DefaultColor: ["#DDDDDD", "#1C1C1C", "#BBBBBB"],
            PoseMapping: PoseMapTools.HideFullBody(),
            Layer: [
                { Name: "l", Priority: 15 },
                { Name: "bd", CreateLayerTypes: ["m"] },
                { Name: "text", HasImage: false, Left: 250, Top: 280 },
                { Name: "bg", AllowColorize: false, BlendingMode: "screen", CreateLayerTypes: ["m"] },
            ],
        },
        {
            translation: {
                CN: "运动套装上衣",
                EN: "Sporty Set-up Top",
            },
            layerNames: {
                CN: { l: "系带", bd: "主体", text: "文字" },
                EN: { l: "Laces", bd: "Base", text: "Text" },
            },
            extended: /** @type {ModularItemConfig} */ {
                Archetype: ExtendedArchetype.MODULAR,
                DrawImages: false,
                BaselineProperty: {
                    Text: "Butterfly",
                },
                Modules: [
                    {
                        Name: "材质",
                        Key: "m",
                        Options: [{}, {}],
                    },
                    {
                        Name: "文字",
                        Key: "t",
                        Options: [
                            {
                                HasSubscreen: true,
                                ArchetypeConfig: {
                                    Archetype: ExtendedArchetype.TEXT,
                                    MaxLength: { Text: 20 },
                                    Font: "'Archivo Black', 'Impact', 'Arial Black', 'Franklin Gothic', 'Arial', sans-serif",
                                    ScriptHooks: {
                                        AfterDraw: (...args) => afterDraw.afterDraw(...args),
                                    },
                                },
                            },
                            {},
                        ],
                    },
                ],
            },
            assetStrings,
        },
    ],
    [
        ["ClothLower", "Panties"],
        {
            Name: "运动套装bottom",
            Random: false,
            Gender: "F",
            Left: 130,
            Top: 370,
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            DynamicGroupName: "LuziCustom",
            DefaultColor: "#1C1C1C",
            PoseMapping: PoseMapTools.HideFullBody(),
            Layer: [
                { Name: "d", CreateLayerTypes: ["m"] },
                { Name: "g", AllowColorize: false, BlendingMode: "screen", CreateLayerTypes: ["m"] },
            ],
        },
        {
            translation: {
                CN: "运动套装内裤",
                EN: "Sporty Set-up Bottom",
            },
            layerNames: {},
            extended: /** @type {ModularItemConfig} */ {
                Archetype: ExtendedArchetype.MODULAR,
                DrawImages: false,
                Modules: [{ Name: "材质", Key: "m", Options: [{}, {}] }],
            },
            assetStrings,
        },
    ],
    [
        ["ClothLower"],
        {
            Name: "运动套装skirt",
            Random: false,
            Gender: "F",
            Left: 130,
            Top: 370,
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            DynamicGroupName: "LuziCustom",
            DefaultColor: ["#1C1C1C", "#DDDDDD"],
            Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
            PoseMapping: PoseMapTools.HideFullBody(),
            Layer: [
                { Name: "d", CreateLayerTypes: ["m"] },
                { Name: "l" },
                { Name: "g", AllowColorize: false, BlendingMode: "screen", CreateLayerTypes: ["m"] },
            ],
        },
        {
            translation: {
                CN: "运动套装裙子",
                EN: "Sporty Set-up Skirt",
            },
            layerNames: {
                CN: { d: "裙子", l: "条纹" },
                EN: { d: "Skirt", l: "Stripe" },
            },
            extended: /** @type {ModularItemConfig} */ {
                Archetype: ExtendedArchetype.MODULAR,
                DrawImages: false,
                Modules: [{ Name: "材质", Key: "m", Options: [{}, {}] }],
            },
            assetStrings,
        },
    ],
];

export default function () {
    ArmMaskTool.createArmMaskForCloth("LuziCustom", params[0][1]);

    for (const [_, asset, option] of params.filter((p) => p[0].includes("ClothLower"))) {
        AssetManager.addImageMapping(
            ImageMapTools.mirrorBodyTypeLayer(
                "LuziCustom",
                asset,
                "Normal",
                ["Large", "XLarge"],
                /** @type {ExtendedItemConfig}*/ (option.extended)
            )
        );
    }

    for (const p of params) {
        AssetManager.addAssetWithConfig(...p);
    }
}
