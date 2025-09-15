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

// src/types/sweetalert2.d.ts
declare module 'https://cdn.jsdelivr.net/npm/sweetalert2@11.6.13/+esm' {
    import Swal from 'sweetalert2';
    export default Swal;
}

declare module 'https://cdn.jsdelivr.net/npm/bondage-club-mod-sdk@1.2.0/dist/bcmodsdk.js' {
    import bcModSdk from 'bondage-club-mod-sdk';
    export default bcModSdk;
}

type CustomAssetAttribute = AssetAttribute | 'LuziXCross' | 'LuziLimbTeleDevice';

type ExtendType<T, From, To> = {
    [K in keyof T]: T[K] extends From ? To : ExtendType<T[K], From, To>;
};

type CustomLoginInventoryFixup = ExtendType<typeof LoginInventoryFixups[number], AssetGroupName, CustomGroupName>;

type AddAssetWithConfigParams = Parameters<MyAssetManager['addAssetWithConfig']>;

type AddAssetWithConfigParamsNoGroup = [
    Parameters<MyAssetManager['addAssetWithConfig']>[1],
    Parameters<MyAssetManager['addAssetWithConfig']>[2]
];
