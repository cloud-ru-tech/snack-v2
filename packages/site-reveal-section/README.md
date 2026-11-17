# RevealSection

`@ds/site-reveal-section` — Однократное появление секций сайта при прокрутке: отдельная секция и группа секций.

Пакет добавляет секциям сайта однократную анимацию появления: прозрачность меняется от 0 до 1, содержимое смещается снизу вверх. Сработавшая анимация не повторяется при обратной прокрутке.

## Когда использовать

- Появление содержимого при прокрутке лендинга.
- Единые параметры анимации для нескольких секций страницы.

Для постоянно видимых элементов, основного содержимого первого экрана и блоков, которые должны работать без JavaScript, анимацию следует отключить или не добавлять обёртку.

## Анатомия

`RevealSection` добавляет один `div`, сохраняющий место содержимого в документе. На нём задаются `className`, `style` и стандартные HTML-атрибуты.

`RevealSections` не добавляет общий DOM-контейнер: каждый прямой дочерний элемент получает свою обёртку, кроме исключённых через `skipFirst` или `shouldSkip`. У исключённых элементов дополнительного `div` нет.

При `prefers-reduced-motion: reduce` содержимое видно сразу, без анимации. Если браузер не поддерживает `IntersectionObserver`, после монтирования содержимое также отображается сразу.

### Параметры анимации

| Prop | Default | Назначение |
|---|---|---|
| `duration` | `650` | Длительность перехода в миллисекундах. |
| `delay` | `0` | Задержка перехода в миллисекундах. |
| `offset` | `28` | Начальное смещение по вертикали в пикселях. |
| `easing` | `'ease'` | CSS-функция плавности перехода. |
| `rootMargin` | `'0px 0px -40px 0px'` | Отступы области наблюдения. |
| `threshold` | `0` | Порог пересечения области наблюдения. |
| `disabled` | `false` | Немедленное отображение без перехода. |

Длительности и смещение сохраняют значения исходного компонента. Визуальные стили содержимого задаются самим содержимым.

Анимация запускается один раз за время жизни обёртки. После появления или отключения наблюдение не возобновляется. Для повторного запуска требуется повторное монтирование, например смена `key`.

При SSR содержимое с включённой анимацией изначально скрыто. Оно появляется после гидратации и срабатывания наблюдателя; без JavaScript останется скрытым, если анимация не отключена.

## Установка

```bash
pnpm add @ds/site-reveal-section
```

```ts
import { RevealSection, RevealSections } from '@ds/site-reveal-section'
```

## Примеры использования

Внутри примеров прокручивается отдельная область. Повторный запуск доступен в Playground по кнопке «Повторить».

### Одна секция

Анимация при входе в область просмотра.

```tsx
import { RevealSection } from '@ds/site-reveal-section';

import styles from '../styles.module.scss';

export function Single() {
  return (
    <div className={styles.viewport}>
      <div className={styles.spacer}>Прокрутите вниз</div>
      <RevealSection>
        <section className={styles.section}>
          <h2 className={styles.title}>Возможности платформы</h2>
          <p className={styles.description}>Секция появляется при прокрутке и остаётся видимой.</p>
        </section>
      </RevealSection>
      <div className={styles.spacer} />
    </div>
  );
}
```

### Группа секций

Первая секция без анимации, остальные появляются независимо.

```tsx
import { RevealSections } from '@ds/site-reveal-section';

import styles from '../styles.module.scss';

export function Group() {
  return (
    <div className={styles.viewport}>
      <div className={styles.sections}>
        <RevealSections>
          <section className={styles.section}>
            <h2 className={styles.title}>Облачная платформа</h2>
            <p className={styles.description}>Первая секция отображается сразу: skipFirst=true по умолчанию.</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title}>Возможности</h2>
            <p className={styles.description}>Каждая следующая секция появляется независимо от остальных.</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title}>Тарифы</h2>
            <p className={styles.description}>Повторная прокрутка не запускает анимацию заново.</p>
          </section>
        </RevealSections>
      </div>
    </div>
  );
}
```

### Выборочные исключения

shouldSkip исключает вторую секцию, skipFirst=false включает анимацию первой.

```tsx
import { RevealSections } from '@ds/site-reveal-section';

import styles from '../styles.module.scss';

export function SkipSelected() {
  return (
    <div className={styles.viewport}>
      <div className={styles.sections}>
        <RevealSections skipFirst={false} shouldSkip={(_child, index) => index === 1} duration={400} offset={16}>
          <section className={styles.section}>
            <h2 className={styles.title}>Возможности</h2>
            <p className={styles.description}>Первая секция тоже получает анимацию.</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title}>Специальное предложение</h2>
            <p className={styles.description}>Вторая секция исключена по индексу и отображается без обёртки.</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.title}>Тарифы</h2>
            <p className={styles.description}>Общие параметры анимации применяются к оставшимся секциям.</p>
          </section>
        </RevealSections>
      </div>
    </div>
  );
}
```

- ✅ Первую секцию страницы оставлять видимой через `skipFirst`.
- ❌ Скрывать основной контент первого экрана до завершения гидратации.
- ✅ Использовать `disabled`, если содержимое должно отображаться сразу.
- ❌ Считать `duration={0}` отключением наблюдения за прокруткой.
- ✅ Учитывать дополнительный `div` вокруг анимируемых секций при построении CSS-сетки.
- ❌ Ожидать, что анимируемый элемент останется прямым DOM-потомком внешнего контейнера.
- ✅ Повторно монтировать обёртку для повторного запуска.
- ❌ Ожидать повторной анимации при возврате к уже видимой секции.

