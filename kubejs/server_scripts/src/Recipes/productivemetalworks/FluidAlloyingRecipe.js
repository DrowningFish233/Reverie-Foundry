/**
 * 流体合金配方
 * @param {Array} fluids - 输入流体数组
 * @param {Object} result - 输出流体
 * @param {number} speed - 处理速度
 */
function FluidAlloyingRecipe(fluids, result, speed) {
    this.type = "productivemetalworks:fluid_alloying";
    this.fluids = fluids;
    this.result = {
        amount: result.amount,
        id: result.id
    };
    this.speed = speed;
}

// 原型方法
FluidAlloyingRecipe.prototype = {
    /**
     * 设置处理速度
     * @param {number} speed - 处理速度
     */
    setSpeed: function (speed) {
        this.speed = speed;
        return this;
    }
};

// 流体辅助函数
function createFluid(fluidId, amount) {
    return {
        amount: amount,
        fluid: fluidId
    };
}

// 专门的标签创建函数
function createFluidTag(tagId, amount) {
    return {
        amount: amount,
        tag: tagId
    };
}

ServerEvents.recipes(event => {
    // 包装注册函数
    const register = recipe => {
        const json = JSON.parse(JSON.stringify(recipe));
        event.custom(json);
    };

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_diamond", 60),
                createFluidTag("c:molten_gold", 30)
            ],
            {
                amount: 90,
                id: "kubejs:enlighted_gold"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_aluminum", 45),
                createFluidTag("c:molten_iron", 45)
            ],
            {
                amount: 90,
                id: "kubejs:aluminum"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_copper", 45),
                createFluidTag("c:molten_gold", 45)
            ],
            {
                amount: 90,
                id: "kubejs:scepbo"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_aluminum", 45),
                createFluidTag("c:molten_silver", 45)
            ],
            {
                amount: 90,
                id: "kubejs:frigidite"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("kubejs:golden_apple", 40),
                createFluidTag("c:molten_iron", 40),
                createFluidTag("c:molten_diamond", 10)
            ],
            {
                amount: 90,
                id: "kubejs:terraulite"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_gold", 45),
                createFluidTag("c:molten_copper", 45)
            ],
            {
                amount: 90,
                id: "kubejs:scepbo"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_silver", 45),
                createFluidTag("c:molten_nickel", 45)
            ],
            {
                amount: 90,
                id: "kubejs:silver"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_steel", 45),
                createFluid("productivemetalworks:molten_quartz", 45)
            ],
            {
                amount: 90,
                id: "kubejs:silicon"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_redstone", 45),
                createFluidTag("c:molten_copper", 45)
            ],
            {
                amount: 90,
                id: "kubejs:palladium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_quartz", 30),
                createFluidTag("c:molten_iron", 30),
                createFluidTag("c:molten_aluminum", 30)
            ],
            {
                amount: 90,
                id: "kubejs:palladium"
            },
            6
        )
    );


    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_slime", 45),
                createFluidTag("c:molten_uranium", 45)
            ],
            {
                amount: 90,
                id: "kubejs:uranium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_blaze", 30),
                createFluid("productivemetalworks:molten_lapis", 30),
                createFluidTag("c:molten_uranium", 30)
            ],
            {
                amount: 90,
                id: "kubejs:thorium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_copper", 90),
                createFluidTag("c:molten_lead", 90),
                createFluid("productivemetalworks:molten_amethyst", 10)
            ],
            {
                amount: 90,
                id: "kubejs:lead"
            },
            8
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_carbon", 90),
                createFluidTag("c:molten_iron", 90),
                createFluid("productivemetalworks:molten_amethyst", 10)
            ],
            {
                amount: 90,
                id: "kubejs:steel"
            },
            8
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_lapis", 30),
                createFluid("productivemetalworks:molten_redstone", 30),
                createFluidTag("c:molten_iron", 30)

            ],
            {
                amount: 90,
                id: "kubejs:magnetite"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("minecraft:water", 20),
                createFluid("kubejs:fluorite", 30),
                createFluidTag("c:molten_nickel", 30),
                createFluidTag("c:molten_uranium", 10)
            ],
            {
                amount: 90,
                id: "kubejs:rhodium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("minecraft:water", 20),
                createFluid("kubejs:fluorite", 40),
                createFluidTag("c:molten_zinc", 30)
            ],
            {
                amount: 90,
                id: "kubejs:scandium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_bronze", 45),
                createFluidTag("c:molten_tin", 45)
            ],
            {
                amount: 90,
                id: "kubejs:strontium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("kubejs:blood_orb", 40),
                createFluidTag("c:molten_steel", 30),
                createFluidTag("kubejs:blood", 20)
            ],
            {
                amount: 90,
                id: "kubejs:vibranite"
            },
            6
        )
    );
    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_netherite", 30),
                createFluid("kubejs:mithril", 30),
                createFluid("kubejs:soul_stained_steel", 30)
            ],
            {
                amount: 90,
                id: "kubejs:ultimate"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("minecraft:water", 5),
                createFluid("kubejs:blood_orb", 5),
            ],
            {
                amount: 10,
                id: "irons_spellbooks:blood"
            },
            6
        )
    );

});