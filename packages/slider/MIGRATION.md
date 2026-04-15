# Migration

## From `@snack-uikit/slider`

- Замените импорт на `@design-system/slider`.
- Импортируйте стили глобально один раз, если пакет не попадает в бандл с side-effects: компонент подключает `rc-slider/assets/index.css` и `./slider.scss` сам.
- Класс темы в разметке: `dsThemeSlider` (вместо `osThemeSnack`).
- Тултип: используется `@design-system/tooltip` (проп `tip`); поведение `handleTip` / `tipFormatter` сохранено.
