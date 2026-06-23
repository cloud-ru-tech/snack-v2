import { PartialDeep } from './typeUtils';

/** Язык — открытый BCP-47 тег. DS не закрывает множество языков. */
export type Lang = string;

/** Дерево строк одного языка: лист — строка, ветка — вложенный объект. */
export type MessageTree = { [key: string]: string | MessageTree };

/** Словарь компонента: язык → дерево строк. */
export type LangMessages = Record<Lang, MessageTree>;

/** Запись оверрайда/добавления языка для одного namespace. Собирается через `<locale>.extend(...)`. */
export type OverrideEntry = {
  namespace: string;
  lang: Lang;
  messages: PartialDeep<MessageTree>;
};

/** Слитый реестр оверрайдов: namespace → lang → частичное дерево. */
export type OverrideRegistry = Record<string, Record<Lang, PartialDeep<MessageTree>>>;

/** Значение контекста локали. Контракт не растёт с числом компонентов → навсегда `providerKey('locale', 1)`. */
export type LocaleContextValue = {
  lang: Lang;
  fallbackLang: Lang;
  overrides: OverrideRegistry;
};

/** Подстановки для интерполяции `{{placeholder}}` в строках. */
export type InterpolationObject = Record<string, string | number>;
