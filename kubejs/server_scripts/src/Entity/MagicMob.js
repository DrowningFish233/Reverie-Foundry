//为生物添加施法兼容性
//虚空之花
EntityJSEvents.addGoalSelectors('bosses_of_mass_destruction:void_blossom', event => {
    event.arbitraryGoal(2, (e) => {
        return new WizardAttackGoal(e, 1, 120)
            .setSpells(
                [
                    Spell.of('irons_spellbooks:starfall'),
                    Spell.of('irons_spellbooks:acid_orb'),
                    Spell.of('irons_spellbooks:arrow_volley')
                ], // 攻击
                [
                    Spell.of('irons_spellbooks:healing_circle'),
                ],// 防御
                [], // 移动
                []// 支援
            )
    })
})
//黑曜石巨柱
EntityJSEvents.addGoalSelectors('bosses_of_mass_destruction:obsidilith', event => {
    event.arbitraryGoal(1, (e) => {
        return new WizardAttackGoal(e, 1, 120)
            .setSpells(
                [
                    Spell.of('irons_spellbooks:black_hole'),
                    Spell.of('hazennstuff:stellar_collapse'),
                    Spell.of('irons_spellbooks:fang_strike'),
                    Spell.of('irons_spellbooks:lob_creeper'),
                    Spell.of('irons_spellbooks:magic_missile')
                ], // 攻击
                [],// 防御
                [], // 移动
                [
                    Spell.of('irons_spellbooks:slow'),
                ]// 支援
            )
    })
})
//下界铁掌
EntityJSEvents.addGoalSelectors('bosses_of_mass_destruction:gauntlet', event => {
    event.arbitraryGoal(1, (e) => {
        return new WizardAttackGoal(e, 1, 80)
            .setIsFlying()
            .setSpellQuality(0.8, 1.2)
            .setSpells(
                [
                    Spell.of('irons_spellbooks:burning_dash'),
                    Spell.of('irons_spellbooks:scorch'),
                    Spell.of('irons_spellbooks:fire_arrow'),
                    Spell.of('irons_spellbooks:heat_surge'),
                    Spell.of('irons_spellbooks:raise_hell'),
                    Spell.of('irons_spellbooks:blaze_storm'),
                    Spell.of('irons_spellbooks:fire_breath')
                ], // 攻击
                [],// 防御
                [], // 移动
                []// 支援
            )
    })
})

//月藤巨物
EntityJSEvents.addGoalSelectors('eternal_starlight:lunar_monstrosity', event => {
    event.arbitraryGoal(1, (e) => {
        return new WizardAttackGoal(e, 1, 100)
            .setSpells(
                [
                    Spell.of('hazennstuff:golden_shower'),
                    Spell.of('hazennstuff:counterspell_spider_lily'),
                    Spell.of('hazennstuff:thorn_chakram'),
                    Spell.of('hazennstuff:death_sentence')

                ], // 攻击
                [],// 防御
                [], // 移动
                []// 支援
            )
    })
})


// 配置列表
const SPELL_CONFIGS = {
    'friendsandfoes:iceologer': {
        spells: [
            {
                spell: SpellRegistry.RAY_OF_FROST_SPELL.get(),
                minDistance: 4,
                maxDistance: 15,
                cooldown: 135,
                castLevel: 5
            },
            {
                spell: SpellRegistry.FROST_STEP_SPELL.get(),
                minDistance: 15,
                maxDistance: 22,
                cooldown: 40,
                castLevel: 1
            },
            {
                spell: SpellRegistry.FROSTWAVE_SPELL.get(),
                minDistance: 4,
                maxDistance: 6,
                cooldown: 100,
                castLevel: 6
            }
        ],
        moveToDistance: { min: 3, max: 50 },
        moveSpeed: 1.0
    },
}

// 为指定实体类型添加目标选择器
function setupSpellCastingForEntity(entityType) {
    if (!SPELL_CONFIGS[entityType]) return

    EntityJSEvents.addGoalSelectors(entityType, event => {
        event.customGoal(
            'spell_casting',
            1, // 优先级
            mob => mob.target != null && mob.hasLineOfSight(mob.target),
            mob => mob.target != null && mob.hasLineOfSight(mob.target),
            true,
            mob => { },
            mob => { },
            true,
            mob => {
                try {
                    handleSpellCasting(mob, entityType)
                } catch (error) {
                    console.log(`[Reverie Foundry] Error in spell casting for ${entityType}: ${error}`)
                }
            }
        )
    })
}

Object.keys(SPELL_CONFIGS).forEach(entityType => {
    setupSpellCastingForEntity(entityType)
})

/**
 * 处理法术施放逻辑
 * @param {$LivingEntity} mob 
 * @param {string} entityType 
 */
function handleSpellCasting(mob, entityType) {
    const { tickCount, target } = mob
    if (!target || !mob.hasLineOfSight(target)) return

    const dist = target.distanceToEntity(mob)
    const targetPos = new Vec3d(target.x, target.y, target.z)
    mob.lookAt("eyes", targetPos)

    // 获取该生物类型的配置
    const config = SPELL_CONFIGS[entityType]
    let castSpell = false

    // 检查所有配置的法术，按距离条件施放
    for (let spellConfig of config.spells) {
        if (dist > spellConfig.minDistance && dist < spellConfig.maxDistance &&
            tickCount % spellConfig.cooldown === 0) {
            mob.initiateCastSpell(spellConfig.spell, spellConfig.castLevel)
            castSpell = true
            break // 一次只施放一个法术
        }
    }

    // 如果没有施放法术，则尝试接近目标
    if (!castSpell && dist > config.moveToDistance.min && dist < config.moveToDistance.max) {
        mob.getNavigation().moveTo(target, config.moveSpeed)
    }
}

