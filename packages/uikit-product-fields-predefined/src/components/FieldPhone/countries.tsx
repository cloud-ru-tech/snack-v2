import {
  AbkhaziaSVG,
  AfghanistanSVG,
  AlbaniaSVG,
  AlgeriaSVG,
  AndorraSVG,
  AngolaSVG,
  AntiguaAndBarbudaSVG,
  ArgentinaSVG,
  ArmeniaSVG,
  AustraliaSVG,
  AustriaSVG,
  AzerbaijanSVG,
  BahamasSVG,
  BahrainSVG,
  BangladeshSVG,
  BarbadosSVG,
  BelarusSVG,
  BelgiumSVG,
  BelizeSVG,
  BeninSVG,
  BhutanSVG,
  BosniaAndHerzegovinaSVG,
  BotswanaSVG,
  BrazilSVG,
  CambodiaSVG,
  CameroonSVG,
  CaymanIslandsSVG,
  CentralAfricanRepublicSVG,
  ChadSVG,
  ChileSVG,
  ColombiaSVG,
  CongoSVG,
  CostaRicaSVG,
  CoteDIvoireSVG,
  CroatiaSVG,
  CyprusSVG,
  DenmarkSVG,
  DjiboutiSVG,
  DominicanRepublicSVG,
  EcuadorSVG,
  EgyptSVG,
  EstoniaSVG,
  EthiopiaSVG,
  FijiSVG,
  FinlandSVG,
  FranceSVG,
  FrenchPolynesiaSVG,
  GeorgiaSVG,
  GermanySVG,
  GhanaSVG,
  GibraltarSVG,
  GreeceSVG,
  GuatemalaSVG,
  GuernseySVG,
  GuineaSVG,
  GuyanaSVG,
  HaitiSVG,
  HondurasSVG,
  HongKongSVG,
  HungarySVG,
  IcelandSVG,
  IndiaSVG,
  IndonesiaSVG,
  IranSVG,
  IraqSVG,
  IrelandSVG,
  IsleOfManSVG,
  IsraelSVG,
  ItalySVG,
  JapanSVG,
  JordanSVG,
  KazakhstanSVG,
  KenyaSVG,
  KiribatiSVG,
  KosovoSVG,
  KyrgyzstanSVG,
  LatviaSVG,
  LebanonSVG,
  LesothoSVG,
  LibyaSVG,
  LiechtensteinSVG,
  LithuaniaSVG,
  LuxembourgSVG,
  MadagascarSVG,
  MalaysiaSVG,
  MaldivesSVG,
  MaliSVG,
  MaltaSVG,
  MauritaniaSVG,
  MauritiusSVG,
  MayotteSVG,
  MoldovaSVG,
  MonacoSVG,
  MontenegroSVG,
  MoroccoSVG,
  MozambiqueSVG,
  MyanmarSVG,
  NamibiaSVG,
  NetherlandsSVG,
  NewCaledoniaSVG,
  NewZealandSVG,
  NicaraguaSVG,
  NigeriaSVG,
  NigerSVG,
  NorfolkIslandSVG,
  NorthMacedoniaSVG,
  NorwaySVG,
  OmanSVG,
  PalestineSVG,
  ParaguaySVG,
  PeruSVG,
  PolandSVG,
  PortugalSVG,
  QatarSVG,
  RomaniaSVG,
  RussiaSVG,
  RwandaSVG,
  SaintPierreAndMiquelonSVG,
  SanMarinoSVG,
  SaoTomeAndPrincipeSVG,
  SaudiArabiaSVG,
  SenegalSVG,
  SerbiaSVG,
  SierraLeoneSVG,
  SingaporeSVG,
  SintMaartenSVG,
  SlovakiaSVG,
  SomalilandSVG,
  SouthAfricaSVG,
  SouthKoreaSVG,
  SouthSudanSVG,
  SpainSVG,
  SriLankaSVG,
  SudanSVG,
  SurinameSVG,
  SwedenSVG,
  SwitzerlandSVG,
  SyriaSVG,
  TaiwanSVG,
  TajikistanSVG,
  TanzaniaSVG,
  ThailandSVG,
  TongaSVG,
  TransnistriaSVG,
  TurkeySVG,
  TurkmenistanSVG,
  TuvaluSVG,
  UgandaSVG,
  UkraineSVG,
  UnitedArabEmiratesSVG,
  UruguaySVG,
  UzbekistanSVG,
  VanuatuSVG,
  VenezuelaSVG,
  VietnamSVG,
  WallisAndFutunaSVG,
  YemenSVG,
  ZimbabweSVG,
} from './flags';

export const RUSSIA_COUNTRY_CODE = {
  value: 'russia',
  iso2: 'RU',
  mask: 'XXX XXX-XX-XX',
  caption: '+7',
  icon: RussiaSVG,
  enabled: true,
} as const;

export const ABKHAZIA_COUNTRY_CODE = {
  value: 'abkhazia',
  iso2: 'RU',
  caption: '+7',
  mask: 'XXX XXX-XX-XX',
  icon: AbkhaziaSVG,
  enabled: true,
} as const;

export const AUSTRALIA_COUNTRY_CODE = {
  value: 'australia',
  iso2: 'AU',
  caption: '+61',
  mask: 'X XXXX-XXXX',
  icon: AustraliaSVG,
  enabled: true,
} as const;

export const AUSTRIA_COUNTRY_CODE = {
  value: 'austria',
  iso2: 'AT',
  caption: '+43',
  mask: 'XXX XXX-XXXX',
  icon: AustriaSVG,
  enabled: true,
} as const;

export const AZERBAIJAN_COUNTRY_CODE = {
  value: 'azerbaijan',
  iso2: 'AZ',
  mask: 'XX XXX-XX-XX',
  caption: '+994',
  icon: AzerbaijanSVG,
  enabled: false,
} as const;

export const ALBANIA_COUNTRY_CODE = {
  value: 'albania',
  iso2: 'AL',
  caption: '+355',
  mask: 'XXX XXX-XXX',
  icon: AlbaniaSVG,
  enabled: true,
} as const;

export const ALGERIA_COUNTRY_CODE = {
  value: 'algeria',
  iso2: 'DZ',
  caption: '+213',
  mask: 'XX XXX-XXXX',
  icon: AlgeriaSVG,
  enabled: true,
} as const;

export const ANGOLA_COUNTRY_CODE = {
  value: 'angola',
  iso2: 'AO',
  caption: '+244',
  mask: 'XXX XXXX',
  icon: AngolaSVG,
  enabled: true,
} as const;

