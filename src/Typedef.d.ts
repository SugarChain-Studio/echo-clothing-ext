type FuncWork<T extends any[] = []> = (...args: T) => void;

type MyAssetManager = import('@sugarch/bc-asset-manager').AssetManagerType<CustomGroupBodyName>;

type CustomGroupDefinition = import('@sugarch/bc-asset-manager').CustomGroupDefinition<CustomGroupBodyName>;

type CustomAssetDefinitionItem = import('@sugarch/bc-asset-manager').CustomAssetDefinitionItem<CustomGroupBodyName>;

type CustomAssetDefinitionAppearance =
    import('@sugarch/bc-asset-manager').CustomAssetDefinitionAppearance<CustomGroupBodyName>;

type CustomAssetDefinition = import('@sugarch/bc-asset-manager').CustomAssetDefinition<CustomGroupBodyName>;

/** 按照身体组分类的物品定义 */
type CustomGroupedAssetDefinitions =
    import('@sugarch/bc-asset-manager').CustomGroupedAssetDefinitions<CustomGroupBodyName>;
