import { PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "连体衣-Luzi",
    Random: false,
    Top: 200,
    Left: 170,
    Priority: 14,
    DynamicGroupName: "Suit",
    Layer: [
        { Name: "1", PoseMapping: PoseMapTool.hideFullBody({ Hogtied: "Hogtied" }) },
        { Name: "2", PoseMapping: PoseMapTool.hideFullBody() },
        { Name: "3", PoseMapping: PoseMapTool.hideFullBody() },
        { Name: "4", PoseMapping: PoseMapTool.hideFullBody() },
        { Name: "5", PoseMapping: PoseMapTool.hideFullBody() },
        { Name: "6", PoseMapping: PoseMapTool.hideFullBody({ Hogtied: "Hogtied" }) },
    ],
};

/** @type {Translation.CustomRecord<string,string>} */
const layerNames = {
    CN: {
        1: "连体衣",
        2: "腰部内层",
        3: "腰部结构",
        4: "胸下内层",
        5: "胸下结构",
        6: "胸上结构",
    },
    EN: {
        1: "Suit",
        2: "Waist Inner Layer",
        3: "Waist Structure",
        4: "Under-Bra Inner Layer",
        5: "Under-Bra Structure",
        6: "Upper-Bra Structure",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "战斗服",
    EN: "Plugsuit",
};

export default function () {
    AssetManager.addAssetWithConfig(["Suit", "Cloth"], asset, { translation, layerNames });
    luziFixups(["Suit", "Cloth"], asset.Name);
}
