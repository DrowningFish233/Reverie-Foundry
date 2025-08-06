//虚空之井
/**
 * 虚空之井配方
 * @param {string|Object} input - 输入物品
 * @param {string|Object} output - 输出物品
 */
function FavorOfTheVoidRecipe(input, output) {
    this.type = "malum:favor_of_the_void";


    if (input.startsWith('#')) {
        this.ingredient = { tag: input.substring(1) };
    } else {
        this.ingredient = { item: input };
    }

    // 处理输出格式
    this.output = typeof output === 'string' ?
        { id: output, count: 1 } :
        { id: output.id, count: output.count || 1 };

    this.conditions = [];
}


ServerEvents.recipes(event => {
    // 包装注册函数
    const register = recipe => {
        const json = JSON.parse(JSON.stringify(recipe));
        if (json.conditions && json.conditions.length === 0) delete json.conditions;
        event.custom(json);
    };

    register(
        new FavorOfTheVoidRecipe(
            "minecraft:totem_of_undying", // 输入
            "kubejs:totem_of_undying"  // 输出
        )
    );
    register(
        new FavorOfTheVoidRecipe(
            "biomesoplenty:rose_quartz_block", // 输入
            "create:rose_quartz"  // 输出
        )
    );
});