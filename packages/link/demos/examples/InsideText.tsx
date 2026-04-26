import { Link } from '@ds/link';

export function InsideText() {
  return (
    <p>
      Подробнее читайте <Link insideText text='в документации' href='https://example.com' />, а также ознакомьтесь с{' '}
      <Link insideText underlined text='условиями' href='https://example.com/terms' />.
    </p>
  );
}
