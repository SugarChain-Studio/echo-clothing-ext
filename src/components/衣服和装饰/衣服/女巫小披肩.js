import { AssetManager } from "../../../assetForward";
import { takeLayerNames } from "../../../utils";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "女巫小披肩_Luzi",
    Random: false,
    Gender: "F",
    Left: 100,
    Top: 180,
    ParentGroup: {},
    PoseMapping: {
        Yoked: "Yoked",
        OverTheHead: "OverTheHead",
        AllFours: PoseType.HIDE,
        Hogtied: PoseType.HIDE,
    },
    EditOpacity: true,
    MinOpacity: 0,
    MaxOpacity: 1,
    Layer: [
        { Name: "后背", Priority: 4 },
        { Name: "下半基础", ColorGroup: "基础" },
        { Name: "下半纹路" },
        { Name: "下半阴影", ColorGroup: "阴影", BlendingMode: "multiply" },
        { Name: "上半基础", ColorGroup: "基础" },
        { Name: "上半阴影", ColorGroup: "阴影", BlendingMode: "multiply" },
        { Name: "环" },
    ],
};

/** @type {Translation.CustomRecord<string,string> } */
const layerNames = {
    CN: {
        基础: "基础",
        阴影: "阴影",
    },
    EN: {
        后背: "Back",
        基础: "Base",
        阴影: "Shadow",
        下半基础: "Lower Base",
        下半纹路: "Lower Pattern",
        下半阴影: "Lower Shadow",
        上半基础: "Upper Base",
        上半阴影: "Upper Shadow",
        环: "Ring",
    },
};

const description = {
    CN: "女巫小披肩",
    EN: "Witch Small Shawl",
    DE: "Hexen kleine Stola",
};

export default function () {
    AssetManager.addAssetWithConfig("ClothAccessory", asset, { description, layerNames });
}
