//防御害虫
const PROTECTED_EFFECTS = [
    'kubejs:fire',
    'kubejs:bleed',
    'kubejs:tremor',
    'kubejs:hurt',
    'kubejs:soul_fire',
    'minecraft:poison'
];

NativeEvents.onEvent($MobEffectEvent$Applicable, event => {
    const entity = event.getEntity();
    const effectInstance = event.getEffectInstance();
    if (entity.getType() != "minecraft:player") return;

    if (!entity.hasEffect('kubejs:pest_defense')) return;

    const effectId = convertEffectId(effectInstance.getDescriptionId());

    if (!PROTECTED_EFFECTS.includes(effectId)) return;

    const defensePest = entity.getEffect('kubejs:pest_defense');
    const defensePestAmplifier = defensePest.getAmplifier();
    const defensePestLayers = defensePestAmplifier + 1;

    const newEffectAmplifier = effectInstance.getAmplifier();
    const newEffectLayers = newEffectAmplifier + 1;

    const layersToConsume = Math.min(newEffectLayers, defensePestLayers);
    const remainingLayers = defensePestLayers - layersToConsume;
    const excessLayers = newEffectLayers - layersToConsume;

    event.setResult("do_not_apply");

    if (remainingLayers > 0) {
        const newDuration = defensePest.getDuration();
        entity.removeEffect('kubejs:pest_defense');
        entity.potionEffects.add('kubejs:pest_defense', newDuration, remainingLayers - 1);
    } else {
        entity.removeEffect('kubejs:pest_defense');
    }

    if (excessLayers > 0) {
        const originalDuration = effectInstance.getDuration();
        entity.potionEffects.add(effectId, originalDuration, excessLayers - 1);
    }
});
