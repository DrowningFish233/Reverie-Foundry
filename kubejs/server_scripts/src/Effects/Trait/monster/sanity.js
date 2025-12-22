/**
 * 怪物词缀：蚀智
 */
function mob_sanity(event) {
    const { source, player } = event;
    const actual = source.actual;

    if (!actual || !actual.isLiving() || !actual.hasEffect("kubejs:sanity")) {
        return;
    }
    if (!player.isPlayer()) return
    let player_sanity = player.persistentData.getInt("sanity") || 0;
    if (player_sanity < 0) {
        player.potionEffects.add("minecraft:slowness", 20 * 5, 1);
        const monsterDamage = event.damage;
        let newmonsterDamage = monsterDamage * 1.25
        new_damage(event, STAGE.ADDITIVE, newmonsterDamage)
    }
}