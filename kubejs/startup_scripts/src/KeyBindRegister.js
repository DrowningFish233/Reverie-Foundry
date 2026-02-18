// priority: 0
const $RegisterKeyMappingsEvent = Java.loadClass("net.neoforged.neoforge.client.event.RegisterKeyMappingsEvent");
const $keyMapping = Java.loadClass("net.minecraft.client.KeyMapping");

NativeEvents.onEvent($RegisterKeyMappingsEvent, event => {
    event.register(new $keyMapping("key.test", 89, "key.group"));
    event.register(new $keyMapping("key.test_2", 90, "key.group"));
    event.register(new $keyMapping("key.test_3", 82, "key.group"));
    event.register(new $keyMapping("key.test_4", 70, "key.group"));
    event.register(new $keyMapping("key.test_5", 71, "key.group"));
    event.register(new $keyMapping("key.test_6", 72, "key.group"));
    event.register(new $keyMapping("key.test_7", 73, "key.group"));

});

