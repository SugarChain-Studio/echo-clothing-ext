import { DialogTools } from "@mod-utils/Tools";
import { AssetManager } from "@local/AssetManager";
import { Merge } from "@local/lib/type";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["额外头发_Luzi", "HairAccessory1", "HairAccessory3"],
    {
        Name: "呆毛",
        Random: false,
        Top: 0,
        Left: 150,
        Priority: 54,
        Extended: true,
        ParentGroup: {},
        DynamicGroupName: "额外头发_Luzi",
        InheritColor: "HairFront",
        Layer: [
            { Name: "1", AllowTypes: { typed: 0 } },
            { Name: "1a", AllowTypes: { typed: 1 } },
            { Name: "2", AllowTypes: { typed: 2 } },
            { Name: "3", AllowTypes: { typed: 3 } },
            { Name: "4", AllowTypes: { typed: 4 } },
            { Name: "5", AllowTypes: { typed: 5 } },
            { Name: "6", AllowTypes: { typed: 6 } },
            { Name: "7", AllowTypes: { typed: 7 }, Left: 50 },
            { Name: "8", AllowTypes: { typed: 8 }, Left: 50, Priority: 51 },
            { Name: "9", AllowTypes: { typed: 9 }, Left: 50 },
            { Name: "10", AllowTypes: { typed: 10 }, Left: 50 },
        ],
    },
    {
        translation: { CN: "呆毛", EN: "Ahoge", RU: "Ахоге", UA: "Ахоге" },
        extended: {
            Archetype: ExtendedArchetype.TYPED,
            DrawImages: false,
            Options: [
                { Name: "1" },
                { Name: "1a" },
                { Name: "2" },
                { Name: "3" },
                { Name: "4" },
                { Name: "5" },
                { Name: "6" },
                { Name: "7" },
                { Name: "8" },
                { Name: "9" },
                { Name: "10" },
            ],
        },
        assetStrings: DialogTools.combine(
            Merge.repeatEntries([
                ["CN", "EN", "UA"],
                Object.fromEntries(
                    ["1", "1a", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((num) => [`呆毛${num}`, num])
                ),
            ]),
            {
                CN: { 呆毛Select: "设置" },
                EN: { 呆毛Select: "Select" },
                UA: { 呆毛Select: "Виберіть кількість знаків" },
            }
        ),
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

