// priority: 10
// 每刻更新罪孽状态事件
PlayerEvents.tick(event => {
    let player = event.player;
    if (!player) return;
    if (player.tickCount % 20 != 0) return;
    let isSLOTH = player.persistentData.getInt(sins.SLOTH) || 0;
    if (isSLOTH > 0) {
        player.potionEffects.add("kubejs:sloth", 80, 0);
    }
});