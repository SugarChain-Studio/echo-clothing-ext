import { PoseMapTools } from "@mod-utils/Tools";
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
            extended: /** @type {TypedItemConfig} */ {
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
            assetStrings: {
                CN: {
                    SelectBase: "配置运动套装上衣",
                    Module材质: "材质",
                    Module文字: "文字",

                    Select材质: "配置运动套装上衣材质",
                    Optionm0: "布料",
                    Optionm1: "乳胶",

                    Select文字: "配置运动套装上衣文字",
                    Optiont0: "文字",
                    Optiont1: "无文字",
                },
                EN: {
                    SelectBase: "Configure Sporty Set-up Top",
                    Module材质: "Material",
                    Module文字: "Text",

                    Select材质: "Configure Sporty Set-up Top Material",
                    Optionm0: "Cloth",
                    Optionm1: "Latex",

                    Select文字: "Configure Sporty Set-up Top Text",
                    Optiont0: "Text",
                    Optiont1: "No Text",
                },
            },
        },
    ],
];

export default function () {
    ArmMaskTool.createArmMaskForCloth(params[0][0], params[0][1]);
    for (const p of params) {
        AssetManager.addAssetWithConfig(...p);
    }
}
