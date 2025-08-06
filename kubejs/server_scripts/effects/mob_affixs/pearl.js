/**
 * 珍珠霉运效果
 */
function pearl(event) {
    const player = event.entity;
    if (!player?.player) return;

    const pearlEffect = player.getEffect("kubejs:pearl");
    if (!pearlEffect) return;

    const effectLevel = pearlEffect.amplifier + 1;
    player.removeEffect("kubejs:pearl");
    player.potionEffects.add("minecraft:unluck", 1200, effectLevel);

}