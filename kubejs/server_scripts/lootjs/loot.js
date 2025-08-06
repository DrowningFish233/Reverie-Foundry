LootJS.modifiers(event => {
    event.addEntityModifier([
        "minecraft:cow",
        "minecraft:pig",
        "minecraft:villager",
        "minecraft:llama",
        "minecraft:sheep",
        "minecraft:trader_llama",
        "minecraft:player"
    ])
        .addLoot(LootEntry.of("kubejs:meat")
            .randomChance(0.5)
            .when(c => c.matchMainHand(ItemFilter.hasEnchantment("jlme:advanced_looting")))
        );
    event.addEntityModifier([
        "minecraft:zombie",
        "minecraft:skeleton_horse",
        "minecraft:skeleton",
        "minecraft:wither_skeleton",
        "minecraft:witch",
        "minecraft:drowned",
        "minecraft:ghast"
    ])
        .addLoot(LootEntry.of("kubejs:corruption")
            .randomChance(0.5)
            .when(c => c.matchMainHand(ItemFilter.hasEnchantment("jlme:advanced_looting")))
        );
    event.addEntityModifier([
        "minecraft:villager",
        "minecraft:player"
    ])
        .addLoot(LootEntry.of("kubejs:raw_manflesh")
            .randomChance(0.5)
        );
    event.addEntityModifier("minecraft:drowned")
        .randomChance(0.03)
        .matchWeather(true, true) // 仅雷雨时触发（true=下雨，true=雷暴）
        .addLoot("minecraft:trident");
});