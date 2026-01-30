//玩家释放的猩红系法术法术强度提高[10x词条等级]%，但每次释放猩红系法术，对玩家造成[词条等级x3]点流血伤害
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function starinium_ingot(event) {
    const player = event.player;
    if (!player || !fu_hasTraitAnywhere(player, "kubejs:starinium_ingot")) return;

    const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:starinium_ingot");
    const damage = traitLevel * 3

    attackEntity(player, 'kubejs:bleed', damage, true)

}