import { HookManager } from "@sugarch/bc-mod-hook-manager";

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
                    undefined,
                    args[5]
                );
            };
            if (args[1] === "Eyes1" || args[1] === "Eyes") {
                callWithDifferentGroup("右眼_Luzi");
            } else if (args[1] === "Eyes2") {
                callWithDifferentGroup("左眼_Luzi");
            }
        }
        return next(args);
    });

    // Fix for WCE animation

    const wceAnimationEnabled = () => globalThis.bceAnimationEngineEnabled?.() ?? false;

    /** @type {EyeExtCharacter} */
    const eyes = {};

    const updateEyesRef = () => {
        Player.Appearance.forEach((item) => {
            if (eyeNames.includes(item.Asset.Group.Name)) eyes[item.Asset.Group.Name] = item;
        });
    };
    /**
     * @param {"Eyes2" | "Eyes"} base
     * @param {"左眼_Luzi" | "右眼_Luzi"} over
     */
    const updateExpressionRef = (base, over) => {
        if (eyes[base]?.Property && eyes[over]) {
            if (eyes[over].Property) {
                eyes[over].Property.Expression = eyes[base].Property.Expression;
            } else {
                eyes[over].Property = { Expression: eyes[base].Property.Expression };
            }
            return true;
        }
        return false;
    };

    // Fix for WCE animation
    HookManager.hookFunction("CharacterLoadCanvas", 0, (args, next) => {
        if (wceAnimationEnabled() && args[0].IsPlayer()) {
            updateEyesRef();
            updateExpressionRef("Eyes2", "左眼_Luzi");
            updateExpressionRef("Eyes", "右眼_Luzi");
        }
        return next(args);
    });
    HookManager.hookFunction("ServerSend", 0, (args, next) => {
        if (args[0] === "ChatRoomCharacterExpressionUpdate" && wceAnimationEnabled()) {
            updateEyesRef();
            if (args[1].Group === "Eyes" && updateExpressionRef("Eyes", "右眼_Luzi")) {
                args[1].Group = "右眼_Luzi";
            } else if (args[1].Group === "Eyes2" && updateExpressionRef("Eyes2", "左眼_Luzi")) {
                args[1].Group = "左眼_Luzi";
            }
        }
        return next(args);
    });

    // Filter unwanted expression menus
    HookManager.progressiveHook("DialogFacialExpressionsBuild")
        .next()
        .inject(() => {
            DialogFacialExpressions = DialogFacialExpressions.filter(
                ({ Group }) =>
                    /** @type {string}*/ (Group) !== "右眼_Luzi" && /** @type {string}*/ (Group) !== "左眼_Luzi"
            );
        });
}
