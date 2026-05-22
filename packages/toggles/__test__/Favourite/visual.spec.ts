import { buildFavouriteStory, TEST_IDS } from '../_shared/helpers';
import { registerToggleVisualSuite } from '../_shared/visualSuite';

registerToggleVisualSuite({ name: 'Favourite', ids: TEST_IDS.favourite, buildStory: buildFavouriteStory });
