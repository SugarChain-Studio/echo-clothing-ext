import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "刻度尺_Luzi",
    Random: false,
    Gender: "F",
    Top: 420,
    Left: 150,
    Priority: 9,
    ParentGroup: {},
    DefaultColor: ["#493F3F", "#493F3F"],
    Layer: [
        { Name: "Lines", HasImage: false },
        { Name: "Text", HasImage: false },
    ],
};

const translation = { CN: "刻度尺", EN: "Ruler" };

const layerNames = {
    CN: {
        Lines: "线条",
        Text: "文本",
    },
    EN: {
        Lines: "Lines",
        Text: "Text",
    },
};

/** @type {ExtendedItemScriptHookCallbacks.AfterDraw<TextItemData>} */
function afterDraw(
    data,
    originalFunction,
    { C, A, CA, X, Y, Property, AlphaMasks, L, Color, drawCanvas, drawCanvasBlink }
) {
    const tempCanvs = AnimationGenerateTempCanvas(C, A, 200, 120);
    const ctx = tempCanvs.getContext("2d");
    if (L === "Lines") {
        ctx.strokeStyle = Color;

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(100, 13);
        ctx.bezierCurveTo(98, 23, 103, 43, 100, 60);
        ctx.lineTo(100, 85);
        ctx.stroke();

        ctx.lineWidth = 1.5;
        ctx.beginPath();
        [20, 40, 60, 80].forEach((y, idx) => {
            ctx.moveTo(93 + idx, y);
            ctx.bezierCurveTo(97, y + (idx % 3) - 1, 103, y + 1 - (idx % 3), 107 - idx, y);
        });
        ctx.stroke();

        ctx.fillStyle = Color;
        ctx.beginPath();
        ctx.moveTo(100, 13);
        ctx.arc(100, 13, 1, 0, Math.PI * 2);
        ctx.arc(100, 85, 1, 0, Math.PI * 2);
        [20, 40, 60, 80].forEach((y, idx) => {
            ctx.moveTo(93 + idx, y);
            ctx.arc(93 + idx, y, 0.75, 0, Math.PI * 2);
            ctx.arc(107 - idx, y, 0.75, 0, Math.PI * 2);
        });
        ctx.fill();
    }
    if (L === "Text") {
        //
        ctx.font = "cursive 10px Satisfy";
        ctx.fillStyle = Color;

        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";

        const props = /**@type {any}*/ (Property);

        /** @type {DynamicDrawOptions} */
        const config = {
            fontFamily: data.font,
            fontSize: 12,
            color: Color,
            textAlign: "left",
            textBaseline: "bottom",
        };

        if (props) {
            if (props.Text) DynamicDrawText(props.Text, ctx, 105, 20, config);
            if (props.Text2) DynamicDrawText(props.Text2, ctx, 105, 40, config);
            if (props.Text3) DynamicDrawText(props.Text3, ctx, 105, 60, config);
            if (props.Text4) DynamicDrawText(props.Text4, ctx, 105, 80, config);
        }
    }

    drawCanvas(tempCanvs, X, Y, AlphaMasks);
    drawCanvasBlink(tempCanvs, X, Y, AlphaMasks);
}

/** @type {TextItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TEXT,
    ChatTags: Tools.CommonChatTags(),
    ScriptHooks: {
        AfterDraw: afterDraw,
    },
    Font: "Nanum Pen Script",
    BaselineProperty: /** @type {ItemProperties}*/ ({ Text4: "no", Text3: "haha", Text2: "harder", Text: "BREED ME" }),
    MaxLength: {
        Text: 10,
        ...[2, 3, 4].reduce((pv, cv) => {
            pv[`Text${cv}`] = 10;
            return pv;
        }, {}),
    },
};

export default function () {
    AssetManager.addAssetWithConfig("BodyMarkings", asset, {
        translation,
        layerNames,
        extended,
    });
}
