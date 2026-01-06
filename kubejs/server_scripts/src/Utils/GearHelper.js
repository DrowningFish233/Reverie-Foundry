/**
 * 获取 Gear 物品的实例
 * @param {Internal.ItemStack} gear 物品堆栈
 * @returns {GearItem|null} GearItem 实例或 null
 */
function fu_getGearItem(gear) {
    return gear.getItem() instanceof $GearItem ? gear.getItem() : null;
}

/**
 * 检查物品是否为 Silent Gear 的工具、武器或护甲物品
 * @param {Internal.ItemStack} stack 要检查的物品
 * @returns {boolean} 如果是 Gear 物品则返回 true
 */
function fu_isGear(stack) {
    return $GearHelper.isGear(stack);
}

/**
 * 检查物品是否为有效的 Silent Gear 物品（没有缺少必需部件）
 * @param {Internal.ItemStack} stack 要检查的物品
 * @returns {boolean} 如果是有效的 Gear 物品则返回 true
 */
function fu_isValidGear(stack) {
    return $GearHelper.isValidGear(stack);
}

/**
 * 获取 Gear 物品的攻击伤害加成
 * @param {Internal.ItemStack} stack Gear 物品
 * @returns {number} 攻击伤害加成值
 */
function fu_getAttackDamageModifier(stack) {
    return $GearHelper.getAttackDamageModifier(stack);
}

/**
 * 获取 Gear 物品的魔法伤害加成
 * @param {Internal.ItemStack} stack Gear 物品
 * @returns {number} 魔法伤害加成值
 */
function fu_getMagicDamageModifier(stack) {
    return $GearHelper.getMagicDamageModifier(stack);
}

/**
 * 获取 Gear 物品的攻击速度加成
 * @param {Internal.ItemStack} stack Gear 物品
 * @returns {number} 攻击速度加成值
 */
function fu_getAttackSpeedModifier(stack) {
    return $GearHelper.getAttackSpeedModifier(stack);
}

/**
 * 检查物品是否可以被指定的材料修复
 * @param {Internal.ItemStack} gear 要修复的 Gear 物品
 * @param {Internal.ItemStack} materialItem 修复材料物品
 * @returns {boolean} 如果可以修复则返回 true
 */
function fu_getIsRepairable(gear, materialItem) {
    return $GearHelper.getIsRepairable(gear, materialItem);
}

/**
 * 检查物品是否可以被指定的材料实例修复
 * @param {Internal.ItemStack} gear 要修复的 Gear 物品
 * @param {MaterialInstance} material 修复材料实例
 * @returns {boolean} 如果可以修复则返回 true
 */
