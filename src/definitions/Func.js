/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import Definition from '../Definition';
import DefinitionFactory from '../DefinitionFactory';

import type { FuncConfig } from '../types';

export default class FuncDefinition extends Definition {
  config: FuncConfig;
  argTypes: ?Definition[];
  returnType: ?Definition;

  /**
   * {@inheritDoc}
   */
  validateConfig() {
    super.validateConfig();

    const { argTypes, returnType } = this.config;

    if (typeof returnType !== 'undefined') {
      this.returnType = DefinitionFactory.factory(this.options, 'returnType', returnType);
    }

    if (typeof argTypes !== 'undefined') {
      if (!Array.isArray(argTypes)) {
        throw new SyntaxError('Function argument types must be an array of type definitions.');
      } else {
        this.argTypes = argTypes.map((type, i) => (
          DefinitionFactory.factory(this.options, `arg${i}`, type)
        ));
      }
    }
  }
}