export const ANDORRA_COUNTRY_CODE = {
  value: 'andorra',
  iso2: 'AD',
  caption: '+376',
  mask: 'XXX XXXX',
  icon: AndorraSVG,
  enabled: true,
} as const;

export const ANTIGUA_AND_BARBUDA_COUNTRY_CODE = {
  value: 'antiguaAndBarbuda',
  iso2: 'AG',
  caption: '+1',
  mask: '268 XXX-XXXX',
  icon: AntiguaAndBarbudaSVG,
  enabled: true,
} as const;

export const ARMENIA_COUNTRY_CODE = {
  value: 'armenia',
  iso2: 'AM',
  mask: 'XX XXX-XXX',
  caption: '+374',
  icon: ArmeniaSVG,
  enabled: true,
} as const;

export const BAHAMAS_COUNTRY_CODE = {
  value: 'bahamas',
  iso2: 'BS',
  caption: '+1',
  mask: '242 XXX-XXXX',
  icon: BahamasSVG,
  enabled: true,
} as const;

export const BANGLADESH_COUNTRY_CODE = {
  value: 'bangladesh',
  iso2: 'BD',
  caption: '+880',
  mask: 'X XXX-XXXX',
  icon: BangladeshSVG,
  enabled: true,
} as const;

export const BARBADOS_COUNTRY_CODE = {
  value: 'barbados',
  iso2: 'BB',
  caption: '+1',
  mask: '246 XXX-XXXX',
  icon: BarbadosSVG,
  enabled: true,
} as const;

export const BAHRAIN_COUNTRY_CODE = {
  value: 'bahrain',
  iso2: 'BH',
  caption: '+973',
  mask: 'XX XXX-XXX',
  icon: BahrainSVG,
  enabled: true,
} as const;

export const BELARUS_COUNTRY_CODE = {
  value: 'belarus',
  iso2: 'BY',
  mask: 'XX XXX-XX-XX',
  caption: '+375',
  icon: BelarusSVG,
  enabled: true,
} as const;

export const BELIZE_COUNTRY_CODE = {
  value: 'belize',
  iso2: 'BZ',
  caption: '+501',
  mask: 'XXX XXXX',
  icon: BelizeSVG,
  enabled: true,
} as const;

export const BELGIUM_COUNTRY_CODE = {
  value: 'belgium',
  iso2: 'BE',
  caption: '+32',
  mask: 'XXX XXX-XXX',
  icon: BelgiumSVG,
  enabled: true,
} as const;

export const BOSNIA_AND_HERZEGOVINA_COUNTRY_CODE = {
  value: 'bosniaAndHerzegovina',
  iso2: 'BA',
  caption: '+387',
  mask: 'XX XXX-XXX',
  icon: BosniaAndHerzegovinaSVG,
  enabled: true,
} as const;

export const BOTSWANA_COUNTRY_CODE = {
  value: 'botswana',
  iso2: 'BW',
  caption: '+267',
  mask: 'XX XXX-XXX',
  icon: BotswanaSVG,
  enabled: true,
} as const;

export const BRAZIL_COUNTRY_CODE = {
  value: 'brazil',
  iso2: 'BR',
  mask: 'XX XXXXX-XXXX',
  caption: '+55',
  icon: BrazilSVG,
  enabled: true,
} as const;

export const BHUTAN_COUNTRY_CODE = {
  value: 'bhutan',
  iso2: 'BT',
  caption: '+975',
  mask: 'XX XXX-XXX',
  icon: BhutanSVG,
  enabled: true,
} as const;

export const VANUATU_COUNTRY_CODE = {
  value: 'vanuatu',
  iso2: 'VU',
  caption: '+678',
  mask: 'XXX XXXX',
  icon: VanuatuSVG,
  enabled: true,
} as const;

export const HUNGARY_COUNTRY_CODE = {
  value: 'hungary',
  iso2: 'HU',
  caption: '+36',
  mask: 'XXX XXX-XXX',
  icon: HungarySVG,
  enabled: true,
} as const;

export const GUYANA_COUNTRY_CODE = {
  value: 'guyana',
  iso2: 'GY',
  caption: '+592',
  mask: 'XXX XXXX',
  icon: GuyanaSVG,
  enabled: true,
} as const;

export const GUATEMALA_COUNTRY_CODE = {
  value: 'guatemala',
  iso2: 'GT',
  caption: '+502',
  mask: 'XXXX XXXX',
  icon: GuatemalaSVG,
  enabled: true,
} as const;

export const GERMANY_COUNTRY_CODE = {
  value: 'germany',
  iso2: 'DE',
  caption: '+49',
  mask: 'XXX XXX-XXXX',
  icon: GermanySVG,
  enabled: true,
} as const;

export const GUERNSEY_COUNTRY_CODE = {
  value: 'guernsey',
  iso2: 'GG',
  caption: '+44',
  mask: '1481 XXXXXX',
  icon: GuernseySVG,
  enabled: true,
} as const;

export const GIBRALTAR_COUNTRY_CODE = {
  value: 'gibraltar',
  iso2: 'GI',
  caption: '+350',
  mask: 'XXX XXXXX',
  icon: GibraltarSVG,
  enabled: true,
} as const;

export const HONDURAS_COUNTRY_CODE = {
  value: 'honduras',
  iso2: 'HN',
  caption: '+504',
  mask: 'XXXX XXXX',
  icon: HondurasSVG,
  enabled: true,
} as const;

export const GREECE_COUNTRY_CODE = {
  value: 'greece',
  iso2: 'GR',
  caption: '+30',
  mask: 'XXX XXX-XXXX',
  icon: GreeceSVG,
  enabled: true,
} as const;

export const GEORGIA_COUNTRY_CODE = {
  value: 'georgia',
  iso2: 'GE',
  mask: 'XXX XX-XX-XX',
  caption: '+995',
  icon: GeorgiaSVG,
  enabled: true,
} as const;

export const DENMARK_COUNTRY_CODE = {
  value: 'denmark',
  iso2: 'DK',
  caption: '+45',
  mask: 'XX XX-XX-XX',
  icon: DenmarkSVG,
  enabled: true,
} as const;

export const DJIBOUTI_COUNTRY_CODE = {
  value: 'djibouti',
  iso2: 'DJ',
  caption: '+253',
  mask: 'XXXX XXXX',
  icon: DjiboutiSVG,
  enabled: true,
} as const;

export const DOMINICAN_REPUBLIC_COUNTRY_CODE = {
  value: 'dominicanRepublic',
  iso2: 'DO',
  caption: '+1',
  mask: 'XXX XXX-XXXX',
  icon: DominicanRepublicSVG,
  enabled: true,
} as const;

