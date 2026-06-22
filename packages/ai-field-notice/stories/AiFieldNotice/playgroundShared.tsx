import { SIZE, VARIANT } from '@ds/ai-field-notice';
import { Meta } from '@storybook/react';
import { fn } from 'storybook/test';

import { FIXTURE_QUEUE_STEPS, FIXTURE_VM } from './fixtures';
import type { PlaygroundStoryArgs } from './playgroundTypes';
import { TEST_IDS } from './testIds';

export const playgroundArgs: PlaygroundStoryArgs = {
  size: SIZE.S,
  variant: VARIANT.Password,
  queue: {
    steps: FIXTURE_QUEUE_STEPS,
    open: false,
  },
  vmName: FIXTURE_VM.name,
  vmIp: FIXTURE_VM.ip,
  'data-test-id': TEST_IDS.root,
  onActionClick: fn(),
};

export const playgroundArgTypes: Meta<PlaygroundStoryArgs>['argTypes'] = {
  size: {
    control: 'inline-radio',
    options: Object.values(SIZE),
  },
  variant: {
    control: 'select',
    options: Object.values(VARIANT),
  },
  vmName: {
    control: 'text',
    if: { arg: 'variant', eq: VARIANT.VmAgent },
  },
  vmIp: {
    control: 'text',
    if: { arg: 'variant', eq: VARIANT.VmAgent },
  },
  queue: {
    control: 'object',
    if: { arg: 'variant', eq: VARIANT.Queue },
  },
  onActionClick: { table: { disable: true } },
};
