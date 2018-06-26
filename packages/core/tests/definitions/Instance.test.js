import { options, truthyValues } from '../../../../tests/mocks';
import InstanceDefinition from '../../src/definitions/Instance';

describe('definitions/Instance', () => {
  it('errors if `contract` is missing', () => {
    expect(() => new InstanceDefinition(options, 'foo', {})).toThrowError(
      'Invalid InstanceDefinition field "contract". Field is required and must be defined.',
    );
  });

  it('errors if `contract` is empty', () => {
    expect(() => new InstanceDefinition(options, 'foo', { contract: '' })).toThrowError(
      'Invalid InstanceDefinition field "contract". String cannot be empty.',
    );
  });

  it('errors if `contract` is not a string', () => {
    truthyValues.filter(value => typeof value !== 'string').forEach(value => {
      expect(() => new InstanceDefinition(options, 'foo', { contract: value })).toThrowError(
        'Invalid InstanceDefinition field "contract". Must be a string.',
      );
    });
  });
});
