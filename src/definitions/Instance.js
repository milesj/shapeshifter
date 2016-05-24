import Definition from '../Definition';

export default class InstanceDefinition extends Definition {
    validateConfig() {
        super.validateConfig();

        let { contract } = this.config;

        if (!contract) {
            throw new SyntaxError(
                'Instance definitions require a "contract" property, ' +
                'which is the function or class name to evaluate against.'
            );

        } else if (typeof contract !== 'string') {
            throw new TypeError('Invalid type detected, "contract" property must be a string.');
        }
    }
}
