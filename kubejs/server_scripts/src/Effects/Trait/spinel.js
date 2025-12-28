/**
 *  脑袋尖尖
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function spinel(event) {
    const { source, entity } = event;
    const attacker = source.player || source.entity;
    if (!attacker || !attacker.isPlayer() || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:spinel")) {
        return;
    }
    if (Math.random() < 0.2) {
        event.cancel();
    }
}

