//迫近之日
ISSEvents.spellPostCast(event => {
    const { player } = event;
    if (!player || !player.isPlayer()) return;

    const effect = player.getEffect("kubejs:ignore_cooldown");
    if (!effect) return;

    const magicData = $MagicData.getPlayerMagicData(player);
    const cooldowns = magicData.playerCooldowns.getSpellCooldowns();

    const clearCooldownInstance = cooldowns.get("kubejs:clear_cooldown");
    const replayCooldownInstance = cooldowns.get("kubejs:replay");

    magicData.playerCooldowns.clearCooldowns();

    if (clearCooldownInstance) {
        const SpellCooldown = clearCooldownInstance.getSpellCooldown()
        magicData.playerCooldowns.addCooldown("kubejs:clear_cooldown", SpellCooldown);
    }

    if (replayCooldownInstance) {
        const SpellCooldown = replayCooldownInstance.getSpellCooldown()
        magicData.playerCooldowns.addCooldown("kubejs:replay", SpellCooldown);
    }

    const currentLevel = effect.getAmplifier() + 1;
    player.removeEffect("kubejs:ignore_cooldown");

    if (currentLevel < 6) {
        player.potionEffects.add("kubejs:ignore_cooldown", 800, currentLevel);
    }
});