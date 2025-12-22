/**
 * 持有杂鱼武器效果
 */
function naughty(event) {
    const { source, entity } = event;
    const player = source.player || source.actual;
    if (!player.player || !entity.living || !player.hasEffect("kubejs:naughty")) {
        return;
    }
    const playerMaxHealth = player.getMaxHealth()
    const mainHandItem = player.getMainHandItem();
    if (mainHandItem.isEmpty()) return;

    const components = mainHandItem.components;
    if (!components) {
        return;
    }

    if (components.has("tiered:tiered_modifier")) {
        let tieredModifier = components.get("tiered:tiered_modifier");
        if (tieredModifier === "tiered:swords/kubejs_sword_0") {
            if (Math.random() < 0.00005) {
                player.setHealth(playerMaxHealth)
                const randomTaunt = [
                    'message.taunt.default',
                    'message.taunt.variant1',
                    'message.taunt.variant2',
                    'message.taunt.variant3'
                ][Math.floor(Math.random() * 4)];
                player.tell(Text.translate(randomTaunt));
                event.cancel();
            }
        }
    }
}