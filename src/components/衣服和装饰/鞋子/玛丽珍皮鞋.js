import { PoseMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "玛丽珍皮鞋",
    Random: false,
    Height: 14,
    Top: 870,
    Left: 120,
    PoseMapping: {
        Kneel: "Hide",
        KneelingSpread: "Hide",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: "Hogtied",
        AllFours: "Hide",
    },
    DefaultColor: ["#404040", "#404040", "#757575"],
    Layer: [
        {
            Name: "鞋面",
            Priority: 23,
            AllowTypes: { l: 0 },
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
        {
            Name: "鞋面_单",
            Priority: 23,
            CopyLayerColor: "鞋面",
            AllowTypes: { l: 1 },
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
        {
            Name: "鞋底",
            Priority: 22,
            AllowTypes: { b: 0 },
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
        {
            Name: "鞋底_薄",
            Priority: 22,
            Top: 863,
            CopyLayerColor: "鞋底",
            AllowTypes: { b: 1 },
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
        {
            Name: "搭扣",
            Priority: 23,
            AllowTypes: { l: 0 },
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
        {
            Name: "搭扣_单",
            Priority: 23,
            CopyLayerColor: "搭扣",
            AllowTypes: { l: 1 },
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
        {
            Name: "h",
            CopyLayerColor: "鞋底",
            Top: 500,
            Left: 200,
            PoseMapping: PoseMapTools.FromHide({ Hogtied: "Hogtied" }),
        },
    ],
};

const layerNames = {
    EN: {
        鞋面: "Shoes",
        鞋底: "Sole",
        搭扣: "Lacing",
        鞋面_单: "Shoes (Single Lacing)",
        鞋底_薄: "Thin Sole",
        搭扣_单: "Single Lacing",
    },
};

const translation = {
    CN: "玛丽珍皮鞋",
    EN: "Mary Jane Shoes",
};

const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    Modules: [
        {
            Name: "鞋底",
            Key: "b",
            DrawImages: false,
            Options: [{}, {}],
        },
        {
            Name: "样式",
            Key: "l",
            DrawImages: false,
            Options: [{}, {}],
        },
    ],
};

const assetStrings = {
    CN: {
        SelectBase: "选择外观",
        Module鞋底: "鞋底",
        Module样式: "样式",

        Select鞋底: "选择鞋底厚度",
        Optionb0: "厚底",
        Optionb1: "薄底",

        Select样式: "选择扣带数量",
        Optionl0: "双扣带",
        Optionl1: "单扣带",
    },
    EN: {
        SelectBase: "Choose Appearance",
        Module鞋底: "Sole",
        Module样式: "Style",

        Select鞋底: "Choose Sole Thickness",
        Optionb0: "Thick Sole",
        Optionb1: "Thin Sole",

        Select样式: "Choose Lacing Type",
        Optionl0: "Double Lacing",
        Optionl1: "Single Lacing",
    },
};

const imageMapping = Object.entries({ Normal: ["Small", "Large", "XLarge"] })
    .flatMap(([key, values]) => values.map((size) => /** @type {[string,string]} */ ([key, size])))
    .reduce((pv, [from, to]) => {
        for (const pose of ["", "LegsClosed/", "Spread/"]) {
            for (const l of asset.Layer) {
                const fromLayerName = l.Name === "鞋底_薄" ? "鞋底" : l.Name; // 省几份薄鞋底的图层
                if (to === "XLarge" && pose !== "LegsClosed/" || l.Name === "h") {
                    if (l.Name === "鞋底_薄") {
                        pv[
                            `Assets/Female3DCG/Shoes/${pose}${asset.Name}_${to}_${l.Name}.png`
                        ] = `Assets/Female3DCG/Shoes/${pose}${asset.Name}_${to}_${fromLayerName}.png`;
                    }
                    continue;
                };
                pv[
                    `Assets/Female3DCG/Shoes/${pose}${asset.Name}_${to}_${l.Name}.png`
                ] = `Assets/Female3DCG/Shoes/${pose}${asset.Name}_${from}_${fromLayerName}.png`;
            }
            pv[
                `Assets/Female3DCG/Shoes/${pose}${asset.Name}_${from}_鞋底_薄.png`
            ] = `Assets/Female3DCG/Shoes/${pose}${asset.Name}_${from}_鞋底.png`;
        }
        pv[
            `Assets/Female3DCG/Shoes/Hogtied/${asset.Name}_${to}_h.png`
        ] = `Assets/Female3DCG/Shoes/Hogtied/${asset.Name}_${from}_h.png`;
        return pv;
    }, /**@type{Record<string,string>}*/ ({}));


export default function () {
    AssetManager.addAssetWithConfig("Shoes", asset, { layerNames, translation, extended, assetStrings });
    AssetManager.addImageMapping(imageMapping);
}
