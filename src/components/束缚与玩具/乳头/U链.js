import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "@local/AssetManager";
import { PoseMapTool } from "@local/lib/generator";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ItemNipplesPiercings",
    {
        Name: "U钉链",
        Fetish: ["Metal"],
        Difficulty: 10,
        Time: 15,
        AllowLock: true,
        Left: 130,
        Top: 300,
        Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
        ExpressionTrigger: [
            { Name: "Closed", Group: "Eyes", Timer: 5 },
            { Name: "Angry", Group: "Eyebrows", Timer: 5 },
        ],
        ParentGroup: {},
        PoseMapping: PoseMapTool.config([], ["AllFours"]),
        Layer: [
            { Name: "链条后", AllowTypes: { typed: [2] } },
            { Name: "链条", ParentGroup: "BodyUpper", AllowTypes: { typed: [1, 2] } },
            { Name: "U形", ParentGroup: "BodyUpper" },
            { Name: "链条前", CopyLayerColor: "链条后", Priority: 29, AllowTypes: { typed: [2] } },
            { Name: "手柄金属", ColorGroup: "柄", Priority: 29, AllowTypes: { typed: [2] } },
            { Name: "手柄", ColorGroup: "柄", Priority: 29, AllowTypes: { typed: [2] } },
            { Name: "手柄铆钉", ColorGroup: "柄", Priority: 29, AllowTypes: { typed: [2] } },
        ],
    },
    {
        translation: { CN: "U钉", EN: "U Piercing" },
        extended: {
            Archetype: "typed",
            ChatTags: Tools.CommonChatTags(),
            DrawImages: false,
            Options: [{ Name: "D" }, { Name: "C" }, { Name: "CL", Property: { Effect: [E.Leash] } }],
        },
        layerNames: {
            CN: { 链条后: "牵引链", 手柄金属: "金属", 手柄: "皮革", 手柄铆钉: "铆钉", 柄: "手柄" },
            EN: {
                链条后: "Leash",
                链条: "Chain",
                U形: "U-Shaped",
                手柄金属: "Metal",
                手柄: "Leather",
                手柄铆钉: "Studs",
                柄: "Handle",
            },
        },
        assetStrings: {
            CN: {
                Select: "选择穿刺的样式",
                D: "默认",
                C: "添加链条",
                CL: "链条和牵引链",

                SetD: "SourceCharacter移除了DestinationCharacterAssetName上的附件。",
                SetC: "SourceCharacter将链条连接到DestinationCharacterAssetName。",
                SetCL: "SourceCharacter将链条和牵引链连接到DestinationCharacterAssetName。",
            },
            EN: {
                Select: "Select the style of piercing",
                D: "Default",
                C: "With Chain",
                CL: "Chain & Leash",
                SetD: "SourceCharacter removed attachment on DestinationCharacter AssetName.",
                SetC: "SourceCharacter attached a chain to DestinationCharacter AssetName.",
                SetCL: "SourceCharacter attached a chain and a leash to DestinationCharacter AssetName.",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
