/**
 * 修复书籍不重载
 */

ClientEvents.loggedIn(event => {
    try {
        $ClientBookRegistry.INSTANCE.reload();
        console.log("[Reverie Foundry] 书籍重新加载成功！");
    } catch (error) {
        console.error("重新加载失败:", error);
    }
});
