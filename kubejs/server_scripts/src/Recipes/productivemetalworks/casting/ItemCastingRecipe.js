/**
 * 物品铸造配方构造函数
 * @param {string} cast - 铸造型具
 * @param {string} fluid - 输入流体ID
 * @param {number} fluidAmount - 流体量
 * @param {string} result - 输出物品ID
 * @param {number} resultCount - 输出数量
 * @param {boolean} consumeCast 
 */
function ItemCastingRecipe(cast, fluid, fluidAmount, result, resultCount, consumeCast) {
  this.type = "productivemetalworks:item_casting";
  this.cast = {
    "item": cast
  };
  this.consume_cast = consumeCast || false;

  if (typeof fluid === 'string') {
    if (fluid.startsWith('#')) {
      this.fluid = {
        "amount": fluidAmount,
        "tag": fluid.substring(1)
      };
    } else {
      this.fluid = {
        "amount": fluidAmount,
        "fluid": fluid
      };
    }
  } else if (typeof fluid === 'object' && fluid.tag) {
    this.fluid = {
      "amount": fluidAmount,
      "tag": fluid.tag
    };
  } else {
    this.fluid = {
      "amount": fluidAmount,
      "fluid": fluid
    };
  }

  this.result = {
    "count": resultCount || 1,
    "id": result
  };
}

// 物品铸造配方原型方法
ItemCastingRecipe.prototype = {
  /**
   * 设置流体
   * @param {string} fluidId - 流体ID
   * @param {number} amount - 流体量
   */
  setFluid: function (fluidId, amount) {
    this.fluid = {
      "amount": amount,
      "fluid": fluidId
    };
    return this;
  },

  /**
   * 设置输出物品
   * @param {string} itemId - 物品ID
   * @param {number} count - 数量
   */
  setResult: function (itemId, count) {
    this.result = {
      "count": count || 1,
      "id": itemId
    };
    return this;
  },

  /**
   * 设置是否消耗铸造型具
   * @param {boolean} consume - 是否消耗
   */
  setConsumeCast: function (consume) {
    this.consume_cast = consume;
    return this;
  }
};

