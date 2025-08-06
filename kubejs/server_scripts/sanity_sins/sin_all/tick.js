PlayerEvents.tick(event => {
    const player = event.player;
    if (!player) return;

    const pData = player.persistentData;
    const tick = player.tickCount;
    const sanityValue = pData.getInt("sanity") || 0;
    const depravityValue = pData.getInt("depravity") || 0;
    const witherHowitzerValue = pData.getInt("wither_howitzer") || 0;

    if (tick % 40 === 0) {
        handleSanityAndDepravity(player, pData, sanityValue, depravityValue);
        handleSinMechanics(event, player, pData, sanityValue);
    }

    if (tick % 50 === 0 && pData.getInt("depravityDamageApplied") === 1) {
        pData.putInt("depravityDamageApplied", 0);
    }

    if (player.hasEffect("kubejs:wither_howitzer") && tick % 400 === 0 && witherHowitzerValue < 8) {
        pData.putInt("wither_howitzer", witherHowitzerValue + 1);
        player.setStatusMessage(`§6虎标弹充能: §e${witherHowitzerValue + 1}/8`);
    }
    if (tick % 400 == 0) {
        // 获取玩家状态
        const healthRatio = player.getHealth() / player.getMaxHealth();
        const foodLevel = player.getFoodLevel()

        // 理智恢复/流失逻辑
        if (foodLevel >= 18 && healthRatio > 0.95) {
            modifyDrainRate(player, DRAIN_STAGE.FLAT, 1);
        }
        if (healthRatio <= 0.40) {
            modifyDrainRate(player, DRAIN_STAGE.FLAT, -1);
            if (healthRatio <= 0.2) {
                modifyDrainRate(player, DRAIN_STAGE.FLAT, -1);
            }
        }
        //词缀逻辑
        ghost_ingot(event, player)

        const drainRate = getSanityDrainRate(player);
        updateplayersanity(player, sanityValue + drainRate);
    }
});

function handleSanityAndDepravity(player, pData, sanityValue, depravityValue) {
    if (sanityValue !== -45 && depravityValue > 2) {
        pData.putInt("depravity", depravityValue - 2);
        updateplayersanity(player, sanityValue - 1);
    }
}

function handleSinMechanics(event, player, pData, sanityValue) {
    const hasActiveSin = checkForActiveSins(pData);

    if (sanityValue === -45) {
        if (!hasActiveSin) {
            if (is_Magical_Girl(event, player)) return;
            activateRandomSin(event, player);
        }
    } else if (hasActiveSin) {
        resetAllSins(pData);
    }
}

function checkForActiveSins(pData) {
    for (const sin in sins) {
        if (pData.getInt(sins[sin]) > 0) {
            return true;
        }
    }
    return false;
}

function resetAllSins(pData) {
    for (const sin in sins) {
        pData.putInt(sins[sin], 0);
    }
}



const DRAIN_STAGE = {
    ADDITIVE: 1,    // 百分比增减（影响基础流失速度）
    FLAT: 2,        // 固定值加成（直接加减）
    MULTIPLY: 3     // 独立乘区（最终乘积）
};

const drainDataMap = new WeakMap();

function getDrainData(player) {
    let data = drainDataMap.get(player);
    if (!data) {
        // [基础流失值, 固定加成, 加算倍率, 独立乘区]
        data = [0, 0, 0, 1];
        drainDataMap.set(player, data);
    }
    return data;
}

/**
 * 修改理智变化速率
 * @param {Internal.Player} player - 玩家对象
 * @param {number} stage - 修改阶段 
 * @param {number} value - 修改值
 */
function modifyDrainRate(player, stage, value) {
    const data = getDrainData(player);
    const pData = player.persistentData;

    switch (stage) {
        case DRAIN_STAGE.FLAT:
            data[1] += value;      // 直接加减
            break;

        case DRAIN_STAGE.ADDITIVE:
            data[2] += value - 1;  // 百分比加成
            break;

        case DRAIN_STAGE.MULTIPLY:
            data[3] *= value;       // 独立乘区
            break;
    }

    // 最终公式：(基础流失 × (1 + 加算) × 独立乘区) + 固定加成
    const finalRate = (data[0] * (1 + data[2]) * data[3]) + data[1];
    pData.putFloat("sanityDrainRate", finalRate);
}

/**
 * 获取当前理智变化速率
 * @returns {number} 
 */
function getSanityDrainRate(player) {
    return player.persistentData.getFloat("sanityDrainRate") || 0.0;
}

// 设置理智流失速率
function setSanityDrainRate(player, rate) {
    player.persistentData.putFloat("sanityDrainRate", rate);
}
