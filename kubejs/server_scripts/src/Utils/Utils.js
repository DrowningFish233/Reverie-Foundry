//priority: 100
// 导入Java类
/**
 * 随机移除一个负面效果
 */
function removeRandomNegativeEffect(player) {
    const negativeEffects = [];

    player.getActiveEffectsMap().forEach((holder, instance) => {
        const effect = holder.value();
        if (!effect.isBeneficial()) {
            negativeEffects.push(holder);
        }
    });

    if (negativeEffects.length > 0) {
        let randomIndex = Math.floor(Math.random() * negativeEffects.length);
        let effectToRemove = negativeEffects[randomIndex];
        player.removeEffect(effectToRemove);

    }
}
/**
 * 药水效果施加逻辑(在现有的药水效果上施加等级)
 * @param {Entity} player 玩家实体
 * @param {PotionEffectType} effect 要施加的药水效果类型
 * @param {number} level 要施加的等级
 * @param {boolean} [keepDuration] 是否保持原来的剩余时间（true:保持原时间, false:取最大值）
 * @param {number} [baseTime] (可选)基础持续时间（tick），当keepDuration为false时使用
 */
function $AddEffect(player, effect, addLevel, keepDuration, baseTime) {
    const defaultDuration = baseTime !== undefined ? baseTime : 60;

    if (player.hasEffect(effect)) {
        let existingEffect = player.getEffect(effect);
        const newLevel = existingEffect.getAmplifier() + addLevel;
        const newDuration = keepDuration
            ? existingEffect.getDuration()
            : Math.max(existingEffect.getDuration(), defaultDuration);

        player.removeEffect(effect);
        player.potionEffects.add(effect, newDuration, newLevel);
    } else {
        player.potionEffects.add(effect, defaultDuration, addLevel);
    }
}

/**
 * 检查玩家是否装备了指定的饰品
 * @param player 玩家实体
 * @param item 要检查的物品
 * @return 如果玩家装备了该饰品则返回 true
 */
function hasCurio(player, item) {
    return $ASUtils.hasCurio(player, item);
}

/**
 * 检查法术是否为长施法类型
 * @param spell 法术对象
 * @return 如果法术是长施法类型则返回 true
 */
function isLongAnimCast(spell) {
    return $ASUtils.isLongAnimCast(spell);
}

/**
 * 检查法术是否为持续施法类型
 * @param spell 法术对象
 * @return 如果法术是持续施法类型则返回 true
 */
function isContAnimCast(spell) {
    return $ASUtils.isContAnimCast(spell);
}

/**
 * 从标签获取所有法术
 * @param tag 法术标签
 * @return 包含所有匹配法术的列表
 */
function getSpellsFromTag(tag) {
    return $ASUtils.getSpellsFromTag(tag);
}

/**
 * 在圆形范围内生成粒子
 * @param count 粒子数量
 * @param radius 圆形半径
 * @param yHeight Y轴高度偏移
 * @param particleSpeed 粒子速度
 * @param entity 实体（作为粒子生成中心）
 * @param particleTypes 粒子类型
 */
function spawnParticlesInCircle(count, radius, yHeight, particleSpeed, entity, particleTypes) {
    $ASUtils.spawnParticlesInCircle(count, radius, yHeight, particleSpeed, entity, particleTypes);
}

/**
 * 在三个环形范围内生成粒子
 * @param count 每个环的粒子数量
 * @param radius1 第一个环的半径
 * @param radius2 第二个环的半径
 * @param radius3 第三个环的半径
 * @param yHeight Y轴高度偏移
 * @param particleSpeed 粒子速度
 * @param entity 实体（作为粒子生成中心）
 * @param particleTypes 粒子类型
 */
function spawnParticlesInRing(count, radius1, radius2, radius3, yHeight, particleSpeed, entity, particleTypes) {
    $ASUtils.spawnParticlesInRing(count, radius1, radius2, radius3, yHeight, particleSpeed, entity, particleTypes);
}

/**
 * 获取施法者眼睛高度
 * @param entity 实体
 * @return 实体的眼睛高度
 */
function getEyeHeight(entity) {
    return $ASUtils.getEyeHeight(entity);
}

/**
 * 检测实体是否在阳光下
 * @param level 世界/维度
 * @param entity 实体
 * @return 如果实体在阳光下则返回 true
 */
function isUnderTheSun(level, entity) {
    return $ASUtils.isUnderTheSun(level, entity);
}


