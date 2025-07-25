import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    ItemTorso: [
        {
            Name: "鞍_Luzi",
            Random: false,
            ParentGroup: {},
            Effect: ["Leash"],
        },
    ],
};
/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        ItemTorso: {
            鞍_Luzi: "鞍",
        },
    },
    EN: {
        ItemTorso: {
            鞍_Luzi: "Saddle",
        },
    },
    RU: {
        ItemTorso: {
            鞍_Luzi: "Седло",
        },
    },
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "缰绳_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 50,
    Extended: true,
    ParentGroup: {},
    Layer: [{ Name: "绳子", AllowTypes: { typed: [1] } }],
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "1" }, { Name: "2" }],
};

const translation = {
    CN: "缰绳",
    EN: "Reins",
    RU: "Уздечка",
};

/** @type {Translation.Dialog} */
const dialog = DialogTools.replicateGroupedItemDialog(["ItemTorso"], ["缰绳_Luzi"], {
    CN: {
        Select: "设置",
        1: "无",
        2: "有绳子",
        Set1: "SourceCharacter把绳子收起来了",
        Set2: "SourceCharacter拿出了绳子",
    },
    EN: {
        Select: "Select",
        1: "None",
        2: "With Rope",
        Set1: "SourceCharacter put away the rope",
        Set2: "SourceCharacter took out the rope",
    },
});

export default function () {
    AssetManager.addAsset("ItemTorso", asset, extended, translation);
    AssetManager.addCustomDialog(dialog);

    AssetManager.addGroupedAssets(assets, translations);
}
