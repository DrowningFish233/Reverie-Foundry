//凋零之骨
function witherbone(event) {
    const { source, entity } = event;
    const attacker = source.player;

    if (!attacker || !attacker.living || !fu_hasTraitAnywhere(attacker, "kubejs:witherbone")) {
        return;
    }

    if (entity.hasEffect("minecraft:wither")) {
        const effect = entity.getEffect("minecraft:wither");
        const level = effect.getAmplifier() + 1;

        let regenLevel = Math.floor(level / 2);
        let damageAmpLevel = Math.floor(level / 3);

        // 应用等级上限
        regenLevel = Math.min(regenLevel, 2);
        damageAmpLevel = Math.min(damageAmpLevel, 5);
        attacker.potionEffects.add("minecraft:regeneration", 200, regenLevel - 1);
        attacker.potionEffects.add("kubejs:damage_amplification", 200, damageAmpLevel - 1);
    }
}