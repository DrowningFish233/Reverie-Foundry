function PlateCastingRecipe(fluid, plate) {
  this.type = "productivemetalworks:item_casting";
  this.cast = {
    "item": "productivemetalworks:plate_cast"
  };
  this.consume_cast = false;
  this.fluid = {
    "amount": 90,
    "fluid": fluid
  };
  this.result = {
    "count": 1,
    "id": plate
  };
}

ServerEvents.recipes(event => {
  const register = recipe => {
    const json = JSON.parse(JSON.stringify(recipe));
    event.custom(json);
  };

  register(new PlateCastingRecipe("kubejs:zirconium", "kubejs:zirconium_plate"));
  register(new PlateCastingRecipe("kubejs:celeslar", "kubejs:celeslar_plate"));
  register(new PlateCastingRecipe("kubejs:chalyblux", "kubejs:chalyblux_plate"));
  register(new PlateCastingRecipe("kubejs:cobalt", "kubejs:cobalt_plate"));
  register(new PlateCastingRecipe("kubejs:cosmos_aurora", "kubejs:cosmos_aurora_plate"));
  register(new PlateCastingRecipe("kubejs:dark_cryopla", "kubejs:dark_cryopla_plate"));
  register(new PlateCastingRecipe("kubejs:echo", "kubejs:echo_plate"));
  register(new PlateCastingRecipe("kubejs:electrum", "kubejs:electrum_plate"));
  register(new PlateCastingRecipe("kubejs:estalt", "kubejs:estalt_plate"));
  register(new PlateCastingRecipe("kubejs:europium", "kubejs:europium_plate"));
  register(new PlateCastingRecipe("kubejs:frigidite", "kubejs:frigidite_plate"));
  register(new PlateCastingRecipe("kubejs:invar", "kubejs:invar_plate"));
  register(new PlateCastingRecipe("kubejs:lead", "kubejs:lead_plate"));
  register(new PlateCastingRecipe("kubejs:lunium_nova", "kubejs:lunium_nova_plate"));
  register(new PlateCastingRecipe("kubejs:midnight_abyssal", "kubejs:midnight_abyssal_plate"));
  register(new PlateCastingRecipe("kubejs:mythril", "kubejs:mythril_plate"));
  register(new PlateCastingRecipe("kubejs:nickel", "kubejs:nickel_plate"));
  register(new PlateCastingRecipe("kubejs:nlatstone", "kubejs:nlatstone_plate"));
  register(new PlateCastingRecipe("kubejs:osmium", "kubejs:osmium_plate"));
  register(new PlateCastingRecipe("kubejs:palladium", "kubejs:palladium_plate"));
  register(new PlateCastingRecipe("kubejs:platinum", "kubejs:platinum_plate"));
  register(new PlateCastingRecipe("kubejs:plumbumanite", "kubejs:plumbumanite_plate"));
  register(new PlateCastingRecipe("kubejs:rhodium", "kubejs:rhodium_plate"));
  register(new PlateCastingRecipe("kubejs:scandium", "kubejs:scandium_plate"));
  register(new PlateCastingRecipe("kubejs:silicon", "kubejs:silicon_plate"));
  register(new PlateCastingRecipe("kubejs:silver", "kubejs:silver_plate"));
  register(new PlateCastingRecipe("kubejs:solimrith", "kubejs:solimrith_plate"));
  register(new PlateCastingRecipe("kubejs:starlight_mythril", "kubejs:starlight_mythril_plate"));
  register(new PlateCastingRecipe("kubejs:steel", "kubejs:steel_plate"));
  register(new PlateCastingRecipe("kubejs:stellar", "kubejs:stellar_plate"));
  register(new PlateCastingRecipe("kubejs:thlanium", "kubejs:thlanium_plate"));
  register(new PlateCastingRecipe("kubejs:thorium", "kubejs:thorium_plate"));
  register(new PlateCastingRecipe("kubejs:titanium", "kubejs:titanium_plate"));
  register(new PlateCastingRecipe("kubejs:uranium", "kubejs:uranium_plate"));
  register(new PlateCastingRecipe("kubejs:vibranite", "kubejs:vibranite_plate"));
  register(new PlateCastingRecipe("kubejs:viculeam", "kubejs:viculeam_plate"));
  register(new PlateCastingRecipe("kubejs:void", "kubejs:void_plate"));
  register(new PlateCastingRecipe("kubejs:xelkive", "kubejs:xelkive_plate"));
  register(new PlateCastingRecipe("kubejs:xeproda", "kubejs:xeproda_plate"));
  register(new PlateCastingRecipe("kubejs:yttrium", "kubejs:yttrium_plate"));
  register(new PlateCastingRecipe("kubejs:zapolgium", "kubejs:zapolgium_plate"));
  register(new PlateCastingRecipe("kubejs:zinc", "kubejs:zinc_plate"));
  register(new PlateCastingRecipe("kubejs:abiding_alloy", "kubejs:abiding_alloy_plate"));
  register(new PlateCastingRecipe("kubejs:tungsten", "kubejs:tungsten_plate"));
  register(new PlateCastingRecipe("kubejs:thulium", "kubejs:thulium_plate"));
  register(new PlateCastingRecipe("kubejs:tellurium", "kubejs:tellurium_plate"));
  register(new PlateCastingRecipe("kubejs:acril", "kubejs:acril_plate"));
  register(new PlateCastingRecipe("kubejs:adamanite", "kubejs:adamanite_plate"));
  register(new PlateCastingRecipe("kubejs:aluminum", "kubejs:aluminum_plate"));
  register(new PlateCastingRecipe("kubejs:boron", "kubejs:boron_plate"));
  register(new PlateCastingRecipe("kubejs:brass", "kubejs:brass_plate"));
  register(new PlateCastingRecipe("kubejs:bronze", "kubejs:bronze_plate"));
  register(new PlateCastingRecipe("kubejs:tin", "kubejs:tin_plate"));
  register(new PlateCastingRecipe("productivemetalworks:molten_netherite", "kubejs:netherite_plate"));
});