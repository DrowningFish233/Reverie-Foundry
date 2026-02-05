/**
 * 处理流血效果
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function handleBleed(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !attacker.hasEffect("kubejs:bleed")) {
        return;
    }
    const bleedEffect = attacker.getEffect("kubejs:bleed");
    const currentLevel = bleedEffect.getAmplifier() + 1;
    const Time = bleedEffect.getDuration();
    const newLevel = Math.floor(currentLevel / 3); // 保留层数

    attackEntity(attacker, 'kubejs:bleed', currentLevel * 2)
    if (attacker.hasEffect("kubejs:bloodlust")) return
    attacker.removeEffect("kubejs:bleed");
    if (newLevel > 0) {
        attacker.potionEffects.add("kubejs:bleed", Time, newLevel - 1);
    }
}