/**
 * 处理流血效果 
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function handleBleed(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !attacker.hasEffect("kubejs:bleed")) {
        return;
    }

    const currentLayers = getEffectLayers(attacker, "kubejs:bleed");
    attackEntity(attacker, 'kubejs:bleed', currentLayers);
    if (attacker.hasEffect("kubejs:bloodlust")) return;
    const newLayers = Math.floor(currentLayers * 2 / 3);
    if (newLayers <= 0) {
        attacker.removeEffect("kubejs:bleed");
    } else {
        const bleedEffect = attacker.getEffect("kubejs:bleed");
        const duration = bleedEffect.getDuration();
        const baseStrength = getBaseStrength(attacker, "kubejs:bleed");
        attacker.removeEffect("kubejs:bleed");
        attacker.potionEffects.add("kubejs:bleed", duration, newLayers - 1);
    }
}
