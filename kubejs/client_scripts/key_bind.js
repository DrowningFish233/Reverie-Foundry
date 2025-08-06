ClientEvents.tick((event) => {
    const { player } = event;
    const key = Client.options.keyMappings.find(k => k.getName() === "key.test");
    if (key && key.consumeClick()) {
        player.sendData("key.test", { message: "key.test" });
    }
});

ClientEvents.tick((event) => {
    const { player } = event;
    const key = Client.options.keyMappings.find(k => k.getName() === "key.test_2");
    if (key && key.consumeClick()) {
        player.sendData("key.test_2", { message: "key.test_2" });
    }
});

ClientEvents.tick((event) => {
    const { player } = event;
    const key = Client.options.keyMappings.find(k => k.getName() === "key.test_3");
    if (key && key.consumeClick()) {
        player.sendData("key.test_3", { message: "key.test_3" });
    }
});

ClientEvents.tick((event) => {
    const { player } = event;
    const key = Client.options.keyMappings.find(k => k.getName() === "key.test_4");
    if (key && key.consumeClick()) {
        player.sendData("key.test_4", { message: "key.test_4" });
    }
});
