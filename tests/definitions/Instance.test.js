import { expect } from 'chai';
import { options, falsyValues, truthyValues } from '../mocks';
import InstanceDefinition from '../../lib/definitions/Instance';

describe('definitions/Instance', () => {
  it('errors if `contract` is empty', () => {
    falsyValues.forEach((value) => {
      expect(() => (
        new InstanceDefinition(options, 'foo', { contract: value })
      )).to.throw(SyntaxError,
        'Instance definitions require a "contract" property, ' +
        'which is the function or class name to evaluate against.');
    });
  });

  it('errors if `contract` is not a string', () => {
    truthyValues
      .filter(value => typeof value !== 'string')
      .forEach((value) => {
        expect(() => (
          new InstanceDefinition(options, 'foo', { contract: value })
        )).to.throw(TypeError, 'Invalid type detected, "contract" property must be a string.');
      });
  });
});
