//精魂灌注
/**
 * 精魂灌注配方
 * @param {Item} ingredient - 主输入物品
 * @param {Item} output - 输出物品
 * @param {Array} spirits - 消耗的精魂类型和数量
 * @param {Array} extraIngredients - 额外材料列表
 */
function SpiritInfusionRecipe(ingredient, output, spirits, extraIngredients) {
    this.type = "malum:spirit_infusion";
    this.ingredient = {
        item: ingredient.id,
        count: ingredient.count || 1 // 默认1个
    };
    this.output = {
        id: output.id,
        count: output.count || 1 // 默认1个
    };
    this.spirits = spirits;
    this.extraIngredients = extraIngredients || []; // 可选额外材料
}


SpiritInfusionRecipe.prototype = {
    /**
     * 添加额外材料
     * @param {string|Object} item - 物品ID或带count的对象
     * @param {number} [count=1] - 物品数量（可选）
     */
    addExtraIngredient: function (item, count) {
        const entry = typeof item === 'string' ?
            { item: item, count: count || 1 } :
            { item: item.item, count: item.count || 1 };
        this.extraIngredients.push(entry);
        return this;
    },

    /**
     * 添加NeoForge条件
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
        new SpiritInfusionRecipe(
            Item.of("kubejs:starfury", 1), // 输入材料
            Item.of("hazennstuff:starfury"), // 输出材料
            [ // 所需精魂:'earthen', 'aqueous', 'aerial', 'eldritch', 'arcane', 'wicked', 'sacred', 'infernal'
                { type: "aqueous", count: 3 },
                { type: "aerial", count: 3 },
                { type: "earthen", count: 3 },
                { type: "eldritch", count: 3 },
                { type: "arcane", count: 3 },
                { type: "wicked", count: 3 },
                { type: "sacred", count: 3 },
                { type: "infernal", count: 3 },
            ],
            [ // 额外材料
                { item: "irons_spellbooks:arcane_essence", count: 16 }
            ]
        )
    );

});