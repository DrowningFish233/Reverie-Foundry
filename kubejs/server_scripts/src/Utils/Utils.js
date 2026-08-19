//priority: 100

//是否是晚上
function isNight(level) {
    let timeOfDay = level.getDayTime() % 24000;
    return timeOfDay > 13000 && timeOfDay < 23000;
}

/**
 * 随机移除一个负面效果
 */
function removeRandomNegativeEffect(player) {
    let BLACKLIST = [
        "malum:wyrd_exhaustion",
        "cataclysm:ghost_sickness"
    ];

    let negativeEffects = [];

    player.getActiveEffectsMap().forEach((holder, instance) => {
        let effect = holder.value();

        let effectId = holder.getKey().location().toString();

        if (!effect.isBeneficial() && !BLACKLIST.includes(effectId)) {
            negativeEffects.push(holder);
        }
    });

    if (negativeEffects.length > 0) {
        let randomIndex = Math.floor(Math.random() * negativeEffects.length);
        let effectToRemove = negativeEffects[randomIndex];
        player.removeEffect(effectToRemove);
        return true;
    }
    return false;
}

//释放月刺
function createThorn(level, owner, x, y, z, yRot, maxDiff, delay, AttackMode) {
    let startPos = $BlockPos.containing(x, y, z)
    let successful = false
    let finalY = y

    if (level.getBlockState(startPos).isAir()) {
        let result = level.clip(new $ClipContext(
            startPos.getCenter(),
            startPos.getCenter().add(0, -maxDiff, 0),
            $ClipContext.Block.COLLIDER,
            $ClipContext.Fluid.NONE,
            owner
        ))
        if (result.getType() != $HitResult.Type.MISS) {
            finalY = result.getLocation().y
            successful = true
        }
    } else {
        let currentDiff = 0
        while (!level.getBlockState(startPos).isAir() && currentDiff < maxDiff) {
            startPos = startPos.above()
            currentDiff++
        }
        if (level.getBlockState(startPos).isAir()) {
            let result = level.clip(new $ClipContext(
                startPos.getCenter(),
                startPos.getCenter().add(0, -maxDiff, 0),
                $ClipContext.Block.COLLIDER,
                $ClipContext.Fluid.NONE,
                owner
            ))
            if (result.getType() != $HitResult.Type.MISS) {
                finalY = result.getLocation().y
                successful = true
            }
        }
    }

    if (successful) {
        let thorn = new $LunarThorn($ESEntities.LUNAR_THORN.get(), level)
        thorn.setPos(x, finalY, z)
        thorn.setOwner(owner)
        thorn.setSpawnedTicks(-delay)
        thorn.setAttackMode(AttackMode)
        level.addFreshEntity(thorn)
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

        // 构建颜色部分（保持你的原始写法）
        const coloredParts = {
            player: Text.of(playerName).color('aqua'),
            sanityLabel: Text.translate('message.sanity.sanity').color('green'),
            sanityValue: Text.of(`${sanity}/${maxSanity}`).color('green'),
            depravityLabel: Text.translate('message.sanity.depravity').color('red'),
            depravityValue: Text.of(depravity).color('red')
        };

        if (typeof EmbersText !== 'undefined' && EmbersText.markup) {
            let fullMessage =
                `<color color=aqua>${getplayerName(player.toString())}</color>` +
                ` | ` +
                `<color color=green>${Text.translate('message.sanity.sanity').getString()} ${sanity}/${maxSanity}</color>` +
                ` | ` +
                `<color color=red>${Text.translate('message.sanity.depravity').getString()} ${depravity}</color>`;

            fullMessage = `<shake amplitude=0.8 frequency=1.5>${fullMessage}</shake>`;

            let message = EmbersText.markup(60, fullMessage)
                .anchor('MIDDLE')
                .scale(1.2)
                .fadeInTicks(3)
                .fadeOutTicks(5)
                .shadow(true);

            EmbersText.send(player, message);
        } else {
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
    return $RFUtils.getRandomScrollId();
}


function getRandomScrollIdBySchool(schoolId) {
    return $RFUtils.getRandomScrollIdBySchool(schoolId);
}

/**
 * 获取食物的饱食度
 * @param {Internal.ItemStack} item - 物品堆栈
 * @param {Internal.Player} player - 玩家对象
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


function getRandomWeapon() {
    const WEAPONS = [
        'hazennstuff:obsidian_claymore',
        'hazennstuff:vampire_knives',
        'hazennstuff:bountiful_harvest',
        'hazennstuff:skyscorcher',
        'hazennstuff:war_flaming_lance',
        'hazennstuff:ravens_bane',
        'hazennstuff:draconic_splitter',
        'hazennstuff:firebrand',
        'hazennstuff:fireblossom_rapier',
        'hazennstuff:legionnaire_warlock_axe',
        'hazennstuff:dawnmaker',
        'hazennstuff:excalibur',
        'hazennstuff:hammer_of_justice',
        'hazennstuff:malice',
        'hazennstuff:provocation_dormant',
        'hazennstuff:coralite_cane',
        'hazennstuff:insania_aeternus',
        'hazennstuff:true_nights_edge'
    ];

    let randomIndex = Math.floor(Math.random() * WEAPONS.length);
    return Item.of(WEAPONS[randomIndex]);
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

            let boss = $ShadowOrbItem.summonDoppelgangerWithCustomEquipment(
                level,
                spawnPos,
                player,
                mainHand || getRandomWeapon(),
                helmet || Item.of('allthewizardgear:unobtainium_mage_helmet'),
                chestplate || Item.of('allthewizardgear:unobtainium_mage_chestplate'),
                leggings || Item.of('allthewizardgear:unobtainium_mage_leggings'),
                boots || Item.of('allthewizardgear:unobtainium_mage_boots')
            );

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

//用于伪造event获得补全用：
/**
 * 物品左键点击事件
 * @param {$ItemClickedKubeEvent_} event - 物品左键点击事件
 */
function RFLeftClick(event) { }

/**
 * 物品右键点击事件
 * @param {$ItemClickedKubeEvent_} event - 物品右键点击事件
 */
function RFRightClick(event) { }

/**
 * 实体死亡事件
 * @param {$LivingEntityDeathKubeEvent_} event - 实体死亡事件
 */
function RFDeath(event) { }

/**
 * @param {$SimplePlayerKubeEvent_} event
 */
function RFTick(event) { }

/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event
 */
function RFBeforeHurt(event) { }

/**
 * @param {$AfterLivingEntityHurtKubeEvent_} event
 */
function RFAfterHurt(event) { }

/**
 * 方块破坏事件
 * @param {$BlockBrokenKubeEvent_} event
 */
function RFBlockBroken(event) { }

//如果持有两种效果中的任意一种，则阻止执行
function is_Magical_Girl(event, player) {
    if (!player) return
    if (fu_hasTraitAnywhere(player, "kubejs:lacrima") && fu_hasTraitAnywhere(player, "kubejs:fiery_tears")) {
        return true;
    }
    return false;
}

function spawnParticles_witch(entity, player) {
    let entityX = entity.x
    let entityY = entity.y
    let entityZ = entity.z

    let height = Math.random() * 2
    let offsetX = (Math.random() - 0.5) * 1.2
    let offsetZ = (Math.random() - 0.5) * 1.2

    player.level.spawnParticles(
        'minecraft:witch',          // 粒子类型
        true,                      // 是否强制显示
        entity.x,                  // 中心X坐标
        entity.y + 1,              // 中心Y坐标
        entity.z,                  // 中心Z坐标
        0.5,                       // X方向扩散范围
        1.0,                       // Y方向扩散范围
        0.5,                       // Z方向扩散范围
        20,                        // 粒子数量
        0.15                       // 粒子速度
    )
}

function sweep_attack(entity, player) {
    let entityX = entity.x
    let entityY = entity.y
    let entityZ = entity.z

    let height = Math.random() * 2
    let offsetX = (Math.random() - 0.5) * 1.2
    let offsetZ = (Math.random() - 0.5) * 1.2

    player.level.spawnParticles(
        'minecraft:sweep_attack',      // 粒子类型
        true,                      // 是否强制显示
        entity.x,                  // 中心X坐标
        entity.y + 1,              // 中心Y坐标（向上偏移1格，因为height范围是0-2）
        entity.z,                  // 中心Z坐标
        0.5,                       // X方向扩散范围（对应 offsetX 的 ±0.75）
        1.0,                       // Y方向扩散范围（对应 height 的 0-2）
        0.5,                       // Z方向扩散范围（对应 offsetZ 的 ±0.75）
        20,                        // 粒子数量（40次循环 × 每次2个粒子）
        0.15                       // 粒子速度
    )
}

/**
 * 获取实体上指定效果的基础强度
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @returns {number} 基础强度值，如果没有效果返回0
 */
function getBaseStrength(entity, effectId) {
    return $IExtendedMobEffect.getBaseStrength(entity, effectId)
}

/**
 * 设置实体上指定效果的基础强度（不自动同步到客户端）
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} strength - 要设置的基础强度值（最小为1）
 * @returns {boolean} 是否设置成功（实体是否有该效果）
 */
function setBaseStrength(entity, effectId, strength) {
    return $IExtendedMobEffect.setBaseStrength(entity, effectId, strength)
}

/**
 * 设置实体上指定效果的基础强度并自动同步到客户端显示
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} strength - 要设置的基础强度值（最小为1）
 * @returns {boolean} 是否设置成功（实体是否有该效果）
 */
function setBaseStrengthAndSync(entity, effectId, strength) {
    return $IExtendedMobEffect.setBaseStrengthAndSync(entity, effectId, strength)
}

/**
 * 增加实体上指定效果的基础强度
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 增加的量
 * @returns {number} 增加后的基础强度值，如果没有效果返回0
 */
function addBaseStrength(entity, effectId, amount) {
    return $IExtendedMobEffect.addBaseStrength(entity, effectId, amount)
}

/**
 * 减少实体上指定效果的基础强度
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 减少的量
 * @returns {boolean} true表示基础强度 <= 0，false表示减少后基础强度 > 0
 */
function reduceBaseStrength(entity, effectId, amount) {
    return $IExtendedMobEffect.reduceBaseStrength(entity, effectId, amount)
}

/**
 * 增加实体上指定效果的基础强度并同步到客户端
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 增加的量
 * @returns {number} 增加后的基础强度值，如果没有效果返回0
 */
function addBaseStrengthAndSync(entity, effectId, amount) {
    let oldStrength = getBaseStrength(entity, effectId)
    if (oldStrength === 0) return 0

    let newStrength = oldStrength + amount
    setBaseStrengthAndSync(entity, effectId, newStrength)
    return newStrength
}

/**
 * 减少实体上指定效果的基础强度并同步到客户端
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 减少的量
 * @returns {boolean} true表示基础强度 <= 0，false表示减少后基础强度 > 0
 */
function reduceBaseStrengthAndSync(entity, effectId, amount) {
    let oldStrength = getBaseStrength(entity, effectId)
    if (oldStrength === 0) return false

    let newStrength = Math.max(0, oldStrength - amount)
    setBaseStrengthAndSync(entity, effectId, newStrength)
    return newStrength <= 0
}

/**
 * 获取效果的层数（原版 amplifier + 1）
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @returns {number} 层数（1-based），如果没有效果返回0
 */
function getEffectLayers(entity, effectId) {
    if (!entity.hasEffect(effectId)) return 0;
    return entity.getEffect(effectId).getAmplifier() + 1;
}

/**
 * 设置效果的层数
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} layers - 新的层数（1-based）
 * @param {number} [duration] - 持续时间（可选，不指定则保持原时长）
 * @returns {boolean} 是否设置成功
 */
function setEffectLayers(entity, effectId, layers, duration) {
    if (!entity.hasEffect(effectId)) return false;
    if (layers <= 0) {
        entity.removeEffect(effectId);
        return true;
    }

    const oldEffect = entity.getEffect(effectId);
    const newDuration = duration !== undefined ? duration : oldEffect.getDuration();
    const baseStrength = getBaseStrength(entity, effectId);

    entity.removeEffect(effectId);
    entity.potionEffects.add(effectId, newDuration, layers - 1);
    setBaseStrengthAndSync(entity, effectId, baseStrength);

    return true;
}

/**
 * 增加效果的层数
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 增加的数量
 * @returns {number} 增加后的层数
 */
function addEffectLayers(entity, effectId, amount) {
    if (!entity.hasEffect(effectId)) return 0;

    const currentLayers = getEffectLayers(entity, effectId);
    const newLayers = currentLayers + amount;

    setEffectLayers(entity, effectId, newLayers);
    return newLayers;
}

/**
 * 减少效果的层数
 * @param {LivingEntity} entity - 目标实体
 * @param {string} effectId - 效果ID
 * @param {number} amount - 减少的数量
 * @returns {number} 剩余层数（0表示效果已移除）
 */
function reduceEffectLayers(entity, effectId, amount) {
    if (!entity.hasEffect(effectId)) return 0;

    const currentLayers = getEffectLayers(entity, effectId);
    const newLayers = currentLayers - amount;

    if (newLayers <= 0) {
        entity.removeEffect(effectId);
        return 0;
    }

    setEffectLayers(entity, effectId, newLayers);
    return newLayers;
}



function getNeighbors(pos) {
    const neighbors = [];
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0) continue;
                neighbors.push({
                    x: pos.x + dx,
                    y: pos.y + dy,
                    z: pos.z + dz
                });
            }
        }
    }
    return neighbors;
}

