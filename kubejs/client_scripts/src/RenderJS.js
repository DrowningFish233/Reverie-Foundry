let sanityValue = 0

NetworkEvents.dataReceived("player_sanity", (event) => {
    let player_sanity = event.data.sanity;
    const sanitizedValue = String(player_sanity).replace(/d$/, '');
    sanityValue = Math.floor(parseFloat(sanitizedValue));
});


RenderJSEvents.onGuiPostRender(event => {
    // 根据理智值确定颜色
    let textColor;
    if (sanityValue >= 40) {
        textColor = 0x00bfff;
    } else if (sanityValue >= 20) {
        textColor = 0x7cfc00;
    } else if (sanityValue <= -40) {
        textColor = 0xdc143c; // 红色
    } else if (sanityValue <= -20) {
        textColor = 0xffd700; // 黄色
    } else {
        textColor = 0xFFFFFF;
    }

    event.drawString(Text.of(Text.translate("gui.kubejs.sanity").getString() + sanityValue), 5, 30, textColor);

    const frameWidth = 11;
    const frameHeight = 101;
    const frameX = 10;
    const frameY = 43;

    const barWidth = 5;
    const barHeight = 92;
    const barX = frameX + 3;
    const barY = frameY + 4;

    const minSanity = -45;
    const maxSanity = 45;
    const clampedValue = Math.max(minSanity, Math.min(sanityValue, maxSanity));
    const fillRatio = (clampedValue - minSanity) / (maxSanity - minSanity);
    const displayHeight = Math.floor(fillRatio * barHeight);

    // 背景
    event.drawTexture(
        "kubejs:textures/gui/san.png",
        frameX, frameY,
        frameWidth, frameHeight,
        0, 0,
        frameWidth, frameHeight,
        0
    );

    if (displayHeight > 0) {
        const drawY = barY + (barHeight - displayHeight);

        event.drawTexture(
            "kubejs:textures/gui/san_2.png",
            barX, drawY,
            barWidth, barHeight,
            0, barHeight - displayHeight,
            barWidth, displayHeight,
            0
        );
    }
})