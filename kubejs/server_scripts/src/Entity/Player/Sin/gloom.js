// priority: 10

ISSEvents.spellOnCast(event => {
    let entity = event.entity
    if (!entity == "minecraft:player") return
    let isGLOOM = entity.persistentData.getInt(sins.GLOOM) || 0;
    if (isGLOOM <= 0) return;

    let arcaneLayers = getEffectLayers(entity, 'kubejs:arcane_brand') || 0;
    let newLayers = Math.min(5, arcaneLayers + 1);

    if (entity.hasEffect('kubejs:arcane_brand')) {
        entity.removeEffect('kubejs:arcane_brand');
    }
    entity.potionEffects.add('kubejs:arcane_brand', 1200, newLayers - 1);
});


// 法术凝聚满层效果
RFTrait('kubejs:arcane_brand', 999)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isPlayer()) return;

        let isGLOOM = attacker.persistentData.getInt(sins.GLOOM) || 0;
        if (isGLOOM <= 0) return;
        let arcaneLayers = getEffectLayers(attacker, 'kubejs:arcane_brand') || 0;

        if (arcaneLayers >= 5) {
            const spellPower = attacker.getAttributeValue("irons_spellbooks:spell_power");
            const damage = 20 + spellPower * 0.5;
            attackEntity(entity, 'magic', damage, true);

            if (entity.hasEffect('kubejs:arcane_brand')) {
                addEffectLayers(entity, 'kubejs:arcane_brand', 1);
            } else {
                entity.potionEffects.add('kubejs:arcane_brand', 6000, 0);
            }

            attacker.removeEffect('kubejs:arcane_brand');
        }
    })
    .register();

// 奥术烙印死亡效果
EntityEvents.death(event => {
    const entity = event.entity;
    if (!entity || !entity.isLiving()) return;
    if (!entity.hasEffect('kubejs:arcane_brand')) return;

    const nearbyPlayers = entity.level.getPlayers();
    nearbyPlayers.forEach(player => {
        if (player.distanceToEntity(entity) <= 10) {
            const healAmount = player.getMaxHealth() * 0.15;
            player.heal(healAmount);

            const magicData = getPlayerMagicData(player);
            if (magicData) {
                magicData.addMana(200);
            }
        }
    });
});