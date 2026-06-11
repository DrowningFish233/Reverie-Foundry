ISSEvents.spellSelection(event => {
    if (!event.entity.level.isClientSide()) return

    const ManaFlowers = [
        'kubejs:mana_flower',
        'kubejs:arcane_flower',
        "kubejs:magnet_flower",
        "kubejs:mana_cloak"

    ]

    // 检查玩家是否佩戴了列表中的任意花朵饰品
    const hasFlower = ManaFlowers.some(flowerId =>
        getCuriosItem(event.entity, flowerId)
    )
    if (!hasFlower) return
    if (event.manager.getSelection() != null) {
        let selection = event.manager.getSelection()
        let spelllevel = selection.spellData.getLevel()

        // 直接发送网络包，让服务端检查法力并决定是否喝药
        // 沟槽的方法拿不到server
        event.entity.sendData('kubejs:mana_flower', {
            spellId: selection.spellData.getSpell().getSpellId(),
            spellLevel: spelllevel
        })
    }
})
