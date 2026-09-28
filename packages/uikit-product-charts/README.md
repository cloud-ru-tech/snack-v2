# Charts

`@ds/uikit-product-charts` — Продуктовые графики — кольцо заполненности BagelChart, круговая диаграмма PieChart с легендами, тепловая карта HeatMapChart и интерактивный график InteractiveChart на uPlot.

Пакет `@ds/uikit-product-charts` содержит четыре независимых графика для продуктовых страниц и дашбордов. Цвета берутся из токенов темы и перечитываются при её смене, поэтому графики корректно выглядят в светлой и тёмной теме.

- **BagelChart** — кольцо заполненности «занято из общего объёма» с цветом по уровню: до 50% — зелёный, до 75% — жёлтый, выше — красный.
- **PieChart** — круговая диаграмма долей с основной и агрегированной легендами и колбэками клика по сегментам и пунктам легенд.
- **HeatMapChart** — тепловая карта матрицы значений с подписями осей, градиентной легендой и кастомным рендером ячейки.
- **InteractiveChart** — график на [uPlot](https://github.com/leeoniya/uPlot) с zoom и перемещением: линии, столбцы, точки и box plot. Серии в цветах палитры `SERIES_COLORS` собираются хуком `useLayer`.

Как выбрать график:

- Одна величина относительно лимита (квота, заполненность диска):
  - `BagelChart`.
- Доли целого, до 8–10 категорий:
  - `PieChart`.
- Распределение значения по двум категориальным осям (день × час, узел × метрика):
  - `HeatMapChart`.
- Временные ряды, сравнение нескольких серий, статистическое распределение:
  - `InteractiveChart`.

## Установка

```bash
pnpm add @ds/uikit-product-charts
```

```ts
import { BagelChart, HeatMapChart, InteractiveChart, PieChart, useLayer } from '@ds/uikit-product-charts'
```

Константы осей и палитры экспортируются из того же entry: `SERIES_COLORS`, `PLOT_TYPES`, `DRAW_STYLES`, `LINE_INTERPOLATIONS`, `X_AXIS_POSITION`. Селекторы внутренних слотов для e2e-тестов — `TEST_IDS`.

## BagelChart

Кольцо заполненности — показывает занятое значение относительно общего объёма, цвет сегмента зависит от уровня заполненности.

Кольцевой индикатор «занято из общего объёма»: сегмент кольца пропорционален `value / total`, в центре — отформатированные `value` и `total` (формат чисел — по текущему языку из `@ds/locale`). Над кольцом выводится необязательный заголовок `title`.

У кольца нет собственной ширины — оно заполняет ширину контейнера, минимальная ширина задана токеном.

### Когда использовать

- Одна величина относительно лимита: квота, заполненность хранилища, занятые ядра.
- Компактная сводка на дашборде, где важен уровень, а не точное значение.
- Несколько величин с разными единицами:
  - используйте несколько `BagelChart` рядом, по одному на величину.
- Доли нескольких категорий в целом:
  - используйте **`PieChart`**.

- ✅ Задавайте ширину контейнера кольца явно.
- ❌ Растягивать кольцо на всю ширину широкой колонки — подписи в центре масштабируются вместе с ним.
- ✅ Передавайте в `title` название ресурса с единицами измерения.
- ❌ Дублировать в `title` значения `value` и `total` — они уже выводятся в центре кольца.
- ✅ Держите `value` и `total` в одних единицах.
- ❌ Передавать `value` больше 9 999 999 или `total` больше 999 999 999 — числа не помещаются в центр кольца, в dev-режиме выводится предупреждение.
- ✅ Показывайте рядом с кольцом текстовое значение, если цвет уровня важен для решения пользователя.
- ❌ Полагаться только на цвет сегмента как на носитель смысла.

### Анатомия

- Заголовок `title` — над кольцом, необязательный.
- Кольцо — трек нейтрального цвета и сегмент заполненности, начинается сверху и идёт по часовой стрелке.
- Подписи в центре — `value` (крупно) и `total` (под ним).

#### Уровень заполненности

Цвет сегмента выбирается автоматически по доле `value / total` и выставляется на корень атрибутом `data-level`:

- `low` — до 50% включительно, зелёный.
- `medium` — больше 50% и до 75% включительно, жёлтый.
- `high` — больше 75%, красный.

Отдельного пропа для цвета нет: уровень выводится только из данных.

### Примеры использования

#### Квоты проекта

Три кольца с уровнями low, medium и high

```tsx
import { BagelChart } from '@ds/uikit-product-charts';

const QUOTAS = [
  { title: 'vCPU', value: 32, total: 128 },
  { title: 'RAM, GB', value: 180, total: 256 },
  { title: 'SSD, GB', value: 920, total: 1000 },
];

export function QuotaUsage() {
  return (
    // Кольцо заполняет ширину контейнера: колонки сетки задают его размер.
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 160px)', gap: 12 }}>
      {QUOTAS.map(quota => (
        <BagelChart key={quota.title} title={quota.title} value={quota.value} total={quota.total} />
      ))}
    </div>
  );
}
```

### Props

**BagelChartProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс корня |
| `data-test-id` | `string` | — |  |
| `title` | `ReactNode` | — | Заголовок над кольцом |
| `total` | `number` | — | Общий объём, от которого считается заполненность |
| `value` | `number` | — | Занятое значение. Определяет длину сегмента и его цвет: до 50% — зелёный, до 75% — жёлтый, выше — красный |

### Смотри также

- **PieChart** — доли нескольких категорий.
- **ProgressBar** — линейный индикатор заполненности.

## PieChart

Круговая диаграмма долей с основной и агрегированной легендами и колбэками клика по сегментам и пунктам легенд.

Кольцевая диаграмма долей: каждый элемент `data` — сегмент с подписью, значением и необязательным цветом. При наведении сегмент выдвигается, а в центре диаграммы появляются его подпись (обрезается до 15 символов) и значение. Слева от диаграммы — основная легенда со всеми сегментами, справа — необязательная агрегированная легенда, например сводка по группам.

Размер задаётся `options.width` / `options.height` в px; без них диаграмма занимает 100% родителя.

### Когда использовать

- Доли целого по небольшому числу категорий: расходы по сервисам, распределение ресурсов по проектам.
- Сводка с переходом к деталям: клик по сегменту или пункту легенды открывает страницу категории.
- Больше 8–10 категорий:
  - объедините мелкие в «Прочее» или используйте **`InteractiveChart`** со столбцами.
- Одна величина относительно лимита:
  - используйте **`BagelChart`**.

- ✅ Сортируйте `data` по убыванию `value` — крупные доли идут первыми и получают первые цвета палитры.
- ❌ Передавать сегменты с нулевым или отрицательным `value`.
- ✅ Передавайте `id` у сегментов и пунктов легенд, если по клику нужна навигация.
- ❌ Опираться на `label` как на идентификатор — подписи могут совпадать и меняться с локализацией.
- ✅ Задавайте `color` у сегмента только когда цвет несёт смысл (например, статус).
- ❌ Переопределять `color` у всех сегментов ради декора — палитра по умолчанию согласована с темой.
- ✅ Выбирайте `typographySize` под плотность экрана: `s` — для виджета, `l` — для отдельной страницы.
- ❌ Уменьшать `width` / `height` так, что легенды обрезаются — легенды прокручиваются, но заголовок и диаграмма должны оставаться видимыми.

### Анатомия

- Заголовок `options.title`.
- Диаграмма — сегменты с зазором между ними; в центре при наведении — подпись и значение сегмента.
- Основная легенда (слева) — заголовок `options.legendTitle` и пункты по сегментам с цветовым маркером. Клик по подписи пункта вызывает `onLegendItemClick`.
- Агрегированная легенда (справа) — `aggregatedLegend.title` и пункты `aggregatedLegend.data` без цветового маркера. Клик по подписи пункта вызывает `aggregatedLegend.onAggregatedLegendItemClick`.

Клик по сегменту (по нажатию кнопки мыши) вызывает `onPieSegmentClick` с элементом `data`.

Обе легенды прокручиваются, если не помещаются по высоте.

#### Typography size (default `l`)

`options.typographySize` задаёт размер шрифта заголовка и легенд, выставляется на корень атрибутом `data-size`:

- `s` — компактный виджет на дашборде.
- `m` — карточка в сетке.
- `l` — отдельная страница или крупный блок.

#### Цвет сегмента

По умолчанию сегмент получает цвет палитры по индексу (16 цветов, по кругу). Поле `color` у элемента `data` переопределяет цвет — принимается любое CSS-значение, включая `var(--…)`.

### Примеры использования

#### Клик по сегменту и легенде

onPieSegmentClick и onLegendItemClick сохраняют выбранную категорию

```tsx
import { PieChart } from '@ds/uikit-product-charts';
import { useState } from 'react';

const DATA = [
  { id: 'compute', label: 'Compute', value: 420 },
  { id: 'storage', label: 'Object Storage', value: 310 },
  { id: 'network', label: 'Network', value: 180 },
  { id: 'kubernetes', label: 'Managed Kubernetes', value: 150 },
  { id: 'databases', label: 'Databases', value: 95 },
];

type SelectedItem = { label: string | number; value: string | number };

export function ClickableSegments() {
  const [selected, setSelected] = useState<SelectedItem>();

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PieChart
        data={DATA}
        options={{ title: 'Расходы по сервисам', legendTitle: 'Сервисы', width: 480, height: 240 }}
        onPieSegmentClick={setSelected}
        onLegendItemClick={setSelected}
      />
      <span>Выбрано: {selected ? `${selected.label} — ${selected.value}` : 'ничего'}</span>
    </div>
  );
}
```

#### Агрегированная легенда

Сводка по группам справа от основной легенды, typographySize m

```tsx
import { PieChart } from '@ds/uikit-product-charts';
import { useState } from 'react';

const DATA = [
  { id: 'compute', label: 'Compute', value: 420 },
  { id: 'storage', label: 'Object Storage', value: 310 },
  { id: 'network', label: 'Network', value: 180 },
  { id: 'kubernetes', label: 'Managed Kubernetes', value: 150 },
  { id: 'databases', label: 'Databases', value: 95 },
  { id: 'other', label: 'Other services', value: 45 },
];

const GROUPS = [
  { id: 'infrastructure', label: 'Infrastructure', value: 910 },
  { id: 'platform', label: 'Platform', value: 245 },
  { id: 'other', label: 'Other', value: 45 },
];

type GroupItem = { label: string | number };

export function AggregatedLegend() {
  const [group, setGroup] = useState<GroupItem>();

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PieChart
        data={DATA}
        options={{ title: 'Расходы за месяц', legendTitle: 'Сервисы', typographySize: 'm', width: 640, height: 260 }}
        aggregatedLegend={{ title: 'Группы', data: GROUPS, onAggregatedLegendItemClick: setGroup }}
      />
      <span>Группа: {group ? group.label : 'не выбрана'}</span>
    </div>
  );
}
```

### Props

**WithSupportProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aggregatedLegend` | `PieChartAggregatedLegend` | — | Дополнительная легенда справа от диаграммы — например, сводка по группам |
| `className` | `string` | — | CSS-класс корня |
| `data` | `PieChartDataItem[]` | — | Сегменты диаграммы |
| `data-test-id` | `string` | — |  |
| `onLegendItemClick` | `((item: PieChartLegendItem) => void)` | — | Колбэк клика по пункту основной легенды |
| `onPieSegmentClick` | `((item: PieChartDataItem) => void)` | — | Колбэк клика по сегменту |
| `options` | `PieChartOptions` | — | Настройки отображения |

### Смотри также

- **BagelChart** — одна величина относительно лимита.
- **InteractiveChart** — столбцы и линии для большого числа категорий.

## HeatMapChart

Тепловая карта матрицы значений — цвет ячейки по линейной шкале domain, подписи осей, градиентная легенда и кастомный рендер ячейки.

Тепловая карта матрицы `data` (строки × столбцы). Цвет ячейки вычисляется линейной шкалой по диапазону `options.domain`, цвет текста в ячейке подбирается по контрасту с фоном. Под сеткой — градиентная легенда с пятью делениями.

Высота карточки задаётся `options.height` в px (по умолчанию 700); строки сетки делят свободную высоту поровну.

### Когда использовать

- Распределение значения по двум категориальным осям: загрузка по дням и часам, метрика по узлам кластера.
- Поиск аномалий и пиков в большой матрице, где точные значения вторичны.
- Динамика одного-двух рядов во времени:
  - используйте **`InteractiveChart`**.

- ✅ Задавайте `domain` по реальному диапазону метрики (например, `[0, 100]` для процентов).
- ❌ Вычислять `domain` из текущих данных, если карты нужно сравнивать между собой — шкала будет разной.
- ✅ Передавайте `ticks` для обеих осей — без подписей строки и столбцы не читаются.
- ❌ Передавать `ticks`, длина которых не совпадает с числом столбцов или строк `data`.
- ✅ Форматируйте значения через `formatter` (единицы, округление).
- ❌ Округлять значения в `data` ради отображения — `domain` и цвет считаются по исходным значениям.
- ✅ Отключайте легенду (`legend.show: false`), только если шкала объяснена рядом с картой.
- ❌ Выводить длинный текст в ячейку через `cellRender` — ячейка не растёт по контенту.

### Анатомия

- Заголовок `options.title`.
- Подпись оси X `axes.xAxis.label` — над или под сеткой, вместе с делениями.
- Подпись оси Y `axes.yAxis.label` — слева, повёрнута вертикально.
- Сетка ячеек с делениями `axes.xAxis.ticks` / `axes.yAxis.ticks`.
- Легенда — градиентная полоса от начала до конца шкалы и пять делений по `domain`.

#### X axis position (default `bottom`)

`axes.xAxis.position` определяет, с какой стороны сетки выводятся деления и подпись оси X; значение выставляется на корень атрибутом `data-x-axis-position`. Значения — константа `X_AXIS_POSITION` (также доступна как статика `HeatMapChart.xAxisPositions`):

- `bottom` — под сеткой, как в обычном графике.
- `top` — над сеткой. Подходит для высокой карты: подписи столбцов видны без прокрутки.

#### Legend (default `show: true`)

`legend.show` включает градиентную легенду под сеткой:

- `true` — полоса цветовой шкалы и пять делений по `domain`.
- `false` — легенда скрыта, сетка занимает освободившуюся высоту.

#### Ячейка

По умолчанию ячейка показывает значение, отформатированное `formatter`. `cellRender(x, y, value)` заменяет содержимое ячейки целиком, фон ячейки по-прежнему задаётся шкалой. Inline-стили подписей и ячеек переопределяются через `options.styles`.

### Примеры использования

#### Кастомная ячейка

formatter добавляет единицы, cellRender выделяет значения от 80%, ось X сверху

```tsx
import { HeatMapChart } from '@ds/uikit-product-charts';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'];
const HOURS = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];

