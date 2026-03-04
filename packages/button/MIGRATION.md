# Migration Guide

## ButtonGroup API (primaryButton/secondaryButton → primaryAction/secondaryAction/tertiaryAction)

API приведён в соответствие с макетом Figma (node-id=9099-51008):

**Было:**
- `primaryButton` — основная кнопка (filled)
- `secondaryButton` — дополнительная кнопка (tonal)

**Стало:**
- `primaryAction` — основное действие (filled)
- `secondaryAction` — вторичное действие (outline)
- `tertiaryAction` — третичное действие (simple), опционально

**Новые пропсы:** `break` (перенос на новую строку), `filled` (заливка контейнера).

**Миграция:**
```tsx
// Было
<ButtonGroup
  primaryButton={{ label: 'Подтвердить' }}
  secondaryButton={{ label: 'Отмена' }}
/>

// Стало
<ButtonGroup
  primaryAction={{ label: 'Подтвердить' }}
  secondaryAction={{ label: 'Отмена' }}
/>
```

---

## Upgrading to 0.1.0

Initial release. No migration needed.
