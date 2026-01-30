/**
 * 满血给额外增伤效果
 */
function maxhealth(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:strip")) {
        return;
    }
    const entity_maxhealth = entity.getMaxHealth()
    if (entity.health === entity_maxhealth) {
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:strip");
        const extraDamage = traitLevel + 5;
        attackEntity(entity, 'generic', extraDamage, true)

    }
}