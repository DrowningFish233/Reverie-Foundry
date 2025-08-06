/**
 * 处理流血效果
 */
function handleBleed(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:bleed")) {
        return;
    }

    const bleedEffect = attacker.getEffect("kubejs:bleed");
    const currentLevel = bleedEffect.getAmplifier() + 1;
    const newLevel = Math.floor(currentLevel / 3); // 计算保留层数

    attacker.attack($DamageSource("out_of_world"), currentLevel * 2);
    attacker.removeEffect("kubejs:bleed");
    if (newLevel > 0) {
        attacker.potionEffects.add("kubejs:bleed", 500, newLevel - 1);
    }
}