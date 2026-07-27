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
        'cataclysm:dust_blast',
        true,
        player.x,
        player.y,
        player.z,
        0.3,
        0.3,
        0.3,
        10,
        0.1
    )
    player.hurtMarked = true
    player.addMotion(
        direction.x * force,
        0,
        direction.z * force
    );
    player.potionEffects.add("minecraft:speed", 20 * 3, 1);

    if (typeof EmbersText !== 'undefined' && EmbersText.markup) {
        let chargeText = Text.translate('message.wither_howitzer.charge', [
            witherhowitzer - 1,
            8
        ]).getString();

        let fullMessage =
            `<color color=gold>${chargeText}</color>` +
            ` ` +
            `<color color=yellow>${witherhowitzer - 1}/8</color>`;

        fullMessage = `<pulse frequency=1.5>${fullMessage}</pulse>`;

        let message = EmbersText.markup(20, fullMessage)
            .anchor('BOTTOM_LEFT')
            .scale(1.2)
            .fadeInTicks(3)
            .fadeOutTicks(5)
            .shadow(true);

        EmbersText.send(player, message);
    } else {
        player.setStatusMessage(
            Text.translate('message.wither_howitzer.charge', [
                witherhowitzer - 1,
                8
            ])
                .color('gold')
                .append(" ")
                .append(Text.of(`${witherhowitzer - 1}/8`).color('yellow'))
        );
    }

    pData.putInt("wither_howitzer", witherhowitzer - 1);
});

NetworkEvents.dataReceived("key.test_4", (event) => {
    const player = event.player;
    if (!player) return;

    let pData = player.persistentData;
    let magicSwitch = pData.getInt("magicSwitch") || 0;

    magicSwitch = magicSwitch === 0 ? 1 : 0;
    pData.putInt("magicSwitch", magicSwitch);

    if (typeof EmbersText !== 'undefined' && EmbersText.markup) {
        let switchText = Text.translate('message.ironwood_switch', [
            magicSwitch === 1 ?
                Text.translate('state.enabled').getString() :
                Text.translate('state.disabled').getString(),
            magicSwitch
        ]).getString();

        let fullMessage = `<color color=${magicSwitch === 1 ? 'green' : 'red'}>${switchText}</color>`;
        fullMessage = `<neon radius=3 intensity=1.5 color=${magicSwitch === 1 ? '00FF00' : 'FF0000'}>${fullMessage}</neon>`;

        let message = EmbersText.markup(60, fullMessage)
            .anchor('BOTTOM_LEFT')
            .scale(1.2)
            .fadeInTicks(3)
            .fadeOutTicks(5)
            .shadow(true);

        EmbersText.send(player, message);
    } else {
        player.tell(
            Text.translate('message.ironwood_switch', [
                magicSwitch === 1 ?
                    Text.translate('state.enabled') :
                    Text.translate('state.disabled'),
                Text.of(magicSwitch).color('white')
            ])
        );
    }
});

function tryDragonBreath(player, traitId, cooldownId, spellId, traitLevel, cooldownBase) {
    if (!fu_hasTraitAnywhere(player, traitId)) return false;
    if ($CooldownManager.hasCooldown(player, cooldownId)) return false;

    let cooldownTime = cooldownBase + traitLevel * 30
    overLimitSpellCast($ResourceLocation('reveriefoundry', spellId), traitLevel, player, false);
    $CooldownManager.setCooldown(player, cooldownId, cooldownTime);
    return true;
}

NetworkEvents.dataReceived("key.test_7", (event) => {
    const player = event.player;
    if (!player) return;

    let hasAnySpell = false;

    if (tryDragonBreath(player, 'kubejs:lightning_dragon_blood', "lightning_dragon_breath", 'lightning_dragon_breath',
        fu_getHighestTraitLevelAnywhere(player, 'kubejs:lightning_dragon_blood'), 140)) {
        hasAnySpell = true;
    }

    if (tryDragonBreath(player, 'kubejs:fire_dragon_blood', "fire_dragon_breath", 'fire_dragon_breath',
        fu_getHighestTraitLevelAnywhere(player, 'kubejs:fire_dragon_blood'), 140)) {
        hasAnySpell = true;
    }

    if (tryDragonBreath(player, 'kubejs:ice_dragon_blood', "ice_dragon_breath", 'ice_dragon_breath',
        fu_getHighestTraitLevelAnywhere(player, 'kubejs:ice_dragon_blood'), 140)) {
        hasAnySpell = true;
    }

    if (!hasAnySpell) {
        player.tell("§c龙息还在冷却或是没有浴血词条！");
    }
});