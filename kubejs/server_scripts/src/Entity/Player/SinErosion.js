const SINS = ["GLUTTONY", "PRIDE", "WRATH", "ENVY", "LUST", "SLOTH", "GLOOM"];
let currentSinIndex = 0;

ItemEvents.rightClicked('kubejs:sin', event => {
    const player = event.player;
    const currentSin = SINS[currentSinIndex];
    let pData = player.persistentData;
    if (is_Magical_Girl(event, player)) {
        player.tell(
            Text.translate('message.sin_corruption.disabled').color('aqua')
        );
        return
    };
    updateplayersanity(player, -45)
    //触发定向罪孽侵蚀
    targetedSinErosion(event, player, currentSin, 1);
    currentSinIndex = (currentSinIndex + 1) % SINS.length;
    const nextSin = SINS[currentSinIndex];
    player.tell(
        Text.join(
            Text.translate('message.next_sin', [
                Text.of(nextSin).color('gold')
            ]),
            Text.translate('message.amns.probejs').color('green'),
            Text.of(nextSin).color('gold')
        )
    );
});