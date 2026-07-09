import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import * as ts from 'typescript';

export function createPropsProgram(root: string): ts.Program | null {
  const tsconfigPath = resolve(root, 'tsconfig.gen-props.json');
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    console.warn('tsconfig.gen-props.json read error:', configFile.error.messageText);
    return null;
  }

  const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
  return ts.createProgram({ rootNames: parsed.fileNames, options: parsed.options });
}

export function getPackageExportedNames(program: ts.Program, pkgDir: string): Set<string> {
  const entryFile = resolve(pkgDir, 'src/index.ts');
  if (!existsSync(entryFile)) return new Set();

  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(entryFile);
  if (!sourceFile) return new Set();

  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) return new Set();

  const names = new Set<string>();
  for (const exp of checker.getExportsOfModule(moduleSymbol)) {
    names.add(exp.getName());
  }
  return names;
}

export function isPrivatePackage(pkgName: string): boolean {
  return pkgName.endsWith('-private');
}

/**
 * Public if exported from package index, or attached to an exported namespace root
 * (e.g. Tabs.Tab when Tabs is exported).
 */
export function isPublicComponent(displayName: string, exportedNames: Set<string>, pkgName: string): boolean {
  if (isPrivatePackage(pkgName)) return false;
  if (exportedNames.has(displayName)) return true;

  if (!displayName.includes('.')) return false;

  const parts = displayName.split('.');
  for (let i = 1; i < parts.length; i++) {
    const prefix = parts.slice(0, i).join('.');
    if (exportedNames.has(prefix)) return true;
  }

  return false;
}
