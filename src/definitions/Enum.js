import { TYPE_COMPOSITE } from '../constants';
import isPrimitive from '../helpers/isPrimitive';

export default function enumerable(type, values = []) {
    if (!isPrimitive(type)) {
        throw new TypeError('Enumerable type must be a primitive: bool, func, number, string, instance.');

    } else if (!Array.isArray(values)) {
        throw new TypeError('Enumerable values must be an array.');

    } else if (!values.every(value => type.validate(value))) {
        throw new TypeError('Enumerable values do not match the defined type.');
    }

    return {
        definition: 'enum',
        dataType: TYPE_COMPOSITE,
        type,
        values,
        validate(value) {
            return (type.validate(value) && values.indexOf(value) >= 0);
        },
    };
}
