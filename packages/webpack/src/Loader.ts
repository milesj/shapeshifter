/* eslint-disable babel/no-invalid-this, promise/no-callback-in-promise */

import webpack from 'webpack';
import { Options } from 'shapeshifter';
import Transpiler from 'shapeshifter/lib/Transpiler';

export interface ShapeshifterLoaderOptions extends Options {
  schematicsSource: string[];
}

export default function loader(this: webpack.loader.LoaderContext) {
  const { schematicsSource, ...options } = this.query as ShapeshifterLoaderOptions;
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
    .then((source) => callback(null, source))
    .catch((error) => callback(error));
}
