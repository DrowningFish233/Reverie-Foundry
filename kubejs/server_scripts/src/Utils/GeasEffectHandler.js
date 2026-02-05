/**
 * 为实体添加誓言效果
 * @param {Internal.LivingEntity} entity 目标实体
 * @param {Internal.GeasEffectType} geas 誓言效果类型
 * @returns {boolean} 是否添加成功
 */
function fu_addGeasEffect(entity, geas) {
    if (!entity || !geas) return false;
    return $GeasEffectHandler.addGeasEffect(entity, geas);
}

/**
 * 检查实体是否拥有指定类型的誓言效果（Holder版本）
 * @param {Internal.LivingEntity} entity 目标实体
 * @param {Internal.Holder} type 誓言效果类型的Holder
 * @returns {boolean} 是否拥有该效果
 */
function fu_hasGeasEffectHolder(entity, type) {
    if (!entity || !type) return false;
    return $GeasEffectHandler.hasGeasEffect(entity, type);
}

/**
 * 检查实体是否拥有指定类型的誓言效果
 * @param {Internal.LivingEntity} entity 目标实体
 * @param {Internal.GeasEffectType} type 誓言效果类型
 * @returns {boolean} 是否拥有该效果
 */
function fu_hasGeasEffect(entity, type) {
    if (!entity || !type) return false;
    return $GeasEffectHandler.hasGeasEffect(entity, type);
}

/**
 * 移除实体的誓言效果
 * @param {Internal.LivingEntity} entity 目标实体
 * @param {Internal.GeasEffectType} geas 要移除的誓言效果类型
 * @returns {boolean} 是否移除成功
 */
function fu_removeGeasEffect(entity, geas) {
    if (!entity || !geas) return false;
    return $GeasEffectHandler.removeGeasEffect(entity, geas);
}

/**
 * 获取实体的所有誓言物品堆栈
 * @param {Internal.LivingEntity} entity 目标实体
 * @returns {Internal.ItemStack[]} 誓言物品堆栈列表
 */
function fu_getGeasItemStacks(entity) {
    if (!entity) return [];
    return $GeasEffectHandler.getGeasItemStacks(entity) || [];
}

/**
 * 获取实体的指定誓言效果（Holder版本）
 * @param {Internal.LivingEntity} entity 目标实体
 * @param {Internal.Holder} type 誓言效果类型的Holder
 * @returns {Internal.GeasEffect|null} 誓言效果实例或null
 */
function fu_getGeasEffectHolder(entity, type) {
    if (!entity || !type) return null;
    return $GeasEffectHandler.getGeasEffect(entity, type);
}

/**
 * 获取实体的所有誓言效果
 * @param {Internal.LivingEntity} entity 目标实体
 * @returns {Internal.GeasEffect[]} 誓言效果列表
 */
function fu_getGeasEffects(entity) {
    if (!entity) return [];
    return $GeasEffectHandler.getGeasEffects(entity) || [];
}

/**
 * 从物品堆栈获取装备的誓言效果
 * @param {Internal.LivingEntity} entity 目标实体
 * @param {Internal.ItemStack} stack 物品堆栈
 * @returns {Internal.GeasEffect|null} 誓言效果实例或null
 */
function fu_getEquippedGeasEffectFromStack(entity, stack) {
    if (!entity || !stack || stack.isEmpty()) return null;
    return $GeasEffectHandler.getEquippedGeasEffectFromStack(entity, stack);
}

/**
 * 获取实体的誓言灵魂数据
 * @param {Internal.LivingEntity} entity 目标实体
 * @returns {Internal.GeasSoulData} 誓言灵魂数据
 */
function fu_getGeasData(entity) {
    if (!entity) return null;
    return $GeasEffectHandler.getGeasData(entity);
}

/**
 * 获取物品堆栈中存储的誓言效果组件
 * @param {Internal.ItemStack} stack 物品堆栈
 * @returns {Internal.GeasDataComponent|null} 誓言效果组件或null
 */
function fu_getStoredGeasEffect(stack) {
    if (!stack || stack.isEmpty()) return null;

    // 使用Java方法获取Optional
    const optional = $GeasEffectHandler.getStoredGeasEffect(stack);
    return optional.isPresent() ? optional.get() : null;
}

/**
 * 检查物品堆栈是否包含誓言效果
 * @param {Internal.ItemStack} stack 物品堆栈
 * @returns {boolean} 是否包含誓言效果
 */
function fu_hasStoredGeasEffect(stack) {
    if (!stack || stack.isEmpty()) return false;
    const result = fu_getStoredGeasEffect(stack);
    return result !== null && !result.isInvalid();
}

/**
 * 获取誓言效果的名称
 * @param {Internal.GeasEffect} geasEffect 誓言效果实例
 * @returns {string} 效果名称
 */
function fu_getGeasEffectName(geasEffect) {
    if (!geasEffect) return "未知";
    try {
        return geasEffect.getDisplayName().getString();
    } catch (e) {
        return "未知";
    }
}

/**
 * 获取誓言效果的等级
 * @param {Internal.GeasEffect} geasEffect 誓言效果实例
 * @returns {number} 效果等级
 */
function fu_getGeasEffectLevel(geasEffect) {
    if (!geasEffect) return 0;
    try {
        return geasEffect.getAmplifier() + 1; // 通常放大器从0开始，等级从1开始
    } catch (e) {
        return 1;
    }
}

/**
 * 检查誓言效果是否有效
 * @param {Internal.GeasEffect} geasEffect 誓言效果实例
 * @returns {boolean} 是否有效
 */
function fu_isGeasEffectValid(geasEffect) {
    if (!geasEffect) return false;
    try {
        return !geasEffect.isInvalid() && geasEffect.isActive();
    } catch (e) {
        return false;
    }
}

// 获取誓令类型
function getGeasTypeById(geasId) {
    try {
        let geasRegistry = $MalumGeasEffectTypes.GEAS_TYPES_REGISTRY;
        let geasResource = new $ResourceLocation('malum', geasId);
        return geasRegistry.get(geasResource);
    } catch (e) {
        console.log('获取誓令类型失败: ' + e);
        return null;
    }
}

//检测并移除超额誓令
function checkAndRemoveExcessGeas(player) {
    if (!player) return;
    const attribute = player.getAttribute('malum:geas_limit');
    if (!attribute) return;

    const limit = Math.ceil(attribute.getValue());
    const geasData = fu_getGeasData(player);

    if (!geasData) return;

    const currentEffects = fu_getGeasEffects(player);
    const currentCount = currentEffects.length;

    // 如果超过限制，移除多余的
    if (currentCount > limit) {
        const toRemove = currentCount - limit;

        for (let i = 0; i < toRemove; i++) {
            // 移除最后一个誓令
            if (currentEffects.length > 0) {
                const effectIndex = currentEffects.length - 1 - i;
                if (effectIndex >= 0) {
                    const effectToRemove = currentEffects[effectIndex];
                    const effectType = effectToRemove.type;

                    const removed = fu_removeGeasEffect(player, effectType);

                    if (removed) {
                        const effectPath = effectType.getRegistryName().getPath();
                        const effectName = GearsEffect[effectPath] || effectPath;
                        //console.log(`为 ${player.name} 自动移除了超额誓令: ${effectName}`);
                    }
                }
            }
        }
    }
}

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.living.LivingEquipmentChangeEvent", event => {
    checkAndRemoveExcessGeas(event.entity)
})
