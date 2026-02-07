/**
 * 将字符串特质ID转换
 */
function _convertTrait(traitId) {
    let location = $ResourceLocation.tryParse(traitId);
    return new $DataResource(location, function (id) {
        return $SgRegistries.TRAIT.get(id);
    });
}

/**
 * 激活物品特质的便捷方法。请谨慎使用！
 * 频繁调用（例如每tick都调用）会导致帧率严重下降。
 * <p>
 * 此实现直接从 NBT 数据读取物品特质，以最小化对象创建。
 * {@link TraitFunction} 会应用于每个特质。
 *
 * @param gear       受影响的 {@link GearItem} 物品
 * @param inputValue 特质要作用的基础值
 * @param action     应用于每个特质的具体操作。格式为 {@code (trait, level, value) -> modifiedInputValue，
 *                   其中 'value' 是当前计算的结果
 * @return 经过特质修改后的 {@code inputValue} 值
 */
function fu_activateTraits(gear, inputValue, action) {
    return $TraitHelper.activateTraits(gear, inputValue, action);
}

/**
 * 获取装备上特质的等级，如果装备没有该特质则返回零。类似于
 * {@link #activateTraits(ItemStack, Object, TraitFunction)}，此方法直接从
 * NBT 数据读取特质以最小化对象创建。
 *
 * @param gear  装备物品
 * @param trait 要查找的特质（支持字符串ID或DataResource对象）
 * @return 装备上特质的等级，如果装备没有该特质则返回零
 */
function fu_getTraitLevel(gear, trait) {
    return $TraitHelper.getTraitLevel(gear, _convertTrait(trait));
}

/**
 * 检查装备物品是否拥有指定特质（任意等级）。
 *
 * @param gear  装备物品
 * @param trait 特质（支持字符串ID或DataResource对象）
 * @return 当且仅当装备物品拥有该特质时返回 true
 */
function fu_hasTrait(gear, trait) {
    return $TraitHelper.hasTrait(gear, _convertTrait(trait));
}

/**
 * 检查装备物品是否拥有指定类型的特质效果。
 *
 * @param gear 装备物品
 * @param traitEffectType 特质效果类型
 * @return 如果装备拥有该类型的特质效果则返回 true
 */
function fu_hasTraitEffect(gear, traitEffectType) {
    return $TraitHelper.hasTraitEffect(gear, traitEffectType);
}

/**
 * 获取玩家双手装备中指定特质的最高等级。
 *
 * @param player 玩家
 * @param trait 特质（支持字符串ID或DataResource对象）
 * @return 双手装备中特质的最高等级
 */
function fu_getHighestLevelEitherHand(player, trait) {
    if (!player.isPlayer()) {
        return false;
    }
    return $TraitHelper.getHighestLevelEitherHand(player, _convertTrait(trait));
}

/**
 * 获取玩家护甲装备中指定特质的最高等级。
 *
 * @param player 玩家
 * @param trait 特质（支持字符串ID或DataResource对象）
 * @return 护甲装备中特质的最高等级
 */
function fu_getHighestLevelArmor(player, trait) {
    if (!player.isPlayer()) {
        return false;
    }
    return $TraitHelper.getHighestLevelArmor(player, _convertTrait(trait));
}

/**
 * 获取实体饰品装备中指定特质的最高等级。
 *
 * @param entity 实体
 * @param trait 特质（支持字符串ID或DataResource对象）
 * @return 饰品装备中特质的最高等级
 */
function fu_getHighestLevelCurio(entity, trait) {
    return $TraitHelper.getHighestLevelCurio(entity, _convertTrait(trait));
}

/**
 * 获取玩家护甲或饰品装备中指定特质的最高等级。
 *
 * @param player 玩家
 * @param trait 特质（支持字符串ID或DataResource对象）
 * @return 护甲或饰品装备中特质的最高等级
 */
