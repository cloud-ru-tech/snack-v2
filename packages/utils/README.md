# Utils

Пакет с хуками и хелперами для разработки React-компонентов: темы, controlled/uncontrolled состояние, дебаунс, свайпы, модалки, персист данных, работа с пропами и SSR.

## Installation

```bash
npm install @design-system/utils
# or
yarn add @design-system/utils
# or
pnpm add @design-system/utils
```

## Exports





## Usage



## Props



## Best Practices

1. **useIsomorphicLayoutEffect** вместо useLayoutEffect для SSR.
2. **excludeSupportProps** — перед передачей пропов в DOM; **extractSupportProps** — для обёртки (data-test-id, aria-*).
3. **useValueControl** — для компонентов с controlled/uncontrolled режимом.
4. **useModalOpenState** — закрытие по истории (popstate) и CloseWatcher.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
