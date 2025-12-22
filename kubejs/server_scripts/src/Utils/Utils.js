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