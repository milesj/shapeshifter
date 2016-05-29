import fs from 'fs';
import config from './config';
import FlowRenderer from './renderers/Flow';
import ReactRenderer from './renderers/React';
import TypeScriptRenderer from './renderers/TypeScript';

export default class Compiler {
  constructor(options) {
    config.defaultNull = options.null;
    config.defaultRequired = options.required;
    config.indentCharacter = options.indent;
    config.renderer = options.renderer;
    config.schemaSuffix = options.suffix;
  }

  compile(path) {
    return new Promise((resolve, reject) => {
      fs.stats(path, (error, stats) => {
        if (error) {
          reject(error);
        }

        console.log(stats);

        if (stats.isDirectory()) {
          resolve(this.compileFolder(path));
        } else if (stats.isFile()) {
          resolve(this.compileFile(path));
        } else {
          reject('Unsupported file type.');
        }
      })
    });
  }

  compileFolder(path) {
    console.log(path);
  }

  compileFile(path) {
    console.log(path);
  }

  createRenderer(schema) {
    switch (config.renderer) {
      case 'react':
        return new ReactRenderer(schema);
      case 'flow':
        return new FlowRenderer(schema);
      case 'ts':
      case 'typescript':
        return new TypeScriptRenderer(schema);
    }
  }
}
