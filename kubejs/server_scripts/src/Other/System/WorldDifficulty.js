// priority: 10

// 检查生物是否在黑名单中
function isBlacklisted(entity) {
    return DIFFICULTY_BLACKLIST.includes(entity.getType().toString());
}

// 检查是否需要额外加倍率
function needsExtraBuff(entity) {
    return EXTRA_BUFF_ENTITIES.includes(entity.getType().toString());
}

// 检查是否在强制应用白名单中
function isForceApplyWhitelisted(entity) {
    return FORCE_APPLY_WHITELIST && FORCE_APPLY_WHITELIST.includes(entity.getType().toString());
}

// 合并后的难度倍数
function calculateCombinedMultipliers(gameDiff, stageDiff, isBlacklisted) {
    let gameMultiplier = GAME_DIFFICULTY_LEVELS[gameDiff];
    let stageBonus = STAGE_DIFFICULTY_BONUS[stageDiff] || STAGE_DIFFICULTY_BONUS['difficult_0'];

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

function getEntityMarkKey(entity) {
    return 'difficulty_applied_' + entity.getUUID().toString();
}

// 检查生物是否已经应用过难度
function hasDifficultyApplied(entity) {
    return entity.persistentData.contains('difficulty_applied') &&
        entity.persistentData.getBoolean('difficulty_applied');
}

// 标记生物已应用难度
function markDifficultyApplied(entity) {
    entity.persistentData.putBoolean('difficulty_applied', true);
}

EntityEvents.spawned(event => {
    const DEBUG_MODE = false;

    let entity = event.entity;
    if (!entity) return;

    // 检查是否在强制应用白名单中
    let forceApply = isForceApplyWhitelisted(entity);

    // 如果不是强制应用白名单，且不是活的怪物，则跳过
    if (!forceApply && (!entity.isLiving() || !entity.isMonster())) return;

    let player = entity.getLevel().getNearestPlayer(entity, 129);
    if (!player) {
        if (DEBUG_MODE) console.log(`[Debug] ${entity.getType()} - 没有找到附近玩家，跳过`);
        return;
    }

    // 检查是否已经应用过难度（使用通用标记）
    if (hasDifficultyApplied(entity)) {
        if (DEBUG_MODE) console.log(`[Debug] ${entity.getType()} - 已应用过难度，跳过`);
        return;
    }

    let blacklisted = isBlacklisted(entity);
    let extraBuff = needsExtraBuff(entity);
    let worldDifficulty = event.getLevel().getDifficulty();
    let highestStageDifficulty = getPlayerHighestStageDifficulty(player);

    if (DEBUG_MODE) {
        let initialHealth = 0;
        if (entity.attributes.hasAttribute('minecraft:generic.max_health')) {
            let attr = entity.getAttribute('minecraft:generic.max_health');
            if (attr) initialHealth = attr.getValue();
        }
        console.log(`[Debug] === 开始处理 ${entity.getType()} ===`);
        console.log(`[Debug] 玩家: ${player.getName().getString()}, 世界难度: ${worldDifficulty}, 阶段: ${highestStageDifficulty}`);
        console.log(`[Debug] 黑名单: ${blacklisted}, 额外加成: ${extraBuff}, 强制应用: ${forceApply}`);
        console.log(`[Debug] 初始血量: ${initialHealth}`);
    }

    if (!highestStageDifficulty && blacklisted) {
        if (DEBUG_MODE) console.log(`[Debug] ${entity.getType()} - 黑名单且无阶段，跳过`);
        return;
    }

    let finalMultipliers;
    if (highestStageDifficulty) {
        finalMultipliers = calculateCombinedMultipliers(worldDifficulty, highestStageDifficulty, blacklisted);
        if (DEBUG_MODE) console.log(`[Debug] 使用综合倍率: 世界${worldDifficulty} × 阶段${highestStageDifficulty}`);
    } else {
        if (blacklisted) {
            if (DEBUG_MODE) console.log(`[Debug] ${entity.getType()} - 黑名单无阶段，跳过`);
            return;
        }
        finalMultipliers = GAME_DIFFICULTY_LEVELS[worldDifficulty];
        if (DEBUG_MODE) console.log(`[Debug] 仅使用世界难度倍率: ${worldDifficulty}`);
    }

    if (DEBUG_MODE) {
        console.log(`[Debug] 计算出的倍率 - 生命: ${finalMultipliers.health}, 攻击: ${finalMultipliers.attack}, 护甲: ${finalMultipliers.armor}`);
    }

    // 立即标记已应用，防止后续重复
    markDifficultyApplied(entity);

    // 应用属性增强
    if (entity.attributes.hasAttribute('minecraft:generic.max_health')) {
        let attr = entity.getAttribute('minecraft:generic.max_health');
        if (attr) {
            let currentMaxHealth = attr.getValue();
            let multiplier = finalMultipliers.health;
            if (extraBuff) multiplier = multiplier * 2;
            let newHealth = currentMaxHealth * multiplier;
            if (DEBUG_MODE) console.log(`[Debug] 血量: ${currentMaxHealth} × ${multiplier} = ${newHealth} (extraBuff: ${extraBuff})`);
            entity.setAttributeBaseValue('minecraft:generic.max_health', newHealth);
            entity.setHealth(entity.getMaxHealth());
        }
    }

    if (entity.attributes.hasAttribute('minecraft:generic.attack_damage')) {
        let attr = entity.getAttribute('minecraft:generic.attack_damage');
        if (attr) {
            let currentAttack = attr.getValue();
            let multiplier = finalMultipliers.attack;
            if (extraBuff) multiplier = multiplier * 2;
            let newAttack = currentAttack * multiplier;
            if (DEBUG_MODE) console.log(`[Debug] 攻击: ${currentAttack} × ${multiplier} = ${newAttack}`);
            entity.setAttributeBaseValue('minecraft:generic.attack_damage', newAttack);
        }
    }

    if (entity.attributes.hasAttribute('apothic_attributes:arrow_damage')) {
        let attr = entity.getAttribute('apothic_attributes:arrow_damage');
        if (attr) {
            let currentAttack = attr.getValue();
            let multiplier = finalMultipliers.attack;
            if (extraBuff) multiplier = multiplier * 2;
            let newAttack = currentAttack * multiplier;
            if (DEBUG_MODE) console.log(`[Debug] 弓箭伤害: ${currentAttack} × ${multiplier} = ${newAttack}`);
            entity.setAttributeBaseValue('apothic_attributes:arrow_damage', newAttack);
        }
    }

    if (entity.attributes.hasAttribute('minecraft:generic.armor')) {
        let attr = entity.getAttribute('minecraft:generic.armor');
        if (attr) {
            let currentArmor = attr.getValue();
            let multiplier = finalMultipliers.armor;
            if (extraBuff) multiplier = multiplier * 2;
            let newArmor = currentArmor * multiplier;
            if (DEBUG_MODE) console.log(`[Debug] 护甲: ${currentArmor} × ${multiplier} = ${newArmor}`);
            entity.setAttributeBaseValue('minecraft:generic.armor', newArmor);
        }
    }

    if (entity.attributes.hasAttribute('minecraft:generic.armor_toughness')) {
        let attr = entity.getAttribute('minecraft:generic.armor_toughness');
        if (attr) {
            let currentToughness = attr.getValue();
            let multiplier = finalMultipliers.toughness;
            if (extraBuff) multiplier = multiplier * 2;
            let newToughness = currentToughness * multiplier;
            if (DEBUG_MODE) console.log(`[Debug] 韧性: ${currentToughness} × ${multiplier} = ${newToughness}`);
            entity.setAttributeBaseValue('minecraft:generic.armor_toughness', newToughness);
        }
    }

    // 黑名单生物不受追踪范围加成
    if (!blacklisted && worldDifficulty == "HARD" && entity.attributes.hasAttribute('minecraft:generic.follow_range')) {
        let attr = entity.getAttribute('minecraft:generic.follow_range');
        if (attr) {
            let currentRange = attr.getValue();
            let newRange = currentRange + finalMultipliers.follow_range;
            if (DEBUG_MODE) console.log(`[Debug] 追踪范围: ${currentRange} + ${finalMultipliers.follow_range} = ${newRange}`);
            entity.setAttributeBaseValue('minecraft:generic.follow_range', newRange);
        }
    }

    if (DEBUG_MODE) {
        let finalHealth = 0;
        if (entity.attributes.hasAttribute('minecraft:generic.max_health')) {
            let attr = entity.getAttribute('minecraft:generic.max_health');
            if (attr) finalHealth = attr.getValue();
        }
        console.log(`[Debug] === 处理完成，最终血量: ${finalHealth} ===`);
    }
});

EntityEvents.spawned(event => {
    const entity = event.entity;
    if (!entity || !entity.isLiving() || !entity.isMonster()) return;

    entity.server.scheduleInTicks(2, () => {
        Object.entries(pactToGeasMap).forEach(([pactKey, geasId]) => {
            if (entity.persistentData.contains(pactKey)) {
                if (fu_hasGeasEffect(entity, geasId)) {
                    return;
                }

                let success = fu_addGeasEffect(entity, geasId);
                if (!success) {
                    console.log(`警告: 无法添加誓令效果 ${geasId}（条约类型: ${pactKey}）`);
                    console.log(`实体类型: ${entity.getType()}`);
                    console.log(`是否存活: ${entity.isAlive()}`);

                    const limit = $RFMalumUtils.getGeasLimit(entity);
                    const current = fu_getGeasEffects(entity).length;
                    if (current >= limit) {
                        console.log(`誓约数量已达上限: ${current}/${limit}`);
                    }
                }
            }
        })
    });
});