function executeUltimine(player, startPos, sourceBlockId) {
    const level = player.level;
    const tool = player.getMainHandItem();

    if (tool.isEmpty()) return;

    const enchantments = tool.getEnchantments();
    let hasSilk = false;
    let entries = enchantments.entrySet();
    for (let entry of entries) {
        let key = String(entry.getKey());
        if (key.includes('silk')) {
            hasSilk = true;
            break;
        }
    }

    if (hasSilk) return;

    const startBlock = level.getBlock(startPos.getX(), startPos.getY(), startPos.getZ());
    if (!startBlock.hasTag('c:ores')) {
        return;
    }

    let maxBlocks = 64;
    let brokenCount = 0;
    let toCheck = [];
    let checked = new Set();

    let startNeighbors = getNeighbors({
        x: startPos.getX(),
        y: startPos.getY(),
        z: startPos.getZ()
    });

    startNeighbors.forEach(neighbor => toCheck.push(neighbor));

    while (toCheck.length > 0 && brokenCount < maxBlocks) {
        let pos = toCheck.shift();
        let posKey = `${pos.x},${pos.y},${pos.z}`;

        if (checked.has(posKey)) continue;
        checked.add(posKey);

        let blockState = level.getBlock(pos.x, pos.y, pos.z);
        if (blockState.hasTag('c:ores') && blockState.getId().toString() === sourceBlockId) {
            let success = level.destroyBlock(new BlockPos(pos.x, pos.y, pos.z), true, player, 0);
            if (success) {
                brokenCount++;

                let neighbors = getNeighbors(pos);
                neighbors.forEach(neighbor => {
                    let neighborKey = `${neighbor.x},${neighbor.y},${neighbor.z}`;
                    if (!checked.has(neighborKey)) {
                        toCheck.push(neighbor);
                    }
                });
            }
        }
    }
}

