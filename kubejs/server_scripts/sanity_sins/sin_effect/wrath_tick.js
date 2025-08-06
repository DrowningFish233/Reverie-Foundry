// priority: 10
// 每刻更新罪孽状态事件
// 暴怒tick级处理逻辑
PlayerEvents.tick(event => {
    let player = event.player;
    if (!player) return;
    if (player.tickCount % 20 != 0) return;
    let isWRATH = player.persistentData.getInt(sins.WRATH) || 0;
    if (isWRATH > 0) {
        handleWrathEffect(event);
    }
});


function handleWrathEffect(event) {
    let player = event.player
    const DAMAGE_AMOUNT = player.getMaxHealth()
    const DAMAGE_AMOUNT_2 = DAMAGE_AMOUNT / 10
    let idleTimer = player.persistentData.getInt("idleTimer");
    idleTimer += 20;
    player.persistentData.putInt("idleTimer", idleTimer);
    if (idleTimer >= IDLE_TIME) {
        player.attack($DamageSource("generic"), DAMAGE_AMOUNT_2);
        player.persistentData.putInt("idleTimer", 0);
    }
}