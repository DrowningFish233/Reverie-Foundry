/**
 * 孔塞石[多色]
 */
function multicolor(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:multicolor")) {
        return;
    }
    const debuffs = [
        'minecraft:weakness',    // 虚弱
        'minecraft:slowness',    // 缓慢
        'minecraft:wither',       // 凋灵
        'kubejs:bleed'          //流血
    ];
    const randomDebuff = debuffs[Math.floor(Math.random() * debuffs.length)];

    const effectLevel = attacker.getEffect('kubejs:multicolor').amplifier + 1;
    const durationTicks = (effectLevel + 4) * 20;

    entity.potionEffects.add(randomDebuff, durationTicks, effectLevel);
}
