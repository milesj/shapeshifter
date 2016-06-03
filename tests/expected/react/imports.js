import { PropTypes } from 'react';
import DefaultName from '/path/to/ImportClassName';
import { foo, bar } from '/path/to/named/Imports';
import AnotherDefault, { Baz, QUX } from '/path/to/named/and/Defaults';

export const ImportsSchema = PropTypes.shape({
  stringField: PropTypes.string,
});
