ItemEvents.rightClicked('kubejs:starfury', event => {
    const { player, level } = event;
    const starEntity = "irons_spellbooks:guiding_bolt";
    const distance = 4;
    const viewVector = player.getViewVector(1.0);

    const startX = player.x + viewVector.x() * distance;
    const startY = player.y + 5;
    const startZ = player.z + viewVector.z() * distance;
    const starCount = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < starCount; i++) {
        const spread = 2;
        const offsetX = (Math.random() - 0.5) * spread;
        const offsetZ = (Math.random() - 0.5) * spread;

        const starX = startX + offsetX;
        const starY = startY;
        const starZ = startZ + offsetZ;

        const projectile = level.createEntity(starEntity);
        projectile.setPosition(starX, starY, starZ);
        const velocity = 3;
        projectile.setMotion(0, -velocity, 0);

        projectile.setOwner(event.player);

        projectile.spawn();
    }
    player.addItemCooldown(event.item, 20);
});