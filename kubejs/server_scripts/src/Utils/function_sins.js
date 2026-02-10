/**
 * 初始化理智系统
 */
function loggedInplayersanity(player) {
    let pData = player.persistentData;
    //理智
    if (!pData.contains(sanity)) pData.putInt(sanity, 0);
    if (!pData.contains(Maxsanity)) pData.putInt(Maxsanity, defaultMaxsanity);
    if (!pData.contains(sanityDrainRate)) pData.putInt(sanityDrainRate, 0);
    //罪孽
    if (!pData.contains(GLUTTONY_nutrition)) pData.putInt(GLUTTONY_nutrition, 0);
    if (!pData.contains(gluttony_strength)) pData.putInt(gluttony_strength, 0);
    if (!pData.contains(idleTimer)) pData.putInt(idleTimer, 0);
    if (!pData.contains(depravity)) pData.putInt(depravity, 0);
    if (!pData.contains(sloth_cumulative_damage)) pData.putInt(sloth_cumulative_damage, 0);
    //肾上腺素
    if (!pData.contains(adrenaline)) pData.putInt(adrenaline, 0);
    //石榴石：冷却
    if (!pData.contains(garnet)) pData.putInt(garnet, 0);
    //浸血阅历：冷却
    if (!pData.contains(exp_to_cd)) pData.putInt(exp_to_cd, 0);
    //特质：温迪戈
    if (!pData.contains(wendigo)) pData.putInt(wendigo, 0);
    //虎标弹(凋零合金)
    if (!pData.contains(wither_howitzer)) pData.putInt(wither_howitzer, 0);
    //铁木锭
    if (!pData.contains(magicSwitch)) pData.putInt(magicSwitch, 0);
    //成瘾性
    if (!pData.contains(addiction)) pData.putInt(addiction, 0);
    if (!pData.contains(depression)) pData.putInt(depression, 0);
    //其他
    for (let sin in sins) {
        if (!pData.contains(sins[sin])) {
            pData.putInt(sins[sin], 0);
        }
    }
}

/**
 * 理智值更新（v3）
 */
function updateplayersanity(player, count) {
    let pData = player.persistentData;
    let maxCount = pData.getInt(Maxsanity) ?? defaultMaxsanity;
    let currentSanity = pData.getInt(sanity) ?? 0;
    let currentDepravity = pData.getInt(depravity) ?? 0;

    const delta = count - currentSanity;

    // 处理理智上升逻辑
    if (delta > 0 && currentDepravity > 0) {
        const depravityReduction = Math.min(currentDepravity, delta);
        pData.putInt(depravity, currentDepravity - depravityReduction);
        count = currentSanity + (delta - depravityReduction);
    }

    // 处理-45状态的特殊转换
    if (currentSanity === -45 && count < -45) {
        let depravityIncrease = Math.abs(count + 45); // 计算超出-45的部分
        pData.putInt(depravity, currentDepravity + depravityIncrease);
    }

    // 强制限制范围[-45, maxCount]
    count = Math.max(-45, Math.min(count, maxCount));

    pData.putInt(sanity, count);

    player.sendData("player_sanity", { sanity: count });

    // 状态重置逻辑
    if (pData.getInt(sanity) !== -45) {
        for (let sin in sins) {
            pData.putInt(sins[sin], 0);
        }
    }
}


/**
 * 罪孽状态更新
 */
function updatePlayerSin(player, sin, count) {
    let pData = player.persistentData;
    if (pData.getInt(sanity) !== -45) return;

    for (let s in sins) {
        if (sins[s] !== sin) {
            pData.putInt(sins[s], 0);
        }
    }
    pData.putInt(sin, count);
}

/**
 * 罪孽侵蚀系统
 */
function activateRandomSin(event, player) {
    if (is_Magical_Girl(event, player)) return;

    let pData = player.persistentData;
    if (!pData) return;

    const sinKeys = Object.keys(sins);
    const selectedSin = sinKeys[Math.floor(Math.random() * sinKeys.length)];


    // 颜色配置
    const sinColorMap = {
        GLUTTONY: 'dark_green',
        PRIDE: 'aqua',
        WRATH: 'red',
        ENVY: 'dark_purple',
        LUST: 'light_purple',
        SLOTH: 'yellow',
        GREED: 'gold'
    };

    // 处理每个罪孽类型
    sinKeys.forEach(sin => {
        const isSelected = sin === selectedSin;
        pData.putInt(sins[sin], isSelected ? 1 : 0);

        if (isSelected) {
            const color = sinColorMap[sin];
            const sinLower = sin.toLowerCase();
            const messageIndex = Math.floor(Math.random() * 4);

            // 构建消息
            player.setStatusMessage(
                Text.join(
                    Text.translate(`message.sin.${sinLower}.prefix`).color(color),
                    " ",
                    Text.translate(`message.sin.${sinLower}.message.${messageIndex}`).color(color)
                )
            );
        }
    });
}



/**
 * 沉沦伤害处理
 */
function depravityDamage(event) {
    const player = event.player;
    if (!player) return;

    const pData = player.persistentData;
    const sanityValue = pData.getInt("sanity") || 0;
    const depravityValue = pData.getInt("depravity") || 0;

    if (sanityValue === -45 && depravityValue > 0) {
        // 计算沉沦伤害倍率（1-5）
        const depravityMultiplier = Math.min(5, 1 + depravityValue / 100);

        new_damage(event, STAGE.MULTIPLY, depravityMultiplier);

        const reduction = Math.max(1, Math.floor(depravityValue * 0.05));
        pData.putInt("depravity", Math.max(0, depravityValue - reduction));
    }
}

/**
 * 玩家死亡判定事件
 */
function resetPlayerSanity(player) {
    const pData = player.persistentData;

    pData.putInt("sanity", 0);
    pData.putInt("depravity", 0);
    pData.putInt("addiction", 0);
    updateplayersanity(player, 0);
    // 清除所有罪孽状态
    for (let sin in sins) {
        pData.putInt(sins[sin], 0);
    }
}

EntityEvents.death("minecraft:player", event => {
    resetPlayerSanity(event.player)
})

/**
 * 定向侵蚀
 */
function targetedSinErosion(event, player, targetSin, intensity) {
    let pData = player.persistentData;

    // 检查理智值
    if (pData.getInt("sanity") !== -45) {
        player.setStatusMessage(
            Text.translate('error.sanity_requirement').color('red')
        );
        return;
    }

    // 检查罪孽类型
    if (!sins[targetSin]) {
        player.setStatusMessage(
            Text.translate('error.invalid_sin', [
                Text.of(targetSin).color('red')
            ]).color('red')
        );
        return;
    }

    pData.putInt(sins[targetSin], intensity);
    for (let sin in sins) {
        if (sin !== targetSin) {
            pData.putInt(sins[sin], 0);
        }
    }

    const sinColor = {
        "GLUTTONY": "dark_green",
        "PRIDE": "blue",
        "WRATH": "dark_red",
        "ENVY": "light_purple",
        "LUST": "gold",
        "SLOTH": "yellow",
        "GREED": "dark_aqua"
    }[targetSin];

    player.setStatusMessage(
        Text.translate(`message.sin.${targetSin.toLowerCase()}.prefix`)
            .color(sinColor)
    );
}