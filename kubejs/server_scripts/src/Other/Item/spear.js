/**
 * 矛会根据玩家速度增伤，至多300%
 * 只有超过基础速度(0.1)的部分才计算增伤
 */
EntityEvents.beforeHurt(event => {
    const { source, entity, damage } = event;

    const attacker = source.player || source.actual;
    if (!attacker || !attacker.isPlayer() || !entity.isLiving()) return;

    let mainHandItem = attacker.getMainHandItem();
    if (!mainHandItem || mainHandItem.isEmpty()) return;

    if (mainHandItem !== "silentgear:spear") return
    const exactSpeed = attacker.getSpeed();
    if (exactSpeed <= 0.1) return;

    const effectiveSpeed = exactSpeed - 0.1;

    const damageBonus = Math.min(effectiveSpeed * 10, 3);
    const speedMultiplier = 1 + damageBonus;

    new_damage(event, STAGE.MULTIPLY, speedMultiplier);

});