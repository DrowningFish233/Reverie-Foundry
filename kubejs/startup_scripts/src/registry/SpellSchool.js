StartupEvents.registry("attribute", event => {
    event.create("dream_spell_power", "spell")
        .range(1.0, 0, 10)
        // 默认值/最小值/最大值
        .attachToPlayers()
    // 自动附加到玩家

    event.create("dream_spell_resistance", "spell")
        .range(1.0, 0, 10)
        .attachToPlayers()

})

StartupEvents.registry("irons_spellbooks:schools", event => {
    event.create("dream")
        .setName(Component.translate("spellID.kubejs.dream_spell").darkPurple())  // 设置显示名称
        .setPowerAttribute("kubejs:dream_spell_power")
        .setResistanceAttribute("kubejs:dream_spell_resistance")
        .setDefaultCastSound('irons_spellbooks:cast.generic.evocation')  // 设置施法音效
        .setDamageType("kubejs:dream_magic")  // 设置伤害类型
})


EntityJSEvents.attributes(event => {
    event.allTypes.forEach(type => {
        event.modify(type, (a) => {
            a.add("kubejs:dream_spell_power");
            a.add("kubejs:dream_spell_resistance");
        });
    });
});
