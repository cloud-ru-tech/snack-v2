import type { ComponentDoc, Props } from 'react-docgen-typescript';
import * as ts from 'typescript';

function getJSDocForNode(sourceFile: ts.SourceFile, node: ts.Node): string {
  const full = sourceFile.getFullText();
  const start = node.getStart();
  const before = full.slice(0, start);
  const match = before.match(/\/\*\*([\s\S]*?)\*\//g);
  if (!match?.length) return '';
  const last = match[match.length - 1];
  return last
    .replace(/^\s*\/\*\*/, '')
    .replace(/\*\/\s*$/, '')
    .replace(/^\s*\*\s?/gm, '')
    .trim();
}

/**
 * Извлекает пропсы из типа (type alias или interface) в .ts/.tsx файле.
 * Используется как fallback для компонентов с полиморфными пропами (например Button),
 * когда react-docgen-typescript не может вывести пропсы из generic-типа.
 */
export function extractPropsFromTypeAlias(
  filePath: string,
  typeName: string,
  displayName: string,
): ComponentDoc | null {
  const content = ts.sys.readFile(filePath);
  if (!content) return null;

  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

  let typeDecl: ts.TypeAliasDeclaration | null = null;

  const visit = (node: ts.Node) => {
    if (ts.isTypeAliasDeclaration(node) && node.name.text === typeName) {
      typeDecl = node;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);

  if (!typeDecl) return null;
  const alias = typeDecl as ts.TypeAliasDeclaration;
  const rawTypeNode = alias.type;
  if (!ts.isTypeLiteralNode(rawTypeNode)) return null;
  const typeNode = rawTypeNode;

  const props: Props = {};

  for (const member of typeNode.members) {
    if (!ts.isPropertySignature(member)) continue;
    const prop = member as ts.PropertySignature;
    const name = (prop.name as ts.Identifier)?.text;
    if (!name || name.startsWith('data-') || name.startsWith('aria-')) continue;

    const optional = Boolean(prop.questionToken);
    const description = getJSDocForNode(sourceFile, prop);
    const typeNode = (prop as ts.PropertySignature & { type?: ts.TypeNode }).type;
    const typeStr = typeNode ? sourceFile.getText().slice(typeNode.pos, typeNode.end).trim() : 'unknown';

    props[name] = {
      name,
      required: !optional,
      type: { name: typeStr, raw: typeStr },
      description,
      defaultValue: undefined,
    };
  }

  return {
    displayName,
    description: '',
    props,
    methods: [],
    filePath,
  };
}
