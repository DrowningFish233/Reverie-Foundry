// 闪避概率 = (1 - 当前血量百分比) * 0.4，上限 35 %
function getDodgeChance(entity) {
    const maxHealth = entity.getMaxHealth();
    const currentHealth = entity.getHealth();
    return Math.max(0, 1 - currentHealth / maxHealth) * 0.35;
}

/**
 * 判断玩家是否装备了指定的饰品，仅检查是否装备，不检查具体槽位。
 * @param {Player} player - 玩家对象
 * @param {string} itemId - 饰品的物品ID
 * @returns {CurioSlot|null} 如果玩家装备了该饰品，返回对应的槽位对象；否则返回null。
 */
function getCuriosItem(player, itemId) {
    let slotResult = new $CuriosApi()
        .getCuriosHelper()
        .findEquippedCurio(Item.of(itemId), player);
    if (slotResult.isPresent()) {
        return slotResult.get().getRight()
    }
    return null;
}

/**
 * 获取实体上指定效果的基础强度
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @returns {number} 基础强度值，如果没有效果返回0
 */
function getBaseStrength(entity, effectId) {
    return $IExtendedMobEffect.getBaseStrength(entity, effectId)
}

/**
 * 设置实体上指定效果的基础强度（不自动同步到客户端）
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} strength - 要设置的基础强度值（最小为1）
 * @returns {boolean} 是否设置成功（实体是否有该效果）
 */
function setBaseStrength(entity, effectId, strength) {
    return $IExtendedMobEffect.setBaseStrength(entity, effectId, strength)
}

/**
 * 设置实体上指定效果的基础强度并自动同步到客户端显示
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} strength - 要设置的基础强度值（最小为1）
 * @returns {boolean} 是否设置成功（实体是否有该效果）
 */
function setBaseStrengthAndSync(entity, effectId, strength) {
    return $IExtendedMobEffect.setBaseStrengthAndSync(entity, effectId, strength)
}

/**
 * 增加实体上指定效果的基础强度
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 增加的量
 * @returns {number} 增加后的基础强度值，如果没有效果返回0
 */
function addBaseStrength(entity, effectId, amount) {
    return $IExtendedMobEffect.addBaseStrength(entity, effectId, amount)
}

/**
 * 减少实体上指定效果的基础强度
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 减少的量
 * @returns {boolean} true表示基础强度 <= 0，false表示减少后基础强度 > 0
 */
function reduceBaseStrength(entity, effectId, amount) {
    return $IExtendedMobEffect.reduceBaseStrength(entity, effectId, amount)
}

/**
 * 增加实体上指定效果的基础强度并同步到客户端
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 增加的量
 * @returns {number} 增加后的基础强度值，如果没有效果返回0
 */
function addBaseStrengthAndSync(entity, effectId, amount) {
    let oldStrength = getBaseStrength(entity, effectId)
    if (oldStrength === 0) return 0

    let newStrength = oldStrength + amount
    setBaseStrengthAndSync(entity, effectId, newStrength)
    return newStrength
}

/**
 * 减少实体上指定效果的基础强度并同步到客户端
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 减少的量
 * @returns {boolean} true表示基础强度 <= 0，false表示减少后基础强度 > 0
 */
function reduceBaseStrengthAndSync(entity, effectId, amount) {
    let oldStrength = getBaseStrength(entity, effectId)
    if (oldStrength === 0) return false

    let newStrength = Math.max(0, oldStrength - amount)
    setBaseStrengthAndSync(entity, effectId, newStrength)
    return newStrength <= 0
}

/**
 * 获取效果的层数（原版 amplifier + 1）
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @returns {number} 层数（1-based），如果没有效果返回0
 */
function getEffectLayers(entity, effectId) {
    if (!entity.hasEffect(effectId)) return 0;
    return entity.getEffect(effectId).getAmplifier() + 1;
}

/**
 * 设置效果的层数
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} layers - 新的层数（1-based）
 * @param {number} [duration] - 持续时间（可选，不指定则保持原时长）
 * @returns {boolean} 是否设置成功
 */
function setEffectLayers(entity, effectId, layers, duration) {
    if (!entity.hasEffect(effectId)) return false;
    if (layers <= 0) {
        entity.removeEffect(effectId);
        return true;
    }

    const oldEffect = entity.getEffect(effectId);
    const newDuration = duration !== undefined ? duration : oldEffect.getDuration();
    const baseStrength = getBaseStrength(entity, effectId);

    entity.removeEffect(effectId);
    entity.potionEffects.add(effectId, newDuration, layers - 1);
    setBaseStrengthAndSync(entity, effectId, baseStrength);

    return true;
}

/**
 * 增加效果的层数
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 增加的数量
 * @returns {number} 增加后的层数
 */
function addEffectLayers(entity, effectId, amount) {
    if (!entity.hasEffect(effectId)) return 0;

    const currentLayers = getEffectLayers(entity, effectId);
    const newLayers = currentLayers + amount;

    setEffectLayers(entity, effectId, newLayers);
    return newLayers;
}

/**
 * 减少效果的层数
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 减少的数量
 * @returns {number} 剩余层数（0表示效果已移除）
 */
function reduceEffectLayers(entity, effectId, amount) {
    if (!entity.hasEffect(effectId)) return 0;

    const currentLayers = getEffectLayers(entity, effectId);
    const newLayers = currentLayers - amount;

    if (newLayers <= 0) {
        entity.removeEffect(effectId);
        return 0;
    }

    setEffectLayers(entity, effectId, newLayers);
    return newLayers;
}


