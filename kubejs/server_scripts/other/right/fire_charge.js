//让玩家可以发射火焰弹
ItemEvents.rightClicked('minecraft:fire_charge', event => {
    const { player, level } = event;
    const fireballEntity = "minecraft:fireball";
    const viewVector = player.getViewVector(1.0);
    const fireballX = player.x + viewVector.x() * 0.5;
    const fireballY = player.y + player.getEyeHeight();
    const fireballZ = player.z + viewVector.z() * 0.5;

    const fireball = level.createEntity(fireballEntity);
    fireball.setPosition(fireballX, fireballY, fireballZ);

    const velocity = 3;
    fireball.setMotion(viewVector.x() * velocity, viewVector.y() * velocity, viewVector.z() * velocity);
    fireball.setOwner(event.player);
    fireball.mergeNbt({ ExplosionPower: 1.5 })
    fireball.spawn();
    player.addItemCooldown(event.item, 20);
    event.item.count -= 1
});