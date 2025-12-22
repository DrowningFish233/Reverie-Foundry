ItemEvents.modifyTooltips(event => {
    event.modify('darkdoppelganger:shadow_orb', tooltip => {
        tooltip.removeLine(2)
    })
    event.modify('darkdoppelganger:summon_scroll', tooltip => {
        tooltip.removeLine(2)
    })
})