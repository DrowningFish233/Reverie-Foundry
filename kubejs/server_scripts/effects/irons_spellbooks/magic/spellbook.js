function irons_spellbooks(event) {
    let player = event.player
    let magicData = getPlayerMagicData(player)
    let manaCost = magicData.getMana()
    let amplifier = Math.max(Math.sqrt(manaCost), 1) + 4
    overLimitSpellCast($resourceLocation('irons_spellbooks', 'blood_slash'), amplifier, player, false)
    magicData.addMana(-10)
}

