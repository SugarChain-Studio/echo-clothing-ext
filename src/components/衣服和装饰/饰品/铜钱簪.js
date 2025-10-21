import { AssetManager } from "../../../assetForward";

/** @type { AddAssetWithConfigParams }} */
const asset = [
    ["HairAccessory1", "HairAccessory3"],
    {
        Name: "铜钱簪",
        Random: false,
        Left: 130,
        Top: 20,
        ParentGroup: {},
        PoseMapping: {},
        Priority: 7,
        DynamicGroupName: "HairAccessory1",
        Layer: [
            { Name: "L链", CreateLayerTypes: ["m"], ColorGroup: "坠饰链" },
            { Name: "L钱", CreateLayerTypes: ["m"], ColorGroup: "坠饰铜钱" },
            { Name: "L珠", CreateLayerTypes: ["m"], ColorGroup: "坠饰珠" },
            { Name: "R链", CreateLayerTypes: ["m"], ColorGroup: "坠饰链" },
            { Name: "R钱", CreateLayerTypes: ["m"], ColorGroup: "坠饰铜钱" },
            { Name: "R珠", CreateLayerTypes: ["m"], ColorGroup: "坠饰珠" },
            { Name: "木簪", CreateLayerTypes: ["m"] },
            { Name: "铜钱", CreateLayerTypes: ["m"] },
            { Name: "系绳", CreateLayerTypes: ["m"] },
            { Name: "系绳珠", CreateLayerTypes: ["m"] },
        ],
    },
    {
        translation: { CN: "铜钱簪", EN: "Tongqian Hairpin" },
        layerNames: {
            CN: {
                L链: "A",
                L钱: "A",
                L珠: "A",
                R链: "B",
                R钱: "B",
                R珠: "B",

                坠饰链: "坠饰链",
                坠饰铜钱: "坠饰铜钱",
                坠饰珠: "坠饰珠",

                木簪: "木簪",
                铜钱: "铜钱",
                系绳: "系绳",
                系绳珠: "系绳珠",
            },
            EN: {
                L链: "A",
                L钱: "A",
                L珠: "A",
                R链: "B",
                R钱: "B",
                R珠: "B",

                坠饰链: "Accessory Chain",
                坠饰铜钱: "Accessory Coin",
                坠饰珠: "Accessory Pearl",

                木簪: "Wooden Hairpin",
                铜钱: "Bronze Coin",
                系绳: "String",
                系绳珠: "String Pearl",
            },
        },
        extended: {
            Archetype: ExtendedArchetype.MODULAR,
            DrawImages: false,
            Modules: [{ Name: "位置", Key: "m", Options: [{}, {}, {}] }],
        },
        assetStrings: {
            CN: {
                SelectBase: "配置铜钱簪",
                Module位置: "位置",
                Select位置: "选择佩戴位置",
                Optionm0: "较高",
                Optionm1: "中间",
                Optionm2: "较低",
            },
            EN: {
                SelectBase: "Configure Tongqian Hairpin",
                Module位置: "Position",
                Select位置: "Select Wearing Position",
                Optionm0: "Higher",
                Optionm1: "Middle",
                Optionm2: "Lower",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
