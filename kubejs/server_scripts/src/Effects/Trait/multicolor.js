/**
 * 孔塞石[多色]
 */
function multicolor(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.player || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:multicolor")) {
        return;
    }
    const debuffs = [
        'minecraft:weakness',
        'minecraft:slowness',
        'minecraft:wither',
        'kubejs:bleed'
    ];
    const randomDebuff = debuffs[Math.floor(Math.random() * debuffs.length)];

    const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:multicolor");
    const durationTicks = (traitLevel + 4) * 20;

    entity.potionEffects.add(randomDebuff, durationTicks, traitLevel - 1);
}