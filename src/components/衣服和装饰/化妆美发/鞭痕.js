import { AssetManager } from "../../../assetForward";
import { PoseMapTool } from "../../../lib";
import { luziFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "鞭痕-Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 10,
    Extended: true,
    ParentGroup: "BodyUpper",
    PoseMapping: PoseMapTool.hideFullBody(),
    Layer: [
        { Name: "1", AllowTypes: { typed: [0, 1, 2, 3, 4, 5, 6, 7] } },
        { Name: "2", AllowTypes: { typed: [1, 2, 3, 4, 5, 6, 7] } },
        { Name: "3", AllowTypes: { typed: [2, 3, 4, 5, 6, 7] } },
        { Name: "4", AllowTypes: { typed: [3, 4, 5, 6, 7] } },
        { Name: "5", ParentGroup: {}, AllowTypes: { typed: [4, 5, 6, 7] } },
        { Name: "6", ParentGroup: {}, AllowTypes: { typed: [5, 6, 7] } },
        { Name: "7", ParentGroup: {}, AllowTypes: { typed: [6, 7] } },
        { Name: "8", ParentGroup: {}, AllowTypes: { typed: [7] } },
    ],
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [
        { Name: "1" },
        { Name: "2" },
        { Name: "3" },
        { Name: "4" },
        { Name: "5" },
        { Name: "6" },
        { Name: "7" },
        { Name: "8" },
    ],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "设置",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
    },
    EN: {
        Select: "Select",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
    },
    UA: {
        Select: "Виберіть кількість знаків",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
    },
};

const translation = {
    CN: "鞭痕",
    EN: "Whip marks",
    RU: "След удар плет",
    UA: "Знаки від батога",
};

export default function () {
    AssetManager.addAssetWithConfig("身体痕迹_Luzi", asset, {
        translation,
        layerNames: {},
        extended,
        assetStrings,
    });
    luziFixups("身体痕迹_Luzi", asset.Name);
}
