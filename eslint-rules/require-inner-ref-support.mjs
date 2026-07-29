/**
 * Компонент, который принимает `innerRef`, обязан быть помечен `withInnerRefSupport` из `@ds/utils`.
 *
 * Зачем: интроспекция пропсов функционального компонента в рантайме невозможна, поэтому `Popover` /
 * `Tooltip` / `Dropdown` узнают о поддержке `innerRef` только по маркеру. Без него триггер молча уезжает
 * в `<span>`-фолбэк — лишний DOM-узел и проигнорированный `disableSpanWrapper`.
 *
 * Канон — вызов рядом с объявлением (`export function X(…) {…}` + `withInnerRefSupport(X);`), а не обёртка
 * `export const X = withInnerRefSupport(function X(…) {…})`: обёртку `react-docgen-typescript` разбирает без
 * дефолтов пропсов, и `docs/props.json`, README-таблицы и Storybook Controls теряют колонку «по умолчанию».
 * Обёрточная форма правилом тоже принимается — для компонентов без дефолтов в деструктуризации.
 *
 * Правило смотрит на **потребление** пропа (деструктуризация `innerRef` в параметрах компонента), а не на
 * объявление типа: тип обычно лежит в соседнем `types.ts`, и межфайловый анализ здесь не нужен.
 *
 * Если `innerRef` намеренно ведёт не на корневой узел (скрытый `input` у dropzone) или проставляется
 * условно — глуши точечно через `eslint-disable-next-line` с причиной.
 */
const HOC_NAME = 'withInnerRefSupport';
const REF_PROP = 'innerRef';

function isComponentName(name) {
  return typeof name === 'string' && /^[A-Z]/.test(name);
}

function takesInnerRef(node) {
  const [firstParam] = node.params;

  return (
    firstParam?.type === 'ObjectPattern' &&
    firstParam.properties.some(prop => prop.type === 'Property' && prop.key?.name === REF_PROP)
  );
}

function getComponentName(node) {
  if (node.id?.name) return node.id.name;
  if (node.parent?.type === 'VariableDeclarator' && node.parent.id?.type === 'Identifier') {
    return node.parent.id.name;
  }

  return undefined;
}

function isWrappedInHoc(node) {
  return (
    node.parent?.type === 'CallExpression' &&
    node.parent.callee?.type === 'Identifier' &&
    node.parent.callee.name === HOC_NAME &&
    node.parent.arguments[0] === node
  );
}

export const requireInnerRefSupport = {
  meta: {
    type: 'problem',
    docs: {
      description: `Требует обернуть компонент с пропом \`${REF_PROP}\` в \`${HOC_NAME}\` из @ds/utils`,
    },
    schema: [],
    messages: {
      missing: `Компонент <{{name}}> принимает ${REF_PROP}, но не помечен ${HOC_NAME} из @ds/utils — поповер и тултип не увидят маркер и завернут триггер в лишний <span>. Добавьте вызов рядом с объявлением: ${HOC_NAME}({{name}}); Если ${REF_PROP} ведёт не на корневой узел — заглушите правило с указанием причины.`,
    },
  },

  create(context) {
    /** @type {{ node: import('estree').Node, name: string }[]} */
    const candidates = [];
    const markedNames = new Set();

    function collect(node) {
      if (!takesInnerRef(node)) return;

      const name = getComponentName(node);

      if (!isComponentName(name)) return;

      candidates.push({ node, name });
    }

    return {
      FunctionDeclaration: collect,
      FunctionExpression: collect,
      ArrowFunctionExpression: collect,

      // Отдельный оператор `withInnerRefSupport(Component);` — тоже валидная пометка.
      CallExpression(node) {
        if (node.callee?.type !== 'Identifier' || node.callee.name !== HOC_NAME) return;

        const [arg] = node.arguments;

        if (arg?.type === 'Identifier') markedNames.add(arg.name);
      },

      'Program:exit'() {
        for (const { node, name } of candidates) {
          if (isWrappedInHoc(node) || markedNames.has(name)) continue;

          context.report({ node: node.id ?? node, messageId: 'missing', data: { name } });
        }
      },
    };
  },
};
