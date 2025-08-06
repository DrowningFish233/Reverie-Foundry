/**
 * 欧泊[变彩]
 */
function iridescence(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:iridescence")) {
        return;
    }

    const effectLevel = attacker.getEffect('kubejs:iridescence').amplifier + 1;

    const minDamage = effectLevel;
    const maxDamage = effectLevel + 6;
    const addedDamage = minDamage + random.nextInt(maxDamage - minDamage + 1);

    new_damage(event, STAGE.FLAT, addedDamage);
}