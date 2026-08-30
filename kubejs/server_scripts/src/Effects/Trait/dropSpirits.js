/**
 * 击碎灵魂
 */
EntityEvents.death(event => {
    if (!event.source.actual) return
    if (!event.entity.isLiving() || !event.source.actual.isPlayer()) return
    if (!fu_hasTraitAnywhere(event.source.actual, "kubejs:strikesoul")) return
    fu_dropSpirits(event.entity, event.source.actual)
    fu_forceReapingDrop(event.entity)
})
