import Factory from './Factory';
import isObject from './helpers/isObject';

export default class Schema {
    constructor(json) {
        let schema = {};

        if (typeof json === 'string') {
            schema = JSON.parse(json);
        } else if (isObject(json)) {
            schema = json;
        } else {
            throw new SyntaxError('Schema requires a valid JSON structure.');
        }

        if (!schema.name) {
            throw new Error('No name found in schema.');

        } else if (!schema.attributes || !Object.keys(schema.attributes).length) {
            throw new Error('No attributes found in schema.')
        }

        this.schema = schema;
        this.name = schema.name;
        this.constants = schema.constants || [];
        this.formats = schema.formats || [];
        this.attributes = Object.keys(schema.attributes).map(attribute => (
            Factory.definition(attribute, schema.attributes[attribute])
        ));

        return this;
    }
}
