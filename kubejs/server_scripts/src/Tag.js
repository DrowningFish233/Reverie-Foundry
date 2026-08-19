// priority: 500
ServerEvents.tags('item', event => {


    event.add('reveriefoundry:gluttonous_authority',
        "kubejs:gluttonous_authority"
    )

    event.add('hazennstuff:enchanted_spellbook',
        "reveriefoundry:spellbook"
    )

    event.add('kubejs:crafting_table',
        "minecraft:crafting_table",
        "biomeswevegone:aspen_crafting_table",
        "biomeswevegone:baobab_crafting_table",
        "biomeswevegone:blue_enchanted_crafting_table",
        "biomeswevegone:cika_crafting_table",
        "biomeswevegone:cypress_crafting_table",
        "biomeswevegone:ebony_crafting_table",
        "biomeswevegone:fir_crafting_table",
        "biomeswevegone:florus_crafting_table",
        "biomeswevegone:green_enchanted_crafting_table",
        "biomeswevegone:holly_crafting_table",
        "biomeswevegone:ironwood_crafting_table",
        "biomeswevegone:jacaranda_crafting_table",
        "biomeswevegone:mahogany_crafting_table",
        "biomeswevegone:maple_crafting_table",
        "biomeswevegone:palm_crafting_table",
        "biomeswevegone:pine_crafting_table",
        "biomeswevegone:rainbow_eucalyptus_crafting_table",
        "biomeswevegone:redwood_crafting_table",
        "biomeswevegone:sakura_crafting_table",
        "biomeswevegone:skyris_crafting_table",
        "biomeswevegone:spirit_crafting_table",
        "biomeswevegone:white_mangrove_crafting_table",
        "biomeswevegone:willow_crafting_table",
        "biomeswevegone:witch_hazel_crafting_table",
        "biomeswevegone:zelkova_crafting_table"
    )


    event.remove('irons_spellbooks:lootable_focus', 'hazennstuff:shadow_scale')
    event.add('c:gems',
        'kubejs:topaz',
        'kubejs:ruby'
    )
    event.add("kubejs:repeat/angler_earring",
        'terra_curio:angler_earring',
        'kubejs:angler_earring'
    )
    event.add('kubejs:tools/scythe',
        'reveriefoundry:tyrving',
        'reveriefoundry:weight_of_worlds',
        'reveriefoundry:sundering_anchor',
    )
    event.add('kubejs:tools/weapon',
        'reveriefoundry:yoyos',
        'reveriefoundry:whip',
        'reveriefoundry:boomerang',
        'reveriefoundry:staff',
        'reveriefoundry:infernal_forge',
        'reveriefoundry:flamberge',
        'reveriefoundry:cane',
        'reveriefoundry:tiansha_star_blade',
        'reveriefoundry:autoloader_crossbow',
        'reveriefoundry:meat_shredder',
        'reveriefoundry:annihilator',
        'reveriefoundry:void_assault_shoulder_weapon',
        'reveriefoundry:seeking_bow',
        'reveriefoundry:wide_excavator',
        'reveriefoundry:lightning_spike',
        'reveriefoundry:sundering_anchor',
        'reveriefoundry:summon_sword'
    )

    event.add('kubejs:accessories',
        'terra_curio:aglet',
        'terra_curio:hermes_boots',
        'terra_curio:flurry_boots',
        'terra_curio:sailfish_boots',
        'terra_curio:ice_skates',
        'terra_curio:cloud_in_a_bottle',
        'terra_curio:shiny_red_balloon',
        'terra_curio:blizzard_in_a_bottle',
        'terra_curio:sandstorm_in_a_bottle',
        'terra_curio:tsunami_in_a_bottle',
        'terra_curio:fart_in_a_jar',
        'terra_curio:climbing_claws',
        'terra_curio:shoe_spikes',
        'terra_curio:band_of_regeneration',
        'terra_curio:panic_necklace',
        'terra_curio:obsidian_skull',
        'terra_curio:cobalt_shield',
        'terra_curio:shackle',
        'terra_curio:feral_claws',
        'terra_curio:flashlight',
        'terra_curio:compass',
        'terra_curio:radar',
        'terra_curio:obsidian_shield',
        'terra_curio:dunerider_boots',
        'terra_curio:water_walking_boots',
        'terra_curio:obsidian_horseshoe',
        'terra_curio:lucky_horseshoe',
        'terra_curio:flipper',
        'terra_curio:frog_leg',
        'terra_curio:frog_flipper',
        'terra_curio:diving_gear',
        'terra_curio:jellyfish_diving_gear',
        'terra_curio:arctic_diving_gear',
        'terra_curio:inner_tube',
        'terra_curio:cloud_in_a_balloon',
        'terra_curio:blizzard_in_a_balloon',
        'terra_curio:sandstorm_in_a_balloon',
        'terra_curio:fart_in_a_balloon',
        'terra_curio:honey_balloon',
        'terra_curio:balloon_pufferfish',
        'terra_curio:blue_horseshoe_balloon',
        'terra_curio:white_horseshoe_balloon',
        'terra_curio:yellow_horseshoe_balloon',
        'terra_curio:green_horseshoe_balloon',
        'terra_curio:pink_horseshoe_balloon',
        'terra_curio:amber_horseshoe_balloon',
        'terra_curio:sharkron_balloon',
        'terra_curio:magiluminescence',
        'terra_curio:obsidian_rose',
        'terra_curio:lava_charm',
        'terra_curio:shield_of_cthulhu',
        'terra_curio:jellyfish_necklace',
        'terra_curio:bee_cloak',
        'terra_curio:honey_comb',
        'terra_curio:flesh_knuckles',
        'terra_curio:worm_scarf',
        'terra_curio:brain_of_confusion',
        'terra_curio:royal_gel',
        'terra_curio:depth_meter',
        'terra_curio:life_form_analyzer',
        'terra_curio:tally_counter',
        'terra_curio:metal_detector',

        'terra_curio:lightning_boots',
        'terra_curio:frostspark_boots',
        'terra_curio:terraspark_boots',
        'terra_curio:spectre_boots',
        'terra_curio:obsidian_water_walking_boots',
        'terra_curio:lava_waders',
        'terra_curio:ambhipian_boots',
        'terra_curio:frog_gear',
        'terra_curio:frog_webbing',
        'terra_curio:flying_carpet',
        'terra_curio:paladins_shield',
        'terra_curio:frozen_shield',
        'terra_curio:hero_shield',
        'terra_curio:star_cloak',
        'terra_curio:sweetheart_necklace',
        'terra_curio:star_veil',
        'terra_curio:cross_necklace',
        'terra_curio:frozen_turtle_shell',
        'terra_curio:power_glove',
        'terra_curio:mechanical_glove',
        'terra_curio:fire_gauntlet',
        'terra_curio:berserkers_glove',
        'terra_curio:titan_glove',
        'terra_curio:ranger_emblem',
        'terra_curio:warrior_emblem',
        'terra_curio:sorcerer_emblem',
        'terra_curio:avenger_emblem',
        'terra_curio:destroyer_emblem',
        'terra_curio:celestial_stone',
        'terra_curio:moon_stone',
        'terra_curio:sun_stone',
        'terra_curio:magma_stone',
        'terra_curio:ankh_charm',
        'terra_curio:molten_charm',
        'terra_curio:moon_charm',
        'terra_curio:obsidian_skull_rose',
        'terra_curio:molten_skull_rose',
        'terra_curio:stalkers_quiver',
        'terra_curio:molten_quiver',
        'terra_curio:bone_glove',
        'terra_curio:shark_tooth_necklace',
        'terra_curio:stinger_necklace',
        'terra_curio:putrid_scent',
        'terra_curio:fast_clock',
        'terra_curio:trifold_map',
        'terra_curio:nutrient_solution',
        'terra_curio:holy_water',
        'terra_curio:energy_bar',
        'terra_curio:searchlight',
        'terra_curio:bezoar',
        'terra_curio:vitamins',
        'terra_curio:detoxification_capsule',
        'terra_curio:blindfold',
        'terra_curio:ancient_chisel',
        'terra_curio:hand_drill',
        'terra_curio:toolbelt',
        'terra_curio:toolbox',
        'terra_curio:extendo_grip',
        'terra_curio:brick_layer',
        'terra_curio:portable_cement_mixer',
        'terra_curio:tiger_climbing_gear',
        'terra_curio:magma_skull',

        'terra_curio:bundle_of_horseshoe_balloons',
        'terra_curio:bundle_of_balloons',
        'terra_curio:ankh_shield',
        'terra_curio:celestial_shell',
        'terra_curio:moon_shell',
        'terra_curio:neptunes_shell',
        'terra_curio:soaring_insignia',
        'terra_curio:celestial_starboard',
        'terra_curio:fairy_boots',
        'terra_curio:flower_boots',
        'terra_curio:master_ninja_gear',
        'terra_curio:recon_scope',
        'terra_curio:sniper_scope',
        'terra_curio:rifle_scope',
        'terra_curio:shiny_stone',
        'terra_curio:hand_of_creation',
        'terra_curio:gravity_globe',
        'terra_curio:architect_gizmo_pack',
        'terra_curio:cell_phone',
        'terra_curio:pda',
        'terra_curio:gps',
        'terra_curio:fish_finder',
        'terra_curio:weather_radio',
        'terra_curio:sextant',
        'terra_curio:fishermans_pocket_guide',
        'terra_curio:treasure_magnet',
        'terra_curio:the_plan',
        'terra_curio:explorers_equipment',
        'terra_curio:tabi',
        'terra_curio:black_belt',
        'terra_curio:eye_of_the_golem',
        'terra_curio:goblin_tech',
        'terra_curio:hive_pack',
        'terra_curio:angler_earring',
        'kubejs:angler_earring',
        'terra_curio:rek_3000',
        'terra_curio:base_point',
        'terra_curio:shot_put'
    )

    event.add('reveriefoundry:meat/tier1',
        'malum:living_flesh'
    )


    event.add('reveriefoundry:meat/tier2',
        'kubejs:living_material'
    )

    event.add('reveriefoundry:meat/tier3',
        'kubejs:proliferating_flesh'
    )


    event.add('quad:fuel/wood', 'alltheores:raw_uranium')
    event.add('quad:fuel/coal', 'alltheores:uranium_ingot')
    event.add('quad:fuel/coal_block', 'alltheores:uranium_block')

    event.add('silentgear:grader_catalysts/tier4',
        'kubejs:catalyst_t4'
    )

    event.add('silentgear:grader_catalysts/tier5',
        'kubejs:catalyst_t5'
    )

    event.add('kubejs:soul_item',
        'quark:soul_bead',
        'iceandfire:ectoplasm',
        'eternal_starlight:soul_dew',
        'minecraft:ghast_tear',
        'bosses_of_mass_destruction:soul_star'
    )
    event.add('reveriefoundry:socket_fragments',
        'kubejs:broken_sulfuric_vial',
        'kubejs:sulfuric_vial'
    )

    event.add('c:ingots/cobalt',
        'kubejs:cobalt_ingot'
    )
    event.add('kubejs:ingots/fw_ingots',
        'alltheores:steel_ingot',
        'alltheores:invar_ingot',
        'alltheores:electrum_ingot',
        'alltheores:bronze_ingot',
        'alltheores:enderium_ingot',
        'alltheores:lumium_ingot',
        'alltheores:signalum_ingot',
        'alltheores:constantan_ingot',
        'alltheores:sulfur',
        'alltheores:iridium_ingot',
        'alltheores:uranium_ingot',
        'alltheores:tin_ingot',
        'alltheores:silver_ingot',
        'alltheores:platinum_ingot',
        'alltheores:osmium_ingot',
        'alltheores:nickel_ingot',
        'alltheores:lead_ingot',
        'alltheores:aluminum_ingot'
    )
    event.add('kubejs:level_1',
        'terra_curio:aglet',
        'terra_curio:hermes_boots',
        'terra_curio:flurry_boots',
        'terra_curio:sailfish_boots',
        'terra_curio:ice_skates',
        'terra_curio:cloud_in_a_bottle',
        'terra_curio:shiny_red_balloon',
        'terra_curio:blizzard_in_a_bottle',
        'terra_curio:sandstorm_in_a_bottle',
        'terra_curio:tsunami_in_a_bottle',
        'terra_curio:fart_in_a_jar',

        'terra_curio:climbing_claws',
        'terra_curio:shoe_spikes',

        'terra_curio:band_of_regeneration',
        'terra_curio:panic_necklace',
        'terra_curio:obsidian_skull',
        'terra_curio:cobalt_shield',
        'terra_curio:shackle',

        'terra_curio:feral_claws',
        'terra_curio:magic_quiver',

        'terra_curio:step_stool',
        'terra_curio:flashlight',
        'terra_curio:compass',
        'terra_curio:radar',
        'terra_curio:copper_watch',
        'terra_curio:tin_watch',
        'terra_curio:silver_watch',
        'terra_curio:tungsten_watch',
        'terra_curio:gold_watch',
        'terra_curio:platinum_watch'
    )
    event.add('kubejs:level_2',
        'terra_curio:obsidian_shield',
        'terra_curio:dunerider_boots',
        'terra_curio:water_walking_boots',
        'terra_curio:obsidian_horseshoe',
        'terra_curio:lucky_horseshoe',
        'terra_curio:flipper',
        'terra_curio:frog_leg',
        'terra_curio:frog_flipper',
        'terra_curio:diving_gear',
        'terra_curio:jellyfish_diving_gear',
        'terra_curio:arctic_diving_gear',
        'terra_curio:inner_tube',
        'terra_curio:rocket_boots',

        'terra_curio:cloud_in_a_balloon',
        'terra_curio:blizzard_in_a_balloon',
        'terra_curio:sandstorm_in_a_balloon',
        'terra_curio:fart_in_a_balloon',
        'terra_curio:honey_balloon',
        'terra_curio:balloon_pufferfish',
        'terra_curio:blue_horseshoe_balloon',
        'terra_curio:white_horseshoe_balloon',
        'terra_curio:yellow_horseshoe_balloon',
        'terra_curio:green_horseshoe_balloon',
        'terra_curio:pink_horseshoe_balloon',
        'terra_curio:amber_horseshoe_balloon',
        'terra_curio:sharkron_balloon',

        'terra_curio:anklet_of_the_wind',
        'terra_curio:magiluminescence',
        'terra_curio:obsidian_rose',
        'terra_curio:lava_charm',
        'terra_curio:shield_of_cthulhu',
        'terra_curio:jellyfish_necklace',
        'terra_curio:bee_cloak',
        'terra_curio:honey_comb',
        'terra_curio:flesh_knuckles',
        'terra_curio:worm_scarf',
        'terra_curio:brain_of_confusion',
        'terra_curio:royal_gel',

        'terra_curio:depth_meter',
        'terra_curio:stopwatch',
        'terra_curio:life_form_analyzer',
        'terra_curio:tally_counter',
        'terra_curio:metal_detector',
        'terra_curio:dps_meter'
    ),

        event.add('kubejs:level_3',
            'terra_curio:lightning_boots',
            'terra_curio:frostspark_boots',
            'terra_curio:terraspark_boots',
            'terra_curio:spectre_boots',
            'terra_curio:obsidian_water_walking_boots',
            'terra_curio:lava_waders',
            'terra_curio:ambhipian_boots',
            'terra_curio:frog_gear',
            'terra_curio:frog_webbing',
            'terra_curio:flying_carpet',

            'terra_curio:paladins_shield',
            'terra_curio:frozen_shield',
            'terra_curio:hero_shield',
            'terra_curio:star_cloak',
            'terra_curio:sweetheart_necklace',
            'terra_curio:star_veil',
            'terra_curio:cross_necklace',
            'terra_curio:frozen_turtle_shell',

            'terra_curio:power_glove',
            'terra_curio:mechanical_glove',
            'terra_curio:fire_gauntlet',
            'terra_curio:berserkers_glove',
            'terra_curio:titan_glove',
            'terra_curio:ranger_emblem',
            'terra_curio:warrior_emblem',
            'terra_curio:sorcerer_emblem',
            'terra_curio:avenger_emblem',
            'terra_curio:destroyer_emblem',
            'terra_curio:celestial_stone',
            'terra_curio:moon_stone',
            'terra_curio:sun_stone',
            'terra_curio:magma_stone',
            'terra_curio:ankh_charm',
            'terra_curio:molten_charm',
            'terra_curio:moon_charm',
            'terra_curio:obsidian_skull_rose',
            'terra_curio:molten_skull_rose',
            'terra_curio:stalkers_quiver',
            'terra_curio:molten_quiver',
            'terra_curio:bone_glove',
            'terra_curio:shark_tooth_necklace',
            'terra_curio:stinger_necklace',
            'terra_curio:putrid_scent',

            'terra_curio:fast_clock',
            'terra_curio:trifold_map',
            'terra_curio:nutrient_solution',
            'terra_curio:holy_water',
            'terra_curio:energy_bar',
            'terra_curio:searchlight',
            'terra_curio:bezoar',
            'terra_curio:vitamins',
            'terra_curio:hand_warmer',
            'terra_curio:detoxification_capsule',
            'terra_curio:blindfold',
            'terra_curio:ancient_chisel',
            'terra_curio:hand_drill',
            'terra_curio:toolbelt',
            'terra_curio:toolbox',
            'terra_curio:extendo_grip',
            'terra_curio:brick_layer',
            'terra_curio:portable_cement_mixer',
            'terra_curio:tiger_climbing_gear',
            'terra_curio:magma_skull'
        ),

        event.add('kubejs:level_4',
            'terra_curio:bundle_of_horseshoe_balloons',
            'terra_curio:bundle_of_balloons',
            'terra_curio:ankh_shield',
            'terra_curio:celestial_shell',
            'terra_curio:moon_shell',
            'terra_curio:neptunes_shell',
            'terra_curio:soaring_insignia',
            'terra_curio:celestial_starboard',
            'terra_curio:fairy_boots',
            'terra_curio:flower_boots',
            'terra_curio:master_ninja_gear',
            'terra_curio:recon_scope',
            'terra_curio:sniper_scope',
            'terra_curio:rifle_scope',
            'terra_curio:shiny_stone',
            'terra_curio:hand_of_creation',
            'terra_curio:gravity_globe',
            'terra_curio:architect_gizmo_pack',

            'terra_curio:cell_phone',
            'terra_curio:pda',
            'terra_curio:gps',
            'terra_curio:fish_finder',
            'terra_curio:weather_radio',
            'terra_curio:sextant',
            'terra_curio:fishermans_pocket_guide',
            'terra_curio:treasure_magnet',
            'terra_curio:the_plan',

            'terra_curio:explorers_equipment',
            'terra_curio:tabi',
            'terra_curio:black_belt',
            'terra_curio:eye_of_the_golem',
            'terra_curio:goblin_tech',
            'terra_curio:hive_pack',
            'terra_curio:angler_earring',
            'kubejs:angler_earring',
            'terra_curio:magic_mirror',
            'terra_curio:rek_3000',
            'terra_curio:base_point',

            'terra_curio:shot_put'

        )

    event.removeAllTagsFrom([
        'silentgems:garnet',
        'silentgems:ruby',
        'alltheores:zinc_ingot',
        'alltheores:brass_ingot',
        'alltheores:brass_nugget',
        'silentgems:tanzanite',
        'silentgems:aquamarine',
        'silentgems:pearl',
        'alltheores:sapphire',
        'silentgems:sapphire',
        'alltheores:sapphire_block',
        'silentgems:sapphire_block',
        'silentgems:garnet',
        'silentgems:peridot',
        'silentgems:peridot_block',
        'silentgems:ruby_block',
        'silentgems:ruby',
        'alltheores:ruby',
        'silentgems:rose_quartz',
        'alltheores:brass_block',
        'alltheores:netherite_plate',
        'alltheores:netherite_dust',
        'alltheores:netherite_rod',
        'silentgear:bronze_ingot'])
    event.remove('c:plates/enderium', 'alltheores:enderium_plate')
    event.remove('c:plates', 'alltheores:enderium_plate')
    event.add('quad:fuel/hanging_sign', 'kubejs:coal_dust')
    event.add('quad:immune/fire',
        'kubejs:soul_of_night',
        'kubejs:soul_of_light',
        'kubejs:ruinous_soul',
        'kubejs:ashes_of_calamity',
        'kubejs:glimmering_golden_amber',
        'kubejs:necroplasm',
        'kubejs:raw_netherite_ingot',
        'kubejs:scrap_clump',
        'kubejs:netherite_wire',
        'kubejs:netherite_plate',
        'kubejs:netherite_rod',
        'kubejs:estalt_ingot')
    event.add('kubejs:dream_focus', 'kubejs:magic_fluorite')
    event.add('c:ingots/tungsten', 'kubejs:tungsten_ingot')
    event.add('c:tools/scythe', 'silentgear:sickle')
    event.add('c:tools/melee_weapon', 'silentgear:sickle')
    event.add('minecraft:enchantable/vanishing', 'silentgear:sickle')
    /*
        event.add('malum:scythe', 'silentgear:sickle')
        event.add('malum:enchantable/animated', 'silentgear:sickle')
        event.add('malum:enchantable/haunted', 'silentgear:sickle')
        event.add('malum:magic_capbale_weapon', 'silentgear:sickle')
        event.add('malum:enchantable/ascension', 'silentgear:sickle')
        event.add('malum:enchantable/durability', 'silentgear:sickle')
        event.add('malum:enchantable/rebound', 'silentgear:sickle')
        event.add('malum:soulhunters_treasure', 'silentgear:sickle')
        event.add('malum:soulwoven_pouch_efficient', 'silentgear:sickle')
        event.add('malum:enchantable/spirit_plunder', 'silentgear:sickle')
        event.add('malum:magic_capable_weapon', 'silentgear:sickle')
        event.add('malum:soul_shatter_capable_weapon', 'silentgear:sickle')
    */
    event.add('c:gems/aquamarine', 'kubejs:aquamarine')
    event.add('c:gems/tanzanite', 'kubejs:tanzanite')
    event.add('c:gems/rose_quartz', 'create:rose_quartz')
    event.add('c:gems/pearl', 'kubejs:pearl')
    event.add('c:gems/ruby', 'kubejs:ruby')
    event.add('c:gems/topaz', 'kubejs:topaz')

    event.remove('curios:sheath', 'hazennstuff:galvanized_sheath')
    event.add('curios:accessory', 'hazennstuff:galvanized_sheath')


    event.add('kubejs:blood',
        'irons_spellbooks:blood'
    )
    event.add('c:foods/raw_meat', 'kubejs:raw_manflesh')

    event.add('kubejs:night_vision',
        'fruitsdelight:blueberry',
        'minecraft:golden_carrot'
    )
    //event.add('c:gems/garnet', 'kubejs:garnet')
    event.add('farmersdelight:enchantable/knife', 'silentgear:knife')
    event.add('c:tools/knife', 'silentgear:knife')
    event.add('farmersdelight:tools/knives', 'silentgear:knife')
    event.add('c:plates', 'kubejs:netherite_plate')
    event.add('c:plates/netherite', 'kubejs:netherite_plate')
    event.add('c:dusts', 'kubejs:netherite_dust')
    event.add('c:dusts/netherite', 'kubejs:netherite_dust')
    event.add('c:rods', 'kubejs:netherite_rod')
    event.add('c:rods/netherite', 'kubejs:netherite_rod')
    event.add('minecraft:axes', 'kubejs:crowbar')
    event.add('minecraft:pickaxes', 'kubejs:crowbar')
    //gobber
    event.add('kubejs:gobber2_ore',
        'gobber2:gobber2_ore_deepslate',
        'gobber2:gobber2_ore',
        'gobber2:gobber2_lucky_block',
        'gobber2:gobber2_lucky_block_deepslate',
        'gobber2:gobber2_block',
        'gobber2:gobber2_glass',
        'gobber2:gobber2_ore_nether',
        'gobber2:gobber2_lucky_block_nether',
        'gobber2:gobber2_block_nether'
    )
    //gobber_nether
    event.add('kubejs:gobber2_ore_nether',
        'gobber2:gobber2_ore_deepslate',
        'gobber2:gobber2_ore',
        'gobber2:gobber2_lucky_block',
        'gobber2:gobber2_lucky_block_deepslate',
        'gobber2:gobber2_block',
        'gobber2:gobber2_glass',
        'gobber2:gobber2_ore_nether',
        'gobber2:gobber2_lucky_block_nether',
        'gobber2:gobber2_block_nether',
        'gobber2:gobber2_ore_end',
        'gobber2:gobber2_lucky_block_end',
        'gobber2:gobber2_block_end'
    )
    //gobber_end
    event.add('kubejs:gobber2_ore_end',
        'gobber2:gobber2_ore_end',
        'gobber2:gobber2_lucky_block_end',
        'gobber2:gobber2_block_end'
    )
    //food
    event.add('kubejs:foods/emergency_sanity_elixir_a', 'kubejs:emergency_sanity_elixir_a')
    event.add('kubejs:foods/emergency_sanity_elixir_b', 'kubejs:emergency_sanity_elixir_b')
    event.add('kubejs:foods/emergency_sanity_elixir_y', 'kubejs:emergency_sanity_elixir_y')
    //ore
    event.add('minecraft:iron_ores',
        'natures_spirit:chert_iron_ore',
        'eternal_starlight_vo:grimstone_iron_ore',
        'eternal_starlight_vo:haze_ice_iron_ore',
        'eternal_starlight_vo:eternal_ice_iron_ore',
        'silentgear:crimson_iron_ore',
        'silentgear:blackstone_crimson_iron_ore',
        'eternal_starlight_vo:voidstone_iron_ore'
    );

    event.add('minecraft:iron_ores',
        'natures_spirit:chert_iron_ore',
        'eternal_starlight_vo:grimstone_iron_ore',
        'eternal_starlight_vo:haze_ice_iron_ore',
        'eternal_starlight_vo:eternal_ice_iron_ore',
        'silentgear:crimson_iron_ore',
        'silentgear:blackstone_crimson_iron_ore',
        'eternal_starlight_vo:voidstone_iron_ore'
    );
    event.add(
        'kubejs:perfusion',
        'kubejs:adamanite_ingot',
        'kubejs:brass_ingot',
        'kubejs:bronze_ingot',
        'kubejs:invar_ingot',
        'kubejs:nickel_ingot',
        'kubejs:osmium_ingot',
        'kubejs:platinum_ingot',
        'kubejs:tin_ingot',
        'kubejs:zinc_ingot'
    )

    event.add(
        'kubejs:repeat/spider_fang',
        'alshanex_familiars:spider_fang',
        'hazennstuff:spider_fang'
    )

    event.add(
        'kubejs:bort',
        'silentgems:chaos_essence',
        'silentgear:bort'
    )
    event.add(
        'kubejs:coral',
        'minecraft:brain_coral_block',
        'minecraft:horn_coral_block',
        'minecraft:tube_coral_block',
        'minecraft:bubble_coral_block',
        'minecraft:horn_coral_fan',
        'minecraft:fire_coral_fan',
        'minecraft:bubble_coral_fan',
        'minecraft:brain_coral_fan',
        'minecraft:tube_coral_fan',
        'minecraft:horn_coral',
        'minecraft:fire_coral',
        'minecraft:bubble_coral',
        'minecraft:brain_coral'
    )

    event.add(
        'kubejs:evil_materials',
        'hazennstuff:shadow_scale',
        'kubejs:blood_orb'
    )

    event.add(
        'kubejs:runewood_sapling',
        'malum:azure_runewood_sapling',
        'malum:runewood_sapling'
    )

    event.add('kubejs:repeat/nether_star_fragment',
        'silentgear:nether_star_fragment',
        'hazennstuff:nether_star_fragment'
    );


})

