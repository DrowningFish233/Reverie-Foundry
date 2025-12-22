/** 复刻凝胶 */
ServerEvents.recipes((event) => {
    event.recipes.kubejs
        .shapeless(Item.of("kubejs:mark")
            .withCustomName("???"),
            [Ingredient.all, "kubejs:mimicream"])
        .modifyResult("duplicate");

});
/** 复刻凝胶 */
ServerEvents.modifyRecipeResult("duplicate", (event) => {
    event.success(event.grid.find(Ingredient.all.except("kubejs:mimicream")).withCount(2));
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