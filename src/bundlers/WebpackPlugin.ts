/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';
import { Options } from '../types';

export interface WebpackPluginOptions extends Options {
  schematicsImportPath?: string;
  schematicsSource: string | string[];
}

export default class WebpackPlugin {
  options: Options;

  schematicsImportPath: string;

  schematicsSource: string[];

  constructor(options: WebpackPluginOptions) {
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
    // Webpack 4
    if (compiler.hooks) {
      compiler.hooks.normalModuleFactory.tap('ShapeshifterWebpackPlugin', nmf => {
        nmf.hooks.afterResolve.tapAsync('ShapeshifterWebpackPlugin', this.handleResolve);
      });

      // Webpack 3
    } else {
      compiler.plugin('normal-module-factory', nmf => {
        nmf.plugin('after-resolve', this.handleResolve);
      });
    }
  }

  handleResolve = (result: any, callback: any) => {
    if (result.rawRequest === this.schematicsImportPath) {
      result.loaders.push({
        loader: path.join(__dirname, './webpackLoader.js'),
        options: {
          ...this.options,
          schematicsSource: this.schematicsSource,
        },
      });
    }

    callback(null, result);
  };
}
