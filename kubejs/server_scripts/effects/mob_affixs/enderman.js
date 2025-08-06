ItemEvents.foodEaten(event => {
    const { source, entity } = event;
    const attacker = event.player;
    if (!entity.living || !attacker || !attacker.player || !attacker.hasEffect("kubejs:enderman")) {
        return;
    }
    const level = attacker.level; // 获取当前维度
    const range = 10; // 随机半径/格
    //生成随机坐标
    const x = Math.floor(attacker.x + (Math.random() * range * 2) - range);
    const z = Math.floor(attacker.z + (Math.random() * range * 2) - range);
    let y = level.getHeight() + 1;
    attacker.randomTeleport(x, y, z, true);
});