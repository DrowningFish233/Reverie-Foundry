EntityEvents.beforeHurt(event => {
    const { source, entity } = event;
    const player = source.player || source.actual;

    if (!player || !player.isLiving()) {
        return;
    }

    let optionalCurios = api.getCuriosHelper().getEquippedCurios(player);
    if (!optionalCurios.isPresent()) {
        return;
    }
    let curios = optionalCurios.get();
    for (let slot = 0; slot < curios.getSlots(); slot++) {
        let itemStack = curios.getStackInSlot(slot);
        if (!itemStack.isEmpty()) {
            let itemId = itemStack.getId();
            if (curios_event_attack[itemId]) {
                curios_event_attack[itemId](event, curios, slot, itemStack, player, entity);
            }
        }
    }


})


const curios_event_attack = {
    'kubejs:fragment_of_the_universe': function (event, curios, slot, itemStack, player, entity) {
        if (itemStack !== null) {
            const pData = player.persistentData;
            let sanity = pData.getInt("sanity");

            const hasLucidEffect = player.hasEffect("kubejs:lucid");

            if (sanity >= 10 && !hasLucidEffect) {
                if (Math.random() < 0.5) {
                    player.potionEffects.add("kubejs:lucid", 20 * 30, 0);
                    if (Math.random() < 0.5) {
                        updateplayersanity(player, sanity - 5)
                        new_damage(event, STAGE.ADDITIVE, 1.4);
                    }
                }
            }
        }
    },
    'kubejs:dps_meter_update': function (event, curios, slot, itemStack, player, entity) {
        if (itemStack !== null) {
            let damage = event.damage;
            let target = entity;
            let targetHealth = target.getHealth();
            let targetMaxHealth = target.getMaxHealth();

            // 获取时间戳
            let timestamp = new Date().toLocaleTimeString();

            let healthPercentage = ((targetHealth / targetMaxHealth) * 100).toFixed(2);
            let remainingHealth = Math.max(0, targetHealth - damage);
            let remainingPercentage = ((remainingHealth / targetMaxHealth) * 100).toFixed(2);

            let formattedDamage = damage.toFixed(2);
            let formattedTargetHealth = targetHealth.toFixed(2);
            let formattedTargetMaxHealth = targetMaxHealth.toFixed(2);
            let formattedRemainingHealth = remainingHealth.toFixed(2);

            let logMessage =
                `§6§l[伤害统计] §7[${timestamp}]§r
                §a攻击者: §f${player.getName().getString()}
                §a目标: §f${entity.getName().getString()}
                §a目标血量: §c${formattedTargetHealth}§f/§a${formattedTargetMaxHealth} §7(${healthPercentage}%)
                §a造成伤害: §c${formattedDamage}
                §a剩余血量: §${remainingHealth > 0 ? 'a' : 'c'}${formattedRemainingHealth} §7(${remainingPercentage}%)`;
            player.tell(logMessage);
        }
    }
};
