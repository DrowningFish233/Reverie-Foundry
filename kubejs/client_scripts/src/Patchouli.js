/**
 * 修复书籍不重载
 */
const $ClientBookRegistry = Java.loadClass('vazkii.patchouli.client.book.ClientBookRegistry')

ClientEvents.loggedIn(event => {
    try {
        $ClientBookRegistry.INSTANCE.reload();
        console.log("书籍重新加载成功！");
    } catch (error) {
        console.error("重新加载失败:", error);
    }
});