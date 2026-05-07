//priority: 100

/**
 * 掉落灵魂
 * @param {Internal.LivingEntity} target - 要掉落灵魂的目标生物
 * @param {Internal.LivingEntity} attacker - 攻击者
 */
function fu_dropSpirits(target, attacker) {
    $SoulHarvestHandler.dropSpirits(target, attacker);
}

/**
 * 掉落灵魂灌注物品
 * @param {Internal.LivingEntity} target - 目标生物
 */
function fu_dropSpiritInfusedDrops(target) {
    $SoulHarvestHandler.dropSpiritInfusedDrops(target);
}


/**
 * 创建灵魂生成器
 * @param {Internal.Entity} target - 目标实体
 * @returns {Internal.SoulHarvestHandler$SpiritSpawner} 灵魂生成器实例
 */
function fu_createSpiritSpawner(target) {
    return $SoulHarvestHandler.spawnSpirits(target);
}


/**
 * 触发灵魂收集事件
 * @param {Internal.LivingEntity} collector - 收集者
 */
function fu_triggerSpiritCollection(collector) {
    $SoulHarvestHandler.triggerSpiritCollection(collector);
}

/**
 * 拾取灵魂物品
 * @param {Internal.LivingEntity} collector - 收集者
 * @param {Internal.ItemStack} spiritStack - 灵魂物品堆
 */
function fu_pickupSpirit(collector, spiritStack) {
    $SoulHarvestHandler.pickupSpirit(collector, spiritStack);
}

/**
 * 检查生物是否可以掉落灵魂
 * @param {Internal.LivingEntity} entity - 要检查的生物
 * @returns {boolean} 是否可以掉落灵魂
 */
function fu_shouldDropSpirits(entity) {
    var data = entity.getData($MalumAttachmentTypes.LIVING_SOUL_INFO);
    return data.shouldDropSpirits();
}

/**
 * 强制设置生物为无魂状态
 * @param {Internal.LivingEntity} entity - 目标生物
 * @param {boolean} soulless - 是否无魂
 */
function fu_setSoulless(entity, soulless) {
    var data = entity.getData($MalumAttachmentTypes.LIVING_SOUL_INFO);
    data.setSoulless(soulless);
}

/**
 * 设置攻击者的最近击碎时间
 * @param {Internal.LivingEntity} attacker - 攻击者
 * @param {number} gameTime - 游戏时间
 */
function fu_setMostRecentShatter(attacker, gameTime) {
    if (attacker) {
        var data = attacker.getData($MalumAttachmentTypes.LIVING_SOUL_INFO);
        data.setMostRecentShatter(gameTime);
    }
}

/**
 * 完整的灵魂掉落处理
 * @param {Internal.LivingEntity} target - 死亡的目标
 * @param {Internal.LivingEntity} attacker - 攻击者
 */
function fu_handleSoulHarvest(target, attacker) {
    // 检查是否应该掉落灵魂
    var data = target.getData($MalumAttachmentTypes.LIVING_SOUL_INFO);
    if (data.shouldDropSpirits()) {
        fu_dropSpiritInfusedDrops(target);
        fu_dropEncyclopediaArcana(target, attacker);
        fu_dropSpirits(target, attacker);

        if (attacker) {
            fu_setMostRecentShatter(attacker, target.level.getGameTime());
        }

        data.setSoulless(true);
    }
}

/**
 * 设置偏好收集者
 * @param {Internal.SoulHarvestHandler$SpiritSpawner} spawner - 灵魂生成器
 * @param {Internal.LivingEntity} collector - 偏好收集者
 * @returns {Internal.SoulHarvestHandler$SpiritSpawner} 修改后的生成器
 */
function fu_spawnerSetCollector(spawner, collector) {
    return spawner.setPreferredCollector(collector);
}

/**
 * 设置自定义物品
 * @param {Internal.SoulHarvestHandler$SpiritSpawner} spawner - 灵魂生成器
 * @param {Internal.Item[]} items - 物品数组
 * @returns {Internal.SoulHarvestHandler$SpiritSpawner} 修改后的生成器
 */
function fu_spawnerSetCustomItems(spawner, items) {
    return spawner.setCustomItems(items);
}

/**
 * 设置自定义物品堆
 * @param {Internal.SoulHarvestHandler$SpiritSpawner} spawner - 灵魂生成器
 * @param {Internal.ItemStack[]} itemStacks - 物品堆数组
 * @returns {Internal.SoulHarvestHandler$SpiritSpawner} 修改后的生成器
 */
function fu_spawnerSetCustomItemStacks(spawner, itemStacks) {
    return spawner.setCustomItems(itemStacks);
}

/**
 * 获取掉落列表
 * @param {Internal.SoulHarvestHandler$SpiritSpawner} spawner - 灵魂生成器
 * @returns {List<Internal.ItemStack>} 灵魂物品列表
 */
function fu_spawnerGetDrops(spawner) {
    return spawner.getSpiritDrops();
}

/**
 * 生成灵魂实体
 * @param {Internal.SoulHarvestHandler$SpiritSpawner} spawner - 灵魂生成器
 * @param {Internal.Level} level - 世界
 */
function fu_spawnerSpawn(spawner, level) {
    spawner.spawnSpirits(level);
}

/**
 * 创建单个灵魂实体
 * @param {Internal.SoulHarvestHandler$SpiritSpawner} spawner - 灵魂生成器
 * @param {Internal.ItemStack} stack - 物品堆
 * @param {Internal.Vec3} position - 位置
 * @returns {Internal.Entity} 灵魂实体
 */
function fu_spawnerCreateEntity(spawner, stack, position) {
    return spawner.createSpiritEntity(stack, position);
}

/**
 * 创建并立即生成灵魂
 * @param {Internal.Entity} target - 目标实体
 * @param {Internal.LivingEntity} collector - 偏好收集者（可空）
 * @param {Internal.Level} level - 世界
 */
function fu_spawnSpiritsImmediate(target, collector, level) {
    var spawner = fu_createSpiritSpawner(target);
    if (collector) {
        spawner.setPreferredCollector(collector);
    }
    spawner.spawnSpirits(level);
}

/**
 * 创建并生成自定义灵魂物品
 * @param {Internal.Entity} target - 目标实体
 * @param {Internal.Item[]} items - 要生成的物品
 * @param {Internal.LivingEntity} collector - 偏好收集者（可空）
 * @param {Internal.Level} level - 世界
 */
function fu_spawnCustomSpirits(target, items, collector, level) {
    var spawner = fu_createSpiritSpawner(target);
    spawner.setCustomItems(items);
    if (collector) {
        spawner.setPreferredCollector(collector);
    }
    spawner.spawnSpirits(level);
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