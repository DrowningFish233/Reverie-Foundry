let default_sound_block = 'minecraft:block.stone.place'

EntityEvents.spawned('minecraft:item', event => {

    // 将碎冰放入水中转化为冰块
    // 要事先通过ItemEvents::modification中的'item.fireResistant = true'修改物品属性
    // 将非防火物品扔进熔岩会像平常一样消失
    if (event.entity.item.id == 'irons_spellbooks:permafrost_shard')
        attemptSetBlock(30, event.entity, 'minecraft:water', 'minecraft:ice')

    // 通过将物品扔进液体来将其转化为另一种物品
    // 即使玩家连续快速丢弃整组物品也能正常工作
    if (event.entity.item.id == 'silentgems:ruby')
        attemptConvertItem(30, event.entity, 'minecraft:water', 'silentgems:carnelian')

})

let attemptSetBlock = (interval, entity, target, result) => { attemptSetBlockWithSound(interval, entity, target, result, default_sound_block) }

/**
 * @param {integer} interval 执行前的等待时间（单位：游戏刻）
 * @param {ItemEntity} entity 被抛出的物品实体
 * @param {ResourceLocation} target 目标液体的mod:id
 * @param {ResourceLocation} result 转化后的流体/方块的mod:id
 * @param {ResourceLocation} sound 播放的音效（格式：mod:block.type.action）
 */


let attemptSetBlockWithSound = (interval, entity, target, result, sound) => {
    // 设置拾取延迟，防止在此过程中物品被捡起
    entity.setPickUpDelay(interval * 2)

    // 安排在(interval)刻后执行方块检查和转换
    // 如果不延迟执行，代码会在物品实体生成的瞬间立即运行，此时物品通常还在玩家手部位置
    entity.server.scheduleInTicks(interval, () => {

        // 如果物品实体已不存在，则终止执行
        if (!entity)
            return

        let { level, server } = entity
        // 字段blockPosition返回值与方法blockPosition()完全不同，必须使用方法获取正确位置
        let bpos = entity.blockPosition()

        let liquid = level.getBlock(bpos)

        // 检查实体是否浸入液体，且是否为指定液体
        if (entity.isInLiquid() && liquid.id == target) {

            // 设置新方块
            level.setBlockAndUpdate(bpos, result)

            // 为10格范围内的所有玩家播放音效
            level.players.forEach(player => {
                if (Math.sqrt(entity.distanceToSqr(player)) <= 10)
                    server.runCommandSilent(`playsound ` + sound + ` block ` + player.username + ` ${bpos.x} ${bpos.y} ${bpos.z} 1 1`)
            })
            // 可能丢弃的是数量>1的物品堆。减少1个数量而不是直接清除整个实体
            entity.item.count--
        }
    })
}

let attemptConvertItem = (interval, entity, target, result) => {
    entity.setPickUpDelay(interval * 2)

    entity.server.scheduleInTicks(interval, () => {

        if (!entity)
            return

        let { level, server } = entity
        let bpos = entity.blockPosition()
        let liquid = level.getBlock(bpos)

        if (entity.isInLiquid() && liquid.id == target) {
            let oldStack = entity.getItem()
            entity.setItem(Item.of(result, oldStack.count))
            level.players.forEach(player => {
                if (Math.sqrt(entity.distanceToSqr(player)) <= 10)
                    server.runCommandSilent(`playsound minecraft:item.bucket.fill block ` + player.username + ` ${bpos.x} ${bpos.y} ${bpos.z} 1 1`)
            })
        }

    })
}