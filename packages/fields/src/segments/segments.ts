export type SegmentKey = 'day' | 'month' | 'year' | 'hours' | 'minutes' | 'seconds';

/** Описание одного сегмента маски: его границы в строке + допустимые значения + плейсхолдер. */
export type SlotMeta = {
  key: SegmentKey;
  /** Индекс начала сегмента в строке маски (включительно). */
  start: number;
  /** Индекс конца сегмента в строке маски (исключительно). */
  end: number;
  min: number;
  max: number;
  /** Текст-плейсхолдер сегмента (`ДД`, `чч`, …), длина = `end - start`. */
  placeholder: string;
};

export type SegmentsMode = 'date' | 'date-time' | 'time';

type SegmentDef = {
  key: SegmentKey;
  len: number;
  min: number;
  max: number;
  placeholder: string;
  /** Разделитель ПЕРЕД сегментом (отрисовывается в маске между предыдущим и текущим). */
  separator: string;
};

// RU-плейсхолдеры сегментов — паритет с легаси @snack-uikit/fields и Figma: ДД.ММ.ГГГГ, чч:мм:сс.
const DATE_DEFS: SegmentDef[] = [
  { key: 'day', len: 2, min: 1, max: 31, placeholder: 'ДД', separator: '' },
  { key: 'month', len: 2, min: 1, max: 12, placeholder: 'ММ', separator: '.' },
  { key: 'year', len: 4, min: 1, max: 9999, placeholder: 'ГГГГ', separator: '.' },
];

// Дату и время разделяет запятой (легаси `ДД.ММ.ГГГГ, чч:мм:сс`).
const DATE_TIME_SEPARATOR = ', ';

function timeDefs(showSeconds: boolean, firstSeparator: string): SegmentDef[] {
  const defs: SegmentDef[] = [
    { key: 'hours', len: 2, min: 0, max: 23, placeholder: 'чч', separator: firstSeparator },
    { key: 'minutes', len: 2, min: 0, max: 59, placeholder: 'мм', separator: ':' },
  ];
  if (showSeconds) {
    defs.push({ key: 'seconds', len: 2, min: 0, max: 59, placeholder: 'сс', separator: ':' });
  }
  return defs;
}

function defsForMode(mode: SegmentsMode, showSeconds: boolean): SegmentDef[] {
  if (mode === 'date') {
    return DATE_DEFS;
  }
  if (mode === 'time') {
    return timeDefs(showSeconds, '');
  }
  return [...DATE_DEFS, ...timeDefs(showSeconds, DATE_TIME_SEPARATOR)];
}

/**
 * Строит строку-маску и список сегментов с их границами/границами значений для заданного режима.
 * Границы (`start`/`end`) считаются по позиции плейсхолдера сегмента в собранной маске.
 */
export function buildSegments(mode: SegmentsMode, showSeconds = true): { mask: string; slots: SlotMeta[] } {
  const defs = defsForMode(mode, showSeconds);
  let mask = '';
  const slots: SlotMeta[] = [];
  for (const def of defs) {
    mask += def.separator;
    const start = mask.length;
    mask += def.placeholder;
    const end = mask.length;
    slots.push({ key: def.key, start, end, min: def.min, max: def.max, placeholder: def.placeholder });
  }
  return { mask, slots };
}
