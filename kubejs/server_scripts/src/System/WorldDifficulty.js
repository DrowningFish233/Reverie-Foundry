// priority: 10
// 检查生物是否在黑名单中
function isBlacklisted(entity) {
    let entityTypeStr = entity.getType().toString();
    return DIFFICULTY_BLACKLIST.includes(entityTypeStr);
}

// 计算合并后的难度倍数
function calculateCombinedMultipliers(gameDiff, stageDiff, isBlacklisted) {
    let gameMultiplier = GAME_DIFFICULTY_LEVELS[gameDiff];
    let stageBonus = STAGE_DIFFICULTY_BONUS[stageDiff] || STAGE_DIFFICULTY_BONUS['difficult_0'];

    // 如果是黑名单生物，忽略游戏难度加成
    if (isBlacklisted) {
        return {
            health: stageBonus.health,
            attack: stageBonus.attack,
            armor: stageBonus.armor,
            toughness: stageBonus.toughness,
            follow_range: 0
        };
    }

    return {
        health: gameMultiplier.health * stageBonus.health,
        attack: gameMultiplier.attack * stageBonus.attack,
        armor: gameMultiplier.armor * stageBonus.armor,
        toughness: gameMultiplier.toughness * stageBonus.toughness,
        follow_range: gameMultiplier.follow_range
    };
}

/**
 * 获取玩家最高阶段难度
 */
function getPlayerHighestStageDifficulty(player) {
    let diffStage = player.stages.getAll().toArray();
    if (!diffStage || diffStage.length === 0) return null;

    let highestDifficulty = null;
    let highestLevel = -1;

    for (let difficulty in STAGE_DIFFICULTY_BONUS) {
        if (diffStage.some(stage => stage === difficulty)) {
            if (STAGE_DIFFICULTY_BONUS[difficulty].level > highestLevel) {
                highestLevel = STAGE_DIFFICULTY_BONUS[difficulty].level;
                highestDifficulty = difficulty;
            }
        }
    }

    return highestDifficulty;
}

EntityEvents.checkSpawn(event => {
    let entity = event.entity;
    if (!entity) return;

    let player = entity.getLevel().getNearestPlayer(entity, 129);
    if (!player) return;

    if (!entity.isLiving() || !entity.isMonster()) return;

    // 检查是否在黑名单中
    let blacklisted = isBlacklisted(entity);

    // 获取世界难度
    let worldDifficulty = event.getLevel().getDifficulty();

    // 获取玩家最高阶段难度
    let highestStageDifficulty = getPlayerHighestStageDifficulty(player);

    if (!highestStageDifficulty && blacklisted) return;

    // 计算最终倍数
    let finalMultipliers;
    if (highestStageDifficulty) {
        finalMultipliers = calculateCombinedMultipliers(worldDifficulty, highestStageDifficulty, blacklisted);
    } else {
        // 黑名单生物没有阶段难度时不应用任何加成
        if (blacklisted) return;
        finalMultipliers = GAME_DIFFICULTY_LEVELS[worldDifficulty];
    }

    let difficultyMark = worldDifficulty + (highestStageDifficulty ? "_" + highestStageDifficulty : "");
    let markKey = 'applied_difficulty_' + difficultyMark;

    if (entity.persistentData.contains(markKey)) return;

    entity.persistentData.putString(markKey, 'true');

    // 应用属性增强
    if (entity.attributes.hasAttribute('minecraft:generic.max_health')) {
        let currentMaxHealth = entity.getAttribute('minecraft:generic.max_health').getValue();
        entity.setAttributeBaseValue('minecraft:generic.max_health', currentMaxHealth * finalMultipliers.health);
        entity.setHealth(entity.getMaxHealth());
    }

    if (entity.attributes.hasAttribute('minecraft:generic.attack_damage')) {
        let currentAttack = entity.getAttribute('minecraft:generic.attack_damage').getValue();
        entity.setAttributeBaseValue('minecraft:generic.attack_damage', currentAttack * finalMultipliers.attack);
    }

    if (entity.attributes.hasAttribute('minecraft:generic.armor')) {
        let currentArmor = entity.getAttribute('minecraft:generic.armor').getValue();
        entity.setAttributeBaseValue('minecraft:generic.armor', currentArmor * finalMultipliers.armor);
    }

    if (entity.attributes.hasAttribute('minecraft:generic.armor_toughness')) {
        let currentToughness = entity.getAttribute('minecraft:generic.armor_toughness').getValue();
        entity.setAttributeBaseValue('minecraft:generic.armor_toughness', currentToughness * finalMultipliers.toughness);
    }

    // 黑名单生物不受追踪范围加成
    if (!blacklisted && worldDifficulty == "HARD" && entity.attributes.hasAttribute('minecraft:generic.follow_range')) {
        let currentRange = entity.getAttribute('minecraft:generic.follow_range').getValue();
        entity.setAttributeBaseValue('minecraft:generic.follow_range', currentRange + finalMultipliers.follow_range);
    }

    // debug日志
    /*
    if (highestStageDifficulty) {
        if (blacklisted) {
            console.log(`[Reverie Foundry] 黑名单生物 ${entity.getType()} - 仅阶段难度: ${highestStageDifficulty}`);
            console.log(`          生命: x${finalMultipliers.health}, 攻击: x${finalMultipliers.attack}, 护甲: x${finalMultipliers.armor}`);
        } else {
            console.log(`[Reverie Foundry] 实体ID：${entity.getType()}难度等级：${worldDifficulty} × ${highestStageDifficulty} = ` +
                `生命: x${finalMultipliers.health.toFixed(1)}, ` +
                `攻击: x${finalMultipliers.attack.toFixed(1)}, ` +
                `护甲: x${finalMultipliers.armor.toFixed(1)}`);
        }
    } else {
        if (blacklisted) {
            console.log(`[Reverie Foundry] 黑名单生物 ${entity.getType()} - 无阶段难度，跳过加成`);
        } else {
            console.log(`[Reverie Foundry] 实体ID：${entity.getType()}难度等级：${worldDifficulty} 仅世界难度 - ` +
                `生命: x${finalMultipliers.health}, 攻击: x${finalMultipliers.attack}`);
        }
    }
    */
});