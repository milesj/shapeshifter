import Definition from '../Definition';

export default class Instance extends Definition {
    validateConfig() {
        super.validateConfig();

        let config = this.config;

        if (!config.contract) {
            throw new SyntaxError(
                'Instance definitions require a "contract" property, ' +
                'which is the function or class name to evaluate against.'
            );

        } else if (typeof config.contract !== 'string') {
            throw new TypeError('Invalid type detected, "contract" property must be a string.');
        }
    }
}
