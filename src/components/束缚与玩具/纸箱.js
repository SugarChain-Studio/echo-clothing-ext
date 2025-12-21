import { Tools } from "@mod-utils/index";
import { AssetManager } from "../../assetForward";
import { luziSuffixFixups } from "../../lib/fixups";

/** @type {ExtendedItemScriptHookCallbacks.AfterDraw<TextItemData>} */
function afterDraw(
    data,
    originalFunction,
    { C, A, CA, X, Y, Property, AlphaMasks, L, Color, drawCanvas, drawCanvasBlink }
) {
    const Width = 200;
    const Height = 150;

    if (L === "Text" && Property?.TypeRecord?.t === 1) {
        const TempCanvas = AnimationGenerateTempCanvas(C, A, Width, Height);

        TextItem.Init(data, C, CA, false, false);

        /** @type {DynamicDrawOptions} */
        const config = {
            fontSize: 32,
            fontFamily: data.font,
            color: Color,
            textAlign: "center",
            width: Width / 2,
        };
        const ctx = TempCanvas.getContext("2d");
        ctx.rotate(Math.PI / 6);
        DynamicDrawText(CA.Property.Text, ctx, Width / 2, Height / 2 - 14, config);

        drawCanvas(TempCanvas, X + 150, Y + 120, AlphaMasks);
        drawCanvasBlink(TempCanvas, X + 150, Y + 120, AlphaMasks);
    }
}

/** @type {AddAssetWithConfigParams} */
const assets = [
    "ItemDevices",
    {
        Name: "纸箱",
        Random: false,
        Top: 0,
        Left: 0,
        Priority: 55,
        DefaultColor: ["Default", "#000000", "#000000"],
        Layer: [
            {
                Name: "B",
                Priority: 5,
                PoseMapping: { KneelingSpread: "Kneel", Kneel: "Kneel", Hogtied: "Hogtied", AllFours: "Hogtied" },
            },
            {
                HasImage: false,
                AllowColorize: false,
                Alpha: [
                    {
                        Masks: [
                            [0, -CanvasUpperOverflow, 500, CanvasUpperOverflow + 30],
                            [-250, -CanvasUpperOverflow, 111 + 250, CanvasUpperOverflow + 290],
                            [500 - 111, -CanvasUpperOverflow, 111 + 250, CanvasUpperOverflow + 290],
                        ],
                    },
                ],
            },
            {
                Name: "F",
                CreateLayerTypes: ["e"],
                CopyLayerColor: "B",
                PoseMapping: { KneelingSpread: "Kneel", Kneel: "Kneel", Hogtied: "Hogtied", AllFours: "Hogtied" },
            },
            { Name: "Icon" },
            { Name: "Text", HasImage: false },
        ],
    },
    {
        translation: { CN: "纸箱", EN: "Cardboard Box" },
        layerNames: { CN: { B: "箱子", Icon: "图标", Text: "文字" }, EN: { B: "Box", Icon: "Icon", Text: "Text" } },
        extended: {
            Archetype: ExtendedArchetype.MODULAR,
            ChatTags: Tools.CommonChatTags(),
            ChangeWhenLocked: false,
            BaselineProperty: { Text: "Fragile" },
            Modules: [
                {
                    Name: "Eye",
                    Key: "e",
                    Options: [{ Property: { Effect: [E.BlindLight] } }, {}],
                },
                {
                    Name: "Text",
                    Key: "t",
                    Options: [
                        {},
                        {
                            HasSubscreen: true,
                            ArchetypeConfig: {
                                Archetype: ExtendedArchetype.TEXT,
                                MaxLength: { Text: 16 },
                                Font: "Archivo Black",
                                ScriptHooks: {
                                    AfterDraw: afterDraw,
                                },
                            },
                        },
                    ],
                },
            ],
        },

        assetStrings: {
            CN: {
                SelectBase: "配置纸箱外观",

                ModuleEye: "眼睛开孔",
                SelectEye: "设置纸箱眼睛开孔状态",
                Optione0: "闭合",
                Optione1: "开启",

                Sete0: "SourceCharacter把DestinationCharacterAssetName换成了没有眼睛开孔的纸箱。",
                Sete1: "SourceCharacter在DestinationCharacterAssetName上打开了眼睛开孔。",

                ModuleText: "文字",
                SelectText: "设置纸箱上的文字",
                Optiont0: "无",
                Optiont1: "自定义文字",
            },
            EN: {
                SelectBase: "Configure Cardboard Box Appearance",

                ModuleEye: "Eye Holes",
                SelectEye: "Set Cardboard Box Eye Hole State",
                Optione0: "Closed",
                Optione1: "Open",

                Sete0: "SourceCharacter changes DestinationCharacterAssetName to a cardboard box without eye holes.",
                Sete1: "SourceCharacter opens eye holes on DestinationCharacterAssetName.",

                ModuleText: "Text",
                SelectText: "Set Text on the Cardboard Box",
                Optiont0: "None",
                Optiont1: "Custom Text",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...assets);
    luziSuffixFixups(assets[0], assets[1].Name);
}
