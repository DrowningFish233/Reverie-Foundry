/**
 * 虎标弹(凋零合金)
 */
function wither_howitzer_attack(event) {
    const { source, entity } = event;
    const attacker = source.player
    if (!attacker || !attacker.isLiving()) return;

    if (!fu_hasTraitAnywhere(attacker, "kubejs:wither_howitzer")) return;

    const pData = attacker.persistentData;
    const witherHowitzerValue = pData.getInt("wither_howitzer") || 0;
    if (witherHowitzerValue <= 0) return;

    new_damage(event, STAGE.MULTIPLY, 1.2);

    const dx = attacker.x - entity.x;
    const dz = attacker.z - entity.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    if (distance > 0) {
        const power = 3;
        entity.knockback(
            power,
            dx / distance,
            dz / distance
        );
    }
    pData.putInt("wither_howitzer", witherHowitzerValue - 1);
}