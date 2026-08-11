LootJS.modifiers(event => {
    event.addEntityModifier([
        "minecraft:cow",
        "minecraft:pig",
        "minecraft:villager",
        "minecraft:sheep",
        "minecraft:trader_llama",
        "minecraft:player"
    ]).addLoot(LootEntry.of("kubejs:meat")
        .randomChance(0.5)
        .when(c => c.matchMainHand(ItemFilter.hasEnchantment("minecraft:looting")))
    );
    event.addEntityModifier([
        "minecraft:pillager",
        "minecraft:witch",
        "minecraft:illusioner",
        "minecraft:evoker",
        "minecraft:vindicator"]
    ).addLoot(LootEntry.of("kubejs:raw_manflesh")
        .randomChance(0.4)
    );

    event.addEntityModifier([
        "eternal_starlight:nightfall_spider"
    ]
    ).addLoot(LootEntry.of("hazennstuff:nightmare_fuel")
        .randomChance(0.4)
    );

    event.addEntityModifier([
        "minecraft:villager"
    ]).addLoot(LootEntry.of("kubejs:raw_manflesh")
        .randomChance(0.4)
    );

    event.addEntityModifier("minecraft:drowned")
        .addLoot(LootEntry.of("minecraft:trident")
            .randomChance(0.03)
            .matchWeather(true, true)
        );

    event.addEntityModifier([
        "minecraft:ender_dragon"
    ]).addLoot(LootEntry.of("kubejs:mimicream")
        .randomChance(0.6)
    );

    event.addEntityModifier([
        "bosses_of_mass_destruction:void_blossom"
    ]).addLoot(LootEntry.of("kubejs:miracle_fruit")
        .apply(item => {
            item.setCount(1);
        })
        .randomChance(0.5)
    ).addLoot(LootEntry.of("kubejs:bluestar")
        .apply(item => {
            item.setCount(1);
        })
        .randomChance(0.5)
    );

    event.addEntityModifier([
        "terra_entity:golden_slime"
    ]).addLoot(LootEntry.of("eternal_starlight:starlight_silver_coin")
        .apply(item => {
            item.setCount({ min: 2, max: 10 });
        })
        .randomChance(0.6)
    ).addLoot(LootEntry.of('minecraft:emerald')
        .apply(item => {
            item.setCount({ min: 3, max: 12 });
        })
        .randomChance(0.8)
    );

    event.addEntityModifier([
        "terra_entity:devourer"
    ]).addLoot(LootEntry.of("minecraft:rotten_flesh")
        .apply(item => {
            item.setCount({ min: 1, max: 3 });
        })
        .randomChance(0.9)
    );

    event.addEntityModifier([
        "minecraft:cave_spider"
    ]).addLoot(LootEntry.of("alshanex_familiars:spider_fang")
        .apply(item => {
            item.setCount({ min: 1, max: 1 });
        })
        .randomChance(0.5)
    );

    event.addEntityModifier([
        "irons_spellbooks:priest"
    ]).addLoot(LootEntry.of('kubejs:lava_bible')
        .apply(item => {
            item.setCount({ min: 1, max: 1 });
        })
        .randomChance(0.3)
    );

    event.addEntityModifier([
        "irons_spellbooks:apothecarist"
    ]).addLoot(LootEntry.of('kubejs:lava_bible')
        .apply(item => {
            item.setCount({ min: 1, max: 1 });
        })
        .randomChance(0.45)
    );

    event.addEntityModifier([
        "irons_spellbooks:pyromancer",
        "irons_spellbooks:cryomancer"
    ]).addLoot(LootEntry.of('kubejs:lava_bible')
        .apply(item => {
            item.setCount({ min: 1, max: 1 });
        })
        .randomChance(0.6)
    );

    event.addEntityModifier([
        "irons_spellbooks:necromancer"
    ]).addLoot(LootEntry.of('kubejs:lava_bible')
        .apply(item => {
            item.setCount({ min: 1, max: 1 });
        })
        .randomChance(0.2)
    );

    event.addEntityModifier([
        "irons_spellbooks:archevoker"
    ]).addLoot(LootEntry.of('kubejs:lava_bible')
        .apply(item => {
            item.setCount({ min: 1, max: 1 });
        })
        .randomChance(0.4)
    );

    event.addEntityModifier([
        "terra_entity:visual_neuron"
    ]).addLoot(LootEntry.of('kubejs:blood_orb')
        .apply(item => {
            item.setCount({ min: 1, max: 2 });
        })
        .randomChance(0.4)
    );

    event.addEntityModifier([
        "terra_entity:brain_of_cthulhu"
    ]).addLoot(LootEntry.of('kubejs:blood_orb')
        .apply(item => {
            item.setCount({ min: 8, max: 13 });
        })
    );

    event.addEntityModifier([
        "terra_entity:brain_of_cthulhu"
    ]).addLoot(LootEntry.of('terra_curio:brain_of_confusion')
        .apply(item => {
            item.setCount({ min: 1, max: 1 })
        })
    );

    event.addEntityModifier([
        "terra_entity:skeletron"
    ]).addLoot(LootEntry.of('terra_curio:bone_glove')
        .apply(item => {
            item.setCount({ min: 1, max: 1 })
        })
    );


    event.addEntityModifier([
        "terra_entity:queen_bee"
    ]).addLoot(LootEntry.of('terra_curio:hive_pack')
        .apply(item => {
            item.setCount({ min: 1, max: 1 })
        })
    );


    event.addEntityModifier([
        "terra_entity:brain_of_cthulhu"
    ]).addLoot(LootEntry.of('kubejs:melting_eyeball')
        .apply(item => {
            item.setCount({ min: 0, max: 1 });
        })
    );

    event.addEntityModifier([
        "terra_entity:eye_of_cthulhu"
    ]).addLoot(LootEntry.of('terra_curio:shield_of_cthulhu')
        .apply(item => {
            item.setCount({ min: 1, max: 1 })
        })
    );

    event.addEntityModifier([
        "terra_entity:eater_of_worlds"
    ]).addLoot(LootEntry.of('terra_curio:worm_scarf')
        .apply(item => {
            item.setCount({ min: 1, max: 1 })
        })
    );

    event.addEntityModifier([
        "terra_entity:snow_flinx"
    ]).addLoot(LootEntry.of('hazennstuff:permafrost_fragment')
        .apply(item => {
            item.setCount({ min: 1, max: 2 })
        })
    );

    event.addEntityModifier([
        "terra_entity:queen_bee"
    ]).addLoot(LootEntry.of('kubejs:solimrith_ingot')
        .apply(item => {
            item.setCount({ min: 1, max: 3 })
        })
    );

    event.addEntityModifier([
        "terra_entity:skeletron"
    ]).addLoot(LootEntry.of('kubejs:viculeam_ingot')
        .apply(item => {
            item.setCount({ min: 2, max: 5 })
        })
    );

    event.addEntityModifier([
        "bosses_of_mass_destruction:lich"
    ]).addLoot(LootEntry.of('kubejs:plumbumanite_ingot')
        .apply(item => {
            item.setCount({ min: 2, max: 5 })
        })
    );

    event.addEntityModifier([
        "terra_entity:king_slime"
    ]).addLoot(LootEntry.of('gobber2:gobber2_goo')
        .apply(item => {
            item.setCount({ min: 1, max: 2 })
        })
    )
        .addLoot(LootEntry.of('gobber2:gobber2_goo_nether')
            .apply(item => {
                item.setCount({ min: 1, max: 1 })
            })
        )

    event.addEntityModifier([
        "terra_entity:king_slime"
    ]).addLoot(LootEntry.of('terra_curio:royal_gel')
        .apply(item => {
            item.setCount({ min: 1, max: 1 })
        })
    )


    event.addEntityModifier([
        "irons_spellbooks:dead_king"
    ]).addLoot(LootEntry.of('kubejs:necroplasm')
        .apply(item => {
            item.setCount({ min: 11, max: 21 })
        })
    );
    event.addEntityModifier([
        "irons_spellbooks:dead_king"
    ]).addLoot(LootEntry.of('kubejs:low_heart_of_darkness')
        .apply(item => {
            item.setCount({ min: 0, max: 1 })
        })
    );
    event.addEntityModifier([
        "gametechbcs_spellbooks:hard_dead_king"
    ]).addLoot(LootEntry.of('kubejs:necroplasm')
        .apply(item => {
            item.setCount({ min: 13, max: 48 })
        })
    );

    event.addEntityModifier([
        "endermanoverhaul:soulsand_valley_enderman"
    ]).addLoot(LootEntry.of('iceandfire:ectoplasm')
        .apply(item => {
            item.setCount({ min: 0, max: 3 })
        })
    );

    event.addEntityModifier([
        "cataclysm:ender_guardian",
        "bosses_of_mass_destruction:obsidilith"
    ]).addLoot(LootEntry.of('kubejs:ruinous_soul')
        .apply(item => {
            item.setCount({ min: 9, max: 24 })
        })
    );

    event.addEntityModifier([
        "irons_spellbooks:fire_boss"
    ]).addLoot(LootEntry.of('kubejs:ashes_of_calamity')
        .apply(item => {
            item.setCount({ min: 9, max: 24 })
        })
    );

    event.addEntityModifier([
        "cataclysm:ancient_remnant"
    ]).addLoot(LootEntry.of('terra_curio:sandstorm_in_a_bottle')
        .apply(item => {
            item.setCount({ min: 0, max: 1 })
        })
    );

    event.addEntityModifier([
        "eternal_starlight:lunar_monstrosity"
    ]).addLoot(LootEntry.of('kubejs:blue_star')
        .apply(item => {
            item.setCount({ min: 0, max: 1 });
        })
    );

    event.addEntityModifier([
        "eternal_starlight:starlight_golem"
    ]).addLoot(LootEntry.of('kubejs:fragment_of_the_universe')
        .apply(item => {
            item.setCount({ min: 0, max: 1 });
        })
    );

    event.addEntityModifier([
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
        "irons_spellbooks:dead_king"
    ]).addLoot(LootEntry.of('kubejs:supreme_healing_potion')
        .apply(item => {
            item.setCount({ min: 1, max: 4 });
        })
        .randomChance(0.75)
    );

    event.addEntityModifier([
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
        "irons_spellbooks:dead_king"
    ]).addLoot(LootEntry.of('malum:umbral_spirit')
        .apply(item => {
            item.setCount({ min: 1, max: 6 });
        })
        .randomChance(0.75)
    );

    event.addEntityModifier([
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
        "irons_spellbooks:dead_king"
    ]).addLoot(LootEntry.of('kubejs:omega_healing_potion')
        .apply(item => {
            item.setCount({ min: 1, max: 3 });
        })
        .randomChance(0.5)
    );

    event.addEntityModifier([
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
        "irons_spellbooks:dead_king"
    ]).addLoot(LootEntry.of('kubejs:supreme_mana_potion')
        .apply(item => {
            item.setCount({ min: 1, max: 5 });
        })
        .randomChance(0.75)
    );


    event.addEntityModifier([
        "minecraft:piglin",
        "minecraft:piglin_brute",
        "minecraft:hoglin"

    ]).addLoot(LootEntry.of('irons_spellbooks:hogskin')
        .apply(item => {
            item.setCount({ min: 1, max: 2 });
        })
        .randomChance(0.4)
    );


    event.addEntityModifier([
        "eternal_starlight:luminofish"
    ]).addLoot(LootEntry.of('kubejs:luminofish_ink_sac')
        .apply(item => {
            item.setCount({ min: 1, max: 2 });
        })
        .randomChance(0.6)
    );

    event.addEntityModifier([
        "darkdoppelganger:dark_doppelganger"
    ]).addLoot(LootEntry.of('reveriefoundry:furioso_blueprint')
        .apply(item => {
            item.setCount(1);
        })
    );

    event.addEntityModifier([
        "irons_spellbooks:fire_boss",

    ]).addLoot(LootEntry.of('kubejs:catalyst_t5')
        .apply(item => {
            item.setCount({ min: 3, max: 9 });
        })
        .randomChance(0.75)
    );

});




