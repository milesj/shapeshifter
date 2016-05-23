import { TYPES } from '../constants';

export default function isSupported(type) {
    return (TYPES.indexOf(type) >= 0);
}
