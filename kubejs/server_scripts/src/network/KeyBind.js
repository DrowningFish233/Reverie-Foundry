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


NetworkEvents.dataReceived("key.test_7", (event) => {
    const player = event.player;
    if (!player) return;

    let LIGHTNING_COOLDOWN = "lightning_dragon_breath_cooldown"
    let FIRE_COOLDOWN = "fire_dragon_breath_cooldown"
    let ICE_COOLDOWN = "ice_dragon_breath_cooldown"

    let hasAnySpell = false;

    if (fu_hasTraitAnywhere(player, 'kubejs:lightning_dragon_blood')) {
        let traitLevel = fu_getHighestTraitLevelAnywhere(player, 'kubejs:lightning_dragon_blood')

        if (!$CooldownManager.hasCooldown(player, LIGHTNING_COOLDOWN)) {
            overLimitSpellCast($ResourceLocation('reveriefoundry', 'lightning_dragon_breath'), traitLevel, player, false);
            $CooldownManager.setCooldown(player, LIGHTNING_COOLDOWN, 140 + traitLevel * 30);
            hasAnySpell = true;
        }
    }

    if (fu_hasTraitAnywhere(player, 'kubejs:fire_dragon_blood')) {
        let traitLevel = fu_getHighestTraitLevelAnywhere(player, 'kubejs:fire_dragon_blood')

        if (!$CooldownManager.hasCooldown(player, FIRE_COOLDOWN)) {
            overLimitSpellCast($ResourceLocation('reveriefoundry', 'fire_dragon_breath'), traitLevel, player, false);
            $CooldownManager.setCooldown(player, FIRE_COOLDOWN, 140 + traitLevel * 30);
            hasAnySpell = true;
        }
    }

    if (fu_hasTraitAnywhere(player, 'kubejs:ice_dragon_blood')) {
        let traitLevel = fu_getHighestTraitLevelAnywhere(player, 'kubejs:ice_dragon_blood')

        if (!$CooldownManager.hasCooldown(player, ICE_COOLDOWN)) {
            overLimitSpellCast($ResourceLocation('reveriefoundry', 'ice_dragon_breath'), traitLevel, player, false);
            $CooldownManager.setCooldown(player, ICE_COOLDOWN, 140 + traitLevel * 30);
            hasAnySpell = true;
        }
    }

    if (!hasAnySpell) {
        player.tell("§c龙息还在冷却或是没有浴血词条！");
    }
});
