//释放月刺
function createThorn(level, owner, x, y, z, yRot, maxDiff, delay, AttackMode) {
    let startPos = $BlockPos.containing(x, y, z)
    let successful = false
    let finalY = y

    if (level.getBlockState(startPos).isAir()) {
        let result = level.clip(new $ClipContext(
            startPos.getCenter(),
            startPos.getCenter().add(0, -maxDiff, 0),
            $ClipContext.Block.COLLIDER,
            $ClipContext.Fluid.NONE,
            owner
        ))
        if (result.getType() != $HitResult.Type.MISS) {
            finalY = result.getLocation().y
            successful = true
        }
    } else {
        let currentDiff = 0
        while (!level.getBlockState(startPos).isAir() && currentDiff < maxDiff) {
            startPos = startPos.above()
            currentDiff++
        }
        if (level.getBlockState(startPos).isAir()) {
            let result = level.clip(new $ClipContext(
                startPos.getCenter(),
                startPos.getCenter().add(0, -maxDiff, 0),
                $ClipContext.Block.COLLIDER,
                $ClipContext.Fluid.NONE,
                owner
            ))
            if (result.getType() != $HitResult.Type.MISS) {
                finalY = result.getLocation().y
                successful = true
            }
        }
    }

    if (successful) {
        let thorn = new $LunarThorn($ESEntities.LUNAR_THORN.get(), level)
        thorn.setPos(x, finalY, z)
        thorn.setOwner(owner)
        thorn.setSpawnedTicks(-delay)
        thorn.setAttackMode(AttackMode)
        level.addFreshEntity(thorn)
    }
}

function tenacious_vine_effect(event) {
    let player = event.player
    if (!player) return;
    if (player.hasEffect("kubejs:tenacious_vine") && player.isPlayer()) {
        let level = player.level
        let target = findTarget(player)
        if (target && !level.isClientSide()) {
            if (level instanceof $ServerLevel) {
                $ScreenShakeVfx.createInstance(
                    level.dimension,
                    player.position(),
                    30, 30, 0.15, 0.24, 4, 5
                ).send(level)
            }

            let yRotRad = player.yRot * Math.PI / 180
            let x = -Math.sin(yRotRad)
            let z = Math.cos(yRotRad)

            for (let i = 0; i < 6; i++) {
                createThorn(
                    level,                   // 世界
                    player,                  // 所有者
                    player.x + x * i * 1.5,
                    player.y,
                    player.z + z * i * 1.5,
                    $Mth.wrapDegrees(-player.yRot), // 旋转角度
                    40,                      // 最大下探距离
                    i * 2,                    // 延迟
                    1
                )
            }
        }
    }
}
