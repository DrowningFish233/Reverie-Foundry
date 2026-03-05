// priority: 10
// 色欲特质
RFTrait('kubejs:lust', 999)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player;

        // 攻击时效果
        if (attacker && attacker.isLiving() && attacker.hasEffect("kubejs:lust") && entity) {
            // 检查冷却
            const cooldownKey = "lust_skill_cooldown";
            if ($CooldownManager.hasCooldown(attacker, cooldownKey)) {
                return;
            }

            // 获取目标身上的流血强度
            const bleedLayers = getEffectLayers(entity, 'kubejs:bleed') || 0;

            // 统计目标身上的负面状态数量（直接用hasEffect判断）
            let debuffCount = 0;
            if (entity.hasEffect('kubejs:bleed')) debuffCount++;
            if (entity.hasEffect('kubejs:fire')) debuffCount++;
            if (entity.hasEffect('kubejs:rupture')) debuffCount++;
            if (entity.hasEffect('kubejs:sinking')) debuffCount++;
            if (entity.hasEffect('kubejs:tremor')) debuffCount++;

            // 生成1-6的随机数（1:2:3比例，技能3:技能2:技能1 = 1:2:3）
            const random = Math.floor(Math.random() * 6) + 1;

            // 按比例触发技能
            if (random <= 1) {
                // 1/6概率触发技能3（最小概率）
                LustSkill3(attacker, entity, event, bleedLayers, debuffCount);
            } else if (random <= 3) {
                // 2/6概率触发技能2（中概率）
                LustSkill2(attacker, entity, event, bleedLayers, debuffCount);
            } else {
                // 3/6概率触发技能1（最大概率）
                LustSkill1(attacker, entity, event, bleedLayers);
            }

            // 设置6秒冷却
            $CooldownManager.setCooldown(attacker, cooldownKey, 120);
        }
    })

    // 被动：自身不会因为流血伤害而死亡
    .beforeHurt(event => {
        const { source, entity } = event;

        if (!entity || !entity.hasEffect("kubejs:lust")) return;

        // 检查是否是流血伤害
        if (source.getType() === 'bleed') {
            const newHealth = entity.getHealth() - event.damage;
            if (newHealth < 1) {
                // 保留1点生命值
                event.damage = entity.getHealth() - 1;
            }
        }
    })

    // 被动：每失去20%的体力，获得1层伤害强化(最多3层)
    .onTick(200, event => {
        const { entity } = event;

        if (!entity || !entity.hasEffect("kubejs:lust")) return;

        // 计算当前已损失的生命值百分比
        const healthPercent = entity.getHealth() / entity.getMaxHealth();
        const lostHealthPercent = 1 - healthPercent;

        // 计算应该获得的伤害强化层数（每20%一层，最多3层）
        const targetAmplification = Math.min(3, Math.floor(lostHealthPercent / 0.2));

        // 获取当前伤害强化层数
        let currentAmplification = 0;
        if (entity.hasEffect('kubejs:damage_amplification')) {
            currentAmplification = entity.getEffect('kubejs:damage_amplification').getAmplifier() + 1;
        }

        // 如果需要增加层数
        if (targetAmplification > currentAmplification) {
            const increase = targetAmplification - currentAmplification;
            if (entity.hasEffect('kubejs:damage_amplification')) {
                addEffectLayers(entity, 'kubejs:damage_amplification', increase);
            } else {
                entity.potionEffects.add('kubejs:damage_amplification', -1, targetAmplification - 1);
            }
        }
        // 如果需要减少层数
        else if (targetAmplification < currentAmplification) {
            if (targetAmplification === 0) {
                entity.removeEffect('kubejs:damage_amplification');
            } else {
                setEffectLayers(entity, 'kubejs:damage_amplification', targetAmplification);
            }
        }
    })

    // 被动：受伤时，有概率清除身上随机一种debuff
    .afterHurt(event => {
        const { entity } = event;

        if (!entity || !entity.hasEffect("kubejs:lust")) return;
        if (Math.random() < 0.25) {
            removeRandomNegativeEffect(entity);
        }
    })

    .register();



