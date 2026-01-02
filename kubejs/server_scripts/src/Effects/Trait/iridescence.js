/**
 * 欧泊[变彩]
 */
function iridescence(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.isPlayer() || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:iridescence")) {
        return;
    }

    const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:iridescence");

    const minDamage = traitLevel;
    const maxDamage = traitLevel + 6;
    const addedDamage = minDamage + Math.floor(Math.random() * (maxDamage - minDamage + 1));

    new_damage(event, STAGE.FLAT, addedDamage);
}