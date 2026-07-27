/**
 * 尝试使用技能（自动处理冷却）
 * @param {Internal.Player} player 玩家
 * @param {string|string[]} cooldownIds 冷却ID（单个或数组）
 * @param {number|number[]} ticks 冷却刻数
 * @param {Function} CooldownAction 技能动作
 * @returns {boolean} 是否成功执行
 * 
 * @example
 * // 单个冷却，100 tick = 5秒
 * trySkill(player, "dash", 100, () => {
 * })
 * 
 * @example
 * // 多个冷却，相同时间
 * trySkill(player, ["skill1", "skill2"], 200, () => {
 * })
 * 
 * @example
 * // 多个冷却，不同时间
 * trySkill(player, ["ultimate", "skill_a"], [600, 100], () => {
 * })
 */
function trySkill(player, cooldownIds, ticks, CooldownAction) {
    let ids = Array.isArray(cooldownIds) ? cooldownIds : [cooldownIds];
    let times = Array.isArray(ticks) ? ticks : ids.map(() => ticks);

    for (let i = 0; i < ids.length; i++) {
        if ($CooldownManager.hasCooldown(player, ids[i])) {
            return false;
        }
    }

    CooldownAction();

    for (let i = 0; i < ids.length; i++) {
        $CooldownManager.setCooldown(player, ids[i], times[i]);
    }
    return true;
}

ServerEvents.tick(event => {
    let server = event.getServer()
    $CooldownManager.tickCleanup(server);
})

