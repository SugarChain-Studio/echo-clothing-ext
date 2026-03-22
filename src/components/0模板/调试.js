import { debugFlag } from "@mod-utils/rollupHelper";
import { AssetManager } from "../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { PostPass } from "../../lib";
import { registerDrawHook } from "../../lib/afterDraw";
import { PartsMask } from "../../lib/draw/partsMask";

/**
 * @typedef {Object} GrayBodyDrawItem
 * @property {PartsMask} mask
 * @property {HTMLCanvasElement} canvas
 *
 * @typedef {Object} GrayBodyDrawData
 * @property {GrayBodyDrawItem} Tops
 * @property {GrayBodyDrawItem} Bottoms
 * @property {GrayBodyDrawItem} Hands
 */

/**
 * @typedef {keyof GrayBodyDrawData} GrayBodyPersistentDataKey
 */

/** @type {ExtendedItemCallbacks.AfterDraw<GrayBodyDrawData>} */
function afterDraw({ C, A, L, X, Y, Color, PersistentData, drawCanvas, drawCanvasBlink, AlphaMasks }) {
    /** @type {Record<string, AssetGroupName[]>} */
    const layers = {
        Tops: ["Head", "BodyUpper", "ArmsRight", "ArmsLeft"],
        Bottoms: ["BodyLower"],
        Hands: ["HandsLeft", "HandsRight"],
    };

    const groups = layers[L];

    if (!groups) return;

    const data = PersistentData();

    const target = (data[/** @type {GrayBodyPersistentDataKey}*/ (L)] ??= {
        mask: new PartsMask(AnimationGenerateTempCanvas(C, A, 500, 1000), groups),
        canvas: AnimationGenerateTempCanvas(C, A, 500, 1000),
    });

    target.mask.draw(C);

    const ctx = target.canvas.getContext("2d");
    ctx.fillStyle = Color === "Default" ? "#888888" : Color;
    ctx.fillRect(0, 0, target.canvas.width, target.canvas.height);

    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(target.mask.result, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    drawCanvas(target.canvas, X, Y, AlphaMasks);
    drawCanvasBlink(target.canvas, X, Y, AlphaMasks);
}

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        // 一个能隐藏身体的道具
        "外观工具",
        {
            Name: "隐藏身体",
            AllowColorize: false,
            Visible: false,
            Random: false,
            Hide: [
                "BodyLower",
                "BodyUpper",
                "HairFront",
                "HairBack",
                "Eyes",
                "Eyes2",
                "Mouth",
                "Nipples",
                "Pussy",
                "Head",
                "ArmsRight",
                "ArmsLeft",
                "HandsLeft",
                "HandsRight",
                "Blush",
                "EyeShadow",
                "Eyebrows",
            ],
        },
        { translation: { CN: "隐藏身体", EN: "Hide Body" } },
    ],
    [
        "外观工具",
        PostPass.asset(
            {
                Name: "灰色身体",
                Top: 0,
                Left: 0,
                Random: false,
                DefaultColor: "#CCCCCC",
                DynamicAfterDraw: true,
                Layer: [
                    { Name: "Tops", Priority: 8, HasImage: false },
                    { Name: "Bottoms", Priority: 10, HasImage: false, CopyLayerColor: "Tops" },
                    { Name: "Hands", Priority: 28, HasImage: false, CopyLayerColor: "Tops" },
                ],
                Hide: ["Eyes", "Eyes2", "Mouth", "Nipples", "Pussy", "Blush", "EyeShadow", "Eyebrows"],
            },
            (asset) => {
                registerDrawHook(asset, "外观工具", { afterDraw });
            }
        ),
        { translation: { CN: "灰色身体", EN: "Gray Body" } },
    ],
];

/** @type {typeof CommonTakePhoto} */
function takePhoto(Left, Top, Width, Height) {
    CommonPhotoMode = true;

    // redraw once in photo mode
    DrawProcess(0);

    const ImgData = /** @type {HTMLCanvasElement}*/ (document.getElementById("MainCanvas"))
        ?.getContext("2d")
        ?.getImageData(Left, Top, Width, Height);

    if (!ImgData) return;

    const PhotoCanvas = document.createElement("canvas");
    PhotoCanvas.width = Width;
    PhotoCanvas.height = Height;

    PhotoCanvas.getContext("2d")?.putImageData(ImgData, 0, 0);

    PhotoCanvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const filename = `photo_${Date.now()}.png`;

        const newWindow = window.open("about:blank", "_blank");

        if (!newWindow) {
            console.warn("Popups blocked: Cannot open photo in new tab.");
            return;
        }

        const doc = newWindow.document;
        doc.title = filename;

        const body = doc.body;
        body.style.fontFamily = "sans-serif";

        const bar = doc.createElement("div");
        bar.style.padding = "10px";

        const link = doc.createElement("a");
        link.href = url;
        link.download = filename;
        link.textContent = `Download ${filename}`;

        bar.appendChild(link);

        const img = doc.createElement("img");
        img.src = url;
        img.style.display = "block";
        img.style.maxWidth = "100%";

        body.appendChild(bar);
        body.appendChild(img);
    }, "image/png");

    CommonPhotoMode = false;
}

export default function load() {
    if (debugFlag) {
        HookManager.hookFunction("CommonTakePhoto", 0, (args) => {
            takePhoto(...args);
        });

        AssetManager.addAssetWithConfig(asset);

        // 聊天室隐藏图标设置为闭眼的时候，截角色图时隐藏背景
        HookManager.patchFunction("DialogDraw", {
            "if (!CurrentCharacter) return;":
                "if(ChatRoomHideIconState >= 2) MainCanvas.clearRect(0, 0, 2000, 1000); if (!CurrentCharacter) return;",
        });
    }
}
