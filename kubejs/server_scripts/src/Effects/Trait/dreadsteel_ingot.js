/**
 * 惧钢锭
 */
function dreadsteel_ingot_effect(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving()) return;
    if (!fu_hasTraitAnywhere(attacker, "kubejs:dreadsteel_ingot")) return;
    let Trait_Level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:dreadsteel_ingot")
    entity.potionEffects.add("kubejs:fear", 20 * 10, Trait_Level);
} 