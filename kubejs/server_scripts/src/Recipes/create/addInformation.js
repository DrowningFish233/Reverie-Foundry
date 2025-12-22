/**
 * 旧的计算函数
 * @deprecated 从 v0.0.3 开始弃用，请使用EMI世界交互代替
function getTranslationKey(itemId) {
    let parts = itemId.split(':');
    return 'item.' + parts[0] + '.' + parts[1];
}

function toIngredient(itemId) {
    return Ingredient.of(itemId);
}

let CONVERSION_RECIPES = [
    [
        'kubejs:raw_netherite_ingot',
        'kubejs:estalt_ingot',
        [
            'tooltip.kubejs.raw_netherite_to_estalt.line1',
            'tooltip.kubejs.raw_netherite_to_estalt.line2'
        ]
    ],

];

// 统一注册
RecipeViewerEvents.addInformation('item', event => {
    CONVERSION_RECIPES.forEach(recipe => {
        let inputIngredient = toIngredient(recipe[0]);
        let outputIngredient = toIngredient(recipe[1]);
        let inputKey = getTranslationKey(recipe[0]);
        let outputKey = getTranslationKey(recipe[1]);

        // 输入物品工具提示
        let inputDesc = [
            Text.translate('tooltip.conversion.input_desc')
                .append(Text.translate(outputKey).copy().bold().withColor(0xAAFF00))
        ];
        recipe[2].forEach(desc => {
            inputDesc.push(Text.translate(desc));
        });
        event.add(inputIngredient, inputDesc);

        // 输出物品工具提示
        let outputDesc = [
            Text.translate('tooltip.conversion.output_desc')
                .append(Text.translate(inputKey).copy().bold().withColor(0xAAFF00))
                .append(Text.translate('tooltip.conversion.output_suffix'))
        ];
        recipe[2].forEach(desc => {
            outputDesc.push(Text.translate(desc));
        });
        event.add(outputIngredient, outputDesc);

        // EMI 注册
        $MysteriousItemConversionCategory.RECIPES.add(
            $ConversionRecipe.create(recipe[0], recipe[1])
        );
    });
});
*/