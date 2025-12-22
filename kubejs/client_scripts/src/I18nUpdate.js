//自动汉化
let $I18n = Java.loadClass("net.minecraft.client.resources.language.I18n")

let kubejs_material = JsonIO.read('kubejs/assets/kubejs_material/lang/zh_cn.json') || {}
let mainLang = JsonIO.read('kubejs/assets/kubejs/lang/zh_cn.json') || {}

// 遍历材料并生成翻译
global.materials.forEach(item => {
    let materialKey = item.material
    let namespace = materialKey.split(':')[0]  // 'kubejs'
    let path = materialKey.split(':')[1]
    let itemTranslationKey = `item.${namespace}.${path}`

    let chineseName = mainLang[itemTranslationKey]

    if (chineseName && /[\u4e00-\u9fa5]/.test(chineseName)) {
        let sgKey = `material.silentgear.${materialKey}`
        kubejs_material[sgKey] = chineseName
    }
})

JsonIO.write('kubejs/assets/kubejs_material/lang/zh_cn.json', kubejs_material)
