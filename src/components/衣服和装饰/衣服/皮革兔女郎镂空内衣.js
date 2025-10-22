import { PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "皮革兔女郎镂空内衣",
    Random: false,
    Left: 160,
    Top: 210,
    Priority: 21,
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    DefaultColor: [
        "Default",
        "#111111",
        "Default",
        "#111111",
        "Default",
        "#111111",
        "Default",
        "#111111",
        "Default",
        "Default",
    ],
    PoseMapping: PoseMapTool.HideFullBody(),
    Layer: [
        { Name: "圆环", ParentGroup: {}, AllowTypes: { typed: [0, 1, 3] } },
        { Name: "连接", AllowTypes: { typed: 0 } },
        { Name: "连接反光", AllowTypes: { typed: 0 } },
        { Name: "胸罩带", ColorGroup: "胸底色", AllowTypes: { typed: [0, 1, 2] } },
        { Name: "胸罩带反光", ColorGroup: "胸反光", AllowTypes: { typed: [0, 1, 2] } },
        { Name: "胸罩", ColorGroup: "胸底色", AllowTypes: { typed: [0, 1, 2] } },
        { Name: "胸罩反光", ColorGroup: "胸反光", AllowTypes: { typed: [0, 1, 2] } },
        { Name: "皮革带", AllowTypes: { typed: [0, 1, 3] } },
        { Name: "皮革带反光", AllowTypes: { typed: [0, 1, 3] } },
        { Name: "拉链", ParentGroup: {}, AllowTypes: { typed: [0, 1, 3] } },
    ],
};

const layerNames = {
    CN: {
        胸罩带: "胸罩带",
        胸罩带反光: "胸罩带",
        皮革带: "内裤底色",
        皮革带反光: "内裤反光",

        拉链: "内裤拉链",

        胸底色: "胸罩底色",
        胸反光: "胸罩反光",
    },
    EN: {
        圆环: "Ring",
        连接: "Connector",
        连接反光: "Connector Reflective",
        胸罩带: "Bra Strap",
        胸罩带反光: "Bra Strap",
        胸罩: "Bra",
        胸罩反光: "Bra",
        皮革带: "Panty",
        皮革带反光: "Panty Reflective",
        拉链: "Zipper",

        胸底色: "Bra Base Color",
        胸反光: "Bra Reflective",
    },
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "Leo" }, { Name: "Bik" }, { Name: "Bra" }, { Name: "Pan" }],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "选择内衣配置",
        Leo: "镂空连体衣",
        Bik: "比基尼",
        Bra: "仅胸罩",
        Pan: "仅内裤",
    },
    EN: {
        Select: "Select Lingerie Configuration",
        Leo: "Hollow Leotard",
        Bik: "Bikini",
        Bra: "Only Bra",
        Pan: "Only Panty",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "皮革兔女郎镂空内衣",
    EN: "Leather Bunny Hollow Bra",
};

export default function () {
    AssetManager.addAssetWithConfig("Bra", asset, { layerNames, translation, extended, assetStrings });
}
