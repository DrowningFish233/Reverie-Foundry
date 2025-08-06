/**
 * 回响碎片
 * 武器攻击力增加[词条等级x词条等级]点
 */
function echo_shard(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:echo_shard")) {
        return;
    }
    const Effect = attacker.getEffect("kubejs:echo_shard");
    const Level = Effect.getAmplifier() + 1;
    const other_damage = Level * Level
    new_damage(event, STAGE.FLAT, other_damage);

}