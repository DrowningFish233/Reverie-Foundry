function monkey(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:monkey")) {
        return;
    }
    if (!attacker.onClimbable()) return
    const newdamage = event.damage / 2
    entity.attack($DamageSource("arrow"), newdamage);
}