// 药水效果：沉沦
RFTrait('kubejs:effect_sinking', 0)
    .beforeHurt(event => {
        let entity = event.entity;
        if (!entity) return;
        if (event.source.getType() === 'sinking') {
            return;
        }
        if (!entity.hasEffect("kubejs:sinking")) return;


        let effect = entity.getEffect("kubejs:sinking");
        let level = effect.getAmplifier() + 1;

        let baseStrength = getBaseStrength(entity, "kubejs:sinking");
        if (baseStrength < 1) baseStrength = 1;

        let pData = entity.persistentData;
        let sanity = pData.getInt("sanity") ?? 0;

        if (entity.isPlayer() && sanity !== undefined) {
            let newSanity = sanity - baseStrength;
            updateplayersanity(entity, newSanity);
        }
        else {
            attackEntity(entity, 'kubejs:sinking', baseStrength, true);
        }

        let newLevel = level - 1;

        if (newLevel <= 0) {
            entity.removeEffect("kubejs:sinking");
        } else {
            entity.removeEffect("kubejs:sinking");
            entity.potionEffects.add("kubejs:sinking", effect.getDuration(), newLevel - 1);
            setBaseStrengthAndSync(entity, "kubejs:sinking", baseStrength);
        }
    })
    .register();
