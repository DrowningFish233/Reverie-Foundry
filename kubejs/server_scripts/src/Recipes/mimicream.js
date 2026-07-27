/** 复刻凝胶 */
ServerEvents.recipes((event) => {
    event.recipes.kubejs
        .shapeless(Item.of("kubejs:mark"),
            [Ingredient.all, "kubejs:mimicream"])
        .modifyResult("duplicate");
});

/** 复刻凝胶 */
ServerEvents.modifyRecipeResult("duplicate", (event) => {
    // 黑名单（完全禁止复制的物品）
    const blacklist = [
        'create:minecart_contraption',
    ];

    // 剥离组件白名单（只复制 ID）
    const stripComponentWhitelist = [
        'silentgear:blueprint_book',
        'minecraft:bundle',
        "#create:toolboxes",
        "#c:shulker_boxes",
        "sophisticatedstorage:*",
        "sophisticatedbackpacks:*",
        'malum:soulwoven_pouch',
        'malum:ravenous_pouch',
        "refinedstorage:*",
    ];

    let ingredient = event.grid.find(Ingredient.all.except("kubejs:mimicream"));
    if (!ingredient) {
        event.exit();
        return;
    }

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

    // 检查是否需要剥离组件
    let shouldStrip = false;
    for (let item of stripComponentWhitelist) {
        if (item.startsWith("#")) {
            let tag = item.substring(1);
            if (ingredient.hasTag(tag)) {
                shouldStrip = true;
                break;
            }
        } else if (item.endsWith(":*")) {
            let modId = item.replace(":*", "");
            if (ingredient.mod === modId) {
                shouldStrip = true;
                break;
            }
        } else {
            if (ingredient.id === item) {
                shouldStrip = true;
                break;
            }
        }
    }

    if (shouldStrip) {
        event.success(Item.of(ingredient.id, 2));
    } else {
        event.success(ingredient.withCount(2));
    }
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
