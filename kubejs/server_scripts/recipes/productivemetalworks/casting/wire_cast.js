

ServerEvents.recipes(event => {
  let metalwire = [
    { wire: "kubejs:celeslar_wire", fluid: "kubejs:celeslar" },
    { wire: "kubejs:chalyblux_wire", fluid: "kubejs:chalyblux" },
    { wire: "kubejs:cosmos_aurora_wire", fluid: "kubejs:cosmos_aurora" },
    { wire: "kubejs:dark_cryopla_wire", fluid: "kubejs:dark_cryopla" },
    { wire: "kubejs:echo_wire", fluid: "kubejs:echo" },
    { wire: "kubejs:electrum_wire", fluid: "kubejs:electrum" },
    { wire: "kubejs:estalt_wire", fluid: "kubejs:estalt" },
    { wire: "kubejs:europium_wire", fluid: "kubejs:europium" },
    { wire: "kubejs:frigidite_wire", fluid: "kubejs:frigidite" },
    { wire: "kubejs:invar_wire", fluid: "kubejs:invar" },
    { wire: "kubejs:lead_wire", fluid: "kubejs:lead" },
    { wire: "kubejs:lunium_nova_wire", fluid: "kubejs:lunium_nova" },
    { wire: "kubejs:midnight_abyssal_wire", fluid: "kubejs:midnight_abyssal" },
    { wire: "kubejs:mythril_wire", fluid: "kubejs:mythril" },
    { wire: "kubejs:nickel_wire", fluid: "kubejs:nickel" },
    { wire: "kubejs:nlatstone_wire", fluid: "kubejs:nlatstone" },
    { wire: "kubejs:osmium_wire", fluid: "kubejs:osmium" },
    { wire: "kubejs:palladium_wire", fluid: "kubejs:palladium" },
    { wire: "kubejs:platinum_wire", fluid: "kubejs:platinum" },
    { wire: "kubejs:plumbumanite_wire", fluid: "kubejs:plumbumanite" },
    { wire: "kubejs:rhodium_wire", fluid: "kubejs:rhodium" },
    { wire: "kubejs:scandium_wire", fluid: "kubejs:scandium" },
    { wire: "kubejs:silicon_wire", fluid: "kubejs:silicon" },
    { wire: "kubejs:silver_wire", fluid: "kubejs:silver" },
    { wire: "kubejs:solimrith_wire", fluid: "kubejs:solimrith" },
    { wire: "kubejs:starlight_mythril_wire", fluid: "kubejs:starlight_mythril" },
    { wire: "kubejs:steel_wire", fluid: "kubejs:steel" },
    { wire: "kubejs:stellar_wire", fluid: "kubejs:stellar" },
    { wire: "kubejs:thlanium_wire", fluid: "kubejs:thlanium" },
    { wire: "kubejs:thorium_wire", fluid: "kubejs:thorium" },
    { wire: "kubejs:titanium_wire", fluid: "kubejs:titanium" },
    { wire: "kubejs:uranium_wire", fluid: "kubejs:uranium" },
    { wire: "kubejs:vibranite_wire", fluid: "kubejs:vibranite" },
    { wire: "kubejs:viculeam_wire", fluid: "kubejs:viculeam" },
    { wire: "kubejs:void_wire", fluid: "kubejs:void" },
    { wire: "kubejs:xelkive_wire", fluid: "kubejs:xelkive" },
    { wire: "kubejs:xeproda_wire", fluid: "kubejs:xeproda" },
    { wire: "kubejs:yttrium_wire", fluid: "kubejs:yttrium" },
    { wire: "kubejs:zapolgium_wire", fluid: "kubejs:zapolgium" },
    { wire: "kubejs:zinc_wire", fluid: "kubejs:zinc" },
    { wire: "kubejs:tungsten_wire", fluid: "kubejs:tungsten" },
    { wire: "kubejs:tellurium_wire", fluid: "kubejs:tellurium" },
    { wire: "kubejs:acril_wire", fluid: "kubejs:acril" },
    { wire: "kubejs:boron_wire", fluid: "kubejs:boron" },
    { wire: "kubejs:brass_wire", fluid: "kubejs:brass" },
    { wire: "kubejs:bronze_wire", fluid: "kubejs:bronze" },
    { wire: "kubejs:tin_wire", fluid: "kubejs:tin" }
  ];

  metalwire.forEach(metal => {
    event.custom({
      "type": "productivemetalworks:item_casting",
      "cast": {
        "item": "productivemetalworks:gear_cast"
      },
      "consume_cast": false,
      "fluid": {
        "amount": 45,
        "fluid": metal.fluid
      },
      "result": {
        "count": 1,
        "id": metal.wire
      }
    });
  });
});

ServerEvents.recipes(event => {
  let ban_recipes = [
    { item: "alltheores:tin_gear" },
    { item: "alltheores:osmium_gear" },
    { item: "alltheores:lead_gear" },
    { item: "alltheores:platinum_gear" },
    { item: "alltheores:silver_gear" },
    { item: "alltheores:uranium_gear" },
    { item: "alltheores:aluminum_gear" },
    { item: "alltheores:nickel_gear" },
    { item: "alltheores:zinc_gear" },
    { item: "alltheores:electrum_gear" },
    { item: "alltheores:brass_gear" },
    { item: "alltheores:signalum_gear" },
    { item: "alltheores:lumium_gear" },
    { item: "alltheores:enderium_gear" },
    { item: "alltheores:iridium_gear" },
    { item: "alltheores:invar_gear" },
    { item: "alltheores:steel_gear" },
    { item: "alltheores:bronze_gear" },
    { item: "alltheores:constantan_gear" },
    { item: "alltheores:copper_gear" },
    { item: "alltheores:iron_gear" },
    { item: "alltheores:gold_gear" },
    { item: "alltheores:netherite_gear" },
    { item: "alltheores:diamond_gear" },
    { item: "allthemodium:allthemodium_gear" },
    { item: "allthemodium:vibranium_gear" },
    { item: "allthemodium:unobtainium_gear" }
  ]
  ban_recipes.forEach(metal => {
    event.remove({ output: metal.item })
  })
})