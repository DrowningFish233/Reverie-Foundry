//显示理智
function showsanity(event, player) {
    const itemId = "kubejs:sanity_curios";
    const itemStack = getCuriosItem(player, itemId);
    if (itemStack !== null) {
        let sanity = player.persistentData.getInt("sanity");
        let depravity = player.persistentData.getInt("depravity");
        let playerName = getplayerName(player.toString());
        player.setStatusMessage(`§b${playerName}§r 的当前 §a理智§r：§a${sanity}/45§r  §c沉沦值§r：§c${depravity}§r`);
    }
}

//获取玩家名称
function getplayerName(playerString) {
    const regex = /ServerPlayer\['([^']+)'/;
    const match = regex.exec(playerString);
    return match ? match[1] : "未知玩家";
}

/*按键绑定调用*/
NetworkEvents.dataReceived("key.test_2", (event) => {
    const player = event.player
    if (!player) return;
    showsanity(event, player);
});

//使用肾上腺素
NetworkEvents.dataReceived("key.test_3", (event) => {
    const player = event.player
    if (!player) return;
    const { x, y, z } = player;
    const pData = player.persistentData;
    let playerName = getplayerName(player.toString());
    const the_adrenaline = pData.getInt("adrenaline");
    if (the_adrenaline == 100) {
        player.potionEffects.add("kubejs:use_adrenaline")
        pData.putInt("adrenaline", 0);
        event.server.runCommandSilent(`playsound kubejs:use_adrenaline player ${playerName} ${x} ${y} ${z} 1 1`);
    }
});


