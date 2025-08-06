/**
 * 暴怒效果 
 */
function wrath_onPlayerHurt(event) {
    const { source, entity } = event;
    const player = entity;
    const attacker = source.actual;

    // 条件检查
    if (!player?.isLiving || !player.isPlayer() || !player.hasEffect("kubejs:wrath") || !attacker?.isLiving) {
        return;
    }

    // 对攻击者施加效果
    attacker.potionEffects.add('minecraft:glowing', 400, 0); // 20秒发光
    attacker.potionEffects.add('kubejs:wrath_damage', 400, 0); // 20秒标记

}