function spawnComet(player, target) {
    const { level } = player;
    const cometEntity = "irons_spellbooks:comet";
    // 在目标上方生成彗星
    const cometX = target.x;
    const cometY = target.y + 5;
    const cometZ = target.z;
    // 创建彗星实体
    const comet = level.createEntity(cometEntity);
    comet.setPosition(cometX, cometY, cometZ);
    // 设置向下运动
    const velocity = 1.5;
    comet.setMotion(0.05 * velocity, -0.85 * velocity, 0);
    // 设置属性
    comet.setDamage(5);
    comet.setExplosionRadius(4.5);
    comet.setOwner(player);
    comet.spawn();
}

// 检查玩家是否在液体中
function isPlayerInFluid(player, fluidList) {
    let blockUnder = player.block;
    let blockAbove = blockUnder ? blockUnder.up : null;

    return (blockUnder && fluidList.includes(blockUnder.id.toString())) ||
        (blockAbove && fluidList.includes(blockAbove.id.toString()));
}

//查看玩家理智值
function showsanity(event, player) {
    const itemId = "kubejs:sanity_curios";
    const itemStack = getCuriosItem(player, itemId);
    if (itemStack !== null) {
        let sanity = player.persistentData.getInt("sanity");
        let maxSanity = player.persistentData.contains("max_sanity") ?
            player.persistentData.getInt("max_sanity") :
            parseInt(Text.translate('message.sanity.max').getString());
        let depravity = player.persistentData.getInt("depravity");
        let playerName = getplayerName(player.toString());

        const coloredParts = {
            player: Text.of(playerName).color('aqua'),
            sanityLabel: Text.translate('message.sanity.sanity').color('green'),
            sanityValue: Text.of(`${sanity}/${maxSanity}`).color('green'),
            depravityLabel: Text.translate('message.sanity.depravity').color('red'),
            depravityValue: Text.of(depravity).color('red')
        };

        player.setStatusMessage(
            Text.translate('message.sanity.display', [
                coloredParts.player,
                coloredParts.sanityLabel,
                coloredParts.sanityValue,
                coloredParts.depravityLabel,
                coloredParts.depravityValue
            ])
        );
    }
}

// 获取数据组件值
function getDataValue(item, componentName, defaultValue) {
    const component = $DataComponent.get(componentName);
    return item.has(component) ? item.get(component) : defaultValue;
}

// 设置数据组件值
function setDataValue(item, componentName, value) {
    const component = $DataComponent.get(componentName);
    item.set(component, value);
}


//获取玩家名称
function getplayerName(playerString) {
    const regex = /ServerPlayer\['([^']+)'/;
    const match = regex.exec(playerString);
    return match ? match[1] : "未知玩家";
}


