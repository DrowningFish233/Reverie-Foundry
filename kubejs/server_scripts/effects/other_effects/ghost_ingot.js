function ghost_ingot(event, player) {
    if (player.hasEffect('kubejs:ghost_ingot')) {
        modifyDrainRate(player, DRAIN_STAGE.FLAT, -1);
    }
}