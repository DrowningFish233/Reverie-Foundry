// priority: 0
// 矿石限制 - 石头
const ORES = [
    ["astages/ore/zenalite_stone", "hazennstuff:zenalite_stone_ore", "first_kill_dead_king"],
    ["astages/ore/zenalite_abysslate", "hazennstuff:zenalite_abysslate_ore", "first_kill_dead_king"],
    ["astages/ore/runestone_slag", "hazennstuff:runestone_slag", "first_kill_dead_king"],
    ["astages/ore/zenalite_voidstone", "hazennstuff:zenalite_voidstone_ore", "first_kill_dead_king"],
    ["astages/ore/chlorophyte_ore", "hazennstuff:chlorophyte_ore", "first_kill_dead_king"],
    ["astages/ore/zenalite_voidstone_ore", "hazennstuff:zenalite_voidstone_ore", "first_kill_dead_king"],
    ["astages/ore/zenalite_stone_ore", "hazennstuff:zenalite_stone_ore", "first_kill_dead_king"],
    ["astages/ore/zenalite_abysslate_ore", "hazennstuff:zenalite_abysslate_ore", "first_kill_dead_king"],
    ["astages/ore/first_kill_dead_king", "gobber2:gobber2_ore", "first_kill_dead_king"],

];

ORES.forEach(([id, ore, stage]) => {
    AStages.addRestrictionForOre(id, stage, ore, Blocks.STONE.defaultBlockState());
});

// 矿石限制 - 深板岩
const DEEPSLATE_ORES = [
    ["astages/ore/dreadstone_ore", "hazennstuff:dreadstone_ore", "first_kill_dead_king"],
    ["astages/ore/zenalite_deepslate", "hazennstuff:zenalite_deepslate_ore", "first_kill_dead_king"],
    ["astages/ore/gobber2_ore_deepslate", "gobber2:gobber2_ore_deepslate", "first_kill_dead_king"],
];

DEEPSLATE_ORES.forEach(([id, ore, stage]) => {
    AStages.addRestrictionForOre(id, stage, ore, Blocks.DEEPSLATE.defaultBlockState());
});

//////
// 矿石限制 - 地狱岩
const NETHER_ORES = [
    ["astages/ore/gobber2_ore_nether", "gobber2:gobber2_ore_nether", "first_kill_skeletron"],
    ["astages/ore/solar_core_netherrack_ore", "hazennstuff:solar_core_netherrack_ore", "first_kill_dead_king"],
    ["astages/ore/solar_core_blackstone_ore", "hazennstuff:solar_core_blackstone_ore", "first_kill_dead_king"],

];

NETHER_ORES.forEach(([id, ore, stage]) => {
    AStages.addRestrictionForOre(id, stage, ore, Blocks.NETHERRACK.defaultBlockState());
});

//////
// 矿石限制 - 末地岩
const END_ORES = [
    ["astages/ore/gobber2_ore_end", "gobber2:gobber2_ore_end", "first_kill_fire_boss"],
    ["astages/ore/zenalite_end_stone_ore", "hazennstuff:zenalite_end_stone_ore", "first_kill_dead_king"],

];

END_ORES.forEach(([id, ore, stage]) => {
    AStages.addRestrictionForOre(id, stage, ore, Blocks.END_STONE.defaultBlockState());
});


/**
 * 矿石阶段限制配置
 */
ReverieFoundry
    .setDebug(false)
    .registerStage(
        new OreStageSystem("first_kill_dead_king")
            .hideOre('gobber2:gobber2_globette', 'minecraft:cobbled_deepslate')
            .hideOre('hazennstuff:raw_zenalite', 'minecraft:cobblestone')
            .hideOre('hazennstuff:runestone_fragments', 'minecraft:cobblestone')
            .hideOre('hazennstuff:chlorophyte_chunk', 'minecraft:cobblestone')
            .hideOre('hazennstuff:dreadstone', 'minecraft:cobbled_deepslate')
            .hideOre('hazennstuff:solar_core', 'minecraft:netherrack')
    )
    .registerStage(
        new OreStageSystem("first_kill_skeletron")
            .hideOre('gobber2:gobber2_globette_nether', 'minecraft:netherrack')
    )
    .registerStage(
        new OreStageSystem("first_kill_fire_boss")
            .hideOre('gobber2:gobber2_globette_end', 'minecraft:end_stone')
    );