function getRandomEnchantedBookId() {
    const enchantmentsData = {
        "enchantments": [
            {
                "id": "malum:animated",
                "maxLevel": 7,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:aqua_affinity",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "malum:ascension",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "farmersdelight:backstabbing",
                "maxLevel": 8,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:bane_of_arthropods",
                "maxLevel": 10,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:berserkers_fury",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:binding_curse",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:blast_protection",
                "maxLevel": 9,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:blood_mana_enchant",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:boon_of_the_earth",
                "maxLevel": 5,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:breach",
                "maxLevel": 8,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "malum:capacitor",
                "maxLevel": 7,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "create:capacity",
                "maxLevel": 6,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:cd_reduction_enchant",
                "maxLevel": 9,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:chainsaw",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:channeling",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:chromatic",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:crescendo_of_bolts",
                "maxLevel": 5,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:daylight_anthem_enchant",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:density",
                "maxLevel": 10,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:depth_strider",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "dungeons_arise:discharge",
                "maxLevel": 5,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:dominion_helm_enchant",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:efficiency",
                "maxLevel": 9,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:endless_quiver",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "dungeons_arise:ensnaring",
                "maxLevel": 6,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:excitatio_arcana_enchant",
                "maxLevel": 5,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "eternal_starlight:fearless",
                "maxLevel": 6,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:feather_falling",
                "maxLevel": 11,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "eternal_starlight:fertile",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:fire_aspect",
                "maxLevel": 5,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:fire_protection",
                "maxLevel": 9,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:flame",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:fortune",
                "maxLevel": 8,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:frost_walker",
                "maxLevel": 7,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "eternal_starlight:gathering",
                "maxLevel": 6,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:gentle_graveyard_keeper_enchant",
                "maxLevel": 5,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "eternal_starlight:glacial_sowing",
                "maxLevel": 6,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:growth_serum",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "malum:haunted",
                "maxLevel": 7,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "eternal_starlight:homing",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:hopeless_power_enchant",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:ice_fire_song_enchant",
                "maxLevel": 5,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:icy_thorns",
                "maxLevel": 5,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:impaling",
                "maxLevel": 10,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:infinity",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:infusion",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:knockback",
                "maxLevel": 5,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:knowledge_of_the_ages",
                "maxLevel": 3,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:life_mending",
                "maxLevel": 3,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "enderscape:lightspeed",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "dungeons_arise:lolths_curse",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:looting",
                "maxLevel": 8,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:loyalty",
                "maxLevel": 9,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:luck_of_the_sea",
                "maxLevel": 8,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:lure",
                "maxLevel": 8,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:mana_mending_enchant",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:mana_reaper_enchant",
                "maxLevel": 9,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:max_mana_enchant",
                "maxLevel": 9,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:mending",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:miners_fervor",
                "maxLevel": 5,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "terra_entity:multi_boomerang",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:multishot",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:natures_blessing",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:necrovolt_enchant",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:nether_heart_enchant",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:nocturne_aria_enchant",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:ocean_grace_enchant",
                "maxLevel": 8,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "eternal_starlight:overheat",
                "maxLevel": 6,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:party_leader_enchant",
                "maxLevel": 7,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:phase_dashed_enchant",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:piercing",
                "maxLevel": 8,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "eternal_starlight:poisoning",
                "maxLevel": 8,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "create:potato_recovery",
                "maxLevel": 6,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:power",
                "maxLevel": 9,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:power_is_power_enchant",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "eternal_starlight:precision",
                "maxLevel": 9,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:projectile_protection",
                "maxLevel": 11,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:protection",
                "maxLevel": 8,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:punch",
                "maxLevel": 5,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "dungeons_arise:purification",
                "maxLevel": 4,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:quick_charge",
                "maxLevel": 5,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "enderscape:rebound",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "malum:rebound",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:rebounding",
                "maxLevel": 5,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:red_lotus_enchant",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:reflective_defenses",
                "maxLevel": 7,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "malum:replenishing",
                "maxLevel": 7,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:respiration",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "ftboceanmobs:rift_disruptor",
                "maxLevel": 10,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:riptide",
                "maxLevel": 9,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:scavenger",
                "maxLevel": 3,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:sharpness",
                "maxLevel": 9,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:shield_bash",
                "maxLevel": 7,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:silk_touch",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:smite",
                "maxLevel": 10,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "eternal_starlight:soul_snatcher",
                "maxLevel": 5,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:soul_speed",
                "maxLevel": 7,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:spell_streak_enchant",
                "maxLevel": 9,
                "maxLootLevel": 5,
                "forcedLevelCap": -1
            },
            {
                "id": "malum:spirit_plunder",
                "maxLevel": 6,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:stable_footing",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:sweeping_edge",
                "maxLevel": 8,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:swift_sneak",
                "maxLevel": 5,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "eternal_starlight:tearing",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:tempting",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:thorns",
                "maxLevel": 5,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "eternal_starlight:tracing",
                "maxLevel": 6,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            },
            {
                "id": "enderscape:transdimensional",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:unbreaking",
                "maxLevel": 8,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:vanishing_curse",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:vlad_tepes_enchant",
                "maxLevel": 8,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "dungeons_arise:voltaic_shot",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "malum:weavers_haste",
                "maxLevel": 8,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "malum:weavers_propagation",
                "maxLevel": 8,
                "maxLootLevel": 4,
                "forcedLevelCap": -1
            },
            {
                "id": "terra_entity:whip_sweep",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "minecraft:wind_burst",
                "maxLevel": 8,
                "maxLootLevel": 3,
                "forcedLevelCap": -1
            },
            {
                "id": "apothic_enchanting:worker_exploitation",
                "maxLevel": 1,
                "maxLootLevel": 1,
                "forcedLevelCap": -1
            },
            {
                "id": "majospellenchantment:zoophony_enchant",
                "maxLevel": 7,
                "maxLootLevel": 2,
                "forcedLevelCap": -1
            }
        ]
    };
    const Enchantments = enchantmentsData.enchantments.map(e => e.id);

    const randomIndex = Math.floor(Math.random() * Enchantments.length);
    const randomEnchantmentId = Enchantments[randomIndex];

    const enchantmentConfig = enchantmentsData.enchantments.find(e => e.id === randomEnchantmentId);

    const maxLevel = enchantmentConfig.forcedLevelCap > 0 ?
        Math.min(enchantmentConfig.forcedLevelCap, enchantmentConfig.maxLevel) :
        enchantmentConfig.maxLevel;

    const randomLevel = Math.floor(Math.random() * maxLevel) + 1;

    return `minecraft:enchanted_book[stored_enchantments={levels:{"${randomEnchantmentId}":${randomLevel}}}]`;
}

