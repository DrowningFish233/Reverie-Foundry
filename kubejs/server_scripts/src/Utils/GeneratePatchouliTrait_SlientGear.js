/**
 * 扫描 SilentGear 和 SilentGems 的原版词缀并生成帕秋莉手册条目
 */
function generateSilentGearGemsTraitEntries() {
    console.log('开始扫描 SilentGear/SilentGems 原版词缀');

    // 原版模组数据路径
    let modTraitsPaths = [
        {
            mod: 'silentgear',
            path: 'kubejs/data/silentgear/silentgear_traits',
            langKeyPrefix: 'trait.silentgear.'
        },
        {
            mod: 'silentgems',
            path: 'kubejs/data/silentgems/silentgear_traits',
            langKeyPrefix: 'trait.silentgems.'
        }
    ];

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

    // 确保英文目标文件夹存在
    let enTargetFolder = `${patchouliEnPath}/kubejs_affix_other`;
    ensureDirectory(enTargetFolder);

    // 扫描每个模组的词缀
    for (let mod of modTraitsPaths) {
        console.log(`扫描模组: ${mod.mod} 路径: ${mod.path}`);

        if (!FilesJS.exists(mod.path)) {
            console.log(`  词缀文件夹不存在: ${mod.path}`);
            continue;
        }

        // 获取文件夹中的所有文件
        let allFiles = [];
        try {
            allFiles = FilesJS.listFiles(mod.path);
        } catch (e) {
            console.log(`  读取词缀文件夹失败: ${mod.path}`);
            continue;
        }

        if (allFiles.length === 0) {
            console.log(`  文件夹为空: ${mod.path}`);
            continue;
        }

        // 筛选出JSON文件
        let jsonFiles = allFiles.filter(file => {
            let fileName = getFileNameFromPath(file);
            return fileName.endsWith('.json');
        });

        console.log(`  找到 ${jsonFiles.length} 个词缀文件`);

        // 处理每个词缀文件
        for (let filePath of jsonFiles) {
            try {
                // 从文件路径中提取词缀ID
                let fileName = getFileNameFromPath(filePath);
                let traitId = fileName.replace('.json', '');

                console.log(`  处理词缀: ${traitId}`);

                // 读取词缀文件内容
                let fileContent = FilesJS.readFile(filePath);
                let traitData = JSON.parse(fileContent);

                if (!traitData || !traitData.name) {
                    console.log(`  跳过无效文件: ${fileName}`);
                    skippedCount++;
                    continue;
                }

                // 使用原版翻译键
                let nameKey = traitData.name.translate || `${mod.langKeyPrefix}${traitId}`;
                let descKey = traitData.description ? (traitData.description.translate || `${nameKey}.desc`) : `${nameKey}.desc`;

                console.log(`    名称键: ${nameKey}`);
                console.log(`    描述键: ${descKey}`);

                // 获取显示名称
                let displayName = traitId.charAt(0).toUpperCase() + traitId.slice(1);
                let description = "";
                let applicableTypes = "适用于所有装备类型";

                // 获取适用装备类型
                if (traitData.conditions && Array.isArray(traitData.conditions) && traitData.conditions.length > 0) {
                    applicableTypes = getTraitApplicableGearTypes(traitData);
                }

                // 使用附魔书作为图标
                let icon = 'minecraft:enchanted_book';

                // 创建帕秋莉条目数据（直接使用原版翻译键）
                let entryData = {
                    "name": nameKey,
                    "icon": icon,
                    "category": `patchouli:kubejs_affix_other`,
                    "pages": [
                        {
                            "type": "patchouli:spotlight",
                            "item": {
                                "item": icon
                            },
                            "title": nameKey,
                            "text": descKey
                        },
                        {
                            "type": "patchouli:text",
                            "title": `${nameKey}.applicable`,
                            "text": `${nameKey}.applicable_text`
                        }
                    ]
                };

                // 写入文件
                let entryPath = `${enTargetFolder}/${mod.mod}_${traitId}.json`;
                JsonIO.write(entryPath, entryData);

                // 添加翻译键
                // 这里只添加手册特有的键
                translations[`${nameKey}.applicable`] = "适用装备类型";
                translations[`${nameKey}.applicable_text`] = applicableTypes;

                generatedCount++;
                console.log(`  已生成条目: ${mod.mod}_${traitId}`);

            } catch (e) {
                console.log(`处理词缀文件失败: ${filePath}`, e);
                skippedCount++;
            }
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
    console.log('原版模组词缀生成完成');
    console.log(`已生成条目: ${generatedCount} 个`);
    console.log(`已跳过文件: ${skippedCount} 个`);

    return {
        generated: generatedCount,
        skipped: skippedCount
    };
}

/**
 * 用于生成原版模组词缀手册条目
 */
ItemEvents.firstRightClicked('kubejs:trait_fish', event => {
    // 权限检查
    if (!event.player.creative && !event.player.op) {
        event.player.tell('§c你需要创造模式或OP权限才能使用此功能');
        return;
    }

    event.player.swing();
    event.player.tell('§a正在扫描 SilentGear/SilentGems 原版词缀并生成帕秋莉手册条目...');

    let result = generateSilentGearGemsTraitEntries();

    let message = Text.of('§aSilentGear/SilentGems 原版词缀帕秋莉手册条目生成完成！\n\n')
        .append(Text.of(`§7已生成: §e${result.generated} §7个词缀条目\n`))
        .append(Text.of(`§7已跳过: §e${result.skipped} §7个文件\n\n`))
        .append(Text.of('§7原版词缀位置: data/ 目录下的 silentgear 和 silentgems\n'))
        .append(Text.of('§7点击打开手册条目: '))
        .append(Text.of('§n§b[打开手册文件夹]§r')
            .clickOpenFile('patchouli_books/rf_book/en_us/entries/kubejs_affix_other/'));

    event.player.tell(message);
});