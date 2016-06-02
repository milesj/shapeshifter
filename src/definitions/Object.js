import Definition from '../Definition';
import Factory from '../Factory';

export default class ObjectDefinition extends Definition {
  /**
   * {@inheritdoc}
   */
  constructor(attribute, config) {
    super(attribute, {
      keyType: 'string',
      ...config,
    });
  }

  /**
   * {@inheritdoc}
   */
  validateConfig() {
    super.validateConfig();

    const { keyType, valueType } = this.config;

    if (!valueType) {
      throw new SyntaxError('Object definitions require a "valueType" property.');

    } else if (!keyType) {
      throw new SyntaxError('Object definitions require a "keyType" property.');

    } else if (typeof keyType !== 'string') {
      throw new TypeError(`Object key type "${keyType || 'unknown'}" not supported.`);
    }

    this.keyType = Factory.definition('keyType', keyType);
    this.valueType = Factory.definition('valueType', valueType);
  }
}
