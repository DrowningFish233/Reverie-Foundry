const curiosEffects = new Map([
    ['kubejs:bleed_curios', (player, event) => {
        player.potionEffects.add("kubejs:bleed", 20 * 5, 0);
    }],
    ['kubejs:blue_star', (player, event) => {
        player.potionEffects.add("minecraft:speed", 20 * 5, 1);
    }],
    ['kubejs:mana_potion', (player, event) => {
        player.potionEffects.add("kubejs:mana_potion", 20 * 5, 0);
    }],
    ['kubejs:totem_of_undying', (player, event) => {
        player.potionEffects.add("minecraft:health_boost", 20 * 5, 4);
        player.potionEffects.add("minecraft:regeneration", 20 * 5, 0);

    }],
    ['kubejs:heart_of_darkness', (player, event) => {
        const { x, y, z } = player;
        player.potionEffects.add('kubejs:heart_of_darkness', 20 * 3, 0);
        if (player.hasEffect('kubejs:heart_of_darkness')) {
            if (!player.hasEffect('kubejs:use_adrenaline')) {
                if (!player.hasEffect('kubejs:no_adrenaline')) {
                    const currentAdrenaline = player.persistentData.getInt("adrenaline");
                    if (currentAdrenaline < 100) {
                        player.persistentData.putInt("adrenaline", currentAdrenaline + 1);
                        if (currentAdrenaline + 1 === 100) {
                            let playerName = getplayerName(player.toString());
                            player.tell(`§e${playerName}的肾上腺素充能完毕！`)
                            event.server.runCommandSilent(`playsound kubejs:full_adrenaline player ${playerName} ${x} ${y} ${z} 1 1`);
                        }
                    }
                }
            }
        } else {
            player.persistentData.putInt("adrenaline", 0);
        }
    }]
]);


const playerCache = new WeakMap();

PlayerEvents.tick(event => {
    const player = event.player;
    if (!player) return;

    if (player.tickCount % 20 !== 0) return;

    let cachedEquipped = playerCache.get(player);
    const nowEquipped = new Set();

    for (const [curioId] of curiosEffects) {
        if (curiosHelper.findFirstCurio(player, curioId).isPresent()) {
            nowEquipped.add(curioId);

            if (!cachedEquipped || !cachedEquipped.has(curioId)) {
                curiosEffects.get(curioId)(player, event);
            }
        }
    }
    playerCache.set(player, nowEquipped);
});
