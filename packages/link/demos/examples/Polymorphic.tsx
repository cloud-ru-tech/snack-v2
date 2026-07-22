import { Link } from '@ds/link';

export function Polymorphic() {
  return <Link as='button' type='button' label='Открыть диалог' onClick={() => alert('clicked')} />;
}
