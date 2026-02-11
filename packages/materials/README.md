# @design-system/materials

SCSS-миксины для материалов: acrylic (акриловый фон).

## Использование

```scss
@use '@design-system/materials' as m;
@use '@sbercloud/figma-variables/build/scss/styles/styles.module' as base;

.block {
  @include m.acrylic(
    base.$sn-theme-effect-acrylic-blur1Level,
    base.$sn-theme-effect-acrylic-opacity1Level,
    base.$sn-theme-color-neutral-background1Level,
    base.$sn-acrylic-colorEffect1Level
  );
}
```
