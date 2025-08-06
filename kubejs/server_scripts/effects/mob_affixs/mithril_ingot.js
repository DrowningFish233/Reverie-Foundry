/**
 * 受到伤害后恢复相当于受到伤害一半的生命值，并减少恢复生命值x10的法力（法力不够时此词条不生效）
 * @param {event} event 
 */
function mithril_ingot(event) {
    let player = event.player;
    if (!player || !player.isLiving() || !player.hasEffect('kubejs:mithril_ingot')) return;

    let damage = event.damage;
    let healAmount = damage / 2;
    let manaCost = healAmount * 10;
    let magicData = getPlayerMagicData(player);
    let currentMana = magicData.getMana();

    if (currentMana >= manaCost) {
        player.heal(healAmount);
        magicData.setMana(currentMana - manaCost);
    }
}