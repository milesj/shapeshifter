/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */
/* eslint-disable promise/always-return, promise/no-callback-in-promise */

import Transpiler from '../Transpiler';

export default function webpackLoader() {
  const { schematicsSource, ...options } = this.query;
  const callback = this.async();
  const transpiler = new Transpiler(options);

  // Mark as cacheable
  this.cacheable();

  // Add schematics folder as a dependency
  schematicsSource.forEach((depPath) => {
    this.addDependency(depPath);
  });

  // Transpile the schematics
  transpiler.transpile(schematicsSource)
    .then((source) => {
      callback(null, source);
    })
    .catch((error) => {
      callback(error);
    });
}
