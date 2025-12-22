/**
 * 都安静!时间由我来分配
 * 时间伤害加成效果
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function systemtime(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:systemtime")) {
        return;
    }

    // 获取当前时间
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // 计算时间距离（0:00或12:00）
    let distance;
    if (hours < 12) {
        distance = hours * 60 + minutes; // 距离0:00
    } else {
        distance = Math.abs((hours - 12) * 60 + minutes); // 距离12:00
    }

    // 限制最大距离
    distance = Math.min(distance, 360);

    const maxBonus = 0.75;
    const bonus = maxBonus * (1 - distance / 360);

    new_damage(event, STAGE.ADDITIVE, bonus);
}