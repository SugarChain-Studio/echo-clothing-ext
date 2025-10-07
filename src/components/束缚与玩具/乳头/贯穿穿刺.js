import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "贯穿穿刺",
    Fetish: ["Metal"],
    Difficulty: 10,
    Time: 15,
    AllowLock: true,
    ...Tools.topLeftBuilder({ Left: 190, Top: 300 }, ["AllFours", { Top: 340 }]),
    Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
    DefaultColor: ["#222"],
    ExpressionTrigger: [
        { Name: "Closed", Group: "Eyes", Timer: 5 },
        { Name: "Angry", Group: "Eyebrows", Timer: 5 },
    ],
    ParentGroup: "BodyUpper",
    PoseMapping: { AllFours: "AllFours" },
    Layer: [{ Name: "d" }, { Name: "g", AllowColorize: false, BlendingMode: "screen" }],
};

const translation = {
    CN: "贯穿穿刺",
    EN: "Through Piercings",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemNipplesPiercings", asset, { translation, layerNames: {} });
}
