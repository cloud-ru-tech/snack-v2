/**
 * Полиморфный ButtonProps<ElementType> парсер не разворачивает в пропсы.
 * Таблица берётся из типа BaseButtonProps в types.ts + доп. проп as.
 *
 * Формат propsFallback описан в scripts/docgen/Docgen.ts (PropsFallbackConfig).
 */
export const config = {
  propsFallback: {
    typesFilePath: 'src/Button/types.ts',
    typeName: 'BaseButtonProps',
    componentDisplayName: 'Button',
    extraProps: [
      {
        name: 'as',
        required: false,
        type: { name: "'button' | 'a' | ElementType", raw: "'button' | 'a' | ElementType" },
        description:
          "Полиморфный рендер: 'button' | 'a' или кастомный компонент (напр. Link из react-router-dom). Для 'a' передавайте href, target; для роутера — to и т.д.",
      },
    ],
  },
};
