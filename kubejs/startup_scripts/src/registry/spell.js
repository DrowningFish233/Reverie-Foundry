let $SummonManager = Java.loadClass("io.redspace.ironsspellbooks.capabilities.magic.SummonManager")
let $BloodNeedle = Java.loadClass('io.redspace.ironsspellbooks.entity.spells.blood_needle.BloodNeedle')

// 法术注册
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('kubejs:gold_body')
        .setCastTime(20)  // 施法时间(ticks)
        .setCooldownSeconds(60)  // 冷却时间(秒)
        .setBaseManaCost(50)  // 基础魔力消耗
        .setManaCostPerLevel(25)  // 每级额外消耗
        .setCastType('instant')                    // 施法类型："continuous"（持续）、"long"（长施法）、"instant"（瞬发）或"none"（无）        
        .setSchool('kubejs:dream')  // 所属学派
        .setMaxLevel(8)
        .setMinRarity('uncommon')                      // The minimum rarity of the spell. Can be "common", "uncommon", "rare", "epic", or "legendary"
        .canBeCraftedBy(player => true)  // 制作条件
        .onClientCast(ctx => { })                   // 仅客户端执行的施法逻辑（用于粒子效果/音效）
        .onPreCast(ctx => { })                      // 施法前触发
        .onPreClientCast(ctx => { })                // 客户端施法前触发
        .setAllowLooting(true)                     // 是否允许通过战利品（怪物/宝箱）获取此法术
        .needsLearning(true)                      // 是否需要学习
        .canBeCraftedBy(player => true)            // 控制玩家能否合成此法术
        .setUniqueInfo((spellLevel, caster) => {   // 自定义法术描述
            return [
                Component.translate('spell.kubejs.one_six_seven_four.duration')
                    .append(Component.green(` ${spellLevel * 5 + 5} `))
                    .append(Component.translate('spell.kubejs.seconds'))
            ]
        })

        .onCast(ctx => {  // 施法时触发
            let player = ctx.entity
            let spellLevel = ctx.getSpellLevel()
            // 条件检查
            if (!ctx.entity.isPlayer()) return
            // 效果实现：
            const { level } = ctx
            level.spawnParticles(
                'irons_spellbooks:unstable_ender',  // arg0: 粒子类型
                true,                        // arg1: 是否强制显示
                player.x,                    // arg2: 粒子生成位置的X坐标
                player.y + 1,                // arg3: 粒子生成位置的Y坐标
                player.z,                    // arg4: 粒子生成位置的Z坐标
                0.5,                         // arg5: X方向的偏移量/扩散范围
                0.5,                         // arg6: Y方向的偏移量/扩散范围
                0.5,                         // arg7: Z方向的偏移量/扩散范围
                20,                          // arg8: 生成的粒子数量（整数）
                0.1                          // arg9: 粒子速度
            )
            player.potionEffects.add("kubejs:gold_body", 20 * (spellLevel * 5 + 5), 0);
        })
    event.create('kubejs:one_six_seven_four')
        .setCastTime(20)  // 施法时间(ticks)
        .setCooldownSeconds(90)  // 冷却时间(秒)
        .setBaseManaCost(100)  // 基础魔力消耗
        .setManaCostPerLevel(50)  // 每级额外消耗
        .setCastType('instant')                    // 施法类型："continuous"（持续）、"long"（长施法）、"instant"（瞬发）或"none"（无）        
        .setSchool('kubejs:dream')  // 所属学派
        .setMaxLevel(5)
        .setMinRarity('rare')                      // The minimum rarity of the spell. Can be "common", "uncommon", "rare", "epic", or "legendary"
        .canBeCraftedBy(player => true)  // 制作条件
        .onClientCast(ctx => { })                   // 仅客户端执行的施法逻辑（用于粒子效果/音效）
        .onPreCast(ctx => { })                      // 施法前触发
        .onPreClientCast(ctx => { })                // 客户端施法前触发
        .setAllowLooting(true)                     // 是否允许通过战利品（怪物/宝箱）获取此法术
        .needsLearning(true)                      // 是否需要学习
        .canBeCraftedBy(player => true)            // 控制玩家能否合成此法术
        .setUniqueInfo((spellLevel, caster) => {   // 自定义法术描述
            return [
                Component.translate('spell.kubejs.one_six_seven_four.duration')
                    .append(Component.green(` ${spellLevel * 8 + 5} `))
                    .append(Component.translate('spell.kubejs.seconds'))
            ]
        })
        .onCast(ctx => {  // 施法时触发
            let player = ctx.entity
            let spellLevel = ctx.getSpellLevel()
            // 条件检查
            if (!ctx.entity.isPlayer()) return
            const { level } = ctx

            level.spawnParticles(
                'irons_spellbooks:unstable_ender',  // arg0: 粒子类型
                true,                        // arg1: 是否强制显示
                player.x,                    // arg2: 粒子生成位置的X坐标
                player.y + 1,                // arg3: 粒子生成位置的Y坐标
                player.z,                    // arg4: 粒子生成位置的Z坐标
                0.5,                         // arg5: X方向的偏移量/扩散范围
                0.5,                         // arg6: Y方向的偏移量/扩散范围
                0.5,                         // arg7: Z方向的偏移量/扩散范围
                20,                          // arg8: 生成的粒子数量（整数）
                0.1                          // arg9: 粒子速度
            )
            player.potionEffects.add("kubejs:one_six_seven_four", 20 * (spellLevel * 8 + 5), 0);
        })
    event.create('kubejs:rune_of_deflection')
        .setCastTime(20)  // 施法时间(ticks)
        .setCooldownSeconds(100)  // 冷却时间(秒)
        .setBaseManaCost(50)  // 基础魔力消耗
        .setManaCostPerLevel(40)  // 每级额外消耗
        .setCastType('instant')                    // 施法类型："continuous"（持续）、"long"（长施法）、"instant"（瞬发）或"none"（无）        
        .setSchool('kubejs:dream')  // 所属学派
        .setMaxLevel(4)
        .setMinRarity('epic')                      // The minimum rarity of the spell. Can be "common", "uncommon", "rare", "epic", or "legendary"
        .canBeCraftedBy(player => true)  // 制作条件
        .onClientCast(ctx => { })                   // 仅客户端执行的施法逻辑
        .onPreCast(ctx => { })                      // 施法前触发
        .onPreClientCast(ctx => { })                // 客户端施法前触发
        .setAllowLooting(true)                     // 是否允许通过战利品（怪物/宝箱）获取此法术
        .needsLearning(true)                      // 是否需要学习
        .canBeCraftedBy(player => true)            // 控制玩家能否合成此法术
        .setUniqueInfo((spellLevel, caster) => {   // 自定义法术描述
            return [
                Component.translate('spell.kubejs.rune_of_deflection.duration').append(Component.green(` ${spellLevel * 5 + 5}`)).append(Component.translate('spell.kubejs.seconds')),
                Component.translate('spell.kubejs.rune_of_deflection.max_stacks').append(Component.blue(` ${spellLevel}`)),
                Component.translate('spell.kubejs.rune_of_deflection.frost_level').append(Component.aqua(` ${Math.min(3, spellLevel - 1)}`))
            ]
        })
        .onCast(ctx => {  // 施法时触发
            let player = ctx.entity
            let spellLevel = ctx.getSpellLevel()
            // 条件检查
            if (!ctx.entity.isPlayer()) return
            const { level } = ctx
            level.spawnParticles(
                'irons_spellbooks:unstable_ender',  // arg0: 粒子类型
                true,                        // arg1: 是否强制显示
                player.x,                    // arg2: 粒子生成位置的X坐标
                player.y + 1,                // arg3: 粒子生成位置的Y坐标
                player.z,                    // arg4: 粒子生成位置的Z坐标
                0.5,                         // arg5: X方向的偏移量/扩散范围
                0.5,                         // arg6: Y方向的偏移量/扩散范围
                0.5,                         // arg7: Z方向的偏移量/扩散范围
                20,                          // arg8: 生成的粒子数量（整数）
                0.1                          // arg9: 粒子速度
            )
            player.potionEffects.add("kubejs:rune_of_deflection", 20 * (spellLevel * 8 + 5), spellLevel - 1);
        })
    event.create('kubejs:clear_cooldown')
        .setCastTime(20)  // 施法时间(ticks)
        .setCooldownSeconds(300)  // 冷却时间(秒)
        .setBaseManaCost(220)  // 基础魔力消耗
        .setManaCostPerLevel(50)  // 每级额外消耗
        .setCastType('instant')                    // 施法类型："continuous"（持续）、"long"（长施法）、"instant"（瞬发）或"none"（无）        
        .setSchool('kubejs:dream')  // 所属学派
        .setMaxLevel(3)
        .setMinRarity('epic')
        .canBeCraftedBy(player => true)  // 制作条件
        .onClientCast(ctx => { })                   // 仅客户端执行的施法逻辑（用于粒子效果/音效）
        .onPreCast(ctx => { })                      // 施法前触发
        .onPreClientCast(ctx => { })                // 客户端施法前触发
        .setAllowLooting(true)                     // 是否允许通过战利品（怪物/宝箱）获取此法术
        .needsLearning(true)                      // 是否需要学习
        .canBeCraftedBy(player => true)            // 控制玩家能否合成此法术
        .setUniqueInfo((spellLevel, caster) => {   // 自定义法术描述
            return [
                Component.translate('spell.kubejs.clear_cooldown.duration').append(Component.green(` ${spellLevel * 8 + 5}`)).append(Component.translate('spell.kubejs.seconds')),
            ]
        })
        .onCast(ctx => {  // 施法时触发
            let player = ctx.entity
            let spellLevel = ctx.getSpellLevel()
            // 条件检查
            if (!ctx.entity.isPlayer()) return
            // 效果实现：
            const { level } = ctx
            let durationTicks = 20 * (spellLevel * 8 + 5);
            level.spawnParticles(
                'irons_spellbooks:unstable_ender',  // arg0: 粒子类型
                true,                        // arg1: 是否强制显示
                player.x,                    // arg2: 粒子生成位置的X坐标
                player.y + 1,                // arg3: 粒子生成位置的Y坐标
                player.z,                    // arg4: 粒子生成位置的Z坐标
                0.5,                         // arg5: X方向的偏移量/扩散范围
                0.5,                         // arg6: Y方向的偏移量/扩散范围
                0.5,                         // arg7: Z方向的偏移量/扩散范围
                20,                          // arg8: 生成的粒子数量（整数）
                0.1                          // arg9: 粒子速度
            )
            player.potionEffects.add("kubejs:ignore_cooldown", durationTicks, 0);
        })
    event.create('kubejs:fire_arrow')
        .setCastTime(20)
        .setCooldownSeconds(80)
        .setBaseManaCost(220)
        .setManaCostPerLevel(50)
        .setCastType('instant')
        .setSchool('kubejs:dream')
        .setMaxLevel(5)
        .setMinRarity('rare')
        .canBeCraftedBy(player => true)
        .needsLearning(true)
        .setUniqueInfo((spellLevel) => {
            const volleyCount = spellLevel; // 显示连发次数
            return [
                Component.translate('tooltip.kubejs.fire_arrow.volley')
                    .append(Component.red(` ${volleyCount}`))
                    .append(Component.translate('tooltip.kubejs.times')),
            ]
        })
        .onCast(ctx => {
            const { entity: player } = ctx;
            const server = player.getServer()
            if (!server) return;
            if (!player.isPlayer()) return;

            const spellLevel = ctx.getSpellLevel();
            const volleyCount = spellLevel;
            const delayBetweenShots = 20;

            // 发射多轮三连发
            for (let i = 0; i < volleyCount; i++) {
                server.scheduleInTicks(i * delayBetweenShots, () => {
                    if (player.isRemoved()) return;

                    // 三连发角度
                    [-15, 0, 15].forEach(yawOffset => {
                        const arrow = player.level.createEntity("cataclysm:flare_bomb");
                        if (!arrow) return;

                        // 基础设置
                        arrow.setOwner(player);
                        [arrow.x, arrow.y, arrow.z] = [player.x, player.y + 1.5, player.z]; // 从眼部高度发射

                        // 计算方向
                        const radPitch = player.pitch * (Math.PI / 180);
                        const radYaw = (player.yaw + yawOffset) * (Math.PI / 180);
                        const speed = 1.2 + spellLevel * 0.3; // 等级越高速度越快

                        arrow.setMotion(
                            -Math.sin(radYaw) * Math.cos(radPitch) * speed,
                            -Math.sin(radPitch) * speed,
                            Math.cos(radYaw) * Math.cos(radPitch) * speed
                        );

                        arrow.spawn();
                    });

                });
            }
        });
    event.create('kubejs:explosion')
        .setCastTime(20)  // 施法时间(ticks)
        .setCooldownSeconds(60)  // 冷却时间(秒)
        .setBaseManaCost(100)  // 基础魔力消耗
        .setManaCostPerLevel(50)  // 每级额外消耗
        .setCastType('long')  // 施法类型
        .setCastTime(20)
        .setSchool('kubejs:dream')  // 所属学派
        .setMaxLevel(3)
        .setMinRarity('epic')
        .canBeCraftedBy(player => true)
        .onClientCast(ctx => {
        })
        .setUniqueInfo((spellLevel, caster) => {   // 自定义法术描述
            return [
                Component.translate('spell.kubejs.explosion.description'),
                Component.translate('spell.kubejs.explosion.damage').append(Component.red(` ${0.5 + (spellLevel * 0.5)}`)),
                Component.translate('spell.kubejs.explosion.effect').append(Component.darkRed(` ${spellLevel * 5 + 5}s`)),
            ]
        })
        .setFinishSound("kubejs:spell_launch")
        .onCast(ctx => {  // 施法时触发
            let entity = ctx.entity
            let spellLevel = ctx.getSpellLevel()

            if (!entity.isPlayer()) return

            let prism = entity.level.createEntity("kubejs:explosion")
            prism.setOwner(entity)

            // 设置初始位置
            prism.x = entity.x
            prism.y = entity.y + entity.getEyeHeight()
            prism.z = entity.z

            // 计算投射方向
            const { pitch, yaw } = entity
            const { pr, yr } = {
                pr: pitch * Math.PI / 180,
                yr: yaw * Math.PI / 180
            }

            // 根据法术等级提高投射速度
            let multiplier = 0.5 + (spellLevel * 0.5)
            let velocity = {
                x: (-Math.sin(yr) * Math.cos(pr)) * multiplier,
                y: (-Math.sin(pr)) * multiplier,
                z: (Math.cos(yr) * Math.cos(pr)) * multiplier
            }

            // 设置运动方向并生成
            prism.setMotion(velocity.x, velocity.y, velocity.z)
            prism.spawn()

            let player = ctx.entity
            // 条件检查
            if (!ctx.entity.isPlayer()) return
            // 效果实现：
            let durationTicks = 20 * (spellLevel * 5 + 5);
            player.potionEffects.add("kubejs:boom_effects", durationTicks, 0);
            player.potionEffects.add("kubejs:damage_amplification", durationTicks, 2);

        })
    event.create('kubejs:eternal_life_spell')
        .setCastTime(20)  // 施法时间(ticks)
        .setCooldownSeconds(120)  // 冷却时间(秒)
        .setBaseManaCost(150)  // 基础魔力消耗
        .setManaCostPerLevel(100)  // 每级额外消耗
        .setCastType('instant')                    // 施法类型："continuous"（持续）、"long"（长施法）、"instant"（瞬发）或"none"（无）        
        .setSchool('kubejs:dream')  // 所属学派
        .setMaxLevel(3)
        .setMinRarity('LEGENDARY')
        .canBeCraftedBy(player => true)  // 制作条件
        .onClientCast(ctx => { })                   // 仅客户端执行的施法逻辑（用于粒子效果/音效）
        .onPreCast(ctx => { })                      // 施法前触发
        .onPreClientCast(ctx => { })                // 客户端施法前触发
        .setAllowLooting(true)                     // 是否允许通过战利品（怪物/宝箱）获取此法术
        .needsLearning(true)                      // 是否需要学习
        .canBeCraftedBy(player => true)            // 控制玩家能否合成此法术
        .setUniqueInfo((spellLevel, caster) => {   // 自定义法术描述
            return [
                Component.translate('spell.kubejs.eternal_life_spell.duration').append(Component.green(` ${spellLevel * 3 + 3}`)).append(Component.translate('spell.kubejs.seconds')),
            ]
        })
        .onCast(ctx => {  // 施法时触发
            let player = ctx.entity
            let spellLevel = ctx.getSpellLevel()
            const { level } = ctx
            // 条件检查
            if (!ctx.entity.isPlayer()) return
            // 效果实现：
            let durationTicks = 20 * (spellLevel * 3 + 3);
            level.spawnParticles(
                'irons_spellbooks:unstable_ender',  // arg0: 粒子类型
                true,                        // arg1: 是否强制显示
                player.x,                    // arg2: 粒子生成位置的X坐标
                player.y + 1,                // arg3: 粒子生成位置的Y坐标
                player.z,                    // arg4: 粒子生成位置的Z坐标
                0.5,                         // arg5: X方向的偏移量/扩散范围
                0.5,                         // arg6: Y方向的偏移量/扩散范围
                0.5,                         // arg7: Z方向的偏移量/扩散范围
                20,                          // arg8: 生成的粒子数量（整数）
                0.1                          // arg9: 粒子速度
            )
            player.potionEffects.add("kubejs:eternal_life", durationTicks, 0);
        })
    event.create('kubejs:demon_conch')
        .setCastTime(40)  // 施法时间(ticks)
        .setCooldownSeconds(10)  // 冷却时间(秒)
        .setBaseManaCost(30)  // 基础魔力消耗
        .setManaCostPerLevel(10)
        .setCastType('long')                    // 施法类型："continuous"（持续）、"long"（长施法）、"instant"（瞬发）或"none"（无）        
        .setSchool('kubejs:dream')  // 所属学派
        .setMaxLevel(8)
        .setMinRarity('UNCOMMON')
        .canBeCraftedBy(player => true)  // 制作条件
        .onClientCast(ctx => { })                   // 仅客户端执行的施法逻辑（用于粒子效果/音效）
        .onPreCast(ctx => { })                      // 施法前触发
        .onPreClientCast(ctx => { })                // 客户端施法前触发
        .setAllowLooting(true)                     // 是否允许通过战利品（怪物/宝箱）获取此法术
        .needsLearning(true)                      // 是否需要学习
        .canBeCraftedBy(player => true)            // 控制玩家能否合成此法术
        .setUniqueInfo((spellLevel, caster) => {   // 自定义法术描述
            return [
                Component.translate("spell.kubejs.demon_conch.description").append(Component.green(`${spellLevel + 1}`))
            ]
        })
        .onCast(ctx => {  // 施法时触发
            let player = ctx.entity
            let spellLevel = ctx.getSpellLevel() + 1
            const { level } = ctx
            // 条件检查
            if (!ctx.entity.isPlayer()) return
            // 效果实现：
            level.spawnParticles(
                'irons_spellbooks:unstable_ender',  // arg0: 粒子类型
                true,                        // arg1: 是否强制显示
                player.x,                    // arg2: 粒子生成位置的X坐标
                player.y + 1,                // arg3: 粒子生成位置的Y坐标
                player.z,                    // arg4: 粒子生成位置的Z坐标
                0.5,                         // arg5: X方向的偏移量/扩散范围
                0.5,                         // arg6: Y方向的偏移量/扩散范围
                0.5,                         // arg7: Z方向的偏移量/扩散范围
                20,                          // arg8: 生成的粒子数量（整数）
                0.1                          // arg9: 粒子速度
            )

            let currentDim = level.dimension;
            let overworld = 'minecraft:overworld';
            let nether = 'minecraft:the_nether';
            let targetDim;
            let targetX, targetY, targetZ;

            // 主世界 => 地狱
            if (currentDim.toString().includes('overworld')) {
                targetDim = nether;
                targetX = player.x / spellLevel;
                targetY = player.y;
                targetZ = player.z / spellLevel;
            }
            // 地狱 => 主世界
            else if (currentDim.toString().includes('the_nether')) {
                targetDim = overworld;
                targetX = player.x * spellLevel;
                targetY = player.y;
                targetZ = player.z * spellLevel;
            }
            // 其他维度传送到主世界
            else {
                targetDim = overworld;
                targetX = player.x;
                targetY = player.y;
                targetZ = player.z;
            }

            let targetLevel = level.getServer().getLevel(targetDim);
            if (targetLevel) {
                player.teleportTo(targetLevel, targetX, targetY, targetZ, new Set(), player.yaw, player.pitch);
            }
        })

    event.create('kubejs:phantom_pain')
        .setCastTime(40)  // 施法时间(ticks)
        .setCooldownSeconds(30)  // 冷却时间(秒)
        .setBaseManaCost(50)  // 基础魔力消耗
        .setManaCostPerLevel(20)
        .setCastType('instant')                    // 施法类型："continuous"（持续）、"long"（长施法）、"instant"（瞬发）或"none"（无）        
        .setSchool('kubejs:dream')  // 所属学派
        .setMaxLevel(5)
        .setMinRarity('RARE')
        .canBeCraftedBy(player => true)  // 制作条件
        .onClientCast(ctx => { })                   // 仅客户端执行的施法逻辑（用于粒子效果/音效）
        .onPreCast(ctx => { })                      // 施法前触发
        .onPreClientCast(ctx => { })                /* 客户端施法前触发*/
        .setAllowLooting(true)                     /*是否允许通过战利品（怪物/宝箱）获取此法术*/
        .needsLearning(true)                      // 是否需要学习
        .canBeCraftedBy(player => true)            // 控制玩家能否合成此法术
        .setUniqueInfo((spellLevel, caster) => {
            return [
                Component.translate("spell.kubejs.phantom_pain.damage").append(Component.green(`${(5 + spellLevel).toFixed(1)}`)),
                Component.translate("spell.kubejs.phantom_pain.comet_count").append(Component.green(`${Math.min(30, 3 + spellLevel * 2)}`)),
                Component.translate("spell.kubejs.phantom_pain.cast_rings").append(Component.green(`${Math.min(Math.max(Math.ceil(spellLevel / 2), 1), 3)}`))
            ]
        })
        .onCast(ctx => {
            let player = ctx.entity
            let ray = player.rayTrace(32, false)
            let resultVec = ray.hit ? ray.hit : player.getPosition(1.0).add(player.getLookAngle().normalize().scale(32))

            let spellLevel = ctx.getSpellLevel()

            let powerModifier = player.getAttributeValue("kubejs:dream_spell_power") || 0

            let baseDamage = 5 + spellLevel * 0.5
            let baseCometCount = 3 + spellLevel * 0.5

            let damage = baseDamage * (1 + powerModifier)
            let cometCount = Math.floor(baseCometCount * (1 + powerModifier * 0.8))

            cometCount = Math.min(20, cometCount)
            let cometRings = Math.min(Math.max(Math.ceil(spellLevel / 2), 1), 3)

            let explosionRadius = (2.0 + spellLevel * 0.2) * (1 + powerModifier * 0.5)

            let spawnedComets = 0
            let maxTotalComets = 25

            for (let ring = 1; ring <= cometRings && spawnedComets < maxTotalComets; ring++) {
                let cometsThisRing = Math.min(cometCount, Math.floor((maxTotalComets - spawnedComets) / (cometRings - ring + 1)))

                for (let i = 0; i < cometsThisRing && spawnedComets < maxTotalComets; i++) {
                    let comet = player.level.createEntity("irons_spellbooks:comet")

                    let rotation = (360 / cometsThisRing) * i

                    let horizontalDistance = 1.5 + ring * 1.2
                    let angle = rotation * Math.PI / 180
                    let xOffset = Math.cos(angle) * horizontalDistance
                    let zOffset = Math.sin(angle) * horizontalDistance

                    let spawnX = player.getX() + xOffset
                    let spawnY = player.getY() + player.getEyeHeight() + ring * 1.2
                    let spawnZ = player.getZ() + zOffset

                    comet.setPosition(spawnX, spawnY, spawnZ)

                    let direction = resultVec.subtract(new Vec3d(spawnX, spawnY, spawnZ)).normalize()
                    let velocity = 1.3 + powerModifier * 0.3
                    comet.setMotion(
                        direction.x * velocity,
                        direction.y * velocity,
                        direction.z * velocity
                    )

                    comet.setDamage(damage)
                    comet.setExplosionRadius(explosionRadius)
                    comet.setOwner(player)

                    comet.spawn()

                    spawnedComets++
                }
            }
        })
})