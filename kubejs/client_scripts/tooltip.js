// 定义工具函数
const TooltipUtils = {
    // 颜色常量
    colors: {
        gray: "gray",
        blue: "blue",
        red: "red",
        yellow: "yellow",
        green: "green",
        darkRed: "dark_red",
        darkPurple: "dark_purple",
        gold: "gold",
        aqua: "aqua",
        pink: "pink_dye"
    },

    // 装备效果提示
    generateEquipmentEffects: function (slotName, effects) {
        const lines = [Text.of('')];
        lines.push(Text.of(`穿在${slotName}时：`).color(TooltipUtils.colors.gray));

        effects.forEach(function (effect) {
            const color = effect.type === 'buff' ? TooltipUtils.colors.blue : TooltipUtils.colors.red;
            lines.push(Text.of(effect.text).color(color));
        });

        return lines;
    },

    // 生成简单提示
    simpleText: function (text, color) {
        if (typeof color === 'undefined') color = "white";
        return Text.of(text).color(color);
    }
};

// 定义物品tooltip配置
const itemTooltips = {
    // 法术抗性套装
    'kubejs:spell_resistance_helmet': {
        effects: TooltipUtils.generateEquipmentEffects('头上', [
            { type: 'buff', text: '+6 护甲值' },
            { type: 'buff', text: '+10% 攻击伤害' },
            { type: 'buff', text: '+20% 法术抗性' },
            { type: 'debuff', text: '-25% 法力恢复' },
            { type: 'debuff', text: '-25% 最大法力值' },
            { type: 'debuff', text: '-25% 法术强度' }
        ])
    },
    'kubejs:spell_resistance_chestplate': {
        effects: TooltipUtils.generateEquipmentEffects('身上', [
            { type: 'buff', text: '+10 护甲值' },
            { type: 'buff', text: '+10% 攻击伤害' },
            { type: 'buff', text: '+20% 法术抗性' },
            { type: 'debuff', text: '-25% 法力恢复' },
            { type: 'debuff', text: '-25% 最大法力值' },
            { type: 'debuff', text: '-25% 法术强度' }
        ])
    },
    'kubejs:spell_resistance_leggings': {
        effects: TooltipUtils.generateEquipmentEffects('腿上', [
            { type: 'buff', text: '+8 护甲值' },
            { type: 'buff', text: '+10% 攻击伤害' },
            { type: 'buff', text: '+20% 法术抗性' },
            { type: 'debuff', text: '-25% 法力恢复' },
            { type: 'debuff', text: '-25% 最大法力值' },
            { type: 'debuff', text: '-25% 法术强度' }
        ])
    },
    'kubejs:spell_resistance_boots': {
        effects: TooltipUtils.generateEquipmentEffects('脚上', [
            { type: 'buff', text: '+5 护甲值' },
            { type: 'buff', text: '+10% 攻击伤害' },
            { type: 'buff', text: '+20% 法术抗性' },
            { type: 'debuff', text: '-25% 法力恢复' },
            { type: 'debuff', text: '-25% 最大法力值' },
            { type: 'debuff', text: '-25% 法术强度' }
        ])
    },

    // 蔚蓝破晓套装
    'kubejs:azure_dawnbreaker_helmet': {
        effects: TooltipUtils.generateEquipmentEffects('头上', [
            { type: 'buff', text: '+5 护甲值' },
            { type: 'buff', text: '+25% 弹射物速度' },
            { type: 'buff', text: '+25% 弹射物伤害' },
            { type: 'buff', text: '+10% 拉弓速度' }
        ])
    },
    'kubejs:azure_dawnbreaker_chestplate': {
        effects: TooltipUtils.generateEquipmentEffects('身上', [
            { type: 'buff', text: '+6 护甲值' },
            { type: 'buff', text: '+25% 弹射物速度' },
            { type: 'buff', text: '+25% 弹射物伤害' },
            { type: 'buff', text: '+10% 拉弓速度' }
        ])
    },
    'kubejs:azure_dawnbreaker_leggings': {
        effects: TooltipUtils.generateEquipmentEffects('腿上', [
            { type: 'buff', text: '+6 护甲值' },
            { type: 'buff', text: '+25% 弹射物速度' },
            { type: 'buff', text: '+25% 弹射物伤害' },
            { type: 'buff', text: '+10% 拉弓速度' }
        ])
    },
    'kubejs:azure_dawnbreaker_boots': {
        effects: TooltipUtils.generateEquipmentEffects('脚上', [
            { type: 'buff', text: '+4 护甲值' },
            { type: 'buff', text: '+25% 弹射物速度' },
            { type: 'buff', text: '+25% 弹射物伤害' },
            { type: 'buff', text: '+10% 拉弓速度' }
        ])
    },

    // 其他物品
    'kubejs:sin': {
        lines: [
            TooltipUtils.simpleText('右键切换当前侵蚀罪孽', 'pink_dye'),
            TooltipUtils.simpleText('右键时会立刻将理智值降低至可侵蚀标准', 'pink_dye')
        ]
    },
    'kubejs:totem_of_undying': {
        lines: [
            TooltipUtils.simpleText('佩戴时,获得生命提升与生命恢复效果,受到攻击会恢复最大生命值的2%血量', 'pink_dye'),
            TooltipUtils.simpleText('但是每次受到攻击将有1%的概率直接死亡', 'red'),
        ]
    },
    'kubejs:sanity_curios': {
        lines: [
            TooltipUtils.simpleText('装备时，按下<使用饰品能力>即可查看玩家当前理智值', 'green'),
            TooltipUtils.simpleText('你似乎从未保持清醒...', 'dark_red')
        ]
    },
    'kubejs:bluestar': {
        lines: [
            TooltipUtils.simpleText('"你听到了吗？你感受到我苦苦寻觅的思念之声了吗？"', 'blue')
        ]
    },
    'kubejs:blue_star': {
        lines: [
            TooltipUtils.simpleText('只有那声呼唤，才能将我们引向接纳罪人的唯一之地……！', 'blue')
        ]
    },
    'kubejs:heart_of_darkness': {
        lines: [
            TooltipUtils.simpleText('装备时，将启用「肾上腺素」机制', 'dark_red'),
            TooltipUtils.simpleText('"在这炽热而激烈的脉动中，与我融为一体"', 'dark_red')
        ]
    },
    'kubejs:low_heart_of_darkness': {
        lines: [
            TooltipUtils.simpleText('正在缓慢跳动的心脏，似乎需要注入某种力量来恢复活力...', 'dark_red'),
        ]
    },
    'kubejs:crowbar': {
        lines: [
            TooltipUtils.simpleText('在主手时:', 'gray'),
            TooltipUtils.simpleText('   +18攻击伤害', 'dark_green'),
            TooltipUtils.simpleText('   很快 挖掘速度', 'dark_green'),
            TooltipUtils.simpleText('无法破坏', 'blue'),
        ]
    },
    'kubejs:starfury': {
        shiftInfo: {
            default: [
                Text.gold('按住 ').append(
                    Text.aqua('[Shift] ').append(
                        Text.gold('以查看更多信息')
                    ))
            ],
            shifted: [
                TooltipUtils.simpleText('按右键可发射从天而降的曳光弹', 'yellow')
            ]
        }
    },
    'enderscape:mirror': {
        shiftInfo: {
            default: [
                Text.of("基础传送距离: 500 格").color(TooltipUtils.colors.gray),
                Text.gold("按住 ").append(
                    Text.aqua("[Shift] ").append(
                        Text.gold("查看传送规则")
                    )
                )
            ],
            shifted: [
                Text.of("┌── 燃料系统 ──┐").color(TooltipUtils.colors.blue),
                Text.of("星云矿放至镜子左键,消耗矿石进行充能").color(TooltipUtils.colors.gray),

                Text.of("┌── 距离计算 ──┐").color(TooltipUtils.colors.blue),
                Text.of("基础消耗: 1燃料").color(TooltipUtils.colors.gray),
                Text.of("+ 每500格追加1燃料").color(TooltipUtils.colors.gray),
                Text.of("光速附魔提升单位距离:").color(TooltipUtils.colors.gray),
                Text.of("  I级: +250格/单位").color(TooltipUtils.colors.green),
                Text.of("  III级: 最大1250格/单位").color(TooltipUtils.colors.green),

                Text.of("┌── 跨维度传送 ──┐").color(TooltipUtils.colors.darkPurple),
                Text.of("需「跨维度」附魔").color(TooltipUtils.colors.pink),
                Text.of("强制消耗全部燃料").color(TooltipUtils.colors.red),

                Text.of("┌── 限制条件 ──┐").color(TooltipUtils.colors.red),
                Text.of("• 必须绑定磁石").color(TooltipUtils.colors.gray),
                Text.of("• 主世界-下界互传需坐标对齐").color(TooltipUtils.colors.gray),
                Text.of("• 目标需有安全着陆点").color(TooltipUtils.colors.gray)
            ]
        }
    }
};

