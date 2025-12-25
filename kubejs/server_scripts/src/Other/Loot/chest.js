
/**陶罐战利品 */
LootJS.lootTables(event => {
    let roostTable = event.getLootTable("betteremeralds:world_loot_pot");
    if (roostTable) {
        roostTable.firstPool(pool => {
            pool.addEntry(LootEntry.of('minecraft:glow_berries').withWeight(30).setCount([1, 3]));
            pool.addEntry(LootEntry.of('minecraft:bread').withWeight(30).setCount([1, 3]));
            pool.addEntry(LootEntry.of('irons_spellbooks:arcane_essence').withWeight(30).setCount([1, 3]));
            pool.addEntry(LootEntry.of('ftboceanmobs:sludge_ball').withWeight(30).setCount([1, 3]));
            pool.addEntry(LootEntry.of('create:experience_nugget').withWeight(30).setCount([1, 3]));
            pool.addEntry(LootEntry.of('minecraft:phantom_membrane').withWeight(30).setCount([1, 2]));
            pool.addEntry(LootEntry.of('minecraft:torch').withWeight(30).setCount([1, 3]));
            pool.addEntry(LootEntry.of('eternal_starlight:sonar_bomb').withWeight(30).setCount([1, 2]));
            pool.addEntry(LootEntry.of('eternal_starlight:frozen_bomb').withWeight(30).setCount([1, 2]));
            pool.addEntry(LootEntry.of('farmersdelight:rope').withWeight(30).setCount([4, 12]));
            pool.addEntry(LootEntry.of('silentgear:phantom_light').withWeight(30).setCount([1, 2]));
            pool.rolls([1, 2]);
        });

    }
})

/**冰龙战利品 */
LootJS.lootTables(event => {
    // 地表冰龙巢穴战利品表
    let roostTable = event.getLootTable("iceandfire:chest/ice_dragon_roost");
    if (roostTable) {

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.of("minecraft:apple").withWeight(40).setCount([1, 3]));
            pool.addEntry(LootEntry.of("extradelight:ice_cubes").withWeight(60).setCount([1, 5]));
            pool.addEntry(LootEntry.of('iceandfire:frost_lily').withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("kubejs:meat").withWeight(50).setCount([1, 3]));
            pool.addEntry(LootEntry.of("fruitsdelight:pear_with_rock_sugar").withWeight(20).setCount([0, 1]));
            pool.rolls([2, 4]);
        });

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.of("irons_spellbooks:frozen_bone").withWeight(50).setCount([1, 3]));
            pool.addEntry(LootEntry.of("kubejs:iceball").withWeight(15).setCount([0, 1]));
            pool.addEntry(LootEntry.of("create:experience_nugget").withWeight(35).setCount([1, 4]));
            pool.rolls([0, 1]);
        });

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.of("irons_spellbooks:greater_healing_potion").withWeight(40).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:oakskin_elixir").withWeight(30).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:evasion_elixir").withWeight(30).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(50));
            pool.rolls([0, 1]);
        });

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.tag('alshanex_familiars:familiar_shards', false).withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(40));
            pool.rolls([0, 1]);
        });
    }

    // 洞穴冰龙巢穴战利品表
    let caveTable = event.getLootTable("iceandfire:chest/ice_dragon_female_cave");
    if (caveTable) {

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of("extradelight:ice_cubes").withWeight(60).setCount([0, 4]));
            pool.addEntry(LootEntry.of('iceandfire:frost_lily').withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:frozen_bone").withWeight(50).setCount([0, 3]));
            pool.addEntry(LootEntry.of("kubejs:meat").withWeight(40).setCount([0, 2]));
            pool.rolls([0, 2]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of("fruitsdelight:pear_with_rock_sugar").withWeight(40).setCount([0, 3]));
            pool.addEntry(LootEntry.of("create:experience_nugget").withWeight(60).setCount([0, 3]));
            pool.rolls([0, 3]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of("kubejs:iceball").withWeight(20).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:greater_healing_potion").withWeight(35).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:oakskin_elixir").withWeight(35).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:evasion_elixir").withWeight(30).setCount([0, 1]));
            pool.rolls([0, 2]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of("endrem:cold_eye").withWeight(10).setCount(1));
            pool.addEntry(LootEntry.of("minecraft:enchanted_golden_apple").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:ice_rune").withWeight(5).setCount([0, 2]));
            pool.addEntry(LootEntry.empty().withWeight(85));
            pool.rolls([0, 1]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.tag('alshanex_familiars:familiar_shards', false).withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(80));
            pool.rolls([0, 1]);
        });
    }
});


