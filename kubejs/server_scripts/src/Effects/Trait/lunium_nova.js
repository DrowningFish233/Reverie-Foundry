function lunium_nova(event, player) {
    if (player.hasEffect("kubejs:moon")) {
        const moonPhase = event.level.getMoonPhase();
        if (moonPhase == null) return;
        switch (moonPhase) {
            case 0: // 新月
                player.potionEffects.add("kubejs:new_moon", 80, 0);
                break;
            case 1: // 残月
                player.potionEffects.add("kubejs:moon_effect", 80, 0);
                break;
            case 2: // 峨眉月
                player.potionEffects.add("kubejs:waxing_crescent", 80, 0);
                break;
            case 3: // 弦月
                player.potionEffects.add("kubejs:quarter", 80, 0);
                break;
            case 4: // 凸月
                player.potionEffects.add("kubejs:waxing_gibbous", 80, 0);
                break;
            case 5: // 满月
                player.potionEffects.add("kubejs:full_moon", 80, 0);
                break;
        }
    }
}