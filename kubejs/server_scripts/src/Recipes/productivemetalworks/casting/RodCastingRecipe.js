function RodCastingRecipe(fluid, rod) {
  this.type = "productivemetalworks:item_casting";
  this.cast = {
    "item": "productivemetalworks:rod_cast"
  };
  this.consume_cast = false;
  this.fluid = {
    "amount": 45,
    "fluid": fluid
  };
  this.result = {
    "count": 1,
    "id": rod
  };
}

ServerEvents.recipes(event => {
  const register = recipe => {
    const json = JSON.parse(JSON.stringify(recipe));
    event.custom(json);
  };

  register(new RodCastingRecipe("kubejs:zirconium", "kubejs:zirconium_rod"));
  register(new RodCastingRecipe("kubejs:echo", "kubejs:echo_rod"));
  register(new RodCastingRecipe("kubejs:celeslar", "kubejs:celeslar_rod"));
  register(new RodCastingRecipe("kubejs:chalyblux", "kubejs:chalyblux_rod"));
  register(new RodCastingRecipe("kubejs:cobalt", "kubejs:cobalt_rod"));
  register(new RodCastingRecipe("kubejs:cosmos_aurora", "kubejs:cosmos_aurora_rod"));
  register(new RodCastingRecipe("kubejs:dark_cryopla", "kubejs:dark_cryopla_rod"));
  register(new RodCastingRecipe("kubejs:echo", "kubejs:echo_rod"));
  register(new RodCastingRecipe("kubejs:electrum", "kubejs:electrum_rod"));
  register(new RodCastingRecipe("kubejs:estalt", "kubejs:estalt_rod"));
  register(new RodCastingRecipe("kubejs:europium", "kubejs:europium_rod"));
  register(new RodCastingRecipe("kubejs:frigidite", "kubejs:frigidite_rod"));
  register(new RodCastingRecipe("kubejs:invar", "kubejs:invar_rod"));
  register(new RodCastingRecipe("kubejs:lead", "kubejs:lead_rod"));
  register(new RodCastingRecipe("kubejs:lunium_nova", "kubejs:lunium_nova_rod"));
  register(new RodCastingRecipe("kubejs:midnight_abyssal", "kubejs:midnight_abyssal_rod"));
  register(new RodCastingRecipe("kubejs:mythril", "kubejs:mythril_rod"));
  register(new RodCastingRecipe("kubejs:nickel", "kubejs:nickel_rod"));
  register(new RodCastingRecipe("kubejs:nlatstone", "kubejs:nlatstone_rod"));
  register(new RodCastingRecipe("kubejs:osmium", "kubejs:osmium_rod"));
  register(new RodCastingRecipe("kubejs:palladium", "kubejs:palladium_rod"));
  register(new RodCastingRecipe("kubejs:platinum", "kubejs:platinum_rod"));
  register(new RodCastingRecipe("kubejs:plumbumanite", "kubejs:plumbumanite_rod"));
  register(new RodCastingRecipe("kubejs:rhodium", "kubejs:rhodium_rod"));
  register(new RodCastingRecipe("kubejs:scandium", "kubejs:scandium_rod"));
  register(new RodCastingRecipe("kubejs:silicon", "kubejs:silicon_rod"));
  register(new RodCastingRecipe("kubejs:silver", "kubejs:silver_rod"));
  register(new RodCastingRecipe("kubejs:solimrith", "kubejs:solimrith_rod"));
  register(new RodCastingRecipe("kubejs:starlight_mythril", "kubejs:starlight_mythril_rod"));
  register(new RodCastingRecipe("kubejs:steel", "kubejs:steel_rod"));
  register(new RodCastingRecipe("kubejs:stellar", "kubejs:stellar_rod"));
  register(new RodCastingRecipe("kubejs:thlanium", "kubejs:thlanium_rod"));
  register(new RodCastingRecipe("kubejs:thorium", "kubejs:thorium_rod"));
  register(new RodCastingRecipe("kubejs:titanium", "kubejs:titanium_rod"));
  register(new RodCastingRecipe("kubejs:uranium", "kubejs:uranium_rod"));
  register(new RodCastingRecipe("kubejs:vibranite", "kubejs:vibranite_rod"));
  register(new RodCastingRecipe("kubejs:viculeam", "kubejs:viculeam_rod"));
  register(new RodCastingRecipe("kubejs:void", "kubejs:void_rod"));
  register(new RodCastingRecipe("kubejs:xelkive", "kubejs:xelkive_rod"));
  register(new RodCastingRecipe("kubejs:xeproda", "kubejs:xeproda_rod"));
  register(new RodCastingRecipe("kubejs:yttrium", "kubejs:yttrium_rod"));
  register(new RodCastingRecipe("kubejs:zapolgium", "kubejs:zapolgium_rod"));
  register(new RodCastingRecipe("kubejs:zinc", "kubejs:zinc_rod"));
  register(new RodCastingRecipe("kubejs:gobber2", "gobber2:gobber2_rod"));
  register(new RodCastingRecipe("kubejs:gobber2_nether", "gobber2:gobber2_rod_nether"));
  register(new RodCastingRecipe("kubejs:gobber2_end", "gobber2:gobber2_rod_end"));
  register(new RodCastingRecipe("kubejs:tungsten", "kubejs:tungsten_rod"));
  register(new RodCastingRecipe("kubejs:thulium", "kubejs:thulium_rod"));
  register(new RodCastingRecipe("kubejs:tellurium", "kubejs:tellurium_rod"));
  register(new RodCastingRecipe("kubejs:acril", "kubejs:acril_rod"));
  register(new RodCastingRecipe("kubejs:adamanite", "kubejs:adamanite_rod"));
  register(new RodCastingRecipe("kubejs:aluminum", "kubejs:aluminum_rod"));
  register(new RodCastingRecipe("kubejs:boron", "kubejs:boron_rod"));
  register(new RodCastingRecipe("kubejs:brass", "kubejs:brass_rod"));
  register(new RodCastingRecipe("kubejs:bronze", "kubejs:bronze_rod"));
  register(new RodCastingRecipe("kubejs:tin", "kubejs:tin_rod"));
  register(new RodCastingRecipe("kubejs:abiding_alloy", "kubejs:abiding_alloy_rod"));
});