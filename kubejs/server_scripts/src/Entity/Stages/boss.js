/**
 * 阶段限制BOSS id(仅禁止被攻击)
 */

const BOSS_MOBS = [
    //戈伯后
    ["astage/boss/eater_of_world", "terra_entity:eater_of_worlds", "first_kill_dead_king"],
    ["astage/boss/brain_of_cthulhu", "terra_entity:brain_of_cthulhu", "first_kill_dead_king"],
    ["astage/boss/queen_bee", "terra_entity:queen_bee", "first_kill_dead_king"],
    ["astage/boss/skeletron", "terra_entity:skeletron", "first_kill_dead_king"],
    ["astage/boss/lich", "bosses_of_mass_destruction:lich", "first_kill_dead_king"],
    //下界戈伯后
    ["astage/boss/gauntlet", "bosses_of_mass_destruction:gauntlet", "first_kill_skeletron"],
    ["astage/boss/fire_boss", "irons_spellbooks:fire_boss", "first_kill_skeletron"],
    ["astage/boss/netherite_ministrosity", "cataclysm:netherite_ministrosity", "first_kill_skeletron"],
    ["astage/boss/the_harbinger", "cataclysm:the_harbinger", "first_kill_skeletron"],
    ["astage/boss/the_leviathan", "cataclysm:the_leviathan", "first_kill_skeletron"],
    ["astage/boss/ancient_remnant", "cataclysm:ancient_remnant", "first_kill_skeletron"],
    ["astage/boss/ignis", "cataclysm:ignis", "first_kill_skeletron"],
    ["astage/boss/netherite_monstrosity", "cataclysm:netherite_monstrosity", "first_kill_skeletron"],
    ["astage/boss/maledictus", "cataclysm:maledictus", "first_kill_skeletron"],
    ["astage/boss/hippocamtus", "cataclysm:hippocamtus", "first_kill_skeletron"],
    //末地戈伯后
    ["astage/boss/obsidilith", "bosses_of_mass_destruction:obsidilith", "first_kill_fire_boss"],
    ["astage/boss/ender_guardian", "cataclysm:ender_guardian", "first_kill_fire_boss"],
    ["astage/boss/rift_weaver", "ftboceanmobs:rift_weaver", "first_kill_fire_boss"],
    ["astage/boss/dark_doppelganger", "darkdoppelganger:dark_doppelganger", "first_kill_fire_boss"],
];

BOSS_MOBS.forEach(([id, mob, stage]) => {
    AStages.addRestrictionForMob(id, stage, mob)
        .disableAttack()
});



EntityEvents.beforeHurt(event => {
    const { entity, source } = event;
    const attacker = source.getPlayer();
    if (!attacker) return;

    const targetType = entity.getType();

    let requiredStage = null;
    for (let i = 0; i < BOSS_MOBS.length; i++) {
        if (BOSS_MOBS[i][1] === targetType) {
            requiredStage = BOSS_MOBS[i][2];
            break;
        }
    }

    if (!requiredStage) return;

    if (!AStages.playerHasStage(requiredStage, attacker)) {
        event.cancel();
    }
});