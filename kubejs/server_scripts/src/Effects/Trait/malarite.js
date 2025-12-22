/**
 * 瘴紫石
 */
function malarite(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.player || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:malarite")) {
        return;
    }
    entity.potionEffects.add("minecaft:poison", 40, 0);
    let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:malarite")
    if (entity.hasEffect("minecaft:poison")) {
        attacker.potionEffects.add("irons_spellbooks:spider_aspect", traitLevel * 2, traitLevel);
    }
}