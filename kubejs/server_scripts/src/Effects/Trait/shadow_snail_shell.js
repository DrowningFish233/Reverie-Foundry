/**
 * 暗影蜗牛
 */
function shadow_snail_shell(event) {
    const { source, entity } = event;
    const actual = source.actual;

    if (!fu_hasTraitAnywhere(entity, 'kubejs:shadow_snail_shell')) return;
    if (!entity.crouching || !actual) return

    new_damage(event, STAGE.MULTIPLY, 0.15)

}

/**
 * 暗影蜗牛
 */
function shadow_snail_shell_attack(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !attacker.crouching || !fu_hasTraitAnywhere(attacker, "kubejs:shadow_snail_shell")) {
        return;
    }
    new_damage(event, STAGE.MULTIPLY, 0.15)
}