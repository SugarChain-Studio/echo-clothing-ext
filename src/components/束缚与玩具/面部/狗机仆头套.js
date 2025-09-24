import { DialogTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { createAfterDrawProcess } from "../../../lib";

const afterDraw = createAfterDrawProcess("text", {}, (_, data) => data).onLayer("text", (data, drawData) => {
    const { C, A, Color, Property, X, Y, AlphaMasks, drawCanvas, drawCanvasBlink } = drawData;

    if (Property.TypeRecord.t !== 0) return;

    const thisConfig = { w: 80, y: 8, r: 200 };

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

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "狗机仆头套",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 6,
    Time: 15,
    AllowLock: true,
    AllowTighten: true,
    DynamicGroupName: "ItemHood",
    Fetish: ["Latex", "Leather"],
    Effect: [E.GagEasy, E.OpenMouth],
    Block: ["ItemNose", "ItemHead"],
    DefaultColor: ["#1C1C1C", "#B6B6B6", "#B6B6B6", "#DFDFDF"],
    Layer: [
        { Name: "base" },
        { Name: "outline" },
        { Name: "shade", BlendingMode: "multiply", AllowColorize: false },
        { Name: "line" },
        { Name: "text", Left: 250, Top: 100, HasImage: false },
        { Name: "highlight", BlendingMode: "screen", AllowColorize: false },
    ],
    Alpha: [
        {
            Group: ["Head"],
            Masks: [
                [194, 162, 24, 32],
                [282, 162, 24, 32],
            ],
            AllowTypes: { AC: 1 },
        },
    ],
};

/**@type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    ChatTags: Tools.CommonChatTags(),
    BaselineProperty: { Text: "TOY" },
    Modules: [
        {
            Name: "文字",
            Key: "t",
            Options: [
                {
                    HasSubscreen: true,
                    ArchetypeConfig: {
                        Archetype: ExtendedArchetype.TEXT,
                        MaxLength: { Text: 20 },
                        Font: "'Saira Stencil One', 'Arial', sans-serif",
                        ScriptHooks: afterDraw.hooks(),
                    },
                },
                {},
            ],
        },
        {
            Name: "透光度",
            DrawImages: false,
            Key: "l",
            Options: [{}, { Property: { Effect: [E.BlindHeavy, E.DeafLight, E.BlockWardrobe] } }],
        },
        {
            Name: "隐藏前发",
            DrawImages: false,
            Key: "F",
            Options: [{ Property: { Hide: ["HairFront", "HairBack"] } }, {}],
        },
        {
            Name: "隐藏后发",
            DrawImages: false,
            Key: "B",
            Options: [{ Property: { Hide: ["HairBack"] } }, {}],
        },
        {
            Name: "隐藏其他",
            DrawImages: false,
            Key: "AC",
            Options: [{ Property: { Hide: ["HairAccessory1", "HairAccessory2", "HairAccessory3"] } }, {}],
        },
    ],
};

/**@type {Translation.Dialog} */
const assetStrings = DialogTools.combine(
    {
        CN: {
            SelectBase: "透光度",

            Module文字: "文字",
            Select文字: "设置头套文字",
            Optiont0: "设置文字",
            Optiont1: "无文字",

            Module透光度: "透光度",
            Select透光度: "设置阻挡视线",
            Optionl0: "不阻挡视线",
            Optionl1: "阻挡视线",
            Setl0: "SourceCharacter使DestinationCharacterAssetName不阻挡视线",
            Setl1: "SourceCharacter使DestinationCharacterAssetName阻挡视线",
        },
        EN: {
            SelectBase: "Transparency",

            Module文字: "Text",
            Select文字: "Set Hood Text",
            Optiont0: "Set Text",
            Optiont1: "No Text",

            Module透光度: "Hinder Vision",
            Select透光度: "Set Hinder Vision",
            Optionl0: "Not Hinder",
            Optionl1: "Hinder",
            Setl0: "SourceCharacter makes DestinationCharacter AssetName not hinder vision.",
            Setl1: "SourceCharacter makes DestinationCharacter AssetName hinder vision.",
        },
    },
    DialogTools.showHide({
        moduleName: "隐藏前发",
        key: "F",
        moduleText: { CN: "前发", EN: "Front Hair" },
        reverse: true,
    }),
    DialogTools.showHide({
        moduleName: "隐藏后发",
        key: "B",
        moduleText: { CN: "后发", EN: "Back Hair" },
        reverse: true,
    }),
    DialogTools.showHide({
        moduleName: "隐藏其他",
        key: "AC",
        moduleText: { CN: "发饰和耳朵", EN: "Hair Acc. and Ears" },
        fullText: { CN: "发饰和耳朵", EN: "Hair Accessories and Ears" },
    })
);

const translation = {
    CN: "乳胶狗机仆头套",
    EN: "Latex Dog Drone Hood",
};

const layerNames = {
    CN: {
        base: "底色",
        outline: "轮廓",
        line: "线条",
        text: "文字",
    },
    EN: {
        base: "Base",
        outline: "Outline",
        line: "Line",
        text: "Text",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ItemHood", asset, {
        translation,
        layerNames,
        extended,
        assetStrings,
    });
}
