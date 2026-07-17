import { describe, expect, it } from 'vitest';

import { normalizeTokenReferences } from '../normalizeTokenReferences.js';

describe('normalizeTokenReferences', () => {
  it('should fix effect.shadow references to theme.effect.shadow', () => {
    const input = {
      boxShadow: {
        elevation: {
          level1: {
            $type: 'boxShadow',
            $value: [
              {
                x: '{sn.effect.shadow.level1.layer1.positionX}',
                y: '{sn.effect.shadow.level1.layer1.positionY}',
                blur: '{sn.effect.shadow.level1.layer1.blur}',
                spread: '{sn.effect.shadow.level1.layer1.speed}',
                color: '{sn.effect.shadow.layer1Color}',
                type: 'dropShadow',
              },
            ],
          },
        },
      },
    };

    const result = normalizeTokenReferences(input) as typeof input;

    expect(result.boxShadow.elevation.level1.$value[0].x).toBe('{sn.theme.effect.shadow.level1.layer1.positionX}');
    expect(result.boxShadow.elevation.level1.$value[0].y).toBe('{sn.theme.effect.shadow.level1.layer1.positionY}');
    expect(result.boxShadow.elevation.level1.$value[0].color).toBe('{sn.theme.effect.shadow.layer1Color}');
  });

  it('should fix forGradient color references to theme.color.forGradient', () => {
    const input = {
      gradient: {
        skeleton: {
          $type: 'gradient',
          $value:
            'linear-gradient(90deg, rgba({sn.color.forGradient.skeleton.a}, 1), rgba({sn.color.forGradient.skeleton.b}, 0))',
        },
      },
    };

    const result = normalizeTokenReferences(input) as typeof input;

    expect(result.gradient.skeleton.$value).toBe(
      'linear-gradient(90deg, rgba({sn.theme.color.forGradient.skeleton.a}, 1), rgba({sn.theme.color.forGradient.skeleton.b}, 0))',
    );
  });

  it('should handle nested objects and arrays', () => {
    const input = {
      level1: {
        level2: [
          {
            value: '{sn.effect.shadow.test}',
          },
        ],
      },
    };

    const result = normalizeTokenReferences(input) as typeof input;

    expect(result.level1.level2[0].value).toBe('{sn.theme.effect.shadow.test}');
  });

  it('should not modify other token references', () => {
    const input = {
      color: '{sn.primitive.color.red}',
      size: '{sn.adaptive.size.m}',
    };

    const result = normalizeTokenReferences(input);

    expect(result.color).toBe('{sn.primitive.color.red}');
    expect(result.size).toBe('{sn.adaptive.size.m}');
  });
});
