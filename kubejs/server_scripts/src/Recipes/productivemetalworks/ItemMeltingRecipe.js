/**
 * 物品熔化配方
 * @param {string|Object} ingredient - 输入物品（物品ID/标签对象）
 * @param {number} minTemp - 最低熔化温度
 * @param {number} maxTemp - 最高温度 (0表示无限制)
 * @param {Object} result - 输出流体
 */
function ItemMeltingRecipe(ingredient, minTemp, maxTemp, result) {
    this.type = "productivemetalworks:item_melting";

    if (typeof ingredient === 'string') {
        this.ingredient = { item: ingredient };
    } else {
        this.ingredient = ingredient;
    }

    this.maximum_temperature = maxTemp;
    this.minimum_temperature = minTemp;
    this.result = [{
        amount: result.amount,
        id: result.id
    }];
}

// 物品熔化配方原型方法
ItemMeltingRecipe.prototype = {
    /**
     * 设置温度范围
     * @param {number} minTemp - 最低温度
     * @param {number} maxTemp - 最高温度
     */
    setTemperature: function (minTemp, maxTemp) {
        this.minimum_temperature = minTemp;
        this.maximum_temperature = maxTemp;
        return this;
    },

    /**
     * 设置输出流体
     * @param {string} fluidId - 流体ID
     * @param {number} amount - 流体量
     */
    setResult: function (fluidId, amount) {
        this.result = [{
            amount: amount,
            id: fluidId
        }];
        return this;
    }
};

