import ArrayDef from './definitions/Array';
import BoolDef from './definitions/Bool';
import EnumDef from './definitions/Enum';
import FuncDef from './definitions/Func';
import InstanceDef from './definitions/Instance';
import NumberDef from './definitions/Number';
import ObjectDef from './definitions/Object';
import ShapeDef from './definitions/Shape';
import StringDef from './definitions/String';

export default class Compiler {
    constructor(schema) {
        this.schema = schema;
    }

    compileFields() {
        let fields = [];

        this.schema.fieldNames.forEach(field => {
            let definition = this.schema.fields[field];

            if (definition instanceof BoolDef) {
                fields.push(this.renderBool(field, definition));

            } else if (definition instanceof FuncDef) {
                fields.push(this.renderFunc(field, definition));

            } else if (definition instanceof NumberDef) {
                fields.push(this.renderNumber(field, definition));

            } else if (definition instanceof StringDef) {
                fields.push(this.renderString(field, definition));
            }
        });

        return fields;
    }
}
