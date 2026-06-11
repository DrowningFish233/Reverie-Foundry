/**
 * 酿造配方构造器
 * @param {Object} config - 配方配置
 * @param {string} config.fluid - 流体ID
 * @param {number} config.amount - 流体量
 * @param {string|Object|Array} config.ingredients - 主原料
 * @param {string|Object} config.result - 产出物品
 * @param {Array} config.stage_ingredients - 阶段原料
 * @param {number} config.stages - 阶段数
 * @param {string|Object} config.usedItem - 消耗物品
 */
function BrewingVatRecipe(config) {
    this.type = "extradelight:vat";

    // 流体配置
    this.fluids = {
        fluid: config.fluid || "minecraft:water",
        amount: config.amount || 250
    };

    // 处理主原料
    if (Array.isArray(config.ingredients)) {
        this.ingredients = config.ingredients.map(ing =>
            typeof ing === 'string' ?
                (ing.startsWith('#') ? { tag: ing.substring(1) } : { item: ing }) :
                ing
        );
    } else {
        this.ingredients = [
            typeof config.ingredients === 'string' ?
                (config.ingredients.startsWith('#') ?
                    { tag: config.ingredients.substring(1) } :
                    { item: config.ingredients }) :
                config.ingredients
        ];
    }

    // 处理产出
    this.result = typeof config.result === 'string' ?
        { id: config.result, count: 1 } :
        { id: config.result.id, count: config.result.count || 1 };

    // 阶段原料
    this.stage_ingredients = config.stage_ingredients || [];

    // 其他配置
    this.stages = config.stages || 1;

    // 处理消耗物品
    if (config.usedItem) {
        this.usedItem = typeof config.usedItem === 'string' ?
            { id: config.usedItem, count: 1 } :
            { id: config.usedItem.id, count: config.usedItem.count || 1 };
    }

    // 条件（可选）
    this.conditions = config.conditions || [];
}

ServerEvents.recipes(event => {
    // 包装注册函数
    const register = recipe => {
        const json = JSON.parse(JSON.stringify(recipe));
        if (json.conditions && json.conditions.length === 0) delete json.conditions;
        event.custom(json);
    };

    // 酿造
    register(new BrewingVatRecipe({
        fluid: "minecraft:water",
        amount: 200,
        ingredients: ["kubejs:biomass_liquid", "extradelight:grapefruit", "extradelight:grapefruit", "#c:flour", "#c:flour", "#c:flour"],
        result: "kubejs:grape_beer",
        stage_ingredients: [
            {
                ingredient: { item: "extradelight:yeast" },
                lid: true,
                time: 336
            },
            {
                ingredient: { tag: "extradelight:sweetener" },

                lid: true,
                time: 168
            }
        ],
        stages: 2,
        usedItem: "minecraft:glass_bottle"
    }));

    register(new BrewingVatRecipe({
        fluid: "minecraft:water",
        amount: 200,
        ingredients: ["kubejs:biomass_liquid", "extradelight:grapefruit", "irons_spellbooks:arcane_essence", "irons_spellbooks:arcane_essence", "minecraft:glowstone_dust", "minecraft:white_dye"],
        result: "kubejs:white_wine",
        stage_ingredients: [
            {
                ingredient: { item: "extradelight:yeast" },
                lid: true,
                time: 336
            }
        ],
        stages: 1,
        usedItem: "minecraft:glass_bottle"
    }));

    // 酿造
    register(new BrewingVatRecipe({
        fluid: "minecraft:water",
        amount: 200,
        ingredients: ["kubejs:biomass_liquid", "#c:jammable", "extradelight:grapefruit", "malum:sacred_spirit", "#c:flour", "#c:flour"],
        result: "kubejs:red_wine",
        stage_ingredients: [
            {
                ingredient: { item: "extradelight:yeast" },
                lid: true,
                time: 336
            },
            {
                ingredient: { item: "malum:sacred_spirit" },
                lid: true,
                time: 168
            }
        ],
        stages: 2,
        usedItem: "minecraft:glass_bottle"
    }));
});
