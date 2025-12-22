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
            item.setCount(Math.floor(Math.random() * 9) + 2);
        })
        .randomChance(0.6)
    ).addLoot(LootEntry.of('minecraft:emerald')
        .apply(item => {
            item.setCount(Math.floor(Math.random() * 10) + 3);
        })
        .randomChance(0.8)
    );

    event.addEntityModifier([
        "terra_entity:devourer"
    ]).addLoot(LootEntry.of("minecraft:rotten_flesh")
        .apply(item => {
            item.setCount(Math.floor(Math.random() * 3) + 1);
        })
        .randomChance(0.9)
    );

    event.addEntityModifier([
        "minecraft:cave_spider"
    ]).addLoot(LootEntry.of("alshanex_familiars:spider_fang")
        .apply(item => {
            item.setCount(1);
        })
        .randomChance(0.5)
    );

    event.addEntityModifier([
        "irons_spellbooks:priest"
    ]).addLoot(LootEntry.of('kubejs:lava_bible')
        .apply(item => {
            item.setCount(1);
        })
        .randomChance(0.3)
    );

    event.addEntityModifier([
        "irons_spellbooks:apothecarist"
    ]).addLoot(LootEntry.of('kubejs:lava_bible')
        .apply(item => {
            item.setCount(1);
        })
        .randomChance(0.45)
    );

    event.addEntityModifier([
        "irons_spellbooks:pyromancer",
        "irons_spellbooks:cryomancer"
    ]).addLoot(LootEntry.of('kubejs:lava_bible')
        .apply(item => {
            item.setCount(1);
        })
        .randomChance(0.6)
    );

    event.addEntityModifier([
        "irons_spellbooks:necromancer"
    ]).addLoot(LootEntry.of('kubejs:lava_bible')
        .apply(item => {
            item.setCount(1);
        })
        .randomChance(0.2)
    );

    event.addEntityModifier([
        "irons_spellbooks:archevoker"
    ]).addLoot(LootEntry.of('kubejs:lava_bible')
        .apply(item => {
            item.setCount(1);
        })
        .randomChance(0.4)
    );
    event.addEntityModifier([
        "deathtaxes:scavenger"
    ]).addLoot(LootEntry.of('kubejs:raw_manflesh')
        .apply(item => {
            item.setCount(1);
        })
        .randomChance(0.4)
    );
}); 