/**
 * 伤害修改模式选择
 * @namespace
 */
const STAGE = {
    /** 百分比增减（影响基础伤害）*/
    ADDITIVE: 1,
    /** 固定值加成（不受任何乘区影响） */
    FLAT: 2,
    /** 独立乘区（仅影响基础伤害部分） */
    MULTIPLY: 3
};
/** 
 * @type {Map<Object, number[]>} 伤害数据映射表，存储每个伤害事件的修改数据
 */
const damageDataMap = new WeakMap();

/**
 * 获取伤害事件的伤害数据
 * @param {Object} event - 伤害事件对象
 * @returns {number[]} 伤害数据数组 [基础伤害, 固定加成, 加算倍率, 独立乘区]
 */
function getDamageData(event) {
    let data = damageDataMap.get(event);
    if (!data) {
        /**  [基础伤害, 固定加成, 加算倍率, 独立乘区] */
        data = [event.getDamage(), 0, 0, 1];
        damageDataMap.set(event, data);
    }
    return data;
}

/**
 * 伤害修改总逻辑
 * @param {Object} event - 伤害事件对象
 * @param {STAGE} stage - 伤害修改阶段/模式
 * @param {number} value - 修改值
 * @example
 * // 增加50%基础伤害
 * new_damage(event, STAGE.ADDITIVE, 1.5);
 * 
 * // 增加10点固定伤害
 * new_damage(event, STAGE.FLAT, 10);
 * 
 * // 增加20%独立乘区
 * new_damage(event, STAGE.MULTIPLY, 1.2);
 */
function new_damage(event, stage, value) {
    const data = getDamageData(event);

    switch (stage) {
        case STAGE.FLAT:
            data[1] += value;      // 伤害加成
            break;

        case STAGE.ADDITIVE:
            data[2] += value - 1;  // 百分比加成
            break;

        case STAGE.MULTIPLY:
            data[3] *= value;     // 独立乘区
            break;
    }
    /** (基础伤害 × (1 + 基础乘区) × 独立乘区) + 固定加成 */
    event.setDamage((data[0] * (1 + data[2]) * data[3]) + data[1])
}
