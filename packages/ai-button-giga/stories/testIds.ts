import { TEST_IDS as COMPONENT_TEST_IDS } from '../src/constants';

export const TEST_IDS = {
  outline: {
    root: COMPONENT_TEST_IDS.outline,
    disabled: 'outline-disabled',
    disabledLoading: 'outline-disabled-loading',
    loading: 'outline-loading',
    submit: 'outline-submit',
    customIcon: 'giga-custom-icon',
  },
  function: {
    root: COMPONENT_TEST_IDS.function,
    disabled: 'function-disabled',
    disabledLoading: 'function-disabled-loading',
    loading: 'function-loading',
    submit: 'function-submit',
  },
  mama: {
    root: COMPONENT_TEST_IDS.mama,
    disabled: 'mama-disabled',
    disabledLoading: 'mama-disabled-loading',
    loading: 'mama-loading',
    submit: 'mama-submit',
  },
} as const;
