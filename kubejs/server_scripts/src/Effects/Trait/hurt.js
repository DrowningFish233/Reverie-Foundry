/**
 * 处理易伤效果
 */
function hurtEffect(event) {
    const { entity, source } = event;

    if (!entity.isLiving()) return;

    let hasVulnerability = false;
    let totalLevel = 0;

    if (entity.hasEffect("kubejs:panic")) {
        let panicEffect = entity.getEffect("kubejs:panic");
        totalLevel += panicEffect.getAmplifier() + 1;
        hasVulnerability = true;
    }

    if (entity.hasEffect("kubejs:hurt")) {
        let hurtEffect = entity.getEffect("kubejs:hurt");
        totalLevel += hurtEffect.getAmplifier() + 1;
        hasVulnerability = true;
    }

    if (hasVulnerability) {
        let multiplier = 1 + totalLevel * 0.5;
        new_damage(event, STAGE.MULTIPLY, multiplier);
    }
}