/**
 * 召唤生物函数
 * 
 * 为什么不让我走createEntity，呜，苦露西
 * 
 * @param {integer} interval 执行前的等待时间（单位：Tick）
 * @param {ItemEntity} entity 被抛出的物品实体
 * @param {string} mobId 要召唤的生物ID
 * @param {string} sound 播放的音效
 */
function summonMob(interval, entity, mobId, sound) {
    // 设置拾取延迟，防止在此过程中物品被捡起
    entity.setPickUpDelay(interval * 2);

    entity.server.scheduleInTicks(interval, () => {
        // 如果物品实体已不存在，则终止执行
        if (!entity || !entity.isAlive()) return;

        let { level } = entity;

        try {
            let pos = entity.position();

            let mob = $TEUtils.spawnEntity(mobId, level, pos);

            if (!mob) return;

            // 播放音效
            if (sound) {
                level[$playersound](
                    null,
                    pos.x,
                    pos.y,
                    pos.z,
                    sound,
                    "players",
                    0.6,
                    0.8
                );
            }

            entity.item.count--;

            if (entity.item.count <= 0) {
                entity.discard();
            }

        } catch (error) {
            console.error(`召唤生物时出错: ${error}`);
        }
    });
}

/**
 * @param {integer} interval 执行前的等待时间（单位：Tick）
 * @param {ItemEntity} entity 被抛出的物品实体
 * @param {string} mobId 要召唤的生物ID
 * @param {string} sound 播放的音效
 * @param {allowedDimensions} dimensions 需要的维度
 */

function summonMobWithDimensions(interval, entity, mobId, sound, allowedDimensions) {
    entity.setPickUpDelay(interval * 2)
    entity.server.scheduleInTicks(interval, () => {
        if (!entity || !entity.isAlive())
            return

        let { level } = entity
        let dimensionId = level.dimension.toString()

        // 使用传入的允许维度列表，如果没传则默认主世界
        let dimensions = allowedDimensions || [
            'minecraft:overworld'
        ]

        let pos = {
            x: entity.getX(),
            y: entity.getY(),
            z: entity.getZ()
        };

        if (!dimensions.includes(dimensionId)) {
            entity.discard()
            playRandomFailSound(level, pos)
            return
        }

        try {
            let pos = entity.position();

            let mob = $TEUtils.spawnEntity(mobId, level, pos);

            if (!mob) return;

            // 播放音效
            if (sound) {
                level[$playersound](
                    null,
                    pos.x,
                    pos.y,
                    pos.z,
                    sound,
                    "players",
                    0.6,
                    0.8
                );
            }

            entity.item.count--;

            if (entity.item.count <= 0) {
                entity.discard();
            }

        } catch (error) {
            console.error(`召唤生物时出错: ${error}`);
        }
    })
}


/**
 * 在特定结构内召唤生物函数
 * @param {integer} interval 执行前的等待时间（单位：Tick）
 * @param {ItemEntity} entity 被抛出的物品实体
 * @param {string} mobId 要召唤的生物ID
 * @param {string} sound 播放的音效
 * @param {string|string[]} requiredStructures 需要的结构ID或ID数组
 */
function summonMobInStructure(interval, entity, mobId, sound, requiredStructures) {
    entity.setPickUpDelay(interval * 2);

    entity.server.scheduleInTicks(interval, () => {
        if (!entity || !entity.isAlive()) return;

        let { level } = entity;
        let pos = entity.position();

        try {
            if (!isInRequiredStructure(level, pos, requiredStructures)) {
                playRandomFailSound(level, pos);
                entity.discard();
                return;
            }

            let mob = $TEUtils.spawnEntity(mobId, level, pos);

            if (!mob) return;

            if (sound) {
                level[$playersound](
                    null,
                    pos.x,
                    pos.y,
                    pos.z,
                    sound,
                    "players",
                    0.6,
                    0.8
                );
            }

            entity.item.count--;

            if (entity.item.count <= 0) {
                entity.discard();
            }

        } catch (error) {
            console.error(`召唤生物时出错: ${error}`);
        }
    });
}

/**
 * 检查位置是否在指定结构内
 * @param {Level} level 世界
 * @param {Vec3d} position 要检查的位置
 * @param {string|string[]} requiredStructures 需要的结构ID或ID数组
 * @returns {boolean} 是否在指定结构内
 */
