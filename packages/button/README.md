# @design-system/button

Button components for the design system built with `@sbercloud/figma-variables`.

## Installation

```bash
pnpm add @design-system/button
```

## Usage

```tsx
import { 
  ButtonFilled, 
  ButtonTonal, 
  ButtonOutline, 
  ButtonElevated, 
  ButtonSimple, 
  ButtonFunction,
  SIZE, 
  APPEARANCE 
} from '@design-system/button';

function MyComponent() {
  return (
    <>
      <ButtonFilled
        size={SIZE.M}
        appearance={APPEARANCE.Primary}
        label="Filled Button"
        onClick={() => console.log('Clicked!')}
      />
      <ButtonTonal
        size={SIZE.M}
        appearance={APPEARANCE.Primary}
        label="Tonal Button"
      />
      <ButtonOutline
        size={SIZE.M}
        appearance={APPEARANCE.Primary}
        label="Outline Button"
      />
    </>
  );
}
```

## Components

### ButtonFilled

Filled button variant with solid background. Use for primary actions.

**Props:**

- `size?: 's' | 'm' | 'l'` - Button size (default: `'s'`)
- `appearance?: 'primary' | 'neutral' | 'destructive'` - Button appearance (default: `'primary'`)
- `label?: string` - Button label text
- `icon?: ReactElement` - Icon element
- `iconPosition?: 'before' | 'after'` - Icon position relative to label (default: `'after'`)
- `disabled?: boolean` - Disabled state
- `loading?: boolean` - Loading state
- `fullWidth?: boolean` - Full width button
- `href?: string` - Link URL (renders as `<a>` if provided)
- `target?: string` - Link target (default: `'_blank'`)
- `onClick?: MouseEventHandler` - Click handler
- `className?: string` - Additional CSS class

### ButtonTonal

Tonal button variant with subtle background. Use for secondary actions.

Same props as `ButtonFilled`.

### ButtonOutline

Outline button variant with border and transparent background. Use for secondary actions with emphasis.

Same props as `ButtonFilled`.

### ButtonElevated

Elevated button variant with shadow. Use for floating actions or elevated primary actions.

Same props as `ButtonFilled`.

### ButtonSimple

Simple button variant with transparent background and text only. Use for tertiary actions.

Same props as `ButtonFilled`.

### ButtonFunction

Function button variant with reduced opacity. Use for functional/utility actions.

Same props as `ButtonFilled`.

## Styling

The components use `@sbercloud/figma-variables` for styling, following the same pattern as other design system components like `@design-system/status`.

Styles are defined in `styles.module.scss` using:
- `base.composite-var()` for applying multiple CSS properties from design tokens
- `base.simple-var()` for accessing individual token values
- Theme variables from `@sbercloud/figma-variables/build/scss/thememode/light.module`

