function spell_type(event) {
    spell_type_fire(event);
    spell_type_blood(event);
    spell_type_ice(event);
    spell_type_lightning(event);

}

/**
 * 目标: 为法术添加属性（当攻击者使用火焰魔法时，给被攻击者施加燃烧效果）
 */
function spell_type_fire(event) {
    const entity = event.entity;
    const actual = event.source.actual;

    if (event.source.getType() !== 'fire_magic') return;

    let SpellPower = actual.getAttribute('irons_spellbooks:fire_spell_power')?.value ?? 1;

    const baseDuration = 500;
    // 计算实际持续时间（受法术强度影响）
    const actualDuration = Math.floor(baseDuration * SpellPower);

    entity.potionEffects.add("kubejs:fire", actualDuration, 0);

    if (actual.hasEffect("kubejs:cinnamon_roll")) {
        if (entity.hasEffect("kubejs:soul_fire")) {
            const Effect = entity.getEffect("kubejs:soul_fire");
            const newLevel = Effect.getAmplifier() + 1;
            entity.potionEffects.add("kubejs:soul_fire", actualDuration, newLevel);
        } else {
            entity.potionEffects.add("kubejs:soul_fire", actualDuration, 0);
        }
    } else {
        if (entity.hasEffect("kubejs:fire")) {
            const Effect = entity.getEffect("kubejs:fire");
            const newLevel = Effect.getAmplifier() + 1;
            entity.potionEffects.add("kubejs:fire", actualDuration, newLevel);
        } else {
            entity.potionEffects.add("kubejs:fire", actualDuration, 0);
        }
    }
}


/**
 * 目标: 为法术添加属性（当攻击者使用猩红魔法时，给被攻击者施加流血效果）
 */
function spell_type_blood(event) {
    const entity = event.entity;
    const actual = event.source.actual;
    if (event.source.getType() !== 'blood_magic') return;

    let SpellPower = actual.getAttribute('irons_spellbooks:blood_spell_power')?.value ?? 1;

    const baseDuration = 500;
    // 计算实际持续时间（受法术强度影响）
    const actualDuration = Math.floor(baseDuration * SpellPower);

    if (entity.hasEffect("kubejs:bleed")) {
        const Effect = entity.getEffect("kubejs:bleed");
        const newLevel = Effect.getAmplifier() + 1;
        entity.potionEffects.add("kubejs:bleed", actualDuration, newLevel);
    } else {
        entity.potionEffects.add("kubejs:bleed", actualDuration, 0);
    }
}

/**
 * 目标: 为法术添加属性（当攻击者使用冰霜魔法时，给被攻击者施加霜冻效果）
 */
function spell_type_ice(event) {
    const entity = event.entity;
    const actual = event.source.actual;

    if (event.source.getType() !== 'ice_magic') return;

    let SpellPower = actual.getAttribute('irons_spellbooks:ice_spell_power')?.value ?? 1;

    const baseDuration = 40;
    // 计算实际持续时间（受法术强度影响）
    const actualDuration = Math.floor(baseDuration * (1 + (SpellPower - 1) / 2));

    entity.potionEffects.add("terra_entity:frost_burn", actualDuration, 0);
    if (entity.hasEffect("terra_entity:frost_burn")) {
        const Effect = entity.getEffect("terra_entity:frost_burn");
        const newLevel = Math.min(Effect.getAmplifier() + 1, 9);
        entity.potionEffects.add("terra_entity:frost_burn", actualDuration, newLevel);
    } else {
        entity.potionEffects.add("terra_entity:frost_burn", actualDuration, 0);
    }
}

/**
 * 目标: 为法术添加属性（当攻击者使用雷霆魔法时，给被攻击者施加感电效果）
 */
function spell_type_lightning(event) {
    const entity = event.entity;
    const actual = event.source.actual;

    if (event.source.getType() !== 'lightning_magic') return;

    let SpellPower = actual.getAttribute('irons_spellbooks:lightning_spell_power')?.value ?? 1;

    const baseDuration = 500;
    // 计算实际持续时间（受法术强度影响）
    const actualDuration = Math.floor(baseDuration * SpellPower);

    entity.potionEffects.add("kubejs:electrified", actualDuration, 0);
    if (entity.hasEffect("kubejs:electrified")) {
        const Effect = entity.getEffect("kubejs:electrified");
        const newLevel = Math.min(Effect.getAmplifier() + 1, 49);
        entity.potionEffects.add("kubejs:electrified", actualDuration, newLevel);
    } else {
        entity.potionEffects.add("kubejs:electrified", actualDuration, 0);
    }
}

