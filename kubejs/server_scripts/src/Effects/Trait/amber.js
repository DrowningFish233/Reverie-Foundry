/**
 * 琥珀
 * 猛虎之血
 * 持有者受到伤害时，有[词条等级x10%]概率获得5秒的力量3速度3效果
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function amber(event) {
    const { entity } = event;
    if (!entity.isPlayer() || !fu_hasTraitAnywhere(entity, "kubejs:amber")) {
        return;
    }

    const traitLevel = fu_getHighestTraitLevelAnywhere(entity, "kubejs:amber");
    const triggerChance = traitLevel * 0.1; // 词条等级x10%

    if (Math.random() < triggerChance) {
        entity.potionEffects.add("minecraft:strength", 100, 2); // 5秒力量3
        entity.potionEffects.add("minecraft:speed", 100, 2);    // 5秒速度3
    }
}