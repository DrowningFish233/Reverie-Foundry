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

    ["astage/mob/wildfire", "friendsandfoes:wildfire", "first_kill_fire_boss"]
];

MOBS.forEach(([id, mob, stage]) => {
    AStages.addRestrictionForMob(id, stage, mob)
        .disableOverallSpawning()
        .replaceWith("minecraft:slime")
        .disableRightClick()
        .disableAttack()
});
