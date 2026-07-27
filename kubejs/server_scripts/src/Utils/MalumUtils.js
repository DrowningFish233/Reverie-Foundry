/**
 * 根据ID获取誓令类型
 * @param {string} id - 誓令ID
 * @returns {Internal.GeasEffectType}
 */
function fu_getGeasType(id) {
    return $RFMalumUtils.getGeasTypeById(id);
}

/**
 * 获取所有可用誓令类型
 * @returns {Array<Internal.GeasEffectType>}
 */
function fu_getAllGeasTypes() {
    return $RFMalumUtils.getAllGeasTypes();
}

/**
 * 添加誓令效果
 * @param {Internal.LivingEntity} entity - 目标实体
 * @param {string} geasId - 誓令ID
 * @returns {boolean}
 */
function fu_addGeasEffect(entity, geasId) {
    if (!entity || !geasId) return false;
    return $RFMalumUtils.addGeasEffectById(entity, geasId);
}

/**
 * 尝试添加誓令效果（受誓令数量上限限制）
 * @param {Internal.LivingEntity} entity - 目标实体
 * @param {string} geasId - 誓令ID
 * @returns {boolean}
 */
function fu_tryAddGeasEffect(entity, geasId) {
    if (!entity || !geasId) return false;
    return $RFMalumUtils.tryAddGeasEffectById(entity, geasId);
}

/**
 * 移除誓令效果
 * @param {Internal.LivingEntity} entity - 目标实体
 * @param {string} geasId - 誓令ID
 * @returns {boolean}
 */
function fu_removeGeasEffect(entity, geasId) {
    if (!entity || !geasId) return false;
    return $RFMalumUtils.removeGeasEffectById(entity, geasId);
}

/**
 * 检查是否拥有誓令效果
 * @param {Internal.LivingEntity} entity - 目标实体
 * @param {string} geasId - 誓令ID
 * @returns {boolean}
 */
function fu_hasGeasEffect(entity, geasId) {
    if (!entity || !geasId) return false;
    return $RFMalumUtils.hasGeasEffectById(entity, geasId);
}

/**
 * 获取实体的所有誓令物品堆栈
 * @param {Internal.LivingEntity} entity 目标实体
 * @returns {Internal.ItemStack[]} 誓令物品堆栈列表
 */
function fu_getGeasItemStacks(entity) {
    if (!entity) return [];
    return $RFMalumUtils.getEquippedGeasItemStacks(entity) || [];
}

/**
 * 获取实体的所有誓令效果实例
 * @param {Internal.LivingEntity} entity
 * @returns {Array<Internal.GeasEffect>}
 */
function fu_getGeasEffects(entity) {
    if (!entity) return [];
    return $RFMalumUtils.getEquippedGeasEffects(entity) || [];
}

/**
 * 获取实体的誓令灵魂数据
 * @param {Internal.LivingEntity} entity
 * @returns {Internal.GeasSoulData|null}
 */
function fu_getGeasData(entity) {
    if (!entity) return null;
    return $RFMalumUtils.getGeasSoulData(entity);
}

/**
 * 从物品堆栈中获取存储的誓令效果
 * @param {Internal.ItemStack} stack 物品堆栈
 * @returns {Internal.GeasEffectType|null}
 */
function fu_getStoredGeasEffect(stack) {
    if (!stack || stack.isEmpty()) return null;
    return $RFMalumUtils.getStoredGeasEffect(stack);
}

/**
 * 检查物品堆栈是否包含誓令效果
 * @param {Internal.ItemStack} stack 物品堆栈
 * @returns {boolean}
 */
function fu_hasStoredGeasEffect(stack) {
    if (!stack || stack.isEmpty()) return false;
    return $RFMalumUtils.hasStoredGeasEffect(stack);
}

/**
 * 强制同步誓令数据到客户端
 * @param {Internal.LivingEntity} entity
 */
function fu_syncGeasData(entity) {
    if (entity) {
        $RFMalumUtils.syncGeasSoulData(entity);
    }
}

/**
 * 获取誓令效果的名称
 * @param {Internal.GeasEffect} geasEffect 誓言效果实例
 * @returns {string} 效果名称
 */
function fu_getGeasEffectName(geasEffect) {
    if (!geasEffect) return "未知";
    try {
        const langKey = $RFMalumUtils.getGeasTypeLangKey(geasEffect.type);
        if (langKey) {
            return langKey.substring(langKey.lastIndexOf('.') + 1);
        }
        return "未知";
    } catch (e) {
        return "未知";
    }
}

/**
 * 获取誓令效果的等级
 * @param {Internal.GeasEffect} geasEffect 誓言效果实例
 * @returns {number} 效果等级
 */
