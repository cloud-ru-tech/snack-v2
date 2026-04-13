# Materials

Пакет **не предоставляет React-компоненты**, только вспомогательные **SCSS-миксины** для общих визуальных модификаторов: материалы (корневой миксин `with-material`, сейчас — акрил, далее — например градиент) и слой состояний (state layer). Используется при разработке компонентов дизайн-системы для единообразного оформления фона и интерактивных состояний.

## Installation

```bash
npm install @design-system/materials
# or
yarn add @design-system/materials
# or
pnpm add @design-system/materials
```

## Exports





## Usage

### Material (корень) и Acrylic

```tsx
<div className={styles.card} data-acrylic-appearance="neutral" data-acrylic-level="1Level">
  <div className={styles.acrylic} />
  <div className={styles.content}>{children}</div>
</div>
```

### State layer — слой состояний

```tsx
<button type="button" className={styles.button}>
  <span className={styles.stateLayer} data-state="regularBackground" aria-hidden />
  <span className={styles.label}>Текст кнопки</span>
</button>
```

### State layer — прозрачность текста (textOpacity)

```tsx
<div className={styles.button}>
  <div className={styles.contentLayer}>
    <span data-text-opacity>Click me</span>
    <Icon data-text-opacity />
  </div>
</div>
```

## Props



## Best Practices

1. **Один фоновый слой** — в одном блоке один дочерний элемент с классом, переданным в `with-material('acrylic', #{…})` как фон; контент размещайте в соседних дочерних элементах с вышележащим z-index. Для декоративного фона/эффекта явно задавайте заполнение корня и `pointer-events: none` на классах слоёв — пакет этого не делает. Если слои абсолютные, на корне с `with-material` обычно нужен свой `position: relative` (пакет его не добавляет).
2. **Корень взаимодействия** — `has-state-layer-as-child` и `has-content-with-text-opacity` вешайте на класс того элемента, с которым пользователь взаимодействует; аргумент — класс целевого потомка в разметке. Несколько state-слоёв — разные классы и при необходимости несколько вызовов первого миксина.
3. **Переменные дизайн-системы** — для acrylic используйте значения `data-acrylic-appearance` и `data-acrylic-level` из палитры дизайн-системы; пакет подставляет blur, opacity и цвета из `@sbercloud/figma-variables`.
4. **textOpacity только для нужного контента** — помечайте `data-text-opacity` только у текста и иконок, которые должны менять прозрачность при наведении/нажатии.
5. **Не дублировать логику** — если используете готовый компонент (например, Block из `@design-system/block`), он уже может использовать эти миксины; не подключайте materials повторно для того же визуального эффекта.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
