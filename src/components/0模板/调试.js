import { debugFlag } from "@mod-utils/rollupHelper";
import { AssetManager } from "../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { PostPass } from "../../lib";
import { registerDrawHook } from "../../lib/afterDraw";
import { PartsMask } from "../../lib/partsMask";

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
 * @typedef {"Tops"|"Bottoms"|"Hands"} GrayBodyPersistentData
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
    data[L] ??= {
        mask: new PartsMask(AnimationGenerateTempCanvas(C, A, 500, 1000), groups),
        canvas: AnimationGenerateTempCanvas(C, A, 500, 1000),
    };

    /** @type {GrayBodyDrawItem} */
    const target = data[L];
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
                DefaultColor: "#888888",
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

export default function load() {
    if (debugFlag) {
        AssetManager.addAssetWithConfig(asset);

        // 聊天室隐藏图标设置为闭眼的时候，截角色图时隐藏背景
        HookManager.patchFunction("DialogDraw", {
            "if (!CurrentCharacter) return;":
                "if(ChatRoomHideIconState >= 2) MainCanvas.clearRect(0, 0, 2000, 1000); if (!CurrentCharacter) return;",
        });
    }
}
