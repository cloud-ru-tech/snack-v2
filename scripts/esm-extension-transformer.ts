import fs from 'fs';
import path from 'path';

import * as ts from 'typescript';

/**
 * TypeScript emits relative import/export specifiers verbatim under
 * `moduleResolution: "Bundler"` — `export * from './Foo'` stays extensionless.
 * That output is only consumable by a bundler; Node's native ESM resolver
 * (which Next uses when it externalizes a `"type":"module"` package) rejects it
 * with ERR_MODULE_NOT_FOUND / ERR_UNSUPPORTED_DIR_IMPORT.
 *
 * This transformer rewrites relative specifiers to spec-compliant ESM on emit:
 *   ./Foo        (file Foo.ts/.tsx)        -> ./Foo.js
 *   ./components (dir with index.ts/.tsx)  -> ./components/index.js
 *
 * Wired into the ESM build only (`tsconfig.esm.json`). The CJS build keeps
 * `moduleResolution: "node"`, where extensionless/directory imports are valid.
 * Bare specifiers (`react`, `@ds/*`, `classnames`) and already-extensioned
 * paths (`.js`, `.json`, `.css` — `.scss` is rewritten to `.css` by the sibling
 * scss-extension-transformer) are left untouched.
 */

const SOURCE_EXTENSIONS = ['.ts', '.tsx', '.d.ts'] as const;
const SKIP_EXTENSION_REGEX = /\.(m?js|cjs|json|css|scss|svg|png|jpe?g|gif|webp)$/;

function isRelative(spec: string): boolean {
  return spec.startsWith('./') || spec.startsWith('../');
}

function resolveEmitSpecifier(spec: string, sourceFilePath: string): string | undefined {
  if (!isRelative(spec) || SKIP_EXTENSION_REGEX.test(spec)) return undefined;

  const baseDir = path.dirname(sourceFilePath);
  const resolved = path.resolve(baseDir, spec);

  // `./Foo` -> `./Foo.js` when a sibling source file exists.
  if (SOURCE_EXTENSIONS.some(ext => fs.existsSync(resolved + ext))) {
    return `${spec}.js`;
  }

  // `./components` -> `./components/index.js` when it is a directory barrel.
  if (
    fs.existsSync(resolved) &&
    fs.statSync(resolved).isDirectory() &&
    SOURCE_EXTENSIONS.some(ext => fs.existsSync(path.join(resolved, `index${ext}`)))
  ) {
    return `${spec}/index.js`;
  }

  return undefined;
}

function rewriteSpecifier(
  ctx: ts.TransformationContext,
  specifier: ts.Expression | undefined,
  sourceFilePath: string,
): ts.StringLiteral | undefined {
  if (!specifier || !ts.isStringLiteral(specifier)) return undefined;
  const next = resolveEmitSpecifier(specifier.text, sourceFilePath);
  if (!next) return undefined;
  return ctx.factory.createStringLiteral(next, true);
}

export default function () {
  return (ctx: ts.TransformationContext) => (sourceFile: ts.SourceFile) => {
    const sourceFilePath = sourceFile.fileName;

    function visitor(node: ts.Node): ts.Node {
      // import ... from './x'
      if (ts.isImportDeclaration(node)) {
        const moduleSpecifier = rewriteSpecifier(ctx, node.moduleSpecifier, sourceFilePath);
        if (moduleSpecifier) {
          return ctx.factory.updateImportDeclaration(
            node,
            node.modifiers,
            node.importClause,
            moduleSpecifier,
            node.attributes,
          );
        }
      }

      // export * from './x'  |  export { y } from './x'
      if (ts.isExportDeclaration(node)) {
        const moduleSpecifier = rewriteSpecifier(ctx, node.moduleSpecifier, sourceFilePath);
        if (moduleSpecifier) {
          return ctx.factory.updateExportDeclaration(
            node,
            node.modifiers,
            node.isTypeOnly,
            node.exportClause,
            moduleSpecifier,
            node.attributes,
          );
        }
      }

      // dynamic import('./x')
      if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        node.arguments.length > 0
      ) {
        const moduleSpecifier = rewriteSpecifier(ctx, node.arguments[0], sourceFilePath);
        if (moduleSpecifier) {
          return ctx.factory.updateCallExpression(node, node.expression, node.typeArguments, [
            moduleSpecifier,
            ...node.arguments.slice(1),
          ]);
        }
      }

      return ts.visitEachChild(node, visitor, ctx);
    }

    return ts.visitEachChild(sourceFile, visitor, ctx);
  };
}
