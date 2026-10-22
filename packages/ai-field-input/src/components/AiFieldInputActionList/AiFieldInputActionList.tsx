import { ReactElement } from 'react';

import { ActionListPanel } from '../../helperComponents';
import { AiFieldInputActionListProps } from '../../types';

export function AiFieldInputActionList(props: AiFieldInputActionListProps): ReactElement {
  return <ActionListPanel {...props} />;
}
