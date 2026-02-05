
function load_protection(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:load_protection")) {
        return;
    }
    attacker.removeEffect("kubejs:load_protection");
}


function load_protection_attack(event) {
    const entity = event.entity;
    if (entity.hasEffect("kubejs:load_protection")) {
        event.cancel()
    }
}
