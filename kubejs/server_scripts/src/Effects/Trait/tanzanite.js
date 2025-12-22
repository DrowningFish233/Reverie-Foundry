/**
 * 坦桑石
 */
function tanzanite(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:tanzanite")) {
        return;
    }
    let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:tanzanite");

    const debuffs = [
        "minecraft:slowness",
        "minecraft:weakness",
        "minecraft:mining_fatigue",
        "minecraft:nausea",
        "minecraft:blindness",
        "minecraft:wither",
        "minecraft:poison",
        "minecraft:darkness",
        "kubejs:bleed"
    ];

    const randomDebuff = debuffs[Math.floor(Math.random() * debuffs.length)];

    if (entity && entity.isLiving()) {
        entity.potionEffects.add(randomDebuff, traitLevel * 5 * 20, traitLevel - 1);
    }
}