import { AssetManager } from "@local/AssetManager";
import { Layer } from "@local/lib/type";

/** @type { AddAssetWithConfigParams } */
const asset = [
    ["HairAccessory1", "HairAccessory3", "Hat"],
    {
        Name: "耳機",
        Random: false,
        Left: 150,
        Top: 20,
        DynamicGroupName: "Hat",
        ParentGroup: {},
        Layer: Layer.map(
            [
                { Name: "耳機框", AllowTypes: { typed: 0 } },
                { Name: "耳機座連接-右", AllowTypes: { typed: 0 } },
                { Name: "耳機座連接-左", AllowTypes: { typed: 0 } },
                { Name: "耳機座-右", ColorGroup: "耳機座" },
                { Name: "耳機座-左", ColorGroup: "耳機座" },
                { Name: "耳罩-右", ColorGroup: "耳罩" },
                { Name: "耳罩-左", ColorGroup: "耳罩" },
                { Name: "耳機燈光-右", ColorGroup: "耳機燈光" },
                { Name: "耳機燈光-左", ColorGroup: "耳機燈光" },
                { Name: "天線元件-右", ColorGroup: "天線元件", AllowTypes: { typed: 0 } },
                { Name: "天線元件-左", ColorGroup: "天線元件", AllowTypes: { typed: 0 } },
                { Name: "天線-右", ColorGroup: "天線", AllowTypes: { typed: 0 } },
                { Name: "天線-左", ColorGroup: "天線", AllowTypes: { typed: 0 } },
                { Name: "天線內側-右", ColorGroup: "天線內側", AllowTypes: { typed: 0 } },
                { Name: "天線內側-左", ColorGroup: "天線內側", AllowTypes: { typed: 0 } },
                { Name: "麥克風支架" },
                { Name: "麥克風" },
            ],
            (l) => ({ ...l, CreateLayerTypes: ["typed"] })
        ),
    },
    {
        translation: { CN: "耳機", EN: "Headphone" },
        layerNames: {},
        extended: {
            Archetype: ExtendedArchetype.TYPED,
            DrawImages: true,
            Options: [{ Name: "戴好" }, { Name: "挂脖" }],
        },
        assetStrings: {
            CN: {
                Select: "选择佩戴方式",
                戴好: "戴好",
                挂脖: "挂脖",
            },
            EN: {
                Select: "Select wearing style",
                戴好: "On head",
                挂脖: "On neck",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
