StartupEvents.registry("attribute", event => {
    // 属性应先在此注册，然后才能在下方事件中使用
    event.create("dream_spell_power", "spell")
        .range(1.0, 0, 10)       // 默认值6.0，最小值0，最大值10
        .attachToPlayers()       // 自动附加到玩家

    event.create("dream_spell_resistance", "spell")
        .range(1.0, 0, 10)
        .attachToPlayers()

})

StartupEvents.registry("irons_spellbooks:schools", event => {
    event.create("dream")
        .setName(Component.of("幻梦").darkPurple())  // 设置显示名称
        .setPowerAttribute("kubejs:dream_spell_power")
        .setResistanceAttribute("kubejs:dream_spell_resistance")
        .setDefaultCastSound('minecraft:entity.chicken.death')  // 设置施法音效
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