export const EGYPT_COUNTRY_CODE = {
  value: 'egypt',
  iso2: 'EG',
  mask: 'XX XXXX-XXXX',
  caption: '+20',
  icon: EgyptSVG,
  enabled: true,
} as const;

export const ZIMBABWE_COUNTRY_CODE = {
  value: 'zimbabwe',
  iso2: 'ZW',
  caption: '+263',
  mask: 'XX XXX-XXXX',
  icon: ZimbabweSVG,
  enabled: true,
} as const;

export const ISRAEL_COUNTRY_CODE = {
  value: 'israel',
  iso2: 'IL',
  caption: '+972',
  mask: 'XX XXX-XXXX',
  icon: IsraelSVG,
  enabled: true,
} as const;

export const INDIA_COUNTRY_CODE = {
  value: 'india',
  iso2: 'IN',
  mask: 'XXXXX-XXXXX',
  caption: '+91',
  icon: IndiaSVG,
  enabled: true,
} as const;

export const IRAQ_COUNTRY_CODE = {
  value: 'iraq',
  iso2: 'IQ',
  caption: '+964',
  mask: 'XX XXX-XXXX',
  icon: IraqSVG,
  enabled: true,
} as const;

export const IRAN_COUNTRY_CODE = {
  value: 'iran',
  iso2: 'IR',
  mask: 'XXX XXX-XXXX',
  caption: '+98',
  icon: IranSVG,
  enabled: true,
} as const;

export const IRELAND_COUNTRY_CODE = {
  value: 'ireland',
  iso2: 'IE',
  caption: '+353',
  mask: 'XXX XXX-XXX',
  icon: IrelandSVG,
  enabled: true,
} as const;

export const ICELAND_COUNTRY_CODE = {
  value: 'iceland',
  iso2: 'IS',
  caption: '+354',
  mask: 'XXX XXXX',
  icon: IcelandSVG,
  enabled: true,
} as const;

export const SPAIN_COUNTRY_CODE = {
  value: 'spain',
  iso2: 'ES',
  caption: '+34',
  mask: 'XXX XXX-XXX',
  icon: SpainSVG,
  enabled: true,
} as const;

export const ITALY_COUNTRY_CODE = {
  value: 'italy',
  iso2: 'IT',
  caption: '+39',
  mask: 'XXX XXXX-XXX',
  icon: ItalySVG,
  enabled: true,
} as const;

export const KAZAKHSTAN_COUNTRY_CODE = {
  value: 'kazakhstan',
  iso2: 'KZ',
  mask: 'XXX XXX-XX-XX',
  caption: '+7',
  icon: KazakhstanSVG,
  enabled: true,
} as const;

export const CAYMAN_ISLANDS_COUNTRY_CODE = {
  value: 'caymanIslands',
  iso2: 'KY',
  caption: '+1',
  mask: '345 XXX-XXXX',
  icon: CaymanIslandsSVG,
  enabled: true,
} as const;

export const CYPRUS_COUNTRY_CODE = {
  value: 'cyprus',
  iso2: 'CY',
  mask: 'XX XXXXXX',
  caption: '+357',
  icon: CyprusSVG,
  enabled: true,
} as const;

export const KIRIBATI_COUNTRY_CODE = {
  value: 'kiribati',
  iso2: 'KI',
  caption: '+686',
  mask: 'XXX XXXX',
  icon: KiribatiSVG,
  enabled: true,
} as const;

export const COLOMBIA_COUNTRY_CODE = {
  value: 'colombia',
  iso2: 'CO',
  caption: '+57',
  mask: 'XXX XXX-XXXX',
  icon: ColombiaSVG,
  enabled: true,
} as const;

export const KOSOVO_COUNTRY_CODE = {
  value: 'kosovo',
  iso2: 'XK',
  caption: '+383',
  mask: 'XXX XXXX',
  icon: KosovoSVG,
  enabled: true,
} as const;

export const KYRGYZSTAN_COUNTRY_CODE = {
  value: 'kyrgyzstan',
  iso2: 'KG',
  mask: 'XXX XXX-XXX',
  caption: '+996',
  icon: KyrgyzstanSVG,
  enabled: true,
} as const;

export const LATVIA_COUNTRY_CODE = {
  value: 'latvia',
  iso2: 'LV',
  caption: '+371',
  mask: 'XX XXX-XXX',
  icon: LatviaSVG,
  enabled: true,
} as const;

export const LESOTHO_COUNTRY_CODE = {
  value: 'lesotho',
  iso2: 'LS',
  caption: '+266',
  mask: 'XXXX XXXX',
  icon: LesothoSVG,
  enabled: true,
} as const;

export const LEBANON_COUNTRY_CODE = {
  value: 'lebanon',
  iso2: 'LB',
  caption: '+961',
  mask: 'XXX XX-XX',
  icon: LebanonSVG,
  enabled: true,
} as const;

export const LITHUANIA_COUNTRY_CODE = {
  value: 'lithuania',
  iso2: 'LT',
  caption: '+370',
  mask: 'XXX XX-XXX',
  icon: LithuaniaSVG,
  enabled: true,
} as const;

export const LIECHTENSTEIN_COUNTRY_CODE = {
  value: 'liechtenstein',
  iso2: 'LI',
  caption: '+423',
  mask: 'XXXX XXXX',
  icon: LiechtensteinSVG,
  enabled: true,
} as const;

export const LUXEMBOURG_COUNTRY_CODE = {
  value: 'luxembourg',
  iso2: 'LU',
  caption: '+352',
  mask: 'XXX XXX-XXX',
  icon: LuxembourgSVG,
  enabled: true,
} as const;

export const MAURITIUS_COUNTRY_CODE = {
  value: 'mauritius',
  iso2: 'MU',
  caption: '+230',
  mask: 'XXXX XXXX',
  icon: MauritiusSVG,
  enabled: true,
} as const;

export const MAURITANIA_COUNTRY_CODE = {
  value: 'mauritania',
  iso2: 'MR',
  caption: '+222',
  mask: 'XX XX-XX-XX',
  icon: MauritaniaSVG,
  enabled: true,
} as const;

export const MADAGASCAR_COUNTRY_CODE = {
  value: 'madagascar',
  iso2: 'MG',
  caption: '+261',
  mask: 'XX XX-XXX-XX',
  icon: MadagascarSVG,
  enabled: true,
} as const;

