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
        "minecraft:zombie",
        "minecraft:zombie_villager",
        "minecraft:husk",
        "minecraft:drowned",
        "minecraft:skeleton",
        "minecraft:stray",
        "minecraft:wither_skeleton",
        "minecraft:phantom",
        "minecraft:wither",
        "minecraft:zoglin",
        "minecraft:skeleton_horse",
        "minecraft:zombie_horse"
    ]).addLoot(LootEntry.of("kubejs:corruption")
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
        "deathtaxes:scavenger"
    ]).addLoot(LootEntry.of('kubejs:raw_manflesh')
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
    ]).addLoot(LootEntry.of('kubejs:melting_eyeball')
        .apply(item => {
            item.setCount({ min: 0, max: 1 });
        })
    );

    event.addEntityModifier([
        "terra_entity:eye_of_cthulhu"
    ]).addLoot(LootEntry.of('kubejs:xeproda_ingot')
        .apply(item => {
            item.setCount({ min: 2, max: 4 });
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
        "terra_entity:ghost"
    ]).addLoot(LootEntry.of('kubejs:plumbumanite_ingot')
        .apply(item => {
            item.setCount({ min: 0, max: 3 })
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
        "irons_spellbooks:dead_king"
    ]).addLoot(LootEntry.of('kubejs:necroplasm')
        .apply(item => {
            item.setCount({ min: 7, max: 19 })
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
        "cataclysm:ender_guardian"
    ]).addLoot(LootEntry.of('kubejs:ruinous_soul')
        .apply(item => {
            item.setCount({ min: 9, max: 24 })
        })
    );

    event.addEntityModifier([
        "cataclysm:ignis"
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
}); 