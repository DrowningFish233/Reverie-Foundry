/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function animated_steel_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:animated_steel_ingot")) {
        return;
    }

    const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:animated_steel_ingot");
    const repairChance = traitLevel * 10;

    const weapon = attacker.getMainHandItem();
    if (!weapon.isDamageableItem()) return;

    const sharpnessLevel = weapon.getEnchantmentLevel("minecraft:sharpness");
    if (sharpnessLevel > 0) {
        const extraDamage = 0.5 * sharpnessLevel + 0.5;
        entity.attack($DamageSource("generic"), extraDamage);
    }
    if (random.nextInt(100) < repairChance) {
        const repairedAmount = 1 + random.nextInt(3);
        const newDamage = Math.max(0, weapon.getDamageValue() - repairedAmount);
        weapon.setDamageValue(newDamage);
    }
}