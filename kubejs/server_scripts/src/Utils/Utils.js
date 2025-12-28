//priority: 100

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