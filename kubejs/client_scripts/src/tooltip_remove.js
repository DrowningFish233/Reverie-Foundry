ItemEvents.modifyTooltips(event => {

    event.modify('darkdoppelganger:summon_scroll', tooltip => {
        tooltip.clear()
        tooltip.add(Text.translate("item.darkdoppelganger.summon_scroll"))
        tooltip.add(Text.translate("tooltip.kubejs.darkdoppelganger.summon_scroll.desc"))
        tooltip.add(Text.translate("tooltip.kubejs.darkdoppelganger.summon_scroll.desc.2"))
    })
})