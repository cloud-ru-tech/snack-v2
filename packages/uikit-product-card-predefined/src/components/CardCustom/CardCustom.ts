import { Body, BodyProps as BodyComponentProps } from './Body';
import { Footer } from './Footer';
import { FunctionBadge, FunctionBadgeProps as FunctionBadgeComponentProps } from './FunctionBadge';
import { Header, HeaderProps as HeaderComponentProps } from './Header';
import { Image, ImageProps as ImageComponentProps } from './Image';

export { MODE } from './Image/constants';

// import/export: declaration merging — const и одноимённый namespace `CardCustom`
// (compound API), правило видит два экспорта одного имени и не понимает слияние.
// eslint-disable-next-line import/export
export const CardCustom = {} as {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
  Image: typeof Image;
  FunctionBadge: typeof FunctionBadge;
};

CardCustom.Header = Header;
CardCustom.Body = Body;
CardCustom.Footer = Footer;
CardCustom.Image = Image;
CardCustom.FunctionBadge = FunctionBadge;

// import/export: тот же declaration merging — namespace дополняет const `CardCustom`
// публичными типами-членами компаунда.
// eslint-disable-next-line import/export
export namespace CardCustom {
  export type HeaderProps = HeaderComponentProps;
  export type BodyProps = BodyComponentProps;
  export type FooterActionProps = Footer.ActionProps;
  export type FooterPromoProps = Footer.PromoProps;
  export type FooterCallToActionProps = Footer.CallToActionProps;
  export type ImageProps = ImageComponentProps;
  export type FunctionBadgeProps = FunctionBadgeComponentProps;
}
