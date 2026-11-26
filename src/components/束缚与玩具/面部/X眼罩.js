import { DialogTools } from "@mod-utils/Tools";
import { AssetManager } from "@local/AssetManager";

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
    Layer: [
        { Color: ["#2F2F2F"], Name: "A1" },
        { Color: ["#2F2F2F"], Name: "B1", ColorGroup: "底色" },
        { Color: ["#101010"], Name: "B2", ColorGroup: "阴影" },
        { Name: "B3", ColorGroup: "亮色" },
        { Color: ["#151515"], Name: "B4", ColorGroup: "描边" },
        { Name: "B5", ColorGroup: "铆钉" },
        { Color: ["#2F2F2F"], Name: "C1", ColorGroup: "底色" },
        { Color: ["#101010"], Name: "C2", ColorGroup: "阴影" },
        { Name: "C3", ColorGroup: "亮色" },
        { Color: ["#151515"], Name: "C4", ColorGroup: "描边" },
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
                            ...DialogTools.repeatEntries(
                                [Array.from({ length: 5 }, (_, idx) => `B${idx + 1}`), "↙"],
                                [Array.from({ length: 5 }, (_, idx) => `C${idx + 1}`), "↘"]
                            ),
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
