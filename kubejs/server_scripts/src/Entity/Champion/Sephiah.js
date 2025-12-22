ChampionsJs.addSephiahName(event => {
  const entity = event.getEntity();
  if (!entity || !entity.isLiving()) return;

  const player = entity.getLevel().getNearestPlayer(entity, 128);
  if (!player) return;

  const pData = player.persistentData;
  const killCount = pData.getInt("kill") || 0;

  // 当BOSS击杀数大于0时:
  if (killCount > 0) {
    const sephirahName = getSephirahName(killCount);
    event.setName(sephirahName);
  }
});

// 根据击杀数返回固定的 Sephirah 名称
function getSephirahName(killCount) {
  // 从最高阶向最低阶检查（确保优先匹配高阶）
  for (let sephirah of SEPHIRAH_NAMES.reverse()) {
    if (killCount >= sephirah.minKills) {
      return sephirah.name;
    }
  }
  return "Malchut"; // 默认Malchut
}