function fu_getGeasEffectLevel(geasEffect) {
    // Malum 的 GeasEffect 没有 amplifier 概念，固定返回 1
    return 1;
}

/**
 * 检查誓令效果是否有效
 * @param {Internal.GeasEffect} geasEffect 誓言效果实例
 * @returns {boolean} 是否有效
 */
function fu_isGeasEffectValid(geasEffect) {
    if (!geasEffect) return false;
    try {
        // GeasEffect 没有 isInvalid 和 isActive 方法
        // 简单判断 type 是否存在
        return geasEffect.type !== undefined && geasEffect.type !== null;
    } catch (e) {
        return false;
    }
}

/**
 * 从装备的物品获取誓令效果
 * @param {Internal.LivingEntity} entity 目标实体
 * @param {Internal.ItemStack} stack 物品堆栈
 * @returns {Internal.GeasEffect|null}
 */
function fu_getEquippedGeasEffectFromStack(entity, stack) {
    if (!entity || !stack || stack.isEmpty()) return null;
    return $GeasEffectHandler.getEquippedGeasEffectFromStack(entity, stack);
}

/**
 * 根据ID获取誓令类型
 * @param {string} geasId - 誓令ID
 * @returns {Internal.GeasEffectType|null}
 */
function getGeasTypeById(geasId) {
    if (!geasId) return null;
    try {
        return $RFMalumUtils.getGeasTypeById(geasId);
    } catch (e) {
        console.warn('获取誓令类型失败: ' + geasId + ', 错误: ' + e);
        return null;
    }
}

/**
 * 检测并移除超额誓令
 * @param {Internal.LivingEntity} player
 */
function checkAndRemoveExcessGeas(player) {
    if (!player) return;

    const limit = $RFMalumUtils.getGeasLimit(player);
    if (limit <= 0) return;

    const currentEffects = fu_getGeasEffects(player);
    const currentCount = currentEffects.length;

    if (currentCount > limit) {
        const toRemove = currentCount - limit;
        for (let i = currentEffects.length - 1; i >= currentEffects.length - toRemove; i--) {
            const effectToRemove = currentEffects[i];
            if (effectToRemove && effectToRemove.type) {
                $RFMalumUtils.removeGeasEffectByEffect(player, effectToRemove);
            }
        }
    }
}

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.living.LivingEquipmentChangeEvent", event => {
    event.entity.server.scheduleInTicks(5, () => {
        if (event.entity && event.entity.isAlive()) {
            checkAndRemoveExcessGeas(event.entity);
        }
    });
});


/**
 * 判断实体是否拥有灵魂护盾
 * @param {Internal.LivingEntity} entity
 * @returns {boolean}
 */
function fu_hasSoulWard(entity) {
    return $RFMalumUtils.hasSoulWard(entity);
}

/**
 * 获取实体的当前灵魂护盾值
 * @param {Internal.LivingEntity} entity
 * @returns {number}
 */
function fu_getCurrentSoulWard(entity) {
    return $RFMalumUtils.getCurrentSoulWard(entity);
}

/**
 * 获取实体的灵魂护盾容量
 * @param {Internal.LivingEntity} entity
 * @returns {number}
 */
function fu_getSoulWardCapacity(entity) {
    return $RFMalumUtils.getSoulWardCapacity(entity);
}

/**
 * 获取实体的灵魂护盾完整性
 * @param {Internal.LivingEntity} entity
 * @returns {number}
 */
function fu_getSoulWardIntegrity(entity) {
    return $RFMalumUtils.getSoulWardIntegrity(entity);
}

/**
 * 获取灵魂护盾的剩余百分比
 * @param {Internal.LivingEntity} entity
 * @returns {number}
 */
function fu_getSoulWardPercentage(entity) {
    return $RFMalumUtils.getSoulWardPercentage(entity);
}

/**
 * 判断灵魂护盾是否已满
 * @param {Internal.LivingEntity} entity
 * @returns {boolean}
 */
function fu_isSoulWardFull(entity) {
    return $RFMalumUtils.isSoulWardFull(entity);
}

/**
 * 判断灵魂护盾是否处于冷却中
 * @param {Internal.LivingEntity} entity
 * @returns {boolean}
 */
function fu_isSoulWardOnCooldown(entity) {
    return $RFMalumUtils.isSoulWardOnCooldown(entity);
}

/**
 * 获取灵魂护盾冷却剩余时间
 * @param {Internal.LivingEntity} entity
 * @returns {number}
 */
function fu_getSoulWardCooldownTicks(entity) {
    return $RFMalumUtils.getSoulWardCooldownTicks(entity);
}

/**
 * 直接减少灵魂护盾值
 * @param {Internal.LivingEntity} entity
 * @param {number} amount
 */
