import { EditorProps as MonacoEditorProps } from '@monaco-editor/react';
import { JSONSchema } from 'monaco-yaml';

/**
 * Базовый набор пропсов редактора без `theme` (тема задаётся внутри `CodeEditor`
 * по DS-токенам).
 *
 * `jsonSchema?: never` — это discriminated-union трюк: в TS нет родного
 * «xor» между объектными типами, но если в одной ветке union'а поле объявлено
 * как `never`, компилятор не даст передать сюда любое значение, кроме
 * `undefined`. В паре с `EditorWithJsonSchemaProps` (там `jsonSchema:
 * JsonSchema`) это даёт строгое разделение режимов: либо обычный редактор без
 * валидации, либо валидация по JSON-Schema — смешать невозможно.
 */
export type EditorBaseProps = Omit<MonacoEditorProps, 'theme'> & { jsonSchema?: never };

/** Языки, для которых поддерживается валидация по JSON-Schema. */
export type SupportedSchemaLanguage = 'json' | 'yaml';

/**
 * Конфигурация валидации редактора по JSON-Schema.
 *
 * - `uri` — идентификатор схемы (опционально, генерится автоматически, если не задан).
 * - `schema` — само тело JSON-Schema (передаётся в monaco language services).
 * - `fileMatch` — паттерн match'а, по которому схема применяется к модели.
 */
export type JsonSchema = {
  /** Идентификатор схемы. Если не задан — генерится автоматически. */
  uri?: string;
  /** Тело JSON-Schema. */
  schema: JSONSchema;
  /** Паттерн match'а пути модели, к которой применяется схема. */
  fileMatch: string;
};

/**
 * Включение валидации по JSON-Schema. Парный тип к `EditorBaseProps` в
 * discriminated union: задаётся только вместе с `language: 'json' | 'yaml'`
 * и без явного `path` (путь модели управляется JSON-Schema-инфраструктурой).
 */
export type WithJsonSchema = {
  /** Конфигурация JSON-Schema, по которой monaco валидирует контент. */
  jsonSchema: JsonSchema;
  /**
   * В schema-режиме путь модели управляется внутренне (нужен стабильный `path`,
   * совпадающий с `fileMatch`), снаружи задать его нельзя. `never` запрещает
   * передачу `path` на уровне типа — попытка приводит к compile-time ошибке.
   */
  path?: never;
  /** Язык контента редактора. Schema-режим работает только для `json` и `yaml`. */
  language: SupportedSchemaLanguage;
};

/**
 * Полный набор пропсов редактора в режиме валидации по JSON-Schema.
 * Используется как ветка discriminated union в `CodeEditorProps`.
 */
export type EditorWithJsonSchemaProps = Omit<MonacoEditorProps, 'theme' | 'path' | 'language'> & WithJsonSchema;

/**
 * Результат применения JSON-Schema конфигурации к monaco language service:
 * вернёт расширенные опции редактора и функцию `dispose` для снятия регистраций
 * при unmount. `undefined` — schema не применилась (язык не поддерживается или
 * monaco ещё не инициализирован).
 */
export type ConfigureJsonSchemaReturn =
  | {
      /** Дополнительные monaco-опции, которые нужно мерджить в редактор. */
      options?: MonacoEditorProps['options'];
      /** Снять регистрацию схемы / прочих side-effects при unmount. */
      dispose?: () => void;
    }
  | undefined;
