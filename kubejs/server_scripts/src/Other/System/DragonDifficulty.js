// priority: 10

function isDragon(entity) {
    let type = entity.getType().toString();
    return type === 'iceandfire:fire_dragon' ||
        type === 'iceandfire:ice_dragon' ||
        type === 'iceandfire:lightning_dragon';
}

function getDragonStageMultiplier(player) {
    let diffStage = player.stages.getAll().toArray();
    if (!diffStage || diffStage.length === 0) return null;

    let highestDifficulty = null;
    let highestLevel = -1;

    for (let difficulty in DRAGON_STAGE_DIFFICULTY_BONUS) {
        if (diffStage.some(stage => stage === difficulty)) {
            if (DRAGON_STAGE_DIFFICULTY_BONUS[difficulty].level > highestLevel) {
                highestLevel = DRAGON_STAGE_DIFFICULTY_BONUS[difficulty].level;
                highestDifficulty = difficulty;
            }
        }
    }

    return highestDifficulty;
}

function applyDragonDifficulty(entity, player) {
    let worldDifficulty = entity.getLevel().getDifficulty();
    let stageKey = getDragonStageMultiplier(player);

    let gameMult = GAME_DIFFICULTY_LEVELS[worldDifficulty] || GAME_DIFFICULTY_LEVELS["NORMAL"];
    let stageMult = DRAGON_STAGE_DIFFICULTY_BONUS[stageKey] || DRAGON_STAGE_DIFFICULTY_BONUS['difficult_0'];

    let healthMult = gameMult.health * stageMult.health;
    let attackMult = gameMult.attack * stageMult.attack;
    let armorMult = gameMult.armor * stageMult.armor;
    let toughnessMult = gameMult.toughness * stageMult.toughness;

    if (DEBUG_MODE) {
        console.log(`[DragonDifficulty] 世界难度: ${worldDifficulty}, 阶段: ${stageKey}`);
        console.log(`[DragonDifficulty] 倍率: health=${healthMult}, attack=${attackMult}, armor=${armorMult}, toughness=${toughnessMult}`);
    }

    if (entity.attributes.hasAttribute('minecraft:generic.max_health')) {
        let attr = entity.getAttribute('minecraft:generic.max_health');
        let modifiers = attr.getModifiers();
        for (let modifier of modifiers) {
            if (modifier.id === DRAGON_MODIFIER_ID) {
                attr.removeModifier(modifier);
                break;
            }
        }
        let currentBase = attr.getBaseValue();
        let bonus = currentBase * (healthMult - 1);
        if (bonus > 0) {
            entity.modifyAttribute(
                'minecraft:generic.max_health',
                DRAGON_MODIFIER_ID,
                bonus,
                'add_value'
            );
        }
        entity.setHealth(entity.getMaxHealth());
    }

    if (entity.attributes.hasAttribute('minecraft:generic.attack_damage')) {
        let attr = entity.getAttribute('minecraft:generic.attack_damage');
        let modifiers = attr.getModifiers();
        for (let modifier of modifiers) {
            if (modifier.id === DRAGON_MODIFIER_ID) {
                attr.removeModifier(modifier);
                break;
            }
        }
        let currentBase = attr.getBaseValue();
        let bonus = currentBase * (attackMult - 1);
        if (bonus > 0) {
            entity.modifyAttribute(
                'minecraft:generic.attack_damage',
                DRAGON_MODIFIER_ID,
                bonus,
                'add_value'
            );
        }
    }

    if (entity.attributes.hasAttribute('minecraft:generic.armor')) {
        let attr = entity.getAttribute('minecraft:generic.armor');
        let modifiers = attr.getModifiers();
        for (let modifier of modifiers) {
            if (modifier.id === DRAGON_MODIFIER_ID) {
                attr.removeModifier(modifier);
                break;
            }
        }
        let currentBase = attr.getBaseValue();
        let bonus = currentBase * (armorMult - 1);
        if (bonus > 0) {
            entity.modifyAttribute(
                'minecraft:generic.armor',
                DRAGON_MODIFIER_ID,
                bonus,
                'add_value'
            );
        }
    }

    if (entity.attributes.hasAttribute('minecraft:generic.armor_toughness')) {
        let attr = entity.getAttribute('minecraft:generic.armor_toughness');
        let modifiers = attr.getModifiers();
        for (let modifier of modifiers) {
            if (modifier.id === DRAGON_MODIFIER_ID) {
                attr.removeModifier(modifier);
                break;
            }
        }
        let currentBase = attr.getBaseValue();
        let bonus = currentBase * (toughnessMult - 1);
        if (bonus > 0) {
            entity.modifyAttribute(
                'minecraft:generic.armor_toughness',
                DRAGON_MODIFIER_ID,
                bonus,
                'add_value'
            );
        }
    }

    if (DEBUG_MODE) {
        console.log(`[DragonDifficulty] === 龙难度应用完成 ===`);
    }
}

EntityEvents.spawned(event => {
    let entity = event.entity;
    if (!entity || !entity.isLiving()) return;
    if (!isDragon(entity)) return;

    if (typeof isNoDifficulty !== 'undefined' && isNoDifficulty(entity)) return;

    let player = entity.getLevel().getNearestPlayer(entity, 129);
    if (!player) return;

    if (entity.persistentData.contains('dragon_difficulty_applied')) return;
    entity.persistentData.putBoolean('dragon_difficulty_applied', true);

    applyDragonDifficulty(entity, player);
});