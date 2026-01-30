
PlayerEvents.tick(event => {
    const player = event.player;
    if (!player) return;

    const pData = player.persistentData;
    const tick = player.tickCount;
    const sanityValue = pData.getInt("sanity") || 0;
    const depravityValue = pData.getInt("depravity") || 0;
    const witherHowitzerValue = pData.getInt("wither_howitzer") || 0;

    if (tick % 44 == 0) {
        handleSanityAndDepravity(player, pData, sanityValue, depravityValue);
        handleSinMechanics(event, player, pData, sanityValue);
    }

    if (player.hasEffect("kubejs:withdrawal")) {
        if (tick % 92 == 0) {
            event.level[$playersound]
                (null, player.x, player.y, player.z, "kubejs:withdrawal", "players", 2.0, 1.0)
        }
    }

    if (tick % 51 == 0 && pData.getInt("depravityDamageMultiplier") == 1) {
        pData.putInt("depravityDamageMultiplier", 0);
    }
    if (fu_hasTraitAnywhere(player, "kubejs:wither_howitzer") && tick % 400 === 0 && witherHowitzerValue < 8) {
        pData.putInt("wither_howitzer", witherHowitzerValue + 1);
        player.setStatusMessage(
            Text.join(
                Text.translate('message.wither_howitzer.charge').color('gold'),
                " ",
                Text.of(`${witherHowitzerValue + 1}/8`).color('yellow')
            )
        );
    }
    if (tick % 202 == 0) {
        checkAlcoholEffects(player)
    }
    if (tick % 401 == 0) {
        // 获取玩家状态
        let healthRatio = player.getHealth() / player.getMaxHealth();
        let foodLevel = player.getFoodLevel()
        // 理智恢复/流失逻辑
        if (foodLevel >= 16 && healthRatio > 0.75) {
            if (pData.getInt("depression") != 1) {
                modifyDrainRate(player, DRAIN_STAGE.FLAT, 1);
            }
        }

        // 生命值低时减少理智（无论是否侵蚀）
        if (healthRatio <= 0.3) {
            modifyDrainRate(player, DRAIN_STAGE.FLAT, -1); //-理智
            if (healthRatio <= 0.15) {
                modifyDrainRate(player, DRAIN_STAGE.FLAT, -1); //-理智
            }
        }
        //词缀逻辑
        sanity_up(event, player)

        let drainRate = getSanityDrainRate(player);
        updateplayersanity(player, sanityValue + drainRate);
    }
    if (tick % 1201 == 0) {
        checkAndRemoveExcessGeas(player)
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
    for (let sin in sins) {
        if (pData.getInt(sins[sin]) > 0) {
            return true;
        }
    }
    return false;
}

function resetAllSins(pData) {
    for (let sin in sins) {
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
    setSanityDrainRate(player, finalRate)
}
/**
 * 获取当前理智变化速率(v2:修复了缓存问题)
 * @returns {number} 
 */
function getSanityDrainRate(player) {
    const rate = player.persistentData.getFloat("sanityDrainRate") || 0;
    // 侵蚀状态下强制修正
    if (isPlayerDepraved(player.persistentData) && rate > 0) {
        return 0;
    }
    return rate;
}

// 设置理智流失速率
function setSanityDrainRate(player, rate) {
    player.persistentData.putFloat("sanityDrainRate", rate);
}

// 侵蚀状态的定义
function isPlayerDepraved(pData) {
    return pData.getInt("sanity") === -45 ||
        Object.values(sins).some(sin => pData.getInt(sin) > 0);
}

/**
 * 检测玩家是否同时拥有3种以上酒类效果，如果是则施加醉酒中毒
 */
function checkAlcoholEffects(player) {
    let activeAlcoholEffects = 0;
    for (let effectId of alcoholEffects) {
        if (player.hasEffect(effectId) && ++activeAlcoholEffects > 3) {
            player.potionEffects.add("kubejs:alcohol_poisoning", 400, 0);
            return;
        }
    }
}


PlayerEvents.tick(event => {
    const { player } = event;
    if (!player || player.tickCount % 51 !== 0) return;

    const pData = player.persistentData;
    const sanityValue = pData.getInt("sanity") || 0;

    // 跳过魔法少女或理智值不为-45的情况
    if (is_Magical_Girl(event, player) || sanityValue !== -45) return;

    // 定义原罪效果
    const SIN_EFFECTS = {
        GLUTTONY: [
            { id: "kubejs:gluttony", duration: 80, amplifier: 0, ambient: false, showParticles: true },
            { id: "fruitsdelight:appetizing", duration: 100, amplifier: 0, ambient: false, showParticles: false },
            { id: "minecraft:hunger", duration: 100, amplifier: 4, ambient: false, showParticles: false }
        ],
        ENVY: [{ id: "kubejs:envy", duration: 80, amplifier: 0, showParticles: true }],
        GREED: [{ id: "kubejs:greed", duration: 80, amplifier: 0, showParticles: true }],
        LUST: [{ id: "kubejs:lust", duration: 80, amplifier: 0, showParticles: true }],
        PRIDE: [{ id: "kubejs:pride", duration: 80, amplifier: 0, showParticles: true }],
        SLOTH: [
            { id: "kubejs:sloth", duration: 80, amplifier: 0, showParticles: true },
            { id: "kubejs:sloth_2", duration: 80, amplifier: 0, showParticles: false }
        ],
        WRATH: [{ id: "kubejs:wrath", duration: 80, amplifier: 0, showParticles: true }]
    };

    Object.keys(SIN_EFFECTS).forEach(sin => {
        // 检查玩家是否激活侵蚀
        if (pData.getInt(sins[sin]) > 0) {
            // 应用所有关联的效果
            SIN_EFFECTS[sin].forEach(effect => {
                player.potionEffects.add(
                    effect.id,
                    effect.duration,
                    effect.amplifier,
                    effect.ambient ?? false,
                    effect.showParticles ?? true
                );
            });
        }
    });
});

