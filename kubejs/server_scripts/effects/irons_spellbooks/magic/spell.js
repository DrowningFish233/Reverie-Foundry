/**
 * 拆分法术ID为命名空间和路径
 * @param {string} spellId 完整法术ID 
 * @returns {Object|null} 包含带引号的namespace和path的对象，无效ID返回null
 */
function splitSpellId(spellId) {
    if (!spellId || typeof spellId !== 'string') return null;

    const parts = spellId.split(':');
    if (parts.length !== 2) return null;

    return {
        namespace: `'${parts[0]}'`,
        path: `'${parts[1]}'`
    };
}

/**
 * 石榴石
 */
function irons_spellbooks_guiding_bolt(event) {
    const player = event.player;
    const amplifier = 3;
    const pData = player.persistentData;
    if (pData.getInt("garnet") === 0) {
        if (player.hasEffect("kubejs:garnet")) {
            if (player.isOnFire() || player.isInLava()) {
                overLimitSpellCast($resourceLocation('irons_spellbooks', 'guiding_bolt'), amplifier, player, false);
                pData.putInt("garnet", 1);
                //定时以计算冷却
                event.server.scheduleInTicks(20 * 5, () => {
                    pData.putInt("garnet", 0);
                });
            }
        }
    }
}
/**
 * 电流合金
 */
function irons_spellbooks_chain_lightning(event) {
    const player = event.player;
    const pData = player.persistentData;
    if (pData.getInt("acril_ingot") === 0) {
        if (player.hasEffect("kubejs:acril_ingot")) {
            let magicData = getPlayerMagicData(player)
            const currentMana = magicData.getMana();
            if (currentMana >= 20) {
                let Effect = attacker.getEffect("kubejs:acril_ingot");
                let amplifier = Effect.getAmplifier() + 1
                overLimitSpellCast($resourceLocation('irons_spellbooks', 'chain_lightning'), amplifier, player, false);
                magicData.addMana(-20)
                pData.putInt("acril_ingot", 1);
                //定时以计算冷却
                event.server.scheduleInTicks(20 * 10, () => {
                    pData.putInt("acril_ingot", 0);
                });
            }
        }
    }
}

/**
 * 铁木锭
 */
function irons_spellbooks_root(event) {
    const player = event.player;
    const pData = player.persistentData;

    if (player.hasEffect("kubejs:ironwood_ingot")) {
        let currentSanity = pData.getInt(sanity);
        pData.putInt(sanity, currentSanity - 15);

        const currentHealth = player.health;
        const maxHealth = player.maxHealth;
        const damageAmount = maxHealth * 0.4;

        if (currentSanity <= -45) {
            const remainingHealth = currentHealth - damageAmount;

            if (remainingHealth <= 0) {
                player.attack($DamageSource("out_of_world"), damageAmount);
                return;
            }
            else {
                player.attack($DamageSource("out_of_world"), damageAmount);
                let effect = player.getEffect("kubejs:ironwood_ingot");
                let amplifier = effect ? effect.getAmplifier() + 1 : 0;
                overLimitSpellCast($resourceLocation('irons_spellbooks', 'root'), amplifier, player, false);
            }
        }
        else {
            player.potionEffects.add("kubejs:disillusionment", 20 * 2, 0);
            let effect = player.getEffect("kubejs:ironwood_ingot");
            let amplifier = effect ? effect.getAmplifier() + 1 : 0;
            overLimitSpellCast($resourceLocation('irons_spellbooks', 'root'), amplifier, player, false);
        }
    }
}

//混沌传送
ISSEvents.spellOnCast(event => {
    if (event.spellId == "hazennstuff:chaotic_teleport") {
        const player = event.entity
        if (player.hasEffect("kubejs:chaotic_teleport")) {
            player.attack($DamageSource("out_of_world"), player.getMaxHealth() / 6);
        }
        player.potionEffects.add("kubejs:chaotic_teleport", 20 * 30, 0);
    }
});



/**
 * 灼热魔力效果
 */
function blazing_magic(event) {
    const player = event.player;
    if (!player || !player.hasEffect("kubejs:blazing_magic_set")) return;

    const effect = player.getEffect("kubejs:blazing_magic_set");
    const chance = (effect.getAmplifier() + 1) * 0.2;

    // 概率判定通过时
    if (Math.random() < chance) {
        const existingEffect = player.getEffect("kubejs:blazing_magic");
        let newAmplifier = 0;

        if (existingEffect) {
            newAmplifier = Math.min(existingEffect.getAmplifier() + 1, 9);
        }

        if (newAmplifier <= 9) {
            player.potionEffects.add("kubejs:blazing_magic", 20 * 8, newAmplifier);
        }
    }
}

/**
 * 魔源回火效果
 * 释放炽焰学派法术后，概率恢复法力值
 */
function mana_quenching(event) {
    const player = event.player;
    if (!player || !player.hasEffect("kubejs:mana_quenching")) return;
    const effect = player.getEffect("kubejs:mana_quenching");
    const level = effect.getAmplifier() + 1;
    let magicData = getPlayerMagicData(player)

    // 触发概率 = 词条等级 × 40%
    if (Math.random() < level * 0.4) {
        // 恢复法力值 = 词条等级 × 10
        const manaToRestore = level * 10;
        magicData.addMana(manaToRestore)
    }
}



