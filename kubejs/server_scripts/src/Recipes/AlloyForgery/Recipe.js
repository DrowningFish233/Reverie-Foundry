/**
 * 合金锻造配方类
 */
function AlloyForgingRecipeJSON() {
    this.type = "alloy_forgery:forging";
    this.inputs = [];
    this.output = {};
    this.min_forge_tier = 1;
    this.fuel_per_tick = 5;
    this.overrides = {};
}

AlloyForgingRecipeJSON.prototype = {
    /**
     * 添加输入
     * @param {string} input - 物品ID或标签ID（标签以#开头）
     * @param {number} count - 数量
     */
    addInput: function (input, count) {
        if (input.startsWith('#')) {
            this.inputs.push({ tag: input.substring(1), count: count || 1 });
        } else {
            this.inputs.push({ item: input, count: count || 1 });
        }
        return this;
    },

    /**
     * 设置输出
     * @param {string} item - 物品ID
     * @param {number} count - 数量
     */
    setOutput: function (item, count) {
        this.output = { item: item, count: count || 1 };
        return this;
    },

    /**
     * 设置最小锻造等级
     * @param {number} tier - 等级
     */
    setMinForgeTier: function (tier) {
        this.min_forge_tier = tier;
        return this;
    },

    /**
     * 设置每tick燃料消耗
     * @param {number} fuel - 燃料量
     */
    setFuelPerTick: function (fuel) {
        this.fuel_per_tick = fuel;
        return this;
    },

    /**
     * 添加覆盖配方（特定等级）
     * 比如达到等级后可烧制为其他物品
     * @param {string} tier - 等级
     * @param {string} item - 物品ID
     * @param {number} count - 数量
     */
    addOverride: function (tier, item, count) {
        this.overrides[tier] = { item: item, count: count };
        return this;
    }
};

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel);
    }

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('hazennstuff:hallowed_ingot')
            .addInput('irons_spellbooks:pyrium_ingot')
            .addInput('kubejs:ashes_of_calamity')
            .addInput('irons_spellbooks:mithril_ingot')
            .setOutput('kubejs:xelkive_ingot', 2)
            .setMinForgeTier(3)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:necroplasm')
            .addInput('irons_spellbooks:pyrium_ingot')
            .addInput('create:brass_ingot')
            .setOutput('kubejs:animated_steel_ingot', 2)
            .setMinForgeTier(2)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:animated_steel_ingot')
            .addInput('kubejs:viculeam_ingot')
            .setOutput('kubejs:aero_steel_ingot', 2)
            .setMinForgeTier(3)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:necroplasm')
            .addInput('kubejs:viculeam_ingot')
            .addInput('silentgems:chaos_essence')
            .addInput('minecraft:gold_ingot')
            .setOutput('hazennstuff:hallowed_ingot', 2)
            .setMinForgeTier(3)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:rhexis_ingot', 2)
            .addInput('kubejs:necroplasm')
            .addInput('kubejs:foul_flesh')
            .addInput('#minecraft:meat', 12)
            .setOutput('kubejs:starinium_ingot', 2)
            .setMinForgeTier(2)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:meat_ingots')
            .addInput('#minecraft:meat', 6)
            .addInput('kubejs:meat', 2)
            .setOutput('kubejs:rhexis_ingot', 2)
            .setMinForgeTier(2)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:rhexis_ingot')
            .addInput('irons_spellbooks:pyrium_ingot')
            .addInput('silentgear:crimson_steel_ingot')
            .addInput('ftboceanmobs:sludge_ball')
            .setOutput('kubejs:vorant_ingot', 2)
            .setMinForgeTier(3)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('alltheores:fluorite_dust', 8)
            .addInput('minecraft:diamond', 1)
            .addInput('iceandfire:sapphire_gem', 1)
            .addInput('malum:mnemonic_fragment', 4)
            .setOutput('kubejs:sapphire', 2)
            .setMinForgeTier(2)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:necroplasm', 2)
            .addInput('kubejs:viculeam_ingot', 1)
            .addInput('alltheores:fluorite', 6)
            .addInput('#c:gems', 6)
            .addInput('#silentgear:starlight_charger_catalysts')
            .setOutput('kubejs:ultranium_gem', 2)
            .setMinForgeTier(3)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('iceandfire:sapphire_gem', 2)
            .addInput('minecraft:amethyst_shard', 2)
            .addInput('minecraft:netherite_scrap', 1)
            .setOutput('kubejs:alexandrite', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:raw_netherite_ingot', 1)
            .addInput('kubejs:necroplasm', 3)
            .addInput('kubejs:soul_of_light', 3)
            .addInput('kubejs:soul_of_night', 3)
            .addInput('minecraft:netherite_scrap', 2)
            .setOutput('allthemodium:allthemodium_ingot', 2)
            .setMinForgeTier(2)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('allthemodium:allthemodium_ingot', 1)
            .addInput('silentgems:chaos_essence', 4)
            .addInput('netherexp:soul_magma_block', 2)
            .setOutput('allthemodium:vibranium_ingot', 2)
            .setMinForgeTier(3)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:ruinous_soul', 1)
            .addInput('allthemodium:vibranium_ingot', 1)
            .addInput('minecraft:chorus_fruit', 2)
            .setOutput('allthemodium:unobtainium_ingot', 2)
            .setMinForgeTier(3)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('alltheores:nickel_ingot', 1)
            .addInput('irons_spellbooks:arcane_essence', 6)
            .setOutput('kubejs:cobalt_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('create:brass_ingot', 1)
            .addInput('irons_spellbooks:lightning_bottle', 2)
            .setOutput('kubejs:acril_ingot', 2)
            .setMinForgeTier(2)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:diamond', 1)
            .addInput('minecraft:gold_ingot', 3)
            .setOutput('kubejs:enlighted_gold_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:copper_ingot', 1)
            .addInput('minecraft:gold_ingot', 1)
            .setOutput('kubejs:scepbo_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );


    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:blood_orb', 2)
            .addInput('minecraft:golden_apple', 1)
            .addInput('alltheores:aluminum_ingot', 1)
            .addInput('silentgear:diamond_shard', 3)
            .addOverride('3+', 'kubejs:terraulite_ingot', 4)
            .setOutput('kubejs:terraulite_ingot', 3)
            .setMinForgeTier(2)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('#c:gems/quartz', 1)
            .addInput('alltheores:steel_ingot', 1)
            .setOutput('kubejs:silicon_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('#c:dusts/redstone', 1)
            .addInput('minecraft:copper_ingot', 1)
            .addOverride('3+', 'kubejs:palladium_ingot', 3)
            .setOutput('kubejs:palladium_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:slime_ball', 1)
            .addInput('kubejs:uranium_ingot', 1)
            .addOverride('3+', 'kubejs:uranium_ingot', 3)
            .setOutput('kubejs:uranium_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:blaze_powder', 1)
            .addInput('minecraft:lapis_lazuli', 1)
            .addInput('alltheores:uranium_ingot', 1)
            .addOverride('3+', 'kubejs:thorium_ingot', 3)
            .setOutput('kubejs:thorium_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:amethyst_shard', 1)
            .addInput('alltheores:lead_ingot', 1)
            .addInput('minecraft:copper_ingot', 1)
            .addOverride('3+', 'kubejs:lead_ingot', 3)
            .setOutput('kubejs:lead_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('alltheores:steel_ingot', 1)
            .addInput('minecraft:amethyst_shard', 1)
            .addOverride('3+', 'kubejs:steel_ingot', 3)
            .setOutput('kubejs:steel_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:lapis_lazuli', 1)
            .addInput('minecraft:iron_ingot', 1)
            .addInput('minecraft:redstone', 1)
            .addOverride('3+', 'kubejs:magnetite_ingot', 3)
            .setOutput('kubejs:magnetite_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('alltheores:uranium_ingot', 1)
            .addInput('alltheores:nickel_ingot', 1)
            .addInput('alltheores:fluorite', 2)
            .addOverride('3+', 'kubejs:rhodium_ingot', 3)
            .setOutput('kubejs:rhodium_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('create:zinc_ingot', 1)
            .addInput('alltheores:fluorite', 2)
            .addOverride('3+', 'kubejs:scandium_ingot', 3)
            .setOutput('kubejs:scandium_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('irons_spellbooks:blood_vial', 1)
            .addInput('alltheores:steel_ingot', 1)
            .addInput('kubejs:blood_orb', 2)
            .addOverride('3+', 'kubejs:vibranite_ingot', 3)
            .setOutput('kubejs:vibranite_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('irons_spellbooks:mithril_ingot', 1)
            .addInput('minecraft:netherite_scrap', 2)
            .addInput('kubejs:viculeam_ingot', 1)
            .addInput('malum:soul_stained_steel_ingot', 1)
            .addOverride('3+', 'kubejs:ultimate_ingot', 3)
            .setOutput('kubejs:ultimate_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('alltheores:platinum_ingot', 1)
            .addInput('alltheores:uranium_ingot', 1)
            .addOverride('3+', 'alltheores:iridium_ingot', 3)
            .setOutput('alltheores:iridium_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('alltheores:fluorite', 1)
            .addInput('minecraft:iron_ingot', 1)
            .addOverride('3+', 'alltheores:osmium_ingot', 3)
            .setOutput('alltheores:osmium_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:redstone', 1)
            .addInput('iceandfire:silver_ingot', 1)
            .addOverride('3+', 'alltheores:signalum_ingot', 3)
            .setOutput('alltheores:signalum_ingot', 2)
            .setMinForgeTier(1)
            .setFuelPerTick(5)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:viculeam_ingot', 1)
            .addInput('iceandfire:fire_dragon_blood', 3)
            .setOutput('iceandfire:dragonsteel_fire_ingot', 1)
            .setMinForgeTier(3)
            .setFuelPerTick(20)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:viculeam_ingot', 1)
            .addInput('iceandfire:lightning_dragon_blood', 3)
            .setOutput('iceandfire:dragonsteel_lightning_ingot', 1)
            .setMinForgeTier(3)
            .setFuelPerTick(20)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:viculeam_ingot', 1)
            .addInput('iceandfire:ice_dragon_blood', 3)
            .setOutput('iceandfire:dragonsteel_ice_ingot', 1)
            .setMinForgeTier(3)
            .setFuelPerTick(20)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:glass_bottle', 1)
            .addInput('#iceandfire:scales/dragon/lightning', 3)
            .setOutput('iceandfire:lightning_dragon_blood', 1)
            .setMinForgeTier(3)
            .setFuelPerTick(20)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:glass_bottle', 1)
            .addInput('#iceandfire:scales/dragon/ice', 3)
            .setOutput('iceandfire:ice_dragon_blood', 1)
            .setMinForgeTier(3)
            .setFuelPerTick(20)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:glass_bottle', 1)
            .addInput('#iceandfire:scales/dragon/fire', 3)
            .setOutput('iceandfire:fire_dragon_blood', 1)
            .setMinForgeTier(3)
            .setFuelPerTick(20)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('kubejs:necroplasm', 1)
            .addInput('iceandfire:dragonbone', 1)
            .setOutput('iceandfire:dragonbone', 6)
            .setMinForgeTier(3)
            .setFuelPerTick(20)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:sculk_catalyst', 3)
            .addInput('minecraft:sculk', 3)
            .addInput('kubejs:necroplasm', 1)
            .setOutput('kubejs:echo_ingot', 2)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:glowstone', 2)
            .addInput('eternal_starlight:golem_steel_ingot', 2)
            .setOutput('kubejs:nlatstone_ingot', 2)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('eternal_starlight:deepsilver_ingot', 2)
            .addInput('eternal_starlight:aethersent_ingot', 2)
            .setOutput('kubejs:starlight_mythril_ingot', 2)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('#minecraft:fishes', 2)
            .addInput('minecraft:iron_ingot', 1)
            .setOutput('kubejs:zapolgium_ingot', 2)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('iceandfire:silver_ingot', 1)
            .addInput('silentgear:diamond_shard', 3)
            .addInput('minecraft:iron_ingot', 1)
            .setOutput('kubejs:tungsten_ingot', 2)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:iron_ingot', 3)
            .addInput('minecraft:heart_of_the_sea', 1)
            .setOutput('kubejs:boron_ingot', 2)
            .addOverride('3+', 'kubejs:boron_ingot', 3)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('minecraft:netherrack', 8)
            .addInput('minecraft:quartz', 1)
            .addInput('irons_spellbooks:arcane_essence', 2)
            .setOutput('kubejs:thulium_ingot', 2)
            .addOverride('3+', 'kubejs:thulium_ingot', 3)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('eternal_starlight:deepsilver_ingot', 1)
            .addInput('#minecraft:small_flowers', 2)
            .setOutput('kubejs:aluminum_ingot', 2)
            .addOverride('3+', 'kubejs:aluminum_ingot', 3)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('alltheores:steel_ingot', 2)
            .addInput('minecraft:netherite_scrap', 2)
            .setOutput('kubejs:zirconium_ingot', 3)
            .addOverride('3+', 'kubejs:zirconium_ingot', 4)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('alltheores:steel_ingot', 1)
            .addInput('minecraft:flint', 4)
            .setOutput('kubejs:frigidite_ingot', 2)
            .addOverride('3+', 'kubejs:frigidite_ingot', 3)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('create:zinc_ingot', 1)
            .addInput('alltheores:uranium_ingot', 1)
            .setOutput('kubejs:polonium_ingot', 2)
            .addOverride('3+', 'kubejs:polonium_ingot', 3)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );

    registerCustomRecipe(
        new AlloyForgingRecipeJSON()
            .addInput('create:zinc_ingot', 1)
            .addInput('minecraft:copper_ingot', 1)
            .setOutput('create:brass_ingot', 2)
            .addOverride('3+', 'create:brass_ingot', 3)
            .setMinForgeTier(2)
            .setFuelPerTick(10)
    );
});