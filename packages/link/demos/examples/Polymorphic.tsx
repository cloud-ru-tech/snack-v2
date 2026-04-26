import { Link } from '@ds/link';

export function Polymorphic() {
  return <Link as='button' type='button' text='Открыть диалог' onClick={() => alert('clicked')} />;
}
