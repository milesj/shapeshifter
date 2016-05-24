import Definition from '../Definition';
import Factory from '../Factory';

export default class ObjectDefinition extends Definition {
    validateConfig() {
        super.validateConfig();

        let { keyType = 'string', valueType } = this.config;

        if (!valueType) {
            throw new SyntaxError('Object definitions require a "valueType" property.');
        }

        if (typeof keyType !== 'string' && keyType !== 'number') {
            throw new TypeError(
                `Object key type "${valueType || 'unknown'}" not supported; ` +
                'accepts "number" or "string".'
            );
        }

        this.keyType = Factory.definition('keyType', keyType);
        this.valueType = Factory.definition('valueType', valueType);
    }
}
