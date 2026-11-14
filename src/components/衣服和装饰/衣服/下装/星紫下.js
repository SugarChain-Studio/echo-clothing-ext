import { AssetManager } from "@local/AssetManager";
import { luziSuffixFixups } from "@local/lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "星紫下",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    ParentGroup: "BodyLower",
    PoseMapping: {
        Kneel: "Kneel",
        KneelingSpread: "KneelingSpread",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Priority: 26,
    Layer: [
        { Name: "A1" },
        { Name: "A2" },
        { Name: "A3" },
        { Name: "A4" },
        { Name: "B1" },
        { Name: "B2" },
        { Name: "C1" },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "星紫",
    EN: "星紫",
};

/** @type {Translation.Dialog} */
const layerNames = {
    EN: {
        A1: "1",
        A2: "2",
        A3: "3",
        A4: "4",
        B1: "1",
        B2: "2",
        C1: "1",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { translation, layerNames });
    luziSuffixFixups("ClothLower", asset.Name);
}
