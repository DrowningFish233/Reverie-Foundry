PlayerEvents.tick(event => {
    if (event.server.tickCount % 200 !== 0) return;
    const player = event.player;
    if (!player || !player.living || !player.hasEffect("kubejs:blue_star")) return;
    const itemId = "kubejs:blue_star";
    const itemStack = getCuriosItem(player, itemId);
    if (itemStack !== null) {
        handleBlueStarEffect(event);
    }
});

function handleBlueStarEffect(event) {
    const player = event.player;
    const blueStarRadius = 10;

    const nearbyEntities = player.level.getEntities(
        player,
        player.getBoundingBox().inflate(blueStarRadius)
    ).filter(entity =>
        entity.living &&
        entity.isAlive() &&
        entity !== player
    );

    const playerCurrentHealth = player.getHealth();
    const playerMaxHealth = player.getMaxHealth();
    const healthPercentage = playerCurrentHealth / playerMaxHealth;
    let currentSanity = player.persistentData.getInt("sanity") || 0;
    let baseDamage = Math.max(1, ((currentSanity + 45) / 90) * 45);
    let damage = healthPercentage >= 0.5 ? baseDamage : baseDamage * 2;

    nearbyEntities.forEach(entity => {
        entity.attack($DamageSource("magic"), damage);
    });

    const { x, y, z } = player;
    event.server.runCommandSilent(`playsound kubejs:bluestar_in player @a ${x} ${y} ${z} 1 1`);
}