export const MAYOTTE_COUNTRY_CODE = {
  value: 'mayotte',
  iso2: 'YT',
  caption: '+262',
  mask: 'XXX XX-XX-XX',
  icon: MayotteSVG,
  enabled: true,
} as const;

export const MALI_COUNTRY_CODE = {
  value: 'mali',
  iso2: 'ML',
  caption: '+223',
  mask: 'XX XX-XX-XX',
  icon: MaliSVG,
  enabled: true,
} as const;

export const MALDIVES_COUNTRY_CODE = {
  value: 'maldives',
  iso2: 'MV',
  caption: '+960',
  mask: 'XXX XXXX',
  icon: MaldivesSVG,
  enabled: true,
} as const;

export const MALTA_COUNTRY_CODE = {
  value: 'malta',
  iso2: 'MT',
  caption: '+356',
  mask: 'XXX XXXX',
  icon: MaltaSVG,
  enabled: true,
} as const;

export const MOROCCO_COUNTRY_CODE = {
  value: 'morocco',
  iso2: 'MA',
  caption: '+212',
  mask: 'XXX XXXXXX',
  icon: MoroccoSVG,
  enabled: true,
} as const;

export const MOLDOVA_COUNTRY_CODE = {
  value: 'moldova',
  iso2: 'MD',
  mask: 'XXXX XXXX',
  caption: '+373',
  icon: MoldovaSVG,
  enabled: true,
} as const;

export const MONACO_COUNTRY_CODE = {
  value: 'monaco',
  iso2: 'MC',
  caption: '+377',
  mask: 'XX XXXXXXX',
  icon: MonacoSVG,
  enabled: true,
} as const;

export const MYANMAR_COUNTRY_CODE = {
  value: 'myanmar',
  iso2: 'MM',
  caption: '+95',
  mask: 'XXX XXXX',
  icon: MyanmarSVG,
  enabled: true,
} as const;

export const NAMIBIA_COUNTRY_CODE = {
  value: 'namibia',
  iso2: 'NA',
  caption: '+264',
  mask: 'XX XXX-XXXX',
  icon: NamibiaSVG,
  enabled: true,
} as const;

export const NIGER_COUNTRY_CODE = {
  value: 'niger',
  iso2: 'NE',
  caption: '+227',
  mask: 'XX XX-XX-XX',
  icon: NigerSVG,
  enabled: true,
} as const;

export const NETHERLANDS_COUNTRY_CODE = {
  value: 'netherlands',
  iso2: 'NL',
  mask: 'XX XXX-XXXX',
  caption: '+31',
  icon: NetherlandsSVG,
  enabled: true,
} as const;

export const NEW_ZEALAND_COUNTRY_CODE = {
  value: 'newZealand',
  iso2: 'NZ',
  caption: '+64',
  mask: 'XX XXX-XXXX',
  icon: NewZealandSVG,
  enabled: true,
} as const;

export const NEW_CALEDONIA_COUNTRY_CODE = {
  value: 'newCaledonia',
  iso2: 'NC',
  caption: '+687',
  mask: 'XX XX-XX',
  icon: NewCaledoniaSVG,
  enabled: true,
} as const;

export const UNITED_ARAB_EMIRATES_COUNTRY_CODE = {
  value: 'unitedArabEmirates',
  iso2: 'AE',
  mask: 'XX XXX-XXXX',
  caption: '+971',
  icon: UnitedArabEmiratesSVG,
  enabled: true,
} as const;

export const OMAN_COUNTRY_CODE = {
  value: 'oman',
  iso2: 'OM',
  caption: '+968',
  mask: 'XXXX XXXX',
  icon: OmanSVG,
  enabled: true,
} as const;

export const ISLE_OF_MAN_COUNTRY_CODE = {
  value: 'isleOfMan',
  iso2: 'IM',
  caption: '+44',
  mask: '1624 XXXXXX',
  icon: IsleOfManSVG,
  enabled: true,
} as const;

export const NORFOLK_ISLAND_COUNTRY_CODE = {
  value: 'norfolkIsland',
  iso2: 'NF',
  caption: '+672',
  mask: 'X XX-XXX',
  icon: NorfolkIslandSVG,
  enabled: true,
} as const;

export const WALLIS_AND_FUTUNA_ISLANDS_COUNTRY_CODE = {
  value: 'wallisAndFutunaIslands',
  iso2: 'WF',
  caption: '+681',
  mask: 'XX XXXX',
  icon: WallisAndFutunaSVG,
  enabled: true,
} as const;

export const PERU_COUNTRY_CODE = {
  value: 'peru',
  iso2: 'PE',
  caption: '+51',
  mask: 'XXX XXX-XXX',
  icon: PeruSVG,
  enabled: true,
} as const;

export const POLAND_COUNTRY_CODE = {
  value: 'poland',
  iso2: 'PL',
  caption: '+48',
  mask: 'XXX XXX-XXX',
  icon: PolandSVG,
  enabled: true,
} as const;

export const PORTUGAL_COUNTRY_CODE = {
  value: 'portugal',
  iso2: 'PT',
  caption: '+351',
  mask: 'XX XXX-XXXX',
  icon: PortugalSVG,
  enabled: true,
} as const;

export const TRANSNISTRIA_COUNTRY_CODE = {
  value: 'transnistria',
  iso2: 'MD',
  caption: '+373',
  mask: 'XXX XX-XXX',
  icon: TransnistriaSVG,
  enabled: true,
} as const;

export const ROMANIA_COUNTRY_CODE = {
  value: 'romania',
  iso2: 'RO',
  mask: 'XX XXX-XXXX',
  caption: '+40',
  icon: RomaniaSVG,
  enabled: true,
} as const;

export const SAN_MARINO_COUNTRY_CODE = {
  value: 'sanMarino',
  iso2: 'SM',
  caption: '+378',
  mask: 'XXXX XXXXXX',
  icon: SanMarinoSVG,
  enabled: true,
} as const;

export const SAO_TOME_AND_PRINCIPE_COUNTRY_CODE = {
  value: 'saoTomeAndPrincipe',
  iso2: 'ST',
  caption: '+239',
  mask: 'XX XXXX',
  icon: SaoTomeAndPrincipeSVG,
  enabled: true,
} as const;

export const SAUDI_ARABIA_COUNTRY_CODE = {
  value: 'saudiArabia',
  iso2: 'SA',
  mask: 'X XXXX-XXXX',
  caption: '+966',
  icon: SaudiArabiaSVG,
  enabled: true,
} as const;

