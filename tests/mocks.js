export const falsyValues = [0, 0.0, '', false, null, undefined, NaN];
export const truthyValues = ['foo', 1, 1.1, true, [], {}];
export const allValues = [...falsyValues, ...truthyValues];
export const options = {
  defaultNull: false,
  defaultRequired: false,
  indentCharacter: '  ',
  renderer: 'react',
  includeSchemas: false,
  includeTypes: false,
};
