function allthe_curios_hurt_event(event) {
    kubejs_curios(event);
}

const api = new $CuriosApi();

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

const curios_event_hurt = {
    'kubejs:bleed_curios': function (event, curios, slot, itemStack) {
        if (itemStack !== null) {
            let player = event.player;
            if (player) {
                player.potionEffects.add("kubejs:bleed", 20 * 5, 0);
            }
        }
    },
    'kubejs:heart_of_darkness': function (event, curios, slot, itemStack) {
        if (itemStack !== null) {
            let player = event.player;
            if (player) {
                const { x, y, z } = player;
                const pData = player.persistentData;
                let playerName = getplayerName(player.toString());
                let sound_adrenaline = pData.getInt("adrenaline");
                if (!sound_adrenaline < 25) {
                    event.server.runCommandSilent(`playsound kubejs:no_adrenaline player ${playerName} ${x} ${y} ${z} 1 1`);
                }
                player.setStatusMessage(`${playerName}的肾上腺素归零了！`)
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
                if (Math.random() < 0.01) {
                    player.setHealth(0);
                }
            }
        }
    }
};