function fu_reduceSoulWard(entity, amount) {
    $RFMalumUtils.reduceSoulWard(entity, amount);
}

/**
 * 增加灵魂护盾值
 * @param {Internal.LivingEntity} entity
 * @param {number} amount
 */
function fu_addSoulWard(entity, amount) {
    $RFMalumUtils.addSoulWard(entity, amount);
}

/**
 * 设置灵魂护盾值
 * @param {Internal.LivingEntity} entity
 * @param {number} value
 */
function fu_setSoulWard(entity, value) {
    $RFMalumUtils.setSoulWard(entity, value);
}

/**
 * 添加灵魂护盾冷却
 * @param {Internal.LivingEntity} entity
 * @param {number} multiplier
 */
function fu_addSoulWardCooldown(entity, multiplier) {
    $RFMalumUtils.addSoulWardCooldown(entity, multiplier);
}

/**
 * 恢复全部灵魂护盾
 * @param {Internal.LivingEntity} entity
 */
function fu_restoreSoulWard(entity) {
    $RFMalumUtils.restoreSoulWard(entity);
}

/**
 * 强制暴露生物的灵魂
 * @param {Internal.LivingEntity} entity
 */
function fu_exposeSoul(entity) {
    $RFMalumUtils.exposeSoul(entity);
}

/**
 * 设置灵魂暴露时长
 * @param {Internal.LivingEntity} entity
 * @param {number} duration
 */
function fu_setExposedSoulDuration(entity, duration) {
    $RFMalumUtils.setExposedSoulDuration(entity, duration);
}

/**
 * 获取灵魂暴露剩余时长
 * @param {Internal.LivingEntity} entity
 * @returns {number}
 */
function fu_getExposedSoulDuration(entity) {
    return $RFMalumUtils.getExposedSoulDuration(entity);
}

/**
 * 掉落灵魂
 * @param {Internal.LivingEntity} target
 * @param {Internal.LivingEntity} attacker
 */
function fu_dropSpirits(target, attacker) {
    $RFMalumUtils.dropSpirits(target, attacker);
}

/**
 * 掉落灵魂灌注物品
 * @param {Internal.LivingEntity} target
 */
function fu_dropSpiritInfusedDrops(target) {
    $RFMalumUtils.dropSpiritInfusedDrops(target);
}

/**
 * 触发灵魂收集事件
 * @param {Internal.LivingEntity} collector
 */
function fu_triggerSpiritCollection(collector) {
    $RFMalumUtils.triggerSpiritCollection(collector);
}

/**
 * 拾取灵魂物品
 * @param {Internal.LivingEntity} collector
 * @param {Internal.ItemStack} spiritStack
 */
function fu_pickupSpirit(collector, spiritStack) {
    $RFMalumUtils.pickupSpirit(collector, spiritStack);
}

/**
 * 检查生物是否可以掉落灵魂
 * @param {Internal.LivingEntity} entity
 * @returns {boolean}
 */
function fu_shouldDropSpirits(entity) {
    return $RFMalumUtils.shouldDropSpirits(entity);
}

/**
 * 强制设置生物为无魂状态
 * @param {Internal.LivingEntity} entity
 * @param {boolean} soulless
 */
function fu_setSoulless(entity, soulless) {
    $RFMalumUtils.setSoulless(entity, soulless);
}

/**
 * 设置攻击者的最近击碎时间
 * @param {Internal.LivingEntity} attacker
 * @param {number} gameTime
 */
function fu_setMostRecentShatter(attacker, gameTime) {
    $RFMalumUtils.setMostRecentShatter(attacker, gameTime);
}

/**
 * 完整的灵魂掉落处理
 * @param {Internal.LivingEntity} target
 * @param {Internal.LivingEntity} attacker
 */
function fu_handleSoulHarvest(target, attacker) {
    $RFMalumUtils.handleSoulHarvest(target, attacker);
}

/**
 * 创建灵魂生成器
 * @param {Internal.Entity} target
 * @returns {Internal.SoulHarvestHandler$SpiritSpawner}
 */
function fu_createSpiritSpawner(target) {
    return $RFMalumUtils.createSpiritSpawner(target);
}

/**
 * 设置偏好收集者
 * @param {Internal.SoulHarvestHandler$SpiritSpawner} spawner
 * @param {Internal.LivingEntity} collector
 * @returns {Internal.SoulHarvestHandler$SpiritSpawner}
 */
function fu_spawnerSetCollector(spawner, collector) {
    return $RFMalumUtils.setSpiritSpawnerCollector(spawner, collector);
}

