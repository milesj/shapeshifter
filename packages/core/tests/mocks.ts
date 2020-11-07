import { Options } from '../src/types';

export const falsyValues = [0, 0, '', false, null, undefined, Number.NaN];

// eslint-disable-next-line no-magic-numbers
export const truthyValues = ['foo', 1, 1.1, true, [], {}];

export const allValues = [...falsyValues, ...truthyValues];

export const options: Options = {
  defaultNullable: false,
  defaultOptional: true,
  disableEslint: true,
  enums: true,
  importPath: 'shapeshifter',
  includeAttributes: false,
  includeDefinitions: false,
  includeSchemas: false,
  indentCharacter: '  ',
  inferPropTypesShape: false,
  renderers: ['prop-types'],
  schemaGenerics: false,
  stripPropTypes: false,
  suffix: true,
  useDefine: false,
};
