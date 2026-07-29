import { ButtonProps } from '@ds/button';
import { ModalCustomProps } from '@ds/modal';
import { TooltipProps } from '@ds/tooltip';
import { WithSupportProps } from '@ds/utils';
import { PropsWithChildren, ReactNode } from 'react';

import { ButtonPrimaryVariant, ButtonSecondaryVariant } from '../../types';
import { HeadlineProps } from '../Headline';

export type DesktopPageFormProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'subtitle'> & {
      className?: string;

      /** Закрепляет футер внизу формы при прокрутке контента. */
      stickyFooter?: boolean;

      stepper?: ReactNode;

      priceSummary?: {
        total: ReactNode;
        content?: ReactNode;
      };

      sideBlock?: {
        label: string;
        content: ReactNode;
        /**
         * Только mobile: высота листа sideBlock'а (snap-точки `BottomSheet`). `[1]` — на всю высоту.
         * По умолчанию — по высоте контента (fit-content).
         */
        snapPoints?: ModalCustomProps['snapPoints'];
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
