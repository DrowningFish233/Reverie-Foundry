/**
 * 从完整路径中提取文件名
 */
function getFileNameFromPath(filePath) {
    let parts = filePath.split(/[\\\/]/);
    return parts[parts.length - 1];
}

/**
 * 确保文件夹存在
 */
function ensureDirectory(path) {
    if (!FilesJS.exists(path)) {
        try {
            FilesJS.createDirectory(path);
            return true;
        } catch (error) {
            return false;
        }
    }
    return true;
}

/**
 * 从材料数据中获取图标ID
 */
function getIconFromMaterialData(materialData) {
    let defaultIcon = 'minecraft:iron_ingot';

    if (!materialData.crafting || !materialData.crafting.ingredient) {
        return defaultIcon;
    }

    let ingredient = materialData.crafting.ingredient;

    // 如果是item类型，直接使用item ID
    if (ingredient.item) {
        return ingredient.item;
    }
    // 如果是tag类型，使用默认图标
    else if (ingredient.tag) {
        return defaultIcon;
    }
    // 其他情况也使用默认图标
    return defaultIcon;
}

/**
 * 从kubejs本地化文件中获取显示名称
 */
function getDisplayNameFromKubejsLang(materialId) {
    let langFilePath = 'kubejs/assets/kubejs/lang/zh_cn.json';

    try {
        if (FilesJS.exists(langFilePath)) {
            let langContent = FilesJS.readFile(langFilePath);
            let langData = JSON.parse(langContent);

            // 首先尝试读取 item.kubejs.{materialId}
            let itemKey = `item.kubejs.${materialId}`;
            if (langData[itemKey]) {
                return langData[itemKey];
            }

            // 然后尝试读取 material.silentgear.kubejs:{materialId} (带modid的格式)
            let silentgearKeyWithModId = `material.silentgear.kubejs:${materialId}`;
            if (langData[silentgearKeyWithModId]) {
                return langData[silentgearKeyWithModId];
            }

            // 最后尝试读取 material.silentgear.{materialId} (不带modid的格式)
            let silentgearKey = `material.silentgear.${materialId}`;
            if (langData[silentgearKey]) {
                return langData[silentgearKey];
            }
        }
    } catch (e) {
        console.log(`[Reverie Foundry]读取本地化文件失败: ${e.message}`);
    }

    return null;
}

/**
 * 从翻译键中提取显示名称（在读取本地化失败时启用）
 */
function getDisplayNameFromTranslateKey(materialId, materialData) {
    let displayName = materialId.charAt(0).toUpperCase() + materialId.slice(1);

    if (materialData.display && materialData.display.name) {
        if (materialData.display.name.translate) {
            // 从翻译键中提取显示名称
            let translateKey = materialData.display.name.translate;
            if (translateKey.startsWith('material.')) {
                let parts = translateKey.split('.');
                let namePart = parts[parts.length - 1];

                // 处理带冒号的ID
                if (namePart.includes(':')) {
                    namePart = namePart.split(':')[1];
                }

                // 将下划线替换为空格并大写每个单词
                displayName = namePart.split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            } else {
                displayName = translateKey;
            }
        } else if (materialData.display.name.text) {
            displayName = materialData.display.name.text;
        }
    }

    return displayName;
}

/**
 * 获取材料的显示名称（优先使用本地化文件）
 */
function getDisplayName(materialId, materialData) {
    // 优先从kubejs本地化文件中获取
    let nameFromLang = getDisplayNameFromKubejsLang(materialId);
    if (nameFromLang) {
        return nameFromLang;
    }

    // 如果本地化文件中没有，则从翻译键中提取
    return getDisplayNameFromTranslateKey(materialId, materialData);
}

/**
 * 生成帕秋莉条目数据
 */
function createPatchouliEntry(materialId, icon, category) {
    return {
        "name": `patchouli.gui.kubejs.${materialId}.name`,
        "icon": icon,
        "category": `patchouli:${category}`,
        "pages": [
            {
                "type": "patchouli:spotlight",
                "item": {
                    "item": icon
                },
                "text": `patchouli.gui.kubejs.${materialId}.text`
            },
            {
                "type": "patchouli:text",
                "text": `patchouli.gui.kubejs.${materialId}`
            }
        ]
    };
}