export const NORTH_MACEDONIA_COUNTRY_CODE = {
  value: 'northMacedonia',
  iso2: 'MK',
  caption: '+389',
  mask: 'XXX XXXXX',
  icon: NorthMacedoniaSVG,
  enabled: true,
} as const;

export const SAINT_PIERRE_AND_MIQUELON_COUNTRY_CODE = {
  value: 'saintPierreAndMiquelon',
  iso2: 'PM',
  caption: '+508',
  mask: 'XX XXXX',
  icon: SaintPierreAndMiquelonSVG,
  enabled: true,
} as const;

export const SERBIA_COUNTRY_CODE = {
  value: 'serbia',
  iso2: 'RS',
  mask: 'XX XXX-XXXX',
  caption: '+381',
  icon: SerbiaSVG,
  enabled: true,
} as const;

export const SINGAPORE_COUNTRY_CODE = {
  value: 'singapore',
  iso2: 'SG',
  caption: '+65',
  mask: 'XXXX XXXX',
  icon: SingaporeSVG,
  enabled: true,
} as const;

export const SINT_MAARTEN_COUNTRY_CODE = {
  value: 'sintMaarten',
  iso2: 'SX',
  caption: '+1',
  mask: '721 XXX-XXXX',
  icon: SintMaartenSVG,
  enabled: true,
} as const;

export const SYRIA_COUNTRY_CODE = {
  value: 'syria',
  iso2: 'SY',
  mask: 'XX XXX-XXXX',
  caption: '+963',
  icon: SyriaSVG,
  enabled: true,
} as const;

export const SLOVAKIA_COUNTRY_CODE = {
  value: 'slovakia',
  iso2: 'SK',
  caption: '+421',
  mask: 'XXX XXX-XXX',
  icon: SlovakiaSVG,
  enabled: true,
} as const;

export const SOMALILAND_COUNTRY_CODE = {
  value: 'somaliland',
  iso2: 'SO',
  caption: '+252',
  mask: 'XX XXXXXXX',
  icon: SomalilandSVG,
  enabled: true,
} as const;

export const SURINAME_COUNTRY_CODE = {
  value: 'suriname',
  iso2: 'SR',
  caption: '+597',
  mask: 'XXX XXXX',
  icon: SurinameSVG,
  enabled: true,
} as const;

export const SIERRA_LEONE_COUNTRY_CODE = {
  value: 'sierraLeone',
  iso2: 'SL',
  caption: '+232',
  mask: 'XX XXXXXX',
  icon: SierraLeoneSVG,
  enabled: true,
} as const;

export const TAJIKISTAN_COUNTRY_CODE = {
  value: 'tajikistan',
  iso2: 'TJ',
  mask: 'XX XXX-XXXX',
  caption: '+992',
  icon: TajikistanSVG,
  enabled: true,
} as const;

export const TONGA_COUNTRY_CODE = {
  value: 'tonga',
  iso2: 'TO',
  caption: '+676',
  mask: 'XX XXX',
  icon: TongaSVG,
  enabled: true,
} as const;

export const TUVALU_COUNTRY_CODE = {
  value: 'tuvalu',
  iso2: 'TV',
  caption: '+688',
  mask: 'XXXXX',
  icon: TuvaluSVG,
  enabled: true,
} as const;

export const TURKMENISTAN_COUNTRY_CODE = {
  value: 'turkmenistan',
  iso2: 'TM',
  caption: '+993',
  mask: 'XX XXXXXX',
  icon: TurkmenistanSVG,
  enabled: true,
} as const;

export const TURKEY_COUNTRY_CODE = {
  value: 'turkey',
  iso2: 'TR',
  caption: '+90',
  mask: 'XXX XXX-XXXX',
  icon: TurkeySVG,
  enabled: true,
} as const;

export const UZBEKISTAN_COUNTRY_CODE = {
  value: 'uzbekistan',
  iso2: 'UZ',
  mask: 'XX XXX-XX-XX',
  caption: '+998',
  icon: UzbekistanSVG,
  enabled: true,
} as const;

export const UKRAINE_COUNTRY_CODE = {
  value: 'ukraine',
  iso2: 'UA',
  caption: '+380',
  mask: 'XX XXX-XX-XX',
  icon: UkraineSVG,
  enabled: true,
} as const;

export const URUGUAY_COUNTRY_CODE = {
  value: 'uruguay',
  iso2: 'UY',
  caption: '+598',
  mask: 'XX XXX-XXX',
  icon: UruguaySVG,
  enabled: true,
} as const;

export const FIJI_COUNTRY_CODE = {
  value: 'fiji',
  iso2: 'FJ',
  caption: '+679',
  mask: 'XXX XXXX',
  icon: FijiSVG,
  enabled: true,
} as const;

export const FINLAND_COUNTRY_CODE = {
  value: 'finland',
  iso2: 'FI',
  caption: '+358',
  mask: 'XXX XXX-XX-XX',
  icon: FinlandSVG,
  enabled: true,
} as const;

export const FRANCE_COUNTRY_CODE = {
  value: 'france',
  iso2: 'FR',
  caption: '+33',
  mask: 'XXX XXX-XXX',
  icon: FranceSVG,
  enabled: true,
} as const;

export const FRENCH_POLYNESIA_COUNTRY_CODE = {
  value: 'frenchPolynesia',
  iso2: 'PF',
  caption: '+689',
  mask: 'XX XXXXXXX',
  icon: FrenchPolynesiaSVG,
  enabled: true,
} as const;

export const CROATIA_COUNTRY_CODE = {
  value: 'croatia',
  iso2: 'HR',
  caption: '+385',
  mask: 'XX XXX-XXXX',
  icon: CroatiaSVG,
  enabled: true,
} as const;

export const CENTRAL_AFRICAN_REPUBLIC_COUNTRY_CODE = {
  value: 'centralAfricanRepublic',
  iso2: 'CF',
  caption: '+236',
  mask: 'XX XXX-XXX',
  icon: CentralAfricanRepublicSVG,
  enabled: true,
} as const;

export const MONTENEGRO_COUNTRY_CODE = {
  value: 'montenegro',
  iso2: 'ME',
  caption: '+382',
  mask: 'XX XXX-XXX',
  icon: MontenegroSVG,
  enabled: true,
} as const;

export const SWITZERLAND_COUNTRY_CODE = {
  value: 'switzerland',
  iso2: 'CH',
  caption: '+41',
  mask: 'XX XXX-XXXX',
  icon: SwitzerlandSVG,
  enabled: true,
} as const;