function fu_getHighestLevelArmorOrCurio(player, trait) {
    if (!player.isPlayer()) {
        return false;
    }
    return $TraitHelper.getHighestLevelArmorOrCurio(player, _convertTrait(trait));
}

/**
 * 检查玩家双手装备中是否拥有指定特质。
 *
 * @param player 玩家
 * @param trait 特质（支持字符串ID或DataResource对象）
 * @return 如果双手装备中任意一件拥有该特质则返回 true
 */
function fu_hasTraitEitherHand(player, trait) {
    if (!player.isPlayer()) {
        return false;
    }
    return $TraitHelper.hasTraitEitherHand(player, _convertTrait(trait));
}

/**
 * 检查玩家护甲装备中是否拥有指定特质。
 *
 * @param player 玩家
 * @param trait 特质（支持字符串ID或DataResource对象）
 * @return 如果护甲装备中任意一件拥有该特质则返回 true
 */
function fu_hasTraitArmor(player, trait) {
    if (!player.isPlayer()) {
        return false;
    }
    return $TraitHelper.hasTraitArmor(player, _convertTrait(trait));
}

/**
 * 获取装备的所有特质实例列表。
 *
 * @param gear 装备物品
 * @return 特质实例列表，如果不是装备则返回空列表
 */
function fu_getTraits(gear) {
    return $TraitHelper.getTraits(gear);
}



/**
 * 通用特质检测函数 - 检查玩家是否在任意位置持有指定特质
 * @param {Player} player 玩家对象
 * @param {string} traitId 特质ID
 * @return {boolean} 如果玩家在任意位置持有该特质则返回true
 */
function fu_hasTraitAnywhere(player, traitId) {
    if (!player.isPlayer()) {
        return false;
    }
    // 检查双手装备
    const hasTraitInHand = typeof fu_hasTraitEitherHand === 'function'
        ? fu_hasTraitEitherHand(player, traitId)
        : false;

    // 检查护甲装备
    const hasTraitInArmor = typeof fu_hasTraitArmor === 'function'
        ? fu_hasTraitArmor(player, traitId)
        : false;

    // 检查饰品装备
    const hasTraitInCurio = typeof fu_getHighestLevelCurio === 'function'
        ? fu_getHighestLevelCurio(player, traitId) > 0
        : false;

    // 只要在任意位置有特质就返回true
    return hasTraitInHand || hasTraitInArmor || hasTraitInCurio;
}



/**
 * 获取原始特质等级（不含升变效果）
 */
function getOriginalTraitLevel(player, traitId) {
    let maxLevel = 0;

    // 获取双手最高等级
    if (typeof fu_getHighestLevelEitherHand === 'function') {
        const handLevel = fu_getHighestLevelEitherHand(player, traitId);
        maxLevel = Math.max(maxLevel, handLevel || 0);
    }

    // 获取护甲最高等级
    if (typeof fu_getHighestLevelArmor === 'function') {
        const armorLevel = fu_getHighestLevelArmor(player, traitId);
        maxLevel = Math.max(maxLevel, armorLevel || 0);
    }

    // 获取饰品最高等级
    if (typeof fu_getHighestLevelCurio === 'function') {
        const curioLevel = fu_getHighestLevelCurio(player, traitId);
        maxLevel = Math.max(maxLevel, curioLevel || 0);
    }

    return maxLevel;
}


/**
 * 仅检测主手装备是否持有特质
 * @param {Player} player 玩家对象
 * @param {string} traitId 特质ID
 * @return {boolean} 如果主手装备持有该特质则返回true
 */
function fu_hasTraitMainHand(player, traitId) {
    const mainHandItem = player.getMainHandItem();
    return fu_hasTrait(mainHandItem, traitId);
}

/**
 * 获取主手装备特质等级
 * @param {Player} player 玩家对象
 * @param {string} traitId 特质ID
 * @return {number} 主手装备特质等级
 */
function fu_getTraitLevelMainHand(player, traitId) {
    const mainHandItem = player.getMainHandItem();
    if (fu_isGear(mainHandItem)) {
        return fu_getTraitLevel(mainHandItem, traitId);
    }
    return fu_hasTrait(mainHandItem, traitId) ? 1 : 0;
}

