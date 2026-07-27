//虚空之井配方
/**
 * 虚空之井配方
 * @param {string|Object} input - 输入物品或标签
 * @param {string|Object} result - 输出物品
 */
function VoidFavorRecipeJSON(input, result) {
    this.type = "malum:void_favor";

    // 处理输入
    if (typeof input === 'string') {
        if (input.startsWith('#')) {
            this.input = { tag: input.substring(1) };
        } else {
            this.input = { item: input };
        }
    } else {
        this.input = input;
    }

    // 处理输出
    if (typeof result === 'string') {
        this.result = {
            id: result,
            count: 1
        };
    } else {
        this.result = result;
    }
}

VoidFavorRecipeJSON.prototype = {
    /**
     * 设置输出数量
     * @param {number} count - 输出物品数量
     */
    setOutputCount: function (count) {
        this.result.count = count;
        return this;
    }
};

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel);
    }

    registerCustomRecipe(
        new VoidFavorRecipeJSON("minecraft:totem_of_undying", "kubejs:totem_of_undying")
    );

    registerCustomRecipe(
        new VoidFavorRecipeJSON("kubejs:limpid_spirit", "malum:umbral_spirit")
    );

    registerCustomRecipe(
        new VoidFavorRecipeJSON("kubejs:low_heart_of_darkness", "kubejs:heart_of_darkness")
    );

    registerCustomRecipe(
        new VoidFavorRecipeJSON("endrem:corrupted_eye", "endrem:cursed_eye")
    );

    registerCustomRecipe(
        new VoidFavorRecipeJSON('create:chromatic_compound', 'kubejs:void_ingot')
    );

    registerCustomRecipe(
        new VoidFavorRecipeJSON('minecraft:pumpkin', 'netherexp:sorrowsquash')
    );
    registerCustomRecipe(
        new VoidFavorRecipeJSON('minecraft:beetroot_seeds', 'netherexp:cerebrage_seeds')
    );
});
