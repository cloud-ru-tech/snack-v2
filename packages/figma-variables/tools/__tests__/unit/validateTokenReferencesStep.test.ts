import { describe, expect, it } from 'vitest';

import { validateTokenReferencesStep } from '../../builders/pipeline/validateTokenReferences.js';

describe('validateTokenReferencesStep', () => {
  it('should return no errors when excludeGroups is empty', () => {
    const result = validateTokenReferencesStep({ tokenSets: [] }, { excludeGroups: undefined });
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it('should return no errors when excludeGroups is empty array', () => {
    const result = validateTokenReferencesStep(
      {
        tokenSets: [
          {
            group: '02_adaptive',
            name: 'desktop',
            path: '02_adaptive/desktop',
            content: { sn: { adaptive: { ref: { $value: '{sn.06_acrylic.x}' } } } },
          },
        ],
      },
      { excludeGroups: [] },
    );
    expect(result.errors).toHaveLength(0);
  });

  it('should delegate to validateTokenReferences and return errors when token references excluded group', () => {
    const result = validateTokenReferencesStep(
      {
        tokenSets: [
          {
            group: '02_adaptive',
            name: 'desktop',
            path: '02_adaptive/desktop',
            content: {
              sn: {
                adaptive: {
                  ref: { $type: 'number', $value: '{sn.06_acrylic.opacity}' },
                },
              },
            },
          },
        ],
      },
      { excludeGroups: ['06_acrylic'] },
    );
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain('06_acrylic');
  });
});
