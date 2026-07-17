import * as fs from 'fs/promises';
import path from 'path';

import { XMLParser } from 'fast-xml-parser';

import { validateIconSize, validateIconUniqueness, validateNameUniqueness, Validator } from './validators';
import { getIconGroups, getGroupSourcePath } from '../shared/iconGroups';

const OPTIONS = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
};

const xmlParser = new XMLParser(OPTIONS);
const validators: Validator[] = [validateIconSize, validateIconUniqueness, validateNameUniqueness];

async function getAllSvgPaths(dir: string, baseDir: string): Promise<string[]> {
  const result: string[] = [];
  const entries = await fs.readdir(path.join(dir), { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      result.push(...(await getAllSvgPaths(full, baseDir)));
    } else if (e.name.endsWith('.svg')) {
      result.push(path.relative(baseDir, full).replace(/\\/g, '/'));
    }
  }
  return result;
}

(async () => {
  const groups = getIconGroups();
  const allIcons: { path: string; content: string; xml: ReturnType<XMLParser['parse']> }[] = [];

  for (const group of groups) {
    const groupPath = getGroupSourcePath(group);
    const iconPaths = await getAllSvgPaths(groupPath, groupPath);

    for (const iconPath of iconPaths) {
      const fullPath = path.join(groupPath, iconPath);
      const content = await fs.readFile(fullPath, 'utf-8');
      const relativePath = `${group}/${iconPath}`;
      allIcons.push({
        path: relativePath,
        content,
        xml: xmlParser.parse(content),
      });
    }
  }

  validators.forEach(validator => {
    allIcons.forEach(icon => {
      if (!validator.validate({ icon, allIcons })) {
        throw new Error(`${icon.path}: ${validator.error}`);
      }
    });
  });

  // eslint-disable-next-line no-console
  console.log('Все иконки валидны.');
})();
