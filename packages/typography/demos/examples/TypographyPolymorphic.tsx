import { Typography } from '@ds/typography';

export function TypographyPolymorphic() {
  return (
    <Typography as='span' variant='body'>
      Body внутри inline-потока
    </Typography>
  );
}
