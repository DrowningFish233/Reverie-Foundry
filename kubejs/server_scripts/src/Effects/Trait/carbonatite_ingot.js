ItemEvents.firstRightClicked((event) => {
    const player = event.player;
    if (!player || !player.crouching || !fu_hasTraitAnywhere(player, "kubejs:carbonatite_ingot")) return;

    const { item } = event;
    // 检查物品是否可损耗耐久
    if (!item.isDamageableItem()) return;

    const { level } = event

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
        player.tell(
            Text.translate('error.enchant.durability').color('red')  // 硬编码红色
        );
        return;
    } else {
        level.spawnParticles(
            'apothic_enchanting:enchant_water',  // arg0: 粒子类型
            true,                        // arg1: 是否强制显示
            player.x,                    // arg2: 粒子生成位置的X坐标
            player.y + 1,                // arg3: 粒子生成位置的Y坐标
            player.z,                    // arg4: 粒子生成位置的Z坐标
            0.5,                         // arg5: X方向的偏移量/扩散范围
            0.5,                         // arg6: Y方向的偏移量/扩散范围
            0.5,                         // arg7: Z方向的偏移量/扩散范围
            20,                          // arg8: 生成的粒子数量（整数）
            0.1                          // arg9: 粒子速度
        )
    }

    // 扣除耐久
    item.setDamageValue(currentDamage + durabilityCost);
    event.player.swing()

    // 应用新附魔
    $EnchantmentHelper.updateEnchantments(item, (mutable) => {
        mutable.set(randomEnchantment, newLevel);
        return mutable;
    });

    // 显示提示信息
    const enchantmentName = randomEnchantment.split(':')[1];
    const message = Text.join(
        Text.translate('message.enchant.success.prefix').color('green'),
        Text.of(durabilityCost).color('green'),
        Text.translate('message.enchant.success.middle', [
            costPercentage * 100
        ]).color('green'),
        Text.translate('enchantment.minecraft.' + enchantmentName).color('green'),
        Text.of(" " + newLevel).color('green')
    );
    player.setStatusMessage(message);

    // 更新自定义数据
    item.customData = item.customData.merge({
        "kubejs:random_enchantment": {
            id: randomEnchantment,
            level: newLevel,
            lastCost: durabilityCost
        }
    });
});