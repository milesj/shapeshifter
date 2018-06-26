export const falsyValues = [0, 0.0, '', false, null, undefined, NaN];

export const truthyValues = ['foo', 1, 1.1, true, [], {}];

export const allValues = [...falsyValues, ...truthyValues];

export const options = {
  defaultNullable: true,
  defaultOptional: true,
  disableEslint: true,
  indentCharacter: '  ',
  renderers: ['prop-types'],
  includeSchemas: false,
  includeAttributes: false,
  includeDefinitions: false,
  inferPropTypesShape: false,
};
