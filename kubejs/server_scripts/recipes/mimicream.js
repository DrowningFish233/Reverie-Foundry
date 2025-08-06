const duplicateTemplate = "kubejs:mimicream";

ServerEvents.recipes((event) => {
    event.recipes.kubejs
        .shapeless(Item.of("kubejs:mark")
            .withCustomName("???"),
            [Ingredient.all, duplicateTemplate])
        .modifyResult("duplicate");
});

ServerEvents.modifyRecipeResult("duplicate", (event) => {
    event.success(event.grid.find(Ingredient.all.except(duplicateTemplate)).withCount(2));
});