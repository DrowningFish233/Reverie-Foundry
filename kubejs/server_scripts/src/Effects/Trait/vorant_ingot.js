

/**
 * 
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function vorant_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player;

    if (!attacker || !attacker.isPlayer()) return;

    const item = attacker.getMainHandItem()
    if (item.getId() == "minecraft:air") return;

    if (!fu_hasTraitMainHand(attacker, "kubejs:vorant_ingot")) return;
    const traitLevel = fu_getTraitLevelMainHand(attacker, "kubejs:vorant_ingot");

    let value_mobkill = getDataValue(item, "vorant_ingot_mobkill") || 0;
    let value_playerkill = getDataValue(item, "vorant_ingot_playerkill") || 0;

    if (value_mobkill > 0) {
        let flatDamage = value_mobkill * 0.1
        flatDamage = Math.min(flatDamage, traitLevel * 100)
        new_damage(event, STAGE.FLAT, flatDamage)
    }
    if (value_playerkill > 0) {
        let percentBonus = value_playerkill * 0.01
        percentBonus = Math.min(percentBonus, fu_hasTraitMainHand * 0.1)
        new_damage(event, STAGE.ADDITIVE, 1 + percentBonus)
    }
}

EntityEvents.death(event => {
    let player = event.source.player;
    let entity = event.entity
    if (!player || !entity.isLiving()) return;

    const item = player.getMainHandItem()
    if (item.getId() == "minecraft:air") return;

    if (!fu_hasTraitMainHand(player, "kubejs:vorant_ingot")) return;
    let traitLevel = fu_getTraitLevelMainHand(player, "kubejs:vorant_ingot");

    let MobKill = getDataValue(item, "vorant_ingot_mobkill") || 0
    let PlayerKill = getDataValue(item, "vorant_ingot_playerkill") || 0

    let entity_type = entity.getType()

    if (entity_type == "minecraft:player") {
        PlayerKill++
        player.heal(entity.getMaxHealth() / 10)
        setDataValue(item, "vorant_ingot_playerkill", PlayerKill)

    } else {
        MobKill++
        player.heal(2)
        setDataValue(item, "vorant_ingot_mobkill", MobKill)
    }
})

// 玩家死亡减少计数事件
EntityEvents.death(event => {
    let player = event.player;
    if (!player) return;

    const item = player.getMainHandItem();
    if (item.getId() == "minecraft:air") return;

    if (!fu_hasTraitMainHand(player, "kubejs:vorant_ingot")) return;

    // 安全获取当前值
    let current_mobkill = getDataValue(item, "vorant_ingot_mobkill") || 0
    let current_playerkill = getDataValue(item, "vorant_ingot_playerkill") || 0

    const mobkill_loss = Math.max(1, Math.floor(current_mobkill * 0.25));
    const playerkill_loss = Math.max(1, Math.floor(current_playerkill * 0.25));

    let new_mobkill = Math.max(0, current_mobkill - mobkill_loss);
    let new_playerkill = Math.max(0, current_playerkill - playerkill_loss);

    if (new_mobkill !== current_mobkill) {
        setDataValue(item, "vorant_ingot_mobkill", new_mobkill);

        if (mobkill_loss > 0) {
            player.tell(Text.of("§c你的武器失去了 " + mobkill_loss + " 个生物击杀计数！"));
        }
    }

    if (new_playerkill !== current_playerkill) {
        setDataValue(item, "vorant_ingot_playerkill", new_playerkill);

        if (playerkill_loss > 0) {
            player.tell(Text.of("§c你的武器失去了 " + playerkill_loss + " 个玩家击杀计数！"));
        }
    }
})