function isInRequiredStructure(level, position, requiredStructures) {
    let structures = Array.isArray(requiredStructures) ? requiredStructures : [requiredStructures];

    try {
        let chunkX = Math.floor(position.x / 16);
        let chunkZ = Math.floor(position.z / 16);
        let chunkPos = $ChunkPos(chunkX, chunkZ);

        let structureStarts = level.structureManager().startsForStructure(chunkPos, () => true);

        if (structureStarts) {
            for (let structureStart of structureStarts) {
                try {
                    // 获取结构ID
                    let structure = structureStart.getStructure();
                    let structureRegistry = Registry.of("worldgen/structure");

                    if (structureRegistry && structure) {
                        let structureKey = structureRegistry.getKey(structure);

                        if (structureKey) {
                            let structureId = structureKey.location();
                            let structureIdStr = structureId.toString();

                            // 检查位置是否在结构边界内
                            let boundingBox = structureStart.getBoundingBox();
                            if (boundingBox) {
                                let isInside = boundingBox.isInside(position.x, position.y, position.z);
                                let isRequired = structures.includes(structureIdStr);

                                if (isInside && isRequired) {
                                    return true;
                                }
                            }
                        }
                    }
                } catch (e) {
                }
            }
        }

    } catch (error) {
        console.error(`结构检查出错: ${error}`);
    }

    return false;
}
/**
 * 播放随机失败音效
 * @param {Level} level 世界
 * @param {Object} pos 位置坐标 {x, y, z}
 */
function playRandomFailSound(level, pos) {
    // 失败音效列表
    const failSounds = [
        'malum:totemic_rite_cancelled',
        'malum:blight_propagates',
        'malum:totemic_growth',
    ]

    // 随机选择音效
    const randomIndex = Math.floor(Math.random() * failSounds.length)
    const failSound = failSounds[randomIndex]

    // 播放音效
    level[$playersound](
        null,
        pos.x,
        pos.y,
        pos.z,
        failSound,
        "players",
        0.6,
        0.8
    )
}

