import { useThemeContext } from '@ds/theme';
import { useLayoutEffect } from '@ds/utils';
import { EditorProps as MonacoEditorProps, Monaco, useMonaco } from '@monaco-editor/react';
import { configureMonacoYaml, SchemasSettings } from 'monaco-yaml';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CODE_EDITOR_OPTIONS, THEME_VARS, YAML_CODE_EDITOR_OPTIONS } from '../../constants';
import { ConfigureJsonSchemaReturn, JsonSchema } from '../../types';
import { getJsonSchema } from '../../utils';

// monaco-editor типизирует languages.json как deprecated, а ESM-сборка не
// экспортирует namespace в `.d.ts` целиком — runtime API остаётся живым
// (см. legacy snack-code-editor@0.7.15).
type JsonLanguageServiceDefaults = {
  setDiagnosticsOptions: (options: { validate?: boolean; schemas?: SchemasSettings[] }) => void;
};

function getJsonDefaults(monaco: Monaco): JsonLanguageServiceDefaults | undefined {
  const json = (monaco.languages as { json?: { jsonDefaults?: JsonLanguageServiceDefaults } }).json;
  return json?.jsonDefaults;
}

function mapThemeTree(
  styles: CSSStyleDeclaration,
  tree: string | Record<string, unknown>,
): Record<string, unknown> | string {
  if (typeof tree === 'string') {
    return styles.getPropertyValue(tree);
  }
  const res: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(tree)) {
    res[key] = mapThemeTree(styles, value as string | Record<string, unknown>);
  }
  return res;
}

type UseCalculatedThemeValuesProps = {
  stylesOriginNode: HTMLDivElement | null;
  themeName?: string;
};

export function useCalculatedThemeValues({ stylesOriginNode, themeName }: UseCalculatedThemeValuesProps) {
  const [values, setValues] = useState<typeof THEME_VARS | undefined>(undefined);

  const { themeClassName } = useThemeContext();

  const trigger = themeName ?? themeClassName;

  // useLayoutEffect — getComputedStyle should run before paint to avoid theme-switch flicker.
  useLayoutEffect(() => {
    if (stylesOriginNode) {
      const styles = getComputedStyle(stylesOriginNode);
      setValues(mapThemeTree(styles, THEME_VARS) as typeof THEME_VARS);
    }
  }, [stylesOriginNode, trigger]);

  return values;
}

export function useApplyJsonSchema(language?: string, jsonSchema?: JsonSchema) {
  const monaco = useMonaco();

  const [jsonSchemaOptions, setJsonSchemaOptions] = useState<MonacoEditorProps['options']>({});
  const modelPath = jsonSchema?.fileMatch;

  const preparedJsonSchema: SchemasSettings | undefined = useMemo(() => getJsonSchema(jsonSchema), [jsonSchema]);

  const configureYamlLanguage = useCallback((): ConfigureJsonSchemaReturn => {
    if (!monaco || !preparedJsonSchema) {
      return;
    }

    const model = configureMonacoYaml(monaco, {
      enableSchemaRequest: true,
      schemas: [preparedJsonSchema],
    });

    return {
      options: YAML_CODE_EDITOR_OPTIONS,
      dispose: model.dispose,
    };
  }, [monaco, preparedJsonSchema]);

  /**
   * Global monaco state — last mount wins if two CodeEditor instances target the same language with different schemas.
   */
  const configureJsonLanguage = useCallback((): ConfigureJsonSchemaReturn => {
    if (!monaco || !preparedJsonSchema) {
      return;
    }

    const jsonDefaults = getJsonDefaults(monaco);
    if (!jsonDefaults) return;
    jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [preparedJsonSchema],
    });

    return {
      options: CODE_EDITOR_OPTIONS,
      dispose: () => {
        // Reset diagnostics so the previously-registered schema doesn't linger.
        // NB: global monaco state — если рядом смонтированы 2+ CodeEditor с разными
        // JSON-схемами, dispose одного гасит схему другого. Multi-instance
        // ref-counting сюда не зашит сознательно (см. комментарий выше).
        jsonDefaults.setDiagnosticsOptions({ validate: true, schemas: [] });
      },
    };
  }, [monaco, preparedJsonSchema]);

  const configureJsonSchema = useCallback(() => {
    switch (language) {
      case 'yaml':
        return configureYamlLanguage();
      case 'json':
        return configureJsonLanguage();
      default:
        break;
    }
  }, [language, configureYamlLanguage, configureJsonLanguage]);

  useEffect(() => {
    const jsonSchemaSettings = configureJsonSchema();
    setJsonSchemaOptions(jsonSchemaSettings?.options ?? {});

    return () => {
      jsonSchemaSettings?.dispose?.();
    };
  }, [configureJsonSchema]);

  return useMemo(
    () => ({
      jsonSchemaProps: { path: modelPath } satisfies MonacoEditorProps,
      jsonSchemaOptions,
    }),
    [jsonSchemaOptions, modelPath],
  );
}
