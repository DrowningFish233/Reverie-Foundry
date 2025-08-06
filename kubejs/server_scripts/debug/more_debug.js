/*
PlayerEvents.tick(event => {
    const player = event.player;
    if (!player || !player.living) return;
    if (event.server.tickCount % 40 !== 0) return;
    
    if (player.hasEffect("kubejs:wolf")) {
        const wolf_radius = 10;
        const targetEntityId = "minecraft:zombie";
        
        // 使用更高效的实体获取方式
        const nearbyEntities = player.level.getEntities(
            player,  // 排除玩家自己
            player.getBoundingBox().inflate(wolf_radius)  // 扩展边界框
        ).filter(entity => 
            entity.getType() === targetEntityId  // 只检测僵尸
        );

        const count = nearbyEntities.length;
        if (count > 0) {
            player.tell(`在你周围 ${wolf_radius} 格内有 ${count} 个 ${targetEntityId}`);
        }
    }
});
*/


