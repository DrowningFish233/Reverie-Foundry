/**
 * 毒爆术
 * 攻击会消耗 词缀等级*2层中毒，并直接造成伤害
 */
function luminofish_ink_sac(event) {
    const { source, entity } = event;
    const attacker = source.player

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:luminofish_ink_sac")) {
        return;
    }
    if (!entity.hasEffect("minecraft:poison")) return;
    const traitLevel = fu_getTraitLevel(attacker, "kubejs:luminofish_ink_sac") + 1;
    const poisonCost = traitLevel * 2;
    const poisonEffect = entity.getEffect("minecraft:poison");
    const currentAmplifier = poisonEffect.getAmplifier();
    const currentDuration = poisonEffect.getDuration();

    if (currentAmplifier + 1 < poisonCost) return;

    const baseDamage = poisonCost * 1.5;
    const levelBonus = traitLevel * 1.5;
    const totalDamage = baseDamage + levelBonus;

    attackEntity(entity, "minecraft:magic", totalDamage, true)
    if (currentAmplifier + 1 > poisonCost) {
        const newAmplifier = currentAmplifier - poisonCost;
        entity.removeEffect("minecraft:poison");
        entity.potionEffects.add("minecraft:poison", currentDuration, newAmplifier);
    } else {
        entity.removeEffect("minecraft:poison");
    }
}