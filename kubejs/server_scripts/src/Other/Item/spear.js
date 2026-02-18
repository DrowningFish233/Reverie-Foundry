ItemEvents.firstRightClicked('silentgear:spear', event => {
    const item = event.item;
    if (!fu_isGear(item)) return;

    const player = event.player;
    const world = player.level;
    if ($CooldownManager.hasCooldown(player, 'spearCharge')) return;

    const attackDamage = fu_getAttackDamageModifier(item);
    const attackSpeed = fu_getAttackSpeedModifier(item);

    const minReach = 1.0;
    const maxReach = 4.0 + attackDamage * 0.1;
    const actualCooldown = Math.max(10, 40 - (attackSpeed - 4.0) * 8);

    const searchRadius = maxReach + 2.0;
    const potentialTargets = world.getEntities(
        player,
        player.getBoundingBox().inflate(searchRadius)
    ).filter(entity =>
        entity.isLiving() &&
        !entity.isInvulnerable() &&
        entity !== player
    );

    if (potentialTargets.isEmpty()) return;

    const eyePos = player.getEyePosition();
    const pitchRad = player.xRot * Math.PI / 180;
    const yawRad = player.yRot * Math.PI / 180;

    const cosPitch = Math.cos(pitchRad);
    const lookVec = {
        x: -Math.sin(yawRad) * cosPitch,
        y: -Math.sin(pitchRad),
        z: Math.cos(yawRad) * cosPitch
    };

    const rayStart = {
        x: eyePos.x + lookVec.x * minReach,
        y: eyePos.y + lookVec.y * minReach,
        z: eyePos.z + lookVec.z * minReach
    };

    const rayEnd = {
        x: eyePos.x + lookVec.x * maxReach,
        y: eyePos.y + lookVec.y * maxReach,
        z: eyePos.z + lookVec.z * maxReach
    };

    let hasHitTarget = false;

    for (let i = 0; i < potentialTargets.size(); i++) {
        let entity = potentialTargets.get(i);
        let entityBox = entity.getBoundingBox();

        let entityPos = entity.position();
        let dx = entityPos.x - eyePos.x;
        let dz = entityPos.z - eyePos.z;
        let horizontalDistSq = dx * dx + dz * dz;

        if (horizontalDistSq > (maxReach * maxReach * 1.5)) continue;

        if (RayCasting(rayStart, rayEnd, entityBox)) {
            hasHitTarget = true;
            let baseDamage = attackDamage * 0.5;

            let exactSpeed = player.getTotalMovementSpeed();

            if (exactSpeed <= 0.1) {
                if (baseDamage > 0) {
                    attackEntity(entity, 'generic', baseDamage, true);
                }
                continue;
            }

            let effectiveSpeed = exactSpeed - 0.1;
            let damageBonus = Math.min(effectiveSpeed * 60, 1000);
            let speedMultiplier = 1 + damageBonus;

            let totalDamage = Math.min(
                baseDamage * speedMultiplier,
                1000.0
            );

            if (totalDamage > 0) {
                attackEntity(entity, 'generic', totalDamage, true);
            }
        }
    }

    if (hasHitTarget) {
        player.swing();
        $CooldownManager.setCooldown(player, 'spearCharge', actualCooldown);
        player.addItemCooldown(item, actualCooldown);
        fu_attemptDamageByHand(item, 2, player, 'MAIN_HAND');
    }
});

/**
 * 矛会根据玩家速度增伤，至多300%
 * 只有超过基础速度的部分才计算增伤
 */
function spearMomentumDamage(event) {
    const { source, entity, damage } = event;

    const attacker = source.player || source.actual;
    if (!attacker || !attacker.isPlayer() || !entity.isLiving()) return;

    let mainHandItem = attacker.getMainHandItem();
    if (!mainHandItem || mainHandItem.isEmpty()) return;

    if (mainHandItem !== "silentgear:spear") return
    const exactSpeed = attacker.getTotalMovementSpeed();
    if (exactSpeed <= 0.1) return;

    const effectiveSpeed = exactSpeed - 0.1;

    const damageBonus = Math.min(effectiveSpeed * 10, 3);
    const speedMultiplier = 1 + damageBonus;

    new_damage(event, STAGE.MULTIPLY, speedMultiplier);
}
