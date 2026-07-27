function WireCastingRecipe(fluid, wire) {
  this.type = "productivemetalworks:item_casting";
  this.cast = {
    "item": "productivemetalworks:gear_cast"
  };
  this.consume_cast = false;
  this.fluid = {
    "amount": 45,
    "fluid": fluid
  };
  this.result = {
    "count": 1,
    "id": wire
  };
}

ServerEvents.recipes(event => {
  const register = recipe => {
    const json = JSON.parse(JSON.stringify(recipe));
    event.custom(json);
  };

  register(new WireCastingRecipe("kubejs:zirconium", "kubejs:zirconium_wire"));
  register(new WireCastingRecipe("kubejs:celeslar", "kubejs:celeslar_wire"));
  register(new WireCastingRecipe("kubejs:chalyblux", "kubejs:chalyblux_wire"));
  register(new WireCastingRecipe("kubejs:cosmos_aurora", "kubejs:cosmos_aurora_wire"));
  register(new WireCastingRecipe("kubejs:dark_cryopla", "kubejs:dark_cryopla_wire"));
  register(new WireCastingRecipe("kubejs:echo", "kubejs:echo_wire"));
  register(new WireCastingRecipe("kubejs:electrum", "kubejs:electrum_wire"));
  register(new WireCastingRecipe("kubejs:estalt", "kubejs:estalt_wire"));
  register(new WireCastingRecipe("kubejs:europium", "kubejs:europium_wire"));
  register(new WireCastingRecipe("kubejs:frigidite", "kubejs:frigidite_wire"));
  register(new WireCastingRecipe("kubejs:invar", "kubejs:invar_wire"));
  register(new WireCastingRecipe("kubejs:lead", "kubejs:lead_wire"));
  register(new WireCastingRecipe("kubejs:lunium_nova", "kubejs:lunium_nova_wire"));
  register(new WireCastingRecipe("kubejs:midnight_abyssal", "kubejs:midnight_abyssal_wire"));
  register(new WireCastingRecipe("kubejs:mythril", "kubejs:mythril_wire"));
  register(new WireCastingRecipe("kubejs:nickel", "kubejs:nickel_wire"));
  register(new WireCastingRecipe("kubejs:nlatstone", "kubejs:nlatstone_wire"));
  register(new WireCastingRecipe("kubejs:osmium", "kubejs:osmium_wire"));
  register(new WireCastingRecipe("kubejs:palladium", "kubejs:palladium_wire"));
  register(new WireCastingRecipe("kubejs:platinum", "kubejs:platinum_wire"));
  register(new WireCastingRecipe("kubejs:plumbumanite", "kubejs:plumbumanite_wire"));
  register(new WireCastingRecipe("kubejs:rhodium", "kubejs:rhodium_wire"));
  register(new WireCastingRecipe("kubejs:scandium", "kubejs:scandium_wire"));
  register(new WireCastingRecipe("kubejs:silicon", "kubejs:silicon_wire"));
  register(new WireCastingRecipe("kubejs:silver", "kubejs:silver_wire"));
  register(new WireCastingRecipe("kubejs:solimrith", "kubejs:solimrith_wire"));
  register(new WireCastingRecipe("kubejs:starlight_mythril", "kubejs:starlight_mythril_wire"));
  register(new WireCastingRecipe("kubejs:steel", "kubejs:steel_wire"));
  register(new WireCastingRecipe("kubejs:stellar", "kubejs:stellar_wire"));
  register(new WireCastingRecipe("kubejs:thlanium", "kubejs:thlanium_wire"));
  register(new WireCastingRecipe("kubejs:thorium", "kubejs:thorium_wire"));
  register(new WireCastingRecipe("kubejs:titanium", "kubejs:titanium_wire"));
  register(new WireCastingRecipe("kubejs:uranium", "kubejs:uranium_wire"));
  register(new WireCastingRecipe("kubejs:vibranite", "kubejs:vibranite_wire"));
  register(new WireCastingRecipe("kubejs:viculeam", "kubejs:viculeam_wire"));
  register(new WireCastingRecipe("kubejs:void", "kubejs:void_wire"));
  register(new WireCastingRecipe("kubejs:xelkive", "kubejs:xelkive_wire"));
  register(new WireCastingRecipe("kubejs:xeproda", "kubejs:xeproda_wire"));
  register(new WireCastingRecipe("kubejs:yttrium", "kubejs:yttrium_wire"));
  register(new WireCastingRecipe("kubejs:zapolgium", "kubejs:zapolgium_wire"));
  register(new WireCastingRecipe("kubejs:zinc", "kubejs:zinc_wire"));
  register(new WireCastingRecipe("kubejs:tungsten", "kubejs:tungsten_wire"));
  register(new WireCastingRecipe("kubejs:tellurium", "kubejs:tellurium_wire"));
  register(new WireCastingRecipe("kubejs:acril", "kubejs:acril_wire"));
  register(new WireCastingRecipe("kubejs:boron", "kubejs:boron_wire"));
  register(new WireCastingRecipe("kubejs:brass", "kubejs:brass_wire"));
  register(new WireCastingRecipe("kubejs:bronze", "kubejs:bronze_wire"));
  register(new WireCastingRecipe("kubejs:tin", "kubejs:tin_wire"));
});