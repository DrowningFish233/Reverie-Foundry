/**
 *  脑袋尖尖
 */
function spinel(event) {
    const { source, entity } = event;
    const attacker = source.player || source.entity;
    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:spinel")) {
        return;
    }
    if (Math.random() < 0.2) {
        event.cancel();
    }
}

