/**
 * 石榴石
 */
function irons_spellbooks_guiding_bolt(event) {
    const player = event.player
    const COOLDOWN_KEY = "garnet_guiding_bolt"
    const amplifier = 3

    if (player.hasEffect("kubejs:garnet")) {
        // 先检查冷却状态
        if ($CooldownManager.hasCooldown(player, COOLDOWN_KEY)) return

        if (player.isOnFire() || player.isInLava()) {
            overLimitSpellCast($ResourceLocation('irons_spellbooks', 'guiding_bolt'), amplifier, player, false)

            // 设置5秒冷却 (100 ticks)
            $CooldownManager.setCooldown(player, COOLDOWN_KEY, 100)
        }
    }
}