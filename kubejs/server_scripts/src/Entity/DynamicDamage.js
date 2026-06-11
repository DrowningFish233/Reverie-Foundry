/**
 * 动态减伤-施加 - 根据实体ID施加不同等级/持续时间的减伤效果
 * @param {Entity} entity - 目标实体
 * @param {number} duration - 基础持续时间（刻）
 * @param {number} amplifier - 效果等级
 */
function applyAdaptiveReduction(entity, duration, amplifier) {
    if (!entity || entity.isPlayer()) return;

    entity.potionEffects.add("kubejs:adaptive_damage_reduction", duration, amplifier);
}

/**
 * 根据实体ID配置减伤
 */
const ENTITY_CONFIG = {
    "eternal_starlight:starlight_golem": { duration: 30, level: 1 },
    "eternal_starlight:lunar_monstrosity": { duration: 30, level: 1 }

};

/**
 * 动态减伤主逻辑
 */
function adaptive_damage(event) {
    const entity = event.getEntity();
    if (!entity || entity.isPlayer()) return;

    // 根据实体ID获取配置
    const entityId = entity.getType();
    const config = ENTITY_CONFIG[entityId];

    // 如果实体在配置表中，则施加对应效果
    if (config) {
        applyAdaptiveReduction(entity, config.duration, config.level);
    }
}


/**
 * 动态减伤效果处理函数
 */
function dynamic_damage(event) {
    const entity = event.getEntity();
    if (entity.isPlayer()) return;

    if (entity.hasEffect("kubejs:adaptive_damage_reduction")) {
        const effect = entity.getEffect("kubejs:adaptive_damage_reduction");
        const duration = effect.getDuration();
        const amplifier = effect.getAmplifier();

        // 基础参数
        const baseReductionPerLevel = 0.1;    // 每等级基础加成
        const timeBasedMaxReduction = 0.4;   // 初始减伤上限
        const maxDuration = 80;             // 参考时长
        const absoluteMaxReduction = 0.7;    // 全局减伤上限70%

        const isInfinite = duration < 0;
        const timeRatio = isInfinite ? 1 : Math.min(duration / maxDuration, 1);

        // 计算减伤
        const timeBasedReduction = timeRatio * timeBasedMaxReduction;
        const levelBonus = baseReductionPerLevel * amplifier;
        const totalReduction = Math.min(timeBasedReduction + levelBonus, absoluteMaxReduction);

        // 应用减伤
        new_damage(event, STAGE.MULTIPLY, 1.0 - totalReduction);
        /*
                // 调试日志
                console.log(
                [Reverie Foundry]
                    `动态减伤：等级${amplifier}，${isInfinite ? "无限" : duration + "刻"}，` +
                    `时间贡献${(timeBasedReduction * 100).toFixed(1)}%，` +
                    `等级贡献${(levelBonus * 100).toFixed(1)}%，` +
                    `总减伤${(totalReduction * 100).toFixed(1)}%`
                );
        */
    }
}

/**
 * 动态减伤逻辑
 */
function all_dynamic_damage(event) {
    adaptive_damage(event)
    dynamic_damage(event)
}
