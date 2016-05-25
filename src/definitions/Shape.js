import Definition from '../Definition';
import Factory from '../Factory';

export default class ShapeDefinition extends Definition {
    validateConfig() {
        super.validateConfig();

        let { fields } = this.config;

        if (!fields || !Object.keys(fields).length) {
            throw new Error(
                'Shape definitions require a "shape" property, ' +
                'which is an object mapping of fields to type definitions.'
            );
        }

        this.fields = Object.keys(fields).map(field => Factory.definition(field, fields[field]));
    }
}
