/**
 * 获取装备的属性数据
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {Internal.Player|null} player 玩家（可选）
 * @returns {GearPropertiesData} 属性数据
 */
function fu_getGearProperties(gear, player) {
    return $GearData.getProperties(gear, player);
}

/**
 * 获取装备的法术强度
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @returns {number} 法术强度值
 */
function fu_getSpellPower(gear) {
    return $GearData.getSpellPower(gear);
}

/**
 * 获取装备的法术抗性
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @returns {number} 法术抗性值
 */
function fu_getSpellResist(gear) {
    return $GearData.getSpellResist(gear);
}

/**
 * 获取装备的法力回复
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @returns {number} 法力回复值
 */
function fu_getManaRegen(gear) {
    return $GearData.getManaRegen(gear);
}

/**
 * 获取装备的契约限制加成
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @returns {number} 契约限制加成值（保留两位小数）
 */
function fu_getGeasLimitBonus(gear) {
    return $GearData.getGeasLimitBonus(gear);
}

/**
 * 获取装备的受治疗加成倍数
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @returns {number} 治疗加成倍数
 */
function fu_getHealingReceivedMultiplier(gear) {
    return $GearData.getHealingReceivedMultiplier(gear);
}

/**
 * 重新计算装备数据（重要：装备被修改时必须调用）
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {Internal.Player|null} player 玩家（可选）
 */
function fu_recalculateGearData(gear, player) {
    $GearData.recalculateGearData(gear, player);
}

/**
 * 获取装备的构造数据
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @returns {GearConstructionData} 构造数据
 */
function fu_getGearConstruction(gear) {
    return $GearData.getConstruction(gear);
}

/**
 * 获取指定类型的第一个部件
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {PartType} type 部件类型
 * @returns {PartInstance|null} 部件实例或null
 */
function fu_getPartOfType(gear, type) {
    return $GearData.getPartOfType(gear, type);
}

/**
 * 检查装备是否包含指定类型的部件
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {PartType} type 部件类型
 * @returns {boolean} 是否包含
 */
function fu_hasPartOfType(gear, type) {
    return $GearData.hasPartOfType(gear, type);
}

/**
 * 添加升级部件到装备
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {PartInstance} part 部件实例
 */
function fu_addUpgradePart(gear, part) {
    $GearData.addUpgradePart(gear, part);
}

/**
 * 检查装备是否包含符合条件的部件
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {PartType} partType 部件类型
 * @param {function} predicate 检查函数
 * @returns {boolean} 是否包含
 */
function fu_hasPartByPredicate(gear, partType, predicate) {
    return $GearData.hasPart(gear, partType, predicate);
}

/**
 * 检查装备是否包含指定部件（通过GearPart对象）
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {GearPart} part 部件对象
 * @returns {boolean} 是否包含
 */
function fu_hasPartByGearPart(gear, part) {
    return $GearData.hasPart(gear, part);
}

/**
 * 检查装备是否包含指定部件（通过DataResource）
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {DataResource<GearPart>} part 部件资源
 * @returns {boolean} 是否包含
 */
function fu_hasPartByDataResource(gear, part) {
    return $GearData.hasPart(gear, part);
}

/**
 * 添加或替换部件（自动处理数量限制）
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {PartInstance} part 部件实例
 */
function fu_addOrReplacePart(gear, part) {
    $GearData.addOrReplacePart(gear, part);
}

/**
 * 添加部件到装备
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {PartInstance} part 部件实例
 */
function fu_addPart(gear, part) {
    $GearData.addPart(gear, part);
}

/**
 * 移除指定类型的第一个部件
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {PartType} type 部件类型
 * @returns {boolean} 是否成功移除
 */
function fu_removeFirstPartOfType(gear, type) {
    return $GearData.removeFirstPartOfType(gear, type);
}

/**
 * 写入部件集合到装备
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {Array<PartInstance>|Collection<PartInstance>} parts 部件集合
 */
function fu_writeConstructionParts(gear, parts) {
    $GearData.writeConstructionParts(gear, parts);
}

/**
 * 检查装备是否为示例装备（展示用）
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @returns {boolean} 是否为示例装备
 */
function fu_isExampleGear(gear) {
    return $GearData.isExampleGear(gear);
}

/**
 * 获取装备的损坏次数
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @returns {number} 损坏次数
 */
function fu_getBrokenCount(gear) {
    return $GearData.getBrokenCount(gear);
}

/**
 * 增加装备的损坏次数
 * @param {Internal.ItemStack} gear 装备物品堆栈
 */
function fu_incrementBrokenCount(gear) {
    const data = gear.get($SgDataComponents.GEAR_CONSTRUCTION);
    if (data) {
        const newData = new $GearConstructionData(
            data.parts(),
            data.isExample(),
            data.brokenCount() + 1,
            data.repairedCount()
        );
        gear.set($SgDataComponents.GEAR_CONSTRUCTION, newData);
    }
}

/**
 * 获取装备的修复次数
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @returns {number} 修复次数
 */
function fu_getRepairedCount(gear) {
    return $GearData.getRepairedCount(gear);
}

/**
 * 增加装备的修复次数
 * @param {Internal.ItemStack} gear 装备物品堆栈
 * @param {number} amount 增加的次数
 */
function fu_incrementRepairedCount(gear, amount) {
    // 注意：原始方法接受amount参数
    const data = gear.get($SgDataComponents.GEAR_CONSTRUCTION);
    if (data) {
        const newData = new $GearConstructionData(
            data.parts(),
            data.isExample(),
            data.brokenCount(),
            data.repairedCount() + (amount || 1)
        );
        gear.set($SgDataComponents.GEAR_CONSTRUCTION, newData);
    }
}
