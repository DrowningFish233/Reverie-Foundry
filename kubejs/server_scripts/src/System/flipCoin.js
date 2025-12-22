function flipCoin(sanity) {
    const probability = 0.5 + (sanity * 0.01);
    const clampedProb = Math.max(0.05, Math.min(0.95, probability));
    return random.nextDouble() < clampedProb ? 1 : 0;
}

// 硬币重投逻辑
function CoinFlip(sanity, initialFlips, maxRetryRounds, retryCoinLimit) {
    let retryCount = 0;
    const results = [];

    // 初始投掷
    for (let i = 0; i < initialFlips; i++) {
        results.push(flipCoin(sanity));
    }

    // 优化后的重投条件检查
    const shouldRetry = () =>
        results.every(r => r === 1) &&
        retryCount < maxRetryRounds &&
        results.length < retryCoinLimit;

    // 重投逻辑
    while (shouldRetry()) {
        results.push(flipCoin(sanity));      // 新增1枚
        results[results.length - 1] = flipCoin(sanity); // 重投新增的
        retryCount++;
    }

    return {
        isHeads: results[results.length - 1] === 1,
        retryCount: retryCount,
        results: results
    };
}