import { Button } from '@ds/button';
import { useLocale } from '@ds/locale';
import { SegmentControl } from '@ds/segment-control';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { HexColorPicker, HsvColorPicker, RgbColorPicker } from 'react-colorful';

import { COLOR_MODE, COLOR_MODE_LABEL, DEFAULT_AVAILABLE_MODES, DEFAULT_COLOR, SIZE, TEST_IDS } from '../../constants';
import { ChannelSlider, FieldAlphaColor, FieldPrivate } from '../../helperComponents';
import { Color, ColorMode, RawColor, Size } from '../../types';
import { colorToRawValue, hexToRgba } from '../../utils/convert';
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
   * @default false
   */
  autoApply?: boolean;
  /**
   * Размер компонента.
   * @default 'm'
   */
  size?: Size;
  /**
   * Какие цветовые модели доступны переключателю.
   * @default ['hex', 'rgb', 'hsv']
   */
  availableModes?: ColorMode[];
  /** CSS-класс корневого элемента. */
  className?: string;
}>;

export function ColorPicker({
  value,
  onChange,
  withAlpha = true,
  autoApply = false,
  size = SIZE.M,
  className,
  availableModes,
  ...rest
}: ColorPickerProps) {
  const { t } = useLocale('ColorPicker');

  const colorModeOptions = useMemo(() => {
    const modes = availableModes && availableModes.length > 0 ? availableModes : DEFAULT_AVAILABLE_MODES;
    return modes.map(mode => ({ value: mode, label: COLOR_MODE_LABEL[mode] }));
  }, [availableModes]);

  const initialMode: ColorMode = colorModeOptions[0]?.value ?? COLOR_MODE.Hex;

  const initialRawRef = useRef<RawColor>(colorToRawValue(value ?? DEFAULT_COLOR));

  const [rawValue, setRawValue] = useState<RawColor>(initialRawRef.current);
  const [colorMode, setColorMode] = useState<ColorMode>(initialMode);

  useEffect(() => {
    if (value === undefined) return;
    const raw = colorToRawValue(value);
    if (raw.hex === rawValue.hex) return;
    setRawValue(raw);
    // rawValue в deps намеренно не добавлен: эффект синхронизирует только внешние смены `value`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!colorModeOptions.some(opt => opt.value === colorMode)) {
      const next = colorModeOptions[0]?.value;
      if (next) setColorMode(next);
    }
  }, [colorModeOptions, colorMode]);

  const handleChange = (color: Color) => {
    let next = colorToRawValue(color);
    if (!withAlpha && next.rgba.a !== 1) {
      next = colorToRawValue({ ...next.rgba, a: 1 });
    }
    setRawValue(next);
    if (autoApply) {
      onChange?.(next);
    }
  };

  const applyChange = () => {
    onChange?.(rawValue);
  };

  const reset = () => {
    const base = value !== undefined ? colorToRawValue(value) : initialRawRef.current;
    setRawValue(base);
  };

  // Поле hex показывает только RRGGBB. Альфа редактируется в соседнем поле Alpha.
  const hexFieldValue = rawValue.hex.replace('#', '').substring(0, 6);

  return (
    <div
      className={cn(styles.container, className)}
      data-size={size}
      data-mode={colorMode}
      {...extractSupportProps(rest)}
    >
      {colorMode === COLOR_MODE.Hex && <HexColorPicker onChange={handleChange} color={rawValue.hex} />}
      {colorMode === COLOR_MODE.Rgb && <RgbColorPicker onChange={handleChange} color={rawValue.rgb} />}
      {colorMode === COLOR_MODE.Hsv && <HsvColorPicker onChange={handleChange} color={rawValue.hsv} />}

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
              onChange={(value = '') => {
                if (isHexValid(value)) {
                  handleChange({ ...hexToRgba(value), a: rawValue.rgba.a });
                }
              }}
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
                onChange={value => handleChange({ ...rawValue.rgba, r: Number(value) })}
              />
              <FieldPrivate
                value={rawValue.rgb.g}
                max={255}
                size={size}
                aria-label={t('g')}
                data-test-id={TEST_IDS.fieldG}
                onChange={value => handleChange({ ...rawValue.rgba, g: Number(value) })}
              />
              <FieldPrivate
                value={rawValue.rgb.b}
                max={255}
                size={size}
                aria-label={t('b')}
                data-test-id={TEST_IDS.fieldB}
                onChange={value => handleChange({ ...rawValue.rgba, b: Number(value) })}
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
                onChange={value => handleChange({ ...rawValue.hsva, h: Number(value) })}
              />
              <FieldPrivate
                value={rawValue.hsv.s}
                max={100}
                size={size}
                aria-label={t('s')}
                data-test-id={TEST_IDS.fieldS}
                onChange={value => handleChange({ ...rawValue.hsva, s: Number(value) })}
              />
              <FieldPrivate
                value={rawValue.hsv.v}
                max={100}
                size={size}
                aria-label={t('v')}
                data-test-id={TEST_IDS.fieldV}
                onChange={value => handleChange({ ...rawValue.hsva, v: Number(value) })}
              />
            </>
          )}

          {withAlpha && (
            <FieldAlphaColor
              rgba={rawValue.rgba}
              onChange={handleChange}
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
            onChange={v => handleChange({ ...rawValue.hsva, h: Math.round(v) })}
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
              onChange={v => handleChange({ ...rawValue.rgba, r: Math.round(v) })}
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
              onChange={v => handleChange({ ...rawValue.rgba, g: Math.round(v) })}
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
              onChange={v => handleChange({ ...rawValue.rgba, b: Math.round(v) })}
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
              onChange={v => handleChange({ ...rawValue.hsva, h: Math.round(v) })}
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
              onChange={v => handleChange({ ...rawValue.hsva, s: Math.round(v) })}
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
              onChange={v => handleChange({ ...rawValue.hsva, v: Math.round(v) })}
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
            onChange={v => handleChange({ ...rawValue.rgba, a: v / 100 })}
          />
        )}
      </div>

      {!autoApply && (
        <div className={styles.footer}>
          <Button
            label={t('cancel')}
            size={size}
            view='function'
            onClick={reset}
            data-test-id={TEST_IDS.cancel}
            appearance='neutral'
          />
          <Button
            label={t('apply')}
            view='filled'
            appearance='primary'
            size={size}
            onClick={applyChange}
            data-test-id={TEST_IDS.apply}
          />
        </div>
      )}
    </div>
  );
}
