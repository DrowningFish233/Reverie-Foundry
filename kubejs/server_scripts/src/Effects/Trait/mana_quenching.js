
/**
 * 魔源回火效果
 * 释放炽焰学派法术后，概率恢复法力值
 */
function mana_quenching(event) {
    const player = event.player;
    if (!player || !fu_hasTraitAnywhere(player, "kubejs:mana_quenching")) return;

    const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:mana_quenching");
    let magicData = getPlayerMagicData(player)

    if (Math.random() < traitLevel * 0.4) {
        const manaToRestore = traitLevel * 10;
        magicData.addMana(manaToRestore)
        magicData.addMana(-1)
    }
}