export const ESTONIA_COUNTRY_CODE = {
  value: 'estonia',
  iso2: 'EE',
  caption: '+372',
  mask: 'XXXX XXXX',
  icon: EstoniaSVG,
  enabled: true,
} as const;

export const ETHIOPIA_COUNTRY_CODE = {
  value: 'ethiopia',
  iso2: 'ET',
  mask: 'XX XXX-XXXX',
  caption: '+251',
  icon: EthiopiaSVG,
  enabled: true,
} as const;

export const SOUTH_AFRICA_COUNTRY_CODE = {
  value: 'southAfrica',
  iso2: 'ZA',
  mask: 'XX XXX-XXXX',
  caption: '+27',
  icon: SouthAfricaSVG,
  enabled: true,
} as const;

export const SOUTH_KOREA_COUNTRY_CODE = {
  value: 'southKorea',
  iso2: 'KR',
  caption: '+82',
  mask: 'XX XXXX-XXXX',
  icon: SouthKoreaSVG,
  enabled: true,
} as const;

export const SOUTH_SUDAN_COUNTRY_CODE = {
  value: 'southSudan',
  iso2: 'SS',
  caption: '+211',
  mask: 'XX XXX-XXXX',
  icon: SouthSudanSVG,
  enabled: true,
} as const;

export const JAPAN_COUNTRY_CODE = {
  value: 'japan',
  iso2: 'JP',
  caption: '+81',
  mask: 'XX XXXX-XXXX',
  icon: JapanSVG,
  enabled: true,
} as const;

export const TAIWAN_COUNTRY_CODE = {
  value: 'taiwan',
  iso2: 'TW',
  caption: '+886',
  mask: 'XXX XXX XXX',
  icon: TaiwanSVG,
  enabled: true,
} as const;

export const NIGERIA_COUNTRY_CODE = {
  value: 'nigeria',
  iso2: 'NG',
  caption: '+234',
  mask: 'XXX XXX XXXX',
  icon: NigeriaSVG,
  enabled: true,
} as const;

export const BENIN_COUNTRY_CODE = {
  value: 'benin',
  iso2: 'BJ',
  caption: '+229',
  mask: 'XX XX XX XX',
  icon: BeninSVG,
  enabled: true,
} as const;

export const CAMEROON_COUNTRY_CODE = {
  value: 'cameroon',
  iso2: 'CM',
  caption: '+237',
  mask: 'XXX XX XX XX',
  icon: CameroonSVG,
  enabled: true,
} as const;

export const GHANA_COUNTRY_CODE = {
  value: 'ghana',
  iso2: 'GH',
  caption: '+233',
  mask: 'XX XXX XXXX',
  icon: GhanaSVG,
  enabled: true,
} as const;

export const RWANDA_COUNTRY_CODE = {
  value: 'rwanda',
  iso2: 'RW',
  caption: '+250',
  mask: 'XX XXX XXXX',
  icon: RwandaSVG,
  enabled: true,
} as const;

export const ZAMBIA_COUNTRY_CODE = {
  value: 'zambia',
  iso2: 'ZM',
  caption: '+260',
  mask: 'XX XXX XXXX',
  icon: RwandaSVG,
  enabled: true,
} as const;

export const COTE_D_IVOIRE_COUNTRY_CODE = {
  value: 'coteDIvoire',
  iso2: 'CI',
  caption: '+225',
  mask: 'XX XX XX XX XX',
  icon: CoteDIvoireSVG,
  enabled: true,
} as const;

export const UGANDA_COUNTRY_CODE = {
  value: 'uganda',
  iso2: 'UG',
  caption: '+256',
  mask: '7X XXX XXXX',
  icon: UgandaSVG,
  enabled: true,
} as const;

export const CONGO_COUNTRY_CODE = {
  value: 'congo',
  iso2: 'CG',
  caption: '+242',
  mask: 'XX XXX XXXX',
  icon: CongoSVG,
  enabled: true,
} as const;

export const GUINEA_COUNTRY_CODE = {
  value: 'guinea',
  iso2: 'GN',
  caption: '+224',
  mask: '6XX XX XX XX',
  icon: GuineaSVG,
  enabled: true,
} as const;

export const SUDAN_COUNTRY_CODE = {
  value: 'sudan',
  iso2: 'SD',
  caption: '+249',
  mask: 'XX XXX XXXX',
  icon: SudanSVG,
  enabled: true,
} as const;

export const KENYA_COUNTRY_CODE = {
  value: 'kenya',
  iso2: 'KE',
  caption: '+254',
  mask: 'XXX XXX XXX',
  icon: KenyaSVG,
  enabled: true,
} as const;

export const JORDAN_COUNTRY_CODE = {
  value: 'jordan',
  iso2: 'JO',
  caption: '+962',
  mask: '7X XXX XXXX',
  icon: JordanSVG,
  enabled: true,
} as const;

export const LIBYA_COUNTRY_CODE = {
  value: 'libya',
  iso2: 'LY',
  caption: '+218',
  mask: '9X XXX XXXX',
  icon: LibyaSVG,
  enabled: true,
} as const;

export const SWEDEN_COUNTRY_CODE = {
  value: 'sweden',
  iso2: 'SE',
  caption: '+46',
  mask: '7X XXX XX XX',
  icon: SwedenSVG,
  enabled: true,
} as const;

export const CHAD_COUNTRY_CODE = {
  value: 'chad',
  iso2: 'TD',
  caption: '+235',
  mask: 'XX XX XX XX',
  icon: ChadSVG,
  enabled: true,
} as const;

export const NORWAY_COUNTRY_CODE = {
  value: 'norway',
  iso2: 'NO',
  caption: '+47',
  mask: 'XXX XX XXX',
  icon: NorwaySVG,
  enabled: true,
} as const;

export const HONG_KONG_COUNTRY_CODE = {
  value: 'hongKong',
  iso2: 'HK',
  caption: '+852',
  mask: 'XXXX XXXX',
  icon: HongKongSVG,
  enabled: true,
} as const;

export const COSTA_RICA_COUNTRY_CODE = {
  value: 'costaRica',
  iso2: 'CR',
  caption: '+506',
  mask: 'XXXX XXXX',
  icon: CostaRicaSVG,
  enabled: true,
} as const;

export const CHILE_COUNTRY_CODE = {
  value: 'chile',
  iso2: 'CL',
  caption: '+56',
  mask: '9 XXXX XXXX',
  icon: ChileSVG,
  enabled: true,
} as const;

export const ARGENTINA_COUNTRY_CODE = {
  value: 'argentina',
  iso2: 'AR',
  caption: '+54',
  mask: '9 XX XXXX XXXX',
  icon: ArgentinaSVG,
  enabled: true,
} as const;

