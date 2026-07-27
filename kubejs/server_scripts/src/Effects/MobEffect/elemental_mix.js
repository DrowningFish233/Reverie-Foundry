/**
 * 元素谐鸣
 */
function elemental_mix(event) {
    const entity = event.entity;
    const attacker = event.source.actual;
    const damageType = event.source.getType();

    const supportedMagicTypes = [
        "irons_spellbooks:blood_magic",
        "irons_spellbooks:ender_magic",
        "irons_spellbooks:holy_magic",
        "irons_spellbooks:nature_magic",
        "irons_spellbooks:ice_magic",
        "irons_spellbooks:eldritch_magic",
        "irons_spellbooks:lightning_magic",
        "irons_spellbooks:fire_magic",
        "kubejs:dream_magic",
        "familiarslib:sound_magic",
        "cataclysm_spellbooks:abyssal_magic"
    ];

    if (!supportedMagicTypes.includes(damageType)) return;

    if (entity.hasEffect("kubejs:elemental_mix")) {
        const elementEffect = entity.getEffect("kubejs:elemental_mix");
        const currentLevel = elementEffect.getAmplifier();

        const damageMultiplier = currentLevel * 0.1;

        const cappedMultiplier = Math.min(damageMultiplier, 1.5);

        new_damage(event, STAGE.ADDITIVE, 1 + bonusPercent);
    }
}
