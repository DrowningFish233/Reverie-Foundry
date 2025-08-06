/**
 * 仪式配方构造函数
 * @param {Object} centralItem - 核心物品（需含item）
 * @param {Object} result - 输出物品（需含id）
 * @param {Object} inputs - 输入物品（键值对：物品ID:数量）
 */
function RitualRecipe(centralItem, result, inputs) {
    this.type = "alshanex_familiars:ritual_recipe";
    this.central_item = { item: centralItem.item };
    this.result = { id: result.id };
    this.input_items = {};

    // 处理输入物品格式
    for (const [item, count] of Object.entries(inputs)) {
        this.input_items[item] = count;
    }

    // 可选参数
    this.particle_type = "minecraft:smoke"; // 默认粒子效果
    this.conditions = [];
}

// 原型方法（链式调用）
RitualRecipe.prototype = {
    /**
     * 设置仪式粒子效果
     * @param {string} particle - 粒子类型（如"minecraft:end_rod"）
     */
    setParticle: function (particle) {
        this.particle_type = particle;
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
    // 包装注册函数（自动清理空字段）
    const register = recipe => {
        const json = JSON.parse(JSON.stringify(recipe));
        if (json.conditions && json.conditions.length === 0) delete json.conditions;
        event.custom(json);
    };

    register(
        new RitualRecipe(
            { item: "alshanex_familiars:pet_soul" }, // 核心物品
            { id: "minecraft:enchanted_golden_apple" }, // 输出
            { // 输入材料
                "irons_spellbooks:legendary_ink": 1,
                "irons_spellbooks:arcane_essence": 1,
                "irons_spellbooks:arcane_rune": 1,
                "irons_spellbooks:magic_cloth": 1
            }
        )
            .setParticle("minecraft:end_rod") // 粒子

    );

});