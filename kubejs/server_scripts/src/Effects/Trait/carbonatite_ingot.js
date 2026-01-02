ItemEvents.firstRightClicked((event) => {
    const player = event.player;
    if (!player || !player.crouching || !fu_hasTraitAnywhere(player, "kubejs:carbonatite_ingot")) return;

    const { item } = event;
    // 检查物品是否可损耗耐久
    if (!item.isDamageableItem()) return;
    const trait_level = fu_getHighestTraitLevelAnywhere(player, "kubejs:carbonatite_ingot")
    let enchantment_count = getDataValue(item, "add_enchantment_count") || 0;
    if (enchantment_count >= trait_level * 6) return
    const { level } = event

    // 可随机附魔列表
    const ENCHANTMENT_POOL = [
        "malum:animated",
        "minecraft:aqua_affinity",
        "malum:ascension",
        "farmersdelight:backstabbing",
        "minecraft:bane_of_arthropods",
        "minecraft:binding_curse",
        "minecraft:blast_protection",
        "majospellenchantment:blood_mana_enchant",
        "apothic_enchanting:boon_of_the_earth",
        "minecraft:breach",
        "malum:capacitor",
        "create:capacity",
        "majospellenchantment:cd_reduction_enchant",
        "apothic_enchanting:chainsaw",
        "minecraft:channeling",
        "apothic_enchanting:chromatic",
        "apothic_enchanting:crescendo_of_bolts",
        "majospellenchantment:daylight_anthem_enchant",
        "minecraft:density",
        "minecraft:depth_strider",
        "dungeons_arise:discharge",
        "majospellenchantment:dominion_helm_enchant",
        "minecraft:efficiency",
        "apothic_enchanting:endless_quiver",
        "dungeons_arise:ensnaring",
        "majospellenchantment:excitatio_arcana_enchant",
        "eternal_starlight:fearless",
        "minecraft:feather_falling",
        "eternal_starlight:fertile",
        "minecraft:fire_aspect",
        "minecraft:fire_protection",
        "minecraft:flame",
        "minecraft:fortune",
        "minecraft:frost_walker",
        "eternal_starlight:gathering",
        "majospellenchantment:gentle_graveyard_keeper_enchant",
        "eternal_starlight:glacial_sowing",
        "apothic_enchanting:growth_serum",
        "malum:haunted",
        "eternal_starlight:homing",
        "majospellenchantment:hopeless_power_enchant",
        "majospellenchantment:ice_fire_song_enchant",
        "apothic_enchanting:icy_thorns",
        "minecraft:impaling",
        "minecraft:infinity",
        "apothic_enchanting:infusion",
        "minecraft:knockback",
        "apothic_enchanting:knowledge_of_the_ages",
        "apothic_enchanting:life_mending",
        "enderscape:lightspeed",
        "dungeons_arise:lolths_curse",
        "minecraft:looting",
        "minecraft:loyalty",
        "minecraft:luck_of_the_sea",
        "minecraft:lure",
        "majospellenchantment:mana_mending_enchant",
        "majospellenchantment:mana_reaper_enchant",
        "majospellenchantment:max_mana_enchant",
        "minecraft:mending",
        "apothic_enchanting:miners_fervor",
        "terra_entity:multi_boomerang",
        "minecraft:multishot",
        "apothic_enchanting:natures_blessing",
        "majospellenchantment:necrovolt_enchant",
        "majospellenchantment:nether_heart_enchant",
        "majospellenchantment:nocturne_aria_enchant",
        "majospellenchantment:ocean_grace_enchant",
        "eternal_starlight:overheat",
        "majospellenchantment:party_leader_enchant",
        "majospellenchantment:phase_dashed_enchant",
        "minecraft:piercing",
        "eternal_starlight:poisoning",
        "create:potato_recovery",
        "minecraft:power",
        "majospellenchantment:power_is_power_enchant",
        "eternal_starlight:precision",
        "minecraft:projectile_protection",
        "minecraft:protection",
        "minecraft:punch",
        "dungeons_arise:purification",
        "minecraft:quick_charge",
        "enderscape:rebound",
        "malum:rebound",
        "apothic_enchanting:rebounding",
        "majospellenchantment:red_lotus_enchant",
        "apothic_enchanting:reflective_defenses",
        "malum:replenishing",
        "minecraft:respiration",
        "ftboceanmobs:rift_disruptor",
        "minecraft:riptide",
        "apothic_enchanting:scavenger",
        "minecraft:sharpness",
        "apothic_enchanting:shield_bash",
        "minecraft:silk_touch",
        "minecraft:smite",
        "eternal_starlight:soul_snatcher",
        "minecraft:soul_speed",
        "majospellenchantment:spell_streak_enchant",
        "malum:spirit_plunder",
        "apothic_enchanting:stable_footing",
        "minecraft:sweeping_edge",
        "minecraft:swift_sneak",
        "eternal_starlight:tearing",
        "apothic_enchanting:tempting",
        "minecraft:thorns",
        "eternal_starlight:tracing",
        "enderscape:transdimensional",
        "minecraft:unbreaking",
        "minecraft:vanishing_curse",
        "majospellenchantment:vlad_tepes_enchant",
        "dungeons_arise:voltaic_shot",
        "malum:weavers_haste",
        "malum:weavers_propagation",
        "terra_entity:whip_sweep",
        "minecraft:wind_burst",
        "apothic_enchanting:worker_exploitation",
        "majospellenchantment:zoophony_enchant"
    ];

    // 随机选择一种附魔
    const randomEnchantment = ENCHANTMENT_POOL[Math.floor(Math.random() * ENCHANTMENT_POOL.length)];
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
    enchantment_count++
    setDataValue(item, "add_enchantment_count", enchantment_count)

    // 显示提示信息
    // 解析魔咒的namespace和path
    const [namespace, enchantmentName] = randomEnchantment.split(':');

    // 根据不同的namespace使用不同的翻译key
    let translationKey;
    if (namespace === "minecraft") {
        translationKey = "enchantment.minecraft." + enchantmentName;
    } else {
        translationKey = "enchantment." + namespace + "." + enchantmentName;
    }

    const message = Text.join(
        Text.translate('message.enchant.success.prefix').color('green'),
        Text.of(durabilityCost).color('green'),
        Text.translate('message.enchant.success.middle', [
            (costPercentage * 100).toFixed(0)
        ]).color('green'),
        Text.translate(translationKey).color('green'),
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