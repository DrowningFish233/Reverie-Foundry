/**
 * 从kubejs本地化文件中获取装备词缀的显示名称
 */
function getTraitDisplayNameFromKubejsLang(traitId) {
    let langFilePath = 'kubejs/assets/kubejs/lang/zh_cn.json';

    try {
        if (FilesJS.exists(langFilePath)) {
            let langContent = FilesJS.readFile(langFilePath);
            let langData = JSON.parse(langContent);

            // 尝试kubejs前缀
            let kubejsKey = `trait.kubejs.${traitId}`;
            if (langData[kubejsKey]) {
                return {
                    key: kubejsKey,
                    name: langData[kubejsKey]
                };
            }

            // 尝试silentgear前缀
            let silentgearKey = `trait.silentgear.${traitId}`;
            if (langData[silentgearKey]) {
                return {
                    key: silentgearKey,
                    name: langData[silentgearKey]
                };
            }
            //别tm在搞出别的前缀了
        }
    } catch (e) {
        console.log(`读取词缀本地化文件失败: ${e.message}`);
    }

    return null;
}

/**
 * 从词缀数据中提取原有的翻译键
 */
function getOriginalTraitKeys(traitId, traitData) {
    let nameKey = `trait.kubejs.${traitId}`;
    let descKey = `trait.kubejs.${traitId}.desc`;

    // 如果数据中有translate键，使用原有的
    if (traitData.name && traitData.name.translate) {
        nameKey = traitData.name.translate;

        // 根据名称键生成描述键
        descKey = `${nameKey}.desc`;
    }

    // 如果数据中有描述translate键，使用原有的
    if (traitData.description && traitData.description.translate) {
        descKey = traitData.description.translate;
    }

    return {
        nameKey: nameKey,
        descKey: descKey
    };
}

/**
 * 从翻译键中提取词缀显示名称
 */
function getTraitDisplayNameFromTranslateKey(traitId, traitData) {
    let displayName = traitId.charAt(0).toUpperCase() + traitId.slice(1);

    if (traitData.name && traitData.name.translate) {
        // 从翻译键中提取显示名称
        let translateKey = traitData.name.translate;
        let parts = translateKey.split('.');
        let namePart = parts[parts.length - 1];

        // 将下划线替换为空格并大写每个单词
        displayName = namePart.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    } else if (traitData.name && traitData.name.text) {
        displayName = traitData.name.text;
    }

    return displayName;
}

/**
 * 获取装备词缀的显示描述
 */
