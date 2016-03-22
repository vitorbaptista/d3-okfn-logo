import node from "rollup-plugin-node-resolve";

export default {
  plugins: [node({jsnext: true})],
  entry: 'src/index.js',
  sourceMap: true,
  moduleId: 'd3-ok-logo',
  moduleName: 'd3OKLogo',
  format: 'umd',
};
