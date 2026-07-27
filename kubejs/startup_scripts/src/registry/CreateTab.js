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
    let tab = event.create("kubejs:tab_2")
        .icon(() => 'kubejs:purple_haze')
        .displayName(Text.translatable("item_group.kubejs.alcohol"))
        .content(() => ['kubejs:purple_haze']);
});

StartupEvents.modifyCreativeTab('kubejs:tab_2', event => {
    event.remove('kubejs:purple_haze')
    const itemsInOrder = [
        "kubejs:purple_haze",
        "kubejs:evergreen_gin",
        "kubejs:star_beam_rye",

        "kubejs:vodka",
        "kubejs:whiskey",
        "kubejs:rum",
        "kubejs:tequila",
        "kubejs:moonshine",
        "kubejs:everclear",

        "kubejs:red_wine",
        "kubejs:white_wine",

        "kubejs:grape_beer",

        "kubejs:bloody_mary",
        "kubejs:caribbean_rum",
        "kubejs:cinnamon_roll",
        "kubejs:fireball",
        "kubejs:lightingball",
        "kubejs:iceball",
        "kubejs:margarita",
        "kubejs:moscow_mule",
        "kubejs:screwdriver",
        "kubejs:tequila_sunrise",
        "kubejs:old_fashioned",

        "kubejs:hangover_tea"
    ];

    itemsInOrder.forEach(item => {
        event.add(item);
    });
});


StartupEvents.registry("creative_mode_tab", event => {
    let tab = event.create("kubejs:tab_3")
        .icon(() => 'kubejs:fragment_of_the_universe')
        .displayName(Text.translatable("item_group.kubejs.other"))
        .content(() => ['kubejs:bad_apple']);
});


