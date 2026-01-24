global.tick = entity => {
    if (entity.level.isClientSide()) return
    try {
        let targetUUID = entity.persistentData.TargetUUID
        if (!targetUUID) return
        let target = null
        for (let other of entity.level.getEntities()) {
            if (
                other.getUuid() == targetUUID &&
                other.isLiving() &&
                !other.isRemoved() &&
                !other.isSpectator()
            ) {
                target = other
                break
            }
        }
        if (!target) return

        let baseSpeed = 0.3
        let proximityBoost = 1.5
        let maxSearchRadius = 50

        let dx = target.x - entity.x
        let dy = target.y + target.bbHeight / 2 - entity.y
        let dz = target.z - entity.z
        let dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist > 0) {
            let distanceRatio = Math.min(dist / maxSearchRadius, 1)
            let speed = baseSpeed * (1 + proximityBoost * (1 - distanceRatio))
            entity.setMotion(dx / dist * speed, dy / dist * speed, dz / dist * speed)
        }

    } catch (error) {
        console.log(error)
    }
};


StartupEvents.registry('entity_type', event => {
    event.create('explosion', "entityjs:projectile")
        .onHitBlock(ctx => ctx.entity.remove("discarded")) // 击中方块时消失
        .onHitEntity(ctx => { // 击中实体时爆炸
            let explosion = ctx.entity.level.createExplosion(ctx.entity.x, ctx.entity.y, ctx.entity.z)
            explosion.exploder(ctx.entity.owner);
            explosion.explosionMode("none");
            explosion.strength(4);
            explosion.causesFire(false);
            explosion.explode();
            ctx.entity.remove("discarded");

            if (ctx.result.entity && ctx.result.entity.living) {
                let potion = ctx.result.entity.potionEffects
                potion.add('minecraft:glowing', 200, 0, false, true)
                potion.add('kubejs:pride_2', 200, 1, false, true)
            }
        })
        .tick(entity => global.tick(entity)); // 每帧更新追踪逻辑

    event.create('brick', "entityjs:projectile")
        .onHitBlock(ctx => ctx.entity.remove("discarded")) // 击中方块时消失
        .onHitEntity(ctx => {
            ctx.result.entity.attack($DamageSource("generic"), 4);
            ctx.entity.remove("discarded");
        })
});



EntityJSEvents.attributes(event => {
    event.modify('minecraft:allay', attribute => {
        attribute.add("minecraft:generic.max_health", 30)
    })

    event.modify('minecraft:iron_golem', attribute => {
        attribute.add("minecraft:generic.max_health", 120)
    })
})
