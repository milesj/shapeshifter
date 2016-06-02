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

describe('Factory', () => {
  describe('definition()', () => {
    it('allows primitives to be passed as strings', () => {
      expect(Factory.definition('foo', 'string')).to.be.instanceOf(StringDefinition);
    });

    it('errors on invalid primitives', () => {
      expect(() => (
        Factory.definition('foo', 'array')
      )).to.throw(TypeError, 'Invalid primitive type "array".');

      expect(() => (
        Factory.definition('foo', 'bar')
      )).to.throw(TypeError, 'Invalid primitive type "bar".');
    });

    it('errors on missing object type', () => {
      expect(() => (
        Factory.definition('foo', { noType: 'hah' })
      )).to.throw(SyntaxError, 'Definitions require a "type" property.');

      expect(() => (
        Factory.definition('foo', { type: '' })
      )).to.throw(SyntaxError, 'Definitions require a "type" property.');
    });

    it('factories definition objects', () => {
      expect(Factory.definition('foo', {
        type: 'array',
        valueType: 'string',
      })).to.be.instanceOf(ArrayDefinition);

      expect(Factory.definition('foo', { type: 'boolean' })).to.be.instanceOf(BoolDefinition);

      expect(Factory.definition('foo', {
        type: 'enum',
        valueType: 'string',
        values: ['foo'],
      })).to.be.instanceOf(EnumDefinition);

      expect(Factory.definition('foo', { type: 'function' })).to.be.instanceOf(FuncDefinition);

      expect(Factory.definition('foo', {
        type: 'instance',
        contract: 'foo',
      })).to.be.instanceOf(InstanceDefinition);

      expect(Factory.definition('foo', { type: 'number' })).to.be.instanceOf(NumberDefinition);

      expect(Factory.definition('foo', {
        type: 'object',
        keyType: 'string',
        valueType: 'number',
      })).to.be.instanceOf(ObjectDefinition);

      expect(Factory.definition('foo', {
        type: 'shape',
        attributes: { foo: 'string' },
      })).to.be.instanceOf(ShapeDefinition);

      expect(Factory.definition('foo', { type: 'string' })).to.be.instanceOf(StringDefinition);

      expect(Factory.definition('foo', {
        type: 'union',
        valueTypes: ['string'],
      })).to.be.instanceOf(UnionDefinition);
    });

    it('factories definition objects using aliases', () => {
      expect(Factory.definition('foo', { type: 'bool' })).to.be.instanceOf(BoolDefinition);

      expect(Factory.definition('foo', { type: 'func' })).to.be.instanceOf(FuncDefinition);

      expect(Factory.definition('foo', {
        type: 'inst',
        contract: 'foo',
      })).to.be.instanceOf(InstanceDefinition);

      expect(Factory.definition('foo', { type: 'integer' })).to.be.instanceOf(NumberDefinition);

      expect(Factory.definition('foo', {
        type: 'OBJ',
        keyType: 'string',
        valueType: 'number',
      })).to.be.instanceOf(ObjectDefinition);

      expect(Factory.definition('foo', {
        type: 'StrucT',
        attributes: { foo: 'string' },
      })).to.be.instanceOf(ShapeDefinition);
    });
  });

  describe('renderer()', () => {
    it('factories renderer objects', () => {
      expect(Factory.renderer('flow')).to.be.instanceOf(FlowRenderer);
      expect(Factory.renderer('ReAcT')).to.be.instanceOf(ReactRenderer);
      expect(Factory.renderer('TYPESCRIPT')).to.be.instanceOf(TypeScriptRenderer);
    });

    it('errors for invalid renderer', () => {
      expect(() => Factory.renderer('foo')).to.throw(Error, 'Renderer "foo" not supported.');
    });
  });
});
