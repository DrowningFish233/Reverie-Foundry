EntityEvents.spawned(event => {
    let validEntities = [
        'irons_spellbooks:summoned_zombie',
        'irons_spellbooks:summoned_skeleton',
        'irons_spellbooks:summoned_polar_bear',
        'irons_spellbooks:summoned_vex',
        'cataclysm_spellbooks:summoned_koboldiator',
        'cataclysm_spellbooks:summoned_koboleton',
        'cataclysm_spellbooks:summoned_amethyst_crab',
        'cataclysm_spellbooks:summoned_ignited_revenant',
        'cataclysm_spellbooks:summoned_ignited_berserker',
        'cataclysm_spellbooks:summoned_draugur',
        'cataclysm_spellbooks:summoned_royal_draugur',
        'cataclysm_spellbooks:summoned_elite_draugur',
        'cataclysm_spellbooks:summoned_aptrgangr'
    ];

    if (!validEntities.some(c => c == event.entity.getType())) return;
    if (event.entity.persistentData.Multy) return;
    let summoner = $SummonManager.getOwner(event.entity);
    if (summoner && summoner instanceof Player) {
        applyAttributeBoost(event.entity, summoner);
    } else {
        //延迟应用以修复未能正确应用属性值的问题(灾变法术书附属)
        event.server.scheduleInTicks(5, () => {
            if (event.entity.isRemoved()) return;

            let delayedSummoner = $SummonManager.getOwner(event.entity);
            if (delayedSummoner && delayedSummoner instanceof Player) {
                applyAttributeBoost(event.entity, delayedSummoner);
            }
        });
    }
});

function applyAttributeBoost(entity, summoner) {
    // 防止重复增强
    if (entity.persistentData.Multy) return;

    let multiplier = summoner.getAttribute('irons_spellbooks:evocation_spell_power')?.value ?? 1;

    // 增强生命值
    let healthAttr = entity.getAttribute('minecraft:generic.max_health');
    if (healthAttr) {
        let originalHealth = healthAttr.value;
        healthAttr.setBaseValue(originalHealth * multiplier);
        entity.setHealth(healthAttr.value); // 同时设置当前生命值
    }

    // 增强攻击伤害
    let damageAttr = entity.getAttribute('minecraft:generic.attack_damage');
    if (damageAttr) {
        damageAttr.setBaseValue(damageAttr.value * multiplier);
    }
    entity.persistentData.Multy = 1;

}
