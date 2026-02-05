const chestIntegrations = {
    "dungeons_arise_seven_seas:chests/corsair_corvette/corsair_corvette_barrels": {
        chance: 0.4,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/corsair_corvette/corsair_corvette_normal": {
        chance: 0.5,
        maxItems: 3,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/corsair_corvette/corsair_corvette_treasure": {
        chance: 0.7,
        maxItems: 5,
        tables: [
            { table: "kubejs:chests/water", weight: 3 }
        ]
    },

    "dungeons_arise_seven_seas:chests/pirate_junk/pirate_junk_barrels": {
        chance: 0.4,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/pirate_junk/pirate_junk_normal": {
        chance: 0.5,
        maxItems: 3,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/pirate_junk/pirate_junk_supply": {
        chance: 0.4,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/pirate_junk/pirate_junk_treasure": {
        chance: 0.6,
        maxItems: 4,
        tables: [
            { table: "kubejs:chests/water", weight: 3 }
        ]
    },

    "dungeons_arise_seven_seas:chests/small_yacht/small_yacht_barrels": {
        chance: 0.3,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/small_yacht/small_yacht_normal": {
        chance: 0.4,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/small_yacht/small_yacht_treasure": {
        chance: 0.5,
        maxItems: 3,
        tables: [
            { table: "kubejs:chests/water", weight: 3 }
        ]
    },

    "dungeons_arise_seven_seas:chests/unicorn_galleon/unicorn_galleon_barrels": {
        chance: 0.4,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/unicorn_galleon/unicorn_galleon_normal": {
        chance: 0.5,
        maxItems: 3,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/unicorn_galleon/unicorn_galleon_supply": {
        chance: 0.4,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/unicorn_galleon/unicorn_galleon_treasure": {
        chance: 0.7,
        maxItems: 5,
        tables: [
            { table: "kubejs:chests/water", weight: 3 }
        ]
    },

    "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_barrels": {
        chance: 0.4,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_normal_lower": {
        chance: 0.5,
        maxItems: 3,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_normal_upper": {
        chance: 0.5,
        maxItems: 3,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_supply": {
        chance: 0.4,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_treasure": {
        chance: 0.8,
        maxItems: 6,
        tables: [
            { table: "kubejs:chests/water", weight: 4 }
        ]
    },

    "dungeons_arise:chests/fishing_hut/fishing_hut_barrels": {
        chance: 0.3,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 1 }
        ]
    },

    "dungeons_arise:chests/illager_galley/illager_galley_treasure": {
        chance: 0.6,
        maxItems: 4,
        tables: [
            { table: "kubejs:chests/water", weight: 3 }
        ]
    },

    "dungeons_arise:chests/typhon/typhon_treasure": {
        chance: 0.7,
        maxItems: 5,
        tables: [
            { table: "kubejs:chests/water", weight: 3 }
        ]
    },

    "dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_barrels": {
        chance: 0.4,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_supply": {
        chance: 0.4,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    },

    "dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_treasure": {
        chance: 0.7,
        maxItems: 5,
        tables: [
            { table: "kubejs:chests/water", weight: 3 }
        ]
    },

    "structory:outcast/boat/loot": {
        chance: 0.4,
        maxItems: 2,
        tables: [
            { table: "kubejs:chests/water", weight: 2 }
        ]
    }
};


LootJS.modifiers(event => {
    for (let [targetTable, config] of Object.entries(chestIntegrations)) {
        event.addTableModifier(targetTable).pool(pool => {
            pool.rolls([0, 1]);

            for (let source of config.tables) {
                pool.addEntry(
                    LootEntry.reference(source.table)
                        .withWeight(source.weight)
                        .when(conditions => {
                            conditions.randomChance(config.chance);
                        })
                );
            }
        });
    }
});