// 在施法时触发，可以修改法术属性
ISSEvents.spellOnCast(event => {
    let player = event.player
    if (player.hasEffect("kubejs:mithril_ingot")) {
        let blood_spell_power = player.getAttribute('irons_spellbooks:blood_spell_power')?.value ?? 1;
        let eldritch_spell_power = player.getAttribute('irons_spellbooks:eldritch_spell_power')?.value ?? 1;
        let ender_spell_power = player.getAttribute('irons_spellbooks:ender_spell_power')?.value ?? 1;
        let evocation_spell_power = player.getAttribute('irons_spellbooks:evocation_spell_power')?.value ?? 1;
        let fire_spell_power = player.getAttribute('irons_spellbooks:fire_spell_power')?.value ?? 1;
        let holy_spell_power = player.getAttribute('irons_spellbooks:holy_spell_power')?.value ?? 1;
        let ice_spell_power = player.getAttribute('irons_spellbooks:ice_spell_power')?.value ?? 1;
        let lightning_spell_power = player.getAttribute('irons_spellbooks:lightning_spell_power')?.value ?? 1;
        let dream_spell_power = player.getAttribute('kubejs:dream_spell_power')?.value ?? 1;

        event.setSpellLevel(event.originalSpellLevel + 1)
    }
})


/**
 * 检测当前释放法术的学派
 * @param {Internal.SpellPostCastEvent} event 
 * @returns {string|null} 返回学派ID，如果不是已知法术则返回null
 */
function detectSpellSchool(event) {
    const player = event.player;
    if (!player || player.removed) return null;

    // 从magicData中提取法术ID
    const magicDataStr = event.player.magicData.toString();
    const spellIdMatch = magicDataStr.match(/spellID:([^\],]+)/);
    const spellId = spellIdMatch ? spellIdMatch[1].trim() : null;

    if (!spellId) return null;

    // 从映射表中查找学派
    return SPELL_SCHOOL_MAP[spellId] || null;
}

// 学派属性映射表
const SCHOOL_ATTRIBUTES = {
    "irons_spellbooks:blood": 'irons_spellbooks:blood_spell_power',
    "irons_spellbooks:eldritch": 'irons_spellbooks:eldritch_spell_power',
    "irons_spellbooks:ender": 'irons_spellbooks:ender_spell_power',
    "irons_spellbooks:evocation": 'irons_spellbooks:evocation_spell_power',
    "irons_spellbooks:fire": 'irons_spellbooks:fire_spell_power',
    "irons_spellbooks:holy": 'irons_spellbooks:holy_spell_power',
    "irons_spellbooks:ice": 'irons_spellbooks:ice_spell_power',
    "irons_spellbooks:lightning": 'irons_spellbooks:lightning_spell_power',
    "kubejs:dream": 'kubejs:dream_spell_power'
};

/**
 * 应用跨流派法术等级加成
 * 规则：每15%有效额外强度 = +1法术等级
 */
function applyCrossSchoolLevelBonus(event) {
    const player = event.player;
    if (!player.hasEffect("kubejs:mithril_ingot")) return;

    const school = detectSpellSchool(event);
    if (!school) return;

    const rawSpellPower = player.getAttribute('irons_spellbooks:spell_power')?.value ?? 1.0;
    const extraSpellPower = Math.max(rawSpellPower - 1.0, 0);

    let totalExtraPower = 0;
    const otherSchools = Object.keys(SCHOOL_ATTRIBUTES).length - 1;

    for (const [schoolId, attribute] of Object.entries(SCHOOL_ATTRIBUTES)) {
        if (schoolId !== school) {
            const power = player.getAttribute(attribute)?.value ?? 1.0;
            totalExtraPower += Math.max(power - 1.0, 0);
        }
    }

    const sharedSpellPower = extraSpellPower / otherSchools;
    const effectiveExtraPower = totalExtraPower + sharedSpellPower;

    const bonusLevels = Math.min(
        Math.floor(effectiveExtraPower / 0.15),
        8
    );

    if (bonusLevels > 0) {
        event.setSpellLevel(event.originalSpellLevel + bonusLevels);
    }
}

ISSEvents.spellOnCast(event => {
    applyCrossSchoolLevelBonus(event);
})

//法术事件总线
ISSEvents.spellPostCast(event => {
    const school = detectSpellSchool(event);
    if (school) {
        // 学派处理逻辑
        switch (school) {
            case "irons_spellbooks:fire":
                //炽焰法术流派
                blazing_magic(event);
                mana_quenching(event);
                break;
            case "irons_spellbooks:nature":
                //自然法术流派
                break;
            case "irons_spellbooks:evocation":
                //召唤法术流派
                break;
            case "irons_spellbooks:ender":
                //末影法术流派
                break;
            case "irons_spellbooks:ice":
                //冰霜法术流派
                break;
            case "familiarslib:sound":
                //旋律法术流派
                break;
            case "irons_spellbooks:holy":
                //神圣法术流派
                break;
            case "irons_spellbooks:blood":
                //猩红法术流派
                break;
            case "irons_spellbooks:lightning":
                //雷霆法术流派
                break;
            case "kubejs:dream":
                //幻梦法术流派
                break;
            case "irons_spellbooks:eldritch":
                //远古巫术
                break;
            default:
                // 未知学派处理
                break;
        }
    }
});

// 监听法术施放事件
ISSEvents.spellOnCast(event => {
    if (!event.entity == "minecraft:player") return
    if (!event.entity.hasEffect("kubejs:spell_level_up_2")) return
    event.setSpellLevel(event.originalSpellLevel + 2)  // 提高法术等级
    event.setManaCost(event.manaCost + 50)             // 增加法力消耗
})