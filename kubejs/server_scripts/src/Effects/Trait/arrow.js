/**
 * 当受到箭矢伤害时，10%概率格挡全额伤害，格挡成功后自身生命值恢复10%
 */
function kubejs_arrow(event) {
    const entity = event.entity;
    if (event.source.getType() !== 'arrow') return;
    if (fu_getHighestTraitLevelAnywhere(entity, "kubejs:arrow")) return;
    if (random.nextDouble() < 0.1) {
        const healAmount = entity.getMaxHealth() * 0.1;
        entity.setHealth(Math.min(
            entity.getHealth() + healAmount,
            entity.getMaxHealth()
        ));
        event.cancel();
    }
}
/**
 * 锁链套套装效果
 * 
 * 当受到箭矢伤害时，5%概率格挡全额伤害，格挡成功后自身生命值恢复1%
 */
function chainmail_arrow(event) {
    const entity = event.entity;
    if (event.source.getType() !== 'arrow') return;
    if (!entity.hasEffect('kubejs:chainmail_arrow')) return;
    if (random.nextDouble() < 0.05) {
        const healAmount = entity.getMaxHealth() * 0.01;
        entity.setHealth(Math.min(
            entity.getHealth() + healAmount,
            entity.getMaxHealth()
        ));
        event.cancel();
    }
}


