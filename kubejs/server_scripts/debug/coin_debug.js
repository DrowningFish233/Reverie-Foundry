
/*
PlayerEvents.tick(event => {
    const player = event.player;
    if (!player || player.tickCount % 100 !== 0) return;

    const sanity = player.persistentData.getInt("sanity") || 0; //当前理智
    const initialFlips = 3; //硬币数量
    const maxRetryRounds = 2; //重投数量
    const retryCoinLimit = 1; //每轮重复投掷硬币数量

    const result = CoinFlip(sanity, initialFlips, maxRetryRounds, retryCoinLimit);

    player.tell([
        "§6投掷结果: " + (result.isHeads ? "§a正面" : "§c反面"),
        "§7参数: 初始" + initialFlips + "枚/" +
        "重试" + maxRetryRounds + "轮/" +
        "每轮" + retryCoinLimit + "枚",
        "§8序列: [" + result.results.join(",") + "]"
    ].join("\n"));
});
*/
