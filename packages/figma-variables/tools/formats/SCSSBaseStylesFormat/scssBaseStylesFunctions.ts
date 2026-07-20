export function printPredefinedFunctions(): string {
  return `@use 'sass:map';
@use 'sass:list';
@use 'sass:meta';

@function could-not-find-token-message($keys) {
  @return 'Couldn\\'t find token by given keys: #{$keys}';
}

@function getValidKeys($map: (), $keys...) {
  $no-keys-passed: list.length($keys) == 0;

  @if ($no-keys-passed != true and map.has-key($map, $keys...) != true) {
    @return false;
  }

  @return if(sass($no-keys-passed): $map; else: map.get($map, $keys...));
}

@function simple-var($map: (), $keys...) {
  $value: getValidKeys($map, $keys...);

  @if ($value == false) {
    @error could-not-find-token-message($keys);
  }

  @return $value;
}

@mixin composite-var($map: (), $keys...) {
  $inner-map: getValidKeys($map, $keys...);

  @if ($inner-map == false) {
    @error could-not-find-token-message($keys);
  }

  @each $key, $value in $inner-map {
    // Пропускаем свойства, которые являются вложенными картами (не листовые значения)
    @if meta.type-of($value) != map {
      #{$key}: simple-var($inner-map, $key);
    }
  }
}

@mixin outline-var($map: (), $keys...) {
  $inner-map: getValidKeys($map, $keys...);

  @if ($inner-map == false) {
    @error could-not-find-token-message($keys);
  }

  outline-width: simple-var($inner-map, 'border-width');
  outline-style: simple-var($inner-map, 'border-style');
  outline-color: simple-var($inner-map, 'border-color');
}

@mixin outline-inside-var($map: (), $keys...) {
  $inner-map: getValidKeys($map, $keys...);

  @if ($inner-map == false) {
    @error could-not-find-token-message($keys);
  }

  @include outline-var($inner-map, $keys...);

  outline-offset: calc(simple-var($inner-map, 'border-width') * -1);
}

// $opacity в диапазоне 0–1 (как в CSS)
@function color-on-background-with-opacity($color, $background-color, $opacity) {
  @return color-mix(in srgb, $color, $background-color calc((1 - $opacity) * 100%));
}`;
}
