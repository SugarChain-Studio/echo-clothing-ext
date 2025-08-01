import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../utils";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "踩脚袜_Luzi",
    Random: false,
    Top: 0,
    Left: {
        BaseLower: 0,
        Kneel: 0,
        KneelingSpread: 30,
        LegsClosed: 0,
        LegsOpen: 0,
        Spread: 0,
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "踩脚袜",
    EN: "Footstep Socks",
    RU: "Носки для шагов",
};

export default function () {
    for (const group of Typing.groups(["Socks", "SocksLeft", "SocksRight"])) {
        AssetManager.addAssetWithConfig(group, asset, {
            layerNames: {},
            translation,
        });
    }
}
