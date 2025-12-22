/**
 * 回响碎片
 * 武器攻击力增加[词条等级x词条等级]点
 */
function echo_shard(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:echo_shard")) {
        return;
    }
    const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:echo_shard");
    const other_damage = traitLevel * traitLevel
    new_damage(event, STAGE.FLAT, other_damage);

}