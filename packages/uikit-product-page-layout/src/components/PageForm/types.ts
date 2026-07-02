import { ButtonProps } from '@ds/button';
import { TooltipProps } from '@ds/tooltip';
import { WithSupportProps } from '@ds/utils';
import { PropsWithChildren, ReactNode } from 'react';

import { ButtonPrimaryVariant, ButtonSecondaryVariant } from '../../types';
import { HeadlineProps } from '../Headline';

export type DesktopPageFormProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'subHeader'> & {
      className?: string;

      stepper?: ReactNode;

      /** Слот фильтров — левая колонка (304px) на desktop advanced-раскладке. На mobile рендерится сверху тела. */
      filters?: ReactNode;

      priceSummary?: {
        total: ReactNode;
        content?: ReactNode;
      };

      sideBlock?: {
        label: string;
        content: ReactNode;
      }[];

      footer?: {
        buttonPrimary: (
          | {
              variant: ButtonPrimaryVariant;
            }
          | {
              variant: 'custom';
              label: string;
            }
        ) & {
          tooltip?: TooltipProps;
        } & Omit<ButtonProps, 'label'>;
        buttonSecondary?: (
          | {
              variant: ButtonSecondaryVariant;
            }
          | {
              variant: 'custom';
              label: string;
            }
        ) & {
          tooltip?: TooltipProps;
        } & Omit<ButtonProps, 'label'>;
        buttonAdditional?: ButtonProps & {
          tooltip?: TooltipProps;
        };
      };
    }
  >
>;
