/**
 * Public library entry point. Re-exports the pure Block 3 generator for use
 * from Node / other repos / AI agents in combination with Figma MCP.
 */

export { generateSelectedBlock, extractVarNamesFromCssText } from '../generators/generateSelectedBlock';
export type { SelectedBlockInput, SelectedBlockOutput } from '../generators/generateSelectedBlock';

export { fetchSelectedBlockFromFigma, parseFigmaNodeRef } from './figma';
export type { FigmaNodeRef, FetchSelectedBlockOptions, FetchSelectedBlockResult } from './figma';