// 技能1函数（最大概率 3/6）
function LustSkill1(attacker, target, event, bleedLayers) {
    const damage = event.getDamage();

    // [使用时]:目标每带有6级流血强度，使本技能造成的伤害+10%(最多+20%)
    const bleedBonus = Math.min(20, Math.floor(bleedLayers / 6) * 10);
    if (bleedBonus > 0) {
        new_damage(event, STAGE.ADDITIVE, 1 + bleedBonus / 100);
    }

    // [使用时]:使自身增加2级流血层数
    if (attacker.hasEffect('kubejs:bleed')) {
        addEffectLayers(attacker, 'kubejs:bleed', 2);
    } else {
        attacker.potionEffects.add('kubejs:bleed', 200, 1); // 层数2 = amplifier 1
        setBaseStrengthAndSync(attacker, 'kubejs:bleed', 1); // 基础强度1
    }

    // [攻击时]:对目标施加2级某1种随机效果
    applyRandomDebuff(target, 2);

    // [攻击时]:使目标增加2级流血层数
    if (target.hasEffect('kubejs:bleed')) {
        addEffectLayers(target, 'kubejs:bleed', 2);
    } else {
        target.potionEffects.add('kubejs:bleed', 200, 1);
        setBaseStrengthAndSync(target, 'kubejs:bleed', 1);
    }

    // 本技能命中后，使自身恢复造成体力伤害量15%的体力(最多生命值上限10%)
    const healAmount = Math.min(attacker.getMaxHealth() * 0.1, damage * 0.15);
    attacker.heal(healAmount);

}

// 技能2函数（中概率 2/6）
function LustSkill2(attacker, target, event, bleedLayers, debuffCount) {
    const damage = event.getDamage();

    // [使用时]:目标每带有3级流血强度，使本技能造成的伤害+10%(最多+20%)
    const bleedBonus = Math.min(20, Math.floor(bleedLayers / 3) * 10);
    if (bleedBonus > 0) {
        new_damage(event, STAGE.ADDITIVE, 1 + bleedBonus / 100);
    }

    // [攻击时]:以40%概率重复造成当前伤害量的流血伤害
    // 目标每带有一种DEBUFF，重复使用的概率+20%(最多2次)
    let repeatChance = 0.4 + (debuffCount * 0.2);
    repeatChance = Math.min(0.8, repeatChance); // 最多80%概率

    if (Math.random() < repeatChance) {
        // 造成流血伤害
        attackEntity(target, 'kubejs:bleed', damage, true);
    }

    // [攻击时]:对目标施加3级流血层数
    if (target.hasEffect('kubejs:bleed')) {
        addEffectLayers(target, 'kubejs:bleed', 3);
    } else {
        target.potionEffects.add('kubejs:bleed', 200, 2); // 层数3 = amplifier 2
        setBaseStrengthAndSync(target, 'kubejs:bleed', 1);
    }

    // [攻击时]:对目标施加3级某1种随机效果
    applyRandomDebuff(target, 3);

    // 本技能命中后，使自身恢复造成体力伤害量30%的体力(最多生命值上限15%)
    const healAmount = Math.min(attacker.getMaxHealth() * 0.15, damage * 0.3);
    attacker.heal(healAmount);

}

// 技能3函数（最小概率 1/6）
function LustSkill3(attacker, target, event, bleedLayers, debuffCount) {
    const damage = event.getDamage();

    // [使用时]:目标每带有1种负面状态，使本技能造成的伤害+25%(最多+100%)
    const debuffBonus = Math.min(100, debuffCount * 25);
    if (debuffBonus > 0) {
        new_damage(event, STAGE.ADDITIVE, 1 + debuffBonus / 100);
    }

    // [使用时]:目标每带有3级流血，使本技能造成的伤害+10%(最多+20%)
    const bleedBonus = Math.min(20, Math.floor(bleedLayers / 3) * 10);
    if (bleedBonus > 0) {
        new_damage(event, STAGE.ADDITIVE, 1 + bleedBonus / 100);
    }

    // [攻击时]:对目标施加3级流血层数
    if (target.hasEffect('kubejs:bleed')) {
        addEffectLayers(target, 'kubejs:bleed', 3);
    } else {
        target.potionEffects.add('kubejs:bleed', 200, 2);
        setBaseStrengthAndSync(target, 'kubejs:bleed', 1);
    }

    // 若目标带有的负面状态不少于3种，则对其额外施加5级流血层数
    if (debuffCount >= 3) {
        addEffectLayers(target, 'kubejs:bleed', 5);
    }

    // [攻击时]:对目标施加3级某1种随机效果
    applyRandomDebuff(target, 3);

    // [攻击时]:对目标施加2级某1种随机效果
    applyRandomDebuff(target, 2);

    // 本技能命中后，使自身恢复造成体力伤害量50%的体力(最多生命值上限20%)
    const healAmount = Math.min(attacker.getMaxHealth() * 0.2, damage * 0.5);
    attacker.heal(healAmount);

}

// 施加随机debuff（层数）
function applyRandomDebuff(target, layers) {
    const debuffs = ['kubejs:bleed', 'kubejs:fire', 'kubejs:rupture', 'kubejs:sinking', 'kubejs:tremor'];
    const randomDebuff = debuffs[Math.floor(Math.random() * debuffs.length)];

    if (target.hasEffect(randomDebuff)) {
        addEffectLayers(target, randomDebuff, layers);
    } else {
        target.potionEffects.add(randomDebuff, 200, layers - 1); // amplifier = layers - 1
        addBaseStrengthAndSync(target, randomDebuff, 1); // 默认强度1
    }
}