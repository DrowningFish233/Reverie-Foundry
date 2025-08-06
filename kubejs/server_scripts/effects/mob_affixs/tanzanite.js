/**
 * 坦桑石
 */
function tanzanite(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.living || !attacker.hasEffect("kubejs:tanzanite")) {
        return;
    }
    let tanzaniteEffect = attacker.getEffect("kubejs:tanzanite");
    let tanzaniteLevel = tanzaniteEffect.getAmplifier();

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

    if (entity && entity.living) {
        entity.potionEffects.add(randomDebuff, tanzaniteLevel * 5 * 20, tanzaniteLevel - 1);
    }
}