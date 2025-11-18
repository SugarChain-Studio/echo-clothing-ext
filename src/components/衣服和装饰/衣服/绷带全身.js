import { AssetManager } from "../../../assetForward";
import { PostPass, SockLRTool } from "../../../lib";
import { luziSuffixFixups } from "../../../lib/fixups";

const translation = { CN: "绷带", EN: "Bandage", RU: "Повязка" };

/** @type { AddAssetWithConfigParams[] } */
const assets = [
    [
        "Gloves",
        {
            Name: "绷带",
            Random: false,
            Top: 0,
            Left: 0,
            ParentGroup: "BodyUpper",
            PoseMapping: {
                TapedHands: "TapedHands",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "BackElbowTouch",
                BackElbowTouch: "BackElbowTouch",
                BackCuffs: "BackElbowTouch",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        { translation },
    ],
    [
        "Socks",
        PostPass.asset(
            {
                Name: "绷带",
                Random: false,
                Top: 0,
                Left: { "": 0, "KneelingSpread": 30 },
            },
            (asset) => {
                SockLRTool.createSockLR(asset).forEach(([key, value]) => {
                    AssetManager.addAssetWithConfig(key, value, { translation });
                });
            }
        ),
        { translation },
    ],
    [
        "Bra",
        {
            Name: "绷带全身",
            Random: false,
            Gender: "F",
            Top: 0,
            Left: 0,
            Expose: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings"],
            Layer: [
                {
                    Name: "上身",
                    ParentGroup: "BodyUpper",
                    PoseMapping: {
                        TapedHands: "TapedHands",
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                        BackBoxTie: "BackElbowTouch",
                        BackElbowTouch: "BackElbowTouch",
                        BackCuffs: "BackElbowTouch",
                        Hogtied: "Hide",
                        AllFours: "Hide",
                    },
                },
                {
                    Name: "下身",
                    ParentGroup: "BodyLower",
                    PoseMapping: {
                        Kneel: "Kneel",
                        KneelingSpread: "KneelingSpread",
                        LegsClosed: "LegsClosed",
                        Spread: "Spread",
                        Hogtied: "Hide",
                        AllFours: "Hide",
                    },
                },
            ],
        },
        { translation, layerNames: { EN: { 上身: "Top", 下身: "Bottom" } } },
    ],
    [
        "ItemHood",
        {
            Name: "绷带头部",
            Random: false,
            Block: [],
            Priority: 51,
            Top: 0,
            Left: 0,
        },
        { translation: { CN: "绷带头部", EN: "Head Bandage", RU: "Бинтование головы", UA: "Обв'язка голови бинтами" } },
    ],
    [
        "ItemTorso",
        {
            Name: "绷带全身",
            Gender: "F",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: 10,
            SelfBondage: 6,
            Time: 30,
            RemoveTime: 40,
            AllowTighten: true,
            SetPose: ["BackElbowTouch", "LegsClosed"],
            Effect: [E.Block, E.BlockWardrobe, E.Slow],
            Prerequisite: ["HasBreasts"],
            Layer: [
                {
                    Name: "上",
                    Priority: 24,
                    ParentGroup: "BodyUpper",
                    PoseMapping: { BackElbowTouch: PoseType.DEFAULT },
                },
                { Name: "下", Priority: 24, ParentGroup: "BodyLower", PoseMapping: { LegsClosed: PoseType.DEFAULT } },
            ],
        },
        {
            translation: {
                CN: "绷带全身",
                EN: "Full Body Bandage",
                RU: "Бинты на всё тело",
                UA: "Обв'язка бинтами на все тіло",
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
    for (const [g, asset] of assets) {
        luziSuffixFixups(g, asset.Name);
    }
    luziSuffixFixups(["SocksLeft", "SocksRight"], "绷带");
}