export const ECUADOR_COUNTRY_CODE = {
  value: 'ecuador',
  iso2: 'EC',
  caption: '+593',
  mask: '9X XXX XXXX',
  icon: EcuadorSVG,
  enabled: true,
} as const;

export const MALAYSIA_COUNTRY_CODE = {
  value: 'malaysia',
  iso2: 'MY',
  caption: '+60',
  mask: '1X XXX[X] XXXX',
  icon: MalaysiaSVG,
  enabled: true,
} as const;

export const PARAGUAY_COUNTRY_CODE = {
  value: 'paraguay',
  iso2: 'PY',
  caption: '+595',
  mask: '9XX XXXXXX',
  icon: ParaguaySVG,
  enabled: true,
} as const;

export const YEMEN_COUNTRY_CODE = {
  value: 'yemen',
  iso2: 'YE',
  caption: '+967',
  mask: '7X XXX XXXX',
  icon: YemenSVG,
  enabled: true,
} as const;

export const HAITI_COUNTRY_CODE = {
  value: 'haiti',
  iso2: 'HT',
  caption: '+509',
  mask: 'XXXX XXXX',
  icon: HaitiSVG,
  enabled: true,
} as const;

export const MOZAMBIQUE_COUNTRY_CODE = {
  value: 'mozambique',
  iso2: 'MZ',
  caption: '+258',
  mask: '8X[X] XXX XXXX',
  icon: MozambiqueSVG,
  enabled: true,
} as const;

export const NICARAGUA_COUNTRY_CODE = {
  value: 'nicaragua',
  iso2: 'NI',
  caption: '+505',
  mask: 'XXXX XXXX',
  icon: NicaraguaSVG,
  enabled: true,
} as const;

export const SENEGAL_COUNTRY_CODE = {
  value: 'senegal',
  iso2: 'SN',
  caption: '+221',
  mask: 'XX XXX XX XX',
  icon: SenegalSVG,
  enabled: true,
} as const;

export const VENEZUELA_COUNTRY_CODE = {
  value: 'venezuela',
  iso2: 'VE',
  caption: '+58',
  mask: 'XXX XXXXXXX',
  icon: VenezuelaSVG,
  enabled: true,
} as const;

export const AFGHANISTAN_COUNTRY_CODE = {
  value: 'afghanistan',
  iso2: 'AF',
  caption: '+93',
  mask: 'XX XXX XXXX',
  icon: AfghanistanSVG,
  enabled: true,
} as const;

export const SRI_LANKA_COUNTRY_CODE = {
  value: 'sriLanka',
  iso2: 'LK',
  caption: '+94',
  mask: 'XX XXX XXXX',
  icon: SriLankaSVG,
  enabled: true,
} as const;

export const VIETNAM_COUNTRY_CODE = {
  value: 'vietnam',
  iso2: 'VN',
  caption: '+84',
  mask: 'XX XXX[X] XXXX',
  icon: VietnamSVG,
  enabled: true,
} as const;

export const THAILAND_COUNTRY_CODE = {
  value: 'thailand',
  iso2: 'TH',
  caption: '+66',
  mask: 'XX XXX XXXX',
  icon: ThailandSVG,
  enabled: true,
} as const;

export const INDONESIA_COUNTRY_CODE = {
  value: 'indonesia',
  iso2: 'ID',
  caption: '+62',
  mask: '8XX XXXX XXX[XX]',
  icon: IndonesiaSVG,
  enabled: true,
} as const;

export const TANZANIA_COUNTRY_CODE = {
  value: 'tanzania',
  iso2: 'TZ',
  caption: '+255',
  mask: 'XX XXX XXXX',
  icon: TanzaniaSVG,
  enabled: true,
} as const;

export const QATAR_COUNTRY_CODE = {
  value: 'qatar',
  iso2: 'QA',
  caption: '+974',
  mask: 'XXXX XXXX',
  icon: QatarSVG,
  enabled: true,
} as const;

export const PALESTINE_COUNTRY_CODE = {
  value: 'palestine',
  iso2: 'PS',
  caption: '+970',
  mask: '5X XXX XXXX',
  icon: PalestineSVG,
  enabled: true,
} as const;

export const CAMBODIA_COUNTRY_CODE = {
  value: 'cambodia',
  iso2: 'KH',
  caption: '+855',
  mask: 'XX XXX XXX[X]',
  icon: CambodiaSVG,
  enabled: true,
} as const;

