// priority: 10
// 每刻更新罪孽状态事件
// 暴怒tick级处理逻辑
PlayerEvents.tick(event => {
    let player = event.player;
    if (!player) return;
    if (player.tickCount % 20 != 0) return;
    let isWRATH = player.persistentData.getInt(sins.WRATH) || 0;
    if (isWRATH > 0) {
        handleWrathEffect(event);
    }
});


function handleWrathEffect(event) {
    let player = event.player
    const DAMAGE_AMOUNT = player.getMaxHealth()
    const DAMAGE_AMOUNT_2 = DAMAGE_AMOUNT / 10
    let idleTimer = player.persistentData.getInt("idleTimer");
    idleTimer += 20;
    player.persistentData.putInt("idleTimer", idleTimer);
    if (idleTimer >= IDLE_TIME) {
        player.attack($DamageSource("kubejs:wrath"), DAMAGE_AMOUNT_2);
        player.persistentData.putInt("idleTimer", 0);
    }
}

/**
 * 暴怒效果 
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function wrath_onPlayerHurt(event) {
    const { source, entity } = event;
    const attacker = source.actual;

    if (!entity.isLiving() || !entity.isPlayer() || !entity.hasEffect("kubejs:wrath")) {
        return; // 不满足条件则直接退出
    }
    if (!attacker || !attacker.isLiving()) return;

    // 对攻击者施加效果
    attacker.potionEffects.add('minecraft:glowing', 400, 0); // 20秒发光
    attacker.potionEffects.add('kubejs:wrath_damage', 400, 0); // 20秒标记

}

function wrath_effect(event) {
    const { source, entity } = event;
    let attacker = source.player || source.entity;
    if (!entity.isLiving() || !attacker || !attacker.isPlayer() || event.damage <= 0) {
        return;
    }
    if (entity.hasEffect("kubejs:wrath_damage") && attacker.hasEffect("kubejs:wrath")) {
        const currentDamage = event.damage;
        new_damage(event, STAGE.FLAT, currentDamage * 2.0);
        entity.removeEffect("kubejs:wrath_damage")
        entity.removeEffect("minecraft:glowing")
    }
}

//暴怒攻击处理逻辑
function wrathlastAttackTime(event) {
    const { source, entity } = event;
    const attacker = source.player || source.entity;

    if (!attacker || !attacker.isPlayer() || !entity.isLiving() || attacker.hasEffect("kubejs:wrath")) {
        return;
    }
    attacker.persistentData.putInt("idleTimer", 0);
}