/**
 * 获取 Gear 物品的耐久度属性
 * @param {Internal.ItemStack} gear Gear 物品
 * @returns {NumberProperty} 耐久度属性
 */
function fu_getDurabilityProperty(gear) {
    return $GearHelper.getDurabilityProperty(gear);
}


/**
 * 对 Gear 物品造成伤害
 * @param {Internal.ItemStack} stack 物品
 * @param {number} amount 伤害量
 * @param {Internal.LivingEntity} entity 持有者
 * @param {Internal.InteractionHand} hand 持有手 MAIN_HAND | OFF_HAND
 */
function fu_attemptDamageByHand(stack, amount, entity, hand) {
    $GearHelper["attemptDamage(net.minecraft.world.item.ItemStack,int,net.minecraft.world.entity.LivingEntity,net.minecraft.world.InteractionHand)"](stack, amount, entity, hand);
}

/**
 * 对 Gear 物品造成伤害（指定装备槽位）
 * @param {Internal.ItemStack} stack 物品
 * @param {number} amount 伤害量
 * @param {Internal.LivingEntity} entity 持有者
 * @param {Internal.EquipmentSlot} slot 装备槽位
 */
function fu_attemptDamageBySlot(stack, amount, entity, slot) {
    $GearHelper["attemptDamage(net.minecraft.world.item.ItemStack,int,net.minecraft.world.entity.LivingEntity,net.minecraft.world.entity.EquipmentSlot)"](stack, amount, entity, slot);
}

/**
 * 检查物品是否为 Silent Gear 的工具、武器或护甲物品
 * @param {Internal.ItemStack} stack 要检查的物品
 * @returns {boolean} 如果是 Gear 物品则返回 true
 */
function fu_isGear(stack) {
    if (!stack || stack.isEmpty()) {
        return false;
    }
    return $GearHelper.isGear(stack);
}


/**
 * 判断实体是否拥有灵魂护盾（未耗尽）
 * @param {LivingEntity} entity - 目标实体
 * @returns {boolean} true=护盾存在且未耗尽，false=无护盾或已耗尽
 */
function hasSoulWard(entity) {
    return $RFUtils.hasSoulWard(entity);
}

/**
 * 获取实体的当前灵魂护盾值
 * @param {LivingEntity} entity - 目标实体
 * @returns {number} 当前护盾值，如果没有护盾则返回0
 */
function getCurrentSoulWard(entity) {
    return $RFUtils.getCurrentSoulWard(entity);
}

/**
 * 获取实体的灵魂护盾容量（最大值）
 * @param {LivingEntity} entity - 目标实体
 * @returns {number} 护盾容量
 */
function getSoulWardCapacity(entity) {
    return $RFUtils.getSoulWardCapacity(entity);
}

/**
 * 获取实体的灵魂护盾完整性
 * @param {LivingEntity} entity - 目标实体
 * @returns {number} 完整性值
 */
function getSoulWardIntegrity(entity) {
    return $RFUtils.getSoulWardIntegrity(entity);
}

/**
 * 获取灵魂护盾的剩余百分比
 * @param {LivingEntity} entity - 目标实体
 * @returns {number} 0.0 - 1.0 之间的百分比
 */
function getSoulWardPercentage(entity) {
    return $RFUtils.getSoulWardPercentage(entity);
}

/**
 * 判断灵魂护盾是否已满
 * @param {LivingEntity} entity - 目标实体
 * @returns {boolean} true=已满，false=未满或无护盾
 */
function isSoulWardFull(entity) {
    return $RFUtils.isSoulWardFull(entity);
}

/**
 * 判断灵魂护盾是否处于冷却中
 * @param {LivingEntity} entity - 目标实体
 * @returns {boolean} true=冷却中，false=可恢复或无护盾
 */
function isSoulWardOnCooldown(entity) {
    return $RFUtils.isSoulWardOnCooldown(entity);
}

/**
 * 获取灵魂护盾冷却剩余时间（刻）
 * @param {LivingEntity} entity - 目标实体
 * @returns {number} 剩余冷却刻数
 */
function getSoulWardCooldownTicks(entity) {
    return $RFUtils.getSoulWardCooldownTicks(entity);
}

/**
 * 攻击实体
 * @param {$LivingEntity_} target - 目标实体
 * @param {string} damageSourceId - 伤害类型
 * @param {number} amount - 伤害值
 * @param {boolean} ignoreInvulnerable - 是否忽略无敌帧
 */
function attackEntity(target, damageSourceId, amount, ignoreInvulnerable) {
    if (!target || amount <= 0) return;
    if (ignoreInvulnerable) {
        const originalTime = target.invulnerableTime;
        target.invulnerableTime = 0;
        target.attack($DamageSource(damageSourceId), amount);
        if (originalTime > 0) {
            target.invulnerableTime = Math.max(originalTime, 10);
        }
    } else {
        target.attack($DamageSource(damageSourceId), amount);
    }
}


/**
 * 随机移除一个负面效果
 */
function removeRandomNegativeEffect(player) {
    const negativeEffects = [];

    player.getActiveEffectsMap().forEach((holder, instance) => {
        const effect = holder.value();
        if (!effect.isBeneficial()) {
            negativeEffects.push(holder);
        }
    });

    if (negativeEffects.length > 0) {
        let randomIndex = Math.floor(Math.random() * negativeEffects.length);
        let effectToRemove = negativeEffects[randomIndex];
        player.removeEffect(effectToRemove);

    }
}