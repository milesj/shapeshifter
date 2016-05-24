import Definition from '../Definition';
import Factory from '../Factory';

export default class Array extends Definition {
    validateConfig() {
        super.validateConfig();

        let { valueType } = this.config;

        if (!valueType) {
            throw new SyntaxError('Array definitions require a "valueType" property.');
        }

        this.valueType = Factory.definition('valueType', valueType);
    }
}
