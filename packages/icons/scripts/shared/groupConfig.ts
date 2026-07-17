/**
 * Конфиг сборки и экспорта на группу (FF-8754). Каждая группа, обнаруженная под svgs/, обязана
 * быть перечислена здесь — группа без записи останавливает сборку с явной ошибкой вместо
 * подстановки дефолта: пропущенный colorMode/needsSprite иначе незаметно испортит цветной набор.
 */
export type GroupConfig = {
  /** 'currentColor' приводит каждый fill/stroke к currentColor (fixIcons.ts::normalizeSvgColors);
   *  'preserve' сохраняет исходные цвета SVG (флаги, логотипы брендов, цветные service/extension-иконки). */
  colorMode: 'currentColor' | 'preserve';
  /** Генерируется ли sprite-вариант (symbol + <use>) в дополнение к standalone. Sprite полагается
   *  на наследование currentColor через <use>, поэтому не имеет смысла для colorMode: 'preserve'. */
  needsSprite: boolean;
  /** Только для logos: пост-обработка пар Light/Dark standalone в один компонент,
   *  переключающийся по теме. */
  themed?: boolean;
  /** 'square' (дефолт): validateIconSize ограничивает 24px и ширину, и высоту. 'height-only':
   *  ограничена только высота — логотипы-wordmark по дизайну шире 24px (например,
   *  `BootcampFullLogo` рендерится 180×24), реальное ограничение DS — только высота строки. */
  sizeCheck?: 'square' | 'height-only';
};

export const GROUP_CONFIG: Record<string, GroupConfig> = {
  system: { colorMode: 'currentColor', needsSprite: true },
  product: { colorMode: 'currentColor', needsSprite: true },
  web: { colorMode: 'currentColor', needsSprite: true },
  // Flags/Logos реально многоцветные (проверено: десятки разных hex-заливок в каждой группе) —
  // preserve корректен. Services/Extensions ошибочно считались цветными брендовыми ассетами;
  // аудит всех 336+171 исходных файлов показал ноль не-чёрно-белых цветов в обеих группах — это
  // чёрная line-art графика, как и интерфейсный набор иконок. currentColor здесь корректен —
  // иконки адаптируются под тему вместо того, чтобы оставаться зафиксированными чёрными.
  flags: { colorMode: 'preserve', needsSprite: false },
  logos: { colorMode: 'preserve', needsSprite: false, themed: true, sizeCheck: 'height-only' },
  services: { colorMode: 'currentColor', needsSprite: true },
  extensions: { colorMode: 'currentColor', needsSprite: true },
};

export function getGroupConfig(group: string): GroupConfig {
  const config = GROUP_CONFIG[group];
  if (!config) {
    throw new Error(
      `Нет записи GROUP_CONFIG для группы иконок "${group}". Добавь запись в scripts/shared/groupConfig.ts перед добавлением svgs/${group}/.`,
    );
  }
  return config;
}
