/**
 * 通用理智恢复词缀逻辑
 */
function sanity_up(event, player) {
    ghost_ingot(event, player);
    is_addiction_effect(event, player);
    lucid_effect(event, player);
}


function ghost_ingot(event, player) {
    if (player.hasEffect('kubejs:ghost_ingot')) {
        modifyDrainRate(player, DRAIN_STAGE.FLAT, -1);
    }
}

function lucid_effect(event, player) {
    if (player.hasEffect('kubejs:lucid')) {
        modifyDrainRate(player, DRAIN_STAGE.FLAT, 1);
    }
}

// 上瘾逻辑处理
function is_addiction_effect(event, player) {
    const pData = player.persistentData;
    let addictionLevel = pData.getInt('addiction') || 0;

    addictionLevel = Math.max(0, addictionLevel - 1);
    pData.putInt('addiction', addictionLevel);
    // 根据上瘾等级施加效果
    if (addictionLevel >= 12) {
        player.potionEffects.add('kubejs:addiction', 500, 2);
    } else if (addictionLevel >= 8) {
        player.potionEffects.add('kubejs:addiction', 500, 1);
    } else if (addictionLevel >= 4) {
        player.potionEffects.add('kubejs:addiction', 500, 0);
    }

    // 截断反应
    if (!player.hasEffect('kubejs:is_addiction')) {
        if (addictionLevel >= 12) {
            player.potionEffects.add('kubejs:withdrawal', 500, 2);
        } else if (addictionLevel >= 8) {
            player.potionEffects.add('kubejs:withdrawal', 500, 1);
        } else if (addictionLevel >= 4) {
            player.potionEffects.add('kubejs:withdrawal', 500, 0);
        }
    }
    if (player.hasEffect('kubejs:is_addiction')) {
        const effect = player.getEffect('kubejs:is_addiction');
        const effectLevel = effect.getAmplifier() + 1;
        modifyDrainRate(player, DRAIN_STAGE.FLAT, effectLevel);
    }
}