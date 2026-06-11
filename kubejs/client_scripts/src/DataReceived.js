NetworkEvents.dataReceived("gift_Heaven", (event) => {
    let data = event.data;
    if (!data.gift_Heaven || !data.itemId) return;
    let displayItem = Item.of(data.itemId);
    const mc = Client.getInstance();
    if (mc && mc.gameRenderer) {
        mc.gameRenderer.displayItemActivation(displayItem);
    }
});
