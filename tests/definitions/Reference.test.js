import { expect } from 'chai';
import { falsyValues, truthyValues } from '../mock-data';
import ReferenceDefinition from '../../lib/definitions/Reference';

describe('definitions/Reference', () => {
  it('errors if `reference` is empty', () => {
    falsyValues.forEach(value => {
      expect(() => (
        new ReferenceDefinition('foo', { reference: value })
      )).to.throw(SyntaxError,
        'Reference definitions require a "reference" property, ' +
        'which points to an external schema to use.');
    });
  });

  it('errors if `reference` is not a string', () => {
    truthyValues
      .filter(value => typeof value !== 'string')
      .forEach(value => {
        expect(() => (
          new ReferenceDefinition('foo', { reference: value })
        )).to.throw(TypeError, 'Invalid type detected, "reference" property must be a string.');
      });
  });

  it('errors if `subset` is not a string', () => {
    truthyValues
      .filter(value => typeof value !== 'string')
      .forEach(value => {
        expect(() => (
          new ReferenceDefinition('foo', { reference: 'foo', subset: value })
        )).to.throw(TypeError, 'Invalid type detected, "subset" property must be a string.');
      });
  });
});
