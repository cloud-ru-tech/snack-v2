import { APPEARANCE, Avatar, SHAPE, SIZE } from '@ds/avatar';
import { DroplistProps } from '@ds/list';

export type ProjectOption = {
  id: string;
  label: string;
};

/** Demo-проекты для mobile project selector (Figma `navigationOldPlatformSelectorMobile` / project). */
export const PROJECT_OPTIONS: ProjectOption[] = [
  { id: 'project-1', label: 'Название проекта 1' },
  { id: 'project-2', label: 'Название проекта 2' },
  { id: 'project-3', label: 'Staging environment' },
];

export const PROJECT_OPTIONS_BY_ID = Object.fromEntries(PROJECT_OPTIONS.map(option => [option.id, option])) as Record<
  string,
  ProjectOption
>;

export const DEFAULT_PROJECT_OPTION = PROJECT_OPTIONS[0];

export const PROJECT_DESCRIPTION = 'Проект';

export const PROJECT_SELECTOR_ITEMS: DroplistProps['items'] = PROJECT_OPTIONS.map(option => ({
  id: option.id,
  content: { label: option.label },
  beforeContent: (
    <Avatar name={option.label} size={SIZE.S} shape={SHAPE.Squared} appearance={APPEARANCE.Neutral} showTwoSymbols />
  ),
}));
