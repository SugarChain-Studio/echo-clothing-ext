import { DialogTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../lib";

/** @type {AssetDefinitionBase} */
const base = {
    Name: "X眼罩",
    Random: false,
    Gender: "F",
    Left: 190,
    Top: 140,
    Fetish: ["Leather"],
    Priority: 44,
    DynamicGroupName: "ItemHead",
    DefaultColor: [
        "#2F2F2F",
        "#2F2F2F",
        "#101010",
        "Default",
        "#151515",
        "Default",
        "#2F2F2F",
        "#101010",
        "Default",
        "#151515",
        "Default",
    ],
    Layer: [
        { Name: "A1" },
        { Name: "B1", ColorGroup: "底色" },
        { Name: "B2", ColorGroup: "阴影" },
        { Name: "B3", ColorGroup: "亮色" },
        { Name: "B4", ColorGroup: "描边" },
        { Name: "B5", ColorGroup: "铆钉" },
        { Name: "C1", ColorGroup: "底色" },
        { Name: "C2", ColorGroup: "阴影" },
        { Name: "C3", ColorGroup: "亮色" },
        { Name: "C4", ColorGroup: "描边" },
        { Name: "C5", ColorGroup: "铆钉" },
    ],
};

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [["Glasses", "Mask"], { ...base }, { translation: { CN: "交叉皮革眼罩", EN: "X Leather Blindfold" } }],
    [
        "ItemHead",
        {
            ...base,
            Difficulty: 4,
            Time: 10,
            AllowLock: true,
            AllowTighten: true,
            Hide: ["Glasses"],
            Effect: [E.BlindNormal, E.BlockWardrobe],
        },
        {
            translation: { CN: "交叉皮革眼罩", EN: "X Leather Blindfold" },
            layerNames: DialogTools.combine(
                {
                    CN: { A1: "束带" },
                    EN: {
                        A1: "Strap",
                        底色: "Base Color",
                        阴影: "Shadow",
                        亮色: "Highlight",
                        描边: "Outline",
                        铆钉: "Studs",
                    },
                },
                Object.fromEntries(
                    /** @type {const} */ (["CN", "EN"]).map((lang) => [
                        lang,
                        {
                            ...Typing.stringEntries([Array.from({ length: 5 }, (_, idx) => `B${idx + 1}`), "↙"]),
                            ...Typing.stringEntries([Array.from({ length: 5 }, (_, idx) => `C${idx + 1}`), "↘"]),
                        },
                    ])
                )
            ),
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}