function getRandomScrollId() {
    const spellsData = {
        "spells": [
            { "id": "irons_spellbooks:fire_breath", "maxLevel": 10 },
            { "id": "irons_spellbooks:magma_bomb", "maxLevel": 8 },
            { "id": "irons_spellbooks:blaze_storm", "maxLevel": 10 },
            { "id": "irons_spellbooks:firebolt", "maxLevel": 10 },
            { "id": "irons_spellbooks:flaming_barrage", "maxLevel": 5 },
            { "id": "irons_spellbooks:flaming_strike", "maxLevel": 5 },
            { "id": "gametechbcs_spellbooks:meteor_storm", "maxLevel": 6 },
            { "id": "irons_spellbooks:fireball", "maxLevel": 5 },
            { "id": "irons_spellbooks:heat_surge", "maxLevel": 8 },
            { "id": "irons_spellbooks:wall_of_fire", "maxLevel": 5 },
            { "id": "irons_spellbooks:scorch", "maxLevel": 10 },
            { "id": "irons_spellbooks:fire_arrow", "maxLevel": 10 },
            { "id": "irons_spellbooks:burning_dash", "maxLevel": 10 },
            { "id": "gametechbcs_spellbooks:flames_reborn", "maxLevel": 3 },
            { "id": "irons_spellbooks:raise_hell", "maxLevel": 5 },

            { "id": "irons_spellbooks:poison_arrow", "maxLevel": 10 },
            { "id": "irons_spellbooks:touch_dig", "maxLevel": 3 },
            { "id": "irons_spellbooks:root", "maxLevel": 10 },
            { "id": "gametechbcs_spellbooks:acid_rain", "maxLevel": 3 },
            { "id": "irons_spellbooks:blight", "maxLevel": 8 },
            { "id": "irons_spellbooks:acid_orb", "maxLevel": 10 },
            { "id": "irons_spellbooks:poison_breath", "maxLevel": 10 },
            { "id": "gametechbcs_spellbooks:ensnare", "maxLevel": 5 },
            { "id": "irons_spellbooks:earthquake", "maxLevel": 10 },
            { "id": "irons_spellbooks:poison_splash", "maxLevel": 10 },
            { "id": "irons_spellbooks:oakskin", "maxLevel": 8 },
            { "id": "irons_spellbooks:spider_aspect", "maxLevel": 8 },
            { "id": "irons_spellbooks:firefly_swarm", "maxLevel": 10 },
            { "id": "irons_spellbooks:stomp", "maxLevel": 5 },
            { "id": "irons_spellbooks:gluttony", "maxLevel": 5 },

            { "id": "irons_spellbooks:gust", "maxLevel": 10 },
            { "id": "irons_spellbooks:invisibility", "maxLevel": 6 },
            { "id": "irons_spellbooks:summon_vex", "maxLevel": 5 },
            { "id": "irons_spellbooks:wololo", "maxLevel": 1 },
            { "id": "irons_spellbooks:spectral_hammer", "maxLevel": 5 },
            { "id": "gametechbcs_spellbooks:lingering_strain", "maxLevel": 3 },
            { "id": "irons_spellbooks:arrow_volley", "maxLevel": 6 },
            { "id": "irons_spellbooks:fang_ward", "maxLevel": 8 },
            { "id": "irons_spellbooks:fang_strike", "maxLevel": 10 },
            { "id": "irons_spellbooks:chain_creeper", "maxLevel": 6 },
            { "id": "irons_spellbooks:lob_creeper", "maxLevel": 10 },
            { "id": "gametechbcs_spellbooks:ashen_breath", "maxLevel": 10 },
            { "id": "irons_spellbooks:shield", "maxLevel": 10 },
            { "id": "irons_spellbooks:summon_horse", "maxLevel": 5 },
            { "id": "irons_spellbooks:slow", "maxLevel": 4 },
            { "id": "irons_spellbooks:firecracker", "maxLevel": 10 },
            { "id": "irons_spellbooks:throw", "maxLevel": 5 },

            { "id": "gametechbcs_spellbooks:astral_sense", "maxLevel": 3 },
            { "id": "irons_spellbooks:evasion", "maxLevel": 5 },
            { "id": "irons_spellbooks:recall", "maxLevel": 1 },
            { "id": "irons_spellbooks:magic_arrow", "maxLevel": 10 },
            { "id": "irons_spellbooks:teleport", "maxLevel": 5 },
            { "id": "gametechbcs_spellbooks:displacement", "maxLevel": 3 },
            { "id": "irons_spellbooks:echoing_strikes", "maxLevel": 5 },
            { "id": "irons_spellbooks:summon_swords", "maxLevel": 5 },
            { "id": "irons_spellbooks:portal", "maxLevel": 3 },
            { "id": "irons_spellbooks:black_hole", "maxLevel": 6 },
            { "id": "irons_spellbooks:magic_missile", "maxLevel": 10 },
            { "id": "irons_spellbooks:summon_ender_chest", "maxLevel": 1 },
            { "id": "irons_spellbooks:dragon_breath", "maxLevel": 10 },
            { "id": "irons_spellbooks:counterspell", "maxLevel": 1 },
            { "id": "irons_spellbooks:starfall", "maxLevel": 10 },
            { "id": "irons_spellbooks:shadow_slash", "maxLevel": 5 },

            { "id": "irons_spellbooks:frostbite", "maxLevel": 5 },
            { "id": "gametechbcs_spellbooks:shatterpoint", "maxLevel": 5 },
            { "id": "irons_spellbooks:ray_of_frost", "maxLevel": 5 },
            { "id": "irons_spellbooks:cone_of_cold", "maxLevel": 10 },
            { "id": "irons_spellbooks:frostwave", "maxLevel": 8 },
            { "id": "irons_spellbooks:summon_polar_bear", "maxLevel": 10 },
            { "id": "irons_spellbooks:icicle", "maxLevel": 10 },
            { "id": "irons_spellbooks:ice_tomb", "maxLevel": 8 },
            { "id": "irons_spellbooks:ice_spikes", "maxLevel": 10 },
            { "id": "irons_spellbooks:ice_block", "maxLevel": 6 },
            { "id": "irons_spellbooks:frost_step", "maxLevel": 8 },
            { "id": "irons_spellbooks:snowball", "maxLevel": 5 },

            { "id": "irons_spellbooks:healing_circle", "maxLevel": 10 },
            { "id": "irons_spellbooks:blessing_of_life", "maxLevel": 10 },
            { "id": "irons_spellbooks:cleanse", "maxLevel": 1 },
            { "id": "irons_spellbooks:sunbeam", "maxLevel": 10 },
            { "id": "irons_spellbooks:heal", "maxLevel": 8 },
            { "id": "irons_spellbooks:wisp", "maxLevel": 10 },
            { "id": "irons_spellbooks:divine_smite", "maxLevel": 5 },
            { "id": "irons_spellbooks:greater_heal", "maxLevel": 1 },
            { "id": "gametechbcs_spellbooks:nullflare", "maxLevel": 5 },
            { "id": "irons_spellbooks:angel_wing", "maxLevel": 5 },
            { "id": "irons_spellbooks:fortify", "maxLevel": 10 },
            { "id": "gametechbcs_spellbooks:banish", "maxLevel": 3 },
            { "id": "irons_spellbooks:guiding_bolt", "maxLevel": 10 },
            { "id": "irons_spellbooks:haste", "maxLevel": 4 },
            { "id": "irons_spellbooks:cloud_of_regeneration", "maxLevel": 5 },

            { "id": "gametechbcs_spellbooks:crimson_downpour", "maxLevel": 3 },
            { "id": "irons_spellbooks:raise_dead", "maxLevel": 6 },
            { "id": "irons_spellbooks:blood_slash", "maxLevel": 5 },
            { "id": "irons_spellbooks:blood_step", "maxLevel": 5 },
            { "id": "irons_spellbooks:acupuncture", "maxLevel": 10 },
            { "id": "irons_spellbooks:blood_needles", "maxLevel": 10 },
            { "id": "irons_spellbooks:sacrifice", "maxLevel": 5 },
            { "id": "irons_spellbooks:devour", "maxLevel": 10 },
            { "id": "gametechbcs_spellbooks:call_forth_the_dead_king", "maxLevel": 1 },
            { "id": "irons_spellbooks:ray_of_siphoning", "maxLevel": 10 },
            { "id": "irons_spellbooks:heartstop", "maxLevel": 10 },
            { "id": "irons_spellbooks:wither_skull", "maxLevel": 10 },

            { "id": "irons_spellbooks:ascension", "maxLevel": 10 },
            { "id": "irons_spellbooks:shockwave", "maxLevel": 8 },
            { "id": "irons_spellbooks:electrocute", "maxLevel": 10 },
            { "id": "irons_spellbooks:lightning_bolt", "maxLevel": 10 },
            { "id": "irons_spellbooks:ball_lightning", "maxLevel": 10 },
            { "id": "irons_spellbooks:chain_lightning", "maxLevel": 10 },
            { "id": "irons_spellbooks:thunder_step", "maxLevel": 5 },
            { "id": "irons_spellbooks:thunderstorm", "maxLevel": 8 },
            { "id": "irons_spellbooks:lightning_lance", "maxLevel": 10 },
            { "id": "irons_spellbooks:charge", "maxLevel": 3 },
            { "id": "irons_spellbooks:volt_strike", "maxLevel": 10 },

            { "id": "kubejs:gold_body", "maxLevel": 8 },
            { "id": "kubejs:one_six_seven_four", "maxLevel": 5 },
            { "id": "kubejs:rune_of_deflection", "maxLevel": 4 },
            { "id": "kubejs:clear_cooldown", "maxLevel": 3 },
            { "id": "kubejs:fire_arrow", "maxLevel": 5 },
            { "id": "kubejs:explosion", "maxLevel": 3 },
            { "id": "kubejs:eternal_life_spell", "maxLevel": 3 },
            { "id": "kubejs:demon_conch", "maxLevel": 8 },
            { "id": "kubejs:phantom_pain", "maxLevel": 5 },
            { "id": "kubejs:plunder_spell", "maxLevel": 4 }
        ]
    };

    const randomSpellIndex = Math.floor(Math.random() * spellsData.spells.length);
    const randomSpell = spellsData.spells[randomSpellIndex];

    const randomLevel = Math.floor(Math.random() * randomSpell.maxLevel) + 1;

    const scrollId = `irons_spellbooks: scroll[irons_spellbooks: spell_container = { data: [{ id: "${randomSpell.id}", index: 0, level: ${randomLevel}, locked: 1b}], maxSpells: 1, mustEquip: 0b, spellWheel: 0b
    }]`;

    return scrollId;
}


