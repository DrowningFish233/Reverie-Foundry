const SINS = ["GLUTTONY", "PRIDE", "WRATH", "ENVY", "LUST", "SLOTH", "GREED"];
let currentSinIndex = 0;

ItemEvents.rightClicked('kubejs:sin', event => {
    const player = event.player;
    const currentSin = SINS[currentSinIndex];
    let pData = player.persistentData;
    if (is_Magical_Girl(event, player)) {
        player.tell(`§b当前状态无法进行罪孽侵蚀`);
        return
    };
    pData.putInt(sanity, -45);
    //触发定向罪孽侵蚀
    targetedSinErosion(event, player, currentSin, 1);
    currentSinIndex = (currentSinIndex + 1) % SINS.length;
    const nextSin = SINS[currentSinIndex];
    player.tell(`§a下一次侵蚀: §6${nextSin}`);
});