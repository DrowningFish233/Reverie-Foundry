/**
 * 不知道叫什么名的召唤狼群效果
 */
function wolf(event) {
    const player = event.entity;
    if (player.hasEffect('kubejs:wolf')) {
        let uuid = player.getUuid()
        if (uuid && typeof uuid.toString === "function") {
            uuid = uuid.toString();
        }
        const target = event.player;
        let wolf = target.block.createEntity('minecraft:wolf')
        wolf.mergeNbt({ Owner: uuid });
        wolf.spawn()
    } return;
}