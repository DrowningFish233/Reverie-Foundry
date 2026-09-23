// priority: 999
//v2
// 材料列表
global.new_materials = [
    { id: 'blood_orb', maxStackSize: 64, rarity: 'rare', texture: "kubejs:item/misc/blood_orb" },
    { id: 'gold_coin', maxStackSize: 64, rarity: 'rare', texture: "kubejs:item/coins/gold_coin" },
    { id: 'raw_netherite_ingot', maxStackSize: 64 },
    { id: 'scrap_clump', maxStackSize: 64 },
    { id: 'netherite_wire', maxStackSize: 64 },
    { id: 'netherite_scrap_dust', maxStackSize: 64 },
    { id: 'netherite_rod', maxStackSize: 64 },
    { id: 'netherite_plate', maxStackSize: 64 },
    { id: 'netherite_nugget', maxStackSize: 64 },
    { id: 'netherite_dust', maxStackSize: 64 },
    { id: 'coal_dust', maxStackSize: 64 },
    { id: 'meat_ingots', maxStackSize: 64 },
    { id: 'meat', maxStackSize: 64 },
    { id: 'unholy_essence', maxStackSize: 16 },
    { id: 'sin', maxStackSize: 1 },
    { id: 'mimicream', maxStackSize: 32 },
    { id: 'mark', maxStackSize: 64 },
    { id: 'soul', maxStackSize: 1 },
    { id: 'low_hydra_heart', maxStackSize: 1 },
    { id: 'scroll_of_friendship', maxStackSize: 4 },
    { id: 'dragon_upgrade_smithing_template', maxStackSize: 1 },
    { id: 'magic_fluorite', maxStackSize: 8 },
    { id: 'biomass_liquid', maxStackSize: 32 },
    { id: 'atalphaite', maxStackSize: 32 },
    { id: 'limpid_spirit', maxStackSize: 32, rarity: 'rare' },
    { id: 'the_error', maxStackSize: 64 },
    { id: 'corruption', maxStackSize: 64 },
    { id: 'drowning_fish', maxStackSize: 1, rarity: 'epic' },
    { id: 'fish', maxStackSize: 1, rarity: 'epic' },
    { id: 'lava_bible', maxStackSize: 4, rarity: 'rare' },
    { id: 'material_patchouli_generator', maxStackSize: 1, rarity: 'epic' },
    { id: 'trait_fish', maxStackSize: 1, rarity: 'epic' },
    { id: 'soul_of_night', maxStackSize: 32, rarity: 'rare', texture: "kubejs:item/misc/soul_of_night" },
    { id: 'soul_of_light', maxStackSize: 32, rarity: 'rare', texture: "kubejs:item/misc/soul_of_light" },
    { id: 'necroplasm', maxStackSize: 48, rarity: 'rare', texture: "kubejs:item/misc/necroplasm" },
    { id: 'ruinous_soul', maxStackSize: 32, rarity: 'rare', texture: "kubejs:item/misc/ruinous_soul" },
    { id: 'ashes_of_calamity', maxStackSize: 32, rarity: 'rare', texture: "kubejs:item/misc/ashes_of_calamity" },
    { id: 'gold_crown', maxStackSize: 1, rarity: 'epic' },
    { id: 'glimmering_golden_amber', maxStackSize: 16, rarity: 'rare', texture: "kubejs:item/misc/glimmering_golden_amber" },
    { id: 'summon_gauntlet', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_lich', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_obsidilith', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_void_blossom', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_fire_boss', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_dead_king', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_amethyst_crab', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_ignis', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_the_leviathan', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_ancient_remnant', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_maledictus', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_scylla', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_the_harbinger', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_ender_guardian', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_netherite_monstrosity', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_starlight_golem', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'summon_lunar_monstrosity', maxStackSize: 1, texture: "kubejs:item/misc/summon_boss" },
    { id: 'randomweapon', maxStackSize: 1 },
    { id: 'summon_frostling_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_mage_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_archmage_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_summoner_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_necromancer_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_hunter_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_druid_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_illusionist_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_scorcher_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_cleric_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_plague_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_bard_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'summon_dragon_warrior_pet', maxStackSize: 1, texture: "kubejs:item/misc/summon_pet" },
    { id: 'eye_of_ancient_city_located', maxStackSize: 64, texture: "kubejs:item/misc/eye_of_ancient_city_located" },
    { id: 'eye_of_dragon_cave_located', maxStackSize: 64, texture: "kubejs:item/misc/eye_of_dragon_cave_located" },
    { id: 'eye_of_weeping_well_located', maxStackSize: 64, texture: "kubejs:item/misc/eye_of_weeping_well_located" },

    { id: 'eye_of_fortress_located', maxStackSize: 64, texture: "kubejs:item/misc/eye_of_fortress_located" },
    { id: 'eye_of_ancient_battleground_located', maxStackSize: 64, texture: "kubejs:item/misc/eye_of_ancient_battleground_located" },
    { id: 'eye_of_monument_located', maxStackSize: 64, texture: "kubejs:item/misc/eye_of_monument_located" },
    { id: 'eye_of_furled_citadel_located', maxStackSize: 64, texture: "kubejs:item/misc/eye_of_furled_citadel_located" },
    { id: 'luminofish_ink_sac', maxStackSize: 32, texture: "kubejs:item/misc/luminofish_ink_sac" },
    { id: 'eye_of_starlight_portal_located', maxStackSize: 64, texture: "kubejs:item/misc/eye_of_starlight_portal" },
    { id: 'scoria_ingot', maxStackSize: 64, rarity: 'uncommon', texture: "kubejs:item/ingots/scoria_ingot" },
    { id: 'frigid_ingot', maxStackSize: 64, rarity: 'uncommon', texture: "kubejs:item/ingots/frigid_ingot" },
    { id: 'perennial_ingot', maxStackSize: 64, rarity: 'rare', texture: "kubejs:item/ingots/perennial_ingot" },
    { id: 'uelibloom_ingot', maxStackSize: 64, rarity: 'rare', texture: "kubejs:item/ingots/uelibloom_ingot" },
    { id: 'life_alloy', maxStackSize: 64, rarity: 'epic', texture: "kubejs:item/ingots/life_alloy" },
    { id: 'catalyst_t4', maxStackSize: 64, rarity: 'epic', texture: "kubejs:item/misc/catalyst_t4" },
    { id: 'catalyst_t5', maxStackSize: 64, rarity: 'epic', texture: "kubejs:item/misc/catalyst_t5" },
    { id: 'sulfuric_vial', maxStackSize: 1, texture: "kubejs:item/misc/sulfuric_vial" },
    { id: 'broken_sulfuric_vial', maxStackSize: 1, texture: "kubejs:item/misc/broken_sulfuric_vial" },
    { id: 'core_suppression_unit_form_one', maxStackSize: 8, rarity: 'uncommon', texture: "kubejs:item/misc/core_suppression_unit_form_one" },
    { id: 'core_suppression_unit_form_two', maxStackSize: 8, rarity: 'uncommon', texture: "kubejs:item/misc/core_suppression_unit_form_two" },
    { id: 'core_suppression_unit_form_three', maxStackSize: 8, rarity: 'uncommon', texture: "kubejs:item/misc/core_suppression_unit_form_three" },
    { id: 'remove_armor', maxStackSize: 4, rarity: 'uncommon', texture: "kubejs:item/misc/remove_armor" },
    { id: 'simple_rib', maxStackSize: 64, texture: "kubejs:item/material/simple_rib" },
    { id: 'living_material', maxStackSize: 64, texture: "kubejs:item/material/living_material" },
    { id: 'proliferating_flesh', maxStackSize: 64, texture: "kubejs:item/material/proliferating_flesh" },
    { id: 'dense_muscle', maxStackSize: 64, texture: "kubejs:item/material/dense_muscle" },
    { id: 'congealed_flesh', maxStackSize: 64, texture: "kubejs:item/material/congealed_flesh" },
    { id: 'mutated_flesh', maxStackSize: 64, texture: "kubejs:item/material/mutated_flesh" },
    { id: 'swollen_liver', maxStackSize: 64, texture: "kubejs:item/material/swollen_liver" },
    { id: 'malignant_tumor', maxStackSize: 64, texture: "kubejs:item/material/malignant_tumor" },
    { id: 'evolving_seed', maxStackSize: 64, texture: "kubejs:item/material/evolving_seed" },
    { id: 'dimensional_stabilizer', maxStackSize: 8, texture: "kubejs:item/misc/dimensional_stabilizer" },
    { id: 'dimensional_ripper', maxStackSize: 8, texture: "kubejs:item/misc/dimensional_ripper" },
    { id: 'rift_probe', maxStackSize: 8, texture: "kubejs:item/misc/rift_probe" },
    { id: 'random_accessory_pouch', maxStackSize: 64, texture: "kubejs:item/misc/random_accessory_pouch" },
    { id: 'random_accessory_pouch_t2', maxStackSize: 64, texture: "kubejs:item/misc/random_accessory_pouch_t2" },
    { id: 'random_accessory_pouch_t3', maxStackSize: 64, texture: "kubejs:item/misc/random_accessory_pouch_t3" },
    { id: 'random_accessory_pouch_t4', maxStackSize: 64, texture: "kubejs:item/misc/random_accessory_pouch_t4" },
    { id: 'gluttonous_authority', maxStackSize: 1, texture: "kubejs:item/misc/gluttonous_authority" },
    { id: 'ancient_remnant_bone', maxStackSize: 64, texture: "kubejs:item/rods/ancient_remnant_bone" },






];

StartupEvents.registry('item', event => {
    for (let item of global.new_materials) {
        let itemEvent = event.create(item.id)
            .maxStackSize(item.maxStackSize);
        // 如果有稀有度设置
        if (item.rarity) {
            itemEvent.rarity(item.rarity);
        }
        // 如果有材质设置
        if (item.texture) {
            itemEvent.texture(item.texture);
        }
    }
});

StartupEvents.registry('item', event => {
    // 砖块类
    const bricks = [
        'blackstone_brick', 'burt_brick', 'concrete_brick', 'deepslate_brick',
        'endstone_brick', 'fly_ash_brick', 'harden_brick', 'mud_brick',
        'prismarine_brick', 'raw_clay_brick', 'red_nether_brick', 'sand_brick',
        'smooth_stone_brick', 'stone_brick'
    ];

    bricks.forEach(brick => {
        event.create(brick)
            .texture(`kubejs:item/bricks/${brick}`)
            .maxStackSize(64);
    });

    // 锭类
    const ingots = [
        'abiding_alloy_ingot', 'achroous_ingot', 'adamanite_ingot', 'acril_ingot',
        'aero_steel_ingot', 'aluminum_ingot', 'animated_steel_ingot', 'berkelium_ingot',
        'boron_ingot', 'brass_ingot', 'bronze_ingot', 'calamatium_ingot',
        'carbonatite_ingot', 'celeslar_ingot', 'chalyblux_ingot', 'chromium_ingot',
        'cobalt_ingot', 'cosmos_aurora_ingot', 'dark_cryopla_ingot', 'echo_ingot',
        'electrum_ingot', 'enlighted_gold_ingot', 'estalt_ingot', 'europium_ingot',
        'frigidite_ingot', 'invar_ingot', 'iridium_ingot', 'isovol_ingot',
        'lead_ingot', 'lunium_nova_ingot', 'lustful_haze_alloy', 'luteous_ingot',
        'magmanite_ingot', 'magnesium_ingot', 'magnetite_ingot', 'midnight_abyssal_ingot',
        'mythril_ingot', 'neptunium_ingot', 'nickel_ingot', 'nlatstone_ingot',
        'osmium_ingot', 'palladium_ingot', 'platinum_ingot', 'plumbumanite_ingot',
        'plutonium_ingot', 'polonium_ingot', 'rhexis_ingot', 'rhodium_ingot',
        'scandium_ingot', 'scepbo_ingot', 'silicon_ingot', 'silver_ingot',
        'solimrith_ingot', 'starinium_ingot', 'starlight_mythril_ingot', 'steel_ingot',
        'stellar_ingot', 'strontium_ingot', 'tellurium_ingot', 'thlanium_ingot',
        'terraulite_ingot', 'thorium_ingot', 'thulium_ingot', 'tin_ingot',
        'titanium_ingot', 'tungsten_ingot', 'ultimate_ingot', 'unstable_luminescence_ingot',
        'uranium_ingot', 'vibranite_ingot', 'viculeam_ingot', 'void_ingot',
        'vorant_ingot', 'xelkive_ingot', 'xeproda_ingot', 'yttrium_ingot',
        'zapolgium_ingot', 'zinc_ingot', 'zirconium_ingot'
    ];

    ingots.forEach(ingot => {
        event.create(ingot)
            .texture(`kubejs:item/ingots/${ingot.replace('_ingot', '')}`)
            .maxStackSize(64);
    });

    // 宝石类
    const gems = [
        'alexandrite', 'amber', 'ametrine', 'aquamarine', 'bismuthgems',
        'citrine', 'garnet', 'jade', 'kunzite', 'moonstone', 'opal',
        'pearl', 'peridot', 'rose_quartz', 'ruby', 'sapphire', 'spinel',
        'sunstone', 'tanzanite', 'topaz', 'tourmaline', 'turquoise', 'ultranium_gem'
    ];

    gems.forEach(gem => {
        event.create(gem)
            .texture(`kubejs:item/gems/${gem}`)
            .maxStackSize(64);
    });

    // 粒类
    const nuggets = [
        'tellurium_nugget', 'europium_nugget', 'titanium_nugget'
    ];

    nuggets.forEach(nugget => {
        let nuggetsName = nugget.replace('_nugget', '');
        event.create(nugget)
            .texture(`kubejs:item/nuggets/${nuggetsName}`)
            .maxStackSize(64);
    });

    // 特殊物品/其他物品
    event.create('starfury', 'sword')
        .tier('diamond')
        .attackDamageBaseline(22.0);

});


StartupEvents.registry('item', event => {
    event.create('moonpools')
        .texture("kubejs:item/gems/moonpools")
        .rarity('epic')
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER);
});