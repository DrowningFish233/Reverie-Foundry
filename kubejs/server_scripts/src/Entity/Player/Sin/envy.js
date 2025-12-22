// priority: 10
// 每刻更新罪孽状态事件
PlayerEvents.tick(event => {
    let player = event.player;
    if (!player) return;
    if (player.tickCount % 40 != 0) return;
    let envy_number = player.persistentData.getInt("envy_number") || 0;
    if (envy_number > 0) {
        envy_number -= 1;
        player.persistentData.putInt("envy_number", envy_number);
    }
});

//嫉妒侵蚀
function envy(event) {
    const attacker = event.source.player || event.source.entity;
    const entity = event.entity;

    if (!attacker || !entity || !entity.isLiving()) return;

    if (attacker.hasEffect("kubejs:envy")) {
        let envy_number = attacker.persistentData.getInt("envy_number") || 0;
        let envy_effect = 0;

        const effects = entity.getActiveEffects();
        if (!effects || effects.length === 0) {
            return;
        }

        const effectsToRemove = [];

        // 遍历目标的所有效果
        for (let effect of effects) {
            if (effect && effect.effect) {
                const effectType = effect.effect;
                const originalDuration = effect.duration;
                const originalAmplifier = effect.amplifier;

                const newDuration = originalDuration <= 200 ? originalDuration : 200;
                attacker.potionEffects.add(effectType, newDuration, originalAmplifier);
                effectsToRemove.push(effectType);
                envy_effect += 1;
            }
        }
        for (let effectType of effectsToRemove) {
            entity.removeEffect(effectType);
        }

        envy_number += envy_effect;
        attacker.persistentData.putInt("envy_number", envy_number);
    }
}


function envy_damage(event) {
    const { source, entity } = event;
    const attacker = source.player;

    if (!attacker || !attacker.isLiving() || !attacker.hasEffect("kubejs:envy")) {
        return;
    }
    const envy_number = attacker.persistentData.getInt("envy_number") || 0;
    const damageBonusPerEnvy = 0.03;
    const maxBonus = 2;
    const totalBonus = Math.min(envy_number * damageBonusPerEnvy, maxBonus);
    new_damage(event, STAGE.MULTIPLY, totalBonus);
} 