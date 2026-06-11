
/**陶罐战利品 */
LootJS.lootTables(event => {
    let roostTable = event.getLootTable("betteremeralds:world_loot_pot");
    if (roostTable) {
        roostTable.firstPool(pool => {
            pool.addEntry(LootEntry.of('silentgear:bort').withWeight(30).setCount([1, 2]))
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
            pool.addEntry(LootEntry.of("alshanex_familiars:plague_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:necromancer_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:cleric_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:bard_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:frostling_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:illusionist_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:lightning_mage_shard").withWeight(60).setCount([0, 1]));
            /*
            pool.addEntry(LootEntry.of("alshanex_familiars:dragon_warrior_shard").withWeight(5).setCount([0, 1]));
            */
            pool.addEntry(LootEntry.of("alshanex_familiars:scorcher_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:archmage_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:summoner_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:druid_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:hunter_shard").withWeight(60).setCount([0, 1]));
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
            pool.addEntry(LootEntry.of("alshanex_familiars:plague_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:necromancer_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:cleric_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:bard_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:frostling_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:illusionist_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:lightning_mage_shard").withWeight(5).setCount([0, 1]));
            /*
            pool.addEntry(LootEntry.of("alshanex_familiars:dragon_warrior_shard").withWeight(5).setCount([0, 1]));
            */
            pool.addEntry(LootEntry.of("alshanex_familiars:scorcher_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:archmage_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:summoner_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:druid_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:hunter_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(80));
        });
    }
});


/**火龙战利品 */
LootJS.lootTables(event => {
    // 地表火龙巢穴战利品表
    let roostTable = event.getLootTable("iceandfire:chest/fire_dragon_roost");
    if (roostTable) {

        roostTable.createPool(pool => {
            pool.addEntry(LootEntry.of("eternal_starlight:rotten_flesh_jerky").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:beef").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:lightning_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:ice_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:fire_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("eternal_starlight:aurora_deer_steak").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_fire_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_ice_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_lightning_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("cataclysm:amethyst_crab_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("farmersdelight:mutton_wrap").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("kubejs:raw_manflesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:mutton").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:rabbit").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:chicken").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("malum:living_flesh").withWeight(80).setCount([1, 3]));
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
            pool.addEntry(LootEntry.of("alshanex_familiars:plague_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:necromancer_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:cleric_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:bard_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:frostling_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:illusionist_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:lightning_mage_shard").withWeight(60).setCount([0, 1]));
            /*
            pool.addEntry(LootEntry.of("alshanex_familiars:dragon_warrior_shard").withWeight(5).setCount([0, 1]));
            */
            pool.addEntry(LootEntry.of("alshanex_familiars:scorcher_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:archmage_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:summoner_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:druid_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:hunter_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(40));
            pool.rolls([0, 1]);
        });
    }

    // 洞穴火龙巢穴战利品表
    let caveTable = event.getLootTable("iceandfire:chest/fire_dragon_female_cave");
    if (caveTable) {

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of("eternal_starlight:rotten_flesh_jerky").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:beef").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:lightning_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:ice_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:fire_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("eternal_starlight:aurora_deer_steak").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_fire_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_ice_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_lightning_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("cataclysm:amethyst_crab_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("farmersdelight:mutton_wrap").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("kubejs:raw_manflesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:mutton").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:rabbit").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:chicken").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("malum:living_flesh").withWeight(80).setCount([1, 3]));
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
            pool.addEntry(LootEntry.of("alshanex_familiars:plague_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:necromancer_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:cleric_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:bard_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:frostling_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:illusionist_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:lightning_mage_shard").withWeight(5).setCount([0, 1]));
            /*
            pool.addEntry(LootEntry.of("alshanex_familiars:dragon_warrior_shard").withWeight(5).setCount([0, 1]));
            */
            pool.addEntry(LootEntry.of("alshanex_familiars:scorcher_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:archmage_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:summoner_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:druid_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:hunter_shard").withWeight(5).setCount([0, 1]));
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
            pool.addEntry(LootEntry.of("eternal_starlight:rotten_flesh_jerky").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:beef").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:lightning_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:ice_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:fire_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("eternal_starlight:aurora_deer_steak").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_fire_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_ice_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_lightning_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("cataclysm:amethyst_crab_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("farmersdelight:mutton_wrap").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("kubejs:raw_manflesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:mutton").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:rabbit").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:chicken").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("malum:living_flesh").withWeight(80).setCount([1, 3]));
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
            pool.addEntry(LootEntry.of("alshanex_familiars:plague_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:necromancer_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:cleric_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:bard_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:frostling_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:illusionist_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:lightning_mage_shard").withWeight(60).setCount([0, 1]));
            /*
            pool.addEntry(LootEntry.of("alshanex_familiars:dragon_warrior_shard").withWeight(5).setCount([0, 1]));
            */
            pool.addEntry(LootEntry.of("alshanex_familiars:scorcher_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:archmage_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:summoner_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:druid_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:hunter_shard").withWeight(60).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(40));
            pool.rolls([0, 1]);
        });
    }

    // 洞穴电龙巢穴战利品表
    let caveTable = event.getLootTable("iceandfire:chest/lightning_dragon_female_cave");
    if (caveTable) {

        caveTable.createPool(pool => {
            pool.addEntry(LootEntry.of("eternal_starlight:rotten_flesh_jerky").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:beef").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:lightning_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:ice_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:fire_dragon_flesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("eternal_starlight:aurora_deer_steak").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_fire_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_ice_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("iceandfire:cooked_rice_with_lightning_dragon_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("cataclysm:amethyst_crab_meat").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("farmersdelight:mutton_wrap").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("kubejs:raw_manflesh").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:mutton").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:rabbit").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("minecraft:chicken").withWeight(80).setCount([1, 3]));
            pool.addEntry(LootEntry.of("malum:living_flesh").withWeight(80).setCount([1, 3]));
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
            pool.addEntry(LootEntry.of("alshanex_familiars:plague_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:necromancer_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:cleric_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:bard_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:frostling_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:illusionist_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:lightning_mage_shard").withWeight(5).setCount([0, 1]));

            /*
            pool.addEntry(LootEntry.of("alshanex_familiars:dragon_warrior_shard").withWeight(5).setCount([0, 1]));
            */
            pool.addEntry(LootEntry.of("alshanex_familiars:scorcher_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:archmage_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:summoner_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:druid_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.of("alshanex_familiars:hunter_shard").withWeight(5).setCount([0, 1]));
            pool.addEntry(LootEntry.empty().withWeight(80));
            pool.rolls([0, 1]);
        });
    }
});


