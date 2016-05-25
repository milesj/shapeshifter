import Definition from '../Definition';
import Factory from '../Factory';

export default class ShapeDefinition extends Definition {
    validateConfig() {
        super.validateConfig();

        let { attributes } = this.config;

        if (!attributes || !Object.keys(attributes).length) {
            throw new Error(
                'Shape definitions require an "attributes" property, ' +
                'which is an object mapping of attributes to type definitions.'
            );
        }

        this.attributes = Object.keys(attributes).map(attribute => (
          Factory.definition(attribute, attributes[attribute])
        ));
    }
}
