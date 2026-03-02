import { KeyboardEventHandler, MouseEventHandler, ReactElement, RefObject } from 'react';

type ButtonRef = RefObject<HTMLButtonElement | null>;

type RenderActiveButtonProps = {
  key: string;
  ref: ButtonRef;
  tabIndex: number;
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type RenderInactiveButtonProps = {
  key: string;
};

export type InactiveItem = {
  active: false;
  id: string;
  render(props: RenderInactiveButtonProps): ReactElement;
  show: boolean;
};

export type ActiveItem = {
  active: true;
  id: string;
  ref: ButtonRef;
  show: boolean;
  render(props: RenderActiveButtonProps): ReactElement;
};

export type ButtonProps = InactiveItem | ActiveItem;
