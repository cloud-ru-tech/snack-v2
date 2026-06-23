import { APPEARANCE, Button, VIEW } from '@ds/button';
import { SegmentControl } from '@ds/segment-control';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { HexColorPicker, HsvColorPicker, RgbColorPicker } from 'react-colorful';

import { COLOR_MODE, COLOR_MODE_LABEL, DEFAULT_AVAILABLE_MODES, DEFAULT_COLOR, SIZE, TEST_IDS } from '../../constants';
import { ChannelSlider, FieldAlphaColor, FieldPrivate } from '../../helperComponents';
import { colorPickerLocale } from '../../locale';
import { Color, ColorMode, HsvaColor, RawColor, RgbaColor, Size } from '../../types';
import { colorToRawValue, hexToRgba, hsvaToRawValue, rgbaToHex, rgbaToHsva } from '../../utils/convert';
import {
  alphaGradient,
  composeRgba,
  hsvSaturationGradient,
  hsvToHexOpaque,
  hsvValueGradient,
  hueGradient,
  rgbChannelGradient,
} from '../../utils/gradients';
import { isHexValid } from '../../utils/validate';
import styles from './styles.module.scss';

export type ColorPickerProps = WithSupportProps<{
  /** Текущее значение цвета. Если задано — компонент синхронизируется с ним при изменении. */
  value?: Color;
  /** Колбек на изменение значения. Вызывается на каждое изменение если `autoApply`, иначе только по нажатию Apply. */
  onChange?(rawColor: RawColor): void;
  /**
   * Управляет альфа-каналом палитры и наличием поля Alpha.
   * @default true
   */
  withAlpha?: boolean;
  /**
   * Применять изменения автоматически. Если `false` — появляются кнопки Cancel/Apply.
   * По умолчанию `true` — без футера (паритет с Figma colorPicker, где Cancel/Apply нет).
   * @default true
   */
  autoApply?: boolean;
  /**
   * Размер компонента.
   * @default 'm'
   */
  size?: Size;
  /**
   * Какие цветовые модели доступны переключателю.
   * @default ['hex', 'hsv', 'rgb']
   */
  availableModes?: ColorMode[];
  /** CSS-класс корневого элемента. */
  className?: string;
}>;

// Собирает RawColor, где hex/rgb/rgba берутся из точного rgba пользователя, а hsv/hsl — из
// авторитетного hsva (тонкие каналы для hue/HSV-контролов).
function buildRawFromExact(hsva: HsvaColor, exact: RgbaColor): RawColor {
  const raw = hsvaToRawValue(hsva);
  return {
    ...raw,
    hex: rgbaToHex(exact),
    rgb: { r: exact.r, g: exact.g, b: exact.b },
    rgba: { ...exact },
  };
}

