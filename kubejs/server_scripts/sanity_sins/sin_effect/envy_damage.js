function envy_damage(event) {
    const { source, entity } = event;
    const attacker = source.player;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:envy")) {
        return;
    }
    const envy_number = attacker.persistentData.getInt("envy_number") || 0;
    const damageBonusPerEnvy = 0.03;
    const maxBonus = 2;
    const totalBonus = Math.min(envy_number * damageBonusPerEnvy, maxBonus);
    new_damage(event, STAGE.MULTIPLY, totalBonus);
} kubejs: envy 