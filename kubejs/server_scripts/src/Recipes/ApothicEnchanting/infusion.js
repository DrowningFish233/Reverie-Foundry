/**
 * 灌注配方构造函数
 * @param {string} inputItem - 输入物品ID
 * @param {string} resultItem - 输出物品ID
 * @param {Object} requirements - 基础需求(eterna, quanta, arcana)
 * @param {Object} maxRequirements - 最大需求(eterna, quanta, arcana)
 * @param {number} count - 输出数量
 */
function ApothecInfusionRecipe(inputItem, resultItem, requirements, maxRequirements, count) {
    this.type = "apothic_enchanting:infusion";
    this.input = {
        item: inputItem
    };
    this.result = {
        id: resultItem,
        count: count || 1  // 默认值
    };
    this.requirements = {
        eterna: requirements.eterna || 0,
        quanta: requirements.quanta || 0,
        arcana: requirements.arcana || 0
    };
    this.max_requirements = {
        eterna: maxRequirements.eterna || -1,
        quanta: maxRequirements.quanta || -1,
        arcana: maxRequirements.arcana || -1
    };
}

ServerEvents.recipes(event => {
    const register = recipe => {
        event.custom(JSON.parse(JSON.stringify(recipe)));
    };

    // 青铜锭配方
    register(
        new ApothecInfusionRecipe(
            "alltheores:bronze_ingot",
            "kubejs:bronze_ingot",
            { eterna: 40, quanta: 20, arcana: 30 },
            { eterna: -1, quanta: 40, arcana: -1 },
            1
        )
    );

    // 殷钢锭配方
    register(
        new ApothecInfusionRecipe(
            "alltheores:invar_ingot",
            "kubejs:invar_ingot",
            { eterna: 40, quanta: 20, arcana: 30 },
            { eterna: -1, quanta: 40, arcana: -1 },
            1
        )
    );

    // 黄铜锭配方
    register(
        new ApothecInfusionRecipe(
            "minecraft:gold_ingot",
            "kubejs:brass_ingot",
            { eterna: 60, quanta: 30, arcana: 50 },
            { eterna: -1, quanta: 50, arcana: -1 },
            1
        )
    );


    // 镍锭配方
    register(
        new ApothecInfusionRecipe(
            "alltheores:nickel_ingot",
            "kubejs:nickel_ingot",
            { eterna: 20, quanta: 15, arcana: 25 },
            { eterna: -1, quanta: 30, arcana: -1 },
            1
        )
    );

    register(
        new ApothecInfusionRecipe(
            "silentgear:crimson_steel_ingot",
            "kubejs:adamanite_ingot",
            { eterna: 70, quanta: 20, arcana: 30 },
            { eterna: -1, quanta: -1, arcana: -1 },
            1
        )
    );

    register(
        new ApothecInfusionRecipe(
            "alltheores:osmium_ingot",
            "kubejs:osmium_ingot",
            { eterna: 30, quanta: 10, arcana: 0 },
            { eterna: -1, quanta: -1, arcana: -1 },
            1
        )
    );

    register(
        new ApothecInfusionRecipe(
            "alltheores:platinum_ingot",
            "kubejs:platinum_ingot",
            { eterna: 30, quanta: 5, arcana: 5 },
            { eterna: -1, quanta: -1, arcana: -1 },
            1
        )
    );

    register(
        new ApothecInfusionRecipe(
            "alltheores:tin_ingot",
            "kubejs:tin_ingot",
            { eterna: 5, quanta: 10, arcana: 5 },
            { eterna: -1, quanta: -1, arcana: -1 },
            1
        )
    );

    register(
        new ApothecInfusionRecipe(
            "create:zinc_ingot",
            "kubejs:zinc_ingot",
            { eterna: 5, quanta: 5, arcana: 0 },
            { eterna: -1, quanta: -1, arcana: -1 },
            1
        )
    );

    register(
        new ApothecInfusionRecipe(
            "silentgems:citrine",
            "kubejs:citrine",
            { eterna: 35, quanta: 30, arcana: 10 },
            { eterna: -1, quanta: -1, arcana: -1 },
            1
        )
    );

    register(
        new ApothecInfusionRecipe(
            "silentgems:opal",
            "kubejs:opal",
            { eterna: 20, quanta: 10, arcana: 5 },
            { eterna: -1, quanta: -1, arcana: -1 },
            1
        )
    );

    register(
        new ApothecInfusionRecipe(
            "alltheores:peridot",
            "kubejs:peridot",
            { eterna: 10, quanta: 5, arcana: 5 },
            { eterna: -1, quanta: -1, arcana: -1 },
            1
        )
    );

    register(
        new ApothecInfusionRecipe(
            "create:rose_quartz",
            "kubejs:rose_quartz",
            { eterna: 10, quanta: 5, arcana: 5 },
            { eterna: -1, quanta: -1, arcana: -1 },
            1
        )
    );

    register(
        new ApothecInfusionRecipe(
            "alltheores:electrum_ingot",
            "kubejs:electrum_ingot",
            { eterna: 20, quanta: 20, arcana: 20 },
            { eterna: -1, quanta: -1, arcana: -1 },
            1
        )
    );
});
