/**
 * 消耗exp免疫伤害效果
 */
function exalted_beauty_gem(event) {
    const player = event.entity;
    if (!player || !player.isPlayer()) return
    if (player.hasEffect('kubejs:exalted_beauty_gem')) {
        const effect = player.getEffect('kubejs:exalted_beauty_gem');
        const level = effect.getAmplifier() + 1;
        const chance = level * 2;
        if (event.player.xpLevel >= 10) {
            if (Math.random() * 1 < chance) {
                event.player.xpLevel -= 10
                event.cancel();
            }
        }
    }
} 