// Загрузка CPU в процентах: строки — дни, столбцы — часы.
const DATA = DAYS.map((_, day) => HOURS.map((__, hour) => ((day * 11 + hour * 17) % 20) * 5));

function formatPercent(value: number) {
  return `${value}%`;
}

function renderCell(_x: number, _y: number, value: number) {
  return value >= 80 ? <strong>{formatPercent(value)}</strong> : formatPercent(value);
}

export function CustomCell() {
  return (
    <HeatMapChart
      data={DATA}
      options={{
        title: 'Загрузка CPU',
        height: 420,
        domain: [0, 100],
        formatter: formatPercent,
        cellRender: renderCell,
        axes: {
          xAxis: { label: 'Время', ticks: HOURS, position: 'top' },
          yAxis: { label: 'День недели', ticks: DAYS },
        },
      }}
    />
  );
}
```

### Props

**WithSupportProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс корня |
| `data` | `number[][]` | — | Матрица значений: строки × столбцы |
| `data-test-id` | `string` | — |  |
| `options` | `HeatMapChartOptions` | — | Настройки отображения |

### Смотри также

- **InteractiveChart** — временные ряды и распределения.

## InteractiveChart

Интерактивный график на uPlot с zoom и перемещением — линии, столбцы, точки и box plot; серии в цветах палитры собираются хуком useLayer.

Обёртка над [uPlot](https://github.com/leeoniya/uPlot): компонент берёт базовую конфигурацию по `type`, подставляет в неё цвета текущей темы и глубоко сливает поверх неё `options`. Данные передаются в формате uPlot (`AlignedData`): первый массив — значения оси X, остальные — серии.

Серии описываются в `options.series`: первая запись относится к оси X (обычно `{}`), остальные совпадают по порядку с массивами данных. Хук `useLayer` собирает серию в цветах палитры `SERIES_COLORS` — цвет читается с корня графика при отрисовке, поэтому серия следует теме того графика, в котором нарисована.

Размер по умолчанию — 800×600 px, меняется через `options.width` / `options.height`. График рисуется на canvas и требует браузерного окружения.

### Когда использовать

- Временные ряды и метрики мониторинга, где нужно приблизить участок графика.
- Сравнение нескольких серий на одних осях.
- Статистическое распределение по группам — `type='boxPlot'`.
- Доли целого:
  - используйте **`PieChart`**.
- Матрица значений по двум категориальным осям:
  - используйте **`HeatMapChart`**.

- ✅ Мемоизируйте `options` (`useMemo`) — новая ссылка на `options` пересоздаёт график.
- ❌ Собирать `options` литералом прямо в JSX на каждый рендер.
- ✅ Задавайте цвета серий через `useLayer` и `SERIES_COLORS`.
- ❌ Передавать в `stroke` / `fill` серии фиксированные цвета — они не переключаются вместе с темой.
- ✅ Подписывайте оси и серии через `options.axes[i].label` и `label` в `useLayer` — базовые конфигурации подписей не содержат.
- ❌ Выводить больше 5–6 серий на одном графике — линии сливаются.
- ✅ Для box plot передавайте ровно шесть массивов: `[x, min, q1, median, q3, max]`.
- ❌ Переопределять `options.series` у box plot — порядок серий задаёт формат данных и подписи в тултипе.

### Анатомия

- Область графика (canvas uPlot) с осями X и Y и сеткой.
- Серии — линии, столбцы или точки в цветах палитры.
- Легенда uPlot под графиком; у `boxPlot` она работает как тултип рядом с курсором.

#### Type (default `default`)

`type` выбирает базовую конфигурацию, значение выставляется на корень атрибутом `data-type`. Значения — константа `PLOT_TYPES`:

- `default` — оси X/Y без временной шкалы. Выделение области мышью приближает её, колесо мыши масштабирует, зажатая средняя кнопка перемещает график по X, двойной клик сбрасывает масштаб.
- `boxPlot` — «ящик с усами» по группам: усы min–max, тело q1–q3 и линия медианы. Колонка под курсором подсвечивается, значения выводятся в тултипе. Масштабирование отключено.

#### Draw style

`drawStyle` в `useLayer` — способ отрисовки серии, константа `DRAW_STYLES`:

- `line` — линия, форма задаётся `lineInterpolation`. Без `lineInterpolation` серия рисуется только точками.
- `bars` — узкие столбцы по центру точки X.
- `barsLeft` / `barsRight` — столбцы на всю ширину шага по оси X (гистограмма); различаются стороной, к которой столбец прижат относительно точки X.
- `points` — точки без соединяющей линии.

#### Line interpolation

`lineInterpolation` в `useLayer` — форма линии для `drawStyle='line'`, константа `LINE_INTERPOLATIONS`. Для остальных `drawStyle` игнорируется:

- `linear` — прямые отрезки между точками.
- `spline` — сглаженная кривая.
- `stepAfter` — ступенька: значение держится до следующей точки.
- `stepBefore` — ступенька: значение меняется сразу после предыдущей точки.

#### Цвет серии

`color` в `useLayer` — одно из 16 значений `SERIES_COLORS`: четыре оттенка (`green`, `blue`, `violet`, `crimson`) × четыре ступени насыщенности (`1`–`4`). Порядок значений в константе — рекомендуемый порядок назначения цветов сериям: сначала первая ступень всех оттенков, затем вторая и так далее. Заливка под серией — тот же цвет с прозрачностью.

### Примеры использования

#### Несколько серий

Три слоя useLayer: spline, stepAfter и столбцы

```tsx
import { InteractiveChart, useLayer } from '@ds/uikit-product-charts';
import { useMemo } from 'react';

