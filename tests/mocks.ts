import { Options } from '../packages/core/src/types';

export const falsyValues = [0, 0.0, '', false, null, undefined, NaN];

export const truthyValues = ['foo', 1, 1.1, true, [], {}];

export const allValues = [...falsyValues, ...truthyValues];

export const options: Options = {
  defaultNullable: false,
  defaultOptional: true,
  disableEslint: true,
  enums: true,
  indentCharacter: '  ',
  importPath: 'shapeshifter',
  includeSchemas: false,
  includeAttributes: false,
  includeDefinitions: false,
  inferPropTypesShape: false,
  renderers: ['prop-types'],
  schemaGenerics: false,
  stripPropTypes: false,
  suffix: true,
  useDefine: false,
};
