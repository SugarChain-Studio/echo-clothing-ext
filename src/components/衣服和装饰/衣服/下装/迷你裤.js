import { AssetManager } from "@local/AssetManager";
import { luziSuffixFixups } from "@local/lib/fixups";

/** @type {CustomAssetDefinition} */
const assetdef = {
    Name: "迷你裤",
    Top: 400,
    Random: false,
    PoseMapping: {
        KneelingSpread: "KneelingSpread",
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Priority: 26,
    DynamicGroupName: "ClothLower",
    Layer: [
        { Color: ["#727B91"], Name: "裤子", ParentGroup: "BodyLower" },
        { Color: ["#FFD1A3"], Name: "磨损", ParentGroup: "BodyLower" },
        { Color: ["#88665A"], Name: "扣子", ParentGroup: {} },
    ],
};

const layerNames = {
    EN: {
        裤子: "Pants",
        磨损: "Worn",
        扣子: "Buttons",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "迷你热裤",
    EN: "Mini Hotpants",
};

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "ClothLower",
        {
            ...assetdef,
            Left: {
                [PoseType.DEFAULT]: 100,
                KneelingSpread: 190,
            },
        },
        { layerNames, translation },
    ],
    ["Panties", { ...assetdef, Left: 100, Priority: 19 }, { layerNames, translation }],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
    for (const a of asset) {
        luziSuffixFixups("ClothLower", a[1].Name);
    }
}
