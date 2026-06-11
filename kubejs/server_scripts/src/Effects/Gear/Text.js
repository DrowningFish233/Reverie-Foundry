NativeEvents.onEvent($SocketSlotChangedEvent, event => {
    let player = event.getPlayer();
    let newItem = event.getNewItem();
    let oldItem = event.getOldItem();

    if (player.level.isClientSide()) return;

    handleSocketChange(event, player, 'create:chromatic_compound');

    if ($SocketStateAPI.isEnabled(player, "create:chromatic_compound")) {
        player.potionEffects.add("minecraft:strength", 999999, 1, true, false);
    } else {
        player.removeEffect("minecraft:strength");
    }
});


NativeEvents.onEvent("net.neoforged.neoforge.event.entity.living.LivingEquipmentChangeEvent", event => {
    let entity = event.getEntity();
    if (!entity.isPlayer()) return;

    let player = entity;
    if (player.level.isClientSide()) return;
    let slot = event.getSlot();

    if (slot.name() == "MAINHAND" || slot.name() == "OFFHAND") {
        player.removeEffect("minecraft:strength");

        if ($SocketStateAPI.isEnabled(player, "create:chromatic_compound")) {
            player.potionEffects.add("minecraft:strength", 999999, 1, true, false);
        }
    }
});

