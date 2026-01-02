NetworkEvents.dataReceived("key.test", (event) => {
    const player = event.player
    const { level } = event
    if (!player || !fu_hasTraitAnywhere(player, "kubejs:wither_howitzer")) return;

    let pData = player.persistentData;
    const witherhowitzer = pData.getInt(wither_howitzer);

    if (witherhowitzer <= 0) return;

    const direction = player.getLookAngle();
    const force = 2.5;

    level.spawnParticles(
        'cataclysm:dust_blast',  // 粒子类型
        true,               // 强制显示
        player.x,             // 身后的X坐标
        player.y,             // Y坐标
        player.z,             // 身后的Z坐标
        0.3,                // X方向扩散范围
        0.3,                // Y方向扩散范围
        0.3,                // Z方向扩散范围
        10,                 // 粒子数量
        0.1                 // 粒子速度
    )
    player.hurtMarked = true
    player.addMotion(
        direction.x * force,
        0,
        direction.z * force
    );
    player.potionEffects.add("minecraft:speed", 20 * 3, 1);
    player.setStatusMessage(
        Text.translate('message.wither_howitzer.charge', [
            witherhowitzer - 1,  // 当前充能值
            8                    // 最大充能值
        ])
            .color('gold')
            .append(" ")
            .append(Text.of(`${witherhowitzer - 1}/8`).color('yellow'))
    );

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
    player.tell(
        Text.translate('message.ironwood_switch', [
            magicSwitch === 1 ?
                Text.translate('state.enabled') :
                Text.translate('state.disabled'),
            Text.of(magicSwitch).color('white')
        ])
    );
});


