// priority: 500
const keysToCheck = [
    "key.test",
    "key.test_2",
    "key.test_3",
    "key.test_4",
    "key.test_5",
    "key.test_6",
    "key.test_7"

];
/***
let currentKeyBindings = {};

// 初始化默认值
keysToCheck.forEach(keyName => {
    currentKeyBindings[keyName] = null;
});
***/

ClientEvents.tick(event => {
    const { player } = event;

    keysToCheck.forEach(keyName => {
        const key = Client.options.keyMappings.find(k => k.getName() === keyName);
        if (key) {
            let physicalKey = key.getKey().getName();
            /***
            currentKeyBindings[keyName] = physicalKey;
            ***/
            if (key.consumeClick()) {
                player.sendData(keyName, {
                    message: keyName,
                    boundKey: physicalKey
                });

            }
        }
    });
});