/*
* 用于制作材料配方(流体铸造成锭)
*/
ServerEvents.recipes(event => {
  const register = recipe => {
    const json = JSON.parse(JSON.stringify(recipe));
    event.custom(json);
  };

  // 所有铸造配方
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:celeslar", 90, "kubejs:celeslar_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:chalyblux", 90, "kubejs:chalyblux_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:cobalt", 90, "kubejs:cobalt_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:cosmos_aurora", 90, "kubejs:cosmos_aurora_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:dark_cryopla", 90, "kubejs:dark_cryopla_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:echo", 90, "kubejs:echo_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:electrum", 90, "kubejs:electrum_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:enlighted_gold", 90, "kubejs:enlighted_gold_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:estalt", 90, "kubejs:estalt_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:europium", 90, "kubejs:europium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:frigidite", 90, "kubejs:frigidite_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:invar", 90, "kubejs:invar_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:isovol", 90, "kubejs:isovol_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:lead", 90, "kubejs:lead_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:lunium_nova", 90, "kubejs:lunium_nova_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:luteous", 90, "kubejs:luteous_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:magmanite", 90, "kubejs:magmanite_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:magnetite", 90, "kubejs:magnetite_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:midnight_abyssal", 90, "kubejs:midnight_abyssal_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:mythril", 90, "kubejs:mythril_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:neptunium", 90, "kubejs:neptunium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:nickel", 90, "kubejs:nickel_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:nlatstone", 90, "kubejs:nlatstone_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:osmium", 90, "kubejs:osmium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:palladium", 90, "kubejs:palladium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:platinum", 90, "kubejs:platinum_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:plumbumanite", 90, "kubejs:plumbumanite_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:plutonium", 90, "kubejs:plutonium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:polonium", 90, "kubejs:polonium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:rhexis", 90, "kubejs:rhexis_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:rhodium", 90, "kubejs:rhodium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:scandium", 90, "kubejs:scandium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:scepbo", 90, "kubejs:scepbo_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:silicon", 90, "kubejs:silicon_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:silver", 90, "kubejs:silver_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:solimrith", 90, "kubejs:solimrith_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:starinium", 90, "kubejs:starinium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:starlight_mythril", 90, "kubejs:starlight_mythril_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:steel", 90, "kubejs:steel_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:stellar", 90, "kubejs:stellar_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:thlanium", 90, "kubejs:thlanium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:thorium", 90, "kubejs:thorium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:titanium", 90, "kubejs:titanium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:ultimate", 90, "kubejs:ultimate_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:lustful_haze_alloy", 90, "kubejs:lustful_haze_alloy", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:unstable_luminescence", 90, "kubejs:unstable_luminescence_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:uranium", 90, "kubejs:uranium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:vibranite", 90, "kubejs:vibranite_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:viculeam", 90, "kubejs:viculeam_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:void", 90, "kubejs:void_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:vorant", 90, "kubejs:vorant_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:xelkive", 90, "kubejs:xelkive_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:xeproda", 90, "kubejs:xeproda_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:yttrium", 90, "kubejs:yttrium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:zapolgium", 90, "kubejs:zapolgium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:zinc", 90, "kubejs:zinc_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:gobber2", 90, "gobber2:gobber2_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:gobber2_nether", 90, "gobber2:gobber2_ingot_nether", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:gobber2_end", 90, "gobber2:gobber2_ingot_end", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:achroous", 90, "kubejs:achroous_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:acril", 90, "kubejs:acril_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:terraulite", 90, "kubejs:terraulite_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:tungsten", 90, "kubejs:tungsten_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:thulium", 90, "kubejs:thulium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:tellurium", 90, "kubejs:tellurium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:adamanite", 90, "kubejs:adamanite_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:aluminum", 90, "kubejs:aluminum_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:boron", 90, "kubejs:boron_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:brass", 90, "kubejs:brass_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:bronze", 90, "kubejs:bronze_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:strontium", 90, "kubejs:strontium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:tin", 90, "kubejs:tin_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:gem_cast", "kubejs:fluorite", 90, "alltheores:fluorite", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:aero_steel", 90, "kubejs:aero_steel_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:animated_steel", 90, "kubejs:animated_steel_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:berkelium", 90, "kubejs:berkelium_ingot", 1, false));
  register(new ItemCastingRecipe("productivemetalworks:ingot_cast", "kubejs:zirconium", 90, "kubejs:zirconium_ingot", 1, true));
  register(new ItemCastingRecipe("minecraft:coal", "kubejs:gobber2_foo", 90, "gobber2:gobber2_foo", 1, true));
  register(new ItemCastingRecipe("minecraft:coal", "kubejs:gobber2_foo_nether", 90, "gobber2:gobber2_foo_nether", 1, true));
  register(new ItemCastingRecipe("minecraft:coal", "kubejs:gobber2_foo_end", 90, "gobber2:gobber2_foo_end", 1, true));
  register(new ItemCastingRecipe("minecraft:string", "productivemetalworks:molten_steel", 90, 'productivemetalworks:gear_cast', 1, false));
  register(new ItemCastingRecipe('minecraft:iron_trapdoor', "productivemetalworks:molten_steel", 360, 'productivemetalworks:plate_cast', 1, false));
  register(new ItemCastingRecipe('minecraft:quartz', "#c:molten_gold", 90, 'productivelib:upgrade_base', 1, true));
  register(new ItemCastingRecipe('productivelib:upgrade_time', "productivemetalworks:molten_ender", 90, 'productivelib:upgrade_time_2', 1, true));
  register(new ItemCastingRecipe('productivelib:upgrade_base', "#c:molten_iron", 90, 'productivelib:upgrade_stability', 1, true));

});
