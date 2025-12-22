/**
 * 消耗exp免疫伤害效果
 */
function exalted_beauty_gem(event) {
    const player = event.entity;
    if (!player || !player.isPlayer()) return
    if (fu_hasTraitAnywhere(player, 'kubejs:exalted_beauty_gem')) {
        const traitLevel = fu_getHighestTraitLevelAnywhere(player, 'kubejs:exalted_beauty_gem');
        const chance = traitLevel * 2;
        if (event.player.xpLevel >= 10) {
            if (Math.random() * 1 < chance) {
                event.player.xpLevel -= 10
                event.cancel();
            }
        }
    }
}