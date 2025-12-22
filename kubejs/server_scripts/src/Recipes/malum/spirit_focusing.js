//精魂聚焦配方
/**
 * 精魂聚焦配方
 */
function SpiritFocusingRecipeJSON() {
    this.type = "malum:spirit_focusing";
    this.spirits = [];
}

SpiritFocusingRecipeJSON.prototype = {
    /**
     * 设置输入物品
     * @param {string} item - 物品ID
     */
    setInput: function (item) {
        this.input = { item: item };
        return this;
    },

    /**
     * 设置输出物品
     * @param {string} item - 物品ID
     * @param {number} count - 数量
     */
    setOutput: function (item, count) {
        this.result = { id: item, count: count || 1 };
        return this;
    },

    /**
     * 设置耐久消耗
     * @param {number} cost - 耐久消耗
     */
    setDurabilityCost: function (cost) {
        this.durabilityCost = cost;
        return this;
    },

    /**
     * 设置时间
     * @param {number} time - 处理时间
     */
    setTime: function (time) {
        this.time = time;
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
    }
};

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel);
    }
    /*
        registerCustomRecipe(
            new SpiritFocusingRecipeJSON()
                .setDurabilityCost(1)
                .setInput("malum:alchemical_impetus")
                .setOutput("minecraft:enchanted_golden_apple", 4)
                .addSpirit("infernal", 2)
                .addSpirit("arcane", 2)
                .setTime(300)
        );
    */
});

