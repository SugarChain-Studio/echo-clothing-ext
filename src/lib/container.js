export const Container = {
    /**
     * @param {Item} item
     * @returns {ContainerProperty.ContainerData}
     */
    item2content(item) {
        const ret = { ...item, IAsset: item.Asset.Name };
        delete ret.Asset;
        return ret;
    },

    /**
     * @param {Character} chara
     * @param {ContainerProperty.ContainerData} content
     * @param {ItemProperties["TypeRecord"]} [record]
     * @returns {Item | null}
     */
    content2item(chara, content, record) {
        const item = InventoryWear(chara, content.IAsset, "ItemHandheld");
        if (!item) return null;

        const contentCopy = { ...content };
        delete contentCopy.IAsset;

        Object.assign(item, { ...contentCopy, Asset: item.Asset });
        const record_ = record ?? content.Property?.TypeRecord;
        if (record_) {
            ExtendedItemSetOptionByRecord(chara, item, record_, { push: false });
        }
        return item;
    },
};
