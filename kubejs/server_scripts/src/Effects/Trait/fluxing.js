/**
 * 对燃起来的怪物增伤效果
 * 当玩家有fluxing效果时，对任何燃烧的实体造成额外伤害
 */
function fluxing(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.player || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:fluxing")) {
        return;
    }
    if (entity.isOnFire() || entity.isInLava()) {
        let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:fluxing");
        let damageMultiplier = 1 + (traitLevel * 0.2);

        new_damage(event, STAGE.ADDITIVE, damageMultiplier);
    }
}