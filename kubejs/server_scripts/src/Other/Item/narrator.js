EntityEvents.beforeHurt(event => {
    const { source, entity } = event;
    const attacker = source.player

    if (!attacker || !attacker.isLiving()) return;
    let item = attacker.getMainHandItem()
    if (!item || item.getId() !== 'kubejs:narrator') return;

    let playTime = attacker.stats.getPlayTime() / 20
    let bonusHours = Math.floor(playTime / 3600)

    const modifiers = [
        {
            slot: "mainhand",
            attribute: "minecraft:generic.attack_speed",
            modifier: { amount: bonusHours, operation: "add_value", id: "727700b2-71d7-4367-9e2b-e0e283cee68a" },
        },
        {
            slot: "mainhand",
            attribute: "minecraft:generic.attack_damage",
            modifier: { amount: bonusHours, operation: "add_value", id: "5ca04064-842d-41c5-88bb-b86fdbe65176" },
        }
    ]
    item.setAttributeModifiersWithTooltip(modifiers);
})
