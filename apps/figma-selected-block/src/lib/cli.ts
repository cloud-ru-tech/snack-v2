#!/usr/bin/env node
/**
 * CLI wrapper for generateSelectedBlock.
 *
 * Inputs (one of):
 *   --css-file <path>   Read CSS from a file.
 *   --css <string>      Inline CSS string.
 *   (no flag + stdin)   Read JSON {css, varNames?, componentHint?} or raw CSS from stdin.
 *
 * Flags:
 *   --component <name>  Component hint (overrides inference).
 *   --format scss|json  Output format (default: scss).
 *
 * Exit codes:
 *   0 — ok.
 *   1 — parse error (bad args, unreadable file, invalid JSON).
 *   2 — component could not be inferred (output uses generic "component" fallback).
 */

import { readFileSync } from 'node:fs';
import { fetchSelectedBlockFromFigma, generateSelectedBlock } from './index';
import type { SelectedBlockInput } from './index';

interface CliArgs {
  cssFile?: string;
  css?: string;
  nodeRef?: string;
  token?: string;
  component?: string;
  variant?: Record<string, string>;
  format: 'scss' | 'json';
  help: boolean;
}

function parseVariantFlag(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of raw.split(',')) {
    const m = part.trim().match(/^([A-Za-z0-9_-]+)\s*=\s*(.+)$/);
    if (m) out[m[1]] = m[2].trim();
  }
  if (Object.keys(out).length === 0) {
    throw new Error(`--variant expects "key=value[,key=value]", got "${raw}"`);
  }
  return out;
}

function parseArgs(argv: string[]): CliArgs {
  const out: CliArgs = { format: 'scss', help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      const v = argv[++i];
      if (v == null) throw new Error(`Missing value for ${a}`);
      return v;
    };
    switch (a) {
      case '--css-file':
        out.cssFile = next();
        break;
      case '--css':
        out.css = next();
        break;
      case '--url':
      case '--node-ref':
        out.nodeRef = next();
        break;
      case '--token':
        out.token = next();
        break;
      case '--component':
        out.component = next();
        break;
      case '--variant':
        out.variant = parseVariantFlag(next());
        break;
      case '--format': {
        const v = next();
        if (v !== 'scss' && v !== 'json') {
          throw new Error(`--format must be "scss" or "json", got "${v}"`);
        }
        out.format = v;
        break;
      }
      case '-h':
      case '--help':
        out.help = true;
        break;
      default:
        throw new Error(`Unknown argument: ${a}`);
    }
  }
  return out;
}

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    process.stdin.on('data', c => chunks.push(c));
    process.stdin.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    process.stdin.on('error', reject);
  });
}

const HELP = `figma-selected-block — generate Block 3 SCSS for a Figma-selected node.

Usage:
  figma-selected-block --url <figma-url>  [--component <name>] [--token <pat>]
  figma-selected-block --node-ref <fileKey/nodeId>
  figma-selected-block --css-file <path>  [--component <name>] [--format scss|json]
  figma-selected-block --css "<css>"      [--component <name>]
  echo '{"css":"..."}' | figma-selected-block [--format json]

Modes:
  --url / --node-ref   Fetch node via Figma REST API. Needs FIGMA_TOKEN (or --token).
                       If the token has file_variables:read scope — variable names
                       resolve directly. Otherwise falls back to heuristic
                       reconstruction from component anatomy (works when the URL
                       points at a COMPONENT/INSTANCE/COMPONENT_SET and --variant
                       is supplied for nested frames, e.g. --variant size=xs).
                       Best-effort CSS synthesis: paddings, gap, border-radius,
                       border-width, min/max width/height, solid fills.
  --css / --css-file   Use provided CSS string (the MCP / plugin path).
  (stdin)              JSON {css, varNames?, componentHint?} or raw CSS.

Additional flags:
  --component <name>   Component hint (required if heuristic can't detect it).
  --variant key=val[,…] Variant axes for heuristic (size=xs, appearance=neutral).

Emits \`@include base.composite-var(...)\` calls and filtered raw-style lines
against \`@ds/figma-variables\`.`;

async function main() {
  let args: CliArgs;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (e) {
    process.stderr.write(`error: ${(e as Error).message}\n\n${HELP}\n`);
    process.exit(1);
  }
  if (args.help) {
    process.stdout.write(HELP + '\n');
    process.exit(0);
  }

  // Figma REST path: short-circuits stdin/css handling.
  if (args.nodeRef) {
    try {
      const result = await fetchSelectedBlockFromFigma(args.nodeRef, {
        token: args.token,
        componentHint: args.component,
        variant: args.variant,
      });
      if (args.format === 'json') {
        process.stdout.write(JSON.stringify(result, null, 2) + '\n');
      } else {
        process.stdout.write(result.scss + '\n');
        for (const w of result.warnings) {
          process.stderr.write(`warn: ${w}\n`);
        }
      }
      process.exit(result.componentName === 'component' ? 2 : 0);
    } catch (e) {
      process.stderr.write(`error: ${(e as Error).message}\n`);
      process.exit(1);
    }
  }

  let input: SelectedBlockInput;
  try {
    if (args.cssFile) {
      input = {
        css: readFileSync(args.cssFile, 'utf8'),
        componentHint: args.component,
      };
    } else if (args.css != null) {
      input = { css: args.css, componentHint: args.component };
    } else if (!process.stdin.isTTY) {
      const raw = await readStdin();
      const trimmed = raw.trim();
      if (!trimmed) throw new Error('empty stdin');
      if (trimmed.startsWith('{')) {
        const parsed = JSON.parse(trimmed) as Partial<SelectedBlockInput>;
        if (typeof parsed.css !== 'string') {
          throw new Error('stdin JSON must have "css" string field');
        }
        input = {
          css: parsed.css,
          varNames: parsed.varNames,
          componentHint: parsed.componentHint ?? args.component,
        };
      } else {
        input = { css: trimmed, componentHint: args.component };
      }
    } else {
      process.stderr.write(HELP + '\n');
      process.exit(1);
      return;
    }
  } catch (e) {
    process.stderr.write(`error: ${(e as Error).message}\n`);
    process.exit(1);
    return;
  }

  const result = generateSelectedBlock(input);

  if (args.format === 'json') {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  } else {
    process.stdout.write(result.scss + '\n');
    for (const w of result.warnings) {
      process.stderr.write(`warn: ${w}\n`);
    }
  }
  if (result.componentName === 'component') {
    process.exit(2);
  }
  process.exit(0);
}

main().catch(e => {
  process.stderr.write(`fatal: ${(e as Error).stack || e}\n`);
  process.exit(1);
});