/**
 * 获取食物的饱食度
 * @param {Internal.ItemStack} item - 物品堆栈
 * @param {Internal.Player} player - 玩家对象（用于上下文判断）
 * @returns {number} 食物的营养值（饱食度）
 */
function getFoodNutrition(item, player) {
    const foodProperties = item.getItem().getFoodProperties(item, player);
    return foodProperties ? foodProperties.nutrition() : 0;
}

/**
 * 获取食物的饱和度
 * @param {Internal.ItemStack} item - 物品堆栈
 * @param {Internal.Player} player - 玩家对象
 * @returns {number} 食物的饱和度值
 */
function getFoodSaturation(item, player) {
    const foodProperties = item.getItem().getFoodProperties(item, player);
    return foodProperties ? foodProperties.saturation() : 0;
}

/**
 * 获取食物的完整属性信息
 * @param {Internal.ItemStack} item - 物品堆栈
 * @param {Internal.Player} player - 玩家对象
 * @returns {Object|null} 包含食物属性的对象，如果不是食物则返回 null
 */
function getFoodInfo(item, player) {
    const foodProperties = item.getItem().getFoodProperties(item, player);
    if (!foodProperties) return null;

    return {
        nutrition: foodProperties.nutrition(),
        saturation: foodProperties.saturation(),
    };
}