export const ALL_COUNTRY_CODES = [
  RUSSIA_COUNTRY_CODE,
  ABKHAZIA_COUNTRY_CODE,
  AUSTRALIA_COUNTRY_CODE,
  AUSTRIA_COUNTRY_CODE,
  AZERBAIJAN_COUNTRY_CODE,
  ALBANIA_COUNTRY_CODE,
  ALGERIA_COUNTRY_CODE,
  ANGOLA_COUNTRY_CODE,
  ANDORRA_COUNTRY_CODE,
  ANTIGUA_AND_BARBUDA_COUNTRY_CODE,
  ARGENTINA_COUNTRY_CODE,
  ARMENIA_COUNTRY_CODE,
  AFGHANISTAN_COUNTRY_CODE,
  BAHAMAS_COUNTRY_CODE,
  BANGLADESH_COUNTRY_CODE,
  BARBADOS_COUNTRY_CODE,
  BAHRAIN_COUNTRY_CODE,
  BELARUS_COUNTRY_CODE,
  BELIZE_COUNTRY_CODE,
  BELGIUM_COUNTRY_CODE,
  BENIN_COUNTRY_CODE,
  BOSNIA_AND_HERZEGOVINA_COUNTRY_CODE,
  BOTSWANA_COUNTRY_CODE,
  BRAZIL_COUNTRY_CODE,
  BHUTAN_COUNTRY_CODE,
  VANUATU_COUNTRY_CODE,
  HUNGARY_COUNTRY_CODE,
  VENEZUELA_COUNTRY_CODE,
  VIETNAM_COUNTRY_CODE,
  HAITI_COUNTRY_CODE,
  GUYANA_COUNTRY_CODE,
  GHANA_COUNTRY_CODE,
  GUATEMALA_COUNTRY_CODE,
  GUINEA_COUNTRY_CODE,
  GERMANY_COUNTRY_CODE,
  GUERNSEY_COUNTRY_CODE,
  GIBRALTAR_COUNTRY_CODE,
  HONDURAS_COUNTRY_CODE,
  HONG_KONG_COUNTRY_CODE,
  GREECE_COUNTRY_CODE,
  GEORGIA_COUNTRY_CODE,
  DENMARK_COUNTRY_CODE,
  DJIBOUTI_COUNTRY_CODE,
  DOMINICAN_REPUBLIC_COUNTRY_CODE,
  EGYPT_COUNTRY_CODE,
  ZAMBIA_COUNTRY_CODE,
  ZIMBABWE_COUNTRY_CODE,
  ISRAEL_COUNTRY_CODE,
  INDIA_COUNTRY_CODE,
  INDONESIA_COUNTRY_CODE,
  JORDAN_COUNTRY_CODE,
  IRAQ_COUNTRY_CODE,
  IRAN_COUNTRY_CODE,
  IRELAND_COUNTRY_CODE,
  ICELAND_COUNTRY_CODE,
  SPAIN_COUNTRY_CODE,
  ITALY_COUNTRY_CODE,
  YEMEN_COUNTRY_CODE,
  KAZAKHSTAN_COUNTRY_CODE,
  CAYMAN_ISLANDS_COUNTRY_CODE,
  CAMBODIA_COUNTRY_CODE,
  CAMEROON_COUNTRY_CODE,
  QATAR_COUNTRY_CODE,
  KENYA_COUNTRY_CODE,
  CYPRUS_COUNTRY_CODE,
  KIRIBATI_COUNTRY_CODE,
  COLOMBIA_COUNTRY_CODE,
  COSTA_RICA_COUNTRY_CODE,
  COTE_D_IVOIRE_COUNTRY_CODE,
  KOSOVO_COUNTRY_CODE,
  KYRGYZSTAN_COUNTRY_CODE,
  LATVIA_COUNTRY_CODE,
  LESOTHO_COUNTRY_CODE,
  LEBANON_COUNTRY_CODE,
  LIBYA_COUNTRY_CODE,
  LITHUANIA_COUNTRY_CODE,
  LIECHTENSTEIN_COUNTRY_CODE,
  LUXEMBOURG_COUNTRY_CODE,
  MAURITIUS_COUNTRY_CODE,
  MAURITANIA_COUNTRY_CODE,
  MADAGASCAR_COUNTRY_CODE,
  MAYOTTE_COUNTRY_CODE,
  MALAYSIA_COUNTRY_CODE,
  MALI_COUNTRY_CODE,
  MALDIVES_COUNTRY_CODE,
  MALTA_COUNTRY_CODE,
  MOROCCO_COUNTRY_CODE,
  MOZAMBIQUE_COUNTRY_CODE,
  MOLDOVA_COUNTRY_CODE,
  MONACO_COUNTRY_CODE,
  MYANMAR_COUNTRY_CODE,
  NAMIBIA_COUNTRY_CODE,
  NIGER_COUNTRY_CODE,
  NIGERIA_COUNTRY_CODE,
  NETHERLANDS_COUNTRY_CODE,
  NICARAGUA_COUNTRY_CODE,
  NEW_ZEALAND_COUNTRY_CODE,
  NEW_CALEDONIA_COUNTRY_CODE,
  NORWAY_COUNTRY_CODE,
  UNITED_ARAB_EMIRATES_COUNTRY_CODE,
  OMAN_COUNTRY_CODE,
  ISLE_OF_MAN_COUNTRY_CODE,
  NORFOLK_ISLAND_COUNTRY_CODE,
  WALLIS_AND_FUTUNA_ISLANDS_COUNTRY_CODE,
  PALESTINE_COUNTRY_CODE,
  PARAGUAY_COUNTRY_CODE,
  PERU_COUNTRY_CODE,
  POLAND_COUNTRY_CODE,
  PORTUGAL_COUNTRY_CODE,
  TRANSNISTRIA_COUNTRY_CODE,
  CONGO_COUNTRY_CODE,
  RWANDA_COUNTRY_CODE,
  ROMANIA_COUNTRY_CODE,
  SAN_MARINO_COUNTRY_CODE,
  SAO_TOME_AND_PRINCIPE_COUNTRY_CODE,
  SAUDI_ARABIA_COUNTRY_CODE,
  NORTH_MACEDONIA_COUNTRY_CODE,
  SAINT_PIERRE_AND_MIQUELON_COUNTRY_CODE,
  SENEGAL_COUNTRY_CODE,
  SERBIA_COUNTRY_CODE,
  SINGAPORE_COUNTRY_CODE,
  SINT_MAARTEN_COUNTRY_CODE,
  SYRIA_COUNTRY_CODE,
  SLOVAKIA_COUNTRY_CODE,
  SOMALILAND_COUNTRY_CODE,
  SUDAN_COUNTRY_CODE,
  SURINAME_COUNTRY_CODE,
  SIERRA_LEONE_COUNTRY_CODE,
  TAJIKISTAN_COUNTRY_CODE,
  THAILAND_COUNTRY_CODE,
  TAIWAN_COUNTRY_CODE,
  TANZANIA_COUNTRY_CODE,
  TONGA_COUNTRY_CODE,
  TUVALU_COUNTRY_CODE,
  TURKMENISTAN_COUNTRY_CODE,
  TURKEY_COUNTRY_CODE,
  UGANDA_COUNTRY_CODE,
  UZBEKISTAN_COUNTRY_CODE,
  UKRAINE_COUNTRY_CODE,
  URUGUAY_COUNTRY_CODE,
  FIJI_COUNTRY_CODE,
  FINLAND_COUNTRY_CODE,
  FRANCE_COUNTRY_CODE,
  FRENCH_POLYNESIA_COUNTRY_CODE,
  CROATIA_COUNTRY_CODE,
  CENTRAL_AFRICAN_REPUBLIC_COUNTRY_CODE,
  CHAD_COUNTRY_CODE,
  MONTENEGRO_COUNTRY_CODE,
  CHILE_COUNTRY_CODE,
  SWITZERLAND_COUNTRY_CODE,
  SWEDEN_COUNTRY_CODE,
  SRI_LANKA_COUNTRY_CODE,
  ECUADOR_COUNTRY_CODE,
  ESTONIA_COUNTRY_CODE,
  ETHIOPIA_COUNTRY_CODE,
  SOUTH_AFRICA_COUNTRY_CODE,
  SOUTH_KOREA_COUNTRY_CODE,
  SOUTH_SUDAN_COUNTRY_CODE,
  JAPAN_COUNTRY_CODE,
] as const;

export const ENABLED_COUNTRY_CODES = ALL_COUNTRY_CODES.filter(({ enabled }) => enabled);
