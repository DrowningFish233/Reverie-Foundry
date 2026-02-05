/**
 * 仪式配方（链式调用）
 * @param {string|Object} centralItem - 核心物品ID或对象 {item: "id"}
 * @param {string|Object} result - 输出物品ID或对象 {id: "item_id"}
 */
function RitualRecipeJSON(centralItem, result) {
    this.type = "alshanex_familiars:ritual_recipe";

    // 处理核心物品
    if (typeof centralItem === 'string') {
        this.central_item = { item: centralItem };
    } else {
        this.central_item = centralItem;
    }

    // 处理输出
    if (typeof result === 'string') {
        this.result = { id: result };
    } else {
        this.result = result;
    }

    this.inputs = [];
    this.particle_type = "minecraft:smoke";
    this.conditions = [];

    // 临时存储当前正在配置的输入项
    this._currentInput = null;
}

RitualRecipeJSON.prototype = {
    /**
     * 开始添加一个新的输入材料
     * @param {string|Object} item - 物品ID或对象
     * @param {number} [count=1] - 数量
     */
    addInput: function (item, count) {
        // 如果之前有未完成的输入，先保存
        if (this._currentInput) {
            this.inputs.push(this._currentInput);
        }

        // 创建新的输入项
        this._currentInput = {
            ingredient: typeof item === 'string' ? { item: item } : item,
            count: count,
            consume: true // 默认消耗
        };

        return this;
    },

    /**
     * 设置当前输入材料是否消耗
     * @param {boolean} consume - 是否消耗
     */
    setConsume: function (consume) {
        if (this._currentInput) {
            this._currentInput.consume = consume;
        }
        return this;
    },

    /**
     * 设置当前输入材料的数量
     * @param {number} count - 数量
     */
    setCount: function (count) {
        if (this._currentInput) {
            this._currentInput.count = count;
        }
        return this;
    },

    /**
     * 完成当前输入材料的配置
     */
    endInput: function () {
        if (this._currentInput) {
            this.inputs.push(this._currentInput);
            this._currentInput = null;
        }
        return this;
    },

    /**
     * 快速添加单个输入材料（自动完成）
     * @param {string|Object} item - 物品ID或对象
     * @param {number} [count=1] - 数量
     * @param {boolean} [consume=true] - 是否消耗
     */
    addSimpleInput: function (item, count, consume) {
        this.inputs.push({
            ingredient: typeof item === 'string' ? { item: item } : item,
            count: count,
            consume: consume
        });
        return this;
    },

    /**
     * 添加多个输入材料（简化批量添加）
     * @param {Object} items - 物品ID到数量的映射
     */
    addInputs: function (items) {
        for (let [itemId, count] of Object.entries(items)) {
            this.addSimpleInput(itemId, count);
        }
        return this;
    },

    /**
     * 设置粒子效果
     * @param {string} particle - 粒子类型
     */
    setParticle: function (particle) {
        this.particle_type = particle;
        return this;
    },

    /**
     * 完成配方构建（内部使用）
     */
    _finalize: function () {
        // 确保最后一个输入被保存
        if (this._currentInput) {
            this.inputs.push(this._currentInput);
            this._currentInput = null;
        }
        return this;
    }
};

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        // 完成构建
        recipeModel._finalize();

        // 自动清理空数组
        const recipe = JSON.parse(JSON.stringify(recipeModel));
        if (recipe.conditions && recipe.conditions.length === 0) {
            delete recipe.conditions;
        }
        delete recipe._currentInput;
        event.custom(recipe);
    }


    registerCustomRecipe(
        new RitualRecipeJSON('alshanex_familiars:pet_soul', 'alshanex_familiars:scorcher_shard')
            .addSimpleInput('kubejs:unholy_essence', 2, true)
            .addSimpleInput('irons_spellbooks:cinder_essence', 1, false)
            .addSimpleInput('irons_spellbooks:fire_rune', 1, true)
            .addSimpleInput('minecraft:blaze_rod', 1, true)
            .setParticle('minecraft:end_rod')
    );

    registerCustomRecipe(
        new RitualRecipeJSON('alshanex_familiars:pet_soul', 'alshanex_familiars:illusionist_shard')
            .addSimpleInput('illagerinvasion:illusionary_dust', 2, true)
            .addSimpleInput('minecraft:amethyst_shard', 5, true)
            .addSimpleInput('irons_spellbooks:evocation_rune', 1, true)
            .addSimpleInput('minecraft:emerald', 1, true)
            .setParticle('minecraft:end_rod')
    );

    registerCustomRecipe(
        new RitualRecipeJSON('alshanex_familiars:pet_soul', 'alshanex_familiars:bard_shard')
            .addSimpleInput('minecraft:glowstone_dust', 6, true)
            .addSimpleInput('minecraft:note_block', 2, true)
            .addSimpleInput('alshanex_familiars:sound_rune', 1, true)
            .addSimpleInput('irons_spellbooks:arcane_essence', 5, true)
            .setParticle('minecraft:end_rod')
    );

    registerCustomRecipe(
        new RitualRecipeJSON('alshanex_familiars:pet_soul', 'alshanex_familiars:cleric_shard')
            .addSimpleInput('minecraft:glowstone_dust', 6, true)
            .addSimpleInput('irons_spellbooks:divine_pearl', 4, true)
            .addSimpleInput('irons_spellbooks:holy_rune', 1, true)
            .addSimpleInput('irons_spellbooks:arcane_essence', 5, true)
            .setParticle('minecraft:end_rod')
    );

    registerCustomRecipe(
        new RitualRecipeJSON('alshanex_familiars:pet_soul', 'alshanex_familiars:necromancer_shard')
            .addSimpleInput('irons_spellbooks:blood_vial', 6, true)
            .addSimpleInput('kubejs:meat', 4, true)
            .addSimpleInput('irons_spellbooks:blood_rune', 1, true)
            .addSimpleInput('irons_spellbooks:arcane_essence', 5, true)
            .setParticle('minecraft:end_rod')
    );

    registerCustomRecipe(
        new RitualRecipeJSON('alshanex_familiars:pet_soul', 'alshanex_familiars:plague_shard')
            .addSimpleInput('alshanex_familiars:spider_fang', 6, true)
            .addSimpleInput('alshanex_familiars:poison_vial', 1, true)
            .addSimpleInput('irons_spellbooks:nature_rune', 1, true)
            .addSimpleInput('irons_spellbooks:arcane_essence', 5, true)
            .setParticle('minecraft:end_rod')
    );


    registerCustomRecipe(
        new RitualRecipeJSON('alshanex_familiars:pet_soul', 'alshanex_familiars:dragon_warrior_shard')
            .addSimpleInput('minecraft:ender_pearl', 6, true)
            .addSimpleInput('malum:void_salts', 4, true)
            .addSimpleInput('irons_spellbooks:ender_rune', 1, true)
            .addSimpleInput('irons_spellbooks:arcane_essence', 5, true)
            .setParticle('minecraft:end_rod')
    );
});