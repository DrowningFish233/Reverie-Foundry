//释缚仪式
/**
 * 释缚仪式
 */
function UnchainedTransmutationRecipeJSON() {
    this.type = "malum:unchained_transmutation";
}

UnchainedTransmutationRecipeJSON.prototype = {
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
     * 设置分组
     * @param {string} group - 分组名称
     */
    setGroup: function (group) {
        this.group = group;
        return this;
    }
};

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel);
    }

    registerCustomRecipe(
        new UnchainedTransmutationRecipeJSON()
            .setGroup("soulwood_transmutation")
            .setInput("minecraft:cobweb")
            .setOutput("minecraft:white_wool", 1)
    );


    registerCustomRecipe(
        new UnchainedTransmutationRecipeJSON()
            .setGroup("strange_crystal")
            .setInput("minecraft:amethyst_cluster")
            .setOutput("malum:strange_crystal", 1)
    );
});