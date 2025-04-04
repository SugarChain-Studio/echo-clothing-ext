import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type { CustomAssetDefinition } */
const asset = {
    Name: "NPC气泡_Luzi",
    Random: false,
    Top: -50,
    Left: 150,
    Extended: true,
    Priority: 55,
    ParentGroup: {},
    DefaultColor: ["#383838", "#535353", "#FF1A1A", "#FF1A1A", "#FF1A1A", "#FF1A1A"],
    AllowActivity: ["SpankItem", "RubItem"],
    ActivityAudio: ["SmackCrop"],
    Layer: [
        {
            Name: "头环",
        },
        {
            Name: "连接",
        },
        {
            Name: "感叹号",
            AllowTypes: { typed: 0 },
        },
        {
            Name: "问号",
            AllowTypes: { typed: 1 },
        },
        {
            Name: "心",
            AllowTypes: { typed: 2 },
        },
        {
            Name: "箭头",
            AllowTypes: { typed: 3 },
        },
    ],
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "感叹号" }, { Name: "问号" }, { Name: "心" }, { Name: "箭头" }],
};

/** @type {Translation.Dialog} */
const dialog = DialogTools.replicateGroupedItemDialog(["Hat"], ["NPC气泡_Luzi"], {
    CN: {
        Select: "选择任务标志样式",

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
});

const translations = {
    CN: "NPC气泡",
    EN: "NPC Balloon",
};

export default function () {
    AssetManager.addAsset("Hat", asset, extended, translations);
    AssetManager.addCustomDialog(dialog);
}
