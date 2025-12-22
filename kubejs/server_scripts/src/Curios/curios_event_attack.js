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
    }
};