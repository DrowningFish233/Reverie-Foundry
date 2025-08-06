/*
PlayerEvents.tick(event => {
    let player = event.player;
    if (!player) return;
    if (player.tickCount % 40 != 0) return;
    if (player.hasEffect("kubejs:moon")) {
        const moon_context = event.level.getMoonPhase()
        if (moon_context == null) {
            return;
        }
        event.server.runCommandSilent(`say ${` ${moon_context}`}`)
    }
})
*/