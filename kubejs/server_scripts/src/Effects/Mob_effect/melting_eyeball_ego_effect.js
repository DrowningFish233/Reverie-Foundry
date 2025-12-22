//蛙眼(融化的眼球)
function melting_eyeball_ego_attack(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:melting_eyeball_ego_effect")) {
        return;
    }
    if (entity.hasEffect("kubejs:tremor")) {
        let tremorEffect = entity.getEffect("kubejs:tremor");
        let tremorLevel = tremorEffect.getAmplifier();

        entity.potionEffects.add("kubejs:hurt", 20 * 8, 0);
        entity.potionEffects.add("minecraft:slowness", 20 * 8, 0);
        if (entity.isPlayer()) {
            const eData = entity.persistentData;
            let Esanity = eData.getInt(sanity)
            updateplayersanity(entity, Esanity - 25);
        }
        //震颤引爆层数-1
        let newTremorLevel = tremorLevel - 1
        entity.removeEffect("kubejs:tremor");
        entity.potionEffects.add("kubejs:tremor", tremorEffect.getDuration(), newTremorLevel);
        if (newTremorLevel < 1) {
            entity.removeEffect("kubejs:tremor");
        }

        if (attacker.isPlayer()) {
            const pData = attacker.persistentData;

            let Psanity = pData.getInt(sanity)
            if (Psanity <= -45) {
                attacker.attack($DamageSource("out_of_world"), attacker.getMaxHealth() / 2);
            }
            attacker.removeEffect("kubejs:melting_eyeball_ego_effect")
            event.level[$playersound]
                (null, attacker.x, attacker.y, attacker.z, "kubejs:tremor_burst_1", "players", 1.0, 1.0)
            updateplayersanity(attacker, Psanity - 25);
        }
    } return
}