/**火龙战利品 */
LootJS.lootTables(event => {
    // 地表火龙巢穴战利品表
    let roostTable = event.getLootTable("iceandfire:chest/fire_dragon_roost");
    if (roostTable) {

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.tag('minecraft:meat').withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:fire_lily").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("kubejs:meat").withWeight(50).setCount([1, 3]));
            pool.addEntry(LootEntry.of('extradelight:aebleflaesk').withWeight(20).setCount([0, 1]));
            pool.rolls([2, 4]);
        });

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.of('iceandfire:witherbone').withWeight(50).setCount([1, 3]));
            pool.addEntry(LootEntry.of("kubejs:fireball").withWeight(15).setCount([0, 1]));
            pool.addEntry(LootEntry.of("create:experience_nugget").withWeight(35).setCount([1, 4]));
            pool.rolls([0, 1]);
        });

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.of("irons_spellbooks:netherward_tincture").withWeight(40).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:fire_ale").withWeight(30).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:invisibility_elixir").withWeight(30).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(50));
            pool.rolls([0, 1]);
        });

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.tag('alshanex_familiars:familiar_shards', false).withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(40));
            pool.rolls([0, 1]);
        });
    }

    // 洞穴火龙巢穴战利品表
    let caveTable = event.getLootTable("iceandfire:chest/fire_dragon_female_cave");
    if (caveTable) {

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.tag('minecraft:meat').withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:fire_lily").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of('iceandfire:witherbone').withWeight(50).setCount([0, 3]));
            pool.addEntry(LootEntry.of("kubejs:meat").withWeight(40).setCount([0, 2]));
            pool.rolls([0, 2]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of('extradelight:aebleflaesk').withWeight(40).setCount([0, 3]));
            pool.addEntry(LootEntry.of("create:experience_nugget").withWeight(60).setCount([0, 3]));
            pool.rolls([0, 3]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of("kubejs:fireball").withWeight(20).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:netherward_tincture").withWeight(40).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:fire_ale").withWeight(30).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:invisibility_elixir").withWeight(30).setCount([0, 1]));
            pool.rolls([0, 2]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of("endrem:nether_eye").withWeight(10).setCount(1));
            pool.addEntry(LootEntry.of("minecraft:enchanted_golden_apple").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of('irons_spellbooks:fire_rune').withWeight(5).setCount([0, 2]));
            pool.addEntry(LootEntry.empty().withWeight(85));
            pool.rolls([0, 1]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.tag('alshanex_familiars:familiar_shards', false).withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(80));
            pool.rolls([0, 1]);
        });
    }
});



/**电龙战利品 */
LootJS.lootTables(event => {
    // 地表电龙巢穴战利品表
    let roostTable = event.getLootTable("iceandfire:chest/lightning_dragon_roost");
    if (roostTable) {

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.tag('minecraft:meat').withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of('iceandfire:lightning_lily').withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("kubejs:meat").withWeight(50).setCount([1, 3]));
            pool.addEntry(LootEntry.of('extradelight:pasta_alfredo').withWeight(20).setCount([0, 1]));
            pool.rolls([2, 4]);
        });

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.of('irons_spellbooks:lightning_bottle').withWeight(20).setCount([0, 1]));
            pool.addEntry(LootEntry.of('hazennstuff:overgrown_bone').withWeight(50).setCount([1, 3]));
            pool.addEntry(LootEntry.of("kubejs:lightingball").withWeight(15).setCount([0, 1]));
            pool.addEntry(LootEntry.of("create:experience_nugget").withWeight(35).setCount([1, 4]));
            pool.rolls([0, 1]);
        });

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.of("irons_spellbooks:netherward_tincture").withWeight(40).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:fire_ale").withWeight(30).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:invisibility_elixir").withWeight(30).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(50));
            pool.rolls([0, 1]);
        });

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.tag('alshanex_familiars:familiar_shards', false).withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(40));
            pool.rolls([0, 1]);
        });
    }

    // 洞穴电龙巢穴战利品表
    let caveTable = event.getLootTable("iceandfire:chest/lightning_dragon_female_cave");
    if (caveTable) {

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.tag('minecraft:meat').withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of('iceandfire:lightning_lily').withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of('hazennstuff:overgrown_bone').withWeight(50).setCount([0, 3]));
            pool.addEntry(LootEntry.of("kubejs:meat").withWeight(40).setCount([0, 2]));
            pool.rolls([0, 2]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of('extradelight:pasta_alfredo').withWeight(40).setCount([0, 3]));
            pool.addEntry(LootEntry.of("create:experience_nugget").withWeight(60).setCount([0, 3]));
            pool.rolls([0, 3]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of('irons_spellbooks:lightning_bottle').withWeight(20).setCount([0, 1]));
            pool.addEntry(LootEntry.of("kubejs:lightingball").withWeight(20).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:netherward_tincture").withWeight(40).setCount([0, 1]));
            pool.addEntry(LootEntry.of("irons_spellbooks:invisibility_elixir").withWeight(30).setCount([0, 1]));
            pool.rolls([0, 2]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of('endrem:black_eye').withWeight(10).setCount(1));
            pool.addEntry(LootEntry.of("minecraft:enchanted_golden_apple").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of('irons_spellbooks:lightning_rune').withWeight(5).setCount([0, 2]));
            pool.addEntry(LootEntry.empty().withWeight(85));
            pool.rolls([0, 1]);
        });

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.tag('alshanex_familiars:familiar_shards', false).withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(80));
            pool.rolls([0, 1]);
        });
    }
});

