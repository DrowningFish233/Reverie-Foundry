function envy(event) {
    const attacker = event.source.player || event.source.entity;
    const target = event.entity;
    if (!attacker || !target || !target.living) {
        return;
    }
    if (attacker.hasEffect("kubejs:envy")) {
        let envy_number = attacker.persistentData.getInt("envy_number") || 0;
        let envy_effect = 0;
        const effects = target.getActiveEffects();
        if (!effects || effects.length === 0) {
            return;
        }
        const effectsToRemove = [];
        for (let effect of effects) {
            if (effect && effect.effect) {
                const effectType = effect.effect;
                attacker.potionEffects.add(effectType, 200, 0);
                effectsToRemove.push(effectType);
                envy_effect += 1;
            }
        }
        for (let effectType of effectsToRemove) {
            target.removeEffect(effectType);
        }
        envy_number += envy_effect;
        attacker.persistentData.putInt("envy_number", envy_number);
    }
}