/**战利品 */
LootJS.lootTables(event => {
    let roostTable = event.getLootTable("formationsnether:blackstone_remnant");
    if (roostTable) {
        roostTable.firstPool(pool => {
            pool.addEntry(LootEntry.of('kubejs:ruby').withWeight(30).setCount([1, 2]));
            pool.addEntry(LootEntry.of('minecraft:gold_ingot').withWeight(50).setCount([1, 6]));
            pool.rolls([1, 2]);
        });
    }
})

const allDungeonChests = [
    "dungeons_arise:chests/abandoned_temple/abandoned_temple_entrance",
    "dungeons_arise:chests/abandoned_temple/abandoned_temple_map",
    "dungeons_arise:chests/abandoned_temple/abandoned_temple_top",

    "dungeons_arise:chests/aviary/aviary_barrels",
    "dungeons_arise:chests/aviary/aviary_normal",
    "dungeons_arise:chests/aviary/aviary_treasure",

    "dungeons_arise:chests/bandit_towers/bandit_towers_barrels",
    "dungeons_arise:chests/bandit_towers/bandit_towers_gardens",
    "dungeons_arise:chests/bandit_towers/bandit_towers_normal",
    "dungeons_arise:chests/bandit_towers/bandit_towers_rooms",
    "dungeons_arise:chests/bandit_towers/bandit_towers_supply",
    "dungeons_arise:chests/bandit_towers/bandit_towers_treasure",

    "dungeons_arise:chests/bandit_village/bandit_village_barrels",
    "dungeons_arise:chests/bandit_village/bandit_village_normal",
    "dungeons_arise:chests/bandit_village/bandit_village_supply",
    "dungeons_arise:chests/bandit_village/bandit_village_tents",

    "dungeons_arise:chests/bathhouse/bathhouse_barrels",
    "dungeons_arise:chests/bathhouse/bathhouse_normal",

    "dungeons_arise:chests/ceryneian_hind/ceryneian_hind_treasure",
    "dungeons_arise:chests/ceryneian_hind/ceryneian__hind_treasure",

    "dungeons_arise:chests/fishing_hut/fishing_hut_barrels",

    "dungeons_arise:chests/foundry/foundry_chains",
    "dungeons_arise:chests/foundry/foundry_lava_pit",
    "dungeons_arise:chests/foundry/foundry_normal",
    "dungeons_arise:chests/foundry/foundry_passage_exterior",
    "dungeons_arise:chests/foundry/foundry_passage_normal",
    "dungeons_arise:chests/foundry/foundry_treasure",

    "dungeons_arise:chests/heavenly_challenger/heavenly_challenger_normal",
    "dungeons_arise:chests/heavenly_challenger/heavenly_challenger_supply",
    "dungeons_arise:chests/heavenly_challenger/heavenly_challenger_theater",
    "dungeons_arise:chests/heavenly_challenger/heavenly_challenger_treasure",

    "dungeons_arise:chests/heavenly_conqueror/heavenly_conqueror_barrels",
    "dungeons_arise:chests/heavenly_conqueror/heavenly_conqueror_normal",
    "dungeons_arise:chests/heavenly_conqueror/heavenly_conqueror_treasure",

    "dungeons_arise:chests/heavenly_rider/heavenly_rider_barrels",
    "dungeons_arise:chests/heavenly_rider/heavenly_rider_normal",
    "dungeons_arise:chests/heavenly_rider/heavenly_rider_treasure",

    "dungeons_arise:chests/illager_campsite/illager_campsite_map",
    "dungeons_arise:chests/illager_campsite/illager_campsite_supply",
    "dungeons_arise:chests/illager_campsite/illager_campsite_tent",

    "dungeons_arise:chests/illager_corsair/illager_corsair_barrels",
    "dungeons_arise:chests/illager_corsair/illager_corsair_supply",
    "dungeons_arise:chests/illager_corsair/illager_corsair_treasure",

    "dungeons_arise:chests/illager_fort/illager_fort_barrels",
    "dungeons_arise:chests/illager_fort/illager_fort_normal",
    "dungeons_arise:chests/illager_fort/illager_fort_treasure",

    "dungeons_arise:chests/illager_galley/illager_galley_barrels",
    "dungeons_arise:chests/illager_galley/illager_galley_supply",
    "dungeons_arise:chests/illager_galley/illager_galley_treasure",

    "dungeons_arise:chests/illager_windmill/illager_windmill_barrels",
    "dungeons_arise:chests/illager_windmill/illager_windmill_treasure",

    "dungeons_arise:chests/infested_temple/infested_temple_room_bookshelf",
    "dungeons_arise:chests/infested_temple/infested_temple_room_forge",
    "dungeons_arise:chests/infested_temple/infested_temple_room_garden",
    "dungeons_arise:chests/infested_temple/infested_temple_room_normal",
    "dungeons_arise:chests/infested_temple/infested_temple_room_supply",
    "dungeons_arise:chests/infested_temple/infested_temple_room_table",
    "dungeons_arise:chests/infested_temple/infested_temple_top_treasure",
    "dungeons_arise:chests/infested_temple/infested_temple_vault_normal",
    "dungeons_arise:chests/infested_temple/infested_temple_vault_ominous",
    "dungeons_arise:chests/infested_temple/infested_temple_vault_treasure",

    "dungeons_arise:chests/jungle_tree_house/jungle_tree_house_barrels",
    "dungeons_arise:chests/jungle_tree_house/jungle_tree_house_normal",
    "dungeons_arise:chests/jungle_tree_house/jungle_tree_house_treasure",

    "dungeons_arise:chests/keep_kayra/keep_kayra_garden_normal",
    "dungeons_arise:chests/keep_kayra/keep_kayra_garden_treasure",
    "dungeons_arise:chests/keep_kayra/keep_kayra_library_normal",
    "dungeons_arise:chests/keep_kayra/keep_kayra_library_treasure",
    "dungeons_arise:chests/keep_kayra/keep_kayra_normal",
    "dungeons_arise:chests/keep_kayra/keep_kayra_treasure",

    "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_basement",
    "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_normal",
    "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_top",
    "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_treasure",
    "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_vault_normal",
    "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_vault_normal_treasure",
    "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_vault_ominous",
    "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_vault_ominous_treasure",

    "dungeons_arise:chests/lighthouse/lighthouse_top",

    "dungeons_arise:chests/mechanical_nest/mechanical_nest_equipment",
    "dungeons_arise:chests/mechanical_nest/mechanical_nest_normal",
    "dungeons_arise:chests/mechanical_nest/mechanical_nest_supply",
    "dungeons_arise:chests/mechanical_nest/mechanical_nest_treasure",

    "dungeons_arise:chests/merchant_campsite/merchant_campsite_map",
    "dungeons_arise:chests/merchant_campsite/merchant_campsite_supply",
    "dungeons_arise:chests/merchant_campsite/merchant_campsite_tent",

    "dungeons_arise:chests/mining_system/mining_system_barrels",
    "dungeons_arise:chests/mining_system/mining_system_treasure",

    "dungeons_arise:chests/monastery/monastery_barrels",
    "dungeons_arise:chests/monastery/monastery_bridges",
    "dungeons_arise:chests/monastery/monastery_map",

    "dungeons_arise:chests/mushroom_house/mushroom_house_barrels",
    "dungeons_arise:chests/mushroom_house/mushroom_house_normal",
    "dungeons_arise:chests/mushroom_house/mushroom_house_treasure",

    "dungeons_arise:chests/mushroom_mines/mushroom_mines_barrels",
    "dungeons_arise:chests/mushroom_mines/mushroom_mines_ores",
    "dungeons_arise:chests/mushroom_mines/mushroom_mines_tools",
    "dungeons_arise:chests/mushroom_mines/mushroom_mines_treasure",

    "dungeons_arise:chests/mushroom_village/mushroom_village_barrels",
    "dungeons_arise:chests/mushroom_village/mushroom_village_treasure",

    "dungeons_arise:chests/plague_asylum/plague_asylum_barrels",
    "dungeons_arise:chests/plague_asylum/plague_asylum_cells",
    "dungeons_arise:chests/plague_asylum/plague_asylum_normal",
    "dungeons_arise:chests/plague_asylum/plague_asylum_potions",
    "dungeons_arise:chests/plague_asylum/plague_asylum_storage",
    "dungeons_arise:chests/plague_asylum/plague_asylum_treasure",

    "dungeons_arise:chests/scorched_mines/scorched_mines_barrels",
    "dungeons_arise:chests/scorched_mines/scorched_mines_housing",
    "dungeons_arise:chests/scorched_mines/scorched_mines_hub",
    "dungeons_arise:chests/scorched_mines/scorched_mines_normal",
    "dungeons_arise:chests/scorched_mines/scorched_mines_treasure",

    "dungeons_arise:chests/shiraz_palace/shiraz_palace_elite",
    "dungeons_arise:chests/shiraz_palace/shiraz_palace_gardens",
    "dungeons_arise:chests/shiraz_palace/shiraz_palace_library",
    "dungeons_arise:chests/shiraz_palace/shiraz_palace_normal",
    "dungeons_arise:chests/shiraz_palace/shiraz_palace_rooms",
    "dungeons_arise:chests/shiraz_palace/shiraz_palace_towers",
    "dungeons_arise:chests/shiraz_palace/shiraz_palace_treasure",

    "dungeons_arise:chests/small_blimp/small_blimp_coal_storage",
    "dungeons_arise:chests/small_blimp/small_blimp_redstone_chamber",
    "dungeons_arise:chests/small_blimp/small_blimp_treasure",

    "dungeons_arise:chests/thornborn_towers/thornborn_towers_barrels",
    "dungeons_arise:chests/thornborn_towers/thornborn_towers_rooms",
    "dungeons_arise:chests/thornborn_towers/thornborn_towers_top_rooms",
    "dungeons_arise:chests/thornborn_towers/thornborn_towers_top_treasure",

    "dungeons_arise:chests/typhon/typhon_treasure",

    "dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_barrels",
    "dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_enchants",
    "dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_supply",
    "dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_treasure",

    "dungeons_arise:chests/mines_treasure_big",
    "dungeons_arise:chests/mines_treasure_medium",
    "dungeons_arise:chests/mines_treasure_small"
];

LootJS.modifiers(event => {
    allDungeonChests.forEach(table => {
        event
            .addTableModifier(table)
            .replaceLoot(Item.of("minecraft:netherite_ingot"), "minecraft:netherite_scrap", false)
            .replaceLoot(Item.of("minecraft:gold_ingot"), "irons_spellbooks:arcane_essence", true)
            .replaceLoot(Item.of("minecraft:blaze_powder"), "kubejs:randomweapon", false)
            .replaceLoot(Item.of("minecraft:bread"), "kubejs:randomweapon", false)
    });
})

const terra_curioChests = [
    "minecraft:chests/desert_pyramid",
    "minecraft:chests/village/village_fisher",
    "terra_cuiro:with/chests/village/village_fisher"
]
LootJS.modifiers(event => {
    terra_curioChests.forEach(table => {
        event
            .addTableModifier(table)
            .replaceLoot(Item.of("terra_curio:flying_carpet"), "minecraft:diamond_block", true)
            .replaceLoot(Item.of("terra_curio:angler_earring"), "kubejs:angler_earring", true)

    });
})
