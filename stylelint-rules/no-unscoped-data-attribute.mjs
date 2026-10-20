/**
 * Запрещает селекторы, которые начинаются с голого `[data-*]` без класса: `[data-size='m'] &`,
 * `[data-appearance='primary'] .label`.
 *
 * Такой селектор срабатывает на любом предке с этим атрибутом, а не только на корне своего
 * компонента. `Block size='l'` вокруг поля размера `m` даёт совпадение обоих правил с равной
 * специфичностью, и побеждает то, что выведено позже (`l`). Привязывай атрибут к классу корня из
 * того же CSS-модуля: `.root[data-size='m'] &`. Класс хэшируется, чужой предок под него не попадёт.
 *
 * Встроенное `selector-disallowed-list` здесь не подходит: оно пропускает селекторы с
 * SCSS-интерполяцией (`[data-size='#{$size}'] &`), а это основной случай в `@each`-циклах.
 *
 * Соседство (`[data-x] + .foo`, `[data-x] ~ .foo`) не проверяется: проблема только с предками.
 * Межпакетный маркер, который намеренно служит контрактом (`data-card` на корне Card), глушится
 * по месту — `stylelint-disable-next-line` с причиной, чтобы исключение было видно в самом файле.
 */
import stylelint from 'stylelint';

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = 'ds/no-unscoped-data-attribute';

const messages = ruleMessages(ruleName, {
  rejected: selector =>
    `Селектор "${selector}" начинается с [data-*] без класса и сработает на любом предке с этим атрибутом. Привяжи атрибут к классу корня: ".root[data-…] &"`,
});

const UNSCOPED_ATTRIBUTE = /^\[data-[\w-]+/;
const SIBLING_COMBINATOR = /^[+~]/;

// Остаток селектора после первого compound'а: по нему видно, какой идёт комбинатор.
function restAfterLeadingCompound(selector) {
  let depth = 0;

  for (let index = 0; index < selector.length; index += 1) {
    const char = selector[index];

    if (char === '(' || char === '[' || char === '{') depth += 1;
    if (char === ')' || char === ']' || char === '}') depth -= 1;
    if (depth === 0 && /[\s>+~]/.test(char)) return selector.slice(index).trimStart();
  }

  return '';
}

// Делит список селекторов по запятым верхнего уровня. Интерполяцию `#{…}` маскируем той же длины,
// чтобы запятые внутри неё (`#{map-get($m, 'a')}`) не резали селектор, а части брались из исходника.
function splitSelectorList(selector) {
  const masked = selector.replace(/#\{[^}]*\}/g, match => 'x'.repeat(match.length));
  const parts = [];
  let depth = 0;
  let start = 0;

  for (let index = 0; index < masked.length; index += 1) {
    const char = masked[index];

    if (char === '(' || char === '[') depth += 1;
    if (char === ')' || char === ']') depth -= 1;

    if (char === ',' && depth === 0) {
      parts.push(selector.slice(start, index));
      start = index + 1;
    }
  }

  parts.push(selector.slice(start));

  return parts.map(part => part.trim()).filter(Boolean);
}

// Вложенный селектор без `&` уже привязан к родителю: `.root { [data-x] {} }` → `.root [data-x]`.
// То же для тела `@mixin` — оно разворачивается внутри правила потребителя.
function isNestedInRule(node) {
  for (let parent = node.parent; parent && parent.type !== 'root'; parent = parent.parent) {
    if (parent.type === 'rule') return true;
    if (parent.type === 'atrule' && parent.name === 'mixin') return true;
  }

  return false;
}

const rule = primary => (root, result) => {
  if (!validateOptions(result, ruleName, { actual: primary, possible: [true] })) return;

  root.walkRules(node => {
    if (node.parent?.type === 'atrule' && /keyframes$/i.test(node.parent.name)) return;

    const nested = isNestedInRule(node);

    for (const selector of splitSelectorList(node.selector)) {
      if (!UNSCOPED_ATTRIBUTE.test(selector)) continue;
      if (nested && !selector.includes('&')) continue;
      if (SIBLING_COMBINATOR.test(restAfterLeadingCompound(selector))) continue;

      report({ result, ruleName, node, message: messages.rejected(selector) });
    }
  });
};

rule.ruleName = ruleName;
rule.messages = messages;

export default createPlugin(ruleName, rule);