LootJS.lootTables(event => {
    event.getLootTable("alshanex_familiars:chests/origin_island/workshop/scrolls").removeItem('hazennstuff:shadow_scale')
    event.getLootTable("alshanex_familiars:chests/origin_island/workshop/random").removeItem('hazennstuff:shadow_scale')
    event.getLootTable("irons_spellbooks:chests/component_storage").removeItem('hazennstuff:shadow_scale')
    event.getLootTable("hazennstuff:entities/additional_loot/additional_phantom_loot").removeItem('hazennstuff:shadow_scale')

    event.getLootTable("terra_entity:entities/spore_skeleton").removeItem("terra_entity:skeletron_spawn_egg")
    event.getLootTable("terra_entity:entities/spore_skeleton").firstPool()
        .addEntry(LootEntry.of('hazennstuff:glowing_mushroom').withWeight(15).setCount([0, 2]))
        .addEntry(LootEntry.of('minecraft:brown_mushroom').withWeight(30).setCount([1, 2]))
        .addEntry(LootEntry.of('minecraft:red_mushroom').withWeight(30).setCount([1, 2]))

    event.getLootTable("terra_entity:entities/spore_zombie").firstPool()
        .addEntry(LootEntry.of('hazennstuff:glowing_mushroom').withWeight(15).setCount([0, 2]))
        .addEntry(LootEntry.of('minecraft:brown_mushroom').withWeight(30).setCount([1, 2]))
        .addEntry(LootEntry.of('minecraft:red_mushroom').withWeight(30).setCount([1, 2]))

    event.getLootTable("terra_entity:entities/black_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/blue_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/corrupt_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/crimson_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/desert_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/evil_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/green_dumpling_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/green_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/honey_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/ice_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/jungle_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/lava_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/luminous_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/pink_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/purple_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/red_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/swamp_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/tropic_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/yellow_slime").removeItem('terra_entity:king_slime_spawn_egg')
    event.getLootTable("terra_entity:entities/eye_of_cthulhu").removeItem('terra_entity:eater_of_world_spawn_egg')
    event.getLootTable("terra_entity:entities/eye_of_cthulhu").removeItem('terra_entity:brain_of_cthulhu_spawn_egg')

    event.getLootTable("terra_entity:entities/anger_bones").removeItem('terra_entity:skeletron_spawn_egg')
    event.getLootTable("terra_entity:entities/base_bones").removeItem('terra_entity:skeletron_spawn_egg')
    event.getLootTable("terra_entity:entities/big_anger_bones").removeItem('terra_entity:skeletron_spawn_egg')
    event.getLootTable("terra_entity:entities/big_bones").removeItem('terra_entity:skeletron_spawn_egg')
    event.getLootTable("terra_entity:entities/big_helmet_anger_bones").removeItem('terra_entity:skeletron_spawn_egg')
    event.getLootTable("terra_entity:entities/big_muscle_anger_bones").removeItem('terra_entity:skeletron_spawn_egg')
    event.getLootTable("terra_entity:entities/short_bones").removeItem('terra_entity:skeletron_spawn_egg')
    event.getLootTable("terra_entity:entities/spore_skeleton").removeItem('terra_entity:skeletron_spawn_egg')
    event.getLootTable("terra_entity:entities/undead_viking").removeItem('terra_entity:skeletron_spawn_egg')
    event.getLootTable("terra_entity:entities/cursed_skull").removeItem('terra_entity:skeletron_spawn_egg')

    event.getLootTable("terra_entity:entities/hornet").removeItem('terra_entity:queen_bee_spawn_egg')

    event.getLootTable("terra_entity:entities/crimson_kemera").removeItem('terra_entity:brain_of_cthulhu_spawn_egg')
    event.getLootTable("terra_entity:entities/crimson_slime").removeItem('terra_entity:brain_of_cthulhu_spawn_egg')
    event.getLootTable("terra_entity:entities/bloody_spore").removeItem('terra_entity:brain_of_cthulhu_spawn_egg')
    event.getLootTable("terra_entity:entities/blood_crawler").removeItem('terra_entity:brain_of_cthulhu_spawn_egg')
    event.getLootTable("terra_entity:entities/blood_zombie").removeItem('terra_entity:brain_of_cthulhu_spawn_egg')
    event.getLootTable("terra_entity:entities/demon_eye").removeItem('terra_entity:cthulhu_eye_spawn_egg')

    event.getLootTable("terra_entity:entities/corrupt_slime").removeItem('terra_entity:eater_of_world_spawn_egg')
    event.getLootTable("terra_entity:entities/eater_of_souls").removeItem('terra_entity:eater_of_world_spawn_egg')
    event.getLootTable("terra_entity:entities/devourer").removeItem('terra_entity:eater_of_world_spawn_egg')
    event.getLootTable("terra_entity:entities/decayeder").removeItem('terra_entity:eater_of_world_spawn_egg')
    event.getLootTable("terra_entity:entities/evil_slime").removeItem('terra_entity:eater_of_world_spawn_egg')
    event.getLootTable("terra_entity:entities/drippler").removeItem('terra_entity:eater_of_world_spawn_egg')
    event.getLootTable("terra_entity:entities/drippler").removeItem('terra_entity:brain_of_cthulhu_spawn_egg')
    event.getLootTable("terra_entity:entities/wandering_eye_fish").removeItem('terra_entity:brain_of_cthulhu_spawn_egg')
    event.getLootTable("terra_entity:entities/drippler").removeItem('terra_entity:cthulhu_eye_spawn_egg')
    event.getLootTable("terra_entity:entities/wandering_eye_fish").removeItem('terra_entity:cthulhu_eye_spawn_egg')
    //世界吞噬者
    let roostTable = event.getLootTable("terra_entity:entities/eater_of_worlds")
    if (roostTable) {
        roostTable.firstPool(pool => {
            pool.addEntry(LootEntry.of('hazennstuff:shadow_scale').withWeight(30).setCount([1, 6]));
        })
        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.of('hazennstuff:shadow_scale').withWeight(40).setCount([1, 4]));
            pool.addEntry(LootEntry.of('ftboceanmobs:sludge_ball').withWeight(30).setCount([1, 3]));
            pool.addEntry(LootEntry.of('create:experience_nugget').withWeight(30).setCount([1, 3]));
            pool.addEntry(LootEntry.of('minecraft:phantom_membrane').withWeight(30).setCount([1, 2]));
            pool.addEntry(LootEntry.of('kubejs:foul_flesh').withWeight(30).setCount([1, 4]))
            pool.rolls([1, 2]);
        });
        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.of('hazennstuff:shadow_scale').withWeight(40).setCount([1, 3]));
            pool.addEntry(LootEntry.of('kubejs:foul_flesh').withWeight(10).setCount([1, 4]))
            pool.rolls([1, 2]);
        });
    }
})


LootJS.modifiers(event => {
    event.addEntityModifier([
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
        "irons_spellbooks:dead_king"
    ]).addLoot(
        LootEntry.alternative(
            LootEntry.of("kubejs:mark_of_wrath").when(c => c.randomChance(0.1429)),
            LootEntry.of("kubejs:chain_of_lust").when(c => c.randomChance(0.1429)),
            LootEntry.of("kubejs:pendant_of_sloth").when(c => c.randomChance(0.1429)),
            LootEntry.of("kubejs:ring_of_gluttony").when(c => c.randomChance(0.1429)),
            LootEntry.of("kubejs:stone_of_melancholy").when(c => c.randomChance(0.1429)),
            LootEntry.of("kubejs:crown_of_pride").when(c => c.randomChance(0.1429)),
            LootEntry.of("kubejs:eye_of_envy").when(c => c.randomChance(0.1429))
        )
    );
});

