//为生物添加施法兼容性
//巫妖
EntityJSEvents.addGoalSelectors('twilightforest:lich', event => {
    event.arbitraryGoal(2, (e) => {
        return new WizardAttackGoal(e, 1, 50)
            .setSpells(
                [], // 攻击
                [Spell.of('irons_spellbooks:oakskin'), Spell.of('irons_spellbooks:shield')],// 防御
                [], // 移动
                [
                    Spell.of('irons_spellbooks:raise_dead'),
                    Spell.of('irons_spellbooks:slow'),
                    Spell.of('irons_spellbooks:blight'),
                    Spell.of('irons_spellbooks:summon_vex')
                ]// 支援
            )
    })
})