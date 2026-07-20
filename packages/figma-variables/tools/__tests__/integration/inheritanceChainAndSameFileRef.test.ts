import fs from 'fs/promises';

import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { buildTokensFromNode } from '../../index.js';
import type { NodeConfig } from '../../types.js';

const FIXTURES_DIR = path.join(__dirname, '../fixtures/inheritance-chain');
const OUTPUT_DIR = path.join(__dirname, '../fixtures/inheritance-chain-out');

describe('integration: inheritance chain (length ≥ 3) and same-file reference', () => {
  beforeAll(async () => {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  });

  afterAll(async () => {
    try {
      await fs.rm(OUTPUT_DIR, { recursive: true });
    } catch {
      // ignore
    }
  });

  it('should build without errors when tokens have chain of references (block → brand → primitive)', async () => {
    const config: Partial<NodeConfig> = {
      input: FIXTURES_DIR,
      output: OUTPUT_DIR,
      formats: ['css'],
    };

    const result = await buildTokensFromNode(config as NodeConfig);

    expect(result.errors).toBeUndefined();
  });

  it('should generate CSS with correct var() chains and px fallbacks for dimension (chain length ≥ 3)', async () => {
    const config: Partial<NodeConfig> = {
      input: FIXTURES_DIR,
      output: OUTPUT_DIR,
      formats: ['css'],
    };

    await buildTokensFromNode(config as NodeConfig);

    const componentsCssPath = path.join(OUTPUT_DIR, 'css/components/block.css');
    const content = await fs.readFile(componentsCssPath, 'utf-8');

    // block.s.borderRadius → brand.anatomy.radius.block.s → primitive.dimension.8 → fallback 8px
    expect(content).toMatch(/--sn-block-anatomy-s-borderRadius:\s*var\(/);
    expect(content).toContain('8px');
    expect(content).not.toMatch(/var\([^)]*,\s*8\)\s*;/); // no bare "8" as fallback for dimension

    // block.s.padding → adaptive.spacing.interval.s → primitive.dimension.8
    expect(content).toMatch(/--sn-block-anatomy-s-padding:\s*var\(/);
  });

  it('should generate CSS for component with same-file reference (tooltip pointer.padding → container.borderRadius)', async () => {
    const config: Partial<NodeConfig> = {
      input: FIXTURES_DIR,
      output: OUTPUT_DIR,
      formats: ['css'],
    };

    await buildTokensFromNode(config as NodeConfig);

    const tooltipCssPath = path.join(OUTPUT_DIR, 'css/components/tooltip.css');
    const content = await fs.readFile(tooltipCssPath, 'utf-8');

    // container.borderRadius references brand
    expect(content).toMatch(/--sn-tooltip-anatomy-container-borderRadius:\s*var\(/);
    // pointer.padding references container.borderRadius (same file)
    expect(content).toMatch(/--sn-tooltip-anatomy-pointer-padding:\s*var\(--sn-tooltip-anatomy-container-borderRadius/);
  });
});
