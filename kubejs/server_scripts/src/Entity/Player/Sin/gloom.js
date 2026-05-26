// priority: 10

ISSEvents.spellOnCast(event => {
    let entity = event.entity
    if (!entity || !entity.isPlayer()) return;
    let isGLOOM = entity.persistentData.getInt(sins.GLOOM) || 0;
    if (isGLOOM <= 0) return;

    // 检查是否装备了忧郁之石
    const hasStoneOfMelancholy = getCuriosItem(entity, 'kubejs:stone_of_melancholy') !== null;

    const maxLayers = hasStoneOfMelancholy ? 5 : 4;

    let arcaneLayers = getEffectLayers(entity, 'kubejs:arcane_brand') || 0;
    let newLayers = Math.min(maxLayers, arcaneLayers + 1);

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

        // 检查是否装备了忧郁之石
        const hasStoneOfMelancholy = getCuriosItem(attacker, 'kubejs:stone_of_melancholy') !== null;

        if (!hasStoneOfMelancholy) return;

        let arcaneLayers = getEffectLayers(attacker, 'kubejs:arcane_brand') || 0;

        if (arcaneLayers >= 5) {
            const spellPower = attacker.getAttributeValue("irons_spellbooks:spell_power");
            const damage = 20 + spellPower * 0.5;
            attackEntity(entity, 'magic', damage, true);

            if (entity.hasEffect('kubejs:arcane_erosion')) {
                addEffectLayers(entity, 'kubejs:arcane_erosion', 1);
            } else {
                entity.potionEffects.add('kubejs:arcane_erosion', 6000, 0);
            }

            attacker.removeEffect('kubejs:arcane_brand');
        }
    })
    .register();

// 奥术侵蚀死亡效果
EntityEvents.death(event => {
    const entity = event.entity;
    if (!entity || !entity.isLiving()) return;
    if (!entity.hasEffect('kubejs:arcane_erosion')) return;

    const nearbyPlayers = entity.level.getPlayers();
    nearbyPlayers.forEach(player => {
        const hasStoneOfMelancholy = getCuriosItem(player, 'kubejs:stone_of_melancholy') !== null;
        if (!hasStoneOfMelancholy) return;

        if (player.distanceToEntity(entity) <= 10) {
            let healAmount = player.getMaxHealth() * 0.05;
            player.heal(healAmount);

            let magicData = getPlayerMagicData(player);
            if (magicData) {
                magicData.addMana(200);
            }
        }
    });
});