/**
 * 检查翻译键是否已存在
 */
function isTranslationKeyExists(translations, materialId) {
    const nameKey = `patchouli.gui.kubejs.${materialId}.name`;
    const textKey = `patchouli.gui.kubejs.${materialId}.text`;
    const contentKey = `patchouli.gui.kubejs.${materialId}`;

    return translations[nameKey] !== undefined &&
        translations[textKey] !== undefined &&
        translations[contentKey] !== undefined;
}

/**
 * 检查条目文件是否已存在
 */
function isEntryFileExists(patchouliCategory, materialId) {
    let entryPath = `patchouli_books/rf_book/en_us/entries/${patchouliCategory}/${materialId}.json`;
    return FilesJS.exists(entryPath);
}

/**
 * 自动把材料内容转换为帕秋莉手册待翻译内容
 */
function generatePatchouliEntries() {
    console.log('[Reverie Foundry]开始扫描并生成帕秋莉手册条目');

    let materialsBasePath = 'kubejs/data/kubejs/silentgear_materials';
    let patchouliEnPath = 'patchouli_books/rf_book/en_us/entries';
    let langPath = 'kubejs/assets/kubejs_patchouli_books/lang/zh_cn.json';

    // 分类映射
    let categoryMap = {
        'wire': 'kubejs_wire',
        'rod': 'kubejs_rod',
        'plate': 'kubejs_plate',
        'metal': 'kubejs_ingot',
        'gem': 'kubejs_gems',
        'cells': 'kubejs_cells',
        'arrow_feather': 'kubejs_arrow_feather',
        'organic': 'kubejs_other',
        'other': 'kubejs_other',
        'auto': 'kubejs_other',
        'wool': 'kubejs_lining'
    };

    // 读取现有翻译
    let translations = {};
    try {
        translations = JsonIO.read(langPath) || {};
        console.log('[Reverie Foundry]正在读取帕秋莉翻译文件');
    } catch (e) {
        console.log('[Reverie Foundry]帕秋莉翻译文件不存在，将创建新文件');
    }

    let generatedCount = 0;
    let skippedCount = 0;
    let langUsedCount = 0;
    let existingCount = 0; // 新增：统计已存在的条目数量

    // 遍历每个分类文件夹
    for (let [materialCategory, patchouliCategory] of Object.entries(categoryMap)) {
        let categoryPath = `${materialsBasePath}/${materialCategory}`;

        //console.log(`处理分类: ${materialCategory} -> ${patchouliCategory}`);

        // 检查分类文件夹是否存在
        if (!FilesJS.exists(categoryPath)) {
            //console.log(`  跳过不存在的文件夹: ${categoryPath}`);
            continue;
        }

        // 获取该文件夹中的所有文件
        let allFiles = [];
        try {
            allFiles = FilesJS.listFiles(categoryPath);
        } catch (e) {
            //console.log(`  读取文件夹失败: ${categoryPath}`);
            continue;
        }

        if (allFiles.length === 0) {
            //console.log(`  文件夹为空: ${categoryPath}`);
            continue;
        }

        // 筛选出JSON文件
        let jsonFiles = allFiles.filter(file => {
            let fileName = getFileNameFromPath(file);
            return fileName.endsWith('.json');
        });

        //console.log(`  找到 ${jsonFiles.length} 个材料文件`);

        // 确保英文目标文件夹存在
        let enTargetFolder = `${patchouliEnPath}/${patchouliCategory}`;
        ensureDirectory(enTargetFolder);

        // 处理每个材料文件
        for (let filePath of jsonFiles) {
            try {
                // 从文件路径中提取材料ID
                let fileName = getFileNameFromPath(filePath);
                let materialId = fileName.replace('.json', '');

                //console.log(`  处理材料: ${materialId}`);

                // 检查翻译键是否已存在
                if (isTranslationKeyExists(translations, materialId)) {
                    //console.log(`    翻译键已存在，跳过: ${materialId}`);
                    existingCount++;
                    continue;
                }

                // 检查条目文件是否已存在
                if (isEntryFileExists(patchouliCategory, materialId)) {
                    //console.log(`    条目文件已存在，跳过: ${materialId}`);
                    existingCount++;
                    continue;
                }

                // 读取材料文件内容
                let fileContent = FilesJS.readFile(filePath);
                let materialData = JSON.parse(fileContent);

                if (!materialData || !materialData.display || !materialData.crafting) {
                    //console.log(`  跳过无效文件: ${fileName}`);
                    skippedCount++;
                    continue;
                }

                // 获取显示名称（优先使用本地化文件）
                let displayName = getDisplayName(materialId, materialData);

                // 检查是否使用了本地化文件中的名称
                let nameFromLang = getDisplayNameFromKubejsLang(materialId);
                if (nameFromLang) {
                    //console.log(`    使用本地化名称: ${nameFromLang}`);
                    langUsedCount++;
                } else {
                    //console.log(`    使用翻译键提取名称: ${displayName}`);
                }

                // 获取图标ID
                let icon = getIconFromMaterialData(materialData);
                //console.log(`    图标: ${icon}`);

                // 生成帕秋莉条目
                let entryData = createPatchouliEntry(materialId, icon, patchouliCategory);

                // 写入文件
                let entryPath = `${enTargetFolder}/${materialId}.json`;
                JsonIO.write(entryPath, entryData);

                // 添加翻译到中文文件
                translations[`patchouli.gui.kubejs.${materialId}.name`] = displayName;
                translations[`patchouli.gui.kubejs.${materialId}.text`] = "鼠标移至上方材料$(br)按$(#A020F0)Ctrl$(#000000)可查看详细属性";
                translations[`patchouli.gui.kubejs.${materialId}`] = "";

                generatedCount++;
                //console.log(`已生成条目: ${materialId}`);

            } catch (e) {
                console.log(`[Reverie Foundry]处理文件失败: ${filePath}`, e);
                skippedCount++;
            }
        }
    }

    // 写入翻译文件（只有有新内容时才写入）
    if (generatedCount > 0) {
        try {
            JsonIO.write(langPath, translations);
            console.log(`[Reverie Foundry]帕秋莉翻译文件已更新: ${langPath}`);
        } catch (error) {
            console.log(`[Reverie Foundry]写入帕秋莉翻译文件失败: ${error}`);
        }
    } else if (existingCount > 0) {
        console.log(`[Reverie Foundry]所有翻译键已存在，无需更新翻译文件`);
    }

    // 统计信息
    console.log('[Reverie Foundry] 生成完成');
    console.log(`[Reverie Foundry] 已生成条目: ${generatedCount} 个`);
    console.log(`[Reverie Foundry] 从本地化文件获取名称: ${langUsedCount} 个`);
    console.log(`[Reverie Foundry] 已存在条目: ${existingCount} 个`);
    console.log(`[Reverie Foundry] 已跳过文件: ${skippedCount} 个`);

    return {
        generated: generatedCount,
        langUsed: langUsedCount,
        existing: existingCount,
        skipped: skippedCount
    };
}


