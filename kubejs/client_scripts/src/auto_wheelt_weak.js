// requires: mousetweaks

ClientEvents.tick(event => {
    const $Main = Java.loadClass("yalter.mousetweaks.Main")

    const client = event.client
    if (client.screen) { //没有屏幕的时候不需要滚轮
        $Main.config.wheelTweak = !client.isShiftDown()
    }
})