/**
 * 怪物词缀：蚀智
 */
function mob_sanity(event) {
    const { source } = event;
    const entity = event.getEntity();
    const attacker = source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:sanity")) {
        return;
    }
    if (entity.getType() !== "minecraft:player") {
        return;
    }
    let player_sanity = entity.persistentData.getInt("sanity") || 0;
    if (player_sanity < 0) {
        entity.potionEffects.add("minecraft:slowness", 20 * 5, 1);
        const monsterDamage = event.damage;
        let newmonsterDamage = monsterDamage * 1.25
        new_damage(event, STAGE.ADDITIVE, newmonsterDamage)
    }
}