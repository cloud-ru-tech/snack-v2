import { basename } from 'path';
import { normalizeToSymbolIdPart } from '../../shared/symbolId';
import { IconInfo, Validator } from './types';

/**
 * Уникальность производного имени внутри группы (префикс пути до первого `/`), без учёта
 * регистра. Дополняет validateIconUniqueness: тот ловит идентичное *содержимое*, добавленное
 * повторно под другим именем файла, этот — два реально разных значка, чьи имена файлов
 * схлопываются в одно и то же имя сгенерированного компонента (например, `Eye.svg` и
 * `eye.svg`, или два варианта `Exit.svg`).
 */
function getNameDuplicates(icon: IconInfo, allIcons: IconInfo[]): IconInfo[] {
  const group = icon.path.split('/')[0];
  const idPart = normalizeToSymbolIdPart(basename(icon.path));

  return allIcons.filter(i => i.path.split('/')[0] === group && normalizeToSymbolIdPart(basename(i.path)) === idPart);
}

export const validateNameUniqueness: Validator = {
  validate: ({ icon, allIcons }) => {
    const duplicates = getNameDuplicates(icon, allIcons);

    if (duplicates.length === 0) {
      return null;
    }

    return {
      level: 'error',
      message: `Дублирующие по имени (без учёта регистра) иконки: ${[icon, ...duplicates].map(i => `\n\t- ${i.path}`)}`,
    };
  },
};
