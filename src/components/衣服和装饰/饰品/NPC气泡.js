import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type { AddAssetWithConfigParams } */
const asset = [
    "Hat",
    {
        Name: "NPC气泡",
        Random: false,
        Top: -50,
        Left: 150,
        Extended: true,
        Priority: 55,
        ParentGroup: {},
        DefaultColor: ["#383838", "#535353", "#FF1A1A", "#FF1A1A", "#FF1A1A", "#FF1A1A"],
        Layer: [
            { Name: "头环" },
            { Name: "连接" },
            { Name: "感叹号", AllowTypes: { typed: 0 } },
            { Name: "问号", AllowTypes: { typed: 1 } },
            { Name: "心", AllowTypes: { typed: 2 } },
            { Name: "箭头", AllowTypes: { typed: 3 } },
        ],
    },
    {
        translation: { CN: "NPC气泡", EN: "NPC Balloon" },
        layerNames: {
            EN: {
                头环: "Headband",
                连接: "Connection",
                感叹号: "Exclamation Mark",
                问号: "Question Mark",
                心: "Heart",
                箭头: "Arrow",
            },
        },
        extended: {
            Archetype: ExtendedArchetype.TYPED,
            DrawImages: false,
            Options: [{ Name: "感叹号" }, { Name: "问号" }, { Name: "心" }, { Name: "箭头" }],
        },
        assetStrings: {
            CN: {
                Select: "选择NPC气泡样式",

                感叹号: "感叹号",
                问号: "问号",
                心: "心",
                箭头: "箭头",
            },
            EN: {
                Select: 'Select NPC Balloon" Style',

                感叹号: "Exclamation Mark",
                问号: "Question Mark",
                心: "Heart",
                箭头: "Arrow",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
    luziSuffixFixups(asset[0], asset[1].Name);
}
