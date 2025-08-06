NetworkEvents.dataReceived("key.test", (event) => {
    const player = event.player
    if (!player || !player.hasEffect("kubejs:wither_howitzer")) return;

    let pData = player.persistentData;
    const witherhowitzer = pData.getInt(wither_howitzer)

    if (witherhowitzer <= 0) return;

    const direction = player.getLookAngle();
    const force = 2.5;
    player.hurtMarked = true
    player.addMotion(
        direction.x * force,
        0,
        direction.z * force
    );
    player.potionEffects.add("minecraft:speed", 20 * 3, 1);
    player.setStatusMessage(`§6虎标弹充能: §e${witherhowitzer - 1}/8`);
    pData.putInt("wither_howitzer", witherhowitzer - 1);
});

NetworkEvents.dataReceived("key.test_4", (event) => {
    const player = event.player;
    if (!player) return;

    let pData = player.persistentData;
    let magicSwitch = pData.getInt("magicSwitch") || 0;

    magicSwitch = magicSwitch === 0 ? 1 : 0;
    pData.putInt("magicSwitch", magicSwitch);

    // 反馈给玩家
    player.tell(`铁木锭功能开关已 ${magicSwitch === 1 ? "启用" : "禁用"} (状态: ${magicSwitch})`);
});