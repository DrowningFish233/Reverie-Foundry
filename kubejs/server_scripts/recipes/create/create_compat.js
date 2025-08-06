// priority: 0
function withChance(item, chance, count) {
    if (count == undefined) {
        count = 1;
    }
    return {
        item: item,
        count: count,
        chance: chance,
    }
}

// 自定义函数用于复制 Object.fromEntries() 的功能
function fromEntries(entries) {
    var result = {};
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var key = entry[0];
        var value = entry[1];
        result[key] = value;
    }
    return result;
}

const basicRecipe = (type) => (output, input) => {
    const result = {
        type: 'create:' + type,
        ingredients: jsonArray(input),
        results: jsonArray(output, true),
    }
    return result;
};

const jsonArray = (items, isOutput) => {
    if (!Array.isArray(items)) items = [items];
    let result = [];
    items.forEach((element) => {
        if (typeof element == "string") {
            if (isOutput) {
                element = Item.of(element)
            } else {
                element = Ingredient.of(element)
            }
        }
        if (typeof element == "object" && "fluid" in element && "toJson" in element && isOutput) {
            // 如果元素是流体且尚未是 JSON 对象，则将其转换为 JSON
            element = Fluid.of(element, element.amount).toJson();
        }
        if (typeof element == "object" && "fluid" in element && "toJson" in element && !isOutput) {
            element = {
                fluid: element.id,
                amount: element.amount,
                type: "fluid_stack",
            }
        }
        if (typeof element == "object" && "toJson" in element) {
            element = element.toJson();
        }
        if (typeof element == "object" && "fluid" in element && !("toJson" in element) && isOutput) {
            // 如果元素是流体且尚未是 JSON 对象，则将其转换为 JSON 流体栈
            element = Fluid.of(element).toJson();
            element = {
                id: element.fluid,
                amount: element.amount,
                type: "fluid_stack",
            }
        }
        if (typeof element == "object" && "id" in element && !isOutput) {
            // 如果存在键 "id"，将其重命名为 "item"
            element.item = element.id;
            delete element.id;
        }
        if (typeof element == "object" && "item" in element && isOutput) {
            // 如果存在键 "item"，将其重命名为 "id"
            element.id = element.item;
            delete element.item;
        }
        if (!isOutput && typeof element == "object" && "count" in element) {
            // 如果存在键 "count"，则删除它
            delete element.count;
        }
        if (typeof element == "object" && "chance" in element) {
            // 确保保留 "chance" 属性
            element.chance = element.chance;
        }
        result.push(element);
    });
    return result;
};

const create = {
    compacting: basicRecipe("compacting"),
    crushing: basicRecipe("crushing"),
    cutting: basicRecipe("cutting"),
    deploying: basicRecipe("deploying"),
    emptying: basicRecipe("emptying"),
    filling: basicRecipe("filling"),
    haunting: basicRecipe("haunting"),
    item_application: basicRecipe("item_application"),
    mechanical_crafting: (output, pattern, key) => ({
        accept_mirrored: true,
        type: "create:mechanical_crafting",
        result: jsonArray(output, true)[0],
        pattern: pattern,
        key: /*Object.*/ fromEntries(
            Object.entries(key).map(([k, v]) => [k, Ingredient.of(v).toJson()])
        ),
    }),
    milling: basicRecipe("milling"),
    mixing: basicRecipe("mixing"),
    pressing: basicRecipe("pressing"),
    sandpaper_polishing: basicRecipe("sandpaper_polishing"),
    sequenced_assembly: (output, input, recipes) => {
        let sequence = recipes.map((recipe) => {
            // 将每个组件配方标记为中间产品，因此不会被注册
            return recipe.markAsIntermediate();
        });
        // 然后，创建顺序组装配方
        return {
            type: "create:sequenced_assembly",
            ingredient: Ingredient.of(input).toJson(),
            results: jsonArray(output, true),
            sequence: sequence.map((r) => r.markAsIntermediate().getRecipe()), // 假设我们需要在这里传递配方对象
            loops: 1,
            transitional_item: Ingredient.of(input).toJson(),
        };
    },
    splashing: basicRecipe("splashing"),
};

let pendingRecipes = [];

function createRecipeWrapper(recipeJson) {
    // let recipe = Utils.copy(recipeJson);
    let recipe = Object.assign({}, recipeJson); // 使用 Object.assign 来复制对象
    let customId = null; // 为生成的 ID 占位符
    let shouldBeRegistered = true; // 只有在未标记为中间产品时才注册

    // 方法修改，保持链式调用，但不立即最终化
    const methods = {
        acceptMirrored: function (value) {
            recipe.accept_mirrored = value ?? true;
            return this;
        },
        category: function (category) {
            recipe.category = category;
            return this;
        },
        getRecipe() {
            return recipe;
        },
        heated: function () {
            recipe.heat_requirement = "heated";
            return this;
        },
        id: function (id) {
            customId = id;
            return this;
        },
        keepHeldItem: function (value) {
            recipe.keep_held_item = value ?? true;
            return this;
        },
        loops: function (value) {
            recipe.loops = value;
            return this;
        },
        markAsIntermediate: function () {
            shouldBeRegistered = false;
            return this;
        },
        processingTime: function (processingTime) {
            recipe.processing_time = processingTime;
            return this;
        },
        superheated: function () {
            recipe.heat_requirement = "superheated";
            return this;
        },
        transitionalItem: function (item) {
            recipe.transitional_item = Item.of(item).toJson();
            return this;
        },
        register: function () {
            pendingRecipes.push({
                recipe: recipe,
                finalize: (event) => {
                    if (shouldBeRegistered) {
                        let registeredRecipe = event.custom(recipe);
                        if (customId != null) {
                            registeredRecipe.id(customId);
                        }
                        return registeredRecipe;
                    }
                },
            });
        },
    };

    // 立即注册配方以供最终化
    methods.register();

    return methods;
}

function addCreateRecipeHandler(event) {
    event.recipes.create = {};
    Object.keys(create).forEach((type) => {
        event.recipes.create[type] = function () {
            let args = Array.prototype.slice.call(arguments);
            let recipeJson = create[type].apply(null, args);
            return createRecipeWrapper(recipeJson, event);
        };
        if (Utils.snakeCaseToCamelCase(type) != type)
            event.recipes.create[Utils.snakeCaseToCamelCase(type)] =
                event.recipes.create[type];
        event.recipes[
            `create${Utils.snakeCaseToTitleCase(type)}`.replace(" ", "")
        ] = event.recipes.create[type];
    });

    // 引入一个方法来最终化所有待处理的配方
    event.recipes.create.finalize = function () {
        pendingRecipes.forEach((pending) => pending.finalize(event));
        pendingRecipes = []; // 在最终化后清空待处理列表
    };
}