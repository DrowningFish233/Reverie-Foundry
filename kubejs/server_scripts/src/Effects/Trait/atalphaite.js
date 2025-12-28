/**
 * 受洗效果：根据词缀等级周期移除负面效果
 * @param {*} event 
 * @param {*} player 
 * @param {*} tick 
 */
function xelkive_ingot_effect(event, player, tick) {
    if (tick % 100 === 0 || tick % 200 === 0) {
        if (!player.isLiving() || !fu_hasTraitAnywhere(player, "kubejs:xelkive_ingot")) return;

        const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:xelkive_ingot");
        const intervalTicks = (15 - (traitLevel * 5)) * 20;

        if (tick % intervalTicks === 0) {
            removeRandomNegativeEffect(player);
        }
    }
}