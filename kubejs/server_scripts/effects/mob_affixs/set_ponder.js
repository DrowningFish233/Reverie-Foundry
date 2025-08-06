/**
 * 陷入思考
 */
function set_ponder(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:set_ponder")) {
        return;
    }

    let Effect = attacker.getEffect("kubejs:set_ponder");
    let Level = Effect.getAmplifier();

    entity.potionEffects.add("kubejs:ponder", 500, Level * 100);
}