function fu_getIsRepairableWithMaterial(gear, material) {
    return $GearHelper.getIsRepairable(gear, material);
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
 * 获取 Gear 物品的修复倍率
 * @param {Internal.ItemStack} gear Gear 物品
 * @returns {number} 修复倍率
 */
function fu_getRepairModifier(gear) {
    return $GearHelper.getRepairModifier(gear);
}

/**
 * 对 Gear 物品造成伤害
 * @param {Internal.ItemStack} stack 物品
 * @param {number} amount 伤害量
 * @param {Internal.LivingEntity} entity 持有者
 * @param {Internal.InteractionHand} hand 持有手
 */
function fu_attemptDamageByHand(stack, amount, entity, hand) {
    $GearHelper.attemptDamage(stack, amount, entity, hand);
}

/**
 * 对 Gear 物品造成伤害（指定装备槽位）
 * @param {Internal.ItemStack} stack 物品
 * @param {number} amount 伤害量
 * @param {Internal.LivingEntity} entity 持有者
 * @param {Internal.EquipmentSlot} slot 装备槽位
 */
function fu_attemptDamageBySlot(stack, amount, entity, slot) {
    $GearHelper.attemptDamage(stack, amount, entity, slot);
}

/**
 * 当 Gear 物品损坏时调用
 * @param {Internal.ItemStack} stack 物品
 * @param {Internal.Player|null} player 玩家
 * @param {Internal.EquipmentSlot} slot 装备槽位
 */
function fu_onBroken(stack, player, slot) {
    $GearHelper.onBroken(stack, player, slot);
}

/**
 * 使用物品并检查是否损坏
 * @param {Internal.UseOnContext} context 使用上下文
 * @param {function} useFunction 使用函数
 * @returns {Internal.InteractionResult} 交互结果
 */
function fu_useAndCheckBroken(context, useFunction) {
    return $GearHelper.useAndCheckBroken(context, useFunction);
}

/**
 * 计算受保护的伤害值（防止永久损坏）
 * @param {Internal.ItemStack} stack 物品
 * @param {number} damage 原始伤害值
 * @returns {number} 受保护的伤害值
 */
function fu_calcDamageClamped(stack, damage) {
    return $GearHelper.calcDamageClamped(stack, damage);
}

/**
 * 检查 Gear 物品是否已损坏（但可修复）
 * @param {Internal.ItemStack} stack 要检查的物品
 * @returns {boolean} 如果已损坏则返回 true
 */
function fu_isBroken(stack) {
    return $GearHelper.isBroken(stack);
}

/**
 * 检查 Gear 物品是否不可破坏
 * @param {Internal.ItemStack} stack 要检查的物品
 * @returns {boolean} 如果不可破坏则返回 true
 */
function fu_isUnbreakable(stack) {
    return $GearHelper.isUnbreakable(stack);
}

/**
 * 设置 Gear 物品的伤害值（带保护逻辑）
 * @param {Internal.ItemStack} stack 物品
 * @param {number} damage 伤害值
 * @param {function} superFunction 原版的设置伤害函数
 */
function fu_setDamage(stack, damage, superFunction) {
    $GearHelper.setDamage(stack, damage, superFunction);
}

/**
 * 对物品造成伤害并返回实际伤害值
 * @param {Internal.ItemStack} stack 物品
 * @param {number} amount 伤害量
 * @param {Internal.LivingEntity|null} entity 持有者
 * @param {function} onBroken 物品损坏时的回调
 * @returns {number} 实际造成的伤害量
 */
function fu_damageItem(stack, amount, entity, onBroken) {
    return $GearHelper.damageItem(stack, amount, entity, onBroken);
}

/**
 * 获取 Gear 物品的类型
 * @param {Internal.ItemStack} gear Gear 物品
 * @param {string} defaultType 默认类型ID（可选）
 * @returns {GearType} Gear 类型
 */
function fu_getGearType(gear, defaultType) {
    if (defaultType) {
        const defaultGearType = $SgRegistries.GEAR_TYPES.get($ResourceLocation.tryParse(defaultType));
        return $GearHelper.getType(gear, defaultGearType);
    }
    return $GearHelper.getType(gear);
}

/**
 * 检查两个 Gear 物品是否由相同的部件组成
 * @param {Internal.ItemStack} gear1 第一个物品
 * @param {Internal.ItemStack} gear2 第二个物品
 * @returns {boolean} 如果部件相同则返回 true
 */
function fu_isEquivalent(gear1, gear2) {
    return $GearHelper.isEquivalent(gear1, gear2);
}

/**
 * 检查 Gear 工具是否可以正确采集指定方块
 * @param {Internal.ItemStack} stack 工具物品
 * @param {Internal.BlockState} state 方块状态
 * @param {string} blocksForTool 工具标签（可选）
 * @returns {boolean} 如果可以采集则返回 true
 */
function fu_isCorrectToolForDrops(stack, state, blocksForTool) {
    if (blocksForTool) {
        const tag = $TagKey.create($Registries.BLOCK, $ResourceLocation.tryParse(blocksForTool));
        return $GearHelper.isCorrectToolForDrops(stack, state, tag);
    }
    return $GearHelper.isCorrectToolForDrops(stack, state, null);
}

/**
 * 获取 Gear 工具的挖掘速度
 * @param {Internal.ItemStack} stack 工具物品
 * @param {Internal.BlockState} state 方块状态
 * @returns {number} 挖掘速度
 */
function fu_getDestroySpeed(stack, state) {
    return $GearHelper.getDestroySpeed(stack, state);
}

/**
 * 当 Gear 工具破坏方块时调用
 * @param {Internal.ItemStack} stack 工具物品
 * @param {Internal.Level} world 世界
 * @param {Internal.BlockState} state 方块状态
 * @param {Internal.BlockPos} pos 方块位置
 * @param {Internal.LivingEntity} entityLiving 使用工具的生物
 * @returns {boolean} 是否成功处理
 */
function fu_onBlockDestroyed(stack, world, state, pos, entityLiving) {
    return $GearHelper.onBlockDestroyed(stack, world, state, pos, entityLiving);
}

/**
 * 当 Gear 物品攻击敌人时调用
 * @param {Internal.ItemStack} stack 武器物品
 * @param {Internal.LivingEntity} target 目标生物
 * @param {Internal.LivingEntity} attacker 攻击者
 * @returns {boolean} 是否成功处理
 */
function fu_hurtEnemy(stack, target, attacker) {
    return $GearHelper.hurtEnemy(stack, target, attacker);
}

/**
 * 攻击敌人后调用
 * @param {Internal.ItemStack} stack 武器物品
 * @param {Internal.LivingEntity} target 目标生物
 * @param {Internal.LivingEntity} attacker 攻击者
 */
function fu_postHurtEnemy(stack, target, attacker) {
    $GearHelper.postHurtEnemy(stack, target, attacker);
}

/**
 * Gear 物品库存更新时调用
 * @param {Internal.ItemStack} stack 物品
 * @param {Internal.Level} world 世界
 * @param {Internal.Entity} entity 持有者
 * @param {number} itemSlot 物品栏槽位
 * @param {boolean} isSelected 是否被选中
 */
function fu_inventoryTick(stack, world, entity, itemSlot, isSelected) {
    $GearHelper.inventoryTick(stack, world, entity, itemSlot, isSelected);
}

/**
 * 使用 Gear 物品时调用
 * @param {Internal.UseOnContext} context 使用上下文
 * @returns {Internal.InteractionResult} 交互结果
 */
function fu_onItemUse(context) {
    return $GearHelper.onItemUse(context);
}

/**
 * 挥舞 Gear 物品时调用
 * @param {Internal.ItemStack} stack 物品
 * @param {Internal.LivingEntity} wielder 挥舞者
 */
function fu_onItemSwing(stack, wielder) {
    $GearHelper.onItemSwing(stack, wielder);
}

/**
 * 获取具有额外攻击距离的攻击目标
 * @param {Internal.Player} player 玩家
 * @returns {Internal.Entity|null} 攻击目标或 null
 */
function fu_getAttackTargetWithExtraReach(player) {
    return $GearHelper.getAttackTargetWithExtraReach(player);
}

/**
 * 尝试使用额外攻击距离攻击实体
 * @param {Internal.Player} player 玩家
 * @returns {Internal.Entity|null} 被攻击的实体，如果失败则返回 null
 */
function fu_tryAttackWithExtraReach(player) {
    return $GearHelper.tryAttackWithExtraReach(player);
}

/**
 * 获取 Gear 物品的附魔能力值
 * @param {Internal.ItemStack} stack 物品
 * @returns {number} 附魔能力值
 */
function fu_getEnchantmentValue(stack) {
    return $GearHelper.getEnchantmentValue(stack);
}

/**
 * 获取 Gear 物品的稀有度
 * @param {Internal.ItemStack} stack 物品
 * @returns {Internal.Rarity} 稀有度
 */
function fu_getRarity(stack) {
    return $GearHelper.getRarity(stack);
}

/**
 * 创建示例 Gear 物品（基于等级）
 * @param {string} gearItemId Gear 物品的 ID
 * @param {number} tier 等级
 * @returns {Internal.ItemStack} 示例物品
 */
function fu_createSampleItemByTier(gearItemId, tier) {
    const item = Item.of(gearItemId);
    if (item instanceof $GearItem) {
        return $GearHelper.createSampleItem(item, tier);
    }
    return $ItemStack.EMPTY;
}

/**
 * 创建示例 Gear 物品（基于主要材料）
 * @param {string} gearItemId Gear 物品的 ID
 * @param {string} materialId 主要材料的 ID
 * @returns {Internal.ItemStack} 示例物品
 */
function fu_createSampleItemByMaterial(gearItemId, materialId) {
    const item = Item.of(gearItemId);
    if (item instanceof $GearItem) {
        const material = $SgRegistries.MATERIAL.get($ResourceLocation.tryParse(materialId));
        if (material) {
            const dataResource = $DataResource.material(material.getId());
            return $GearHelper.createSampleItem(item, dataResource);
        }
    }
    return $ItemStack.EMPTY;
}

/**
 * 从配方获取示例部件
 * @param {string} gearTypeId Gear 类型 ID
 * @param {Array<Ingredient>} ingredients 配方成分
 * @returns {Array<PartInstance>} 部件实例数组
 */
function fu_getExamplePartsFromRecipe(gearTypeId, ingredients) {
    const gearType = $SgRegistries.GEAR_TYPES.get($ResourceLocation.tryParse(gearTypeId));
    if (gearType) {
        const javaList = new $java.util.ArrayList();
        ingredients.forEach(ingredient => javaList.add(ingredient));
        return Array.from($GearHelper.getExamplePartsFromRecipe(gearType, javaList));
    }
    return [];
}

/**
 * 获取 Gear 物品的完整名称
 * @param {Internal.ItemStack} gear Gear 物品
 * @returns {Internal.Component|null} 物品名称组件或 null
 */
function fu_getItemName(gear) {
    const constructionData = gear.get($SgDataComponents.GEAR_CONSTRUCTION);
    if (constructionData) {
        return $GearHelper.getItemName(gear, constructionData);
    }
    return null;
}
