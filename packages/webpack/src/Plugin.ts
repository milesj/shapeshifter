import path from 'path';
import webpack from 'webpack';
import { Options } from 'shapeshifter';

export interface ShapeshifterPluginOptions extends Options {
  schematicsImportPath?: string;
  schematicsSource: string | string[];
}

export default class ShapeshifterPlugin {
  options: Options;

  schematicsImportPath: string;

  schematicsSource: string[];

  constructor(options: ShapeshifterPluginOptions) {
    const { schematicsImportPath = 'shapeshifter/schematics', schematicsSource, ...opts } = options;

    if (!schematicsImportPath) {
      throw new Error('An import name is required to resolve with.');
    }

    if (!schematicsSource) {
      throw new Error('A file path to the location of shapeshifter schematics is required.');
    }

    this.options = opts;
    this.schematicsImportPath = schematicsImportPath;
    this.schematicsSource = Array.isArray(schematicsSource) ? schematicsSource : [schematicsSource];
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.normalModuleFactory.tap('ShapeshifterWebpackPlugin', (nmf) => {
      nmf.hooks.afterResolve.tapAsync('ShapeshifterWebpackPlugin', this.handleResolve);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleResolve = (result: any, callback: (...args: unknown[]) => void) => {
    if (result.rawRequest === this.schematicsImportPath) {
      result.loaders.push({
        loader: path.join(__dirname, './Loader.js'),
        options: {
          ...this.options,
          schematicsSource: this.schematicsSource,
        },
      });
    }

    callback(null, result);
  };
}
