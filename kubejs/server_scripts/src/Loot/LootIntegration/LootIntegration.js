const integratedLootTables = {
    "easy": {
        id: "kubejs:chests/easy",
        max_items: 2,
        entries: [
            // Cataclysm
            { table: "cataclysm:entities/the_prowler", weight: 3 },
            { table: "cataclysm:entities/coralssus", weight: 3 },
            { table: "cataclysm:entities/ignited_revenant", weight: 3 },
            { table: "cataclysm:entities/ender_golem", weight: 3 },
            // Ice and Fire 
            { table: "iceandfire:chest/myrmex_loot_chest", weight: 1 },
            { table: "iceandfire:chest/mausoleum_chest", weight: 1 },
            { table: "iceandfire:chest/graveyard", weight: 1 },
            { table: "iceandfire:entities/gorgon", weight: 2 },
            { table: "iceandfire:entities/cyclops", weight: 2 },
            { table: "iceandfire:entities/hydra", weight: 2 },
            // MVS/MSS/MES
            { table: "mvs:cathedral_rare", weight: 1 },
            { table: "mvs:houses_rare", weight: 1 },
            { table: "mvs:pillager", weight: 2 },
            { table: "mvs:swamps", weight: 1 },
            { table: "mss:cathedral_rare", weight: 1 },
            { table: "mss:houses_rare", weight: 1 },
            { table: "mss:pillager", weight: 2 },
            { table: "mss:swamps", weight: 1 },
            { table: "mes:cathedral_rare", weight: 1 },
            { table: "mes:houses_rare", weight: 1 },
            { table: "mes:swamps", weight: 1 },
            // Structory
            { table: "structory:harvest/manor2/loot", weight: 1 },
            { table: "structory:harvest/manor2/treasure", weight: 2 },
            { table: "structory:harvest/old_manor/treasure", weight: 2 },
            { table: "structory:harvest/graveyard", weight: 1 },
            { table: "structory:harvest/graveyard2", weight: 1 },
            { table: "structory:library/high", weight: 1 },
            { table: "structory:outcast/generic/bandit", weight: 2 },
            { table: "structory:outcast/generic/miner", weight: 2 },
            { table: "structory:outcast/mine/loot", weight: 2 },
            { table: "structory:outcast/ruin/ruin", weight: 2 },
            { table: "structory:ruin/swamp/loot", weight: 2 },
            { table: "structory:ruin/taiga/illager_high", weight: 1 },
            { table: "structory:ruin/taiga/illager_treasure", weight: 2 },
            { table: "structory:ruin/taiga/loot", weight: 2 },
            { table: "structory:ruin/ruin", weight: 2 },
            { table: "structory_towers:basic/dark_basic", weight: 1 },
            { table: "structory_towers:basic/pillager_basic", weight: 1 },
            { table: "structory_towers:basic/wizard_basic", weight: 1 },
            { table: "structory_towers:top/dark_top", weight: 1 },
            { table: "structory_towers:top/desert_top", weight: 1 },
            { table: "structory_towers:top/farm_top", weight: 1 },
            { table: "structory_towers:top/forager_top", weight: 1 },
            { table: "structory_towers:top/mangrove_top", weight: 1 },
            { table: "structory_towers:top/lighthouse_top", weight: 1 },
            { table: "structory_towers:top/nomad_top", weight: 1 },
            { table: "structory_towers:top/paranoid_top", weight: 1 },
            { table: "structory_towers:top/pillager_top", weight: 1 },
            { table: "structory_towers:top/sacred_temple_top", weight: 1 },
            { table: "structory_towers:top/small_firetower_top", weight: 1 },
            { table: "structory_towers:top/strange_top", weight: 1 },
            { table: "structory_towers:top/trader_top", weight: 1 },
            { table: "structory_towers:top/wizard_top", weight: 1 },
            { table: "structory_towers:top/workshop_top", weight: 1 },
            { table: "structory_towers:toadstool", weight: 1 },
            { table: "structory_towers:workshop_minecart", weight: 1 },
            // Minecraft
            { table: "minecraft:chests/pillager_outpost", weight: 2 },
            { table: "minecraft:chests/desert_pyramid", weight: 2 },
            { table: "minecraft:chests/abandoned_mineshaft", weight: 2 },
            { table: "minecraft:chests/simple_dungeon", weight: 2 },
            { table: "minecraft:chests/trial_chambers/corridor", weight: 1 },
            { table: "minecraft:chests/trial_chambers/reward_common", weight: 1 },
            { table: "minecraft:chests/trial_chambers/reward_ominous_common", weight: 1 },
            // Kaisyn
            { table: "kaisyn:outpost/common/armory", weight: 2 },
            { table: "kaisyn:outpost/common/outpost_beach_barrel", weight: 1 },
            { table: "kaisyn:outpost/common/outpost_mediterranean_barrel", weight: 1 },
            { table: "kaisyn:outpost/common/outpost_rustic_barrel", weight: 1 },
            { table: "kaisyn:village/exclusives/village_classic_blacksmith", weight: 1 },
            { table: "kaisyn:village/exclusives/village_wandering_trader_hut", weight: 1 },
            { table: "kaisyn:village/exclusives/village_mediterranean_house", weight: 1 },
            { table: "kaisyn:village/village_badlands_house", weight: 1 },
            { table: "kaisyn:village/village_jungle_house", weight: 1 },
            { table: "kaisyn:village/village_mushroom_house", weight: 1 },
            { table: "kaisyn:village/village_swamp_house", weight: 1 },
            // Dungeons Arise (Easy)
            { table: "dungeons_arise:entities/gladiator_loot", weight: 1 },
            { table: "dungeons_arise:chests/mines_treasure_small", weight: 1 },
            { table: "dungeons_arise:chests/mines_treasure_medium", weight: 4 },
            { table: "dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_treasure", weight: 4 },
            { table: "dungeons_arise:chests/thornborn_towers/thornborn_towers_top_rooms", weight: 1 },
            { table: "dungeons_arise:chests/thornborn_towers/thornborn_towers_barrels", weight: 1 },
            { table: "dungeons_arise:chests/small_blimp/small_blimp_treasure", weight: 2 },
            { table: "dungeons_arise:chests/small_blimp/small_blimp_redstone_chamber", weight: 1 },
            { table: "dungeons_arise:chests/shiraz_palace/shiraz_palace_towers", weight: 4 },
            { table: "dungeons_arise:chests/shiraz_palace/shiraz_palace_supply", weight: 1 },
            { table: "dungeons_arise:chests/shiraz_palace/shiraz_palace_rooms", weight: 1 },
            { table: "dungeons_arise:chests/shiraz_palace/shiraz_palace_normal", weight: 2 },
            { table: "dungeons_arise:chests/shiraz_palace/shiraz_palace_gardens", weight: 2 },
            { table: "dungeons_arise:chests/scorched_mines/scorched_mines_normal", weight: 2 },
            { table: "dungeons_arise:chests/scorched_mines/scorched_mines_housing", weight: 1 },
            { table: "dungeons_arise:chests/scorched_mines/scorched_mines_barrels", weight: 1 },
            { table: "dungeons_arise:chests/plague_asylum/plague_asylum_normal", weight: 3 },
            { table: "dungeons_arise:chests/plague_asylum/plague_asylum_cells", weight: 1 },
            { table: "dungeons_arise:chests/plague_asylum/plague_asylum_barrels", weight: 1 },
            { table: "dungeons_arise:chests/mushroom_village/mushroom_village_barrels", weight: 1 },
            { table: "dungeons_arise:chests/mushroom_village/mushroom_village_treasure", weight: 3 },
            { table: "dungeons_arise:chests/mushroom_mines/mushroom_mines_barrels", weight: 1 },
            { table: "dungeons_arise:chests/mushroom_house/mushroom_house_treasure", weight: 2 },
            { table: "dungeons_arise:chests/monastery/monastery_map", weight: 1 },
            { table: "dungeons_arise:chests/monastery/monastery_bridges", weight: 1 },
            { table: "dungeons_arise:chests/mining_system/mining_system_treasure", weight: 4 },
            { table: "dungeons_arise:chests/mechanical_nest/mechanical_nest_treasure", weight: 2 },
            { table: "dungeons_arise:chests/mechanical_nest/mechanical_nest_normal", weight: 1 },
            { table: "dungeons_arise:chests/keep_kayra/keep_kayra_normal", weight: 3 },
            { table: "dungeons_arise:chests/keep_kayra/keep_kayra_library_normal", weight: 3 },
            { table: "dungeons_arise:chests/keep_kayra/keep_kayra_garden_normal", weight: 3 },
            { table: "dungeons_arise:chests/jungle_tree_house/jungle_tree_house_treasure", weight: 3 },
            { table: "dungeons_arise:chests/jungle_tree_house/jungle_tree_house_normal", weight: 2 },
            { table: "dungeons_arise:chests/jungle_tree_house/jungle_tree_house_barrels", weight: 1 },
            { table: "dungeons_arise:chests/infested_temple/infested_temple_room_table", weight: 1 },
            { table: "dungeons_arise:chests/infested_temple/infested_temple_room_supply", weight: 1 },
            { table: "dungeons_arise:chests/infested_temple/infested_temple_room_normal", weight: 1 },
            { table: "dungeons_arise:chests/infested_temple/infested_temple_room_garden", weight: 1 },
            { table: "dungeons_arise:chests/infested_temple/infested_temple_room_forge", weight: 1 },
            { table: "dungeons_arise:chests/infested_temple/infested_temple_room_bookshelf", weight: 1 },
            { table: "dungeons_arise:chests/illager_windmill/illager_windmill_treasure", weight: 3 },
            { table: "dungeons_arise:chests/illager_windmill/illager_windmill_barrels", weight: 1 },
            { table: "dungeons_arise:chests/illager_fort/illager_fort_normal", weight: 2 },
            { table: "dungeons_arise:chests/illager_fort/illager_fort_barrels", weight: 1 },
            { table: "dungeons_arise:chests/illager_corsair/illager_corsair_treasure", weight: 3 },
            { table: "dungeons_arise:chests/illager_campsite/illager_campsite_tent", weight: 2 },
            { table: "dungeons_arise:chests/illager_campsite/illager_campsite_map", weight: 2 },
            { table: "dungeons_arise:chests/heavenly_rider/heavenly_rider_normal", weight: 1 },
            { table: "dungeons_arise:chests/heavenly_rider/heavenly_rider_barrels", weight: 1 },
            { table: "dungeons_arise:chests/greenwood_pub/greenwood_pub_normal", weight: 1 },
            { table: "dungeons_arise:chests/foundry/foundry_passage_exterior", weight: 1 },
            { table: "dungeons_arise:chests/ceryneian_hind/ceryneian_hind_treasure", weight: 3 },
            { table: "dungeons_arise:chests/bandit_village/bandit_village_tents", weight: 3 },
            { table: "dungeons_arise:chests/bandit_village/bandit_village_normal", weight: 2 },
            { table: "dungeons_arise:chests/bandit_village/bandit_village_barrels", weight: 1 },
            { table: "dungeons_arise:chests/bandit_towers/bandit_towers_treasure", weight: 3 },
            { table: "dungeons_arise:chests/bandit_towers/bandit_towers_gardens", weight: 2 },
            { table: "dungeons_arise:chests/abandoned_temple/abandoned_temple_top", weight: 2 },
            { table: "dungeons_arise:chests/abandoned_temple/abandoned_temple_map", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/corsair_corvette/corsair_corvette_barrels", weight: 1 },
            { table: "dungeons_arise_seven_seas:chests/corsair_corvette/corsair_corvette_normal", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/pirate_junk/pirate_junk_barrels", weight: 1 },
            { table: "dungeons_arise_seven_seas:chests/pirate_junk/pirate_junk_normal", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/small_yacht/small_yacht_barrels", weight: 1 },
            { table: "dungeons_arise_seven_seas:chests/small_yacht/small_yacht_normal", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/unicorn_galleon/unicorn_galleon_barrels", weight: 1 },
            { table: "dungeons_arise_seven_seas:chests/unicorn_galleon/unicorn_galleon_normal", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_barrels", weight: 1 },
            { table: "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_normal_upper", weight: 2 },

            { table: "irons_spellbooks:chests/priest_house", weight: 1 },
            { table: "irons_spellbooks:chests/mangrove_hut", weight: 1 },
            { table: "irons_spellbooks:chests/mangrove_hut/hidden_potion_storage", weight: 1 },
            { table: "irons_spellbooks:chests/mangrove_hut/potion_ingredient_storage", weight: 1 },
            { table: "irons_spellbooks:chests/mountain_tower", weight: 1 },
            { table: "irons_spellbooks:chests/mountain_tower/ice_barrel", weight: 1 },
            { table: "irons_spellbooks:chests/mountain_tower/mountain_tower", weight: 1 },
            { table: "irons_spellbooks:chests/evoker_fort", weight: 1 },
            { table: "irons_spellbooks:chests/evoker_fort/guard_tower", weight: 1 },
            { table: "irons_spellbooks:chests/pyromancer_tower/burnt_chest", weight: 1 },
            { table: "irons_spellbooks:chests/pyromancer_tower/fire_ale_cask", weight: 1 },
            { table: "irons_spellbooks:chests/pyromancer_tower/fire_ale_trove", weight: 1 },
            { table: "irons_spellbooks:chests/pyromancer_tower/old_cask", weight: 1 },
            { table: "irons_spellbooks:chests/pyromancer_tower/pot", weight: 1 },
            { table: "irons_spellbooks:chests/pyromancer_tower/pyromancer_basic_storage", weight: 1 },
            { table: "irons_spellbooks:chests/pyromancer_tower/pyromancer_supplies", weight: 1 }
        ]
    },

    "medium": {
        id: "kubejs:chests/medium",
        max_items: 4,
        entries: [
            // Cataclysm
            { table: "cataclysm:entities/ancient_remnant", weight: 4 },
            { table: "cataclysm:chests/frosted_prison_treasure", weight: 3 },

            // Ice and Fire
            { table: "iceandfire:chest/lightning_dragon_roost", weight: 1 },
            { table: "iceandfire:chest/ice_dragon_roost", weight: 1 },
            { table: "iceandfire:chest/fire_dragon_roost", weight: 1 },
            { table: "iceandfire:chest/hydra_cave", weight: 1 },
            { table: "iceandfire:chest/cyclops_cave", weight: 1 },

            // MVS/MSS
            { table: "mvs:rare", weight: 2 },
            { table: "mss:arena", weight: 2 },
            { table: "mss:rare", weight: 2 },

            // Minecraft
            { table: "minecraft:chests/woodland_mansion", weight: 2 },
            { table: "minecraft:chests/stronghold_library", weight: 2 },
            { table: "minecraft:chests/stronghold_crossing", weight: 2 },
            { table: "minecraft:chests/stronghold_corridor", weight: 1 },
            { table: "minecraft:chests/desert_pyramid", weight: 1 },
            { table: "minecraft:chests/jungle_temple", weight: 2 },
            { table: "minecraft:chests/trial_chambers/intersection", weight: 1 },
            { table: "minecraft:chests/trial_chambers/intersection_barrel", weight: 1 },

            { table: "dungeons_arise:chests/mines_treasure_big", weight: 3 },
            { table: "dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_enchants", weight: 1 },
            { table: "dungeons_arise:chests/shiraz_palace/shiraz_palace_treasure", weight: 4 },
            { table: "dungeons_arise:chests/shiraz_palace/shiraz_palace_library", weight: 1 },
            { table: "dungeons_arise:chests/scorched_mines/scorched_mines_treasure", weight: 2 },
            { table: "dungeons_arise:chests/plague_asylum/plague_asylum_treasure", weight: 4 },
            { table: "dungeons_arise:chests/mushroom_mines/mushroom_mines_treasure", weight: 3 },
            { table: "dungeons_arise:chests/mechanical_nest/mechanical_nest_equipment", weight: 2 },
            { table: "dungeons_arise:chests/keep_kayra/keep_kayra_treasure", weight: 4 },
            { table: "dungeons_arise:chests/keep_kayra/keep_kayra_library_treasure", weight: 2 },
            { table: "dungeons_arise:chests/keep_kayra/keep_kayra_garden_treasure", weight: 2 },
            { table: "dungeons_arise:chests/infested_temple/infested_temple_top_treasure", weight: 2 },
            { table: "dungeons_arise:chests/infested_temple/infested_temple_vault_ominous", weight: 2 },
            { table: "dungeons_arise:chests/infested_temple/infested_temple_vault_normal", weight: 1 },
            { table: "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_vault_normal_treasure", weight: 2 },
            { table: "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_vault_normal", weight: 1 },
            { table: "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_treasure", weight: 2 },
            { table: "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_top", weight: 1 },
            { table: "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_normal", weight: 1 },
            { table: "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_basement", weight: 1 },
            { table: "dungeons_arise:chests/illager_fort/illager_fort_treasure", weight: 3 },
            { table: "dungeons_arise:chests/heavenly_rider/heavenly_rider_treasure", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_normal_lower", weight: 2 },

            { table: "irons_spellbooks:chests/impaled_icebreaker/captain_quarters", weight: 3 },
            { table: "irons_spellbooks:chests/impaled_icebreaker/food_barrel", weight: 2 },

            { table: "irons_spellbooks:chests/priest_house", weight: 2 },
            { table: "irons_spellbooks:chests/mangrove_hut", weight: 2 },
            { table: "irons_spellbooks:chests/mangrove_hut/hidden_potion_storage", weight: 3 },
            { table: "irons_spellbooks:chests/mangrove_hut/potion_ingredient_storage", weight: 2 },
            { table: "irons_spellbooks:chests/mountain_tower", weight: 2 },
            { table: "irons_spellbooks:chests/mountain_tower/ice_barrel", weight: 1 },
            { table: "irons_spellbooks:chests/mountain_tower/mountain_tower", weight: 2 },
            { table: "irons_spellbooks:chests/evoker_fort", weight: 3 },
            { table: "irons_spellbooks:chests/evoker_fort/guard_tower", weight: 2 },
            { table: "irons_spellbooks:chests/pyromancer_tower/burnt_chest", weight: 2 },
            { table: "irons_spellbooks:chests/pyromancer_tower/fire_ale_cask", weight: 1 },
            { table: "irons_spellbooks:chests/pyromancer_tower/fire_ale_trove", weight: 3 },
            { table: "irons_spellbooks:chests/pyromancer_tower/old_cask", weight: 1 },
            { table: "irons_spellbooks:chests/pyromancer_tower/pot", weight: 1 },
            { table: "irons_spellbooks:chests/pyromancer_tower/pyromancer_basic_storage", weight: 2 },
            { table: "irons_spellbooks:chests/pyromancer_tower/pyromancer_supplies", weight: 2 },

            { table: "irons_spellbooks:chests/battleground/burial_loot", weight: 1 },
            { table: "irons_spellbooks:chests/battleground/piglin_camp", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/armory_loot", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/coffin_loot", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/crypt_loot", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/hidden_trough_treasure", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/pot", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/wall_loot", weight: 1 },

            { table: "irons_spellbooks:chests/citadel/citadel_bookshelf", weight: 1 },
            { table: "irons_spellbooks:chests/citadel/citadel_tomes", weight: 1 },
            { table: "irons_spellbooks:chests/citadel/citadel_vault", weight: 1 },
            { table: "irons_spellbooks:chests/citadel/rampart_chest", weight: 1 },
            { table: "irons_spellbooks:chests/citadel/rampart_supplies", weight: 1 },
            { table: "irons_spellbooks:chests/citadel/spawner_reward", weight: 1 },

            { table: "irons_spellbooks:chests/ice_spider_den/basement", weight: 2 },
            { table: "irons_spellbooks:chests/ice_spider_den/cask", weight: 1 },
            { table: "irons_spellbooks:chests/ice_spider_den/dungeon", weight: 3 },
            { table: "irons_spellbooks:chests/ice_spider_den/pot", weight: 1 },
            { table: "irons_spellbooks:chests/ice_spider_den/spawner_reward", weight: 3 },
            { table: "irons_spellbooks:chests/ice_spider_den/tower", weight: 2 }
        ]
    },

    "hard": {
        id: "kubejs:chests/hard",
        max_items: 3,
        entries: [
            // Cataclysm
            { table: "cataclysm:entities/the_harbinger", weight: 4 },
            { table: "cataclysm:entities/ender_guardian", weight: 4 },

            // Structory
            { table: "structory_towers:end_tower", weight: 1 },

            // Minecraft
            { table: "minecraft:chests/stronghold_crossing", weight: 1 },
            { table: "minecraft:chests/woodland_mansion", weight: 2 },
            { table: "minecraft:chests/ancient_city", weight: 1 },
            { table: "minecraft:chests/end_city_treasure", weight: 2 },
            { table: "minecraft:chests/trial_chambers/reward_ominous_rare", weight: 2 },
            { table: "minecraft:chests/trial_chambers/reward_rare", weight: 2 },

            // Dungeons Arise (Hard)
            { table: "dungeons_arise:chests/shiraz_palace/shiraz_palace_elite", weight: 2 },
            { table: "dungeons_arise:chests/heavenly_conqueror/heavenly_conqueror_treasure", weight: 1 },
            { table: "dungeons_arise:chests/aviary/aviary_treasure", weight: 1 },
            { table: "dungeons_arise:chests/thornborn_towers/thornborn_towers_top_treasure", weight: 1 },
            { table: "dungeons_arise:chests/infested_temple/infested_temple_vault_treasure", weight: 1 },
            { table: "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_vault_ominous_treasure", weight: 2 },
            { table: "dungeons_arise:chests/kisegi_sanctuary/kisegi_sanctuary_vault_ominous", weight: 1 }
        ]
    },

    "nether": {
        id: "kubejs:chests/nether",
        max_items: 2,
        entries: [
            // Cataclysm
            { table: "cataclysm:entities/netherite_monstrosity", weight: 3 },
            { table: "cataclysm:entities/ignis", weight: 4 },

            // MNS
            { table: "mns:houses", weight: 1 },
            { table: "mns:treasure", weight: 2 },
            { table: "mns:uncommon", weight: 1 },

            // Structory
            { table: "structory_towers:basic/crimson_basic", weight: 1 },
            { table: "structory_towers:basic/fortress_basic", weight: 1 },
            { table: "structory_towers:basic/strange_basic", weight: 1 },
            { table: "structory_towers:basic/warped_basic", weight: 1 },
            { table: "structory_towers:top/crimson_top", weight: 2 },
            { table: "structory_towers:top/fortress_top", weight: 2 },
            { table: "structory_towers:top/warped_top", weight: 2 },
            { table: "structory_towers:sword_portal", weight: 2 },

            // Minecraft
            { table: "minecraft:chests/ruined_portal", weight: 1 },
            { table: "minecraft:chests/nether_bridge", weight: 2 },
            { table: "minecraft:chests/bastion_treasure", weight: 2 },
            { table: "minecraft:chests/bastion_other", weight: 1 },
            { table: "minecraft:chests/bastion_hoglin_stable", weight: 1 },
            { table: "minecraft:chests/bastion_bridge", weight: 1 },

            // Kaisyn
            { table: "kaisyn:village/exclusives/village_piglin_house", weight: 1 },
            { table: "kaisyn:village/exclusives/village_piglin_barrel", weight: 1 },

            // Dungeons Arise (Nether)
            { table: "dungeons_arise:chests/plague_asylum/plague_asylum_potions", weight: 1 },
            { table: "dungeons_arise:chests/lighthouse/lighthouse_top", weight: 1 },
            { table: "dungeons_arise:chests/heavenly_conqueror/heavenly_conqueror_normal", weight: 2 },
            { table: "dungeons_arise:chests/heavenly_conqueror/heavenly_conqueror_barrels", weight: 1 },
            { table: "dungeons_arise:chests/heavenly_challenger/heavenly_challenger_treasure", weight: 3 },
            { table: "dungeons_arise:chests/heavenly_challenger/heavenly_challenger_theater", weight: 2 },
            { table: "dungeons_arise:chests/heavenly_challenger/heavenly_challenger_supply", weight: 1 },
            { table: "dungeons_arise:chests/heavenly_challenger/heavenly_challenger_normal", weight: 2 },
            { table: "dungeons_arise:chests/foundry/foundry_treasure", weight: 3 },
            { table: "dungeons_arise:chests/foundry/foundry_passage_normal", weight: 1 },
            { table: "dungeons_arise:chests/foundry/foundry_normal", weight: 2 },
            { table: "dungeons_arise:chests/foundry/foundry_lava_pit", weight: 1 },
            { table: "dungeons_arise:chests/foundry/foundry_chains", weight: 1 },
            { table: "dungeons_arise:chests/aviary/aviary_normal", weight: 2 },
            { table: "dungeons_arise:chests/aviary/aviary_barrels", weight: 1 },

            { table: "irons_spellbooks:chests/battleground/burial_loot", weight: 1 },
            { table: "irons_spellbooks:chests/battleground/piglin_camp", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/armory_loot", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/coffin_loot", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/crypt_loot", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/hidden_trough_treasure", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/pot", weight: 1 },
            { table: "irons_spellbooks:chests/catacombs/wall_loot", weight: 1 },

            { table: "irons_spellbooks:chests/citadel/citadel_bookshelf", weight: 1 },
            { table: "irons_spellbooks:chests/citadel/citadel_tomes", weight: 1 },
            { table: "irons_spellbooks:chests/citadel/citadel_vault", weight: 1 },
            { table: "irons_spellbooks:chests/citadel/rampart_chest", weight: 1 },
            { table: "irons_spellbooks:chests/citadel/rampart_supplies", weight: 1 },
            { table: "irons_spellbooks:chests/citadel/spawner_reward", weight: 1 }
        ]
    },

    "water": {
        id: "kubejs:chests/water",
        max_items: 2,
        entries: [
            { table: "cataclysm:entities/the_leviathan", weight: 3 },

            // Structory
            { table: "structory:outcast/boat/loot", weight: 1 },
            { table: "structory_towers:basic/lighthouse_basic", weight: 1 },
            { table: "structory_towers:basic/lighthouse_top", weight: 1 },
            { table: "structory_towers:basic/ocean_pillar_basic", weight: 1 },
            { table: "structory_towers:basic/ocean_pillar_top", weight: 1 },
            { table: "structory_towers:top/ocean_pillar_top", weight: 1 },

            // Minecraft
            { table: "minecraft:chests/underwater_ruin_small", weight: 1 },
            { table: "minecraft:chests/underwater_ruin_big", weight: 2 },
            { table: "minecraft:chests/shipwreck_treasure", weight: 1 },
            { table: "minecraft:chests/shipwreck_supply", weight: 1 },
            { table: "minecraft:chests/shipwreck_map", weight: 1 },
            { table: "minecraft:chests/buried_treasure", weight: 2 },

            // Dungeons Arise (Water)
            { table: "dungeons_arise:chests/fishing_hut/fishing_hut_barrels", weight: 1 },
            { table: "dungeons_arise:chests/illager_galley/illager_galley_treasure", weight: 3 },
            { table: "dungeons_arise:chests/typhon/typhon_treasure", weight: 2 },

            // Dungeons Arise Seven Seas (Water) 
            { table: "dungeons_arise_seven_seas:chests/corsair_corvette/corsair_corvette_barrels", weight: 1 },
            { table: "dungeons_arise_seven_seas:chests/corsair_corvette/corsair_corvette_normal", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/corsair_corvette/corsair_corvette_treasure", weight: 2 },

            { table: "dungeons_arise_seven_seas:chests/pirate_junk/pirate_junk_barrels", weight: 1 },
            { table: "dungeons_arise_seven_seas:chests/pirate_junk/pirate_junk_normal", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/pirate_junk/pirate_junk_supply", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/pirate_junk/pirate_junk_treasure", weight: 2 },

            { table: "dungeons_arise_seven_seas:chests/small_yacht/small_yacht_barrels", weight: 1 },
            { table: "dungeons_arise_seven_seas:chests/small_yacht/small_yacht_normal", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/small_yacht/small_yacht_treasure", weight: 2 },

            { table: "dungeons_arise_seven_seas:chests/unicorn_galleon/unicorn_galleon_barrels", weight: 1 },
            { table: "dungeons_arise_seven_seas:chests/unicorn_galleon/unicorn_galleon_normal", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/unicorn_galleon/unicorn_galleon_supply", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/unicorn_galleon/unicorn_galleon_treasure", weight: 2 },

            { table: "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_barrels", weight: 1 },
            { table: "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_normal_lower", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_normal_upper", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_supply", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_treasure", weight: 4 },

            { table: "irons_spellbooks:chests/impaled_icebreaker/captain_quarters", weight: 1 },
            { table: "irons_spellbooks:chests/impaled_icebreaker/food_barrel", weight: 1 }
        ]
    },

    "village": {
        id: "kubejs:chests/village",
        max_items: 3,
        entries: [
            // CTOV
            { table: "ctov:chests/village/village_badlands_house", weight: 2 },
            { table: "ctov:chests/village/village_bakery", weight: 2 },
            { table: "ctov:chests/village/village_beach_house", weight: 2 },
            { table: "ctov:chests/village/village_dark_forest_house", weight: 2 },
            { table: "ctov:chests/village/village_farm", weight: 2 },
            { table: "ctov:chests/village/village_forager", weight: 2 },
            { table: "ctov:chests/village/village_jungle_house", weight: 2 },
            { table: "ctov:chests/village/village_library", weight: 2 },
            { table: "ctov:chests/village/village_mountain_house", weight: 2 },
            { table: "ctov:chests/village/village_mushroom_house", weight: 2 },
            { table: "ctov:chests/village/village_smith", weight: 2 },
            { table: "ctov:chests/village/village_swamp_house", weight: 2 },

            // MVS/MSS/MES
            { table: "mvs:abandoned", weight: 1 },
            { table: "mvs:cart", weight: 1 },
            { table: "mvs:cartographer_tower", weight: 1 },
            { table: "mvs:cathedral_base", weight: 1 },
            { table: "mvs:cathedral_common", weight: 1 },
            { table: "mvs:crystal", weight: 1 },
            { table: "mvs:floating_islands", weight: 1 },
            { table: "mvs:general", weight: 1 },
            { table: "mvs:houses_books", weight: 1 },
            { table: "mvs:houses_common", weight: 1 },
            { table: "mvs:houses_desert", weight: 1 },
            { table: "mvs:houses_flower", weight: 1 },
            { table: "mvs:houses_uncommon", weight: 1 },
            { table: "mvs:jungle_tower", weight: 1 },
            { table: "mvs:large_carts", weight: 1 },
            { table: "mvs:large_carts_2", weight: 1 },
            { table: "mvs:mushroom_pond", weight: 1 },
            { table: "mss:abandoned", weight: 1 },
            { table: "mss:cart", weight: 1 },
            { table: "mss:cartographer_tower", weight: 1 },
            { table: "mss:cathedral_base", weight: 1 },
            { table: "mss:cathedral_common", weight: 1 },
            { table: "mss:crystal", weight: 1 },
            { table: "mss:floating_islands", weight: 1 },
            { table: "mss:general", weight: 1 },
            { table: "mss:houses_books", weight: 1 },
            { table: "mss:houses_common", weight: 1 },
            { table: "mss:houses_desert", weight: 1 },
            { table: "mss:houses_flower", weight: 1 },
            { table: "mss:houses_uncommon", weight: 1 },
            { table: "mss:jungle_tower", weight: 1 },
            { table: "mss:large_carts", weight: 1 },
            { table: "mss:large_carts_2", weight: 1 },
            { table: "mss:mushroom_pond", weight: 1 },
            { table: "mes:abandoned", weight: 1 },
            { table: "mes:cart", weight: 1 },
            { table: "mes:cartographer_tower", weight: 1 },
            { table: "mes:cathedral_base", weight: 1 },
            { table: "mes:cathedral_common", weight: 1 },
            { table: "mes:crystal", weight: 1 },
            { table: "mes:floating_islands", weight: 1 },
            { table: "mes:general", weight: 1 },
            { table: "mes:houses_books", weight: 1 },
            { table: "mes:houses_common", weight: 1 },
            { table: "mes:houses_desert", weight: 1 },
            { table: "mes:houses_flower", weight: 1 },
            { table: "mes:houses_uncommon", weight: 1 },
            { table: "mes:jungle_tower", weight: 1 },
            { table: "mes:large_carts", weight: 1 },
            { table: "mes:large_carts_2", weight: 1 },
            { table: "mes:mushroom_pond", weight: 1 },

            // Structory
            { table: "structory:harvest/old_manor/common", weight: 2 },
            { table: "structory:library/junk", weight: 1 },
            { table: "structory:library/low", weight: 1 },
            { table: "structory:mood/badlands", weight: 1 },
            { table: "structory:mood/cave", weight: 1 },
            { table: "structory:mood/desert", weight: 1 },
            { table: "structory:mood/farmer", weight: 1 },
            { table: "structory:mood/fisherman", weight: 1 },
            { table: "structory:mood/grassy", weight: 1 },
            { table: "structory:mood/jungle", weight: 1 },
            { table: "structory:mood/mangrove", weight: 1 },
            { table: "structory:mood/miner", weight: 1 },
            { table: "structory:mood/mushroom", weight: 1 },
            { table: "structory:mood/ocean", weight: 1 },
            { table: "structory:mood/snowy", weight: 1 },
            { table: "structory:mood/taiga", weight: 1 },
            { table: "structory:outcast/settlement", weight: 2 },
            { table: "structory:ruin/taiga/illager_low", weight: 1 },
            { table: "structory_towers:basic/desert_basic", weight: 1 },
            { table: "structory_towers:basic/farm_basic", weight: 1 },
            { table: "structory_towers:basic/forager_basic", weight: 1 },
            { table: "structory_towers:basic/mangrove_basic", weight: 1 },
            { table: "structory_towers:basic/nomad_basic", weight: 1 },
            { table: "structory_towers:basic/paranoid_basic", weight: 1 },
            { table: "structory_towers:basic/sacred_temple_basic", weight: 1 },
            { table: "structory_towers:basic/small_firetower_basic", weight: 1 },
            { table: "structory_towers:basic/trader_basic", weight: 1 },
            { table: "structory_towers:basic/workshop_basic", weight: 1 },

            // Minecraft
            { table: "minecraft:chests/village/village_weaponsmith", weight: 1 },
            { table: "minecraft:chests/village/village_toolsmith", weight: 1 },
            { table: "minecraft:chests/village/village_temple", weight: 1 },
            { table: "minecraft:chests/village/village_tannery", weight: 1 },
            { table: "minecraft:chests/village/village_taiga_house", weight: 1 },
            { table: "minecraft:chests/village/village_snowy_house", weight: 1 },
            { table: "minecraft:chests/village/village_shepherd", weight: 1 },
            { table: "minecraft:chests/village/village_savanna_house", weight: 1 },
            { table: "minecraft:chests/village/village_plains_house", weight: 1 },
            { table: "minecraft:chests/village/village_mason", weight: 1 },
            { table: "minecraft:chests/village/village_fletcher", weight: 1 },
            { table: "minecraft:chests/village/village_fisher", weight: 1 },
            { table: "minecraft:chests/village/village_desert_house", weight: 1 },
            { table: "minecraft:chests/village/village_cartographer", weight: 1 },
            { table: "minecraft:chests/village/village_butcher", weight: 1 },
            { table: "minecraft:chests/village/village_armorer", weight: 1 },
            { table: "minecraft:chests/trial_chambers/entrance", weight: 1 },
            { table: "minecraft:chests/trial_chambers/supply", weight: 2 },

            // Dungeons Arise (Village)
            { table: "dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_supply", weight: 2 },
            { table: "dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_barrels", weight: 2 },
            { table: "dungeons_arise:chests/thornborn_towers/thornborn_towers_rooms", weight: 1 },
            { table: "dungeons_arise:chests/small_prairie_house/small_prairie_house_ruined", weight: 2 },
            { table: "dungeons_arise:chests/small_prairie_house/small_prairie_house_normal", weight: 3 },
            { table: "dungeons_arise:chests/small_prairie_house/small_prairie_house_barrels", weight: 2 },
            { table: "dungeons_arise:chests/scorched_mines/scorched_mines_hub", weight: 2 },
            { table: "dungeons_arise:chests/plague_asylum/plague_asylum_storage", weight: 2 },
            { table: "dungeons_arise:chests/mushroom_mines/mushroom_mines_tools", weight: 2 },
            { table: "dungeons_arise:chests/mushroom_mines/mushroom_mines_ores", weight: 2 },
            { table: "dungeons_arise:chests/mushroom_house/mushroom_house_normal", weight: 2 },
            { table: "dungeons_arise:chests/mushroom_house/mushroom_house_barrels", weight: 1 },
            { table: "dungeons_arise:chests/monastery/monastery_barrels", weight: 2 },
            { table: "dungeons_arise:chests/mining_system/mining_system_barrels", weight: 2 },
            { table: "dungeons_arise:chests/merchant_campsite/merchant_campsite_tent", weight: 2 },
            { table: "dungeons_arise:chests/merchant_campsite/merchant_campsite_supply", weight: 2 },
            { table: "dungeons_arise:chests/merchant_campsite/merchant_campsite_map", weight: 2 },
            { table: "dungeons_arise:chests/mechanical_nest/mechanical_nest_supply", weight: 2 },
            { table: "dungeons_arise:chests/illager_galley/illager_galley_supply", weight: 2 },
            { table: "dungeons_arise:chests/illager_galley/illager_galley_barrels", weight: 1 },
            { table: "dungeons_arise:chests/illager_corsair/illager_corsair_supply", weight: 2 },
            { table: "dungeons_arise:chests/illager_corsair/illager_corsair_barrels", weight: 1 },
            { table: "dungeons_arise:chests/illager_campsite/illager_campsite_supply", weight: 2 },
            { table: "dungeons_arise:chests/greenwood_pub/greenwood_pub_barrels_normal", weight: 1 },
            { table: "dungeons_arise:chests/greenwood_pub/greenwood_pub_barrels_hallways", weight: 1 },
            { table: "dungeons_arise:chests/bathhouse/bathhouse_normal", weight: 2 },
            { table: "dungeons_arise:chests/bathhouse/bathhouse_barrels", weight: 1 },
            { table: "dungeons_arise:chests/bandit_village/bandit_village_supply", weight: 2 },
            { table: "dungeons_arise:chests/bandit_towers/bandit_towers_supply", weight: 2 },
            { table: "dungeons_arise:chests/bandit_towers/bandit_towers_rooms", weight: 2 },
            { table: "dungeons_arise:chests/bandit_towers/bandit_towers_normal", weight: 2 },
            { table: "dungeons_arise:chests/bandit_towers/bandit_towers_barrels", weight: 2 },
            { table: "dungeons_arise:chests/abandoned_temple/abandoned_temple_entrance", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/pirate_junk/pirate_junk_supply", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/unicorn_galleon/unicorn_galleon_supply", weight: 2 },
            { table: "dungeons_arise_seven_seas:chests/victory_frigate/victory_frigate_supply", weight: 2 }
        ]
    },

    "empty": {
        id: "kubejs:chests/empty",
        max_items: 1,
        entries: [
            { type: "empty", weight: 1 }
        ]
    }
};


LootJS.lootTables(event => {
    const blacklist = [
        'cataclysm:ancient_metal_block',
        'cataclysm:witherite_block',
        'cataclysm:void_core',
        'cataclysm:remnant_skull',
        'cataclysm:abyssal_egg',
        'cataclysm:tidal_claws'
    ];
    for (let [key, config] of Object.entries(integratedLootTables)) {
        event.create(config.id, LootType.CHEST).createPool(pool => {
            let minRolls = Math.max(1, Math.floor(config.max_items * 0.3));
            let maxRolls = Math.max(2, Math.floor(config.max_items * 0.6));
            pool.rolls([minRolls, maxRolls]);
            // 添加所有条目
            for (let entry of config.entries) {
                if (entry.type === "empty") {
                    pool.addEntry(LootEntry.empty().withWeight(entry.weight));
                } else if (entry.table) {
                    pool.addEntry(
                        LootEntry.reference(entry.table).withWeight(entry.weight)
                    );
                }
            }
        }).onDrop((context, loot) => {
            const filtered = [];
            for (let item of loot) {
                if (!blacklist.includes(item.id)) {
                    filtered.push(item);
                }
            }
            loot.clear();
            for (let item of filtered) {
                loot.addItem(item);
            }
        });
    }
});
