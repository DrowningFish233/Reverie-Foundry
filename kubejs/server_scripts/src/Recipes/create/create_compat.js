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

// 自定义函数来复制 Object.fromEntries() 的功能
function fromEntries(entries) {
  let result = {};
  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    let key = entry[0];
    let value = entry[1];
    result[key] = value;
  }
  return result;
}

const basicRecipe = (type) => (output, input) => {
  const result = {
    type: 'create:' + type, // 配方类型，前缀为 'create:'
    ingredients: jsonArray(input), // 输入材料
    results: jsonArray(output, true), // 输出结果
  }
  return result;
};

const jsonArray = (items, isOutput) => {
  if (!Array.isArray(items)) items = [items]; // 确保输入是数组
  let result = [];
  items.forEach((element) => {
    if (typeof element == "string") {
      if (isOutput) {
        element = Item.of(element) // 字符串转换为输出物品
      } else {
        element = Ingredient.of(element) // 字符串转换为输入材料
      }
    }
    if (typeof element == "object" && "fluid" in element && "toJson" in element && isOutput) {
      // 如果元素是流体且还不是JSON对象，将其转换为JSON
      element = Fluid.of(element, element.amount).toJson();
    }
    if (typeof element == "object" && "fluid" in element && "toJson" in element && !isOutput) {
      element = {
        fluid: element.id,
        amount: element.amount,
        type: "fluid_stack", // 流体堆栈类型
      }
    }
    if (typeof element == "object" && "toJson" in element) {
      element = element.toJson(); // 转换为JSON
    }
    if (typeof element == "object" && "fluid" in element && !("toJson" in element) && isOutput) {
      // 如果元素是流体且还不是JSON对象，将其转换为JSON流体堆栈
      element = Fluid.of(element).toJson();
      element = {
        id: element.fluid,
        amount: element.amount,
        type: "fluid_stack", // 流体堆栈类型
      }
    }
    if (typeof element == "object" && "id" in element && !isOutput) {
      // 如果存在"id"键，将其重命名为"item"
      element.item = element.id;
      delete element.id;
    }
    if (typeof element == "object" && "item" in element && isOutput) {
      // 如果存在"item"键，将其重命名为"id"
      element.id = element.item;
      delete element.item;
    }
    if (!isOutput && typeof element == "object" && "count" in element) {
      // 如果存在"count"键，则删除它（输入材料不应有数量）
      delete element.count;
    }
    if (typeof element == "object" && "chance" in element) {
      // 确保保留"chance"（几率）属性
      element.chance = element.chance;
    }
    result.push(element);
  });
  return result;
};

const create = {
  compacting: basicRecipe("compacting"), // 压实
  crushing: basicRecipe("crushing"), // 破碎
  cutting: basicRecipe("cutting"), // 切割
  deploying: basicRecipe("deploying"), // 部署
  emptying: basicRecipe("emptying"), // 清空
  filling: basicRecipe("filling"), // 填充
  haunting: basicRecipe("haunting"), // 缠魂
  item_application: basicRecipe("item_application"), // 物品应用
  mechanical_crafting: (output, pattern, key) => ({
    accept_mirrored: true, // 接受镜像
    type: "create:mechanical_crafting", // 机械合成类型
    result: jsonArray(output, true)[0], // 输出结果
    pattern: pattern, // 合成图案
    key: /*Object.*/ fromEntries( // 合成键映射
      Object.entries(key).map(([k, v]) => [k, Ingredient.of(v).toJson()])
    ),
  }),
  milling: basicRecipe("milling"), // 碾磨
  mixing: basicRecipe("mixing"), // 混合
  pressing: basicRecipe("pressing"), // 压印
  sandpaper_polishing: basicRecipe("sandpaper_polishing"), // 砂纸打磨
  sequenced_assembly: (output, input, recipes) => {
    let sequence = recipes.map((recipe) => {
      // 将每个组件配方标记为中间配方，使其不会被注册
      return recipe.markAsIntermediate();
    });
    // 然后创建顺序组装配方
    return {
      type: "create:sequenced_assembly", // 顺序组装类型
      ingredient: Ingredient.of(input).toJson(), // 输入材料
      results: jsonArray(output, true), // 输出结果
      sequence: sequence.map((r) => r.markAsIntermediate().getRecipe()), // 组装序列
      loops: 1, // 循环次数
      transitional_item: Ingredient.of(input).toJson(), // 过渡物品
    };
  },
  splashing: basicRecipe("splashing"), // 飞溅
};

let pendingRecipes = []; // 待处理配方列表

function createRecipeWrapper(recipeJson) {
  // let recipe = Utils.copy(recipeJson);
  let recipe = Object.assign({}, recipeJson); // 使用 Object.assign 复制对象
  let customId = null; // 生成的ID占位符
  let shouldBeRegistered = true; // 仅当未标记为中间配方时才注册

  // 方法修改，保持链式调用但不立即完成
  const methods = {
    acceptMirrored: function (value) {
      recipe.accept_mirrored = value ?? true; // 设置是否接受镜像，默认为true
      return this;
    },
    category: function (category) {
      recipe.category = category; // 设置配方类别
      return this;
    },
    getRecipe() {
      return recipe; // 获取配方对象
    },
    heated: function () {
      recipe.heat_requirement = "heated"; // 设置为需要加热
      return this;
    },
    id: function (id) {
      customId = id; // 设置自定义ID
      return this;
    },
    keepHeldItem: function (value) {
      recipe.keep_held_item = value ?? true; // 设置是否保留手持物品，默认为true
      return this;
    },
    loops: function (value) {
      recipe.loops = value; // 设置循环次数
      return this;
    },
    markAsIntermediate: function () {
      shouldBeRegistered = false; // 标记为中间配方，不注册
      return this;
    },
    processingTime: function (processingTime) {
      recipe.processing_time = processingTime; // 设置处理时间
      return this;
    },
    superheated: function () {
      recipe.heat_requirement = "superheated"; // 设置为需要过热
      return this;
    },
    transitionalItem: function (item) {
      recipe.transitional_item = Item.of(item).toJson(); // 设置过渡物品
      return this;
    },
    register: function () {
      pendingRecipes.push({ // 将配方添加到待处理列表
        recipe: recipe,
        finalize: (event) => {
          if (shouldBeRegistered) {
            let registeredRecipe = event.custom(recipe); // 注册配方
            if (customId != null) {
              registeredRecipe.id(customId); // 设置自定义ID
            }
            return registeredRecipe;
          }
        },
      });
    },
  };

  // 立即注册配方以备最终处理
  methods.register();

  return methods;
}

function addCreateRecipeHandler(event) {
  event.recipes.create = {};
  Object.keys(create).forEach((type) => {
    event.recipes.create[type] = function () {
      let args = Array.prototype.slice.call(arguments);
      let recipeJson = create[type].apply(null, args); // 应用对应类型的配方创建函数
      return createRecipeWrapper(recipeJson, event); // 返回包装后的配方
    };
    if (Utils.snakeCaseToCamelCase(type) != type)
      event.recipes.create[Utils.snakeCaseToCamelCase(type)] =
        event.recipes.create[type]; // 添加驼峰命名别名
    event.recipes[
      `create${Utils.snakeCaseToTitleCase(type)}`.replace(" ", "")
    ] = event.recipes.create[type]; // 添加标题命名别名
  });

  // 引入一个方法来最终处理所有待处理的配方
  event.recipes.create.finalize = function () {
    pendingRecipes.forEach((pending) => pending.finalize(event)); // 处理所有待处理配方
    pendingRecipes = []; // 处理完成后清空待处理列表
  };
}
