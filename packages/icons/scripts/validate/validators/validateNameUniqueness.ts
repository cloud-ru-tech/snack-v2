import { basename } from 'path';
import { normalizeToSymbolIdPart } from '../../shared/symbolId';
import { Validator } from './types';

/**
 * Уникальность производного имени внутри группы (префикс пути до первого `/`), без учёта
 * регистра. Дополняет validateIconUniqueness: тот ловит идентичное *содержимое*, добавленное
 * повторно под другим именем файла, этот — два реально разных значка, чьи имена файлов
 * схлопываются в одно и то же имя сгенерированного компонента (например, `Eye.svg` и
 * `eye.svg`, или два варианта `Exit.svg`).
 */
export const validateNameUniqueness: Validator = {
  error: `дублирующееся имя иконки внутри группы (без учёта регистра) — переименуй один из исходных SVG`,
  validate: ({ icon, allIcons }) => {
    const group = icon.path.split('/')[0];
    const idPart = normalizeToSymbolIdPart(basename(icon.path));
    const matches = allIcons.filter(
      i => i.path.split('/')[0] === group && normalizeToSymbolIdPart(basename(i.path)) === idPart,
    );
    return matches.length === 1;
  },
};
