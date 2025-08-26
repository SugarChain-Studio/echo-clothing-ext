import { HookManager } from "@sugarch/bc-mod-hook-manager";

/** @type {Set<CustomGroupName>} */
const prevGroups = new Set();

/**
 * @param {CustomGroupName | CustomGroupName[]} group
 */
function forceCharaPreview(group) {
    if (Array.isArray(group)) {
        group.forEach((g) => prevGroups.add(g));
    } else {
        prevGroups.add(group);
    }
}

/** @type {Partial<Record<CustomGroupName,CustomGroupName>>} */
const backOverrides = {
    新前发_Luzi: "HairFront",
    新后发_Luzi: "HairBack",
    右眼_Luzi: "Eyes",
    左眼_Luzi: "Eyes2",
};

/**
 * @template { CustomGroupName } KeyType
 * @param {Record<KeyType,CustomGroupName>} groupMap
 */
function spHideAs(groupMap) {
    Object.assign(backOverrides, groupMap);
}

export const GroupConfig = {
    forceCharaPreview,
    spHideAs,
};

export default function () {
    // 眼睛和头发组使用预览图
    HookManager.hookFunction("AppearancePreviewUseCharacter", 0, (args, next) => {
        if (args[0] && prevGroups.has(args[0].Name)) return true;
        return next(args);
    });

    HookManager.hookFunction("CharacterAppearanceVisible", 10, (args, next) => {
        const [C, _, GroupName] = args;

        if (GroupName in backOverrides) {
            const oldda = C.DrawAppearance;
            C.DrawAppearance = oldda.filter((i) => i.Asset.Group.Name !== GroupName);
            args[2] = /** @type {AssetGroupName}*/ (backOverrides[GroupName]);
            const result = next(args);
            C.DrawAppearance = oldda;
            return result;
        }
        return next(args);
    });
}