function handleSocketChange(event, player, itemId) {
    let newItem = event.getNewItem();
    let oldItem = event.getOldItem();
    if (oldItem.getId() == itemId) {
        $SocketStateAPI.disable(player, itemId);
    }
    if (newItem.getId() == itemId) {
        $SocketStateAPI.enable(player, itemId);
    }
}

/**
 * 修复/扣除物品耐久（正数修复，负数扣除）
 * @param {Internal.ItemStack} stack 物品
 * @param {number} amount 修复量（正数修复，负数扣除）
 * @param {Internal.Player} [player] 可选，持有物品的玩家，传入则扣除耐久时触发破损回调
 * @param {string} [slotName] 可选，槽位名称（"mainhand"、"offhand"、"head"、"chest"、"legs"、"feet"），默认 "mainhand"
 * @returns {boolean} 扣除耐久时返回是否成功扣除（耐久不足返回false），修复时返回true
 */
function fu_repairDurability(stack, amount, player, slotName) {
    if (!stack || stack.isEmpty() || amount === 0) return true;

    if (amount < 0) {
        let damageAmount = Math.abs(amount);
        let currentDamage = stack.getDamageValue();
        let maxDamage = stack.getMaxDamage();

        let remainingDurability = maxDamage - currentDamage;
        if (remainingDurability <= 1) {
            return false;
        }

        let actualDamage = Math.min(damageAmount, remainingDurability - 1);
        let newDamage = currentDamage + actualDamage;

        if (fu_isGear(stack)) {
            fu_setDamage(stack, newDamage, (s, d) => s.setDamageValue(d));
        } else {
            stack.setDamageValue(newDamage);
        }

        if (newDamage >= maxDamage - 1 && player && player.isPlayer()) {
            let slot = slotName || "mainhand";
            triggerGearBroken(stack, player, slot);
        }
        return true;
    }

    if (fu_isGear(stack)) {
        let currentDamage = stack.getDamageValue();
        let newDamage = Math.max(0, currentDamage - amount);
        fu_setDamage(stack, newDamage, (s, d) => s.setDamageValue(d));
    } else {
        let newDamage = Math.max(0, stack.getDamageValue() - amount);
        stack.setDamageValue(newDamage);
    }
    return true;
}

/**
 * 手动触发 Silent Gear 的 onBroken 回调
 * @param {Internal.ItemStack} stack 武器
 * @param {Internal.Player} player 玩家
 * @param {string} slotName 槽位名称："mainhand"、"offhand"、"head"、"chest"、"legs"、"feet"
 */
function triggerGearBroken(stack, player, slotName) {
    let slot;
    switch (slotName) {
        case "offhand":
            slot = $EquipmentSlot.OFFHAND;
            break;
        case "head":
            slot = $EquipmentSlot.HEAD;
            break;
        case "chest":
            slot = $EquipmentSlot.CHEST;
            break;
        case "legs":
            slot = $EquipmentSlot.LEGS;
            break;
        case "feet":
            slot = $EquipmentSlot.FEET;
            break;
        default:
            slot = $EquipmentSlot.MAINHAND;
    }

    $GearHelper.onBroken(stack, player, slot);
}