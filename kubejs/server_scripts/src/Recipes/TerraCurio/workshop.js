/**
 * Terra Curio Workshop 配方构建器（链式调用）
 * @param {string|Object} result - 输出物品ID或对象 {id: "item_id", count: number}
 */
function TerraCurioWorkshopRecipeJSON(result) {
    this.type = "terra_curio:workshop";

    // 处理输出
    if (typeof result === 'string') {
        this.result = {
            id: result,
            count: 1
        };
    } else {
        this.result = {
            id: result.id,
            count: result.count || 1
        };
    }

    this.ingredients = [];
}

TerraCurioWorkshopRecipeJSON.prototype = {
    /**
     * 添加一个原料
     * @param {string|Object} item - 物品ID或对象
     */
    addIngredient: function (item) {
        this.ingredients.push({
            item: typeof item === 'string' ? item : (item.item || item.id)
        });
        return this;
    },

    /**
     * 添加多个原料
     * @param {Array} items - 物品数组
     */
    addIngredients: function (items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            this.ingredients.push({
                item: typeof item === 'string' ? item : (item.item || item.id)
            });
        }
        return this;
    },

    /**
     * 设置原料列表（覆盖现有）
     * @param {Array} ingredients - 原料数组
     */
    setIngredients: function (ingredients) {
        this.ingredients = [];
        for (var i = 0; i < ingredients.length; i++) {
            var item = ingredients[i];
            this.ingredients.push({
                item: typeof item === 'string' ? item : (item.item || item.id)
            });
        }
        return this;
    },

    /**
     * 设置输出物品数量
     * @param {number} count - 数量
     */
    setResultCount: function (count) {
        this.result.count = count;
        return this;
    },

    /**
     * 设置输出物品ID
     * @param {string} id - 物品ID
     */
    setResultId: function (id) {
        this.result.id = id;
        return this;
    }
};

// 使用示例
ServerEvents.recipes(event => {
    function registerTerraCurioRecipe(recipeModel) {
        event.custom(recipeModel);
    }

    registerTerraCurioRecipe(
        new TerraCurioWorkshopRecipeJSON('kubejs:mana_regeneration_band')
            .addIngredient('terra_curio:band_of_regeneration')
            .addIngredient('kubejs:band_of_starpower')
    );

    registerTerraCurioRecipe(
        new TerraCurioWorkshopRecipeJSON('kubejs:arcane_flower')
            .addIngredient('terra_curio:putrid_scent')
            .addIngredient('kubejs:mana_flower')
    );

    registerTerraCurioRecipe(
        new TerraCurioWorkshopRecipeJSON('kubejs:magnet_flower')
            .addIngredient('terra_curio:treasure_magnet')
            .addIngredient('kubejs:mana_flower')
    );

    registerTerraCurioRecipe(
        new TerraCurioWorkshopRecipeJSON('kubejs:mana_cloak')
            .addIngredient('terra_curio:star_cloak')
            .addIngredient('kubejs:mana_flower')
    );

    registerTerraCurioRecipe(
        new TerraCurioWorkshopRecipeJSON('kubejs:magic_cuffs')
            .addIngredient('terra_curio:shackle')
            .addIngredient('kubejs:blood_orb')
            .addIngredient('irons_spellbooks:arcane_essence')
    );

    registerTerraCurioRecipe(
        new TerraCurioWorkshopRecipeJSON('kubejs:magic_cuffs')
            .addIngredient('terra_curio:shackle')
            .addIngredient('hazennstuff:shadow_scale')
            .addIngredient('irons_spellbooks:arcane_essence')
    );

    registerTerraCurioRecipe(
        new TerraCurioWorkshopRecipeJSON('kubejs:band_of_starpower')
            .addIngredient('terra_curio:band_of_regeneration')
            .addIngredient('irons_spellbooks:arcane_ingot')

    );
    /*
    registerTerraCurioRecipe(
        new TerraCurioWorkshopRecipeJSON('terra_curio:custom_item')
            .addIngredients([
                'minecraft:diamond',
                'minecraft:emerald',
                'minecraft:gold_ingot'
            ])
    );
    */

    registerTerraCurioRecipe(
        new TerraCurioWorkshopRecipeJSON('kubejs:avenger_emblem')
            .addIngredient('terra_curio:ranger_emblem')
            .addIngredient('terra_curio:warrior_emblem')
            .addIngredient('kubejs:sorcerer_emblem')

    );

    registerTerraCurioRecipe(
        new TerraCurioWorkshopRecipeJSON('kubejs:destroyer_emblem')
            .addIngredient('terra_curio:eye_of_the_golem')
            .addIngredient('kubejs:avenger_emblem')
    );

    registerTerraCurioRecipe(
        new TerraCurioWorkshopRecipeJSON('terra_curio:sniper_scope')
            .addIngredient('terra_curio:rifle_scope')
            .addIngredient('kubejs:destroyer_emblem')
    );
});


