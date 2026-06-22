import { AiFieldBannerProps } from '@ds/ai-field-banner';
import { AiQueueProps } from '@ds/ai-queue';
import { WithSupportProps } from '@ds/utils';
import { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';

import { DESCRIPTION_STATE, VARIANT } from './constants';

export type { Size } from '@ds/ai-field-banner';

export type Variant = (typeof VARIANT)[keyof typeof VARIANT];

export type DescriptionState = (typeof DESCRIPTION_STATE)[keyof typeof DESCRIPTION_STATE];

/** Элемент ротирующего описания. Признак `shouldFocusOnHover` — как в ChatStatusAnnouncement. */
export type AiFieldNoticeDescriptionItem = {
  content: ReactNode;
  shouldFocusOnHover?: boolean;
};

/** Элемент массива: строка/ReactNode или объект с `content` и опциональным `shouldFocusOnHover`. */
export type AiFieldNoticeDescriptionListItem = ReactNode | AiFieldNoticeDescriptionItem;

export type AiFieldNoticeDescriptionContent = ReactNode | readonly AiFieldNoticeDescriptionListItem[];

type AiFieldNoticeCommonProps = {
  /** Размер баннера. */
  size?: AiFieldBannerProps['size'];
  /** Обработчик клика по кнопке действия. Не используется при `variant='queue'`. */
  onActionClick?(event: MouseEvent<HTMLButtonElement>): void;
  /** Доп. класс корня. */
  className?: string;
};

type AiFieldNoticeQueueVariantProps = AiFieldNoticeCommonProps & {
  /** Предзашитый сценарий: password, ssh, vmAgent, support или queue. Набор пропсов зависит от значения. */
  variant: typeof VARIANT.Queue;
  /** Пропсы `AiQueue`. Только при `variant='queue'`. */
  queue: AiQueueProps;
};

type AiFieldNoticePasswordProps = AiFieldNoticeCommonProps & {
  /** Предзашитый сценарий: password, ssh, vmAgent, support или queue. Набор пропсов зависит от значения. */
  variant: typeof VARIANT.Password;
};

type AiFieldNoticeSshProps = AiFieldNoticeCommonProps & {
  /** Предзашитый сценарий: password, ssh, vmAgent, support или queue. Набор пропсов зависит от значения. */
  variant: typeof VARIANT.Ssh;
};

type AiFieldNoticeSupportProps = AiFieldNoticeCommonProps & {
  /** Предзашитый сценарий: password, ssh, vmAgent, support или queue. Набор пропсов зависит от значения. */
  variant: typeof VARIANT.Support;
};

type AiFieldNoticeVmAgentProps = AiFieldNoticeCommonProps & {
  /** Предзашитый сценарий: password, ssh, vmAgent, support или queue. Набор пропсов зависит от значения. */
  variant: typeof VARIANT.VmAgent;
  /** Имя виртуальной машины для второго кадра описания. Только при `variant='vmAgent'`. */
  vmName: string;
  /** IP-адрес виртуальной машины для второго кадра описания. Только при `variant='vmAgent'`. */
  vmIp: string;
};

export type AiFieldNoticeOwnProps =
  | AiFieldNoticePasswordProps
  | AiFieldNoticeSshProps
  | AiFieldNoticeSupportProps
  | AiFieldNoticeVmAgentProps
  | AiFieldNoticeQueueVariantProps;

export type AiFieldNoticeProps = WithSupportProps<
  AiFieldNoticeOwnProps & Omit<ComponentPropsWithoutRef<'div'>, keyof AiFieldNoticeOwnProps | 'children'>
>;

export type AiFieldNoticeDescriptionProps = {
  /** Сообщения ротирующего описания. */
  messages: readonly string[];
  /** Видимое состояние для visual matrix и тестов. */
  state: DescriptionState;
  size: AiFieldBannerProps['size'];
  /** Индекс кадра после авто-цикла. По умолчанию — последний элемент `messages`. */
  restingIndex?: number;
  /** Индекс кадра при hover. По умолчанию — `1` или последний для коротких списков. */
  hoverIndex?: number;
  className?: string;
};

export type AiFieldNoticeAnimatedDescriptionHandle = {
  onMouseEnter(): void;
  onMouseLeave(): void;
};

export type AiFieldNoticeAnimatedDescriptionProps = {
  items: readonly AiFieldNoticeDescriptionListItem[];
  size: AiFieldBannerProps['size'];
  className?: string;
};

export type AiFieldNoticeVmInfoProps = {
  /** Имя виртуальной машины. */
  vmName: string;
  /** IP-адрес виртуальной машины. */
  vmIp: string;
  size: AiFieldBannerProps['size'];
  className?: string;
};
