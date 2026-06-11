/** 复刻凝胶 */
ServerEvents.recipes((event) => {
    event.recipes.kubejs
        .shapeless(Item.of("kubejs:mark"),
            [Ingredient.all, "kubejs:mimicream"])
        .modifyResult("duplicate");
});

/** 复刻凝胶*/
ServerEvents.modifyRecipeResult("duplicate", (event) => {
    // 黑名单
    const blacklist = [
        // 模组
        "#create:toolboxes",
        "sophisticatedstorage:*",
        'minecraft:bundle',
        'malum:soulwoven_pouch',
        'malum:ravenous_pouch',
        "#c:shulker_boxes"
    ];
    let ingredient = event.grid.find(Ingredient.all.except("kubejs:mimicream"));
    if (!ingredient) {
        event.exit();
        return;
    }

    // 遍历黑名单检查
    for (let banned of blacklist) {
        if (banned.endsWith(":*")) {
            let modId = banned.replace(":*", "");
            if (ingredient.mod === modId) {
                event.exit();
                return;
            }
        }
        else if (banned.startsWith("#")) {
            let tag = banned.substring(1);
            if (ingredient.hasTag(tag)) {
                event.exit();
                return;
            }
        }
        else {
            if (ingredient.id === banned) {
                event.exit();
                return;
            }
        }
    }
    event.success(ingredient.withCount(2));
});

ServerEvents.recipes((event) => {
    event.recipes.kubejs
        .shapeless("enchanted_book", ["enchanted_book", "kubejs:lava_bible"])
        .modifyResult("duplicate_enchantment_book")
        .keepIngredient("enchanted_book");
});
ServerEvents.modifyRecipeResult("duplicate_enchantment_book", (event) => {
    event.success(event.grid.find("enchanted_book"));
}); 
