import { ArmMaskTool } from "../../../armMask";
import { AssetManager } from "../../../assetForward";
/** @type {<T>(arg0: number, arg1: (number)=>T)=>T[]} */
const iota = (times, func) => Array.from({ length: times }, (_, i) => func(i));

const poseMapping = {
    ...AssetPoseMapping.Cloth,
    AllFours: PoseType.HIDE,
    Hogtied: PoseType.HIDE,
};

const backPoses = ["BackBoxTie", "BackCuffs", "BackElbowTouch"];

/**
 * @typedef {Pick<AssetLayerDefinition, "Name"| "CopyLayerColor" |"Priority"|"PoseMapping" | "AllowTypes"> & {ColorName?:string}} MyDefinition
 */

const layerGroupBase = {
    B: ["外侧", "拉链"],
    C: ["金属环", "饰带边缘", "饰带"],
    D: ["袖子", "内层", "内衬", "内衬图案", "拉链内侧"],
};

const layerDefBase = /** @type {MyDefinition[]} */ ([
    ...iota(2, (i) => ({ Name: `B${i + 1}`, ColorName: layerGroupBase.B[i] })),
    ...iota(3, (i) => ({ Name: `C${i + 1}`, ColorName: layerGroupBase.C[i] })),
    {
        Name: "D1",
        ColorName: layerGroupBase.D[0],
        PoseMapping: {
            ...poseMapping,
            ...Object.fromEntries(backPoses.map((pose) => [pose, PoseType.HIDE])),
        },
    },
    {
        Name: "D1B",
        Priority: 10,
        CopyLayerColor: "D1",
        PoseMapping: {
            BaseUpper: PoseType.HIDE,
            ...Object.fromEntries(backPoses.map((pose) => [pose, pose])),
        },
    },
    ...iota(4, (i) => ({ Name: `D${i + 2}`, ColorName: layerGroupBase.D[i + 1] })),
])
    .flatMap((layer) =>
        ["L", "R"].flatMap(
            (D) =>
                /** @type {MyDefinition[]} */ ([
                    {
                        ...layer,
                        Name: `Y_${D}_${layer.Name}`,
                        ColorName: D === "L" ? "左" : "右",
                        ColorGroup: layer.ColorName,
                        ...(layer.CopyLayerColor ? { CopyLayerColor: `Y_${D}_${layer.CopyLayerColor}` } : {}),
                        AllowTypes: { typed: 0 },
                    },
                    {
                        ...layer,
                        Name: `X_${D}_${layer.Name}`,
                        ColorName: D === "L" ? "左" : "右",
                        ...(layer.CopyLayerColor
                            ? { CopyLayerColor: `Y_${D}_${layer.CopyLayerColor}` }
                            : { CopyLayerColor: `Y_${D}_${layer.Name}` }),
                        AllowTypes: { typed: 1 },
                    },
                ])
        )
    )
    .concat([
        {
            Name: "Y_A1",
            ColorName: "后背",
            Priority: 5,
            AllowTypes: { typed: 0 },
        },
        {
            Name: "X_A1",
            ColorName: "后背",
            CopyLayerColor: "Y_A1",
            Priority: 5,
            AllowTypes: { typed: 1 },
        },
    ]);

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "敞夹克",
    Random: false,
    Left: 50,
    Top: 70,
    Priority: 35,
    DefaultColor: [
        "#A9A5C3",
        "#A9A5C3",
        "#000000",
        "#000000",
        "#3A3A3A",
        "#3A3A3A",
        "#222222",
        "#222222",
        "#A6A6A6",
        "#A6A6A6",
        "#A9A5C3",
        "#A9A5C3",
        "#A9A5C3",
        "#A9A5C3",
        "#141414",
        "#141414",
        "#424242",
        "#424242",
        "#000000",
        "#000000",
    ],
    ParentGroup: "BodyUpper",
    DynamicGroupName: "Cloth",
    PoseMapping: poseMapping,
    Layer: layerDefBase.map((l) => ({ ...l, ColorName: undefined })),
};

const translation = {
    CN: "随意敞开机能夹克",
    EN: "Casual Open Functional Jacket",
};

const ENlayer = { 左: "Left", 右: "Right" };

const layerNames = {
    CN: {
        ...Object.fromEntries(layerDefBase.filter((l) => l.ColorName).map((l) => [l.Name, l.ColorName])),
    },
    EN: {
        ...Object.fromEntries(layerDefBase.filter((l) => l.ColorName).map((l) => [l.Name, ENlayer[l.ColorName]])),
        Y_A1: "Back",

        外侧: "Outer",
        拉链: "Zipper",
        金属环: "Metal Ring",
        饰带边缘: "Strap Edge",
        饰带: "Strap",
        袖子: "Sleeves",
        内层: "Inner",
        内衬: "Lining",
        内衬图案: "Lining Pattern",
        拉链内侧: "Zipper Inside",
    },
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "X" }, { Name: "Y" }],
};

const assetStrings = {
    CN: {
        Select: "选择夹克样式",
        X: "降低一点",
        Y: "提高一点",
    },
    EN: {
        Select: "Select Jacket Style",
        X: "Lower a bit",
        Y: "Raise a bit",
    },
};

const imageMapping = Object.entries({ Normal: ["Large", "XLarge"], Small: ["FlatSmall", "FlatMedium"] })
    .flatMap(([key, values]) => values.map((size) => /** @type {[string,string]} */ ([key, size])))
    .reduce((pv, [from, to]) => {
        for (const p of ["", "BackBoxTie/", "BackCuffs/", "BackElbowTouch/", "OverTheHead/", "Yoked/"]) {
            for (const l of asset.Layer) {
                pv[
                    `Assets/Female3DCG/Cloth/${p}${asset.Name}_${to}_${l.Name}.png`
                ] = `Assets/Female3DCG/Cloth/${p}${asset.Name}_${from}_${l.Name}.png`;
            }
        }
        return pv;
    }, /**@type{Record<string,string>}*/ ({}));

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset, "Hand");
    /** @type {AssetGroupBodyName[]} */
    const groups = ["Cloth", "ClothOuter"];
    for (const group of groups) {
        AssetManager.addAssetWithConfig(group, asset, {
            translation,
            layerNames,
            extended,
            assetStrings,
        });
    }

    AssetManager.addImageMapping(imageMapping);
}
