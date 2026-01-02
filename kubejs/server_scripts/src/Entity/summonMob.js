
EntityEvents.spawned('minecraft:item', event => {
    let entity = event.entity
    let itemId = entity.item.getId()

    // 当特定的物品被丢出时，召唤相应的生物,以此来伪造祭坛召唤生物
    switch (itemId) {
        case 'terra_entity:skeletron_spawn_egg':
            summonMob(10, entity, 'terra_entity:skeletron', 'kubejs:boss_summon')
            break;

        case 'terra_entity:king_slime_spawn_egg':
            summonMob(10, entity, 'terra_entity:king_slime', 'kubejs:boss_summon')
            break;

        case 'terra_entity:cthulhu_eye_spawn_egg':
            summonMob(10, entity, 'terra_entity:eye_of_cthulhu', 'kubejs:boss_summon')
            break;

        case 'terra_entity:eater_of_world_spawn_egg':
            summonMob(10, entity, 'terra_entity:eater_of_worlds', 'kubejs:boss_summon')
            break;

        case 'terra_entity:queen_bee_spawn_egg':
            summonMob(10, entity, 'terra_entity:queen_bee', 'kubejs:boss_summon')
            break;

        case 'terra_entity:brain_of_cthulhu_spawn_egg':
            summonMob(10, entity, 'terra_entity:brain_of_cthulhu', 'kubejs:boss_summon')
            break;
    }
})






/**
 * 召唤生物函数
 * 
 * 为什么不让我走createEntity，呜，苦露西
 * 
 * @param {integer} interval 执行前的等待时间（单位：Tick）
 * @param {ItemEntity} entity 被抛出的物品实体
 * @param {string} mobId 要召唤的生物ID
 * @param {string} sound 播放的音效
 */
function summonMob(interval, entity, mobId, sound) {
    // 设置拾取延迟，防止在此过程中物品被捡起
    entity.setPickUpDelay(interval * 2);

    entity.server.scheduleInTicks(interval, () => {
        // 如果物品实体已不存在，则终止执行
        if (!entity || !entity.isAlive()) return;

        let { level } = entity;

        try {
            let pos = entity.position();

            let mob = $TEUtils.spawnEntity(mobId, level, pos);

            if (!mob) return;

            // 播放音效
            if (sound) {
                level[$playersound](
                    null,
                    pos.x,
                    pos.y,
                    pos.z,
                    sound,
                    "players",
                    1.0,
                    1.0
                );
            }

            entity.item.count--;

            if (entity.item.count <= 0) {
                entity.discard();
            }

        } catch (error) {
            console.error(`召唤生物时出错: ${error}`);
        }
    });
}

/**
 * @param {integer} interval 执行前的等待时间（单位：Tick）
 * @param {ItemEntity} entity 被抛出的物品实体
 * @param {string} mobId 要召唤的生物ID
 * @param {string} sound 播放的音效
 * @param {allowedDimensions} dimensions 需要的维度
 */

function summonMobWithCustomDimensions(interval, entity, mobId, sound, allowedDimensions) {
    entity.setPickUpDelay(interval * 2)
    entity.server.scheduleInTicks(interval, () => {
        if (!entity || !entity.isAlive())
            return

        let { level } = entity
        let dimensionId = level.dimension.toString()

        // 使用传入的允许维度列表，如果没传则默认主世界
        let dimensions = allowedDimensions || [
            'minecraft:overworld'
        ]

        if (!dimensions.includes(dimensionId)) {
            entity.discard()
            return
        }

        let pos = {
            x: entity.getX(),
            y: entity.getY(),
            z: entity.getZ()
        };

        try {
            let pos = entity.position();

            let mob = $TEUtils.spawnEntity(mobId, level, pos);

            if (!mob) return;

            // 播放音效
            if (sound) {
                level[$playersound](
                    null,
                    pos.x,
                    pos.y,
                    pos.z,
                    sound,
                    "players",
                    1.0,
                    1.0
                );
            }

            entity.item.count--;

            if (entity.item.count <= 0) {
                entity.discard();
            }

        } catch (error) {
            console.error(`召唤生物时出错: ${error}`);
        }
    })
}
