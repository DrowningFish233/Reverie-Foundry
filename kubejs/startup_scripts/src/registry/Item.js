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
    { id: 'luminofish_ink_sac', maxStackSize: 32, texture: "kubejs:item/misc/luminofish_ink_sac" },
    { id: 'eye_of_starlight_portal_located', maxStackSize: 1, texture: "kubejs:item/misc/eye_of_starlight_portal" },
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


    { id: 'random_accessory_pouch', maxStackSize: 64, texture: "kubejs:item/misc/random_accessory_pouch" },
    { id: 'dimensional_stabilizer', maxStackSize: 8, texture: "kubejs:item/misc/dimensional_stabilizer" },
    { id: 'dimensional_ripper', maxStackSize: 8, texture: "kubejs:item/misc/dimensional_ripper" },
    { id: 'rift_probe', maxStackSize: 8, texture: "kubejs:item/misc/rift_probe" }



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

    // 宝石细胞类
    const gemCells = [
        'alexandrite_cell', 'amber_cell', 'amethyst_cell', 'ametrine_cell',
        'aquamarine_cell', 'bismuth_cell', 'citrine_cell', 'diamond_cell',
        'emerald_cell', 'garnet_cell', 'jade_cell', 'kunzite_cell',
        'lapis_cell', 'moonstone_cell', 'opal_cell', 'pearl_cell',
        'peridot_cell', 'prismarine_cell', 'quartz_cell', 'rose_quartz_cell',
        'ruby_cell', 'sapphire_cell', 'spinel_cell', 'sunstone_cell',
        'tanzanite_cell', 'topaz_cell', 'tourmaline_cell', 'turquoise_cell',
        'ultranium_gem_cell'
    ];

    gemCells.forEach(cell => {
        let gemName = cell.replace('_cell', '');
        event.create(cell)
            .texture(`kubejs:item/cells/${gemName}`)
            .maxStackSize(64);
    });

    // 粉尘类
    const dusts = [
        'acril_dust', 'cosmos_aurora_dust', 'adamanite_dust', 'aluminum_dust',
        'boron_dust', 'brass_dust', 'bronze_dust', 'celeslar_dust',
        'chalyblux_dust', 'abiding_alloy_dust', 'chromium_dust', 'dark_cryopla_dust',
        'echo_dust', 'electrum_dust', 'europium_dust', 'frigidite_dust',
        'invar_dust', 'iridium_dust', 'lead_dust', 'lunium_nova_dust',
        'magnesium_dust', 'midnight_abyssal_dust', 'mythril_dust', 'nickel_dust',
        'nlatstone_dust', 'osmium_dust', 'palladium_dust', 'platinum_dust',
        'plumbumanite_dust', 'rhodium_dust', 'silicon_dust', 'scandium_dust',
        'silver_dust', 'solimrith_dust', 'starlight_mythril_dust', 'steel_dust',
        'stellar_dust', 'thorium_dust', 'thlanium_dust', 'tellurium_dust',
        'thulium_dust', 'tin_dust', 'titanium_dust', 'tungsten_dust',
        'uranium_dust', 'vibranite_dust', 'viculeam_dust', 'void_dust',
        'xelkive_dust', 'xeproda_dust', 'yttrium_dust', 'zapolgium_dust',
        'zinc_dust', 'zirconium_dust'
    ];

    dusts.forEach(dust => {
        let dustName = dust.replace('_dust', '');
        event.create(dust)
            .texture(`kubejs:item/dust/${dustName}`)
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

    // 板类
    const plates = [
        'abiding_alloy_plate', 'acril_plate', 'adamanite_plate', 'aluminum_plate',
        'boron_plate', 'brass_plate', 'bronze_plate', 'celeslar_plate',
        'chalyblux_plate', 'cobalt_plate', 'cosmos_aurora_plate', 'dark_cryopla_plate',
        'echo_plate', 'electrum_plate', 'estalt_plate', 'europium_plate',
        'frigidite_plate', 'invar_plate', 'lead_plate', 'lunium_nova_plate',
        'midnight_abyssal_plate', 'mythril_plate', 'nickel_plate', 'nlatstone_plate',
        'osmium_plate', 'palladium_plate', 'platinum_plate', 'plumbumanite_plate',
        'rhodium_plate', 'scandium_plate', 'silicon_plate', 'silver_plate',
        'solimrith_plate', 'starlight_mythril_plate', 'steel_plate', 'stellar_plate',
        'tellurium_plate', 'thlanium_plate', 'thorium_plate', 'thulium_plate',
        'tin_plate', 'titanium_plate', 'tungsten_plate', 'uranium_plate',
        'vibranite_plate', 'viculeam_plate', 'void_plate', 'xelkive_plate',
        'xeproda_plate', 'yttrium_plate', 'zapolgium_plate', 'zinc_plate', 'zirconium_plate'
    ];

    plates.forEach(plate => {
        let plateName = plate.replace('_plate', '');
        event.create(plate)
            .texture(`kubejs:item/plates/${plateName}`)
            .maxStackSize(64);
    });

    // 线类
    const wires = [
        'acril_wire', 'boron_wire', 'brass_wire', 'bronze_wire', 'celeslar_wire',
        'chalyblux_wire', 'cosmos_aurora_wire', 'dark_cryopla_wire', 'echo_wire',
        'electrum_wire', 'estalt_wire', 'europium_wire', 'frigidite_wire',
        'invar_wire', 'lead_wire', 'lunium_nova_wire', 'midnight_abyssal_wire',
        'mythril_wire', 'nickel_wire', 'nlatstone_wire', 'osmium_wire',
        'palladium_wire', 'platinum_wire', 'plumbumanite_wire', 'rhodium_wire',
        'scandium_wire', 'silicon_wire', 'silver_wire', 'solimrith_wire',
        'starlight_mythril_wire', 'steel_wire', 'stellar_wire', 'tellurium_wire',
        'thlanium_wire', 'thorium_wire', 'thulium_wire', 'tin_wire',
        'titanium_wire', 'tungsten_wire', 'uranium_wire', 'vibranite_wire',
        'viculeam_wire', 'void_wire', 'xelkive_wire', 'xeproda_wire',
        'yttrium_wire', 'zapolgium_wire', 'zinc_wire', 'zirconium_wire'
    ];

    wires.forEach(wire => {
        let wireName = wire.replace('_wire', '');
        event.create(wire)
            .texture(`kubejs:item/wires/${wireName}`)
            .maxStackSize(64);
    });

    // 棍类
    const rods = [
        'abiding_alloy_rod', 'acril_rod', 'adamanite_rod', 'aluminum_rod',
        'boron_rod', 'brass_rod', 'bronze_rod', 'celeslar_rod',
        'chalyblux_rod', 'cobalt_rod', 'cosmos_aurora_rod', 'dark_cryopla_rod',
        'echo_rod', 'electrum_rod', 'estalt_rod', 'europium_rod',
        'frigidite_rod', 'invar_rod', 'lead_rod', 'lunium_nova_rod',
        'midnight_abyssal_rod', 'mythril_rod', 'nickel_rod', 'nlatstone_rod',
        'osmium_rod', 'palladium_rod', 'platinum_rod', 'plumbumanite_rod',
        'rhodium_rod', 'scandium_rod', 'silicon_rod', 'silver_rod',
        'solimrith_rod', 'starlight_mythril_rod', 'steel_rod', 'stellar_rod',
        'tellurium_rod', 'thlanium_rod', 'thorium_rod', 'thulium_rod',
        'tin_rod', 'titanium_rod', 'tungsten_rod', 'uranium_rod',
        'vibranite_rod', 'viculeam_rod', 'void_rod', 'xelkive_rod',
        'xeproda_rod', 'yttrium_rod', 'zapolgium_rod', 'zinc_rod', 'zirconium_rod'
    ];

    rods.forEach(rod => {
        let rodName = rod.replace('_rod', '');
        event.create(rod)
            .texture(`kubejs:item/rods/${rodName}`)
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
