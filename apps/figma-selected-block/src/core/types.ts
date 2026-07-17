/**
 * Shared types for plugin, core, and generators.
 */

export interface MixinSuggestion {
  path: string;
  mixinText: string;
  variableNames: string[];
}

export interface SimpleVarSuggestion {
  cssVar: string;
  scssRef: string;
  exampleLine: string;
}

export interface LayerInfo {
  id: string;
  name: string;
  mixins: MixinSuggestion[];
  simpleVars: SimpleVarSuggestion[];
  fullCSS: string;
}

export interface ComponentSetupVar {
  name: string;
  values: string[];
}

export interface PayloadToUI {
  block1ImportsAndVars: string;
  block2Loops: string;
  block3SelectedStyles: string;
  fullScss: string;
  layers: LayerInfo[];
  componentSetup: ComponentSetupVar[] | null;
  error?: string;
}
