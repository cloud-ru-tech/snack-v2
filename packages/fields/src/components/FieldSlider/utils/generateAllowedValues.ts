export function generateAllowedValues(min: number, max: number, step: number | null): number[] {
  // step <= 0 (или null) дал бы бесконечный цикл — снэп к шкале невозможен, возвращаем только min.
  if (step === null || step <= 0) {
    return [min];
  }
  const values: number[] = [];
  let current = min;
  while (current <= max) {
    values.push(parseFloat(current.toFixed(10)));
    current += step;
  }
  return values;
}
