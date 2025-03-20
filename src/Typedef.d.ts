/** 扩展的身体组（非物品）名称 */
type CustomGroupBodyName =
    | AssetGroupBodyName
    | `${AssetGroupBodyName}_笨笨蛋Luzi`
    | `${AssetGroupBodyName}_笨笨笨蛋Luzi2`
    | 'Liquid2_Luzi'
    | 'BodyMarkings2_Luzi'
    | '动物身体_Luzi'
    | '长袖子_Luzi'
    | '新前发_Luzi'
    | '新后发_Luzi'
    | '额外头发_Luzi'
    | '额外身高_Luzi'
    | '身体痕迹_Luzi'
    | '眼睛左_Luzi'
    | '眼睛右_Luzi';

type FuncWork<T extends any[] = []> = (...args: T) => void;

type MyAssetManager = import('@sugarch/bc-asset-manager').AssetManagerType<CustomGroupBodyName>;

type CustomGroupName = import('@sugarch/bc-asset-manager').CustomGroupName<CustomGroupBodyName>;

type CustomGroupDefinition = import('@sugarch/bc-asset-manager').CustomGroupDefinition<CustomGroupBodyName>;

type CustomAssetDefinitionItem = import('@sugarch/bc-asset-manager').CustomAssetDefinitionItem<CustomGroupBodyName>;

type CustomAssetDefinitionAppearance =
    import('@sugarch/bc-asset-manager').CustomAssetDefinitionAppearance<CustomGroupBodyName>;

type CustomAssetDefinition = import('@sugarch/bc-asset-manager').CustomAssetDefinition<CustomGroupBodyName>;

/** 按照身体组分类的物品定义 */
type CustomGroupedAssetDefinitions =
    import('@sugarch/bc-asset-manager').CustomGroupedAssetDefinitions<CustomGroupBodyName>;

declare namespace Translation {
    type GroupedEntries = import('@sugarch/bc-asset-manager').Translation.GroupedEntries<CustomGroupBodyName>;
}
