import { execSync } from 'child_process';
import fs from 'fs';
import { resolve } from 'path';

import { logInfo } from '../utils/console';
import { getAllPackageFolders } from '../utils/getAllPackageFolders';
import { getChangedUnstagedFiles, getStagedFiles } from '../utils/git';
import { docgen, generateReadme } from './';

type Packages = {
  [key: string]: {
    staged: string[];
    unstaged: string[];
  };
};

const getReadmePath = (packageName: string) =>
  resolve(__dirname, '../../packages', packageName, 'README.md');

const getDocsPath = (packageName: string) =>
  resolve(__dirname, '../../packages', packageName, 'docs/index.mdx');

(async function () {
  const stagedList = getStagedFiles();
  const unstagedList = getChangedUnstagedFiles();
  const packagesList = getAllPackageFolders();

  const packages: Packages = {};

  for (const packageName of packagesList) {
    const staged = stagedList.filter((file) => file.includes(packageName));
    const unstaged = unstagedList.filter((file) => file.includes(packageName));

    if (staged.length || unstaged.length) {
      packages[packageName] = { staged, unstaged };
    }
  }

  const needDocGeneration: string[] = [];
  const needStage: string[] = [];

  Object.entries(packages).forEach(([packageName, { staged, unstaged }]) => {
    // если есть хоть какое-то изменение, генерируем доку
    if (staged.length || unstaged.length) {
      needDocGeneration.push(packageName);
    }
    // если что-то коммитится, тоже коммитим обновленные файлы
    if (staged.length) {
      needStage.push(getReadmePath(packageName));
      needStage.push(getDocsPath(packageName));
    }
  });

  if (needDocGeneration.length) {
    // Генерируем таблицу пропсов в документацию
    await docgen(needDocGeneration);
    // Генерируем README из документации
    await generateReadme(needDocGeneration);
  }

  if (needStage.length) {
    // Фильтруем только существующие файлы
    const existingFiles = needStage.filter((file) => {
      try {
        fs.accessSync(file);
        return true;
      } catch {
        return false;
      }
    });

    if (existingFiles.length) {
      execSync(`git add ${existingFiles.join(' ')}`);
      logInfo('Files added to stage:');
      existingFiles.map(logInfo);
    }
  }
})();
