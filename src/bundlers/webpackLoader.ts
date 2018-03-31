/**
 * @copyright   2016-2017, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable promise/always-return, promise/no-callback-in-promise, babel/no-invalid-this */

import webpack from 'webpack';
import Transpiler from '../Transpiler';

export default function webpackLoader(this: webpack.loader.LoaderContext) {
  const { schematicsSource, ...options } = this.query;
  const callback = this.async() as webpack.loader.loaderCallback;

  // Mark as cacheable
  this.cacheable();

  // Add schematics folder as a dependency
  schematicsSource.forEach((depPath: string) => {
    this.addDependency(depPath);
  });

  // Transpile the schematics
  new Transpiler(options)
    .transpile(schematicsSource)
    .then(source => {
      callback(null, source);
    })
    .catch(error => {
      callback(error);
    });
}
