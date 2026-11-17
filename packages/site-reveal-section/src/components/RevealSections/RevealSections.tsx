'use client';

import { Children, Fragment, isValidElement } from 'react';

import { RevealSectionsProps } from '../../types';
import { RevealSection } from '../RevealSection';

export function RevealSections({ children, skipFirst = true, shouldSkip, ...revealProps }: RevealSectionsProps) {
  return (
    <>
      {Children.toArray(children).map((child, index) => {
        const key = isValidElement(child) ? child.key : index;

        if ((skipFirst && index === 0) || shouldSkip?.(child, index)) {
          return <Fragment key={key}>{child}</Fragment>;
        }

        return (
          <RevealSection key={key} {...revealProps}>
            {child}
          </RevealSection>
        );
      })}
    </>
  );
}
