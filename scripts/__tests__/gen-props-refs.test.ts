import * as ts from 'typescript';
import { describe, expect, it } from 'vitest';

import { collectNamedRefsFromNode, type TypeRefMap } from '../gen-props-refs.mts';

// Путь с `/packages/` — иначе сборщик отсекает тип как внешний.
const FILE = '/virtual/packages/demo/src/types.ts';

const SOURCE = `
export type Size = 's' | 'm';
export type Appearance = 'primary' | 'neutral';
export type BannerProps = { size?: Size; appearance?: Appearance; label: string };
export type WrapperProps = { banner?: BannerProps['size'] };

export type Props = {
  plain?: Size;
  indexed?: BannerProps['size'];
  chained?: WrapperProps['banner'];
  nested?: { appearance?: BannerProps['appearance'] };
};
`;

function refsOf(propName: string): string[] {
  const host = ts.createCompilerHost({});
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (name, lang) =>
    name === FILE ? ts.createSourceFile(name, SOURCE, lang) : getSourceFile(name, lang);
  host.fileExists = name => name === FILE || ts.sys.fileExists(name);

  const program = ts.createProgram([FILE], { strict: true, noEmit: true }, host);
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(FILE) as ts.SourceFile;

  const props = sourceFile.statements.find(
    (s): s is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(s) && s.name.text === 'Props',
  );
  if (!props || !ts.isTypeLiteralNode(props.type)) throw new Error('Props type literal not found');
  const member = props.type.members.find(
    (m): m is ts.PropertySignature => ts.isPropertySignature(m) && m.name.getText(sourceFile) === propName,
  );
  if (!member?.type) throw new Error(`prop ${propName} not found`);

  const out: TypeRefMap = new Map();
  collectNamedRefsFromNode(checker, member.type, out);
  return [...out.keys()].sort();
}

describe('collectNamedRefsFromNode', () => {
  it('collects a plain type reference', () => {
    expect(refsOf('plain')).toEqual(['Size']);
  });

  it("resolves X['field'] to the field type, not the whole X", () => {
    expect(refsOf('indexed')).toEqual(['Size']);
  });

  it('follows a chain of indexed accesses to the final named type', () => {
    expect(refsOf('chained')).toEqual(['Size']);
  });

  it('keeps the alias of a literal union inside a nested object', () => {
    // Разрешённый тип `Appearance | undefined` схлопывается в литералы — имя берётся из объявления поля.
    expect(refsOf('nested')).toEqual(['Appearance']);
  });
});
