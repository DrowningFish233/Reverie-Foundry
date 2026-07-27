ItemEvents.firstRightClicked(event => {
    const { player, level, item, hand } = event;

    if (item.id != "kubejs:core_suppression_unit_form_one") return;
    if (level.isClientSide()) return;

    const success = $RFPureSufferingUtils.clearCurrentSession(level);

    if (success) {
        player.tell(Component.translatable("message.clear_current_success"));
        level[$playersound](
            null,
            player.x,
            player.y,
            player.z,
            "minecraft:block.beacon.activate",
            "players",
            0.6,
            0.8
        );
        if (!player.isCreative()) item.count--;
    } else {
        player.tell(Component.translatable("message.clear_current_fail"));
    }
});

ItemEvents.firstRightClicked(event => {
    const { player, level, item, hand } = event;

    if (item.id != "kubejs:core_suppression_unit_form_two") return;
    if (level.isClientSide()) return;

    $RFPureSufferingUtils.clearAllSessions(level);
    $RFPureSufferingUtils.clearAllQueued(level);

    player.tell(Component.translatable("message.clear_all_success"));
    level[$playersound](
        null,
        player.x,
        player.y,
        player.z,
        "minecraft:block.beacon.activate",
        "players",
        0.6,
        0.8
    );
    if (!player.isCreative()) item.count--;
});

ItemEvents.firstRightClicked(event => {
    const { player, level, item, hand } = event;

    if (item.id != "kubejs:core_suppression_unit_form_three") return;
    if (level.isClientSide()) return;

    $RFPureSufferingUtils.resetInvasionSystem(level);

    player.tell(Component.translatable("message.reset_success"));
    level[$playersound](
        null,
        player.x,
        player.y,
        player.z,
        "minecraft:block.beacon.activate",
        "players",
        0.6,
        0.8
    );
    if (!player.isCreative()) item.count--;
});