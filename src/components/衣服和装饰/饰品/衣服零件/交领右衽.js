import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../../assetForward";
import { createAfterDrawProcess, PoseMapTool, Type, GLImageRenderer, PartsMask } from "../../../../lib";

const afterDraw = createAfterDrawProcess(
    "typed",
    /** @type {{mask:PartsMask,canvas:HTMLCanvasElement,renderer:GLImageRenderer}}*/ ({}),
    ({ C, A, PersistentData }) => {
        const data = PersistentData();
        data.canvas ??= AnimationGenerateTempCanvas(C, A, 500, 1000);
        data.renderer ??= new GLImageRenderer(data.canvas);
        data.mask ??= new PartsMask(
            AnimationGenerateTempCanvas(C, A, 500, 1000),
            Type.groups(["Cloth", "ClothAccessory", "Bra", "BodyUpper"]),
            Type.groups(["ArmsLeft", "AnkletRight", "HandsLeft", "HandsRight"])
        );
        data.mask.draw(C);
        return { mask: data.mask, canvas: data.canvas, renderer: data.renderer };
    }
).onLayer(["A3", "A4"], ({ mask, renderer, canvas }, drawData) => {
    const { X, Y, Color, Opacity, AlphaMasks, drawCanvas, drawCanvasBlink } = drawData;

    const url = Tools.getAssetURL(drawData);

    const src = DrawGetImage(url);
    if (!src.complete) return;

    const color =
        Color === "Default" ? undefined : /** @type {[number, number, number, number]} */ (GLDrawHexToRGBA(Color));

    renderer.clearRect(0, 0, canvas.width, canvas.height);
    renderer.drawImage(src, X, Y - CanvasUpperOverflow, { color, colorAlpha: Opacity, alphaTex: mask.result });

    drawCanvas(canvas, 0, CanvasUpperOverflow, AlphaMasks);
    drawCanvasBlink(canvas, 0, CanvasUpperOverflow, AlphaMasks);
});

/** @type { AddAssetWithConfigParams }} */
const assets = [
    ["ClothAccessory"],
    {
        Name: "交领右衽",
        Random: false,
        Left: 130,
        Top: 210,
        ParentGroup: {},
        DynamicGroupName: "ClothAccessory",
        PoseMapping: PoseMapTool.config([], ["Hogtied", "AllFours"]),
        Priority: 27,
        Layer: [
            { Name: "A1" },
            { Name: "A2" },
            { Name: "A3", HasImage: false, AllowTypes: { typed: [1] } },
            { Name: "A4", HasImage: false, AllowTypes: { typed: [1, 2] } },
        ],
    },
    {
        translation: { CN: "交领右衽", EN: "Cross-collar Right Overlap" },
        extended: {
            Archetype: "typed",
            Options: [{ Name: "D" }, { Name: "E" }, { Name: "EH" }],
            ScriptHooks: afterDraw.hooks(),
        },
        assetStrings: {
            CN: {
                Select: "请选择交领右衽的样式",
                SetD: "默认",
                SetE: "延长",
                SetEH: "延长(仅边线)",
            },
            EN: {
                Select: "Please select a style for the Cross-collar Right Overlap",
                SetD: "Default",
                SetE: "Extended",
                SetEH: "Extended (Edge Only)",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...assets);
}
