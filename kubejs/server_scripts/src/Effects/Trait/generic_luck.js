/**
 * 幸运暴击
 */
function generic_luck(event) {
    const { source, entity } = event;
    const attacker = source.player;
    if (!attacker || !entity.isLiving()) return;
    if (!fu_hasTraitAnywhere(attacker, 'kubejs:luck')) return

    const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:luck");

    const luck = attacker.getAttribute('minecraft:generic.luck')?.value ?? 0;

    const diceRoll = 1 + Math.floor(Math.random() * 10);
    if (diceRoll <= traitLevel) {
        const bonusPercent = (20 * traitLevel - luck);
        const minBonus = 5;
        const effectiveBonus = Math.max(minBonus, bonusPercent);

        const bonusDamage = (effectiveBonus / 100);
        new_damage(event, STAGE.FLAT, bonusDamage);
        spawnParticles_witch(entity, attacker);
    }
}


function spawnParticles_witch(entity, player) {
    let entityX = entity.x
    let entityY = entity.y
    let entityZ = entity.z

    let height = Math.random() * 2
    let offsetX = (Math.random() - 0.5) * 1.2
    let offsetZ = (Math.random() - 0.5) * 1.2

    player.level.spawnParticles(
        'minecraft:witch',      // 粒子类型
        true,                      // 是否强制显示
        entity.x,                  // 中心X坐标
        entity.y + 1,              // 中心Y坐标
        entity.z,                  // 中心Z坐标
        0.5,                       // X方向扩散范围
        1.0,                       // Y方向扩散范围
        0.5,                       // Z方向扩散范围
        20,                        // 粒子数量
        0.15                       // 粒子速度
    )
}

function sweep_attack(entity, player) {
    let entityX = entity.x
    let entityY = entity.y
    let entityZ = entity.z

    let height = Math.random() * 2
    let offsetX = (Math.random() - 0.5) * 1.2
    let offsetZ = (Math.random() - 0.5) * 1.2

    player.level.spawnParticles(
        'minecraft:sweep_attack',      // 粒子类型
        true,                      // 是否强制显示
        entity.x,                  // 中心X坐标
        entity.y + 1,              // 中心Y坐标（向上偏移1格，因为height范围是0-2）
        entity.z,                  // 中心Z坐标
        0.5,                       // X方向扩散范围（对应 offsetX 的 ±0.75）
        1.0,                       // Y方向扩散范围（对应 height 的 0-2）
        0.5,                       // Z方向扩散范围（对应 offsetZ 的 ±0.75）
        20,                        // 粒子数量（40次循环 × 每次2个粒子）
        0.15                       // 粒子速度
    )
}