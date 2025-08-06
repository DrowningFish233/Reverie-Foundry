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
        .needsLearning(false)                      // 是否需要学习（通常用于禁忌法术）
        .canBeCraftedBy(player => true)            // 控制玩家能否合成此法术（此处始终允许）
        .setUniqueInfo((spellLevel, caster) => {   // 自定义法术描述（caster为玩家对象）
            return [
                // 返回文本组件数组（支持颜色和动态值）
                Component.green(`法术持续时长: ${spellLevel * 5 + 5} 秒`),
            ]
        })
        .onCast(ctx => {  // 施法时触发
            let player = ctx.entity
            let spellLevel = ctx.getSpellLevel()
            // 条件检查
            if (!ctx.entity.isPlayer()) return
            // 效果实现：
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
        .needsLearning(false)                      // 是否需要学习（通常用于禁忌法术）
        .canBeCraftedBy(player => true)            // 控制玩家能否合成此法术（此处始终允许）
        .setUniqueInfo((spellLevel, caster) => {   // 自定义法术描述（caster为玩家对象）
            return [
                // 返回文本组件数组（支持颜色和动态值）
                Component.green(`法术持续时长: ${spellLevel * 8 + 5} 秒`),
            ]
        })
        .onCast(ctx => {  // 施法时触发
            let player = ctx.entity
            let spellLevel = ctx.getSpellLevel()
            // 条件检查
            if (!ctx.entity.isPlayer()) return
            // 效果实现：
            player.potionEffects.add("kubejs:one_six_seven_four", 20 * (spellLevel * 8 + 5), 0);
        })
})
