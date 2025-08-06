ServerEvents.recipes(event => {
  let metalplate = [
    { plate: "kubejs:celeslar_plate", fluid: "kubejs:celeslar" },
    { plate: "kubejs:chalyblux_plate", fluid: "kubejs:chalyblux" },
    { plate: "kubejs:cobalt_plate", fluid: "kubejs:cobalt" },
    { plate: "kubejs:cosmos_aurora_plate", fluid: "kubejs:cosmos_aurora" },
    { plate: "kubejs:dark_cryopla_plate", fluid: "kubejs:dark_cryopla" },
    { plate: "kubejs:echo_plate", fluid: "kubejs:echo" },
    { plate: "kubejs:electrum_plate", fluid: "kubejs:electrum" },
    { plate: "kubejs:estalt_plate", fluid: "kubejs:estalt" },
    { plate: "kubejs:europium_plate", fluid: "kubejs:europium" },
    { plate: "kubejs:frigidite_plate", fluid: "kubejs:frigidite" },
    { plate: "kubejs:invar_plate", fluid: "kubejs:invar" },
    { plate: "kubejs:lead_plate", fluid: "kubejs:lead" },
    { plate: "kubejs:lunium_nova_plate", fluid: "kubejs:lunium_nova" },
    { plate: "kubejs:midnight_abyssal_plate", fluid: "kubejs:midnight_abyssal" },
    { plate: "kubejs:mythril_plate", fluid: "kubejs:mythril" },
    { plate: "kubejs:nickel_plate", fluid: "kubejs:nickel" },
    { plate: "kubejs:nlatstone_plate", fluid: "kubejs:nlatstone" },
    { plate: "kubejs:osmium_plate", fluid: "kubejs:osmium" },
    { plate: "kubejs:palladium_plate", fluid: "kubejs:palladium" },
    { plate: "kubejs:platinum_plate", fluid: "kubejs:platinum" },
    { plate: "kubejs:plumbumanite_plate", fluid: "kubejs:plumbumanite" },
    { plate: "kubejs:rhodium_plate", fluid: "kubejs:rhodium" },
    { plate: "kubejs:scandium_plate", fluid: "kubejs:scandium" },
    { plate: "kubejs:silicon_plate", fluid: "kubejs:silicon" },
    { plate: "kubejs:silver_plate", fluid: "kubejs:silver" },
    { plate: "kubejs:solimrith_plate", fluid: "kubejs:solimrith" },
    { plate: "kubejs:starlight_mythril_plate", fluid: "kubejs:starlight_mythril" },
    { plate: "kubejs:steel_plate", fluid: "kubejs:steel" },
    { plate: "kubejs:stellar_plate", fluid: "kubejs:stellar" },
    { plate: "kubejs:thlanium_plate", fluid: "kubejs:thlanium" },
    { plate: "kubejs:thorium_plate", fluid: "kubejs:thorium" },
    { plate: "kubejs:titanium_plate", fluid: "kubejs:titanium" },
    { plate: "kubejs:uranium_plate", fluid: "kubejs:uranium" },
    { plate: "kubejs:vibranite_plate", fluid: "kubejs:vibranite" },
    { plate: "kubejs:viculeam_plate", fluid: "kubejs:viculeam" },
    { plate: "kubejs:void_plate", fluid: "kubejs:void" },
    { plate: "kubejs:xelkive_plate", fluid: "kubejs:xelkive" },
    { plate: "kubejs:xeproda_plate", fluid: "kubejs:xeproda" },
    { plate: "kubejs:yttrium_plate", fluid: "kubejs:yttrium" },
    { plate: "kubejs:zapolgium_plate", fluid: "kubejs:zapolgium" },
    { plate: "kubejs:zinc_plate", fluid: "kubejs:zinc" },
    { plate: "kubejs:abiding_alloy_plate", fluid: "kubejs:abiding_alloy" },
    { plate: "kubejs:tungsten_plate", fluid: "kubejs:tungsten" },
    { plate: "kubejs:thulium_plate", fluid: "kubejs:thulium" },
    { plate: "kubejs:tellurium_plate", fluid: "kubejs:tellurium" },
    { plate: "kubejs:acril_plate", fluid: "kubejs:acril" },
    { plate: "kubejs:adamanite_plate", fluid: "kubejs:adamanite" },
    { plate: "kubejs:aluminum_plate", fluid: "kubejs:aluminum" },
    { plate: "kubejs:boron_plate", fluid: "kubejs:boron" },
    { plate: "kubejs:brass_plate", fluid: "kubejs:brass" },
    { plate: "kubejs:bronze_plate", fluid: "kubejs:bronze" },
    { plate: "kubejs:tin_plate", fluid: "kubejs:tin" }


  ];

  metalplate.forEach(metal => {
    event.custom({
      "type": "productivemetalworks:item_casting",
      "cast": {
        "item": "productivemetalworks:plate_cast"
      },
      "consume_cast": false,
      "fluid": {
        "amount": 90,
        "fluid": metal.fluid
      },
      "result": {
        "count": 1,
        "id": metal.plate
      }
    });
  });
});