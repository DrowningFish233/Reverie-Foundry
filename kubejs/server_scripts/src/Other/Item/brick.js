ItemEvents.rightClicked('minecraft:brick', event => {
    const { player, level } = event;
    const brickEntityType = "kubejs:brick";
    const viewVector = player.getViewVector(1.0);
    const brickX = player.x + viewVector.x() * 0.5;
    const brickY = player.y + player.getEyeHeight();
    const brickZ = player.z + viewVector.z() * 0.5;

    const brickProjectile = level.createEntity(brickEntityType);
    brickProjectile.setPosition(brickX, brickY, brickZ);
    event.player.swing();

    const throwForce = 2;
    brickProjectile.setMotion(
        viewVector.x() * throwForce,
        viewVector.y() * throwForce,
        viewVector.z() * throwForce
    );

    brickProjectile.setOwner(event.player);
    brickProjectile.spawn();
    player.addItemCooldown(event.item, 10);
    event.item.count -= 1;
});