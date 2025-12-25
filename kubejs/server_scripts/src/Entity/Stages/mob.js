// 阶段限制生物ID
const MOBS = [
    ["astage/mob/archmage_pet", "alshanex_familiars:archmage_pet", "first_kill_dead_king"],
    ["astage/mob/bard_pet", "alshanex_familiars:bard_pet", "first_kill_dead_king"],
    ["astage/mob/cleric_pet", "alshanex_familiars:cleric_pet", "first_kill_dead_king"],
    ["astage/mob/druid_pet", "alshanex_familiars:druid_pet", "first_kill_dead_king"],
    ["astage/mob/frostling_pet", "alshanex_familiars:frostling_pet", "first_kill_dead_king"],
    ["astage/mob/hunter_pet", "alshanex_familiars:hunter_pet", "first_kill_dead_king"],
    ["astage/mob/illusionist_pet", "alshanex_familiars:illusionist_pet", "first_kill_dead_king"],
    ["astage/mob/mage_pet", "alshanex_familiars:mage_pet", "first_kill_dead_king"],
    ["astage/mob/necromancer_pet", "alshanex_familiars:necromancer_pet", "first_kill_dead_king"],
    ["astage/mob/plague_pet", "alshanex_familiars:plague_pet", "first_kill_dead_king"],
    ["astage/mob/summoner_pet", "alshanex_familiars:summoner_pet", "first_kill_dead_king"],
    ["astage/mob/scorcher_pet", "alshanex_familiars:scorcher_pet", "first_kill_dead_king"],

    ["astage/mob/wildfire", "friendsandfoes:wildfire", "first_kill_fire_boss"],

    //末地末影人击败末影龙解锁
    ["astage/mob/end_islands_enderman", "endermanoverhaul:end_islands_enderman", "first_kill_ender_guardian"],
    ["astage/mob/end_enderman", "endermanoverhaul:end_enderman", "first_kill_ender_guardian"],
    /*
    ["astage/mob/windswept_hills_enderman", "endermanoverhaul:windswept_hills_enderman", "first_kill_ender_guardian"],
    ["astage/mob/flower_fields_enderman", "endermanoverhaul:flower_fields_enderman", "first_kill_ender_guardian"],
    ["astage/mob/ice_spikes_enderman", "endermanoverhaul:ice_spikes_enderman", "first_kill_ender_guardian"],
    ["astage/mob/mushroom_fields_enderman", "endermanoverhaul:mushroom_fields_enderman", "first_kill_ender_guardian"],
    ["astage/mob/nether_wastes_enderman", "endermanoverhaul:nether_wastes_enderman", "first_kill_ender_guardian"],
    ["astage/mob/coral_enderman", "endermanoverhaul:coral_enderman", "first_kill_ender_guardian"],
    ["astage/mob/savanna_enderman", "endermanoverhaul:savanna_enderman", "first_kill_ender_guardian"],
    ["astage/mob/snowy_enderman", "endermanoverhaul:snowy_enderman", "first_kill_ender_guardian"],
    ["astage/mob/badlands_enderman", "endermanoverhaul:badlands_enderman", "first_kill_ender_guardian"],
    ["astage/mob/cave_enderman", "endermanoverhaul:cave_enderman", "first_kill_ender_guardian"],
    ["astage/mob/crimson_forest_enderman", "endermanoverhaul:crimson_forest_enderman", "first_kill_ender_guardian"],
    ["astage/mob/desert_enderman", "endermanoverhaul:desert_enderman", "first_kill_ender_guardian"],
    ["astage/mob/soulsand_valley_enderman", "endermanoverhaul:soulsand_valley_enderman", "first_kill_ender_guardian"],
    ["astage/mob/swamp_enderman", "endermanoverhaul:swamp_enderman", "first_kill_ender_guardian"],
    ["astage/mob/savanna_enderman", "endermanoverhaul:warped_forest_enderman", "first_kill_ender_guardian"],
    */
];

MOBS.forEach(([id, mob, stage]) => {
    AStages.addRestrictionForMob(id, stage, mob)
        .setEnableMobSpawning(false)
        .setCanBeRightClicked(false)
        .setCanBeAttacked(false)
});