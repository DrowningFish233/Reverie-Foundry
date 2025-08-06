function heartstop(event, player) {
    if (!player.hasEffect('irons_spellbooks:heartstop')) {
        return;
    }
    const effect = player.getEffect('irons_spellbooks:heartstop');
    if (effect.getDuration() > 1200) {
        player.removeEffect('irons_spellbooks:heartstop');
        player.potionEffects.add('irons_spellbooks:heartstop', 1200, effect.getAmplifier());
    }
}