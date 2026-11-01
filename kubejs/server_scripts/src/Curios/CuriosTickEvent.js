const curiosEffects = new Map([
    ['kubejs:blue_star', (player, event) => {
        player.potionEffects.add("minecraft:speed", 20 * 5, 1);
    }],
    ['kubejs:mana_regeneration_band', (player, event) => {
        player.heal(0.2)
    }],
    ['kubejs:totem_of_undying', (player, event) => {
        player.potionEffects.add("minecraft:health_boost", 20 * 5, 4);
        player.potionEffects.add("minecraft:regeneration", 20 * 5, 0);
    }],
    ['kubejs:papyrus_scarab', (player, event) => {
        player.potionEffects.add("kubejs:minion_capacity", 20 * 6, 0)
    }],
    ['kubejs:red_skull', (player, event) => {
        let currentHealth = player.getHealth();
        let maxHealth = player.getMaxHealth();
        let healthPercentage = currentHealth / maxHealth;
        if (healthPercentage <= 0.5) {
            player.potionEffects.add("minecraft:strength", 20 * 3, 2);
        }
    }],
    ['kubejs:melting_eyeball', (player, event) => {
        player.potionEffects.add("kubejs:protect", 20 * 3, 0);
    }],
    ['kubejs:heart_of_darkness', (player, event) => {
        const now = player.level.getTime();
        const lastHurt = player.persistentData.getLong("lastHurtTick");

        const safeTime = 100;

        if (now - lastHurt > safeTime) {
            player.potionEffects.add('minecraft:regeneration', 20 * 2, 1);
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

    for (let [curioId] of curiosEffects) {
        if (curiosHelper.findFirstCurio(player, curioId).isPresent()) {
            nowEquipped.add(curioId);

            if (!cachedEquipped || !cachedEquipped.has(curioId)) {
                curiosEffects.get(curioId)(player, event);
            }
        }
    }
    playerCache.set(player, nowEquipped);
});