type ChartProps = Parameters<typeof InteractiveChart>[0];

const WIDTH = 640;
const HEIGHT = 320;
const POINTS = 40;
const X_VALUES = Array.from({ length: POINTS }, (_, index) => index);

const DATA: ChartProps['data'] = [
  X_VALUES,
  X_VALUES.map(x => Math.round(50 + 30 * Math.sin(x / 5))),
  X_VALUES.map(x => Math.round(40 + 20 * Math.cos(x / 7))),
  X_VALUES.map(x => Math.round(20 + 10 * Math.sin(x / 3))),
];

export function MultiSeries() {
  const cpu = useLayer({ label: 'CPU', color: 'blue1', drawStyle: 'line', lineInterpolation: 'spline' });
  const memory = useLayer({ label: 'RAM', color: 'green1', drawStyle: 'line', lineInterpolation: 'stepAfter' });
  const disk = useLayer({ label: 'Disk', color: 'violet2', drawStyle: 'bars' });

  // Первая серия — ось X, остальные совпадают по порядку с массивами данных.
  const options = useMemo<ChartProps['options']>(
    () => ({ width: WIDTH, height: HEIGHT, series: [{}, cpu, memory, disk] }),
    [cpu, memory, disk],
  );

  return <InteractiveChart data={DATA} options={options} />;
}
```

#### Box plot

type='boxPlot', данные [x, min, q1, median, q3, max]; наведите курсор на группу

```tsx
import { InteractiveChart } from '@ds/uikit-product-charts';

type ChartProps = Parameters<typeof InteractiveChart>[0];

// Формат данных box plot: [x, min, q1, median, q3, max].
const DATA: ChartProps['data'] = [
  [1, 2, 3, 4, 5, 6],
  [10, 14, 8, 20, 12, 16],
  [22, 28, 18, 34, 25, 30],
  [30, 36, 26, 42, 33, 38],
  [40, 46, 35, 52, 44, 49],
  [55, 62, 50, 70, 58, 64],
];

const HEIGHT = 320;
const OPTIONS: ChartProps['options'] = { width: 640, height: HEIGHT };

export function BoxPlot() {
  return <InteractiveChart type='boxPlot' data={DATA} options={OPTIONS} />;
}
```

### Props

**WithSupportProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS-класс корня |
| `data` | `AlignedData` | — | Данные в формате uPlot: первый массив — значения оси X, остальные — серии |
| `data-test-id` | `string` | — |  |
| `options` | `Partial<Options>` | — | Опции uPlot, которые глубоко сливаются поверх базовой конфигурации `type` |
| `type` | `"boxPlot"` \| `"default"` | `default` | Базовая конфигурация графика |

### Смотри также

- **HeatMapChart** — матрица значений.
- **PieChart** — доли целого.