/**
 * 设置自定义物品
 * @param {Internal.SoulHarvestHandler$SpiritSpawner} spawner
 * @param {Internal.Item[]} items
 * @returns {Internal.SoulHarvestHandler$SpiritSpawner}
 */
function fu_spawnerSetCustomItems(spawner, items) {
    return $RFMalumUtils.setSpiritSpawnerCustomItems(spawner, items);
}

/**
 * 设置自定义物品堆
 * @param {Internal.SoulHarvestHandler$SpiritSpawner} spawner
 * @param {Internal.ItemStack[]} itemStacks
 * @returns {Internal.SoulHarvestHandler$SpiritSpawner}
 */
function fu_spawnerSetCustomItemStacks(spawner, itemStacks) {
    return $RFMalumUtils.setSpiritSpawnerCustomItemStacks(spawner, itemStacks);
}

/**
 * 获取掉落列表
 * @param {Internal.SoulHarvestHandler$SpiritSpawner} spawner
 * @returns {List<Internal.ItemStack>}
 */
function fu_spawnerGetDrops(spawner) {
    return $RFMalumUtils.getSpiritSpawnerDrops(spawner);
}

/**
 * 生成灵魂实体
 * @param {Internal.SoulHarvestHandler$SpiritSpawner} spawner
 * @param {Internal.Level} level
 */
function fu_spawnerSpawn(spawner, level) {
    $RFMalumUtils.spawnSpiritsFromSpawner(spawner, level);
}

/**
 * 创建并立即生成灵魂
 * @param {Internal.Entity} target
 * @param {Internal.LivingEntity} collector
 * @param {Internal.Level} level
 */
function fu_spawnSpiritsImmediate(target, collector, level) {
    $RFMalumUtils.spawnSpiritsImmediate(target, collector, level);
}

/**
 * 创建并生成自定义灵魂物品
 * @param {Internal.Entity} target
 * @param {Internal.Item[]} items
 * @param {Internal.LivingEntity} collector
 * @param {Internal.Level} level
 */
function fu_spawnCustomSpirits(target, items, collector, level) {
    $RFMalumUtils.spawnCustomSpiritsImmediate(target, items, collector, level);
}

/**
 * 获取实体的黑暗触碰数据
 * @param {Internal.LivingEntity} entity
 * @returns {Internal.TouchOfDarknessData}
 */
function fu_getTouchOfDarknessData(entity) {
    return $RFMalumUtils.getTouchOfDarknessData(entity);
}

/**
 * 获取黑暗触碰的当前值
 * @param {Internal.LivingEntity} entity
 * @returns {number}
 */
function fu_getTouchOfDarkness(entity) {
    return $RFMalumUtils.getTouchOfDarkness(entity);
}

/**
 * 获取黑暗触碰的目标等级
 * @param {Internal.LivingEntity} entity
 * @returns {number}
 */
function fu_getExpectedTouchOfDarkness(entity) {
    return $RFMalumUtils.getExpectedTouchOfDarkness(entity);
}

/**
 * 设置黑暗触碰的折磨等级
 * @param {Internal.LivingEntity} entity
 * @param {number} level
 */
function fu_setAfflictionLevel(entity, level) {
    $RFMalumUtils.setAfflictionLevel(entity, level);
}

/**
 * 增加黑暗触碰的折磨等级
 * @param {Internal.LivingEntity} entity
 * @param {number} amount
 */
function fu_addAfflictionLevel(entity, amount) {
    $RFMalumUtils.addAfflictionLevel(entity, amount);
}

/**
 * 检查实体是否有黑暗触碰效果
 * @param {Internal.LivingEntity} entity
 * @returns {boolean}
 */
function fu_hasDarknessTouch(entity) {
    return $RFMalumUtils.hasDarknessTouch(entity);
}

/**
 * 清除实体的所有黑暗触碰效果
 * @param {Internal.LivingEntity} entity
 */
function fu_clearDarknessTouch(entity) {
    $RFMalumUtils.clearDarknessTouch(entity);
}

/**
 * 处理原始汤接触
 * @param {Internal.LivingEntity} entity
 */
function fu_handlePrimordialSoupContact(entity) {
    $RFMalumUtils.handlePrimordialSoupContact(entity);
}

/**
 * 手动更新黑暗触碰效果
 * @param {Internal.LivingEntity} entity
 */
function fu_updateDarknessTouch(entity) {
    $RFMalumUtils.updateDarknessTouch(entity);
}

/**
 * 尝试在世界中自然生成怪异晶体
 * @param {Internal.ServerLevel} level
 * @param {Internal.BlockPos} pos
 * @returns {boolean}
 */
function fu_tryGenerateStrangeCrystal(level, pos) {
    return $RFMalumUtils.tryGenerateStrangeCrystal(level, pos);
}