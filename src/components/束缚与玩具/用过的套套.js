import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";
import { PoseMapTool } from "../../lib";

/** @type { AddAssetWithConfigParams } */
const asset = [
    "ItemVulva",
    {
        Name: "内套",
        Random: false,
        Gender: "F",
        Left: 240,
        Top: 520,
        IsRestraint: false,
        Difficulty: -1,
        Prerequisite: ["HasVagina", "AccessVulva"],
        PoseMapping: PoseMapTool.hideFullBody(),
        Layer: [{ Name: "L" }, { Name: "R", CreateLayerTypes: ["typed"], AllowTypes: { typed: [0, 1] } }],
    },
    {
        translation: { CN: "用过的套套", EN: "Used Condom" },
        layerNames: { CN: { L: "套套", R: "滴落" }, EN: { L: "Condom", R: "Drip" } },
        extended: {
            Archetype: "typed",
            DrawImages: false,
            ChatTags: Tools.CommonChatTags(),
            Options: [{ Name: "A" }, { Name: "B" }, { Name: "C" }],
        },
        assetStrings: {
            CN: {
                Select: "请选择内套的使用状态",
                A: "一滴",
                B: "流下来",
                C: "无",
                SetA: "SourceCharacter让DestinationCharacterAssetName中有一滴液体流出来",
                SetB: "SourceCharacter让DestinationCharacterAssetName流出长长的一条",
                SetC: "SourceCharacter让DestinationCharacterAssetName没有任何液体流出",
            },
            EN: {
                Select: "Please select the usage state of the condom",
                A: "Single Drop",
                B: "Dripping",
                C: "None",
                SetA: "SourceCharacter makes DestinationCharacter AssetName have a single drop of fluid",
                SetB: "SourceCharacter makes DestinationCharacter AssetName drip a long stream",
                SetC: "SourceCharacter makes DestinationCharacter AssetName have no fluid",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
