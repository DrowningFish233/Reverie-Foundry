EntityEvents.spawned(event => {
    let validEntities = [
        'irons_spellbooks:summoned_zombie',
        'irons_spellbooks:summoned_skeleton',
        'irons_spellbooks:summoned_polar_bear',
        'irons_spellbooks:summoned_vex',
    ];

    if (!validEntities.some(c => c == event.entity.type)) return;

    let entityData = event.entity.persistentData;
    if (entityData.Multy) return;

    let summonerUUID = event.entity.nbt.Summoner;
    if (!summonerUUID) return;

    let summoner = event.server.getPlayers().find(p => p.nbt.UUID.toString() === summonerUUID.toString());
    if (!summoner) return;

    let multiplier = summoner.getAttribute('irons_spellbooks:evocation_spell_power')?.value ?? 1;
    let healthAttr = event.entity.getAttribute('minecraft:generic.max_health');
    if (healthAttr) {
        healthAttr.setBaseValue(healthAttr.value * multiplier);
        event.entity.setHealth(healthAttr.value);
    }
    let damageAttr = event.entity.getAttribute('minecraft:generic.attack_damage');
    if (damageAttr) {
        damageAttr.setBaseValue(damageAttr.value * multiplier);
    }
    entityData.Multy = 1;
});

