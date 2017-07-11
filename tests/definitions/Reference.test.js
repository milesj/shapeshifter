import { options, truthyValues } from '../mocks';
import ReferenceDefinition from '../../src/definitions/Reference';

describe('definitions/Reference', () => {
  it('errors if `reference` and `self` are neither defined', () => {
    expect(() => (
      new ReferenceDefinition(options, 'foo', {})
    )).toThrowError('Invalid ReferenceDefinition option "reference". Only one of these options may be defined: reference, self');
  });

  it('errors if `reference` and `self` are both defined', () => {
    expect(() => (
      new ReferenceDefinition(options, 'foo', { reference: '', self: false })
    )).toThrowError('Invalid ReferenceDefinition option "reference". Only one of these options may be defined: reference, self');
  });

  it('errors if `reference` is not a string', () => {
    truthyValues
      .filter(value => typeof value !== 'string')
      .forEach((value) => {
        expect(() => (
          new ReferenceDefinition(options, 'foo', { reference: value })
        )).toThrowError('Invalid ReferenceDefinition option "reference". Must be a string.');
      });
  });

  it('errors if `self` is not a boolean', () => {
    truthyValues
      .filter(value => typeof value !== 'boolean')
      .forEach((value) => {
        expect(() => (
          new ReferenceDefinition(options, 'foo', { self: value })
        )).toThrowError('Invalid ReferenceDefinition option "self". Must be a boolean.');
      });
  });

  it('errors if `subset` is not a string', () => {
    truthyValues
      .filter(value => typeof value !== 'string')
      .forEach((value) => {
        expect(() => (
          new ReferenceDefinition(options, 'foo', { reference: 'foo', subset: value })
        )).toThrowError('Invalid ReferenceDefinition option "subset". Must be a string.');
      });
  });

  it('errors if `export` is not a boolean', () => {
    truthyValues
      .filter(value => typeof value !== 'boolean')
      .forEach((value) => {
        expect(() => (
          new ReferenceDefinition(options, 'foo', { reference: 'foo', export: value })
        )).toThrowError('Invalid ReferenceDefinition option "export". Must be a boolean.');
      });
  });
});
