import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { useState } from 'react';

import {
  DEFAULT_PLATFORM_OPTION,
  DEFAULT_PROJECT_OPTION,
  PLATFORM_OPTIONS_BY_ID,
  PLATFORM_SELECTOR_ITEMS,
  PROJECT_DESCRIPTION,
  PROJECT_OPTIONS_BY_ID,
  PROJECT_SELECTOR_ITEMS,
} from './constants';
import { PlatformSelector } from './helperComponents/PlatformSelector';

/** Слот `leftTop` для WithSampleContent: platform selector + project selector на mobile (Figma drawer mobile). */
export function LeftTopSlot() {
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);

  const [platformId, setPlatformId] = useState(DEFAULT_PLATFORM_OPTION.id);
  const [projectId, setProjectId] = useState(DEFAULT_PROJECT_OPTION.id);

  const selectedPlatform = PLATFORM_OPTIONS_BY_ID[platformId] ?? DEFAULT_PLATFORM_OPTION;
  const selectedProject = PROJECT_OPTIONS_BY_ID[projectId] ?? DEFAULT_PROJECT_OPTION;

  return (
    <>
      <PlatformSelector
        label={selectedPlatform.label}
        description={selectedPlatform.description}
        variant={selectedPlatform.variant}
        items={PLATFORM_SELECTOR_ITEMS}
        value={platformId}
        onChange={id => setPlatformId(String(id))}
      />

      {isMobile ? (
        <PlatformSelector
          label={selectedProject.label}
          description={PROJECT_DESCRIPTION}
          avatarName={selectedProject.label}
          items={PROJECT_SELECTOR_ITEMS}
          value={projectId}
          onChange={id => setProjectId(String(id))}
          data-test-id='project-selector'
        />
      ) : null}
    </>
  );
}
