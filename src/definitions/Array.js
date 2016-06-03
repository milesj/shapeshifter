import Definition from '../Definition';
import Factory from '../Factory';

export default class ArrayDefinition extends Definition {
  /**
   * {@inheritDoc}
   */
  validateConfig() {
    super.validateConfig();

    const { valueType } = this.config;

    if (!valueType) {
      throw new SyntaxError('Array definitions require a "valueType" property.');
    }

    this.valueType = Factory.definition('valueType', valueType);
  }
}
