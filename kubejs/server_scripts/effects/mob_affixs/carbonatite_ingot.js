ItemEvents.firstRightClicked((event) => {
    const player = event.player;
    if (!player || !player.crouching || !player.hasEffect("kubejs:carbonatite_ingot")) return;

    const { item } = event;
    // 检查物品是否可损耗耐久
    if (!item.isDamageableItem()) return;

    // 可随机附魔列表
    const ENCHANTMENT_POOL = [
        "minecraft:smite",       // 亡灵杀手
        "minecraft:sharpness",   // 锋利
        "minecraft:knockback",   // 击退
        "minecraft:fire_aspect", // 火焰附加
        "minecraft:looting"      // 抢夺
    ];

    // 随机选择一种附魔
    const randomEnchantment = ENCHANTMENT_POOL[random.nextInt(ENCHANTMENT_POOL.length)];
    const currentLevel = item.getEnchantmentLevel(randomEnchantment) || 0;
    const newLevel = currentLevel + 1;

    const costPercentage = Math.min(0.1 * newLevel);
    const maxDurability = item.getMaxDamage();
    const durabilityCost = Math.max(1, Math.floor(maxDurability * costPercentage));
    const currentDamage = item.getDamageValue();

    // 检查耐久是否足够
    if (currentDamage + durabilityCost > maxDurability) {
        player.setStatusMessage("§c耐久不足，无法附魔！")
        return;
    }

    // 扣除耐久
    item.setDamageValue(currentDamage + durabilityCost);

    // 应用新附魔
    $EnchantmentHelper.updateEnchantments(item, (mutable) => {
        mutable.set(randomEnchantment, newLevel);
        return mutable;
    });

    // 显示提示信息
    const enchantmentName = randomEnchantment.split(':')[1];
    player.setStatusMessage(`§a消耗 ${durabilityCost} 点耐久（${costPercentage * 100}%），获得附魔：${enchantmentName} ${newLevel}`)

    // 更新自定义数据
    item.customData = item.customData.merge({
        "kubejs:random_enchantment": {
            id: randomEnchantment,
            level: newLevel,
            lastCost: durabilityCost
        }
    });
});