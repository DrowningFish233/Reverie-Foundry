/**
 * 修复女巫逆天回血（没找到哪个mod干的...byd）
 */
function EntityFix(entity, duration, amplifier) {
    if (!entity || entity.isPlayer()) return;

    entity.potionEffects.add("kubejs:miracle_blight", duration, amplifier);
}

/**
 * 根据实体ID配置禁疗
 */
const ENTITYFIX_CONFIG = {
    "minecraft:witch": { duration: 100, level: 0 },
};

/**
 * 动态减伤主逻辑
 */
function EntityFixOther(event) {
    const entity = event.getEntity();
    if (!entity || entity.isPlayer()) return;

    // 根据实体ID获取配置
    const entityId = entity.getType();
    const config = ENTITYFIX_CONFIG[entityId];

    // 如果实体在配置表中，则施加对应效果
    if (config) {
        EntityFix(entity, config.duration, config.level);
    }
}



/**
 * 动态减伤逻辑
 */
function EntityFixMain(event) {
    EntityFixOther(event)
}