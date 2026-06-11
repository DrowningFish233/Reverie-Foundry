//精魂修复配方
/**
 * 精魂修复配方
 */
function SpiritRepairRecipeJSON() {
    this.type = "malum:spirit_repair";
    this.spirits = [];
    this.validItems = [];
}

SpiritRepairRecipeJSON.prototype = {
    /**
     * 设置修复材料
     * @param {string} item - 物品ID
     * @param {number} count - 数量
     */
    setRepairMaterial: function (item, count) {
        this.repairMaterial = { item: item, count: count || 1 };
        return this;
    },

    /**
     * 设置修复材料标签
     * @param {string} tag - 标签ID
     * @param {number} count - 数量
     */
    setRepairMaterialTag: function (tag, count) {
        this.repairMaterial = { tag: tag, count: count || 1 };
        return this;
    },

    /**
     * 设置耐久度百分比
     * @param {number} percentage - 耐久度百分比 (0-1)
     */
    setDurabilityPercentage: function (percentage) {
        this.durabilityPercentage = percentage;
        return this;
    },

    /**
     * 添加精魂
     * @param {string} type - 精魂类型
     * @param {number} count - 精魂数量
     */
    addSpirit: function (type, count) {
        this.spirits.push({ type: `malum:${type}`, count: count });
        return this;
    },

    /**
     * 添加有效物品
     * @param {string} itemId - 物品ID
     */
    addValidItem: function (itemId) {
        this.validItems.push(itemId);
        return this;
    }
};

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel);
    }
    const SpiritRepairRecipe = new SpiritRepairRecipeJSON()
    // 精魂修复配方
    registerCustomRecipe(
        SpiritRepairRecipe
            .setRepairMaterial("minecraft:iron_ingot", 2)
            .addSpirit("infernal", 2)
            .addSpirit("earthen", 8)
            .setDurabilityPercentage(0.5)
            .addValidItem("minecraft:mace")
    );

})