ServerEvents.recipes(event => {
    const register = recipe => {
        const json = JSON.parse(JSON.stringify(recipe));
        event.custom(json);
    };
    register(new ItemMeltingRecipe("kubejs:celeslar_ingot", 1000, 0, {}).setResult("kubejs:celeslar", 90));
    register(new ItemMeltingRecipe("kubejs:chalyblux_ingot", 1000, 0, {}).setResult("kubejs:chalyblux", 90));
    register(new ItemMeltingRecipe("kubejs:cobalt_ingot", 1000, 0, {}).setResult("kubejs:cobalt", 90));
    register(new ItemMeltingRecipe("kubejs:cosmos_aurora_ingot", 1000, 0, {}).setResult("kubejs:cosmos_aurora", 90));
    register(new ItemMeltingRecipe("kubejs:dark_cryopla_ingot", 1000, 0, {}).setResult("kubejs:dark_cryopla", 90));
    register(new ItemMeltingRecipe("kubejs:echo_ingot", 1000, 0, {}).setResult("kubejs:echo", 90));
    register(new ItemMeltingRecipe("kubejs:electrum_ingot", 1000, 0, {}).setResult("kubejs:electrum", 90));
    register(new ItemMeltingRecipe("kubejs:enlighted_gold_ingot", 1000, 0, {}).setResult("kubejs:enlighted_gold", 90));
    register(new ItemMeltingRecipe("kubejs:estalt_ingot", 1000, 0, {}).setResult("kubejs:estalt", 90));
    register(new ItemMeltingRecipe("kubejs:europium_ingot", 1000, 0, {}).setResult("kubejs:europium", 90));
    register(new ItemMeltingRecipe("kubejs:frigidite_ingot", 1000, 0, {}).setResult("kubejs:frigidite", 90));
    register(new ItemMeltingRecipe("kubejs:invar_ingot", 1000, 0, {}).setResult("kubejs:invar", 90));
    register(new ItemMeltingRecipe("kubejs:isovol_ingot", 1000, 0, {}).setResult("kubejs:isovol", 90));
    register(new ItemMeltingRecipe("kubejs:lead_ingot", 1000, 0, {}).setResult("kubejs:lead", 90));
    register(new ItemMeltingRecipe("kubejs:lunium_nova_ingot", 1000, 0, {}).setResult("kubejs:lunium_nova", 90));
    register(new ItemMeltingRecipe("kubejs:luteous_ingot", 1000, 0, {}).setResult("kubejs:luteous", 90));
    register(new ItemMeltingRecipe("kubejs:magmanite_ingot", 1000, 0, {}).setResult("kubejs:magmanite", 90));
    register(new ItemMeltingRecipe("kubejs:magnetite_ingot", 1000, 0, {}).setResult("kubejs:magnetite", 90));
    register(new ItemMeltingRecipe("kubejs:midnight_abyssal_ingot", 1000, 0, {}).setResult("kubejs:midnight_abyssal", 90));
    register(new ItemMeltingRecipe("kubejs:mythril_ingot", 1000, 0, {}).setResult("kubejs:mythril", 90));
    register(new ItemMeltingRecipe("kubejs:neptunium_ingot", 1000, 0, {}).setResult("kubejs:neptunium", 90));
    register(new ItemMeltingRecipe("kubejs:nickel_ingot", 1000, 0, {}).setResult("kubejs:nickel", 90));
    register(new ItemMeltingRecipe("kubejs:nlatstone_ingot", 1000, 0, {}).setResult("kubejs:nlatstone", 90));
    register(new ItemMeltingRecipe("kubejs:osmium_ingot", 1000, 0, {}).setResult("kubejs:osmium", 90));
    register(new ItemMeltingRecipe("kubejs:palladium_ingot", 1000, 0, {}).setResult("kubejs:palladium", 90));
    register(new ItemMeltingRecipe("kubejs:platinum_ingot", 1000, 0, {}).setResult("kubejs:platinum", 90));
    register(new ItemMeltingRecipe("kubejs:plumbumanite_ingot", 1000, 0, {}).setResult("kubejs:plumbumanite", 90));
    register(new ItemMeltingRecipe("kubejs:plutonium_ingot", 1000, 0, {}).setResult("kubejs:plutonium", 90));
    register(new ItemMeltingRecipe("kubejs:polonium_ingot", 1000, 0, {}).setResult("kubejs:polonium", 90));
    register(new ItemMeltingRecipe("kubejs:rhexis_ingot", 1000, 0, {}).setResult("kubejs:rhexis", 90));
    register(new ItemMeltingRecipe("kubejs:rhodium_ingot", 1000, 0, {}).setResult("kubejs:rhodium", 90));
    register(new ItemMeltingRecipe("kubejs:scandium_ingot", 1000, 0, {}).setResult("kubejs:scandium", 90));
    register(new ItemMeltingRecipe("kubejs:scepbo_ingot", 1000, 0, {}).setResult("kubejs:scepbo", 90));
    register(new ItemMeltingRecipe("kubejs:silicon_ingot", 1000, 0, {}).setResult("kubejs:silicon", 90));
    register(new ItemMeltingRecipe("kubejs:silver_ingot", 1000, 0, {}).setResult("kubejs:silver", 90));
    register(new ItemMeltingRecipe("kubejs:solimrith_ingot", 1000, 0, {}).setResult("kubejs:solimrith", 90));
    register(new ItemMeltingRecipe("kubejs:starinium_ingot", 1000, 0, {}).setResult("kubejs:starinium", 90));
    register(new ItemMeltingRecipe("kubejs:starlight_mythril_ingot", 1000, 0, {}).setResult("kubejs:starlight_mythril", 90));
    register(new ItemMeltingRecipe("kubejs:steel_ingot", 1000, 0, {}).setResult("kubejs:steel", 90));
    register(new ItemMeltingRecipe("kubejs:stellar_ingot", 1000, 0, {}).setResult("kubejs:stellar", 90));
    register(new ItemMeltingRecipe("kubejs:thlanium_ingot", 1000, 0, {}).setResult("kubejs:thlanium", 90));
    register(new ItemMeltingRecipe("kubejs:thorium_ingot", 1000, 0, {}).setResult("kubejs:thorium", 90));
    register(new ItemMeltingRecipe("kubejs:titanium_ingot", 1000, 0, {}).setResult("kubejs:titanium", 90));
    register(new ItemMeltingRecipe("kubejs:ultimate_ingot", 1000, 0, {}).setResult("kubejs:ultimate", 90));
    register(new ItemMeltingRecipe("kubejs:lustful_haze_alloy", 1000, 0, {}).setResult("kubejs:lustful_haze_alloy", 90));
    register(new ItemMeltingRecipe("kubejs:unstable_luminescence_ingot", 1000, 0, {}).setResult("kubejs:unstable_luminescence", 90));
    register(new ItemMeltingRecipe("kubejs:uranium_ingot", 1000, 0, {}).setResult("kubejs:uranium", 90));
    register(new ItemMeltingRecipe("kubejs:vibranite_ingot", 1000, 0, {}).setResult("kubejs:vibranite", 90));
    register(new ItemMeltingRecipe("kubejs:viculeam_ingot", 1000, 0, {}).setResult("kubejs:viculeam", 90));
    register(new ItemMeltingRecipe("kubejs:void_ingot", 1000, 0, {}).setResult("kubejs:void", 90));
    register(new ItemMeltingRecipe("kubejs:vorant_ingot", 1000, 0, {}).setResult("kubejs:vorant", 90));
    register(new ItemMeltingRecipe("kubejs:xelkive_ingot", 1000, 0, {}).setResult("kubejs:xelkive", 90));
    register(new ItemMeltingRecipe("kubejs:xeproda_ingot", 1000, 0, {}).setResult("kubejs:xeproda", 90));
    register(new ItemMeltingRecipe("kubejs:yttrium_ingot", 1000, 0, {}).setResult("kubejs:yttrium", 90));
    register(new ItemMeltingRecipe("kubejs:zapolgium_ingot", 1000, 0, {}).setResult("kubejs:zapolgium", 90));
    register(new ItemMeltingRecipe("kubejs:zinc_ingot", 1000, 0, {}).setResult("kubejs:zinc", 90));
    register(new ItemMeltingRecipe("gobber2:gobber2_ingot", 1000, 0, {}).setResult("kubejs:gobber2", 90));
    register(new ItemMeltingRecipe("gobber2:gobber2_ingot_nether", 1000, 0, {}).setResult("kubejs:gobber2_nether", 90));
    register(new ItemMeltingRecipe("gobber2:gobber2_ingot_end", 1000, 0, {}).setResult("kubejs:gobber2_end", 90));
    register(new ItemMeltingRecipe("kubejs:achroous_ingot", 1000, 0, {}).setResult("kubejs:achroous", 90));
    register(new ItemMeltingRecipe("kubejs:acril_ingot", 1000, 0, {}).setResult("kubejs:acril", 90));
    register(new ItemMeltingRecipe("kubejs:terraulite_ingot", 1000, 0, {}).setResult("kubejs:terraulite", 90));
    register(new ItemMeltingRecipe("kubejs:tungsten_ingot", 1000, 0, {}).setResult("kubejs:tungsten", 90));
    register(new ItemMeltingRecipe("kubejs:thulium_ingot", 1000, 0, {}).setResult("kubejs:thulium", 90));
    register(new ItemMeltingRecipe("kubejs:tellurium_ingot", 1000, 0, {}).setResult("kubejs:tellurium", 90));
    register(new ItemMeltingRecipe("kubejs:adamanite_ingot", 1000, 0, {}).setResult("kubejs:adamanite", 90));
    register(new ItemMeltingRecipe("kubejs:aluminum_ingot", 1000, 0, {}).setResult("kubejs:aluminum", 90));
    register(new ItemMeltingRecipe("kubejs:boron_ingot", 1000, 0, {}).setResult("kubejs:boron", 90));
    register(new ItemMeltingRecipe("kubejs:brass_ingot", 1000, 0, {}).setResult("kubejs:brass", 90));
    register(new ItemMeltingRecipe("kubejs:bronze_ingot", 1000, 0, {}).setResult("kubejs:bronze", 90));
    register(new ItemMeltingRecipe("kubejs:strontium_ingot", 1000, 0, {}).setResult("kubejs:strontium", 90));
    register(new ItemMeltingRecipe("kubejs:tin_ingot", 1000, 0, {}).setResult("kubejs:tin", 90));
    register(new ItemMeltingRecipe("gobber2:gobber2_foo", 1000, 0, {}).setResult("kubejs:gobber2_foo", 90));
    register(new ItemMeltingRecipe("gobber2:gobber2_foo_nether", 2000, 0, {}).setResult("kubejs:gobber2_foo_nether", 90));
    register(new ItemMeltingRecipe("gobber2:gobber2_foo_end", 4000, 0, {}).setResult("kubejs:gobber2_foo_end", 90));
    register(new ItemMeltingRecipe("minecraft:golden_apple", 100, 0, {}).setResult("kubejs:golden_apple", 45));
    register(new ItemMeltingRecipe("kubejs:aero_steel_ingot", 2000, 0, {}).setResult("kubejs:aero_steel", 90));
    register(new ItemMeltingRecipe("kubejs:animated_steel_ingot", 2000, 0, {}).setResult("kubejs:animated_steel", 90));
    register(new ItemMeltingRecipe("kubejs:berkelium_ingot", 1000, 0, {}).setResult("kubejs:berkelium", 90));
    register(new ItemMeltingRecipe("kubejs:zirconium_ingot", 1000, 0, {}).setResult("kubejs:zirconium", 90));
    register(new ItemMeltingRecipe("alltheores:fluorite", 1000, 0, {}).setResult("kubejs:fluorite", 90));
    register(new ItemMeltingRecipe("kubejs:blood_orb", 1000, 0, {}).setResult("kubejs:blood_orb", 30));
    register(new ItemMeltingRecipe("kubejs:tellurium_nugget", 1000, 0, {}).setResult("kubejs:tellurium", 10));
    register(new ItemMeltingRecipe("kubejs:europium_nugget", 1000, 0, {}).setResult("kubejs:europium", 10));
    register(new ItemMeltingRecipe("kubejs:titanium_nugget", 1000, 0, {}).setResult("kubejs:titanium", 10));
    register(new ItemMeltingRecipe("malum:soul_stained_steel_ingot", 1000, 0, {}).setResult("kubejs:soul_stained_steel", 90));
    register(new ItemMeltingRecipe("malum:soul_stained_steel_plating", 1000, 0, {}).setResult("kubejs:soul_stained_steel", 130));
    register(new ItemMeltingRecipe("malum:soul_stained_steel_nugget", 1000, 0, {}).setResult("kubejs:soul_stained_steel", 10));
    register(new ItemMeltingRecipe("malum:block_of_soul_stained_steel", 1000, 0, {}).setResult("kubejs:soul_stained_steel", 810));
    register(new ItemMeltingRecipe("irons_spellbooks:mithril_ingot", 1000, 0, {}).setResult("kubejs:mithril", 90));

});