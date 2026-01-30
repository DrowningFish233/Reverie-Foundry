/**
 * 月亮石
 */
function moonstone(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:moonstone")) {
        return;
    }

    let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:moonstone");
    let time = event.level.getDayTime() % 24000;
    let extraMagicDamage = traitLevel * 2 + 2;

    if (time <= 12000) {
        new_damage(event, STAGE.ADDITIVE, 1 - (traitLevel * 0.1));
    }
    else {
        attackEntity(entity, 'magic', extraMagicDamage, true)
    }
}