// 通用提示
const commonTooltips = {
    'create:wrench': TooltipUtils.simpleText('精致存储mod的扳手与机械动力扳手可以互相通用！', 'blue'),
    'refinedstorage:wrench': TooltipUtils.simpleText('精致存储mod的扳手与机械动力扳手可以互相通用！', 'blue'),
    'irons_spellbooks:mithril_weave': TooltipUtils.simpleText('比奥术布匹更好！更强大！', 'yellow'),
    'eccentrictome:tome': TooltipUtils.simpleText('左键空气可取消选择当前书籍，右键选择你想看的书', 'yellow'),
    'irons_spellbooks:misery': TooltipUtils.simpleText('苦痛啊...你是我的唯一！', 'dark_purple'),
    'kubejs:meat': TooltipUtils.simpleText('由贪婪附魔击杀部分生物获得，或合成获得', 'green'),
    'kubejs:corruption': TooltipUtils.simpleText('由贪婪附魔击杀部分敌对生物获得', 'green'),
    'kubejs:draedon_heart': TooltipUtils.simpleText('未完成物品', 'green'),
    'kubejs:naga_soul_scale': TooltipUtils.simpleText('这块鳞片上似乎附着着一丝娜迦的残魂', 'yellow')
};

// 应用tooltip修改
ItemEvents.modifyTooltips(function (event) {
    // 处理配置列表中的物品
    Object.keys(itemTooltips).forEach(function (itemId) {
        const config = itemTooltips[itemId];

        if (config.effects) {
            event.modify(itemId, function (tooltip) {
                config.effects.forEach(function (line, index) {
                    tooltip.insert(index + 1, line);
                });
            });
        }
        else if (config.lines) {
            event.modify(itemId, function (tooltip) {
                config.lines.forEach(function (line, index) {
                    tooltip.insert(index + 1, line);
                });
            });
        }
        else if (config.shiftInfo) {
            event.modify(itemId, { shift: false }, function (tooltip) {
                config.shiftInfo.default.forEach(function (line, index) {
                    tooltip.insert(index + 1, line);
                });
            });

            event.modify(itemId, { shift: true }, function (tooltip) {
                config.shiftInfo.shifted.forEach(function (line, index) {
                    tooltip.insert(index + 1, line);
                });
            });
        }
    });

    // 处理通用提示
    Object.keys(commonTooltips).forEach(function (itemId) {
        event.add(itemId, commonTooltips[itemId]);
    });
});


