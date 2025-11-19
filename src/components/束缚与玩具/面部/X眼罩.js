import { AssetManager } from "../../../assetForward";

/** @type {AssetDefinitionBase} */
const base = {
    Name: "X眼罩",
    Random: false,
    Gender: "F",
    Left: 0,
    Top: 0,
    Fetish: ["Leather"],
    Priority: 44,
    DynamicGroupName: "ItemHead",
    Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }],
};

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [["Glasses", "Mask"], { ...base }, { translation: { CN: "交叉皮革眼罩", EN: "X Leather Blindfold" } }],
    [
        "ItemHead",
        { ...base, Difficulty: 3, Time: 10, AllowLock: true, AllowTighten: true },
        { translation: { CN: "交叉皮革眼罩", EN: "X Leather Blindfold" } },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}
