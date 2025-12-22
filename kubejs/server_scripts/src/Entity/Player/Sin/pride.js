// 傲慢侵蚀效果
function pride(event) {
    const { source, entity } = event;
    const attacker = source.player
    if (!attacker || !attacker.isLiving() || !attacker.hasEffect("kubejs:pride")) {
        return;
    }
    let attackEffect = attacker.potionEffects;

    let prideEffect = attacker.getEffect("kubejs:pride_2");
    if (!prideEffect) {
        attackEffect.add("kubejs:pride_2", 100, 0);
        return;
    }

    let currentLevel = prideEffect.getAmplifier();
    let newLevel = currentLevel + 1;
    attackEffect.add("kubejs:pride_2", 100, newLevel);

    let sunderLevel = -1;
    if (newLevel >= 10) {
        sunderLevel = 4;
    } else if (newLevel >= 8) {
        sunderLevel = 3;
    } else if (newLevel >= 6) {
        sunderLevel = 2;
    } else if (newLevel >= 4) {
        sunderLevel = 1;
    } else if (newLevel >= 2) {
        sunderLevel = 0;
    }

    if (sunderLevel >= 0) {
        entity.potionEffects.add("apothic_attributes:sundering", 600, sunderLevel);
    }
}