/**
 * 铁魔法通用特性(主要给奥术锭)(以前的忘记了重写)
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function arcane_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player

    if (!attacker || !attacker.isLiving()) return;

    if (!fu_hasTraitAnywhere(attacker, "kubejs:arcane_ingot")) return;

    const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:arcane_ingot");

    const magicData = attacker.getMagicData();
    const currentMana = magicData.getMana();

    const baseBonusLimit = 0.2 * traitLevel;

    let damageMultiplier = 1.0;

    if (currentMana < 50) {
        damageMultiplier = 0.8;
    } else if (currentMana <= 100) {
        const progress = (currentMana - 50) / 50;
        const bonus = progress * baseBonusLimit;
        damageMultiplier = 1.0 + bonus;
    } else {
        const baseBonus = baseBonusLimit;

        const extraMana = currentMana - 100;
        const extraBonus = Math.floor(extraMana / 10) * 0.01;

        const totalBonus = baseBonus + extraBonus;
        damageMultiplier = 1.0 + totalBonus;
    }

    new_damage(event, STAGE.ADDITIVE, damageMultiplier);

}