ItemEvents.modifyTooltips(event => {
    event.modify('darkdoppelganger:shadow_orb', tooltip => {
        tooltip.clear()
        tooltip.add(Text.translate("item.darkdoppelganger.shadow_orb"))
        tooltip.add(Text.translate("tooltip.kubejs.darkdoppelganger.shadow_orb.desc"))

    })
    event.modify('darkdoppelganger:summon_scroll', tooltip => {
        tooltip.clear()
        tooltip.add(Text.translate("item.darkdoppelganger.summon_scroll"))
        tooltip.add(Text.translate("tooltip.kubejs.darkdoppelganger.summon_scroll.desc"))
        tooltip.add(Text.translate("tooltip.kubejs.darkdoppelganger.summon_scroll.desc.2"))

    })
})