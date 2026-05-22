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
  | { type: typeof STATE.Loading }
  | ({ type: typeof STATE.NotFound } & ActionButtonProps & BlockProps)
  | ({ type: typeof STATE.NoData } & ActionButtonProps & BlockPropsWithIcon)
  | ({ type: typeof STATE.DataError } & ActionButtonProps & BlockPropsWithIcon);
