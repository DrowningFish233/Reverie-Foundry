ItemEvents.firstRightClicked('stick', event => {
    let strength = $IExtendedMobEffect.getBaseStrength(event.player, 'kubejs:bleed')
    event.player.tell('当前基础强度: ' + strength)

    $IExtendedMobEffect.setBaseStrengthAndSync(event.player, 'kubejs:bleed', 2)

    event.player.tell('当前基础强度: ' + strength)
})