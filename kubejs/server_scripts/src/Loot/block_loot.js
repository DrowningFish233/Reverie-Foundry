LootJS.modifiers(event => {
    event.addBlockModifier([
        "minecraft:iron_ore",
        "minecraft:deepslate_iron_ore",
        "alltheores:other_zinc_ore",
        "alltheores:zinc_ore",
        "create:zinc_ore",
        "create:deepslate_zinc_ore",
        "alltheores:deepslate_zinc_ore",
        "alltheores:nether_zinc_ore",
        "alltheores:end_zinc_ore",

    ])
        .addLoot(LootEntry.of("kubejs:tellurium_nugget")
            .randomChance(0.2)
        );

    event.addBlockModifier([
        'minecraft:deepslate_diamond_ore',
        'minecraft:diamond_ore',
        'minecraft:deepslate_diamond_ore'
    ])
        .addLoot(LootEntry.of('kubejs:tourmaline')
            .randomChance(0.05)
        );


    event.addBlockModifier([
        'alltheores:lead_ore',
        'alltheores:deepslate_lead_ore',
        'alltheores:nether_lead_ore',
        'alltheores:end_lead_ore',
        'alltheores:other_lead_ore'
    ])
        .addLoot(LootEntry.of("kubejs:europium_nugget")
            .randomChance(0.2)
        );


    event.addBlockModifier([
        'alltheores:aluminum_ore',
        'alltheores:deepslate_aluminum_ore',
        'alltheores:nether_aluminum_ore',
        'alltheores:end_aluminum_ore',
        'alltheores:other_aluminum_ore'
    ])
        .addLoot(LootEntry.of('kubejs:titanium_nugget')
            .randomChance(0.2)
        );
}); 