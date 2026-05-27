export const SIZE = {
  S: 's',
  M: 'm',
} as const;

const PREFIX = 'attachment';

export const TEST_IDS = {
  root: PREFIX,
  rootSquare: `${PREFIX}-square`,
  icon: `${PREFIX}__icon`,
  image: `${PREFIX}__image`,
  loading: `${PREFIX}__loading`,
  loadingSquare: `${PREFIX}-square__loading`,
  retryAction: `${PREFIX}__retry-action`,
  deleteAction: `${PREFIX}__delete-action`,
  downloadAction: `${PREFIX}__download-action`,
  title: `${PREFIX}__title`,
  description: `${PREFIX}__description`,
  error: `${PREFIX}__error`,
} as const;
