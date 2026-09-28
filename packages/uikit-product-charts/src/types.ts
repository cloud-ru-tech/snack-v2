import { ValueOf } from '@ds/utils';

import { DRAW_STYLES, LINE_INTERPOLATIONS, PLOT_TYPES, SERIES_COLORS, X_AXIS_POSITION } from './constants';

export type SeriesColor = ValueOf<typeof SERIES_COLORS>;
export type PlotType = ValueOf<typeof PLOT_TYPES>;
export type LineInterpolation = ValueOf<typeof LINE_INTERPOLATIONS>;
export type DrawStyle = ValueOf<typeof DRAW_STYLES>;
export type XAxisPosition = ValueOf<typeof X_AXIS_POSITION>;