ServerEvents.tags('block', event => {
    event.add('minecraft:iron_ores',
        'natures_spirit:chert_iron_ore',
        'eternal_starlight_vo:grimstone_iron_ore',
        'eternal_starlight_vo:haze_ice_iron_ore',
        'eternal_starlight_vo:eternal_ice_iron_ore',
        'silentgear:crimson_iron_ore',
        'silentgear:blackstone_crimson_iron_ore',
        'eternal_starlight_vo:voidstone_iron_ore'
    );

    event.add('malum:runewood_logs',
        'malum:runewood_log',
        'malum:exposed_runewood_log',
        'malum:stripped_runewood_log',
        'malum:revealed_runewood_log'
    );


});



ServerEvents.tags('item', event => {
    event.add('kubejs:metal_shining',
        // 金属光泽效果
    )

    event.add('kubejs:rim_light',
        // 边缘光效果
    )

    event.add('kubejs:ripples',
        // 涟漪效果
    )

    event.add('kubejs:sonar',
        // 声纳效果
    )

    event.add('kubejs:stars',
        // 星星效果
    )

    event.add('kubejs:cinder',
        'powerful_dummy:dummy_stand'

        // 灰烬效果
    )

    event.add('kubejs:echo',
        'transmog:void_fragment',
        'transmog:transmogrification_table'
        // 回声效果
    )

    event.add('kubejs:galaxy',
        // 银河效果
    )

    event.add('kubejs:nebula',
        // 星云效果
    )

    event.add('kubejs:spiral',
        // 螺旋效果
    )

    event.add('kubejs:white_dust',

        // 白色星光效果
    )

    event.add('kubejs:magic_orbs',
        // 魔法球效果
    )

    // 等级边框
    event.add('kubejs:level_1',
        // 等级1
    )

    event.add('kubejs:level_2',
        'kubejs:dps_meter_update'
        // 等级2
    )

    event.add('kubejs:level_3',
        // 等级3
    )

    event.add('kubejs:level_4',
        // 等级4
    )
})

