/**
 * 处理震颤效果
 */
function handleTremor(event) {
    const { entity, source } = event;

    // 检查受伤者是否拥有震颤效果
    if (!entity.isLiving || !entity.hasEffect("kubejs:tremor")) {
        return;
    }

    // 获取当前震颤效果
    let tremorEffect = entity.getEffect("kubejs:tremor");
    let tremorLevel = tremorEffect.getAmplifier();

    // 添加3秒50%易伤效果
    entity.potionEffects.add("kubejs:hurt", 60, 0);
    // 添加2秒缓慢效果
    entity.potionEffects.add("minecraft:slowness", 40, 0);
    //震颤引爆层数-1
    let newTremorLevel = tremorLevel - 1
    entity.removeEffect("kubejs:tremor");
    entity.potionEffects.add("kubejs:tremor", tremorEffect.getDuration(), newTremorLevel);
}