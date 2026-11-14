import { Button } from '@ds/button';
import { InputPrivate, TYPE } from '@ds/input-private';
import { Meta, StoryObj } from '@storybook/react';
import { FormEventHandler, useState } from 'react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

function RegistrationErrorForm() {
  const [error, setError] = useState(false);
  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setError(true);
  };

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>RegistrationError</DemoTitle>
        <DemoHint>Проверка прокрутки длинного email после отправки формы в Chromium.</DemoHint>
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <InputPrivate
            type={TYPE.Email}
            value='cloudtest+registration-existing-account@example.com'
            aria-label='Email'
            data-test-id={TEST_IDS.root}
          />
          <Button type='submit' label='Continue' data-test-id={TEST_IDS.registrationSubmit} />
          {error && (
            <p role='alert' data-test-id={TEST_IDS.registrationError}>
              An account with this email already exists
            </p>
          )}
        </form>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof InputPrivate> = {
  title: 'Components/InputPrivate/Tests/RegistrationError',
  component: InputPrivate,
  parameters: { layout: 'fullscreen', figma: { disable: true }, controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof InputPrivate>;

export const RegistrationError: Story = {
  tags: ['test'],
  render: () => <RegistrationErrorForm />,
};