ServerEvents.tags('block', event => {
    event.add('reveriefoundry:no_digging', [
        'hazennstuff:runestone_slag',
        'hazennstuff:zenalite_voidstone_ore',
        'hazennstuff:zenalite_abysslate_ore',
        'hazennstuff:zenalite_end_stone_ore',
        'hazennstuff:zenalite_stone_ore',
        'hazennstuff:dreadstone_ore',
        'hazennstuff:chlorophyte_ore',
        'gobber2:gobber2_ore_end',
        'gobber2:gobber2_ore_nether',
        'gobber2:gobber2_ore_deepslate',
        'gobber2:gobber2_ore',
        'hazennstuff:solar_core_netherrack_ore',
        'hazennstuff:solar_core_blackstone_ore'
    ]);

    event.add('c:ores', [
        'hazennstuff:runestone_slag',
        'hazennstuff:zenalite_voidstone_ore',
        'hazennstuff:zenalite_abysslate_ore',
        'hazennstuff:zenalite_end_stone_ore',
        'hazennstuff:zenalite_stone_ore',
        'hazennstuff:dreadstone_ore',
        'hazennstuff:chlorophyte_ore',
        'hazennstuff:solar_core_netherrack_ore',
        'hazennstuff:solar_core_blackstone_ore'
    ]);

    event.add('reveriefoundry:stageores', [
        'hazennstuff:runestone_slag',
        'hazennstuff:zenalite_voidstone_ore',
        'hazennstuff:zenalite_abysslate_ore',
        'hazennstuff:zenalite_end_stone_ore',
        'hazennstuff:zenalite_stone_ore',
        'hazennstuff:dreadstone_ore',
        'hazennstuff:chlorophyte_ore',
        'hazennstuff:solar_core_netherrack_ore',
        'hazennstuff:solar_core_blackstone_ore',
        'gobber2:gobber2_ore_end',
        'gobber2:gobber2_ore_nether',
        'gobber2:gobber2_ore_deepslate',
        'gobber2:gobber2_ore'

    ]);
});

ServerEvents.tags('entity_type', event => {
    event.add('c:boss', [
        "cataclysm:ignis",
        "cataclysm:the_leviathan",
        "cataclysm:ancient_remnant",
        "cataclysm:maledictus",
        "cataclysm:scylla",
        "cataclysm:the_harbinger",
        "cataclysm:ender_guardian",
        "cataclysm:netherite_monstrosity",
        "minecraft:wither",
        "minecraft:ender_dragon",
        "bosses_of_mass_destruction:gauntlet",
        "bosses_of_mass_destruction:lich",
        "bosses_of_mass_destruction:obsidilith",
        "bosses_of_mass_destruction:void_blossom",
        "irons_spellbooks:fire_boss",
        "terra_entity:dungeon_guardian",
        "terra_entity:skeletron",
        "terra_entity:king_slime",
        "terra_entity:eye_of_cthulhu",
        "terra_entity:brain_of_cthulhu",
        "terra_entity:queen_bee",
        "irons_spellbooks:dead_king",
        "darkdoppelganger:dark_doppelganger"
    ]);
})