import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "荷叶边袜",
    Random: false,
    Top: 780,
    Left: 125,
    PoseMapping: {
        Kneel: "Hide",
        KneelingSpread: "Hide",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: "Hide",
        AllFours: "Hide",
    },
};

const layerNames = {
    EN: {
        荷叶边袜: "Ruffled socks",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "荷叶边袜",
    EN: "Ruffled socks",
};

const imageMapping = Object.entries({ Normal: ["Small"] })
    .flatMap(([key, values]) => values.map((size) => /** @type {[string,string]} */ ([key, size])))
    .reduce((pv, [from, to]) => {
        for (const group of ["Socks", "SocksLeft", "SocksRight"]) {
            for (const pose of ["", "LegsClosed/", "Spread/"]) {
                pv[
                    `Assets/Female3DCG/${group}/${pose}${asset.Name}_${to}.png`
                ] = `Assets/Female3DCG/${group}/${pose}${asset.Name}_${from}.png`;
            }
        }
        return pv;
    }, /**@type{Record<string,string>}*/ ({}));

imageMapping["Assets/Female3DCG/SocksRight/Preview/荷叶边袜.png"] = "Assets/Female3DCG/Socks/Preview/荷叶边袜.png";
imageMapping["Assets/Female3DCG/SocksLeft/Preview/荷叶边袜.png"] = "Assets/Female3DCG/Socks/Preview/荷叶边袜.png";

export default function () {
    AssetManager.addAssetWithConfig(["Socks", "SocksLeft", "SocksRight"], asset, {
        layerNames,
        translation,
    });
    AssetManager.addImageMapping(imageMapping);
}