StartupEvents.modifyCreativeTab('kubejs:tab_3', event => {
    event.remove('kubejs:bad_apple')

    // 按顺序排列的物品列表
    const itemsInOrder = [
        "create:chromatic_compound",
        "create:shadow_steel",
        "create:refined_radiance",

        "kubejs:blue_star",
        "kubejs:bluestar",
        "kubejs:fragment_of_the_universe",
        "kubejs:draedon_heart",
        "kubejs:heart_of_darkness",
        "kubejs:low_heart_of_darkness",
        "kubejs:low_hydra_heart",
        "kubejs:raw_manflesh",
        "kubejs:cooked_manflesh",
        "kubejs:foul_flesh",
        "kubejs:soul",
        "kubejs:sin",

        "kubejs:bad_apple",
        "kubejs:red_skull",
        "kubejs:red_shoes",
        "kubejs:papyrus_scarab",
        "kubejs:scroll_of_friendship",
        "kubejs:necromantic_scroll",
        "kubejs:totem_of_undying",
        "kubejs:exploding_chocolate_bar",
        "kubejs:melting_eyeball",
        "kubejs:mimicream",

        "kubejs:emergency_sanity_elixir_a",
        "kubejs:emergency_sanity_elixir_b",
        "kubejs:emergency_sanity_elixir_y",
        "kubejs:omega_healing_potion",
        "kubejs:supreme_healing_potion",
        "kubejs:supreme_mana_potion",
        "kubejs:miracle_fruit",
        "kubejs:fluid_sac",
        "kubejs:biomass_liquid",
        "kubejs:lava_bible",

        "kubejs:starfury",
        "kubejs:crowbar",
        "kubejs:narrator",

        "kubejs:spell_resistance_helmet",
        "kubejs:spell_resistance_chestplate",
        "kubejs:spell_resistance_leggings",
        "kubejs:spell_resistance_boots",

        "kubejs:azure_dawnbreaker_helmet",
        "kubejs:azure_dawnbreaker_chestplate",
        "kubejs:azure_dawnbreaker_leggings",
        "kubejs:azure_dawnbreaker_boots",

        "kubejs:dps_meter_update",
        "kubejs:mana_flower",
        "kubejs:mana_regeneration_band",
        "kubejs:arcane_flower",
        "kubejs:mana_cloak",
        "kubejs:band_of_starpower",
        "kubejs:magnet_flower",
        "kubejs:magic_cuffs",
        "kubejs:sanity_curios",
        "kubejs:sorcerer_emblem",
        "kubejs:avenger_emblem",
        "kubejs:destroyer_emblem",
        "kubejs:angler_earring",

        "kubejs:pendant_of_sloth",
        "kubejs:chain_of_lust",
        "kubejs:eye_of_envy",
        "kubejs:crown_of_pride",
        "kubejs:stone_of_melancholy",
        "kubejs:mark_of_wrath",
        "kubejs:ring_of_gluttony",
        "kubejs:violet_baptism",
        "kubejs:paradise_lost",

        "kubejs:randomweapon",
        "kubejs:eye_of_ancient_city_located",
        "kubejs:eye_of_dragon_cave_located",
        "kubejs:eye_of_weeping_well_located",
        "kubejs:eye_of_starlight_portal_located",
        "kubejs:catalyst_t4",
        "kubejs:catalyst_t5",
        "kubejs:sulfuric_vial",
        "kubejs:broken_sulfuric_vial",
        "kubejs:core_suppression_unit_form_one",
        "kubejs:core_suppression_unit_form_two",
        "kubejs:core_suppression_unit_form_three",
        "kubejs:remove_armor",
        "kubejs:dragon_upgrade_smithing_template",
        "kubejs:golden_apple"
    ];

    itemsInOrder.forEach(item => {
        event.add(item);
    });
});
StartupEvents.modifyCreativeTab("kubejs:tab", (event) => {
    event.remove("kubejs:randomweapon");
    event.remove("kubejs:eye_of_ancient_city_located");
    event.remove("kubejs:eye_of_dragon_cave_located");
    event.remove("kubejs:eye_of_weeping_well_located");
    event.remove("kubejs:eye_of_starlight_portal_located");
    event.remove("kubejs:catalyst_t4");
    event.remove("kubejs:catalyst_t5");
    event.remove("kubejs:sulfuric_vial");
    event.remove("kubejs:broken_sulfuric_vial");
    event.remove("kubejs:core_suppression_unit_form_one");
    event.remove("kubejs:core_suppression_unit_form_two");
    event.remove("kubejs:core_suppression_unit_form_three");
    event.remove("kubejs:remove_armor");
    event.remove("kubejs:pendant_of_sloth");
    event.remove("kubejs:chain_of_lust");
    event.remove("kubejs:dragon_upgrade_smithing_template");
    event.remove("kubejs:golden_apple");
    event.remove("kubejs:eye_of_envy");
    event.remove("kubejs:crown_of_pride");
    event.remove("kubejs:stone_of_melancholy");
    event.remove("kubejs:mark_of_wrath");
    event.remove("kubejs:ring_of_gluttony");
    event.remove("kubejs:violet_baptism");
    event.remove("kubejs:paradise_lost");
    event.remove("kubejs:fish");
    event.remove("kubejs:red_skull");
    event.remove("kubejs:bad_apple");
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
    event.remove("kubejs:brick");
    event.remove("kubejs:mimicream");
    event.remove("kubejs:sin");
    event.remove("kubejs:blue_star");
    event.remove("kubejs:low_heart_of_darkness");
    event.remove("kubejs:fragment_of_the_universe");
    event.remove("kubejs:red_shoes");
    event.remove("kubejs:totem_of_undying");
    event.remove("kubejs:dps_meter_update");
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
    event.remove("kubejs:trait_fish");
    event.remove("kubejs:starfury");
    event.remove("kubejs:spell_resistance_helmet");
    event.remove("kubejs:spell_resistance_chestplate");
    event.remove("kubejs:spell_resistance_leggings");
    event.remove("kubejs:spell_resistance_boots");
    event.remove("kubejs:azure_dawnbreaker_helmet");
    event.remove("kubejs:azure_dawnbreaker_chestplate");
    event.remove("kubejs:azure_dawnbreaker_leggings");
    event.remove("kubejs:azure_dawnbreaker_boots");
    event.remove("kubejs:mana_flower");
    event.remove("kubejs:mana_regeneration_band");
    event.remove("kubejs:arcane_flower");
    event.remove("kubejs:mana_cloak");
    event.remove("kubejs:band_of_starpower");
    event.remove("kubejs:magnet_flower");
    event.remove("kubejs:magic_cuffs");
    event.remove("kubejs:crowbar");
    event.remove("kubejs:narrator");
    event.remove("kubejs:sorcerer_emblem");
    event.remove("kubejs:avenger_emblem");
    event.remove("kubejs:destroyer_emblem");
    event.remove("kubejs:angler_earring");
});

StartupEvents.modifyCreativeTab("minecraft:op_blocks", (event) => {
    event.add("kubejs:drowning_fish")
    event.add("kubejs:material_patchouli_generator")
    event.add("kubejs:trait_fish")
    event.add("kubejs:fish")
});
