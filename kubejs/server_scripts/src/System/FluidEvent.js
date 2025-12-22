/*
// 流体转换配置
const fluidConversions = [
    {
        fluidBlock: 'minecraft:water',
        targetBlock: 'kubejs:abiding_alloy',
        resultBlock: 'minecraft:stone',
        sound: 'minecraft:block.lava.extinguish',
        volume: 1.0,
        pitch: 1.0
    },
    {
        fluidBlock: 'kubejs:adamanite',
        targetBlock: 'kubejs:abiding_alloy',
        resultBlock: 'minecraft:obsidian',
        sound: 'minecraft:block.lava.extinguish',
        volume: 1.0,
        pitch: 1.0
    }
];

// 事件处理
NativeEvents.onEvent($BlockEvent$NeighborNotifyEvent, event => {
    let level = event.level;
    if (level.isClientSide()) return;
    if (!event || !event.state || !event.state.block) return;

    for (let conversion of fluidConversions) {
        if (event.state.block.id !== conversion.fluidBlock) continue;

        for (let dir of event.notifiedSides) {
            let targetPos = event.pos.relative(dir);
            let targetState = event.level.getBlockState(targetPos);
            if (!targetState || !targetState.block) continue;

            if (targetState.block.id === conversion.targetBlock) {
                let centerPos = targetPos.getCenter();
                event.level.setBlock(targetPos, Block.getBlock(conversion.resultBlock).defaultBlockState(), 3);
                event.level[$playersound](
                    null, centerPos.x, centerPos.y, centerPos.z,
                    conversion.sound, "players", conversion.volume, conversion.pitch
                );
                break;
            }
        }
    }
});
*/