/**
 * 世界吞噬者
 */
BlockEvents.broken(event => {
    const { player, block } = event;
    if (!player || !player.isPlayer()) return;
    const item = player.getMainHandItem();
    if (item.getId() === "minecraft:air") return;

    if (!fu_hasTraitMainHand(player, "kubejs:demonite_ingot")) return;

    const traitLevel = fu_getTraitLevelMainHand(player, "kubejs:demonite_ingot");

    const MAX_ENERGY = traitLevel * 10000;
    let currentEnergy = getDataValue(item, "demonite_ingot_blocks", 0);

    currentEnergy = Math.min(currentEnergy + 1, MAX_ENERGY);
    setDataValue(item, "demonite_ingot_blocks", currentEnergy);

    const triggerChance = 0.25 + (traitLevel * 0.05);
    if (Math.random() < triggerChance) {
        const needsFood = player.getFoodLevel() < 20;
        const needsSaturation = player.getSaturation() < 20;

        if (!needsFood && !needsSaturation) return;
        // 计算所需的能量消耗
        const requiredEnergy = Math.max(10, 100 - (traitLevel * 30));
        if (currentEnergy < requiredEnergy) return;

        const baseFood = 1 + traitLevel;
        const baseSaturation = 1 + traitLevel;

        if (Math.random() < 0.5) {
            const duration = 40 + (traitLevel * 40);
            const amplifier = Math.min(3, Math.floor(traitLevel - 1));
            player.potionEffects.add("minecraft:regeneration", duration, amplifier);

            currentEnergy -= requiredEnergy;
            setDataValue(item, "demonite_ingot_blocks", currentEnergy);
        } else {
            if (needsFood || needsSaturation) {
                const currentFood = player.getFoodLevel();
                const currentSaturation = player.getSaturation();
                if (needsFood) {
                    const foodToAdd = Math.min(baseFood, 20 - currentFood);
                    player.setFoodLevel(currentFood + foodToAdd);

                    if (foodToAdd < baseFood && needsSaturation) {
                        const saturationLeft = baseFood - foodToAdd;
                        const saturationToAdd = Math.min(saturationLeft, 20 - currentSaturation);
                        player.setSaturation(currentSaturation + saturationToAdd);
                    }
                } else if (needsSaturation) {
                    const saturationToAdd = Math.min(baseSaturation, 20 - currentSaturation);
                    player.setSaturation(currentSaturation + saturationToAdd);
                }
                currentEnergy -= requiredEnergy;
                setDataValue(item, "demonite_ingot_blocks", currentEnergy);
            }
        }
    }
});


/**
 * 世界吞噬者 - 受击
 */
function demonite_ingot(event) {
    const { source, entity, damage } = event;
    const attacker = source.actual;
    if (!entity.isLiving() || !entity.isPlayer() || !fu_hasTraitMainHand(entity, "kubejs:demonite_ingot")) return;

    const traitLevel = fu_getTraitLevelMainHand(entity, "kubejs:demonite_ingot");
    const MAX_ENERGY = traitLevel * 10000;
    const item = entity.getMainHandItem();
    let currentEnergy = getDataValue(item, "demonite_ingot_blocks", 0);

    if (currentEnergy <= 0) return;
    const damagePerEnergy = 0.01 * (1 + 0.2 * traitLevel);
    const maxAbsorbableDamage = currentEnergy * damagePerEnergy;

    const maxReductionPercent = traitLevel * 0.15;
    const maxAllowedDamage = damage * maxReductionPercent;
    const absorbedDamage = Math.min(damage, maxAbsorbableDamage, maxAllowedDamage);

    if (absorbedDamage > 0) {
        const energyRequired = Math.ceil(absorbedDamage / damagePerEnergy);
        let totalEnergyCost = energyRequired;
        currentEnergy = Math.max(0, currentEnergy - energyRequired);

        const damageReductionPercent = absorbedDamage / damage;
        const remainingDamagePercent = 1 - damageReductionPercent;
        new_damage(event, STAGE.ADDITIVE, remainingDamagePercent);

        entity.heal(traitLevel * 2);
        if (traitLevel >= 2) {
            const resistanceDuration = 60 + (traitLevel * 30);
            entity.potionEffects.add("resistance", resistanceDuration, 0);
        }
        if (traitLevel >= 3) {
            const absorptionCostPerPoint = 50;
            const absorptionAmount = traitLevel * 2 + 2;
            const absorptionEnergyCost = absorptionAmount * absorptionCostPerPoint;

            if (currentEnergy >= absorptionEnergyCost) {
                const absorptionDuration = 100 + (traitLevel * 10);
                const absorptionAmplifier = Math.min(2, Math.floor(traitLevel - 1));
                entity.potionEffects.add("kubejs:absorption", absorptionDuration, absorptionAmplifier);

                const currentAbsorption = entity.getAbsorptionAmount();
                const newAbsorption = currentAbsorption + absorptionAmount;
                entity.setAbsorptionAmount(newAbsorption);

                currentEnergy = Math.max(0, currentEnergy - absorptionEnergyCost);
                totalEnergyCost += absorptionEnergyCost;
            }
        }

        // 更新能量值
        setDataValue(item, "demonite_ingot_blocks", currentEnergy);
    }
}