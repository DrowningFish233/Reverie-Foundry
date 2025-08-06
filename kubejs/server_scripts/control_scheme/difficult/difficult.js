// priority: 10
function enhanceEntityAttributes(entity, diffLevel) {
    // 仅对敌对生物应用阶段血量加成
    if (entity.isMonster()) {
        if (diffLevel.health != 0 && entity.attributes.hasAttribute('minecraft:generic.max_health')) {
            entity.setAttributeBaseValue('minecraft:generic.max_health',
                entity.getAttribute('minecraft:generic.max_health').getValue() * diffLevel.health);
            entity.setHealth(entity.getMaxHealth());
        }
        if (diffLevel.attack != 0 && entity.attributes.hasAttribute('minecraft:generic.attack_damage')) {
            entity.setAttributeBaseValue('minecraft:generic.attack_damage',
                entity.getAttribute('minecraft:generic.attack_damage').getValue() * diffLevel.attack);
        }
        if (diffLevel.armor != 0 && entity.attributes.hasAttribute('minecraft:generic.armor')) {
            entity.setAttributeBaseValue('minecraft:generic.armor',
                entity.getAttribute('minecraft:generic.armor').getValue() * diffLevel.armor);
        }
        if (diffLevel.toughness != 0 && entity.attributes.hasAttribute('minecraft:generic.armor_toughness')) {
            entity.setAttributeBaseValue('minecraft:generic.armor_toughness',
                entity.getAttribute('minecraft:generic.armor_toughness').getValue() * diffLevel.toughness);
        }
    }
}

EntityEvents.checkSpawn(event => {
    let entity = event.entity;
    if (!entity) return;

    let player = entity.getLevel().getNearestPlayer(entity, 129);
    if (!player) return;

    if (!entity.isLiving()) return;

    let diffStage = player.stages.getAll().toArray();
    if (!diffStage) return;

    let difficultyLevels = {
        'difficult_0': { health: 1, attack: 1, armor: 1, toughness: 1 },
        'difficult_1': { health: 2, attack: 2, armor: 2, toughness: 2 },
        'difficult_2': { health: 4, attack: 4, armor: 4, toughness: 4 },
        'difficult_3': { health: 6, attack: 6, armor: 6, toughness: 6 },
        'difficult_4': { health: 8, attack: 8, armor: 8, toughness: 8 },
        'difficult_5': { health: 10, attack: 10, armor: 10, toughness: 10 },
        'difficult_6': { health: 20, attack: 20, armor: 20, toughness: 20 }
    };

    for (let difficulty in difficultyLevels) {
        if (diffStage.some(stage => stage === difficulty)) {
            if (entity.persistentData.contains(difficulty)) continue;

            entity.persistentData.putInt(difficulty, 1);
            enhanceEntityAttributes(entity, difficultyLevels[difficulty]);
            break;
        }
    }

    // 确保所有生物（无论是否有难度阶段）都会将血量设置为最大值
    if (entity.attributes.hasAttribute('minecraft:generic.max_health')) {
        entity.setHealth(entity.getMaxHealth());
    }
});