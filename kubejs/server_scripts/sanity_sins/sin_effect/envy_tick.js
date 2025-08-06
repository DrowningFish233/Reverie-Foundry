// priority: 10
// 每刻更新罪孽状态事件
PlayerEvents.tick(event => {
    let player = event.player;
    if (!player) return;
    if (player.tickCount % 40 != 0) return;
    let envy_number = player.persistentData.getInt("envy_number") || 0;
    if (envy_number > 0) {
        envy_number -= 1;
        player.persistentData.putInt("envy_number", envy_number);
    }
});