import { AssetManager } from "../../assetForward";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ItemAddon",
    {
        Name: "扫帚悬挂",
        Random: false,
        Top: -305,
        Left: 60,
        ParentGroup: {},
        PoseMapping: {},
        Priority: 6,
        Time: 15,
        DrawLocks: false,
        Category: ["Fantasy"],
        Prerequisite: ["CanBeCeilingTethered"],
        Fetish: ["Rope"],
        Effect: [E.Freeze, E.MapImmobile],
        Difficulty: 6,
        Layer: [{ Name: "Broom" }, { Name: "Rope" }],
    },
    {
        translation: { CN: "女巫扫帚", EN: "Witch Broom" },
        layerNames: {
            CN: { Broom: "扫帚", Rope: "绳子" },
            EN: { Broom: "Broom", Rope: "Rope" },
        },
        extended: {
            Archetype: "typed",
            DrawImages: false,
            Options: [
                {
                    Name: "H",
                    HasSubscreen: true,
                    ArchetypeConfig: {
                        Archetype: ExtendedArchetype.VARIABLEHEIGHT,
                        MaxHeight: 0,
                        MinHeight: -450,
                        DrawData: { elementData: [{ position: [1140, 650, 100, 500], icon: "rope" }] },
                        DialogPrefix: { Chat: "SuspensionChange" },
                    },
                },
            ],
        },
        assetStrings: {
            CN: { Select: "配置女巫扫帚", H: "调整高度" },
            EN: { Select: "Configure Witch Broom", H: "Adjust Height" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
