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
 * 应用跨流派法术等级加成
 * 规则：各个法术流派的法术强度会对玩家的法术施法等级提供加成
 * 总法术强度(irons_spellbooks:spell_power)会影响所有法术，需要平均分配到各流派
 */
function applyCrossSchoolLevelBonus(event) {
    const player = event.player;

    // 前置条件检查
    if (!fu_hasTraitAnywhere(player, "kubejs:mithril_ingot")) return;

    const spell = event.getSpell();
    const school = spell.getSchoolType().getId();

    if (!school) return;

    // 获取所有法术流派数量
    const totalSchools = Object.keys(SCHOOL_ATTRIBUTES).length;
    if (totalSchools <= 1) return; // 只有一个流派时不需要跨流派加成

    // 基础加成部分
    const rawSpellPower = player.getAttribute('irons_spellbooks:spell_power')?.value ?? 1.0;
    const baseExtraPower = Math.max(rawSpellPower - 1.0, 0);

    // 总法术强度平均分配到各流派
    const sharedPowerPerSchool = baseExtraPower / totalSchools;

    let otherSchoolsExtraPower = 0;
    let validOtherSchoolsCount = 0;

    for (let [schoolId, attribute] of Object.entries(SCHOOL_ATTRIBUTES)) {
        if (schoolId !== school) {
            const schoolPower = player.getAttribute(attribute)?.value ?? 1.0;
            const schoolExtraPower = Math.max(schoolPower - 1.0, 0);
            otherSchoolsExtraPower += schoolExtraPower;
            validOtherSchoolsCount++;
        }
    }

    // 计算有效额外强度 = 其他流派自身强度 + 总强度分配的部分
    const effectiveExtraPower = otherSchoolsExtraPower + (sharedPowerPerSchool * validOtherSchoolsCount);

    //每15%有效额外强度 = +1法术等级
    const bonusLevels = Math.min(
        Math.floor(effectiveExtraPower / 0.15),
        8 // 最大加成
    );

    // 应用加成
    if (bonusLevels > 0) {
        const originalLevel = event.originalSpellLevel || event.spellLevel;
        const newLevel = originalLevel + bonusLevels;
        event.setSpellLevel(newLevel);
    }
}


/**
 * MagicData获取
 */
function getPlayerMagicData(player) {
    return $MagicData.getPlayerMagicData(player);
}

/**
 * 强制玩家施放指定法术
 * 
 * @param {ResourceLocation} resourceLocation 法术的资源标识符
 * @param {number} amplifier 法术的等级
 * @param {Player} player 施法的实体
 * @param {boolean} consume 是否消耗法力值
 */
function overLimitSpellCast(resourceLocation, amplifier, player, consume) {
    $SpellRegistry["getSpell(net.minecraft.resources.ResourceLocation)"](resourceLocation).attemptInitiateCast(Item.of('air'), amplifier, player.level, player, $CastSource.NONE, consume, "main_hand")
}

// 获取当前施放的法术ID
function getSpellId(event) {
    let magicData = event.getMagicData();
    if (magicData) {
        return magicData.getCastingSpellId();
    }
    return null; // 如果无法获取，返回 null
}

function reduceMana(event) {
    if (!event || !event.player) return;
    let player = event.player;
    let magicData = getPlayerMagicData(player);
    let currentMana = magicData.getMana();
    let manaCost = currentMana / 10;
    magicData.setMana(currentMana - manaCost);
}

/**
 * 检测当前释放法术的学派 || 神秘穷举 
 * @param {Internal.SpellPostCastEvent} event 
 * @returns {string|null} 返回学派ID，如果不是已知法术则返回null
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
*/
