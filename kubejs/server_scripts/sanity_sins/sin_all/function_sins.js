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
    if (!pData.contains(depravityDamageApplied)) pData.putInt(depravityDamageApplied, 0);
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


    //其他
    for (let sin in sins) {
        if (!pData.contains(sins[sin])) {
            pData.putInt(sins[sin], 0);
        }
    }
}

/**
 * 理智值更新
 */
function updateplayersanity(player, count) {
    let pData = player.persistentData;
    let maxCount = pData.getInt(Maxsanity) ?? defaultMaxsanity;
    let currentSanity = pData.getInt(sanity) ?? 0;

    if (currentSanity === -45 && count < -45) {
        let currentDepravity = pData.getInt(depravity) ?? 0;
        let depravityIncrease = Math.abs(count + 45);
        pData.putInt(depravity, currentDepravity + depravityIncrease);
    } else {
        if (count < currentSanity) {
            let currentDepravity = pData.getInt(depravity) ?? 0;
            let sanityDecrease = Math.min(Math.abs(count - currentSanity), Math.abs(currentSanity + 45));
            pData.putInt(depravity, currentDepravity + sanityDecrease);
        }
        count = Math.max(-45, Math.min(count, maxCount));
        pData.putInt(sanity, count);

        if (count !== -45) {
            for (const sin in sins) {
                pData.putInt(sins[sin], 0);
            }
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
 * 罪孽侵蚀
 */
function activateRandomSin(event, player) {
    if (is_Magical_Girl(event, player)) return;
    const sinKeys = Object.values(sins);
    const randomSin = sinKeys[Math.floor(Math.random() * sinKeys.length)];
    let pData = player.persistentData;

    const sinColors = {
        "GLUTTONY": "§2",    //暴食
        "PRIDE": "§1",       //傲慢
        "WRATH": "§4",       //暴怒
        "ENVY": "§d",       //嫉妒
        "LUST": "§6",       //色欲
        "SLOTH": "§e",      //懒惰
        "GREED": "§9"       //贪婪
    };

    const sinMessages = {
        "GLUTTONY": [
            `${sinColors.GLUTTONY}[暴食侵蚀] 你的消化系统开始扭曲变形，牙齿变得尖锐... `,
            `${sinColors.GLUTTONY}[暴食侵蚀] 口腔中分泌出过量唾液，眼前的一切都变得...美味起来...`,
            `${sinColors.GLUTTONY}[暴食侵蚀] 一种原始的进食冲动支配了你的思维`,
            `${sinColors.GLUTTONY}[暴食侵蚀] 你突然理解了那些为食物而疯狂的生物`
        ],
        "PRIDE": [
            `${sinColors.PRIDE}[傲慢侵蚀] 一股优越感油然而生，你感觉自己比周围所有人都高贵`,
            `${sinColors.PRIDE}[傲慢侵蚀] 你开始蔑视所有生命形式，包括曾经的自己... `,
            `${sinColors.PRIDE}[傲慢侵蚀] 心灵的庞然傲慢仿佛碾过了身体的孱弱`,
            `${sinColors.PRIDE}[傲慢侵蚀] 你突然感觉其他人如此的...平庸...`
        ],
        "WRATH": [
            `${sinColors.WRATH}[暴怒侵蚀] 一股无名怒火突然窜上心头，你想要毁灭眼前的一切`,
            `${sinColors.WRATH}[暴怒侵蚀] 名为狂怒的极热熔岩于破碎的血管奔涌`,
            `${sinColors.WRATH}[暴怒侵蚀] 脑海中闪过无数暴力场景，每一个都让你感到愉悦`,
            `${sinColors.WRATH}[暴怒侵蚀] 血液似乎在沸腾，渴望看到敌人痛苦的表情`
        ],
        "ENVY": [
            `${sinColors.ENVY}[嫉妒侵蚀] 你突然感觉别人拥有的每件东西都比你手上的更好`,
            `${sinColors.ENVY}[嫉妒侵蚀] 惨绿之火焰在如枯井的无色深瞳中燃烧`,
            `${sinColors.ENVY}[嫉妒侵蚀] 你开始盘算如何夺走别人珍视的事物`,
            `${sinColors.ENVY}[嫉妒侵蚀] 他人的幸福此刻让你感到难以忍受`
        ],
        "LUST": [
            `${sinColors.LUST}[色欲侵蚀] 尽情施加伤口欲望的手腕染上爱的颜色`,
            `${sinColors.LUST}[色欲侵蚀] 玫瑰的根系已攀附脊椎，在骨骼间绽放带露的花苞 `,
            `${sinColors.LUST}[色欲侵蚀] 指缝间垂落的血珠，在地面绽开成染血的玫瑰`,
            `${sinColors.LUST}[色欲侵蚀] 玫瑰从伤口生长，每一片花瓣都浸透甜腥的渴望`
        ],
        "SLOTH": [
            `${sinColors.SLOTH}[懒惰侵蚀] 一种压倒性的疲惫感突然袭来，连呼吸都变得费力`,
            `${sinColors.SLOTH}[懒惰侵蚀] 你突然觉得任何行动都毫无意义，不如就这样躺着`,
            `${sinColors.SLOTH}[懒惰侵蚀] 身体和四肢仿佛自己感到了永恒的疲惫`,
            `${sinColors.SLOTH}[懒惰侵蚀] 时间似乎变得粘稠，每一秒都被拉得无限长`
        ],
        "GREED": [
            `${sinColors.GREED}[贪婪侵蚀] 思想里黄金不可能片刻满足无止的索求`,
            `${sinColors.GREED}[贪婪侵蚀] 内心有个声音在说：'更多，我需要更多...'`,
            `${sinColors.GREED}[贪婪侵蚀] 正在计算着如何最大化手头的利益`,
            `${sinColors.GREED}[贪婪侵蚀] 分享的概念突然变得荒谬可笑`
        ]
    };

    for (let sin in sins) {
        if (sins[sin] === randomSin) {
            pData.putInt(sins[sin], 1);

            const messages = sinMessages[sin];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            player.setStatusMessage(randomMessage)
        } else {
            pData.putInt(sins[sin], 0);
        }
    }
}

/**
 * 沉沦受伤机制
 */
function depravityDamage(event) {
    const player = event.player;
    if (!player) return;

    const pData = player.persistentData;
    const sanityValue = pData.getInt("sanity") || 0;
    const depravityValue = pData.getInt("depravity") || 0;

    if (sanityValue !== -45) {
        pData.remove("depravityDamageMultiplier");
        return;
    }

    // 线性计算伤害倍率
    const damageMultiplier = Math.min(5, 1 + depravityValue / 100);
    pData.putFloat("depravityDamageMultiplier", damageMultiplier);
    // 每次受伤减少5%沉沦
    const reduction = Math.max(1, Math.floor(depravityValue * 0.05));
    pData.putInt("depravity", Math.max(0, depravityValue - reduction));
}


/**
 * 玩家死亡理智判定事件
 */
function resetPlayerSanity(player) {
    const pData = player.persistentData;

    pData.putInt("sanity", 0);
    pData.putInt("depravity", 0);

    // 清除所有罪孽状态
    for (const sin in sins) {
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

    if (pData.getInt("sanity") !== -45) {
        player.setStatusMessage(`§c理智值未达到侵蚀要求`)
        return;
    }
    if (!sins[targetSin]) {
        player.setStatusMessage(`§c无效的罪孽类型: ${targetSin}`)
        return;
    }
    pData.putInt(sins[targetSin], intensity);
    // 清除其他罪孽状态
    for (let sin in sins) {
        if (sin !== targetSin) {
            pData.putInt(sins[sin], 0);
        }
    }
    const sinMessages = {
        "GLUTTONY": `§2[暴食侵蚀]`,
        "PRIDE": `§1[傲慢侵蚀]`,
        "WRATH": `§4[暴怒侵蚀]`,
        "ENVY": `§d[嫉妒侵蚀]`,
        "LUST": `§6[色欲侵蚀]`,
        "SLOTH": `§e[懒惰侵蚀]`,
        "GREED": `§9[贪婪侵蚀]`
    };
    player.setStatusMessage(sinMessages[targetSin])
}