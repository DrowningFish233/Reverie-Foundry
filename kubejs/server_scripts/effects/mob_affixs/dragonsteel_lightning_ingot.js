/**
 * 龙霆钢锭效果
 */
function dragonsteel_lightning_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    // 基础条件检查
    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:dragonsteel_lightning_ingot")) {
        return;
    }

    // 效果叠加逻辑
    const attackEffect = entity.getEffect("kubejs:dragonsteel_lightning_ingot_attack");
    const attackLevel = attackEffect ? attackEffect.getAmplifier() : 0;
    const newHurtLevel = attackLevel + 1;
    const bleedEffect = entity.getEffect("kubejs:bleed");
    const bleedLevel = bleedEffect ? bleedEffect.getAmplifier() : 0;
    const newbleedLevel = bleedLevel + 1;

    // 攻击效果处理
    if (newHurtLevel >= 3) {
        entity.removeEffect("kubejs:dragonsteel_lightning_ingot_attack");
        entity.attack($DamageSource("magic"), 20);
    } else {
        entity.potionEffects.add("kubejs:dragonsteel_lightning_ingot_attack", 20 * 5, newHurtLevel);
    }

    // 流血效果处理
    entity.potionEffects.add("kubejs:bleed", 20 * 10, newbleedLevel);
    if (bleedLevel >= 9) {
        entity.removeEffect("kubejs:bleed");
        entity.potionEffects.add("kubejs:bleed", 20 * 8, bleedLevel - 8);
        attacker.potionEffects.add("kubejs:absorption", 20 * 10, 0);
        attacker.setAbsorptionAmount(20);
    }

    if (entity.hasEffect("kubejs:dragonsteel_lightning_ingot_attack")) {
        const fireRadius = 2;
        const nearbyEntities = entity.level.getEntities(
            entity, // 排除自身
            entity.getBoundingBox().inflate(fireRadius)
        );

        for (let fireTarget of nearbyEntities) {
            if (fireTarget.living && !fireTarget.hasEffect("kubejs:dragonsteel_lightning_ingot_attack")) {
                fireTarget.potionEffects.add("kubejs:dragonsteel_lightning_ingot_attack", 20 * 5, 1);
                fireTarget.attack($DamageSource("magic"), 10);
            }
        }
    }
}