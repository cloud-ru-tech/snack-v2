import { VARIANT } from './constants';
import {
  TruncateStringEnd,
  TruncateStringEndProps,
  TruncateStringMiddle,
  TruncateStringMiddleProps,
} from './helperComponents';

export type TruncateStringProps =
  | ({
      /** Вариант обрезания строки: `End` - с конца */
      variant?: typeof VARIANT.End;
    } & TruncateStringEndProps)
  | ({
      /** `Middle` - по середине */
      variant: typeof VARIANT.Middle;
    } & TruncateStringMiddleProps);

export function TruncateString({ variant = VARIANT.End, ...props }: TruncateStringProps) {
  switch (variant) {
    case VARIANT.Middle: {
      return <TruncateStringMiddle {...props} />;
    }

    case VARIANT.End:
    default: {
      return <TruncateStringEnd {...props} />;
    }
  }
}
