/**
 * 电流合金 
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function irons_spellbooks_chain_lightning(event) {
    const player = event.player
    const COOLDOWN_KEY = "acril_ingot_COOLDOWN_KEY"

    if (!fu_hasTraitAnywhere(player, "kubejs:acril_ingot")) return;
    // 先检查冷却状态

    if ($CooldownManager.hasCooldown(player, COOLDOWN_KEY)) return

    let magicData = getPlayerMagicData(player)
    let currentMana = magicData.getMana()

    if (currentMana >= 20) {
        let Effect = player.getEffect("kubejs:acril_ingot")
        let amplifier = Effect.getAmplifier() + 1

        overLimitSpellCast($ResourceLocation('irons_spellbooks', 'chain_lightning'), amplifier, player, false)
        magicData.addMana(-20)
        // 设置冷却(tick)
        $CooldownManager.setCooldown(player, COOLDOWN_KEY, 200)
        return
    } else {
        player.tell("§c魔力不足！")
    }
}