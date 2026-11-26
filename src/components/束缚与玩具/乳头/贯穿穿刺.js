import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "@local/AssetManager";
import { Layer } from "@local/lib/type";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "贯穿穿刺",
    Fetish: ["Metal"],
    Difficulty: 10,
    Time: 15,
    AllowLock: true,
    ...Tools.topLeftBuilder({ Left: 190, Top: 300 }, ["AllFours", { Top: 340 }]),
    Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
    ExpressionTrigger: [
        { Name: "Closed", Group: "Eyes", Timer: 5 },
        { Name: "Angry", Group: "Eyebrows", Timer: 5 },
    ],
    ParentGroup: "BodyUpper",
    PoseMapping: { AllFours: "AllFours" },
    Layer: [{ Color: ["#222"], Name: "d" }, Layer.screen({ Name: "g" })],
};

const translation = {
    CN: "贯穿穿刺",
    EN: "Through Piercings",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemNipplesPiercings", asset, { translation, layerNames: {} });
}
