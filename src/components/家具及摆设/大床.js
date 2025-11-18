import { ImageMapTools } from "@mod-utils/Tools/imageMapTools";
import { AssetManager } from "../../assetForward";
import { luziSuffixFixups } from "../../lib/fixups";

/** @type {AddAssetWithConfigParams[]} */
const assets = [
    [
        "ItemAddon",
        {
            Name: "被子左边",
            Random: false,
            Top: -260,
            Left: 0,
            Difficulty: 1,
            SelfBondage: 0,
            DefaultColor: ["#99A2AB", "Default"],
            Layer: [{ Name: "外" }, { Name: "内" }],
        },
        { translation: { CN: "被子左边", EN: "Quilt Left" } },
    ],
    [
        "ItemAddon",
        {
            Name: "被子右边",
            Random: false,
            Top: -260,
            Left: -210,
            Difficulty: 1,
            SelfBondage: 0,
            DefaultColor: ["#99A2AB", "Default"],
            Layer: [{ Name: "外" }, { Name: "内" }],
        },
        { translation: { CN: "被子右边", EN: "Quilt Right" } },
    ],
    [
        "ItemDevices",
        {
            Name: "床左边",
            Random: false,
            Top: -260,
            Left: 0,
            Priority: 1,
            Difficulty: -20,
            SelfBondage: 0,
            Time: 5,
            RemoveTime: 5,
            OverrideHeight: { Height: 20, HeightRatioProportion: 1, Priority: 21 },
            DefaultColor: ["#523629", "#888990", "#808284"],
            RemoveItemOnRemove: [
                { Group: "ItemAddon", Name: "Covers" },
                { Group: "ItemAddon", Name: "被子左边" },
                { Group: "ItemAddon", Name: "被子右边" },
                { Group: "ItemAddon", Name: "BedRopes" },
                { Group: "ItemAddon", Name: "BedStraps" },
                { Group: "ItemAddon", Name: "BedTape" },
                { Group: "ItemAddon", Name: "BedChains" },
                { Group: "ItemArms", Name: "UnderBedBondageCuffs" },
                { Group: "ItemArms", Name: "MedicalBedRestraints" },
                { Group: "ItemArms", Name: "HempRope", TypeRecord: { typed: 11 } },
                { Group: "ItemLegs", Name: "MedicalBedRestraints" },
                { Group: "ItemFeet", Name: "HempRope", TypeRecord: { typed: 6 } },
                { Group: "ItemFeet", Name: "MedicalBedRestraints" },
            ],
            Effect: [E.Mounted, E.OnBed],
            Layer: [{ Name: "骨架" }, { Name: "床垫" }, { Name: "枕头" }],
        },
        { translation: { CN: "床左边", EN: "Bed Left" } },
    ],
    [
        "ItemDevices",

        {
            Name: "床右边",
            Random: false,
            Top: -260,
            Left: -110,
            Priority: 1,
            Difficulty: -20,
            SelfBondage: 0,
            Time: 5,
            RemoveTime: 5,
            Visible: false,
            DefaultColor: ["#523629", "#888990", "#808284"],
            OverrideHeight: { Height: 20, HeightRatioProportion: 1, Priority: 21 },
            RemoveItemOnRemove: [
                { Group: "ItemAddon", Name: "Covers" },
                { Group: "ItemAddon", Name: "被子左边" },
                { Group: "ItemAddon", Name: "被子右边" },
                { Group: "ItemAddon", Name: "BedRopes" },
                { Group: "ItemAddon", Name: "BedStraps" },
                { Group: "ItemAddon", Name: "BedTape" },
                { Group: "ItemAddon", Name: "BedChains" },
                { Group: "ItemArms", Name: "UnderBedBondageCuffs" },
                { Group: "ItemArms", Name: "MedicalBedRestraints" },
                { Group: "ItemArms", Name: "HempRope", TypeRecord: { typed: 11 } },
                { Group: "ItemLegs", Name: "MedicalBedRestraints" },
                { Group: "ItemFeet", Name: "HempRope", TypeRecord: { typed: 6 } },
                { Group: "ItemFeet", Name: "MedicalBedRestraints" },
            ],
            Effect: [E.Mounted, E.OnBed],
        },
        { translation: { CN: "床右边", EN: "Bed Right" } },
    ],
];

export default function () {
    AssetManager.addImageMapping({
        [ImageMapTools.assetPreview("ItemDevices", "床右边")]: ImageMapTools.assetPreview("ItemDevices", "床左边"),
        [ImageMapTools.assetPreview("ItemAddon", "被子右边")]: ImageMapTools.assetPreview("ItemAddon", "被子左边"),
    });

    AssetManager.addAssetWithConfig(assets);
    for (const a of assets) {
        luziSuffixFixups(a[0], a[1].Name);
    }
}
