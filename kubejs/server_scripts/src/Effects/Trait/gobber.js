/**
 * 戈伯祝福-连携
 */
function gobber(event) {
    const { source, entity } = event;
    const attacker = source.player;

    if (!attacker || !entity.isLiving()) return;

    const hasGobber = fu_hasTraitAnywhere(attacker, 'kubejs:gobber');
    const hasGobberNether = fu_hasTraitAnywhere(attacker, 'kubejs:gobber_nether');
    const hasGobberEnd = fu_hasTraitAnywhere(attacker, 'kubejs:gobber_end');

    if (!hasGobber && !hasGobberNether && !hasGobberEnd) return;

    let TraitsCount = fu_getUniqueTraitsCount(attacker);
    let damageBonus = 0;
    const count = (hasGobber ? 1 : 0) + (hasGobberNether ? 1 : 0) + (hasGobberEnd ? 1 : 0);

    // 每种戈伯的基础加成
    const baseBonus = {
        gobber: 0.10,
        nether: 0.20,
        end: 0.30
    };

    if (count === 1) {
        // 只有一种戈伯
        if (hasGobber) damageBonus = baseBonus.gobber;
        else if (hasGobberNether) damageBonus = baseBonus.nether;
        else if (hasGobberEnd) damageBonus = baseBonus.end;
    } else if (count === 2) {
        // 拥有两种戈伯
        if (hasGobber && hasGobberNether) {
            const maxBonus = Math.max(baseBonus.gobber, baseBonus.nether);
            const avgBonus = (baseBonus.gobber + baseBonus.nether) / 2;

            // 检查是否可被4整除
            if (TraitsCount % 4 === 0) {
                damageBonus = (baseBonus.gobber + baseBonus.nether) * 1.5;
            } else {
                damageBonus = maxBonus + avgBonus;
            }
        } else if (hasGobber && hasGobberEnd) {
            const maxBonus = Math.max(baseBonus.gobber, baseBonus.end);
            const avgBonus = (baseBonus.gobber + baseBonus.end) / 2;
            // 检查是否可被3整除
            if (TraitsCount % 3 === 0) {
                damageBonus = (baseBonus.gobber + baseBonus.end) * 1.5;
            } else {
                damageBonus = maxBonus + avgBonus;
            }
        } else if (hasGobberNether && hasGobberEnd) {
            const maxBonus = Math.max(baseBonus.nether, baseBonus.end);
            const avgBonus = (baseBonus.nether + baseBonus.end) / 2;

            // 检查是否可被2整除
            if (TraitsCount % 2 === 0) {
                damageBonus = (baseBonus.nether + baseBonus.end) * 1.5;
            } else {
                damageBonus = maxBonus + avgBonus;
            }
        }
    } else if (count === 3) {
        // 拥有所有三种戈伯
        damageBonus = 1.00;
    }

    if (damageBonus > 0) {
        new_damage(event, STAGE.MULTIPLY, 1 + damageBonus);
    }
}

/**
 * 戈伯诅咒-连携
 */
function gobberhurt(event) {
    const { entity, source } = event;

    if (!entity.isLiving() || !entity.isPlayer()) return;

    const hasGobber = fu_hasTraitAnywhere(entity, 'kubejs:gobber');
    const hasGobberNether = fu_hasTraitAnywhere(entity, 'kubejs:gobber_nether');
    const hasGobberEnd = fu_hasTraitAnywhere(entity, 'kubejs:gobber_end');

    if (!hasGobber && !hasGobberNether && !hasGobberEnd) return;

    let TraitsCount = fu_getUniqueTraitsCount(entity);
    let damageBonus = 0;
    const count = (hasGobber ? 1 : 0) + (hasGobberNether ? 1 : 0) + (hasGobberEnd ? 1 : 0);

    if (count === 1) {
        if (hasGobber) damageBonus = 0.10;
        else if (hasGobberNether) damageBonus = 0.20;
        else if (hasGobberEnd) damageBonus = 0.30;
    } else if (count === 2) {
        // 拥有两种戈伯
        if (hasGobber && hasGobberNether) {
            damageBonus = 0.25;
            // 检查是否可被4整除
            if (TraitsCount % 4 === 0) {
                damageBonus = 0.375; // 37.5%
            }
        } else if (hasGobber && hasGobberEnd) {
            damageBonus = 0.35;
            // 检查是否可被3整除
            if (TraitsCount % 3 === 0) {
                damageBonus = 0.525;
            }
        } else if (hasGobberNether && hasGobberEnd) {
            damageBonus = 0.50;
            // 检查是否可被2整除
            if (TraitsCount % 2 === 0) {
                damageBonus = 0.75;
            }
        }
    } else if (count === 3) {
        // 拥有所有三种戈伯
        damageBonus = 1.00;
    }

    if (damageBonus > 0) {
        new_damage(event, STAGE.MULTIPLY, 1 + damageBonus);
    }
}