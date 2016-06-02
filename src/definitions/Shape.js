import Definition from '../Definition';
import Factory from '../Factory';

export default class ShapeDefinition extends Definition {
  /**
   * {@inheritdoc}
   */
  validateConfig() {
    super.validateConfig();

    const { attributes } = this.config;

    if (!attributes || typeof attributes !== 'object' || !Object.keys(attributes).length) {
      throw new SyntaxError(
        'Shape definitions require an "attributes" property, ' +
        'which is an object mapping of attributes to type definitions.'
      );
    }

    this.attributes = Object.keys(attributes).map(attribute => (
      Factory.definition(attribute, attributes[attribute])
    ));
  }
}
