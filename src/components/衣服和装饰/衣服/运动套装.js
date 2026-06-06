import { ImageMapTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "@local/AssetManager";
import { ArmMaskTool, PoseMapTool } from "@local/lib/generator";
import { PostPass } from "@local/lib/pass";
import { Layer, Access } from "@local/lib/type";
import { createAfterDrawProcess } from "@local/lib/draw";

const afterDraw = createAfterDrawProcess("text", {}, (_, data) => data).onLayer("text", (drawData, data) => {
    const { C, A, Color, Property, X, Y, G, AlphaMasks, drawCanvas, drawCanvasBlink } = drawData;

    if (Property?.TypeRecord?.["t"] !== 0) return;

    const config = /** @type {const}*/ ({
        Small: { w: 45, y: 8, r: 400 },
        Normal: { w: 60, y: 5, r: 300 },
        Large: { w: 70, y: 3, r: 250 },
        XLarge: { w: 80, y: 5, r: 200 },
    });

    const thisConfig = Access.getOr(config, G, config.Normal);

    const height = 48;
    const width = thisConfig.w;
    const yoff = thisConfig.y;
    const radius = thisConfig.r;
    const canvas = AnimationGenerateTempCanvas(C, A, width, height);
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    DynamicDrawTextArc(Property.Text ?? "", ctx, width / 2, height / 2, {
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

/**
 *
 * @param {CustomGroupName[]} group
 * @param {AddAssetWithConfigParams[1]} asset
 * @param {AddAssetWithConfigParams[2]} config
 * @param {(group: CustomGroupName, asset: AddAssetWithConfigParams[1], config: AddAssetWithConfigParams[2]) => AddAssetWithConfigParams} mapper
 * @returns {AddAssetWithConfigParams[]}
 */
function mapAssetParams(group, asset, config, mapper) {
    return group.map((g) => mapper(g, asset, config));
}

/** @type {AddAssetWithConfigParams[]} */
const assets = [
    [
        ["Cloth", "Bra"],
        PostPass.asset(
            {
                Name: "运动套装top",
                Random: false,
                Gender: "F",
                Left: 170,
                Top: 220,
                Prerequisite: ["HasBreasts"],
                ParentGroup: "BodyUpper",
                DynamicGroupName: "Bra",
                DefaultColor: ["#DDDDDD", "#1C1C1C", "#BBBBBB"],
                PoseMapping: PoseMapTool.hideFullBody(),
                Layer: [
                    { Name: "l", Priority: 15 },
                    { Name: "bd", CreateLayerTypes: ["m"] },
                    { Name: "text", HasImage: false, Left: 250, Top: 280 },
                    Layer.screen({ Name: "bg", CreateLayerTypes: ["m"] }),
                ],
            },
            (asset) => ArmMaskTool.createArmMaskForCloth(asset.DynamicGroupName, asset)
        ),
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
                                    ScriptHooks: afterDraw.hooks(),
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
    ...mapAssetParams(
        ["ClothLower", "Panties"],
        {
            Name: "运动套装bottom",
            Random: false,
            Gender: "F",
            Left: 130,
            Top: 370,
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            DynamicGroupName: "Panties",
            DefaultColor: "#1C1C1C",
            PoseMapping: PoseMapTool.hideFullBody(),
            Layer: [{ Name: "d", CreateLayerTypes: ["m"] }, Layer.screen({ Name: "g", CreateLayerTypes: ["m"] })],
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
        (g, asset, config) => [
            g,
            {
                ...asset,
                ...(g === "ClothLower"
                    ? Tools.topLeftBuilder({ Top: 370, Left: 130 }, ["KneelingSpread", { Left: 220 }])
                    : Tools.topLeftBuilder({ Top: 370, Left: 130 })),
            },
            config,
        ]
    ),
    [
        ["ClothLower"],
        {
            Name: "运动套装skirt",
            Random: false,
            Gender: "F",
            ...Tools.topLeftBuilder({ Top: 370, Left: 130 }, ["KneelingSpread", { Left: 220 }]),
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            DynamicGroupName: "ClothLower",
            DefaultColor: ["#1C1C1C", "#DDDDDD"],
            Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
            PoseMapping: PoseMapTool.hideFullBody(),
            Layer: [
                { Name: "d", CreateLayerTypes: ["m"] },
                { Name: "l" },
                Layer.screen({ Name: "g", CreateLayerTypes: ["m"] }),
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
    [
        ["ClothAccessory", "Mask"],
        {
            Name: "运动套装ha",
            Random: false,
            Gender: "F",
            Left: 210,
            Top: 170,
            ParentGroup: {},
            DynamicGroupName: "ClothAccessory",
            PoseMapping: {},
            Layer: [{ Name: "b" }, { Name: "s" }],
        },
        {
            translation: {
                CN: "运动套装纱布",
                EN: "Sporty Set-up Gauze",
            },
            layerNames: {
                CN: { b: "纱布", s: "胶带" },
                EN: { b: "Gauze", s: "Tape" },
            },
        },
    ],
    [
        ["ClothAccessory", "Necklace", "Jewelry"],
        {
            Name: "运动套装nl",
            Random: false,
            Gender: "F",
            Left: 210,
            Top: 210,
            ParentGroup: {},
            DynamicGroupName: "ClothAccessory",
            PoseMapping: {},
            DefaultColor: ["#292929", "#00BBA6", "#FF4F4F", "#FF4F4F"],
            Layer: [
                { Name: "cbd", Priority: 6 },
                Layer.screen({ Name: "cbg", Priority: 6 }),
                { Name: "cfd", CopyLayerColor: "cbd" },
                Layer.screen({ Name: "cfg" }),
                { Name: "crd" },
                Layer.screen({ Name: "crg" }),
                { Name: "dud" },
                { Name: "dld" },
                Layer.screen({ Name: "dg" }),
            ],
        },
        {
            translation: {
                CN: "运动套装项链",
                EN: "Sporty Set-up Necklace",
            },
            layerNames: {
                CN: { cbd: "链条", crd: "缠绕水晶", dud: "上宝石", dld: "下宝石" },
                EN: { cbd: "Chain", crd: "Wrapped Crystal", dud: "Upper Gem", dld: "Lower Gem" },
            },
        },
    ],
];

export default function () {
    for (const [_, asset, option] of assets.filter((p) => p[0].includes("ClothLower"))) {
        AssetManager.addImageMapping(
            ImageMapTools.mirrorBodyTypeLayer(
                asset.DynamicGroupName,
                asset,
                "Normal",
                ["Large", "XLarge"],
                /** @type {ExtendedItemConfig<any>}*/ (option.extended)
            )
        );
    }

    AssetManager.addAssetWithConfig(assets);
}
