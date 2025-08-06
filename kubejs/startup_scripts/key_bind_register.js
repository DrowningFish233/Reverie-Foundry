const $RegisterKeyMappingsEvent = Java.loadClass("net.neoforged.neoforge.client.event.RegisterKeyMappingsEvent");
const $keyMapping = Java.loadClass("net.minecraft.client.KeyMapping");

NativeEvents.onEvent($RegisterKeyMappingsEvent, event => {
    event.register(new $keyMapping("key.test", 75, "key.group"));
    event.register(new $keyMapping("key.test_2", 76, "key.group"));
    event.register(new $keyMapping("key.test_3", 72, "key.group"));
    event.register(new $keyMapping("key.test_4", 77, "key.group"));

});

