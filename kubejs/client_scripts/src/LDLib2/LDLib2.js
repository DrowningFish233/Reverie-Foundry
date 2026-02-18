// priority: 0
// represents data on the server

var stacks = $Arrays.asList(
    $List.of(Items.APPLE.getDefaultInstance()),
    $List.of($ItemStack.EMPTY)
);
var itemHandler = new $CycleItemStackHandler(stacks);
const fluidTank = new $FluidTank(2000);
fluidTank.setFluid(new $FluidStack($Fluids.WATER, 1000));

let bool = true;
let string = "hello";
let number = 0.5;

function createModularUI(menu) {
    var player = menu.player;
    // create a root element

    const root = new UIElement();

    root.addChildren(
        // add a label to display text
        new Label().setText("Data Between Screen and Menu"),

        // ===== bind storage to slots =====
        // ===== 服务器数据双向绑定 =====
        new UIElement()
            .addChildren(
                // 物品槽 - 双向绑定
                new ItemSlot().bind(
                    DataBindingBuilder.itemStack(
                        () => itemHandler.getStackInSlot(0),
                        (stack) => itemHandler.setStackInSlot(0, stack)
                    ).build()
                ),
                new ItemSlot().bind(
                    DataBindingBuilder.itemStack(
                        () => itemHandler.getStackInSlot(1),
                        (stack) => itemHandler.setStackInSlot(1, stack)
                    ).build()
                ),

                // 流体槽 - 只读同步（服务器→客户端）+ RPC交互
                new FluidSlot()
                    .bind(fluidTank, 0)  // 保留原有绑定，它内部已使用正确策略
            )
            .layout((l) => l.gapAll(2).flexDirection($YogaFlexDirection.ROW)),

        // ===== bind value to the components =====
        new UIElement()
            .addChildren(
                // Boolean binding with Switch
                new Switch()
                    .bindDataSource(SupplierDataSource.of(() => bool))
                    .bindObserver((value) => { bool = value; }),

                // String binding with TextField
                new TextField()
                    .bindDataSource(SupplierDataSource.of(() => string))
                    .bindObserver((value) => { string = value; })
                    .setText(string),

                new $Scroller.Horizontal()
                    .bindDataSource(SupplierDataSource.of(() => new $Float(number)))
                    .bindObserver((value) => { number = value; })
                    .setRange(0, 1),

                // read-only label - displays current server values
                new Label().bindDataSource(
                    SupplierDataSource.of(() =>
                        $Component.literal("s->c only: ")
                            .append($Component.literal(String(bool))["withStyle(net.minecraft.ChatFormatting)"]($ChatFormatting.AQUA))
                            .append(" ")
                            .append($Component.literal(string)["withStyle(net.minecraft.ChatFormatting)"]($ChatFormatting.RED))
                            .append(" ")
                            .append($Component.literal(
                                new $String["(java.lang.String)"]("%.2f").formatted(number)  // ✅ 指定构造函数
                            )["withStyle(net.minecraft.ChatFormatting)"]($ChatFormatting.YELLOW))
                    )
                ),

                // trigger ui events on the server side
                new Button()
                    .setText("切换流体")
                    .addServerEventListener(UIEvents.MOUSE_DOWN, (event) => {
                        if (fluidTank.getFluid().getFluid() === $Fluids.WATER) {
                            fluidTank.setFluid(new $FluidStack($Fluids.LAVA, 1000));
                        } else {
                            fluidTank.setFluid(new $FluidStack($Fluids.WATER, 1000));
                        }
                    })
            )
            .layout((l) => l.gapAll(2)),

        // player inventory
        new InventorySlots()
    );


    root.addClass("panel_bg");
    root.layout(l => l.paddingAll(7).gapAll(5));

    return ModularUI.of(
        UI["of(com.lowdragmc.lowdraglib2.gui.ui.UIElement,com.lowdragmc.lowdraglib2.gui.ui.style.Stylesheet[])"](
            root,
            [StylesheetManager.INSTANCE.getStylesheetSafe(StylesheetManager.GDP)]
        ),
        player
    );
}

/**
 * 打开ModularUI屏幕
 */
function openScreenUI() {
    var player = $Minecraft.getInstance().player;
    var modularUI = createModularUI({ player: player });
    var minecraft = $Minecraft.getInstance();
    minecraft.setScreen(new $ModularUIScreen(modularUI, $Component.empty()));
}

// 网络事件监听
NetworkEvents.dataReceived("openScreenUI", (event) => {
    openScreenUI();
});