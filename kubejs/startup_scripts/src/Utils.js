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