/**
 * 攻击实体
 * @param {$LivingEntity_} target - 目标实体
 * @param {string} damageSourceId - 伤害类型
 * @param {number} amount - 伤害值
 * @param {boolean} ignoreInvulnerable - 是否忽略无敌帧
 */
function attackEntity(target, damageSourceId, amount, ignoreInvulnerable) {
    if (!target || amount <= 0) return;
    if (ignoreInvulnerable) {
        const originalTime = target.invulnerableTime;
        target.invulnerableTime = 0;
        target.attack($DamageSource(damageSourceId), amount);
        if (originalTime > 0) {
            target.invulnerableTime = Math.max(originalTime, 10);
        }
    } else {
        target.attack($DamageSource(damageSourceId), amount);
    }
}


// 射线检测函数
function RayCasting(start, end, aabb) {
    const dirX = end.x - start.x;
    const dirY = end.y - start.y;
    const dirZ = end.z - start.z;

    const invDirX = 1.0 / dirX;
    const invDirY = 1.0 / dirY;
    const invDirZ = 1.0 / dirZ;

    // 计算射线参数t在每轴上的进出点
    let tMin, tMax;

    if (invDirX >= 0) {
        tMin = (aabb.minX - start.x) * invDirX;
        tMax = (aabb.maxX - start.x) * invDirX;
    } else {
        tMin = (aabb.maxX - start.x) * invDirX;
        tMax = (aabb.minX - start.x) * invDirX;
    }

    let tyMin, tyMax;
    if (invDirY >= 0) {
        tyMin = (aabb.minY - start.y) * invDirY;
        tyMax = (aabb.maxY - start.y) * invDirY;
    } else {
        tyMin = (aabb.maxY - start.y) * invDirY;
        tyMax = (aabb.minY - start.y) * invDirY;
    }

    if (tMin > tyMax || tyMin > tMax) return false;

    // 更新tMin/tMax
    if (tyMin > tMin) tMin = tyMin;
    if (tyMax < tMax) tMax = tyMax;

    let tzMin, tzMax;
    if (invDirZ >= 0) {
        tzMin = (aabb.minZ - start.z) * invDirZ;
        tzMax = (aabb.maxZ - start.z) * invDirZ;
    } else {
        tzMin = (aabb.maxZ - start.z) * invDirZ;
        tzMax = (aabb.minZ - start.z) * invDirZ;
    }

    if (tMin > tzMax || tzMin > tMax) return false;

    // 更新tMin/tMax
    if (tzMin > tMin) tMin = tzMin;
    if (tzMax < tMax) tMax = tzMax;

    return tMax >= 0 && tMin <= 1 && tMin <= tMax;
}

/**
 * 
 * @param {integer} interval 执行前的等待时间（单位：Tick）
 * @param {ItemEntity} entity 被抛出的物品实体
 * @param {ItemStack} mainHand 主手物品（可选）
 * @param {ItemStack} helmet 头盔（可选）
 * @param {ItemStack} chestplate 胸甲（可选）
 * @param {ItemStack} leggings 护腿（可选）
 * @param {ItemStack} boots 靴子（可选）
 * @param {string} sound 播放的音效（可选）
 */
function summonDarkDoppelganger(interval, entity, mainHand, helmet, chestplate, leggings, boots, sound) {
    if (!entity || !entity.isAlive()) return;

    entity.setPickUpDelay(interval * 2);

    entity.server.scheduleInTicks(interval, () => {
        if (!entity || !entity.isAlive()) return;

        let level = entity.level;

        try {
            let nearestPlayer = level.getNearestPlayer(entity, 32.0);
            if (!nearestPlayer) {
                entity.discard();
                return;
            }

            let player = nearestPlayer;
            let spawnPos = entity.position();

            let boss = null;

            if (mainHand || helmet || chestplate || leggings || boots) {
                boss = $ShadowOrbItem.summonDoppelgangerWithCustomEquipment(
                    level,
                    spawnPos,
                    player,
                    mainHand || ItemStack.EMPTY,
                    helmet || ItemStack.EMPTY,
                    chestplate || ItemStack.EMPTY,
                    leggings || ItemStack.EMPTY,
                    boots || ItemStack.EMPTY
                );
            } else {
                boss = $ShadowOrbItem.summonDoppelgangerAt(level, spawnPos, player);
            }

            if (boss) {
                if (sound) {
                    level[$playersound](
                        null,
                        spawnPos.x,
                        spawnPos.y,
                        spawnPos.z,
                        sound,
                        "hostile",
                        1.0,
                        1.0
                    );
                }

                entity.item.count--;

                if (entity.item.count <= 0) {
                    entity.discard();
                }
            } else {
                entity.discard();
            }

        } catch (error) {
            entity.discard();
        }
    });
}