/**
 * MagicData获取
 */
function getPlayerMagicData(player) {
    return $MagicData.getPlayerMagicData(player);
}

/**
 * 施法逻辑
 */
function overLimitSpellCast(resourceLocation, amplifier, player, consume) {
    $SpellRegistry["getSpell(net.minecraft.resources.ResourceLocation)"](resourceLocation).attemptInitiateCast(Item.of('air'), amplifier, player.level, player, $CastSource.NONE, consume, "main_hand")
}


function reduceMana(event) {
    if (!event || !event.player) {
        return;
    }
    let player = event.player;
    let magicData = getPlayerMagicData(player);
    let currentMana = magicData.getMana();
    let manaCost = currentMana / 10;
    magicData.setMana(currentMana - manaCost);
}