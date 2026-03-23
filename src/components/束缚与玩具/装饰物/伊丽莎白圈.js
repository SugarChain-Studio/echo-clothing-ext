import { AssetManager } from "@local/AssetManager";
import { Type } from "@local/lib/type";
import { HookManager } from "@sugarch/bc-mod-hook-manager";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ItemNeckAccessories",
    {
        Name: "伊丽莎白圈",
        Random: false,
        Left: 100,
        Top: 30,
        Difficulty: 4,
        RemoveTime: 10,
        Effect: ["BlockWardrobe"],
        Layer: [
            { Name: "后Rim", Priority: 4 },
            { Name: "后Mat", Priority: 4 },
            { Name: "中Rim", CopyLayerColor: "后Rim", Priority: 14 },
            { Name: "中Mat", CopyLayerColor: "后Mat", Priority: 14 },
            { Name: "前Rim", CopyLayerColor: "后Rim", Priority: 57 },
            { Name: "前Mat", CopyLayerColor: "后Mat", Priority: 57 },
        ],
    },
    {
        translation: { CN: "伊丽莎白圈", EN: "Elizabethan Collar" },
        layerNames: { CN: { 后Rim: "边缘", 后Mat: "主体" }, EN: { 后Rim: "Rim", 后Mat: "Mat" } },
    },
];

const selfAllowGroup = new Set(/** @type {AssetGroupName[]} */ (["ItemMouth", "ItemMouth2", "ItemMouth3"]));
const blockingWithSelfAllow = new Set(Type.activities(["Lick", "Bite", "Nibble"]));
const blockingActs = new Set([
    ...Type.activities(["Suck", "Kiss", "GaggedKiss", "EatItem"]),
    ...["咬走食物_Luzi", "用嘴喂食物", "舔手", "舔手指"],
    ...["咬笼子", "啃咬笼锁", "叼牵绳", "用嘴脱掉手套", "用嘴脱掉鞋子", "用嘴脱掉袜子"],
    ...["LSCG_Chomp", "LSCG_Headbutt", "LSCG_KissEyes"],
    ...["MPA_BowlEat", "MPA_BowlDrink"],
]);

HookManager.hookFunction("ActivityCheckPrerequisites", 0, (args, next) => {
    const [activity, actor, acted, group] = args;
    if (actor.IsPlayer() && InventoryIsItemInList(actor, "ItemNeckAccessories", ["伊丽莎白圈"])) {
        if (blockingActs.has(activity.Name)) {
            return false;
        }
        if (blockingWithSelfAllow.has(activity.Name) && (!acted.IsPlayer() || !selfAllowGroup.has(group.Name))) {
            return false;
        }
    }
    return next(args);
});

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
