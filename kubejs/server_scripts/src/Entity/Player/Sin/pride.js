// priority: 10
// 傲慢特质
RFTrait('kubejs:pride', 999)
    .onTick(event => {
        const { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (entity.tickCount % 20 !== 0) return;

        let isPRIDE = entity.persistentData.getInt(sins.PRIDE) || 0;
        if (isPRIDE <= 0) return;

        entity.potionEffects.add("kubejs:pride", 80, 0);

        let godhoodLayers = getEffectLayers(entity, 'kubejs:godhood') || 0;
        let newLayers = Math.min(10, godhoodLayers + 1);

        if (entity.hasEffect('kubejs:godhood')) {
            entity.removeEffect('kubejs:godhood');
        }
        entity.potionEffects.add('kubejs:godhood', 1200, newLayers - 1);
    })

    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving()) return;
        if (!attacker.hasEffect("kubejs:pride")) return;
        if (!entity || !entity.isLiving()) return;

        let godhoodLayers = getEffectLayers(attacker, 'kubejs:godhood') || 0;
        let critChance = godhoodLayers * 15;
        let roll = Math.random() * 100;

        if (roll < critChance) {
            new_damage(event, STAGE.MULTIPLY, 1.2);

            attacker.removeEffect('kubejs:godhood');

            let divinityLayers = getEffectLayers(attacker, 'kubejs:divinity') || 0;
            let newDivinityLayers = Math.min(10, divinityLayers + 1);

            if (attacker.hasEffect('kubejs:divinity')) {
                attacker.removeEffect('kubejs:divinity');
            }
            attacker.potionEffects.add('kubejs:divinity', 1200, newDivinityLayers - 1);

            const critDamageBonus = 1 + (newDivinityLayers * 0.05);
            new_damage(event, STAGE.MULTIPLY, critDamageBonus);
        }
    })

    .register();