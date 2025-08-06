/*
* 用于制作材料配方(锭融化成为流体)
*/
ServerEvents.recipes(event => {
  let metalIngots = [
    { ingot: "kubejs:celeslar_ingot", fluid: "kubejs:celeslar" },
    { ingot: "kubejs:chalyblux_ingot", fluid: "kubejs:chalyblux" },
    { ingot: "kubejs:cobalt_ingot", fluid: "kubejs:cobalt" },
    { ingot: "kubejs:cosmos_aurora_ingot", fluid: "kubejs:cosmos_aurora" },
    { ingot: "kubejs:dark_cryopla_ingot", fluid: "kubejs:dark_cryopla" },
    { ingot: "kubejs:echo_ingot", fluid: "kubejs:echo" },
    { ingot: "kubejs:electrum_ingot", fluid: "kubejs:electrum" },
    { ingot: "kubejs:enlighted_gold_ingot", fluid: "kubejs:enlighted_gold" },
    { ingot: "kubejs:estalt_ingot", fluid: "kubejs:estalt" },
    { ingot: "kubejs:europium_ingot", fluid: "kubejs:europium" },
    { ingot: "kubejs:frigidite_ingot", fluid: "kubejs:frigidite" },
    { ingot: "kubejs:invar_ingot", fluid: "kubejs:invar" },
    { ingot: "kubejs:isovol_ingot", fluid: "kubejs:isovol" },
    { ingot: "kubejs:lead_ingot", fluid: "kubejs:lead" },
    { ingot: "kubejs:lunium_nova_ingot", fluid: "kubejs:lunium_nova" },
    { ingot: "kubejs:luteous_ingot", fluid: "kubejs:luteous" },
    { ingot: "kubejs:magmanite_ingot", fluid: "kubejs:magmanite" },
    { ingot: "kubejs:magnetite_ingot", fluid: "kubejs:magnetite" },
    { ingot: "kubejs:midnight_abyssal_ingot", fluid: "kubejs:midnight_abyssal" },
    { ingot: "kubejs:mythril_ingot", fluid: "kubejs:mythril" },
    { ingot: "kubejs:neptunium_ingot", fluid: "kubejs:neptunium" },
    { ingot: "kubejs:nickel_ingot", fluid: "kubejs:nickel" },
    { ingot: "kubejs:nlatstone_ingot", fluid: "kubejs:nlatstone" },
    { ingot: "kubejs:osmium_ingot", fluid: "kubejs:osmium" },
    { ingot: "kubejs:palladium_ingot", fluid: "kubejs:palladium" },
    { ingot: "kubejs:platinum_ingot", fluid: "kubejs:platinum" },
    { ingot: "kubejs:plumbumanite_ingot", fluid: "kubejs:plumbumanite" },
    { ingot: "kubejs:plutonium_ingot", fluid: "kubejs:plutonium" },
    { ingot: "kubejs:polonium_ingot", fluid: "kubejs:polonium" },
    { ingot: "kubejs:rhexis_ingot", fluid: "kubejs:rhexis" },
    { ingot: "kubejs:rhodium_ingot", fluid: "kubejs:rhodium" },
    { ingot: "kubejs:scandium_ingot", fluid: "kubejs:scandium" },
    { ingot: "kubejs:scepbo_ingot", fluid: "kubejs:scepbo" },
    { ingot: "kubejs:silicon_ingot", fluid: "kubejs:silicon" },
    { ingot: "kubejs:silver_ingot", fluid: "kubejs:silver" },
    { ingot: "kubejs:solimrith_ingot", fluid: "kubejs:solimrith" },
    { ingot: "kubejs:starinium_ingot", fluid: "kubejs:starinium" },
    { ingot: "kubejs:starlight_mythril_ingot", fluid: "kubejs:starlight_mythril" },
    { ingot: "kubejs:steel_ingot", fluid: "kubejs:steel" },
    { ingot: "kubejs:stellar_ingot", fluid: "kubejs:stellar" },
    { ingot: "kubejs:thlanium_ingot", fluid: "kubejs:thlanium" },
    { ingot: "kubejs:thorium_ingot", fluid: "kubejs:thorium" },
    { ingot: "kubejs:titanium_ingot", fluid: "kubejs:titanium" },
    { ingot: "kubejs:ultimate_ingot", fluid: "kubejs:ultimate" },
    { ingot: "kubejs:lustful_haze_alloy", fluid: "kubejs:lustful_haze_alloy" },
    { ingot: "kubejs:unstable_luminescence_ingot", fluid: "kubejs:unstable_luminescence" },
    { ingot: "kubejs:uranium_ingot", fluid: "kubejs:uranium" },
    { ingot: "kubejs:vibranite_ingot", fluid: "kubejs:vibranite" },
    { ingot: "kubejs:viculeam_ingot", fluid: "kubejs:viculeam" },
    { ingot: "kubejs:void_ingot", fluid: "kubejs:void" },
    { ingot: "kubejs:vorant_ingot", fluid: "kubejs:vorant" },
    { ingot: "kubejs:xelkive_ingot", fluid: "kubejs:xelkive" },
    { ingot: "kubejs:xeproda_ingot", fluid: "kubejs:xeproda" },
    { ingot: "kubejs:yttrium_ingot", fluid: "kubejs:yttrium" },
    { ingot: "kubejs:zapolgium_ingot", fluid: "kubejs:zapolgium" },
    { ingot: "kubejs:zinc_ingot", fluid: "kubejs:zinc" },
    { ingot: "gobber2:gobber2_ingot", fluid: "kubejs:gobber2" },
    { ingot: "gobber2:gobber2_ingot_nether", fluid: "kubejs:gobber2_nether" },
    { ingot: "gobber2:gobber2_ingot_end", fluid: "kubejs:gobber2_end" },
    { ingot: "kubejs:achroous_ingot", fluid: "kubejs:achroous" },
    { ingot: "kubejs:acril_ingot", fluid: "kubejs:acril" },
    { ingot: "kubejs:terraulite_ingot", fluid: "kubejs:terraulite" },
    { ingot: "kubejs:tungsten_ingot", fluid: "kubejs:tungsten" },
    { ingot: "kubejs:thulium_ingot", fluid: "kubejs:thulium" },
    { ingot: "kubejs:tellurium_ingot", fluid: "kubejs:tellurium" },
    { ingot: "kubejs:adamanite_ingot", fluid: "kubejs:adamanite" },
    { ingot: "kubejs:aluminum_ingot", fluid: "kubejs:aluminum" },
    { ingot: "kubejs:boron_ingot", fluid: "kubejs:boron" },
    { ingot: "kubejs:brass_ingot", fluid: "kubejs:brass" },
    { ingot: "kubejs:bronze_ingot", fluid: "kubejs:bronze" },
    { ingot: "kubejs:strontium_ingot", fluid: "kubejs:strontium" },
    { ingot: "kubejs:tin_ingot", fluid: "kubejs:tin" }


  ];

  metalIngots.forEach(metal => {
    event.custom({
      "type": "productivemetalworks:item_casting",
      "cast": {
        "item": "productivemetalworks:ingot_cast"
      },
      "consume_cast": false,
      "fluid": {
        "amount": 90,
        "fluid": metal.fluid
      },
      "result": {
        "count": 1,
        "id": metal.ingot
      }
    });
  });
});
