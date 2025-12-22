//麻痹
function paralysis_effect(event) {
    const { source, entity } = event;
    const attacker = source.player;
    if (!attacker || !attacker.isLiving() || !attacker.hasEffect("kubejs:paralysis")) {
        return;
    }
    event.setDamage(1);
    const Effect = attacker.getEffect("kubejs:paralysis");
    const Amplifier = Effect.getAmplifier() - 1;
    const Time = Effect.getDuration();

    attacker.removeEffect("kubejs:paralysis");

    if (Amplifier > 0) {
        attacker.potionEffects.add("kubejs:paralysis", Time, Amplifier);
    }
}