
EntityEvents.spawned('minecraft:item', event => {
    let entity = event.entity
    let itemId = entity.item.getId()

    // 当特定的物品被丢出时，召唤相应的生物,以此来伪造祭坛召唤生物
    switch (itemId) {
        case 'terra_entity:skeletron_spawn_egg':
            summonMob(10, entity, 'terra_entity:skeletron', 'kubejs:boss_summon')
            break;

        case 'terra_entity:king_slime_spawn_egg':
            summonMob(10, entity, 'terra_entity:king_slime', 'kubejs:boss_summon')
            break;

        case 'terra_entity:cthulhu_eye_spawn_egg':
            summonMob(10, entity, 'terra_entity:eye_of_cthulhu', 'kubejs:boss_summon')
            break;

        case 'terra_entity:eater_of_world_spawn_egg':
            summonMob(10, entity, 'terra_entity:eater_of_worlds', 'kubejs:boss_summon')
            break;

        case 'terra_entity:queen_bee_spawn_egg':
            summonMob(10, entity, 'terra_entity:queen_bee', 'kubejs:boss_summon')
            break;

        case 'terra_entity:brain_of_cthulhu_spawn_egg':
            summonMob(10, entity, 'terra_entity:brain_of_cthulhu', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_amethyst_crab':
            summonMob(10, entity, 'cataclysm:amethyst_crab', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_gauntlet':
            summonMob(10, entity, 'bosses_of_mass_destruction:gauntlet', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_lich':
            summonMob(10, entity, 'bosses_of_mass_destruction:lich', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_obsidilith':
            summonMob(10, entity, 'bosses_of_mass_destruction:obsidilith', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_void_blossom':
            summonMob(10, entity, 'bosses_of_mass_destruction:void_blossom', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_fire_boss':
            summonMob(10, entity, 'irons_spellbooks:fire_boss', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_dead_king':
            summonMob(10, entity, 'irons_spellbooks:dead_king', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_amethyst_crab':
            summonMob(10, entity, 'cataclysm:amethyst_crab', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_ignis':
            summonMobWithDimensions(10, entity, 'cataclysm:ignis', 'kubejs:boss_summon', 'minecraft:the_nether')
            break;

        case 'kubejs:summon_the_leviathan':
            summonMob(10, entity, 'cataclysm:the_leviathan', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_ancient_remnant':
            summonMob(10, entity, 'cataclysm:ancient_remnant', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_maledictus':
            summonMob(10, entity, 'cataclysm:maledictus', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_scylla':
            summonMob(10, entity, 'cataclysm:scylla', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_the_harbinger':
            summonMob(10, entity, 'cataclysm:the_harbinger', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_starlight_golem':
            summonMobInStructure(10, entity, "eternal_starlight:starlight_golem", "kubejs:boss_summon", "eternal_starlight:golem_forge");
            break;

        case 'kubejs:summon_lunar_monstrosity':
            summonMobInStructure(10, entity, "eternal_starlight:lunar_monstrosity", "kubejs:boss_summon", "eternal_starlight:cursed_garden");
            break;

        case 'kubejs:summon_ender_guardian':
            summonMobWithDimensions(10, entity, 'cataclysm:ender_guardian', 'kubejs:boss_summon', 'minecraft:the_end')
            break;

        case 'kubejs:summon_netherite_monstrosity':
            summonMob(10, entity, 'cataclysm:netherite_monstrosity', 'kubejs:boss_summon')
            break;

        case 'kubejs:summon_frostling_pet':
            summonMob(10, entity, 'alshanex_familiars:frostling_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_mage_pet':
            summonMob(10, entity, 'alshanex_familiars:mage_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_archmage_pet':
            summonMob(10, entity, 'alshanex_familiars:archmage_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_summoner_pet':
            summonMob(10, entity, 'alshanex_familiars:summoner_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_necromancer_pet':
            summonMob(10, entity, 'alshanex_familiars:necromancer_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_hunter_pet':
            summonMob(10, entity, 'alshanex_familiars:hunter_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_druid_pet':
            summonMob(10, entity, 'alshanex_familiars:druid_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_illusionist_pet':
            summonMob(10, entity, 'alshanex_familiars:illusionist_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_scorcher_pet':
            summonMob(10, entity, 'alshanex_familiars:scorcher_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_cleric_pet':
            summonMob(10, entity, 'alshanex_familiars:cleric_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_plague_pet':
            summonMob(10, entity, 'alshanex_familiars:plague_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_bard_pet':
            summonMob(10, entity, 'alshanex_familiars:bard_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'kubejs:summon_dragon_warrior_pet':
            summonMob(10, entity, 'alshanex_familiars:dragon_warrior_pet', 'alshanex_familiars:angel_cast')
            break;

        case 'darkdoppelganger:shadow_orb':
            summonDarkDoppelganger(10, entity, null, null, null, null, null, 'kubejs:final_boss_summon')
            break;
    }
})
