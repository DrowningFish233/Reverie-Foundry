// priority: 0
StartupEvents.modifyCreativeTab('kubejs:tab', event => {
    event.icon = 'kubejs:lustful_haze_alloy'
    event.displayName = Text.translatable('item_group.kubejs.rf')
})

StartupEvents.modifyCreativeTab("kubejs:tab_3", (event) => {
    event.add("irons_spellbooks:claymore")
    event.add("irons_spellbooks:misery")
    event.add("irons_spellbooks:speed_boots")
    event.add("allthemodium:soul_lava_bucket")
    event.add("malum:anomalous_design")
    event.add("malum:complete_design")
    event.add("malum:mnemonic_fragment")
    event.add("malum:null_slate")
    event.add("malum:auric_embers")
    event.add("malum:fused_consciousness")
    event.add("malum:umbral_spirit")
});


StartupEvents.registry("creative_mode_tab", event => {
    let tab = event.create("kubejs:tab_2").icon(() => 'kubejs:purple_haze')
    tab.displayName = Text.translatable("item_group.kubejs.alcohol")
    tab.content(showRestrictedItems => [
        "kubejs:lightingball",
        "kubejs:iceball",
        "kubejs:grape_beer",
        "kubejs:fireball",
        "kubejs:evergreen_gin",
        "kubejs:everclear",
        "kubejs:cinnamon_roll",
        "kubejs:caribbean_rum",
        "kubejs:bloody_mary",
        "kubejs:star_beam_rye",
        "kubejs:screwdriver",
        "kubejs:rum",
        "kubejs:red_wine",
        "kubejs:purple_haze",
        "kubejs:old_fashioned",
        "kubejs:moscow_mule",
        "kubejs:moonshine",
        "kubejs:margarita",
        "kubejs:white_wine",
        "kubejs:whiskey",
        "kubejs:vodka",
        "kubejs:tequila_sunrise",
        "kubejs:tequila",
        "kubejs:hangover_tea"
    ])
});

StartupEvents.registry("creative_mode_tab", event => {
    let tab = event.create("kubejs:tab_3").icon(() => 'kubejs:fragment_of_the_universe')
    tab.displayName = Text.translatable("item_group.kubejs.other")
    tab.content(showRestrictedItems => [
        "create:chromatic_compound",
        "kubejs:papyrus_scarab",
        "kubejs:fluid_sac",
        "kubejs:biomass_liquid",
        "kubejs:blue_star",
        "kubejs:bluestar",
        "kubejs:cooked_manflesh",
        "kubejs:draedon_heart",
        "kubejs:emergency_sanity_elixir_a",
        "kubejs:emergency_sanity_elixir_b",
        "kubejs:emergency_sanity_elixir_y",
        "kubejs:explosion",
        "kubejs:foul_flesh",
        "kubejs:fragment_of_the_universe",
        "kubejs:heart_of_darkness",
        "kubejs:lava_bible",
        "kubejs:low_heart_of_darkness",
        "kubejs:low_hydra_heart",
        "kubejs:mana_flower",
        "kubejs:mimicream",
        "kubejs:miracle_fruit",
        "kubejs:omega_healing_potion",
        "kubejs:raw_manflesh",
        "kubejs:red_shoes",
        "kubejs:sanity_curios",
        "kubejs:scroll_of_friendship",
        "kubejs:sin",
        "kubejs:soul",
        "kubejs:supreme_healing_potion",
        "kubejs:supreme_mana_potion",
        "kubejs:totem_of_undying",
        "kubejs:melting_eyeball",
        "kubejs:necromantic_scroll",
        "kubejs:exploding_chocolate_bar"

    ])
});

StartupEvents.modifyCreativeTab("kubejs:tab", (event) => {
    event.remove("kubejs:exploding_chocolate_bar");
    event.remove("kubejs:exploding_chocolate_bar");
    event.remove("kubejs:necromantic_scroll");
    event.remove("kubejs:papyrus_scarab");
    event.remove("kubejs:melting_eyeball");
    event.remove("kubejs:fluid_sac");
    event.remove("kubejs:draedon_heart");
    event.remove("kubejs:sanity_curios");
    event.remove("kubejs:supreme_mana_potion");
    event.remove("kubejs:explosion");
    event.remove("kubejs:mimicream");
    event.remove("kubejs:sin");
    event.remove("kubejs:blue_star");
    event.remove("kubejs:low_heart_of_darkness");
    event.remove("kubejs:fragment_of_the_universe");
    event.remove("kubejs:red_shoes");
    event.remove("kubejs:totem_of_undying");
    event.remove("kubejs:mana_potion");
    event.remove("kubejs:lava_bible");
    event.remove("kubejs:heart_of_darkness");
    event.remove("kubejs:bluestar");
    event.remove("kubejs:raw_manflesh");
    event.remove("kubejs:cooked_manflesh");
    event.remove("kubejs:miracle_fruit");
    event.remove("kubejs:emergency_sanity_elixir_a");
    event.remove("kubejs:emergency_sanity_elixir_b");
    event.remove("kubejs:emergency_sanity_elixir_y");
    event.remove("kubejs:foul_flesh");
    event.remove("kubejs:omega_healing_potion");
    event.remove("kubejs:supreme_healing_potion");
    event.remove("kubejs:biomass_liquid");
    event.remove("kubejs:soul");
    event.remove("kubejs:low_hydra_heart");
    event.remove("kubejs:scroll_of_friendship");
    event.remove("kubejs:heart_of_darkness");
    event.remove("kubejs:lava_bible");
    event.remove("kubejs:mana_potion");
    event.remove("kubejs:totem_of_undying");
    event.remove("kubejs:red_shoes");
    event.remove("kubejs:fragment_of_the_universe");
    event.remove("kubejs:lightingball");
    event.remove("kubejs:iceball");
    event.remove("kubejs:grape_beer");
    event.remove("kubejs:fireball");
    event.remove("kubejs:evergreen_gin");
    event.remove("kubejs:everclear");
    event.remove("kubejs:cinnamon_roll");
    event.remove("kubejs:caribbean_rum");
    event.remove("kubejs:bloody_mary");
    event.remove("kubejs:star_beam_rye");
    event.remove("kubejs:screwdriver");
    event.remove("kubejs:rum");
    event.remove("kubejs:red_wine");
    event.remove("kubejs:purple_haze");
    event.remove("kubejs:old_fashioned");
    event.remove("kubejs:moscow_mule");
    event.remove("kubejs:moonshine");
    event.remove("kubejs:margarita");
    event.remove("kubejs:white_wine");
    event.remove("kubejs:whiskey");
    event.remove("kubejs:vodka");
    event.remove("kubejs:tequila_sunrise");
    event.remove("kubejs:tequila");
    event.remove("kubejs:hangover_tea");
    event.remove("kubejs:drowning_fish");
    event.remove("kubejs:material_patchouli_generator");

});

StartupEvents.modifyCreativeTab("minecraft:op_blocks", (event) => {
    event.add("kubejs:drowning_fish")
    event.add("kubejs:material_patchouli_generator")

});