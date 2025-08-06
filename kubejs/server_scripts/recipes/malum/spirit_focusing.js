/**
 * 灵能聚焦配方构造函数
 * @param {Item} ingredient - 输入物品（如 alchemical_impetus）
 * @param {Item} output - 输出物品（如 blazing_quartz）
 * @param {Array} spirits - 消耗的灵液类型和数量
 */
function SpiritFocusingRecipe(ingredient, output, spirits) {
    this.type = "malum:spirit_focusing";
    this.durabilityCost = 1; // 默认耐久消耗
    this.ingredient = { item: ingredient.id }; // 输入物品
    this.output = {
        id: output.id,
        count: output.count || 1 // 默认输出1个
    };
    this.spirits = spirits;
    this.time = 100; // 默认处理时间（游戏刻）
}

// 原型方法（链式调用）
SpiritFocusingRecipe.prototype = {
    /**
     * 设置耐久消耗（工具损耗）
     * @param {number} cost - 消耗的耐久值
     */
    setDurabilityCost: function (cost) {
        this.durabilityCost = cost;
        return this;
    },

    /**
     * 设置处理时间（单位：游戏刻，20刻=1秒）
     * @param {number} ticks - 处理时间
     */
    setProcessingTime: function (ticks) {
        this.time = ticks;
        return this;
    },

    /**
     * 添加NeoForge条件（如模组加载检查）
     * @param {Object} condition - 条件对象
     */
    addCondition: function (condition) {
        if (!this.conditions) this.conditions = [];
        this.conditions.push(condition);
        return this;
    }
};


ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel);
    }

    registerCustomRecipe(
        new SpiritFocusingRecipe(
            Item.of("malum:alchemical_impetus"), // 输入物品
            Item.of("minecraft:enchanted_golden_apple", 4),  // 输出物品
            [ // 所需精魂:'earthen', 'aqueous', 'aerial', 'eldritch', 'arcane', 'wicked', 'sacred', 'infernal'
                { type: "infernal", count: 2 },
                { type: "arcane", count: 2 }
            ]
        )
            .setDurabilityCost(1)    // 消耗耐久
            .setProcessingTime(300)  // 持续时间/刻
    );
});