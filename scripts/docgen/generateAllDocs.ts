import { docgen, generateReadme } from '.';

(async () => {
  // Сначала генерируем таблицы пропсов в документацию
  await docgen();

  // Затем генерируем README из документации
  await generateReadme();
})();
