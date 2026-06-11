/*蚀智之戒*/
NetworkEvents.dataReceived("key.test_2", (event) => {
    const player = event.player
    if (!player) return;
    showsanity(event, player);
});

/*使用肾上腺素*/
NetworkEvents.dataReceived("key.test_3", (event) => {
    const { player, level } = event
    if (!player) return;
    const { x, y, z } = player;
    const pData = player.persistentData;
    let playerName = getplayerName(player.toString());
    const the_adrenaline = pData.getInt("adrenaline");
    if (the_adrenaline == 100) {
        player.potionEffects.add("kubejs:use_adrenaline")
        pData.putInt("adrenaline", 0);

        level.spawnParticles(
            'minecraft:angry_villager',  // arg0: 粒子类型
            true,                        // arg1: 是否强制显示
            player.x,                    // arg2: 粒子生成位置的X坐标
            player.y + 1,                // arg3: 粒子生成位置的Y坐标
            player.z,                    // arg4: 粒子生成位置的Z坐标
            0.5,                         // arg5: X方向的偏移量/扩散范围
            0.5,                         // arg6: Y方向的偏移量/扩散范围
            0.5,                         // arg7: Z方向的偏移量/扩散范围
            20,                          // arg8: 生成的粒子数量（整数）
            0.1                          // arg9: 粒子速度
        )
        event.level[$playersound]
            (null, player.x, player.y, player.z, "kubejs:use_adrenaline", "players", 0.6, 1)
    }
});

/*血欲-红舞鞋*/
NetworkEvents.dataReceived("key.test_5", (event) => {
    const player = event.player;
    if (!player) return;
    const itemId = "kubejs:red_shoes";
    const itemStack = getCuriosItem(player, itemId);
    if (itemStack !== null) {
        let pData = player.persistentData;
        let now_Sanity = pData.getInt("sanity") ?? 0;
        if (now_Sanity - 50 >= -5) {
            updateplayersanity(player, now_Sanity - 50)
            player.potionEffects.add("kubejs:bloodlust_attack", 20 * 16, 0);
        } else {
            const maxHealth = player.getMaxHealth();
            const damageAmount = maxHealth * 0.3;
            player.potionEffects.add("kubejs:bloodlust_attack", 20 * 16, 0);
            attackEntity(player, "minecraft:generic", player.getMaxHealth() - damageAmount, true)
        }
    }
});

/*血欲-红舞鞋*/
NetworkEvents.dataReceived("key.test_6", (event) => {
    const player = event.player;
    if (!player) return;
    const itemId = "kubejs:melting_eyeball";
    const itemStack = getCuriosItem(player, itemId);
    if (itemStack !== null) {
        player.potionEffects.add("kubejs:melting_eyeball_ego_effect", 20 * 20, 0);
    }
});
