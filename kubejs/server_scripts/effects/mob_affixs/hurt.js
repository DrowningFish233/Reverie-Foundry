/**
 * 处理易伤效果
 */
function hurtEffect(event) {
    const { entity, source } = event;

    // 检查受伤者是否拥有易伤效果
    if (!entity.isLiving || !entity.hasEffect("kubejs:hurt")) {
        return;
    }

    // 获取当前易伤效果
    let hurtEffect = entity.getEffect("kubejs:hurt");
    let hurtLevel = hurtEffect.getAmplifier();

    new_damage(event, STAGE.ADDITIVE, hurtLevel * 0.5);
}