/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';
import Factory from '../Factory';

export default class FuncDefinition extends Definition {
  /**
   * {@inheritDoc}
   */
  validateConfig(): void {
    super.validateConfig();

    const { argTypes, returnType } = this.config;

    if (typeof returnType !== 'undefined') {
      this.returnType = Factory.definition(this.options, 'returnType', returnType);
    }

    if (typeof argTypes !== 'undefined') {
      if (!Array.isArray(argTypes)) {
        throw new SyntaxError('Function argument types must be an array of type definitions.');
      } else {
        this.argTypes = argTypes.map((type, i) => (
          Factory.definition(this.options, `arg${i}`, type)
        ));
      }
    }
  }
}
