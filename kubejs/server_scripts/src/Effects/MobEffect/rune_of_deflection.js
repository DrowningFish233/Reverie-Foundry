
/**
 * 寒霜偏转刻印
 * 受到攻击时消耗1层，取消伤害并给予攻击者冰冻效果
 */
function rune_of_deflection_effect(event) {
    const { source, entity } = event;
    const actual = source.actual;

    if (!entity.hasEffect("kubejs:rune_of_deflection")) return;

    const deflectionEffect = entity.getEffect("kubejs:rune_of_deflection");
    const currentLevel = deflectionEffect.getAmplifier() + 1;

    entity.removeEffect("kubejs:rune_of_deflection");

    if (currentLevel > 1) {
        entity.potionEffects.add("kubejs:rune_of_deflection", 600, currentLevel - 2);
    }

    if (actual && actual.isLiving()) {
        const frostLevel = Math.min(16, currentLevel - 1);
        actual.potionEffects.add("terra_entity:frost_burn", 40, frostLevel);
    }
    event.cancel();
}
