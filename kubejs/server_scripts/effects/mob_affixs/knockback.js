/**
 * 反向击退
 */
function knockback(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:knockback")) {
        return;
    }

    const Effect = attacker.getEffect("kubejs:knockback");
    const Level = Effect.getAmplifier();

    const dx = attacker.x - entity.x;
    const dz = attacker.z - entity.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    // 根据效果等级动态调整击退力度
    const power = 1.0 + (Level * 0.5); // 基础1.0，每级+0.5
    const knockbackX = -(dx / distance) * power;   // 反向向量
    const knockbackZ = -(dz / distance) * power;

    entity.knockback(power, knockbackX, knockbackZ);
}