ItemEvents.rightClicked('kubejs:starfury', event => {
    let player = event.player
    let level = player.level
    let target = findTarget(player)
    if (target) {
        event.player.swing()
        $MeteorClass.createMeteorShower(
            level,
            player,
            target,
            target.x,
            target.y,
            target.z,
            80
        )
        // 获取并设置流星尺寸
        let meteors = level.getEntitiesOfClass($MeteorClass, player.getBoundingBox().inflate(80))
        meteors.forEach(meteor => {
            if (meteor.getOwner() == player) { // 只修改玩家召唤的流星
                meteor.setSize(6)
            }
        })
        player.addItemCooldown(event.item, 80);
    }
})

// 自动寻找目标
function findTarget(player) {
    let hitResult = player.rayTrace(50)
    if (hitResult && hitResult.entity && hitResult.entity.isLiving()) {
        return hitResult.entity
    }
    return player // 如果都没有，则以玩家自己为目标
}