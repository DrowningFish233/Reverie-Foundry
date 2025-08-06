PlayerEvents.tick(event => {
    const player = event.player;
    if (!player || player.tickCount % 50 !== 0) return;

    const pData = player.persistentData;
    const sanityValue = pData.getInt("sanity") || 0;

    if (is_Magical_Girl(event, player)) return;

    // 只在理智为-45时处理
    if (sanityValue !== -45) return;

    const sinEffects = {
        "GLUTTONY": [
            { id: "fruitsdelight:appetizing", duration: 100, amplifier: 0, ambient: false, showParticles: false },
            { id: "minecraft:hunger", duration: 100, amplifier: 4, ambient: false, showParticles: false }
        ],
        "ENVY": [{ id: "kubejs:envy", duration: 100, amplifier: 0, showParticles: false }],
        "GREED": [{ id: "kubejs:greed", duration: 100, amplifier: 0, showParticles: false }],
        "LUST": [{ id: "kubejs:lust", duration: 100, amplifier: 0, showParticles: false }],
        "PRIDE": [{ id: "kubejs:pride", duration: 100, amplifier: 0, showParticles: false }],
        "SLOTH": [
            { id: "kubejs:sloth", duration: 100, amplifier: 0, showParticles: false },
            { id: "kubejs:sloth_2", duration: 100, amplifier: 0, showParticles: false }
        ],
        "WRATH": [{ id: "kubejs:wrath", duration: 100, amplifier: 0, showParticles: false }]
    };

    for (const sin in sins) {
        if (pData.getInt(sins[sin]) > 0) {
            const effects = sinEffects[sin];
            if (effects) {
                for (const i = 0; i < effects.length; i++) {
                    const effect = effects[i];
                    player.potionEffects.add(
                        effect.id,
                        effect.duration,
                        effect.amplifier,
                        effect.ambient || false,
                        effect.showParticles || false
                    );
                }
            }
        }
    }
});