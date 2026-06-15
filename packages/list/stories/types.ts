import { STORY_EMPTY_STATE, STORY_SELECTION } from './constants';

export type StoryEmptyState = (typeof STORY_EMPTY_STATE)[keyof typeof STORY_EMPTY_STATE];
export type StorySelection = (typeof STORY_SELECTION)[keyof typeof STORY_SELECTION];
