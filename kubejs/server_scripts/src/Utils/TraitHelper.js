// priority: 100
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
 * 激活物品特质的便捷方法
 */
function fu_activateTraits(gear, inputValue, action) {
    return $TraitHelper.activateTraits(gear, inputValue, action);
}

/**
 * 获取装备上特质的等级
 */
function fu_getTraitLevel(gear, trait) {
    let traitId = typeof trait === 'string' ? trait : trait.getId().toString();
    return $RFTraitUtils.getTraitLevel(gear, traitId);
}

/**
 * 检查装备物品是否拥有指定特质
 */
function fu_hasTrait(gear, trait) {
    let traitId = typeof trait === 'string' ? trait : trait.getId().toString();
    return $RFTraitUtils.hasTrait(gear, traitId);
}

/**
 * 检查装备物品是否拥有指定类型的特质效果
 */
function fu_hasTraitEffect(gear, traitEffectType) {
    return $TraitHelper.hasTraitEffect(gear, traitEffectType);
}

/**
 * 获取玩家双手装备中指定特质的最高等级
 */
function fu_getHighestLevelEitherHand(player, trait) {
    if (!player || !player.isPlayer()) return 0;
    let traitId = typeof trait === 'string' ? trait : trait.getId().toString();
    return $RFTraitUtils.getHighestLevelEitherHand(player, traitId);
}

/**
 * 获取玩家护甲装备中指定特质的最高等级
 */
function fu_getHighestLevelArmor(player, trait) {
    if (!player || !player.isPlayer()) return 0;
    let traitId = typeof trait === 'string' ? trait : trait.getId().toString();
    return $RFTraitUtils.getHighestLevelArmor(player, traitId);
}

/**
 * 获取实体饰品装备中指定特质的最高等级
 */
function fu_getHighestLevelCurio(entity, trait) {
    let traitId = typeof trait === 'string' ? trait : trait.getId().toString();
    return $RFTraitUtils.getHighestLevelCurio(entity, traitId);
}

/**
 * 获取玩家护甲或饰品装备中指定特质的最高等级
 */
function fu_getHighestLevelArmorOrCurio(player, trait) {
    if (!player || !player.isPlayer()) return 0;
    let traitId = typeof trait === 'string' ? trait : trait.getId().toString();
    return $RFTraitUtils.getHighestLevelArmorOrCurio(player, traitId);
}

/**
 * 检查玩家双手装备中是否拥有指定特质
 */
function fu_hasTraitEitherHand(player, trait) {
    if (!player || !player.isPlayer()) return false;
    let traitId = typeof trait === 'string' ? trait : trait.getId().toString();
    return $RFTraitUtils.hasTraitEitherHand(player, traitId);
}

/**
 * 检查玩家护甲装备中是否拥有指定特质
 */
function fu_hasTraitArmor(player, trait) {
    if (!player || !player.isPlayer()) return false;
    let traitId = typeof trait === 'string' ? trait : trait.getId().toString();
    return $RFTraitUtils.hasTraitArmor(player, traitId);
}

/**
 * 获取装备的所有特质实例列表
 */
function fu_getTraits(gear) {
    return $RFTraitUtils.getTraits(gear);
}

/**
 * 通用特质检测函数 - 检查玩家是否在任意位置持有指定特质
 */
function fu_hasTraitAnywhere(player, traitId) {
    if (!player || !player.isPlayer()) return false;
    if (!traitId || typeof traitId !== 'string') return false;
    return $RFTraitUtils.hasTraitAnywhere(player, traitId);
}

/**
 * 获取原始特质等级（不含升变效果）
 */
function getOriginalTraitLevel(player, traitId) {
    if (!player || !player.isPlayer()) return 0;
    if (!traitId || typeof traitId !== 'string') return 0;
    return $RFTraitUtils.getHighestTraitLevelAnywhere(player, traitId);
}

/**
 * 仅检测主手装备是否持有特质
 */
function fu_hasTraitMainHand(player, traitId) {
    if (!player || !player.isPlayer()) return false;
    return $RFTraitUtils.hasTrait(player.getMainHandItem(), traitId);
}

/**
 * 获取主手装备特质等级
 */
function fu_getTraitLevelMainHand(player, traitId) {
    if (!player || !player.isPlayer()) return 0;
    return $RFTraitUtils.getTraitLevel(player.getMainHandItem(), traitId);
}

/**
 * 仅检测副手装备是否持有特质
 */
function fu_hasTraitOffHand(player, traitId) {
    if (!player || !player.isPlayer()) return false;
    return $RFTraitUtils.hasTrait(player.getOffhandItem(), traitId);
}

/**
 * 获取副手装备特质等级
 */
function fu_getTraitLevelOffHand(player, traitId) {
    if (!player || !player.isPlayer()) return 0;
    return $RFTraitUtils.getTraitLevel(player.getOffhandItem(), traitId);
}

/**
 * 获取玩家身上所有装备的词缀数量（去重）
 */
function fu_getUniqueTraitsCount(player) {
    if (!player || !player.isPlayer()) return 0;
    return $RFTraitUtils.getUniqueTraitsCount(player);
}

/**
 * 通用特质等级获取函数 - 获取玩家在所有位置的特质最高等级
 */
function fu_getHighestTraitLevelAnywhere(player, traitId) {
    if (!player || !player.isPlayer()) return 0;
    if (!traitId || typeof traitId !== 'string') return 0;
    return $RFTraitUtils.getHighestTraitLevelAnywhere(player, traitId);
}