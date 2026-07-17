const colorMode = process.env.ICON_COLOR_MODE === 'preserve' ? 'preserve' : 'currentColor';

module.exports = {
  template: require('./standaloneIconComponentTemplate.cjs')({ size: 24, colorMode }),
  indexTemplate: require('./flatIndexTemplate.cjs'),
  ext: 'tsx',
  typescript: true,
  // JSX иконки теперь лежит на module-scope (children конфига createStandaloneIcon) —
  // spread {...props} от svgr там не к чему привязать, обёртку <svg> даёт фабрика.
  expandProps: false,
};
