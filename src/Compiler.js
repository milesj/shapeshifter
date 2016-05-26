import fs from 'fs';

export default class Compiler {
  compile(path) {
    return new Promise((resolve, reject) => {
      fs.state(path, (error, stats) => {
        if (error) {
          reject(error);
        }

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

  }

  compileFile(path) {

  }
}
