/**
 * 反向击退
 */
function knockback(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:knockback")) {
        return;
    }

    const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:knockback");

    const dx = attacker.x - entity.x;
    const dz = attacker.z - entity.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    const power = 1.0 + (traitLevel * 0.5);
    const knockbackX = -(dx / distance) * power;
    const knockbackZ = -(dz / distance) * power;

    entity.knockback(power, knockbackX, knockbackZ);
}