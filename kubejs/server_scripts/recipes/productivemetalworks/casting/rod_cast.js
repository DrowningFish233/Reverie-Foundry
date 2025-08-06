

ServerEvents.recipes(event => {
  let metalrods = [
    { rod: "kubejs:celeslar_rod", fluid: "kubejs:celeslar" },
    { rod: "kubejs:chalyblux_rod", fluid: "kubejs:chalyblux" },
    { rod: "kubejs:cobalt_rod", fluid: "kubejs:cobalt" },
    { rod: "kubejs:cosmos_aurora_rod", fluid: "kubejs:cosmos_aurora" },
    { rod: "kubejs:dark_cryopla_rod", fluid: "kubejs:dark_cryopla" },
    { rod: "kubejs:echo_rod", fluid: "kubejs:echo" },
    { rod: "kubejs:electrum_rod", fluid: "kubejs:electrum" },
    { rod: "kubejs:estalt_rod", fluid: "kubejs:estalt" },
    { rod: "kubejs:europium_rod", fluid: "kubejs:europium" },
    { rod: "kubejs:frigidite_rod", fluid: "kubejs:frigidite" },
    { rod: "kubejs:invar_rod", fluid: "kubejs:invar" },
    { rod: "kubejs:lead_rod", fluid: "kubejs:lead" },
    { rod: "kubejs:lunium_nova_rod", fluid: "kubejs:lunium_nova" },
    { rod: "kubejs:midnight_abyssal_rod", fluid: "kubejs:midnight_abyssal" },
    { rod: "kubejs:mythril_rod", fluid: "kubejs:mythril" },
    { rod: "kubejs:nickel_rod", fluid: "kubejs:nickel" },
    { rod: "kubejs:nlatstone_rod", fluid: "kubejs:nlatstone" },
    { rod: "kubejs:osmium_rod", fluid: "kubejs:osmium" },
    { rod: "kubejs:palladium_rod", fluid: "kubejs:palladium" },
    { rod: "kubejs:platinum_rod", fluid: "kubejs:platinum" },
    { rod: "kubejs:plumbumanite_rod", fluid: "kubejs:plumbumanite" },
    { rod: "kubejs:rhodium_rod", fluid: "kubejs:rhodium" },
    { rod: "kubejs:scandium_rod", fluid: "kubejs:scandium" },
    { rod: "kubejs:silicon_rod", fluid: "kubejs:silicon" },
    { rod: "kubejs:silver_rod", fluid: "kubejs:silver" },
    { rod: "kubejs:solimrith_rod", fluid: "kubejs:solimrith" },
    { rod: "kubejs:starlight_mythril_rod", fluid: "kubejs:starlight_mythril" },
    { rod: "kubejs:steel_rod", fluid: "kubejs:steel" },
    { rod: "kubejs:stellar_rod", fluid: "kubejs:stellar" },
    { rod: "kubejs:thlanium_rod", fluid: "kubejs:thlanium" },
    { rod: "kubejs:thorium_rod", fluid: "kubejs:thorium" },
    { rod: "kubejs:titanium_rod", fluid: "kubejs:titanium" },
    { rod: "kubejs:uranium_rod", fluid: "kubejs:uranium" },
    { rod: "kubejs:vibranite_rod", fluid: "kubejs:vibranite" },
    { rod: "kubejs:viculeam_rod", fluid: "kubejs:viculeam" },
    { rod: "kubejs:void_rod", fluid: "kubejs:void" },
    { rod: "kubejs:xelkive_rod", fluid: "kubejs:xelkive" },
    { rod: "kubejs:xeproda_rod", fluid: "kubejs:xeproda" },
    { rod: "kubejs:yttrium_rod", fluid: "kubejs:yttrium" },
    { rod: "kubejs:zapolgium_rod", fluid: "kubejs:zapolgium" },
    { rod: "kubejs:zinc_rod", fluid: "kubejs:zinc" },
    { rod: "gobber2:gobber2_rod", fluid: "kubejs:gobber2" },
    { rod: "gobber2:gobber2_rod_nether", fluid: "kubejs:gobber2_nether" },
    { rod: "gobber2:gobber2_rod_end", fluid: "kubejs:gobber2_end" },
    { rod: "kubejs:tungsten_rod", fluid: "kubejs:tungsten" },
    { rod: "kubejs:thulium_rod", fluid: "kubejs:thulium" },
    { rod: "kubejs:tellurium_rod", fluid: "kubejs:tellurium" },
    { rod: "kubejs:acril_rod", fluid: "kubejs:acril" },
    { rod: "kubejs:adamanite_rod", fluid: "kubejs:adamanite" },
    { rod: "kubejs:aluminum_rod", fluid: "kubejs:aluminum" },
    { rod: "kubejs:boron_rod", fluid: "kubejs:boron" },
    { rod: "kubejs:brass_rod", fluid: "kubejs:brass" },
    { rod: "kubejs:bronze_rod", fluid: "kubejs:bronze" },
    { rod: "kubejs:tin_rod", fluid: "kubejs:tin" },


  ];

  metalrods.forEach(metal => {
    event.custom({
      "type": "productivemetalworks:item_casting",
      "cast": {
        "item": "productivemetalworks:rod_cast"
      },
      "consume_cast": false,
      "fluid": {
        "amount": 45,
        "fluid": metal.fluid
      },
      "result": {
        "count": 1,
        "id": metal.rod
      }
    });
  });
});