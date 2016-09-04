import { expect } from 'chai';
import Factory from '../lib/Factory';
import ArrayDefinition from '../lib/definitions/Array';
import BoolDefinition from '../lib/definitions/Bool';
import EnumDefinition from '../lib/definitions/Enum';
import FuncDefinition from '../lib/definitions/Func';
import InstanceDefinition from '../lib/definitions/Instance';
import NumberDefinition from '../lib/definitions/Number';
import ObjectDefinition from '../lib/definitions/Object';
import ShapeDefinition from '../lib/definitions/Shape';
import StringDefinition from '../lib/definitions/String';
import UnionDefinition from '../lib/definitions/Union';
import FlowRenderer from '../lib/renderers/Flow';
import ReactRenderer from '../lib/renderers/React';
import TypeScriptRenderer from '../lib/renderers/TypeScript';
import { options } from './mocks';

describe('Factory', () => {
  describe('definition()', () => {
    it('allows primitives to be passed as strings', () => {
      expect(Factory.definition(options, 'foo', 'string')).to.be.instanceOf(StringDefinition);
    });

    it('errors on invalid primitives', () => {
      expect(() => (
        Factory.definition(options, 'foo', 'array')
      )).to.throw(TypeError, 'Invalid primitive type "array".');

      expect(() => (
        Factory.definition(options, 'foo', 'bar')
      )).to.throw(TypeError, 'Invalid primitive type "bar".');
    });

    it('errors on missing object type', () => {
      expect(() => (
        Factory.definition(options, 'foo', { noType: 'hah' })
      )).to.throw(SyntaxError, 'Definitions require a "type" property.');

      expect(() => (
        Factory.definition(options, 'foo', { type: '' })
      )).to.throw(SyntaxError, 'Definitions require a "type" property.');
    });

    it('factories definition objects', () => {
      expect(Factory.definition(options, 'foo', {
        type: 'array',
        valueType: 'string',
      })).to.be.instanceOf(ArrayDefinition);

      expect(Factory.definition(options, 'foo', { type: 'boolean' })).to.be.instanceOf(BoolDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'enum',
        valueType: 'string',
        values: ['foo'],
      })).to.be.instanceOf(EnumDefinition);

      expect(Factory.definition(options, 'foo', { type: 'function' })).to.be.instanceOf(FuncDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'instance',
        contract: 'foo',
      })).to.be.instanceOf(InstanceDefinition);

      expect(Factory.definition(options, 'foo', { type: 'number' })).to.be.instanceOf(NumberDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'object',
        keyType: 'string',
        valueType: 'number',
      })).to.be.instanceOf(ObjectDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'shape',
        attributes: { foo: 'string' },
      })).to.be.instanceOf(ShapeDefinition);

      expect(Factory.definition(options, 'foo', { type: 'string' })).to.be.instanceOf(StringDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'union',
        valueTypes: ['string'],
      })).to.be.instanceOf(UnionDefinition);
    });

    it('factories definition objects using aliases', () => {
      expect(Factory.definition(options, 'foo', { type: 'bool' })).to.be.instanceOf(BoolDefinition);

      expect(Factory.definition(options, 'foo', { type: 'func' })).to.be.instanceOf(FuncDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'inst',
        contract: 'foo',
      })).to.be.instanceOf(InstanceDefinition);

      expect(Factory.definition(options, 'foo', { type: 'integer' })).to.be.instanceOf(NumberDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'OBJ',
        keyType: 'string',
        valueType: 'number',
      })).to.be.instanceOf(ObjectDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'StrucT',
        attributes: { foo: 'string' },
      })).to.be.instanceOf(ShapeDefinition);
    });
  });

  describe('renderer()', () => {
    it('factories renderer objects', () => {
      expect(Factory.renderer({
        ...options,
        renderer: 'flow',
      })).to.be.instanceOf(FlowRenderer);

      expect(Factory.renderer({
        ...options,
        renderer: 'ReAcT',
      })).to.be.instanceOf(ReactRenderer);

      expect(Factory.renderer({
        ...options,
        renderer: 'TYPESCRIPT',
      })).to.be.instanceOf(TypeScriptRenderer);
    });

    it('errors for invalid renderer', () => {
      expect(() => Factory.renderer({
        ...options,
        renderer: 'foo',
      })).to.throw(Error, 'Renderer "foo" not supported.');
    });
  });
});