ItemEvents.firstRightClicked('kubejs:material_patchouli_generator', event => {
    // 权限检查
    if (!event.player.creative && !event.player.op) {
        event.player.tell('§c你需要创造模式或OP权限才能使用此功能');
        return;
    }
    event.player.swing()
    event.player.tell('§a正在扫描材料并生成帕秋莉手册条目...');

    let result = generatePatchouliEntries();

    let message = Text.of('§a帕秋莉手册条目生成完成！\n\n')
        .append(Text.of(`§7已生成: §e${result.generated} §7个条目\n`))
        .append(Text.of(`§7从本地化文件获取名称: §e${result.langUsed} §7个\n`))
        .append(Text.of(`§7已存在: §e${result.existing} §7个条目\n`))
        .append(Text.of(`§7已跳过: §e${result.skipped} §7个文件\n\n`))
        .append(Text.of('§7点击打开材料文件夹: '))
        .append(Text.of('§n§b[打开材料文件夹]§r\n')
            .clickOpenFile('kubejs/data/kubejs/silentgear_materials/'))
        .append(Text.of('§7点击打开手册条目: '))
        .append(Text.of('§n§b[打开手册文件夹]§r')
            .clickOpenFile('patchouli_books/rf_book/en_us/entries/'));

    event.player.tell(message);
});