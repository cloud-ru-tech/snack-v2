import { InfoBlockProps } from '@ds/info-block';

import { STATE } from './constants';

type ActionButtonProps = {
  /** Лейбл кнопки-действия */
  actionLabel?: string;
  /** Действие при клике по кнопке */
  onActionClick?(): void;
};

type BlockProps = Pick<InfoBlockProps, 'description'>;
type BlockPropsWithIcon = Pick<InfoBlockProps, 'description' | 'icon'>;

export type DropdownState =
  | { type: STATE.Loading }
  | ({ type: STATE.NotFound } & ActionButtonProps & BlockProps)
  | ({ type: STATE.NoData } & ActionButtonProps & BlockPropsWithIcon)
  | ({ type: STATE.DataError } & ActionButtonProps & BlockPropsWithIcon);
