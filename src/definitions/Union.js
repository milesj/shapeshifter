import Definition from '../Definition';
import Factory from '../Factory';

export default class UnionDefinition extends Definition {
  validateConfig() {
    super.validateConfig();

    const { valueTypes } = this.config;

    if (!Array.isArray(valueTypes) || !valueTypes.length) {
      throw new Error(
        'Union definitions require a "valueTypes" property, ' +
        'which is a list of type definitions'
      );
    }

    this.valueTypes = valueTypes.map((type, i) => Factory.definition(`union${i}`, type));
  }
}
