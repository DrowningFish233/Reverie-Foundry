/**
 * 处理玩家受伤时的所有Curios饰品事件
 * @param {$BeforeLivingEntityHurtKubeEvent_} event - 玩家受伤事件
 */
function allthe_curios_hurt_event(event) {
    kubejs_curios(event);
}

const api = new $CuriosApi();
/**
 * 检查玩家佩戴的Curios饰品并触发相应受伤效果
 * @param {$BeforeLivingEntityHurtKubeEvent_} event - 玩家受伤事件
 */
function kubejs_curios(event) {
    let player = event.player;
    if (!player) return;

    let optionalCurios = api.getCuriosHelper().getEquippedCurios(player);
    if (!optionalCurios.isPresent()) {
        return;
    }
    let curios = optionalCurios.get();
    for (let slot = 0; slot < curios.getSlots(); slot++) {
        let itemStack = curios.getStackInSlot(slot);
        if (!itemStack.isEmpty()) {
            let itemId = itemStack.getId();
            if (curios_event_hurt[itemId]) {
                curios_event_hurt[itemId](event, curios, slot, itemStack);
            }
        }
    }
}

/**
 * 当玩家受到伤害时，检查佩戴的饰品并触发相应效果
 * 
 * @type {Object.<string, function($BeforeLivingEntityHurtKubeEvent_, any, any, any)>}
 */
const curios_event_hurt = {
    'kubejs:heart_of_darkness': function (event, curios, slot, itemStack) {
        if (itemStack !== null) {
            let player = event.player;
            if (player) {
                const { x, y, z } = player;
                const pData = player.persistentData;
                let playerName = getplayerName(player.toString());
                let sound_adrenaline = pData.getInt("adrenaline");
                if (sound_adrenaline >= 25) {
                    event.level[$playersound]
                        (null, player.x, player.y, player.z, "kubejs:no_adrenaline", "players", 0.6, 0.6)
                }
                player.setStatusMessage(
                    Text.join([
                        Text.of(playerName).color('red'),
                        Text.translate('message.adrenaline.depleted').color('dark_red')
                    ])
                );
                pData.putInt("adrenaline", 0);
                player.potionEffects.add("kubejs:no_adrenaline", 20 * 5, 0);
            }
        }
    },
    'kubejs:totem_of_undying': function (event, curios, slot, itemStack) {
        if (itemStack !== null) {
            let player = event.player;
            if (player) {
                player.heal(player.getMaxHealth() / 50)
                if (Math.random() < 0.05) {
                    player.setHealth(0);
                }
            }
        }
    },
    'kubejs:magic_cuffs': function (event, curios, slot, itemStack) {
        if (itemStack !== null) {
            let player = event.player;
            if (player) {
                let damage = event.getDamage();
                let maxHealth = player.getMaxHealth();
                let damagePercent = (damage / maxHealth) * 100;
                let manaToAdd = damagePercent * 1.2;
                manaToAdd = Math.min(manaToAdd, 100);
                if (manaToAdd > 0) {
                    getPlayerMagicData(player).addMana(manaToAdd);
                    getPlayerMagicData(player).addMana(-1);
                }
            }
        }
    },
    'kubejs:mana_cloak': function (event, curios, slot, itemStack) {
        if (itemStack !== null) {
            let player = event.player;
            if (player) {
                let COOLDOWN_KEY = "mana_cloak_COOLDOWN_KEY"
                if ($CooldownManager.hasCooldown(player, COOLDOWN_KEY)) return
                let level = player.level
                let target = findTarget(player)
                if (target) {
                    $MeteorClass.createMeteorShower(
                        level,
                        player,
                        target,
                        target.x,
                        target.y,
                        target.z,
                        80
                    )
                    // 获取并设置流星尺寸
                    let meteors = level.getEntitiesOfClass($MeteorClass, player.getBoundingBox().inflate(80))
                    meteors.forEach(meteor => {
                        if (meteor.getOwner() == player) { // 只修改玩家召唤的流星
                            meteor.setSize(3)
                        }
                    })
                }
                getPlayerMagicData(player).addMana(50);
                getPlayerMagicData(player).addMana(-1);
                $CooldownManager.setCooldown(player, COOLDOWN_KEY, 140)
            }
        }
    }
};