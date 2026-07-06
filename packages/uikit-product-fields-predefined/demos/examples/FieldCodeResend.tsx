import { FieldCode } from '@ds/uikit-product-fields-predefined';
import { useEffect, useState } from 'react';

const RESEND_COUNTDOWN_SECONDS = 10;

export function FieldCodeResend() {
  const [value, setValue] = useState('');
  const [secondsToNextResend, setSecondsToNextResend] = useState(RESEND_COUNTDOWN_SECONDS);

  useEffect(() => {
    if (secondsToNextResend <= 0) {
      return;
    }

    const timerId = window.setTimeout(() => setSecondsToNextResend(seconds => seconds - 1), 1000);

    return () => window.clearTimeout(timerId);
  }, [secondsToNextResend]);

  const handleResend = () => {
    setValue('');
    setSecondsToNextResend(RESEND_COUNTDOWN_SECONDS);
  };

  return (
    <FieldCode
      codeLength={6}
      label='Код подтверждения'
      value={value}
      onChange={setValue}
      resendCode={{ onResend: handleResend, secondsToNextResend }}
    />
  );
}
