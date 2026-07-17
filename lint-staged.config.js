// Generated design tokens are excluded from lint/format: build/ must stay
// byte-identical to `pnpm run build:tokens` output (formatting breaks regen
// reproducibility; eslint also OOMs on the large generated styles.js).
const IGNORED = /(?:^|\/)packages\/figma-variables\/build\//;
const keep = files => files.filter(f => !IGNORED.test(f));
const quote = f => `"${f}"`;

module.exports = {
  '*.{ts,js,tsx,jsx}': files => {
    const f = keep(files).map(quote);
    return f.length ? [`eslint --fix ${f.join(' ')}`, `prettier --write ${f.join(' ')}`] : [];
  },
  '*.css': files => {
    const f = keep(files).map(quote);
    return f.length ? [`stylelint --fix ${f.join(' ')}`] : [];
  },
  '*.scss': files => {
    const f = keep(files).map(quote);
    return f.length ? [`stylelint --fix ${f.join(' ')}`] : [];
  },
};
