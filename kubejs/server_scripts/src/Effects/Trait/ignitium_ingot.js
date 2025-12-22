//焰魔
function ignitium_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:ignitium_ingot")) {
        return;
    }

    let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:ignitium_ingot");

    entity.potionEffects.add("cataclysm:blazing_brand", traitLevel * 20, traitLevel - 1);
}