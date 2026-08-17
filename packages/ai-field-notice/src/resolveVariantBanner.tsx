import { Size, VARIANT as BANNER_VARIANT, Variant as BannerVariant } from '@ds/ai-field-banner';
import { HeadphonesSVG, PasswordLockSVG } from '@ds/icons/interface/product';
import { ReactElement, ReactNode } from 'react';

import { AiFieldNoticeVmInfo } from './components/AiFieldNoticeVmInfo';
import { VARIANT, VARIANT_ACTION_LABELS, VARIANT_MESSAGES } from './constants';
import { AiFieldNoticeDescriptionContent, AiFieldNoticeDescriptionListItem, Variant } from './types';

type ResolvedVariantBanner = {
  bannerVariant: BannerVariant;
  description: AiFieldNoticeDescriptionContent;
  icon?: ReactNode;
  actionLabel: string;
};

function buildSecureDescription(prompt: string): readonly AiFieldNoticeDescriptionListItem[] {
  return [VARIANT_MESSAGES.secureMode, { content: VARIANT_MESSAGES.privacy, shouldFocusOnHover: true }, prompt];
}

export function resolveVariantBanner(
  variant: Variant,
  size: Size,
  vmName?: string,
  vmIp?: string,
): ResolvedVariantBanner {
  switch (variant) {
    case VARIANT.Password:
      return {
        bannerVariant: BANNER_VARIANT.Security,
        icon: <PasswordLockSVG />,
        description: buildSecureDescription(VARIANT_MESSAGES.passwordPrompt),
        actionLabel: VARIANT_ACTION_LABELS[VARIANT.Password],
      };
    case VARIANT.Ssh:
      return {
        bannerVariant: BANNER_VARIANT.Security,
        icon: <PasswordLockSVG />,
        description: buildSecureDescription(VARIANT_MESSAGES.sshPrompt),
        actionLabel: VARIANT_ACTION_LABELS[VARIANT.Ssh],
      };
    case VARIANT.Support:
      return {
        bannerVariant: BANNER_VARIANT.Help,
        icon: <HeadphonesSVG />,
        description: VARIANT_MESSAGES.support,
        actionLabel: VARIANT_ACTION_LABELS[VARIANT.Support],
      };
    case VARIANT.VmAgent: {
      const vmInfo = (<AiFieldNoticeVmInfo vmName={vmName ?? ''} vmIp={vmIp ?? ''} size={size} />) as ReactElement;

      return {
        bannerVariant: BANNER_VARIANT.Agentic,
        description: [VARIANT_MESSAGES.vmAgentTitle, vmInfo],
        actionLabel: VARIANT_ACTION_LABELS[VARIANT.VmAgent],
      };
    }
    case VARIANT.Queue:
      throw new Error('Queue variant is rendered directly, not via resolveVariantBanner');
    default: {
      const exhaustiveCheck: never = variant;
      throw new Error(`Unsupported variant: ${String(exhaustiveCheck)}`);
    }
  }
}
