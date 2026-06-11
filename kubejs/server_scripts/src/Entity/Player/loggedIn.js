/**
 * v2 尝试修复玩家进入世界后理智需重新同步的问题
 */
PlayerEvents.loggedIn(event => {
    let player = event.player
    let playerName = event.player.getName()
    let pData = player.persistentData;
    let player_sanity = pData.getInt("sanity") || 0;
    event.server.scheduleInTicks(5, () => {
        $CooldownManager.cleanupPlayer(player);
        console.log("[Reverie Foundry] [进入世界]已对冷却进行清理!");
        /*
        FilesJS.watchDirectory('kubejs/data/kubejs/silentgear_materials', (changedPath) => {
            console.log('[Reverie Foundry]文件已更改:', changedPath);
            generatePatchouliEntries();
        });
        */
        loggedInplayersanity(player);
        updateplayersanity(player, player_sanity);
        player.potionEffects.add('kubejs:load_protection', 20 * 15, 0)
        event.server.runCommand(`sgear_properties recalculate ${playerName}`)

    });
});


PlayerEvents.loggedOut(event => {
    let player = event.player;
    if (player.level.isClientSide()) return;
    $SocketStateAPI.clearAll(player);
});