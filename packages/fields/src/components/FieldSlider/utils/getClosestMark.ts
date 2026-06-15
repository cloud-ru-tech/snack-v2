function getDiff(value: number, mark: number): number {
  return Math.abs(mark - value);
}

export function getClosestMark<T>(
  value: number,
  marks: T[],
  getMarkValue: (value: T) => number,
): { lowestDiff: number; mark: T } | undefined {
  if (marks.length === 0) {
    return undefined;
  }
  const [first, ...others] = marks;
  return others.reduce(
    (acc, mark) => {
      const diff = getDiff(value, getMarkValue(mark));
      return diff < acc.lowestDiff ? { lowestDiff: diff, mark } : acc;
    },
    { lowestDiff: getDiff(value, getMarkValue(first)), mark: first },
  );
}
