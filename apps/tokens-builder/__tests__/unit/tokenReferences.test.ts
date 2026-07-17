import { describe, expect, it } from 'vitest';

import { validateTokenReferences } from '../../src/validators/tokenReferences.js';

describe('validateTokenReferences', () => {
  it('should return no errors when excludeGroups is empty', () => {
    const tokenSets = [
      {
        group: '01_primitive',
        name: 'primitive',
        path: '01_primitive/primitive',
        content: {
          sn: {
            primitive: {
              dimension: {
                16: { $type: 'number', $value: '{sn.06_acrylic.something}' },
              },
            },
          },
        },
      },
    ];
    const result = validateTokenReferences(tokenSets, []);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it('should return error when token references excluded group', () => {
    const tokenSets = [
      {
        group: '02_adaptive',
        name: 'desktop',
        path: '02_adaptive/desktop',
        content: {
          sn: {
            adaptive: {
              size: {
                xs: { $type: 'number', $value: '{sn.primitive.dimension.16}' },
              },
            },
          },
        },
      },
      {
        group: '06_acrylic',
        name: 'no',
        path: '06_acrylic/no',
        content: {},
      },
    ];
    const result = validateTokenReferences(tokenSets, ['06_acrylic']);
    expect(result.errors).toHaveLength(0);
  });

  it('should return error when token in non-excluded set references excluded group', () => {
    const tokenSets = [
      {
        group: '02_adaptive',
        name: 'desktop',
        path: '02_adaptive/desktop',
        content: {
          sn: {
            adaptive: {
              ref: {
                $type: 'number',
                $value: '{sn.06_acrylic.opacity}',
              },
            },
          },
        },
      },
    ];
    const result = validateTokenReferences(tokenSets, ['06_acrylic']);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain('06_acrylic');
  });

  it('should skip token sets that are in excludeGroups', () => {
    const tokenSets = [
      {
        group: '06_acrylic',
        name: 'no',
        path: '06_acrylic/no',
        content: {
          sn: {
            '06_acrylic': {
              opacity: { $type: 'number', $value: 100 },
            },
          },
        },
      },
    ];
    const result = validateTokenReferences(tokenSets, ['06_acrylic']);
    expect(result.errors).toHaveLength(0);
  });

  it('should skip token sets without content', () => {
    const tokenSets = [
      {
        group: '02_adaptive',
        name: 'desktop',
        path: '02_adaptive/desktop',
      },
    ];
    const result = validateTokenReferences(tokenSets, ['06_acrylic']);
    expect(result.errors).toHaveLength(0);
  });
});