/**
 * 仅检测副手装备是否持有特质
 * @param {Player} player 玩家对象
 * @param {string} traitId 特质ID
 * @return {boolean} 如果副手装备持有该特质则返回true
 */
function fu_hasTraitOffHand(player, traitId) {
    const offHandItem = player.getOffhandItem();
    return fu_hasTrait(offHandItem, traitId);
}

/**
 * 获取副手装备特质等级
 * @param {Player} player 玩家对象
 * @param {string} traitId 特质ID
 * @return {number} 副手装备特质等级
 */
function fu_getTraitLevelOffHand(player, traitId) {
    const offHandItem = player.getOffhandItem();
    return fu_getTraitLevel(offHandItem, traitId);
}


/**
 * 获取玩家身上所有装备的词缀数量（去重）
 */
function fu_getUniqueTraitsCount(player) {
    let uniqueTraits = new Set();

    // 主手装备词缀
    const mainHandTraits = fu_getTraits(player.getMainHandItem());
    mainHandTraits.forEach(trait => uniqueTraits.add(trait.getTraitId().toString()));

    // 副手装备词缀
    const offHandTraits = fu_getTraits(player.getOffhandItem());
    offHandTraits.forEach(trait => uniqueTraits.add(trait.getTraitId().toString()));

    // 护甲装备词缀
    for (let armorStack of player.getInventory().armor) {
        let armorTraits = fu_getTraits(armorStack);
        armorTraits.forEach(trait => uniqueTraits.add(trait.getTraitId().toString()));
    }

    return uniqueTraits.size;
}

/**
 * 通用特质等级获取函数 - 获取玩家在所有位置的特质最高等级
 * @param {Player} player 玩家对象
 * @param {string} traitId 特质ID
 * @return {number} 玩家在所有位置的特质最高等级
 */
function fu_getHighestTraitLevelAnywhere(player, traitId) {
    // 参数验证
    if (!player || !traitId || typeof traitId !== 'string') {
        return 0;
    }

    let maxLevel = 0;

    // 获取双手最高等级
    if (typeof fu_getHighestLevelEitherHand === 'function') {
        const handLevel = fu_getHighestLevelEitherHand(player, traitId);
        maxLevel = Math.max(maxLevel, handLevel || 0);
    }

    // 获取护甲最高等级
    if (typeof fu_getHighestLevelArmor === 'function') {
        const armorLevel = fu_getHighestLevelArmor(player, traitId);
        maxLevel = Math.max(maxLevel, armorLevel || 0);
    }

    // 获取饰品最高等级
    if (typeof fu_getHighestLevelCurio === 'function') {
        const curioLevel = fu_getHighestLevelCurio(player, traitId);
        maxLevel = Math.max(maxLevel, curioLevel || 0);
    }

    return maxLevel;
}

/**
 * 通用特质等级获取函数 - 获取玩家在所有位置的特质最高等级
 * @param {Player} player 玩家对象
 * @param {string} traitId 特质ID
 * @return {number} 玩家在所有位置的特质最高等级（自动包含升变词缀效果）
 * @deprecated 已废弃，已经在Hotai中加入检测以修复最大兼容性
function fu_getHighestTraitLevelAnywhere(player, traitId) {
    // 参数验证
    if (!player || !traitId || typeof traitId !== 'string') {
        return 0;
    }

    // 如果是检测升变词缀本身，直接返回原始等级
    if (traitId === "kubejs:promotion") {
        return getOriginalTraitLevel(player, traitId);
    }

    const originalLevel = getOriginalTraitLevel(player, traitId);

    if (originalLevel > 0) {
        const hasPromotion = getOriginalTraitLevel(player, "kubejs:promotion") > 0;

        if (hasPromotion) {
            return originalLevel + 1;
        }
    }

    return originalLevel;
}
 */
