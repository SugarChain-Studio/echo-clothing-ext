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

/**
 * @typedef {Object} EyeExtCharacter
 * @property {Item} [Eyes2]
 * @property {Item} [Eyes]
 * @property {Item} [左眼_Luzi]
 * @property {Item} [右眼_Luzi]
 */

/** @type {string[]} */
const eyeNames = ["Eyes2", "Eyes", "左眼_Luzi", "右眼_Luzi"];

export default function () {
    HookManager.hookFunction("CharacterSetFacialExpression", 0, (args, next) => {
        if (!wceAnimationEnabled()) {
            const callWithDifferentGroup = (group) => {
                HookManager.invokeOriginal(
                    "CharacterSetFacialExpression",
                    args[0],
                    /** @type {any} */ (group),
                    args[2],
                    args[3],
                    args[4]
                );
            };
            if (args[1] === "Eyes1" || args[1] === "Eyes") {
                callWithDifferentGroup(right_eye.Group);
            } else if (args[1] === "Eyes2") {
                callWithDifferentGroup(left_eye.Group);
            }
        }
        return next(args);
    });

    // Fix for WCE animation

    const wceAnimationEnabled = () => globalThis.bceAnimationEngineEnabled?.() ?? false;

    /** @type {EyeExtCharacter} */
    const eyes = {};
    /** @param {Character} chara */
    const updateExpressionRef = (chara) => {
        chara.Appearance.forEach((item) => {
            if (eyeNames.includes(item.Asset.Group.Name)) eyes[item.Asset.Group.Name] = item;
        });
        if (eyes.Eyes2 && eyes.左眼_Luzi) {
            eyes.左眼_Luzi.Property.Expression = eyes.Eyes2.Property.Expression;
        }
        if (eyes.Eyes && eyes.右眼_Luzi) {
            eyes.右眼_Luzi.Property.Expression = eyes.Eyes.Property.Expression;
        }
    };

    // Fix for WCE animation
    HookManager.hookFunction("CharacterLoadCanvas", 0, (args, next) => {
        if (wceAnimationEnabled() && args[0].IsPlayer()) {
            updateExpressionRef(Player);
        }
        return next(args);
    });
    HookManager.hookFunction("ServerSend", 0, (args, next) => {
        if (
            args[0] === "ChatRoomCharacterExpressionUpdate" &&
            wceAnimationEnabled() &&
            ["Eyes2", "Eyes"].includes(args[1].Group)
        ) {
            updateExpressionRef(Player);
            args[1].Group = args[1].Group === "Eyes2" ? left_eye.Group : right_eye.Group;
        }
        return next(args);
    });

    // Filter unwanted expression menus
    HookManager.progressiveHook("DialogFacialExpressionsBuild")
        .next()
        .inject(() => {
            DialogFacialExpressions = DialogFacialExpressions.filter(
                ({ Group }) =>
                    /** @type {string}*/ (Group) !== right_eye.Group && /** @type {string}*/ (Group) !== left_eye.Group
            );
        });

    // Add new eye groups
    AssetManager.addGroup(left_eye, {
        CN: "🍔左眼(覆盖)",
        EN: "🍔Left Eye (Over)",
    });
    AssetManager.addGroup(right_eye, {
        CN: "🍔右眼(覆盖)",
        EN: "🍔Right Eye (Over)",
    });
}
