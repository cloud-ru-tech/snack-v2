# Quick Start: Просмотр исходного кода в Storybook

## ✅ Исправлено

1. ✅ Установлен пакет `@storybook/test` - больше нет ошибки импорта
2. ✅ Добавлены примеры кода в Avatar stories
3. ✅ Создана документация с альтернативами для просмотра исходного кода

## 🎯 Как просматривать исходный код

### Способ 1: Встроенная Docs страница (самый простой)

1. Откройте Storybook: http://localhost:6006/
2. Выберите любую story (например, "Components/Avatar/With Image")
3. Переключитесь на вкладку **"Docs"** (сверху, рядом с "Canvas")
4. Прокрутите вниз
5. Под каждой story есть кнопка **"Show code"** - нажмите её

**Что вы увидите:**
```tsx
<Avatar 
  name="John Doe"
  src="https://i.pravatar.cc/150?img=1"
/>
```

### Способ 2: Примеры в описании (уже настроено)

В Avatar.stories.tsx я добавил примеры кода в описание каждой story:

- **With Image** - пример использования с изображением
- **Two Symbols** - пример с двумя символами
- **Sizes** - все доступные размеры с кодом
- **Shapes** - формы аватара с кодом
- **Appearances** - цветовые схемы с кодом

**Где смотреть:**
1. Откройте любую story
2. На вкладке "Docs" прочитайте описание под story
3. Там будут примеры кода с синтаксисом

### Способ 3: Компонентная документация

В начале страницы "Components/Avatar" на вкладке "Docs" есть:

- **Installation** инструкция
- **Quick Start** пример
- **Features** список возможностей
- **Source Code** ссылка на GitLab репозиторий

## 📚 Пример того, что вы увидите

Откройте: http://localhost:6006/?path=/docs/components-avatar--docs

Вы увидите:

```
# Avatar Component

Компонент для отображения аватара пользователя или организации.

## Features
- ✅ Автоматическая генерация инициалов из имени
- ✅ Поддержка изображений с fallback
- ✅ Несколько размеров и форм
...

## Quick Start

```tsx
import { Avatar, SIZE } from '@design-system/avatar';

function UserProfile() {
  return (
    <Avatar 
      name="John Doe"
      size={SIZE.M}
    />
  );
}
```

Затем прокрутите вниз к каждой story - там будут примеры кода!

## 🎨 Проверьте интеграцию с Figma

Я заметил, что вы добавили Figma URL! Проверьте:

1. Откройте "Components/Avatar"
2. Перейдите на вкладку **"Design"** внизу
3. Там должен открыться ваш Figma дизайн!

URL который вы добавили:
```
https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=4672-337&m=dev
```

## 📖 Дополнительные ресурсы

- [SOURCE_CODE_ALTERNATIVES.md](./SOURCE_CODE_ALTERNATIVES.md) - подробные альтернативы
- [ADDONS.md](./ADDONS.md) - документация по всем аддонам
- [README.md](./README.md) - общая конфигурация

## 💡 Совет

Для лучшего опыта добавьте примеры кода во все ваши stories:

```tsx
export const MyStory: Story = {
  args: { /* ... */ },
  parameters: {
    docs: {
      description: {
        story: `
Описание с примером кода:

\`\`\`tsx
<YourComponent prop="value" />
\`\`\`
        `,
      },
    },
  },
};
```

Это даст пользователям полный контекст использования компонента!
