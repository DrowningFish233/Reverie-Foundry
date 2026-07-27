//矿词兼容
LootJS.modifiers(event => {
    event.addBlockModifier('#c:ores').modifyLoot(['#c:raw_materials', '#c:gems'], item => {
        const replacement = AlmostUnified.getTagTargetItem(item)
        if (replacement.isEmpty()) {
            return item;
        }
        replacement.setCount(item.getCount());
        return replacement;
    });
});