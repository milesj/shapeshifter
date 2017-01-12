import Factory from '../src/Factory';
import ArrayDefinition from '../src/definitions/Array';
import BoolDefinition from '../src/definitions/Bool';
import EnumDefinition from '../src/definitions/Enum';
import FuncDefinition from '../src/definitions/Func';
import InstanceDefinition from '../src/definitions/Instance';
import NumberDefinition from '../src/definitions/Number';
import ObjectDefinition from '../src/definitions/Object';
import ShapeDefinition from '../src/definitions/Shape';
import StringDefinition from '../src/definitions/String';
import UnionDefinition from '../src/definitions/Union';
import FlowRenderer from '../src/renderers/Flow';
import ReactRenderer from '../src/renderers/React';
import TypeScriptRenderer from '../src/renderers/TypeScript';
import { options } from './mocks';

describe('Factory', () => {
  describe('definition()', () => {
    it('allows primitives to be passed as strings', () => {
      expect(Factory.definition(options, 'foo', 'string')).toBeInstanceOf(StringDefinition);
    });

    it('errors on invalid primitives', () => {
      expect(() => (
        Factory.definition(options, 'foo', 'array')
      )).toThrowError('Invalid primitive type "array".');

      expect(() => (
        Factory.definition(options, 'foo', 'bar')
      )).toThrowError('Invalid primitive type "bar".');
    });

    it('errors on missing object type', () => {
      expect(() => (
        Factory.definition(options, 'foo', { noType: 'hah' })
      )).toThrowError('Definitions require a "type" property.');

      expect(() => (
        Factory.definition(options, 'foo', { type: '' })
      )).toThrowError('Definitions require a "type" property.');
    });

    it('factories definition objects', () => {
      expect(Factory.definition(options, 'foo', {
        type: 'array',
        valueType: 'string',
      })).toBeInstanceOf(ArrayDefinition);

      expect(Factory.definition(options, 'foo', { type: 'boolean' })).toBeInstanceOf(BoolDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'enum',
        valueType: 'string',
        values: ['foo'],
      })).toBeInstanceOf(EnumDefinition);

      expect(Factory.definition(options, 'foo', { type: 'function' })).toBeInstanceOf(FuncDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'instance',
        contract: 'foo',
      })).toBeInstanceOf(InstanceDefinition);

      expect(Factory.definition(options, 'foo', { type: 'number' })).toBeInstanceOf(NumberDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'object',
        keyType: 'string',
        valueType: 'number',
      })).toBeInstanceOf(ObjectDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'shape',
        attributes: { foo: 'string' },
      })).toBeInstanceOf(ShapeDefinition);

      expect(Factory.definition(options, 'foo', { type: 'string' })).toBeInstanceOf(StringDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'union',
        valueTypes: ['string'],
      })).toBeInstanceOf(UnionDefinition);
    });

    it('factories definition objects using aliases', () => {
      expect(Factory.definition(options, 'foo', { type: 'bool' })).toBeInstanceOf(BoolDefinition);

      expect(Factory.definition(options, 'foo', { type: 'func' })).toBeInstanceOf(FuncDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'inst',
        contract: 'foo',
      })).toBeInstanceOf(InstanceDefinition);

      expect(Factory.definition(options, 'foo', { type: 'integer' })).toBeInstanceOf(NumberDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'OBJ',
        keyType: 'string',
        valueType: 'number',
      })).toBeInstanceOf(ObjectDefinition);

      expect(Factory.definition(options, 'foo', {
        type: 'StrucT',
        attributes: { foo: 'string' },
      })).toBeInstanceOf(ShapeDefinition);
    });
  });

  describe('renderer()', () => {
    it('factories renderer objects', () => {
      expect(Factory.renderer({
        ...options,
        renderer: 'flow',
      })).toBeInstanceOf(FlowRenderer);

      expect(Factory.renderer({
        ...options,
        renderer: 'ReAcT',
      })).toBeInstanceOf(ReactRenderer);

      expect(Factory.renderer({
        ...options,
        renderer: 'TYPESCRIPT',
      })).toBeInstanceOf(TypeScriptRenderer);
    });

    it('errors for invalid renderer', () => {
      expect(() => Factory.renderer({
        ...options,
        renderer: 'foo',
      })).toThrowError('Renderer "foo" not supported.');
    });
  });
});
