import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type { AddAssetWithConfigParams[] }} */
const assets = [
    [
        "ItemTorso",
        {
            Name: "鞍-Luzi",
            Random: false,
            ParentGroup: {},
            Effect: ["Leash"],
        },
        { translation: { CN: "鞍", EN: "Saddle", RU: "Седло" } },
    ],
    [
        "ItemTorso",
        {
            Name: "缰绳-Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Priority: 50,
            Extended: true,
            ParentGroup: {},
            Layer: [{ Name: "绳子", AllowTypes: { typed: [1] } }],
        },
        {
            translation: { CN: "缰绳", EN: "Reins", RU: "Уздечка" },
            extended: {
                Archetype: ExtendedArchetype.TYPED,
                DrawImages: false,
                Options: [{ Name: "1" }, { Name: "2" }],
            },
            assetStrings: {
                CN: {
                    Select: "设置",
                    1: "无",
                    2: "有绳子",
                    Set1: "SourceCharacter把绳子收起来了",
                    Set2: "SourceCharacter拿出了绳子",
                },
                EN: {
                    Select: "Select",
                    1: "None",
                    2: "With Rope",
                    Set1: "SourceCharacter put away the rope",
                    Set2: "SourceCharacter took out the rope",
                },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
    for (const a of assets) {
        luziFixups(["ItemTorso", "ItemTorso2"], a[1].Name);
    }
}
