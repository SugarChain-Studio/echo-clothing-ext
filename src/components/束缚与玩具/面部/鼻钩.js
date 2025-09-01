import { DialogTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "Luzi_NoseHook",
    Random: false,
    Left: 200,
    Top: 70,
    Difficulty: 6,
    Time: 15,
    AllowLock: true,
    AllowTighten: true,
    DrawLocks: true,
    Fetish: ["Leather", "Metal"],
    Block: [],
    Layer: [
        { Name: "Band", CreateLayerTypes: ["typed"] },
        { Name: "Hook", CreateLayerTypes: ["typed"] },
        { Name: "Nose", CreateLayerTypes: ["typed"] },
    ],
};

const translation = {
    CN: "扩张鼻钩",
    EN: "Expanding Nose Hook",
};

const layerNames = {
    CN: { Band: "绑带", Hook: "钩子", Nose: "鼻子" },
    EN: { Band: "Band", Hook: "Hook", Nose: "Nose" },
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    ChatTags: Tools.CommonChatTags(),
    Options: [{ Name: "A" }, { Name: "B" }, { Name: "C" }, { Name: "D" }, { Name: "E" }],
};

const assetStrings = DialogTools.autoItemStrings(
    {
        CN: {
            Select: "选择鼻钩扩张方式",
            A: "单钩",
            B: "单钩扩大",
            C: "双钩",
            D: "双钩扩大",
            E: "三钩",
        },
        EN: {
            Select: "Select Nose Hook Expansion Style",
            A: "Single Hook",
            B: "Single Hook (Expanded)",
            C: "Double Hook",
            D: "Double Hook (Expanded)",
            E: "Triple Hook",
        },
    },
    extended
);

export default function () {
    AssetManager.addAssetWithConfig("ItemNose", asset, { translation, layerNames, extended, assetStrings });
}
