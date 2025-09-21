import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "袜套",
    Random: false,
    Top: 700,
    Left: 120,
    PoseMapping: {
        Kneel: "Hide",
        KneelingSpread: "Hide",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: "Hide",
        AllFours: "Hide",
    },
    Layer: [ { Name: "袜套" }, { Name: "蝴蝶结" } ],
    DefaultColor: ["#8D8D8D", "#8D8D8D"],
    Priority: 23,
};

const layerNames = {
    EN: {
        袜套: "Leg Warmers",
        蝴蝶结: "Bowknot",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "袜套",
    EN: "Leg Warmers",
};

const imageMapping = Object.entries({ Normal: ["Small"] })
    .flatMap(([key, values]) => values.map((size) => /** @type {[string,string]} */ ([key, size])))
    .reduce((pv, [from, to]) => {
        for (const group of ["Socks", "SocksLeft", "SocksRight"]) {
            for (const pose of ["", "LegsClosed/", "Spread/"]) {
                for (const l of asset.Layer) {
                    pv[
                        `Assets/Female3DCG/${group}/${pose}${asset.Name}_${to}_${l.Name}.png`
                    ] = `Assets/Female3DCG/${group}/${pose}${asset.Name}_${from}_${l.Name}.png`;
                }
            }
        }
        return pv;
    }, /**@type{Record<string,string>}*/ ({}));

imageMapping["Assets/Female3DCG/SocksRight/Preview/袜套.png"] = "Assets/Female3DCG/Socks/Preview/袜套.png";
imageMapping["Assets/Female3DCG/SocksLeft/Preview/袜套.png"] = "Assets/Female3DCG/Socks/Preview/袜套.png";

export default function () {
    AssetManager.addAssetWithConfig(["Socks", "SocksLeft", "SocksRight"], asset, {
        layerNames,
        translation,
    });
    AssetManager.addImageMapping(imageMapping);
}
