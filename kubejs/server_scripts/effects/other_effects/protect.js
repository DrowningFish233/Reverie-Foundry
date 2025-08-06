function protect(event) {
    let entity = event.getEntity();
    if (entity.hasEffect("kubejs:protect")) {
        const protectEffect = entity.getEffect("kubejs:protect");
        const level = protectEffect.getAmplifier() + 1;
        const damageMultiplier = 1.0 - (level * 0.1);
        new_damage(event, STAGE.MULTIPLY, damageMultiplier);
    }
    return;
}