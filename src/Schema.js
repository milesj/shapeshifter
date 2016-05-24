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
        } else if (!schema.fields || !Object.keys(schema.fields).length) {
            throw new Error('No fields found in schema.')
        }

        this.schema = schema;
        this.name = schema.name;
        this.fields = [];
        this.fieldNames = Object.keys(schema.fields);
    }

    parse() {
        this.fields = this.fieldNames
          .map(field => Factory.definition(field, this.schema.fields[field]));

        return this;
    }
}