## Смотри также

- **SectionBasic** — содержимое секций сайта.
- **SectionTitle** — заголовки секций.

## RevealSection

Однократная анимация появления отдельной секции сайта.

Обёртка для одной секции. Содержимое появляется, когда `IntersectionObserver` обнаруживает пересечение области просмотра с учётом `rootMargin` и `threshold`.

### Анатомия

Корень — `div`. В него передаются стандартные HTML-атрибуты, обработчики, `className` и `style`. Собственные CSS-переменные анимации можно переопределить через `style`.

После первого появления наблюдатель отключается. `disabled` показывает содержимое без анимации; повторное включение не запускает наблюдение заново. Настройка `prefers-reduced-motion` также отключает визуальный переход.

`duration={0}` убирает длительность перехода, но сохраняет ожидание пересечения области просмотра.

Для порога `threshold={1}` вся секция должна помещаться в область наблюдения. Для секций выше экрана следует использовать меньший порог.

#### Начальная область просмотра (default `skipInitialViewport=false`)

`skipInitialViewport` сохраняет содержимое видимым при SSR. При первой проверке `IntersectionObserver`
видимые секции остаются без анимации, а секции вне области просмотра скрываются без перехода и
появляются при последующей прокрутке. Без JavaScript содержимое остаётся видимым.

Начальная проверка не учитывает `rootMargin` и `threshold`; эти параметры применяются к последующей
анимации. Режим выбирается при монтировании. Изменение Controls следует применять кнопкой «Повторить».

Компонент не определяет тип навигации. Потребитель может включить режим для начальной загрузки
и отключить его для нового содержимого после клиентской навигации.

### Props

**RevealSectionProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data-test-id` | `string` | — | Тестовый идентификатор обёртки. |
| `delay` | `number` | `0` | Задержка анимации в миллисекундах. |
| `disabled` | `boolean` | `false` | Отображать содержимое сразу, без анимации. |
| `duration` | `number` | `650` | Длительность анимации в миллисекундах. |
| `easing` | `TransitionTimingFunction` | `ease` | CSS-функция плавности перехода. |
| `offset` | `number` | `28` | Начальное смещение по вертикали в пикселях. |
| `rootMargin` | `string` | `0px 0px -40px 0px` | Отступы области наблюдения IntersectionObserver. |
| `skipInitialViewport` | `boolean` | `false` | Не использовать анимацию появления при инициализации компонента |
| `threshold` | `number \| number[]` | `0` | Порог пересечения или массив порогов для IntersectionObserver. |

## RevealSections

Анимация группы секций с общими настройками и выборочными исключениями.

Применяет `RevealSection` к прямым дочерним элементам. Каждая секция наблюдается независимо. Компонент не добавляет общий DOM-контейнер.

### Анатомия

#### Первая секция (default `skipFirst=true`)

Первая секция отображается без анимации и дополнительной обёртки. Это позволяет оставить первый экран страницы видимым до гидратации. Для анимации всех секций используется `skipFirst={false}`.

#### Выборочные исключения

`shouldSkip(child, index)` возвращает `true` для элементов без анимации. Индекс берётся из `Children.toArray(children)`: пустые React-узлы не учитываются, содержимое `Fragment` не разворачивается.

Проверка `shouldSkip` выполняется после `skipFirst`. Если первая секция уже исключена через `skipFirst`, callback для неё не вызывается.

#### Общие параметры

`disabled`, `skipInitialViewport`, `duration`, `delay`, `offset`, `easing`, `rootMargin` и `threshold` передаются всем создаваемым обёрткам. Одинаковая `delay` применяется к каждой секции; автоматического увеличения задержки по индексу нет.

`className` и `style` также относятся к каждой обёртке, а не к группе целиком. На исключённые элементы эти пропсы не применяются. При `disabled` анимация отключается, но обёртки остаются; для удаления обёртки используется `shouldSkip` или `skipFirst`.

#### Начальная область просмотра (default `skipInitialViewport=false`)

`skipInitialViewport` сохраняет видимые при первой проверке секции без анимации. Секции ниже экрана
появляются при прокрутке. Для обработки всех дочерних элементов режим сочетается с `skipFirst={false}`.
При SSR содержимое остаётся видимым; начальная проверка не учитывает `rootMargin` и `threshold`.

### Props

**RevealSectionsProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| boolean \| ReactElement<any, string \| JSXElementConstructor<any>> \| Iterable<ReactNode> \| ReactPortal \| null \| undefined` | — |  |
| `delay` | `number` | — | Задержка анимации в миллисекундах. |
| `disabled` | `boolean` | — | Отображать содержимое сразу, без анимации. |
| `duration` | `number` | — | Длительность анимации в миллисекундах. |
| `easing` | `TransitionTimingFunction` | — | CSS-функция плавности перехода. |
| `offset` | `number` | — | Начальное смещение по вертикали в пикселях. |
| `rootMargin` | `string` | — | Отступы области наблюдения IntersectionObserver. |
| `shouldSkip` | `((child: ReactNode, index: number) => boolean)` | — | Отображать подходящие под условие элементы без обёртки для анимации. |
| `skipFirst` | `boolean` | `true` | Отображать первый дочерний элемент без обёртки для анимации. |
| `skipInitialViewport` | `boolean` | — | Не использовать анимацию появления при инициализации компонента |
| `threshold` | `number \| number[]` | — | Порог пересечения или массив порогов для IntersectionObserver. |
