import { expect, test } from '../../../playwright/fixtures';
import { ROLE } from '../src/components/Track/constants';
import { trackPlaygroundGotoOptions } from './helpers';

test.describe('Timeline Track', () => {
  test('should render track with default role', async ({ gotoStory, getByTestId }) => {
    await gotoStory(trackPlaygroundGotoOptions());

    const track = getByTestId('timeline-track');
    await expect(track).toBeVisible();
    await expect(track).toHaveAttribute('data-position', ROLE.Start);
  });

  test.describe('Roles', () => {
    for (const role of Object.values(ROLE)) {
      test(`should render with role ${role}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(trackPlaygroundGotoOptions({ trackRole: role }));

        const track = getByTestId('timeline-track');
        await expect(track).toHaveAttribute('data-position', role);
      });
    }
  });
});
