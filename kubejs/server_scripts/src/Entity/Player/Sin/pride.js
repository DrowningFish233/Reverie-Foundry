// priority: 10
// 傲慢特质
RFTrait('kubejs:pride', 999)
    .onTick(20, event => {
        let { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;

        let isPRIDE = entity.persistentData.getInt(sins.PRIDE) || 0;
        if (isPRIDE <= 0) return;

        entity.potionEffects.add("kubejs:pride", 80, 0);

        let hasCrownOfPride = getCuriosItem(entity, 'kubejs:crown_of_pride') !== null;
        let maxGodhoodLayers = hasCrownOfPride ? 10 : 6;

        let godhoodLayers = getEffectLayers(entity, 'kubejs:godhood') || 0;
        let newLayers = Math.min(maxGodhoodLayers, godhoodLayers + 1);

        if (entity.hasEffect('kubejs:godhood')) {
            entity.removeEffect('kubejs:godhood');
        }
        entity.potionEffects.add('kubejs:godhood', 1200, newLayers - 1);
    })

    .beforeHurt(event => {
        let { source, entity } = event;
        let attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving()) return;
        if (!attacker.hasEffect("kubejs:pride")) return;
        if (!entity || !entity.isLiving()) return;

        let hasCrownOfPride = getCuriosItem(attacker, 'kubejs:crown_of_pride') !== null;

        let godhoodLayers = getEffectLayers(attacker, 'kubejs:godhood') || 0;

        let critChancePerLayer = hasCrownOfPride ? 15 : 7.5;
        let critChance = godhoodLayers * critChancePerLayer;
        let roll = Math.random() * 100;

        if (roll < critChance) {
            let maxDivinityLayers = hasCrownOfPride ? 10 : 6;
            let divinityLayers = getEffectLayers(attacker, 'kubejs:divinity') || 0;
            let newDivinityLayers = Math.min(maxDivinityLayers, divinityLayers + 1);

            let totalCritDamage = 1 + (hasCrownOfPride ? 0.2 : 0.1) + (newDivinityLayers * 0.05);
            new_damage(event, STAGE.ADDITIVE, totalCritDamage);

            attacker.removeEffect('kubejs:godhood');

            if (attacker.hasEffect('kubejs:divinity')) {
                attacker.removeEffect('kubejs:divinity');
            }
            attacker.potionEffects.add('kubejs:divinity', 1200, newDivinityLayers - 1);
        }
    })

    .register();
