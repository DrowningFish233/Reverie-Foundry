/**
 * 伤害修改模式选择
 * @namespace
 */
const STAGE = {
    /** 百分比增减（影响基础伤害）*/
    ADDITIVE: 1,
    /** 固定值加成（不受任何乘区影响） */
    FLAT: 2,
    /** 独立乘区（仅影响基础伤害部分） */
    MULTIPLY: 3
};
/** 
 * @type {Map<Object, number[]>} 伤害数据映射表，存储每个伤害事件的修改数据
 */
const damageDataMap = new WeakMap();

/**
 * 获取伤害事件的伤害数据
 * @param {Object} event - 伤害事件对象
 * @returns {number[]} 伤害数据数组 [基础伤害, 固定加成, 加算倍率, 独立乘区]
 */
function getDamageData(event) {
    let data = damageDataMap.get(event);
    if (!data) {
        /**  [基础伤害, 固定加成, 加算倍率, 独立乘区] */
        data = [event.getDamage(), 0, 0, 1];
        damageDataMap.set(event, data);
    }
    return data;
}

/**
 * 伤害修改总逻辑
 * @param {Object} event - 伤害事件对象
 * @param {STAGE} stage - 伤害修改阶段/模式
 * @param {number} value - 修改值
 * @example
 * // 增加50%基础伤害
 * new_damage(event, STAGE.ADDITIVE, 1.5);
 * 
 * // 增加10点固定伤害
 * new_damage(event, STAGE.FLAT, 10);
 * 
 * // 增加20%独立乘区
 * new_damage(event, STAGE.MULTIPLY, 1.2);
 */
function new_damage(event, stage, value) {
    const data = getDamageData(event);

    switch (stage) {
        case STAGE.FLAT:
            data[1] += value;      // 伤害加成
            break;

        case STAGE.ADDITIVE:
            data[2] += value - 1;  // 百分比加成
            break;

        case STAGE.MULTIPLY:
            data[3] *= value;     // 独立乘区
            break;
    }
    /** (基础伤害 × (1 + 加算) × 独立乘区) + 固定加成 */
    event.setDamage((data[0] * (1 + data[2]) * data[3]) + data[1])
}

/**
 * 总效果类层
 */
function allthe_event(event) {
    paralysis_effect(event);    //麻痹效果
    all_dynamic_damage(event)   //动态减伤!
    other_effect(event);    //其他药水效果处理
    depravityDamage(event);     //沉沦受伤机制
    allthe_sin_event(event);    //七罪效果
    allthe_curios_hurt_event(event);    //饰品效果
    spell_type(event);  //法术效果处理
    affix_event(event); //词缀效果
    death_time(event);  //濒死处理
}
/**
 * 其他药水效果处理
 */
function other_effect(event) {
    elemental_mix(event);
    lightning_electrified(event);
    plunder_effect(event);
    old_fashioned_effect(event);
    moonshine_effect(event);
    moscow_mule_effect(event);
    bloody_mary_effect(event);
    everclear_effect(event);
    vodka_effect(event);
    purple_haze_effect(event);
    whiskey_effect(event);
    eternal_life(event);
    rune_of_deflection_effect(event);
    bloodlust_attack(event);
    handleBleed(event);
    hurtEffect(event);
    melting_eyeball_ego_attack(event);
    damage_amplification(event);
    kubejs_arrow(event);
    chainmail_arrow(event);
    disillusionment(event);
    sloth_2(event);
    protect(event);
}
/**
 * 七罪效果
 */
function allthe_sin_event(event) {
    sanityattack(event);
    gluttony(event);
    envy(event);
    envy_damage(event);
    GREED_hurt(event);
    lust_effect(event);
    lust_extra_damage(event);
    wrathlastAttackTime(event);
    wrath_onPlayerHurt(event);
    wrath_effect(event);
    sloth(event);
    sloth_morning_moodiness(event);
    pride(event);

}
/**
 * 词缀效果
 */
function affix_event(event) {
    vorant_ingot(event);
    gobber(event);
    gobberhurt(event);
    echo_ingot(event);
    farmersdelight(event);
    arcane_ingot(event);
    polonium_ingot(event);
    I_am_darkness(event);
    I_am_justice(event);
    Comet_Trait(event);
    starfire(event);
    malarite(event);
    tenacious_vine_effect(event);
    combustion_boost(event);
    aethersent_ingot(event);
    witherbone(event);
    wither_howitzer_attack(event);
    fiery_tears_attack(event);
    malignant_pewter_ingot(event);
    mithril_ingot(event);
    ignitium_ingot(event);
    ancient_metal_ingot(event);
    monkey(event);
    echo_shard(event);
    set_ponder(event);
    knockback(event);
    bismuthgems(event);
    overload(event);
    animated_steel_ingot(event);
    achroous_ingot(event);
    mob_sanity(event);
    generic_luck(event);
    aquamarine(event);
    tanzanite(event);
    tooth_of_hunger_remastered(event);
    thermal_springstone_ingot(event);
    moonstone(event);
    dragonsteel_fire_ingot(event);
    dragonsteel_lightning_ingot(event);
    dragonsteel_ice_ingot(event);
    alexandrite(event);
    spinel(event);
    amber(event);
    pearl(event);
    naughty(event);
    topaz(event);
    bloodjade_set(event);
    iridescence(event);
    multicolor(event);
    six_life_death(event);
    corroded(event);
    wolf(event);
    boom_effects(event);
    seraph(event);
    numbness_effects(event);
    set_numbness_effects(event);
    life_drain(event);
    maxhealth(event);
    exalted_beauty_gem(event);
    citrine(event);
    intrinsic(event);
    fluxing(event);
    systemtime(event);
}

/** 
 * 左键攻击触发魔法总事件
 */
ItemEvents.firstLeftClicked(event => {
    const player = event.player;
    if (!player) return;

    irons_spellbooks_guiding_bolt(event);
    irons_spellbooks_chain_lightning(event);

    let magicSwitch = player.persistentData.getInt("magicSwitch") || 0;
    if (magicSwitch == 1) {
        irons_spellbooks_root(event);
    }

});


/**
 * 受伤事件修改逻辑
 */
EntityEvents.beforeHurt(allthe_event);


/**
 * 玩家Tick词缀事件总线
 */
PlayerEvents.tick(event => {
    const player = event.player;
    if (!player) return;
    const tick = player.tickCount;
    meat_ingots(event, tick);
    atalphaite(event, player, tick);
    if (tick % 23 === 0) {
        prismarine_crystals(event, player);
        calamatium_ingot_effect(event, player)
    }
    if (tick % 43 === 0) {
        lunium_nova(event, player);
        fiery_tears(event, player, tick)

    }
    if (tick % 41 === 0) {
        lacrima(event, player);
        kubejs_emerald(event, player);
    }
    if (tick % 87 === 0) {
        celeslar_ingot(event, player)
    }
    if (tick % 101 === 0) {
        eternal_starlight(event, player);
        achroous_ingot_tick(event, player);
        heartstop(event, player);
    }
    if (tick % 199 === 0) {
        gaze(event, player);
    }
    if (tick % 397 === 0) {
        cursium_ingot(event, player);
    }
})