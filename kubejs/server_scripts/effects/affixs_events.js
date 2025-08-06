const STAGE = {
    ADDITIVE: 1,    // 百分比增减（影响基础伤害）
    FLAT: 2,        // 固定值加成（不受任何乘区影响）
    MULTIPLY: 3     // 独立乘区（仅影响基础伤害部分）
};

const damageDataMap = new WeakMap();


function getDamageData(event) {
    let data = damageDataMap.get(event);
    if (!data) {
        // [基础伤害, 固定加成, 加算倍率, 独立乘区]
        data = [event.damage, 0, 0, 1];
        damageDataMap.set(event, data);
    }
    return data;
}

//伤害修改总逻辑
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

    // 最终公式：(基础伤害 × (1 + 加算) × 独立乘区) + 固定加成
    event.setDamage((data[0] * (1 + data[2]) * data[3]) + data[1])
}

/**
 * 总效果类层
 */
function allthe_event(event) {
    other_effect(event);
    depravityDamage(event); //沉沦受伤机制
    allthe_sin_event(event); //七罪效果
    allthe_curios_hurt_event(event);//饰品效果
    affix_event(event);//词缀效果
    death_time(event);//时间节点:濒死
}
/**
 * 其他药水效果处理
 */
function other_effect(event) {
    handleBleed(event);
    hurtEffect(event);
    handleTremor(event);
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
    fiery_ingot(event);
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
    if (tick % 20 === 0) {
        prismarine_crystals(event, player)
    }
    if (tick % 40 === 0) {
        fiery_tears(event, player, tick)
        lacrima(event, player);
        kubejs_emerald(event, player);
    }
    if (tick % 100 === 0) {
        achroous_ingot_tick(event, player);
        heartstop(event, player);
    }
    if (tick % 200 === 0) {
        gaze(event, player);
    }
    if (tick % 400 === 0) {
        cursium_ingot(event, player);
    }
})
