function bismuthgems(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:bismuthgems")) {
        return;
    }

    let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:bismuthgems");
    let NewLevel = traitLevel * 4
    let currentArmor = entity.getArmorValue()
    if (currentArmor < NewLevel) {
        entity.attack($DamageSource("generic"), 10);
    }
}