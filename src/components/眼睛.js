import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../assetForward";

/** @type {ExpressionName[]} */
const eyeExpressions = [
    "Closed",
    "Dazed",
    "Shy",
    "Sad",
    "Horny",
    "Lewd",
    "VeryLewd",
    "Heart",
    "HeartPink",
    "LewdHeart",
    "LewdHeartPink",
    "Dizzy",
    "Daydream",
    "ShylyHappy",
    "Angry",
    "Surprised",
    "Scared",
];

/** @type {CustomGroupDefinition} */
const left_eye = {
    Group: "左眼_Luzi",
    Priority: 9,
    Left: 200,
    Top: 140,
    Blink: true,
    Random: false,
    Default: false,
    Hide: ["Eyes2"],
    AllowExpression: eyeExpressions,
    PreviewZone: [190, 100, 120, 120],
    Asset: [],
};

/** @type {CustomGroupDefinition} */
const right_eye = {
    Group: "右眼_Luzi",
    Priority: 9,
    Left: 250,
    Top: 140,
    Blink: true,
    Random: false,
    Default: false,
    Hide: ["Eyes"],
    AllowExpression: eyeExpressions,
    PreviewZone: [190, 100, 120, 120],
    Asset: [],
};

export default function () {
    HookManager.progressiveHook("CharacterSetFacialExpression").inject((args) => {
        const callWithDifferentGroup = (group) => {
            HookManager.invokeOriginal("CharacterSetFacialExpression", args[0], group, args[2], args[3], args[4]);
        };
        if (args[1] === "Eyes1" || args[1] === "Eyes") {
            callWithDifferentGroup("右眼_Luzi");
        } else if (args[1] === "Eyes2") {
            callWithDifferentGroup("左眼_Luzi");
        }
    });

    AssetManager.addGroup(left_eye, {
        CN: "🍔左眼(覆盖)",
        EN: "🍔Left Eye (Over)",
    });
    AssetManager.addGroup(right_eye, {
        CN: "🍔右眼(覆盖)",
        EN: "🍔Right Eye (Over)",
    });
}