function getTraitDescription(traitId, traitData) {
    let description = "";

    if (traitData.description && traitData.description.translate) {
        // 尝试从本地化文件中获取描述
        let langFilePath = 'kubejs/assets/kubejs/lang/zh_cn.json';

        try {
            if (FilesJS.exists(langFilePath)) {
                let langContent = FilesJS.readFile(langFilePath);
                let langData = JSON.parse(langContent);

                let descKey = traitData.description.translate;
                if (langData[descKey]) {
                    description = langData[descKey];
                }
            }
        } catch (e) {
            console.log(`读取词缀描述本地化失败: ${e.message}`);
        }

        // 如果本地化中没有，从翻译键中提取
        if (!description && traitData.description.translate) {
            let translateKey = traitData.description.translate;
            let parts = translateKey.split('.');
            let descPart = parts[parts.length - 1];

            // 将下划线替换为空格并大写每个单词
            description = descPart.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
    } else if (traitData.description && traitData.description.text) {
        description = traitData.description.text;
    }

    return description;
}

/**
 * 获取装备词缀的图标（默认为书）
 */
function getTraitIcon(traitData) {
    // 默认使用书作为图标
    let defaultIcon = 'minecraft:enchanted_book';
    return defaultIcon;
}

/**
 * 生成装备词缀的适用装备类型描述
 */
function getTraitApplicableGearTypes(traitData) {
    if (!traitData.conditions || !Array.isArray(traitData.conditions) || traitData.conditions.length === 0) {
        return "适用于所有装备类型";
    }

    let gearTypes = [];

    try {
        let firstCondition = traitData.conditions[0];
        if (!firstCondition) {
            return "适用于所有装备类型";
        }

        if (firstCondition.type === "silentgear:or") {
            let conditions = firstCondition.values || [];
            for (let condition of conditions) {
                if (condition && condition.type === "silentgear:gear_type" && condition.gear_type) {
                    let gearType = condition.gear_type.split(':')[1];
                    gearTypes.push(gearType);
                }
            }
        }
        else if (firstCondition.type === "silentgear:gear_type" && firstCondition.gear_type) {
            let gearType = firstCondition.gear_type.split(':')[1];
            gearTypes.push(gearType);
        }
    } catch (e) {
        console.log(`解析适用装备类型失败: ${e.message}`);
        return "适用于所有装备类型";
    }

    if (gearTypes.length === 0) {
        return "适用于所有装备类型";
    }

    // 翻译装备类型
    let translatedTypes = gearTypes.map(type => {
        switch (type) {
            case "armor": return "盔甲";
            case "tool": return "工具";
            case "curio": return "饰品";
            default: return type;
        }
    });

    return `适用于: ${translatedTypes.join("、")}`;
}

/**
 * 生成装备词缀的帕秋莉条目数据
 */
function createPatchouliTraitEntry(traitId, icon, nameKey) {
    return {
        "name": nameKey,
        "icon": icon,
        "category": `patchouli:kubejs_affix`,
        "pages": [
            {
                "type": "patchouli:spotlight",
                "item": {
                    "item": icon
                },
                "title": nameKey,
                "text": `${nameKey}.desc`
            },
            {
                "type": "patchouli:text",
                "title": `${nameKey}.applicable`,
                "text": `${nameKey}.applicable_text`
            }
        ]
    };
}

/**
 * 自动把装备词缀内容转换为帕秋莉手册待翻译内容
 */
function generatePatchouliTraitEntries() {
    console.log('开始扫描并生成装备词缀帕秋莉手册条目');

    let traitsBasePath = 'kubejs/data/kubejs/silentgear_traits';
    let patchouliEnPath = 'patchouli_books/rf_book/en_us/entries';
    let langPath = 'kubejs/assets/kubejs_patchouli_books/lang/zh_cn.json';

    // 读取现有翻译
    let translations = {};
    try {
        translations = JsonIO.read(langPath) || {};
        console.log('正在读取帕秋莉翻译文件');
    } catch (e) {
        console.log('帕秋莉翻译文件不存在，将创建新文件');
    }

    let generatedCount = 0;
    let skippedCount = 0;
    let langUsedCount = 0;

    // 检查词缀文件夹是否存在
    if (!FilesJS.exists(traitsBasePath)) {
        console.log(`词缀文件夹不存在: ${traitsBasePath}`);
        return {
            generated: 0,
            langUsed: 0,
            skipped: 0,
            error: "词缀文件夹不存在"
        };
    }

    // 获取文件夹中的所有文件
    let allFiles = [];
    try {
        allFiles = FilesJS.listFiles(traitsBasePath);
    } catch (e) {
        console.log(`读取词缀文件夹失败: ${traitsBasePath}`);
        return {
            generated: 0,
            langUsed: 0,
            skipped: 0,
            error: "读取文件夹失败"
        };
    }

    if (allFiles.length === 0) {
        console.log(`词缀文件夹为空: ${traitsBasePath}`);
        return {
            generated: 0,
            langUsed: 0,
            skipped: 0,
            error: "文件夹为空"
        };
    }

    // 筛选出JSON文件
    let jsonFiles = allFiles.filter(file => {
        let fileName = getFileNameFromPath(file);
        return fileName.endsWith('.json');
    });

    console.log(`找到 ${jsonFiles.length} 个装备词缀文件`);

    // 确保英文目标文件夹存在
    let enTargetFolder = `${patchouliEnPath}/kubejs_affix`;
    ensureDirectory(enTargetFolder);

    // 处理每个词缀文件
    for (let filePath of jsonFiles) {
        try {
            // 从文件路径中提取词缀ID
            let fileName = getFileNameFromPath(filePath);
            let traitId = fileName.replace('.json', '');

            //console.log(`处理词缀: ${traitId}`);

            // 读取词缀文件内容
            let fileContent = FilesJS.readFile(filePath);
            let traitData = JSON.parse(fileContent);

            if (!traitData || !traitData.name) {
                //console.log(`跳过无效文件: ${fileName}`);
                skippedCount++;
                continue;
            }

            // 获取原有的翻译键
            let originalKeys = getOriginalTraitKeys(traitId, traitData);
            let nameKey = originalKeys.nameKey;
            let descKey = originalKeys.descKey;

            //console.log(`  名称键: ${nameKey}`);
            //console.log(`  描述键: ${descKey}`);

            // 获取显示名称（优先使用本地化文件）
            let langResult = getTraitDisplayNameFromKubejsLang(traitId);
            let displayName;

            if (langResult) {
                displayName = langResult.name;
                // 使用本地化文件中的键（如果是kubejs前缀但文件是silentgear前缀，优先使用silentgear）
                if (traitData.name && traitData.name.translate && traitData.name.translate.includes('silentgear')) {
                    nameKey = traitData.name.translate;
                }
                langUsedCount++;
            } else {
                // 从翻译键中提取
                displayName = getTraitDisplayNameFromTranslateKey(traitId, traitData);
            }

            let description = getTraitDescription(traitId, traitData);
            let applicableTypes = getTraitApplicableGearTypes(traitData);
            let icon = getTraitIcon(traitData);
            let entryData = createPatchouliTraitEntry(traitId, icon, nameKey);

            let entryPath = `${enTargetFolder}/${traitId}.json`;
            JsonIO.write(entryPath, entryData);

            translations[nameKey] = displayName;

            translations[descKey] = description;

            translations[`${nameKey}.applicable`] = "适用装备类型";
            translations[`${nameKey}.applicable_text`] = applicableTypes;

            generatedCount++;

        } catch (e) {
            console.log(`处理词缀文件失败: ${filePath}`, e);
            skippedCount++;
        }
    }

    // 写入翻译文件
    try {
        JsonIO.write(langPath, translations);
        console.log(`帕秋莉翻译文件已更新: ${langPath}`);
    } catch (error) {
        console.log(`写入帕秋莉翻译文件失败: ${error}`);
    }

    // 统计信息
    console.log('装备词缀生成完成');
    console.log(`已生成条目: ${generatedCount} 个`);
    console.log(`从本地化文件获取名称: ${langUsedCount} 个`);
    console.log(`已跳过文件: ${skippedCount} 个`);

    return {
        generated: generatedCount,
        langUsed: langUsedCount,
        skipped: skippedCount
    };
}

/**
 * 用于生成装备词缀手册条目
 */
ItemEvents.firstLeftClicked('kubejs:material_patchouli_generator', event => {
    // 权限检查
    if (!event.player.creative && !event.player.op) {
        event.player.tell('§c你需要创造模式或OP权限才能使用此功能');
        return;
    }

    event.player.swing();
    event.player.tell('§a正在扫描装备词缀并生成帕秋莉手册条目...');

    let result = generatePatchouliTraitEntries();

    let message = Text.of('§a装备词缀帕秋莉手册条目生成完成！\n\n')
        .append(Text.of(`§7已生成: §e${result.generated} §7个词缀条目\n`))
        .append(Text.of(`§7从本地化文件获取名称: §e${result.langUsed} §7个\n`))
        .append(Text.of(`§7已跳过: §e${result.skipped} §7个文件\n\n`))
        .append(Text.of('§7点击打开词缀文件夹: '))
        .append(Text.of('§n§b[打开词缀文件夹]§r\n')
            .clickOpenFile('kubejs/data/kubejs/silentgear_traits/'))
        .append(Text.of('§7点击打开手册条目: '))
        .append(Text.of('§n§b[打开手册文件夹]§r')
            .clickOpenFile('patchouli_books/rf_book/en_us/entries/kubejs_affix/'));

    event.player.tell(message);

    if (result.error) {
        event.player.tell(`§c错误: ${result.error}`);
    }
});
