/**
 * 星佑: 受伤时释放流星雨
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function aethersent_ingot(event) {
    const { source, entity } = event;
    const attacker = source.actual;
    // 检查条件
    if (!attacker || !entity.isLiving() || !entity.isPlayer() || !fu_hasTraitAnywhere(entity, "kubejs:aethersent_ingot")) return;

    let level = entity.level
    let target = findTarget(entity);
    if (!target) {
        return; // 没有目标则退出
    }

    // 特质等级
    const traitLevel = fu_getHighestTraitLevelAnywhere(entity, "kubejs:aethersent_ingot");
    $MeteorClass.createMeteorShower(
        level,
        entity,
        target,
        target.x,
        target.y,
        target.z,
        80
    )
    let meteors = level.getEntitiesOfClass($MeteorClass, target.getBoundingBox().inflate(80))
    meteors.forEach(meteor => {
        if (meteor.getOwner() == entity) {
            meteor.setSize(traitLevel)
        }
    })
}