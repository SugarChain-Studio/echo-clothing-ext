import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../assetForward";
import { Typing } from "../lib";

/** @type {AssetDefinitionBase["DrawOffset"]} */
const customOffset = [
    ...["FlatChastityCage", "PlasticChastityCage", "FuturisticTrainingBelt"].map((Asset) =>
        Typing.drawOffset({ Group: "ItemVulva", Asset, Y: -20 })
    ),
    ...["BasicCockring", "LockingCockring"].map((Asset) => Typing.drawOffset({ Group: "ItemVulva", Asset, Y: -36 })),
    ...Typing.groups(["Pussy", "ItemVulva", "ItemVulvaPiercings", "ItemButt"]).map((Group) =>
        Typing.drawOffset({ Group, Y: -16 })
    ),
    ...["CockSock", "Jockstrap"].map((Asset) => Typing.drawOffset({ Asset, Y: -20 })),
    { Asset: "Splatters", Layer: ["Internal2", "Internal3"], Y: -20 },
];

/** @type {["Original", "EchoV2"]} */
const bodyStyles = ["Original", "EchoV2"];

/** @type {Record<bodyStyles[number], AssetDefinitionBase["DrawOffset"]>} */
const bodyOffset = {
    Original: customOffset,
    EchoV2: [...customOffset, { Group: "Bra", Asset: "LeatherBunnyHollowBra", X: 160, Y: 208 }],
};

export default function () {
    HookManager.patchFunction("CommonDrawComputeDrawingCoordinates", {
        "offset.Group === groupName &&": "(offset.Group === undefined || offset.Group === groupName) &&",
    });

    HookManager.hookFunction("CommonDrawComputeDrawingCoordinates", 0, (args, next) => {
        const ret = next(args);
        const [C, asset] = args;

        const bodyStyleItem = InventoryGet(C, "BodyStyle");
        if (bodyStyleItem?.Asset?.Name === "EchoV1") return ret;

        if (asset.Name === "StrictPonyBoots") {
            if (C.PoseMapping.BodyLower === "BaseLower") {
                ret.Y -= 10;
            }
        }
        return ret;
    });

    for (const body of bodyStyles) {
        AssetManager.modifyAsset("BodyStyle", body, (group, asset) => {
            asset.DrawOffset = bodyOffset[body];
        });
    }
}
