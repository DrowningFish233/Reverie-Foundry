ItemEvents.modifyTooltips(event => {

    event.modify('darkdoppelganger:summon_scroll', tooltip => {
        tooltip.clear()
        tooltip.add(Text.translate("item.darkdoppelganger.summon_scroll"))
        tooltip.add(Text.translate("tooltip.kubejs.darkdoppelganger.summon_scroll.desc"))
        tooltip.add(Text.translate("tooltip.kubejs.darkdoppelganger.summon_scroll.desc.2"))
    })
})

ItemEvents.modifyTooltips(event => {
    event.modify('silentgear:mod_kit', tooltip => {
        tooltip.clear()
        tooltip.add(Text.translate("item.silentgear.mod_kit"))
        tooltip.add(Text.translate("tooltip.kubejs.silentgear.mod_kit.desc"))
        tooltip.add(Text.translate("tooltip.kubejs.silentgear.mod_kit.desc.2"))
        tooltip.add(Text.translate("tooltip.kubejs.silentgear.mod_kit.desc.3"))
    })
})