export function ColorPicker({
  value,
  onChange,
  withAlpha = true,
  autoApply = true,
  size = SIZE.M,
  className,
  availableModes,
  ...rest
}: ColorPickerProps) {
  const { t } = colorPickerLocale.useTranslations();

  const colorModeOptions = useMemo(() => {
    const modes = availableModes && availableModes.length > 0 ? availableModes : DEFAULT_AVAILABLE_MODES;
    return modes.map(mode => ({ value: mode, label: COLOR_MODE_LABEL[mode] }));
  }, [availableModes]);

  const initialMode: ColorMode = colorModeOptions[0]?.value ?? COLOR_MODE.Hex;

  const initialRawRef = useRef<RawColor>(colorToRawValue(value ?? DEFAULT_COLOR));

  // Авторитетное состояние редактора — hsva (как внутри react-colorful): hex/rgb имеют
  // только 256 уровней на канал, hsva — тоньше. Если бы каждый edit ходил hsva→hex→rgba→hsva,
  // тон/насыщенность/яркость «снапались» бы (стопор клавиатуры в HEX, дёрганье HSV).
  const [hsva, setHsva] = useState<HsvaColor>(initialRawRef.current.hsva);
  const [colorMode, setColorMode] = useState<ColorMode>(initialMode);

  // Свежий hsva для мёржа каналов: при быстром drag серия pointermove приходит до коммита
  // React, и render-замыкание устаревает.
  const hsvaRef = useRef<HsvaColor>(hsva);

  // Точный rgba, который пользователь правит прямо сейчас через RGB-каналы или HEX-поле.
  // hex/rgb выводим из него напрямую (rgbaToHex/r,g,b), а не из re-деривации через hsva —
  // hex→hsva→rounded→rgba→hex НЕ identity (сдвиг канала на ±1, баг #3566271, и degradation
  // hex-значения). Сбрасывается при HSV/hue/alpha-slider правке, 2D-drag, выходе из режима,
  // внешней смене value.
  const exactRgbaRef = useRef<RgbaColor | undefined>(undefined);

  // hex последнего отправленного onChange: эффект синхронизации `value` пропускает эхо
  // собственных коммитов (autoApply → потребитель вернул то же значение пропом). Без этого
  // каждый edit делал round-trip hsva→rgba→hsva: hue «стопорился» с клавиатуры на
  // десатурированных цветах, а при drag alpha дёргались соседние rgb-каналы (MR!101).
  const lastEmittedHexRef = useRef<string | undefined>(undefined);

  const rawValue = useMemo(() => {
    const raw = hsvaToRawValue(hsva);
    const exact = exactRgbaRef.current;
    if (exact) {
      return {
        ...raw,
        hex: rgbaToHex(exact),
        rgb: { r: exact.r, g: exact.g, b: exact.b },
        rgba: { ...exact },
      };
    }
    return raw;
  }, [hsva]);

  const commitHsva = (next: HsvaColor, exactRgba?: RgbaColor) => {
    const clamped = !withAlpha && next.a !== 1 ? { ...next, a: 1 } : next;
    const clampedExact = exactRgba && !withAlpha && exactRgba.a !== 1 ? { ...exactRgba, a: 1 } : exactRgba;
    hsvaRef.current = clamped;
    exactRgbaRef.current = clampedExact;
    setHsva(clamped);
    if (autoApply) {
      const emitted = clampedExact ? buildRawFromExact(clamped, clampedExact) : hsvaToRawValue(clamped);
      lastEmittedHexRef.current = emitted.hex;
      onChange?.(emitted);
    }
  };

  useEffect(() => {
    if (value === undefined) return;
    const raw = colorToRawValue(value);
    // Эхо собственного autoApply-коммита: hsva уже авторитетен, повторная деривация из rgba
    // только огрубила бы каналы (см. lastEmittedHexRef).
    if (raw.hex === lastEmittedHexRef.current) return;
    if (raw.hex === rawValue.hex) return;
    hsvaRef.current = raw.hsva;
    // Внешний value — точный rgba; держим его авторитетом, чтобы hex/rgb отображались 1:1.
    exactRgbaRef.current = { ...raw.rgba };
    setHsva(raw.hsva);
    // hsva в deps намеренно не добавлен: эффект синхронизирует только внешние смены `value`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!colorModeOptions.some(opt => opt.value === colorMode)) {
      const next = colorModeOptions[0]?.value;
      if (next) setColorMode(next);
    }
  }, [colorModeOptions, colorMode]);

  // Сброс точного-rgba при выходе из RGB/HEX-режима: вне них значения выводятся из hsva.
  useEffect(() => {
    if (colorMode !== COLOR_MODE.Rgb && colorMode !== COLOR_MODE.Hex) {
      exactRgbaRef.current = undefined;
    }
  }, [colorMode]);

  // onChange от 2D-пикеров (Hex/Rgb/Hsv react-colorful). Им передаётся opaque-цвет (без alpha),
  // поэтому их onChange всегда возвращает a=1 — сохраняем текущую alpha, иначе drag по квадрату
  // сбрасывал бы прозрачность в 100% (квадрат меняет только h/s/v, не alpha).
  const handlePickerChange = (color: Color) => {
    const nextHsva = colorToRawValue(color).hsva;
    commitHsva({ ...nextHsva, a: hsvaRef.current.a });
  };

  // Прямой edit hsva-канала (поля/слайдеры HSV, hue-слайдер в HEX) — без round-trip.
  const makeHsvaHandler =
    (key: 'h' | 's' | 'v', round = false) =>
    (channelValue?: number | string) => {
      const numeric = Number(channelValue);
      commitHsva({ ...hsvaRef.current, [key]: round ? Math.round(numeric) : numeric });
    };

  // Edit RGB-канала: правленый rgba → hsva (один раз), но храним точный целочисленный rgba как
  // авторитет для отображения/onChange, чтобы соседние каналы не дёргались.
  const makeRgbHandler = (key: 'r' | 'g' | 'b') => (channelValue?: number | string) => {
    const numeric = Math.round(Number(channelValue));
    const baseRgb = exactRgbaRef.current ?? rawValue.rgba;
    const nextRgba: RgbaColor = { ...baseRgb, a: hsvaRef.current.a, [key]: numeric };
    commitHsva({ ...rgbaToHsva(nextRgba), a: hsvaRef.current.a }, nextRgba);
  };

  // Поле HEX — RRGGBB-only: коммит opaque (a = 1). Альфа правится только полем/слайдером Alpha.
  const handleHexFieldChange = (next = '') => {
    if (isHexValid(next)) {
      const rgba: RgbaColor = { ...hexToRgba(next), a: 1 };
      commitHsva({ ...rgbaToHsva(rgba), a: 1 }, rgba);
    }
  };

  const handleAlphaChange = (color: Color) => {
    const a = colorToRawValue(color).rgba.a;
    const exact = exactRgbaRef.current ? { ...exactRgbaRef.current, a } : undefined;
    commitHsva({ ...hsvaRef.current, a }, exact);
  };

  const handleAlphaSliderChange = (next: number) => {
    const a = next / 100;
    const exact = exactRgbaRef.current ? { ...exactRgbaRef.current, a } : undefined;
    commitHsva({ ...hsvaRef.current, a }, exact);
  };

  const applyChange = () => {
    lastEmittedHexRef.current = rawValue.hex;
    onChange?.(rawValue);
  };

  const reset = () => {
    const raw = value !== undefined ? colorToRawValue(value) : initialRawRef.current;
    hsvaRef.current = raw.hsva;
    // Внешний value несёт точный rgba — держим его как авторитет, чтобы hex/rgb не деградировали
    // от round-trip через hsva при возврате к исходному значению.
    exactRgbaRef.current = raw.rgba ? { ...raw.rgba } : undefined;
    setHsva(raw.hsva);
  };

  // Поле hex показывает только RRGGBB. Альфа редактируется в соседнем поле Alpha.
  const hexFieldValue = rawValue.hex.replace('#', '').substring(0, 6);

  // HexColorPicker (react-colorful) — opaque-контрол, как Rgb/HsvColorPicker. Ему отдаём
  // opaque 6-значный hex (rawValue.hex при alpha<1 — это #rrggbbaa). Если кормить 8-значным,
  // opaque-пикер при каждом рендере «исправляет» цвет на 6-значный → echo + сохранение alpha
  // в handlePickerChange зацикливают перерисовку (поле прыгает). Alpha живёт в alpha-слайдере.
  const pickerHexOpaque = rgbaToHex({ ...rawValue.rgba, a: 1 });

  return (
    <div
      className={cn(styles.container, className)}
      data-size={size}
      data-mode={colorMode}
      {...extractSupportProps(rest)}
    >
      {colorMode === COLOR_MODE.Hex && <HexColorPicker onChange={handlePickerChange} color={pickerHexOpaque} />}
      {colorMode === COLOR_MODE.Rgb && <RgbColorPicker onChange={handlePickerChange} color={rawValue.rgb} />}
      {colorMode === COLOR_MODE.Hsv && <HsvColorPicker onChange={handlePickerChange} color={rawValue.hsv} />}

      <div className={styles.colorModel}>
        <SegmentControl<ColorMode>
          outline
          value={colorMode}
          size={size}
          width='full'
          onChange={setColorMode}
          items={colorModeOptions}
          data-test-id={TEST_IDS.segments}
        />

        <div className={styles.colorFields} data-mode={colorMode} data-with-alpha={withAlpha || undefined}>
          {colorMode === COLOR_MODE.Hex && (
            <FieldPrivate
              value={hexFieldValue}
              error={!isHexValid(hexFieldValue)}
              inputType='text'
              aria-label={t('hex')}
              data-test-id={TEST_IDS.fieldHex}
              size={size}
              onChange={handleHexFieldChange}
            />
          )}

          {colorMode === COLOR_MODE.Rgb && (
            <>
              <FieldPrivate
                value={rawValue.rgb.r}
                max={255}
                size={size}
                aria-label={t('r')}
                data-test-id={TEST_IDS.fieldR}
                onChange={makeRgbHandler('r')}
              />
              <FieldPrivate
                value={rawValue.rgb.g}
                max={255}
                size={size}
                aria-label={t('g')}
                data-test-id={TEST_IDS.fieldG}
                onChange={makeRgbHandler('g')}
              />
              <FieldPrivate
                value={rawValue.rgb.b}
                max={255}
                size={size}
                aria-label={t('b')}
                data-test-id={TEST_IDS.fieldB}
                onChange={makeRgbHandler('b')}
              />
            </>
          )}

          {colorMode === COLOR_MODE.Hsv && (
            <>
              <FieldPrivate
                value={rawValue.hsv.h}
                max={359}
                size={size}
                aria-label={t('h')}
                data-test-id={TEST_IDS.fieldH}
                onChange={makeHsvaHandler('h')}
              />
              <FieldPrivate
                value={rawValue.hsv.s}
                max={100}
                size={size}
                aria-label={t('s')}
                data-test-id={TEST_IDS.fieldS}
                onChange={makeHsvaHandler('s')}
              />
              <FieldPrivate
                value={rawValue.hsv.v}
                max={100}
                size={size}
                aria-label={t('v')}
                data-test-id={TEST_IDS.fieldV}
                onChange={makeHsvaHandler('v')}
              />
            </>
          )}

          {withAlpha && (
            <FieldAlphaColor
              rgba={rawValue.rgba}
              onChange={handleAlphaChange}
              size={size}
              aria-label={t('alpha')}
              data-test-id={TEST_IDS.fieldAlpha}
            />
          )}
        </div>
      </div>

      <div className={styles.sliders}>
        {colorMode === COLOR_MODE.Hex && (
          <ChannelSlider
            value={rawValue.hsv.h}
            min={0}
            max={359}
            gradient={hueGradient()}
            thumbColor={hsvToHexOpaque({ ...rawValue.hsva, s: 100, v: 100 })}
            size={size}
            aria-label={t('h')}
            aria-valuetext={`${rawValue.hsv.h}°`}
            data-test-id={TEST_IDS.sliderH}
            onChange={makeHsvaHandler('h', true)}
          />
        )}

        {colorMode === COLOR_MODE.Rgb && (
          <>
            <ChannelSlider
              value={rawValue.rgb.r}
              min={0}
              max={255}
              gradient={rgbChannelGradient('r')}
              thumbColor={`rgb(${rawValue.rgb.r}, 0, 0)`}
              size={size}
              aria-label={t('r')}
              data-test-id={TEST_IDS.sliderR}
              onChange={makeRgbHandler('r')}
            />
            <ChannelSlider
              value={rawValue.rgb.g}
              min={0}
              max={255}
              gradient={rgbChannelGradient('g')}
              thumbColor={`rgb(0, ${rawValue.rgb.g}, 0)`}
              size={size}
              aria-label={t('g')}
              data-test-id={TEST_IDS.sliderG}
              onChange={makeRgbHandler('g')}
            />
            <ChannelSlider
              value={rawValue.rgb.b}
              min={0}
              max={255}
              gradient={rgbChannelGradient('b')}
              thumbColor={`rgb(0, 0, ${rawValue.rgb.b})`}
              size={size}
              aria-label={t('b')}
              data-test-id={TEST_IDS.sliderB}
              onChange={makeRgbHandler('b')}
            />
          </>
        )}

        {colorMode === COLOR_MODE.Hsv && (
          <>
            <ChannelSlider
              value={rawValue.hsv.h}
              min={0}
              max={359}
              gradient={hueGradient()}
              thumbColor={hsvToHexOpaque({ ...rawValue.hsva, s: 100, v: 100 })}
              size={size}
              aria-label={t('h')}
              aria-valuetext={`${rawValue.hsv.h}°`}
              data-test-id={TEST_IDS.sliderH}
              onChange={makeHsvaHandler('h', true)}
            />
            <ChannelSlider
              value={rawValue.hsv.s}
              min={0}
              max={100}
              gradient={hsvSaturationGradient(rawValue.hsv)}
              thumbColor={hsvToHexOpaque(rawValue.hsva)}
              size={size}
              aria-label={t('s')}
              aria-valuetext={`${rawValue.hsv.s}%`}
              data-test-id={TEST_IDS.sliderS}
              onChange={makeHsvaHandler('s', true)}
            />
            <ChannelSlider
              value={rawValue.hsv.v}
              min={0}
              max={100}
              gradient={hsvValueGradient(rawValue.hsv)}
              thumbColor={hsvToHexOpaque(rawValue.hsva)}
              size={size}
              aria-label={t('v')}
              aria-valuetext={`${rawValue.hsv.v}%`}
              data-test-id={TEST_IDS.sliderV}
              onChange={makeHsvaHandler('v', true)}
            />
          </>
        )}

        {withAlpha && (
          <ChannelSlider
            value={Math.round(rawValue.rgba.a * 100)}
            min={0}
            max={100}
            alpha
            gradient={alphaGradient(rawValue.rgba)}
            thumbColor={composeRgba(rawValue.rgba)}
            size={size}
            aria-label={t('alpha')}
            aria-valuetext={`${Math.round(rawValue.rgba.a * 100)}%`}
            data-test-id={TEST_IDS.sliderAlpha}
            onChange={handleAlphaSliderChange}
          />
        )}
      </div>

      {!autoApply && (
        <div className={styles.footer}>
          <Button
            label={t('cancel')}
            size={size}
            view={VIEW.Function}
            onClick={reset}
            data-test-id={TEST_IDS.cancel}
            appearance={APPEARANCE.Neutral}
          />
          <Button
            label={t('apply')}
            view={VIEW.Filled}
            appearance={APPEARANCE.Primary}
            size={size}
            onClick={applyChange}
            data-test-id={TEST_IDS.apply}
          />
        </div>
      )}
    </div>
  );
}
