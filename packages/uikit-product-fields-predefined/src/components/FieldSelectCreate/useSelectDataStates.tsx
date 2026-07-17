import { APPEARANCE, Button, ICON_POSITION, VIEW } from '@ds/button';
import { FieldSelectSingleProps } from '@ds/fields';
import { CrossCircleSVG, SearchSVG, UpdateSVG } from '@ds/icons/interface/system';
import { useMemo } from 'react';

import { TEST_IDS } from '../../constants';
import { fieldsPredefinedLocale } from '../../locale';
import { EntityIcon, EntityName } from './types';
import { capitalize } from './utils';

type Props = {
  entityName: EntityName;
  entityIcon?: EntityIcon;
  onRefetch?(): void;
};

type SelectDataStates = Pick<FieldSelectSingleProps, 'noDataState' | 'noResultsState' | 'errorDataState'>;

/** Строит пустые/ошибочные состояния дроплиста из `entityName` (единственное/множественное число). */
export function useSelectDataStates({ entityName, entityIcon, onRefetch }: Props): SelectDataStates {
  const { t } = fieldsPredefinedLocale.useTranslations();

  return useMemo(
    () => ({
      noDataState: {
        icon: { icon: entityIcon ?? SearchSVG, appearance: 'green' },
        description: `${capitalize(entityName.plural)} ${t('FieldSelectCreate.noData')}`,
      },
      noResultsState: {
        icon: { icon: SearchSVG, appearance: 'green' },
        description: (
          <>
            {capitalize(entityName.plural)} {t('FieldSelectCreate.noResult')}.
            <br />
            {t('FieldSelectCreate.changeRequest')} {entityName.single.toLocaleLowerCase()}
          </>
        ),
      },
      errorDataState: {
        icon: { icon: CrossCircleSVG, appearance: 'neutral' },
        description: `${t('FieldSelectCreate.loadError')} ${entityName.plural.toLocaleLowerCase()}`,
        footer: onRefetch ? (
          <Button
            view={VIEW.Tonal}
            appearance={APPEARANCE.Neutral}
            label={t('FieldSelectCreate.refetch')}
            icon={<UpdateSVG />}
            iconPosition={ICON_POSITION.After}
            onClick={onRefetch}
            data-test-id={TEST_IDS.fieldSelectCreateRetry}
          />
        ) : undefined,
      },
    }),
    [entityIcon, entityName, onRefetch, t],
  );
}
