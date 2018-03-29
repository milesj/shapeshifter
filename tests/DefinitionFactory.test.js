import DefinitionFactory from '../src/DefinitionFactory';
import ArrayDefinition from '../src/definitions/Array';
import BoolDefinition from '../src/definitions/Bool';
import EnumDefinition from '../src/definitions/Enum';
import InstanceDefinition from '../src/definitions/Instance';
import NumberDefinition from '../src/definitions/Number';
import ObjectDefinition from '../src/definitions/Object';
import ShapeDefinition from '../src/definitions/Shape';
import StringDefinition from '../src/definitions/String';
import UnionDefinition from '../src/definitions/Union';
import { options } from './mocks';

describe('DefinitionFactory', () => {
  describe('factory()', () => {
    it('allows primitives to be passed as strings', () => {
      expect(DefinitionFactory.factory(options, 'foo', 'string')).toBeInstanceOf(StringDefinition);
    });

    it('errors on invalid type', () => {
      expect(() =>
        DefinitionFactory.factory(options, 'foo', { type: 'fakedefinition' }),
      ).toThrowError('Type "fakedefinition" not supported.');
    });

    it('errors on invalid primitives', () => {
      expect(() => DefinitionFactory.factory(options, 'foo', 'array')).toThrowError(
        'Invalid primitive type "array".',
      );

      expect(() => DefinitionFactory.factory(options, 'foo', 'bar')).toThrowError(
        'Invalid primitive type "bar".',
      );
    });

    it('errors on missing object type', () => {
      expect(() => DefinitionFactory.factory(options, 'foo', { noType: 'hah' })).toThrowError(
        'Definitions require a "type" property.',
      );

      expect(() => DefinitionFactory.factory(options, 'foo', { type: '' })).toThrowError(
        'Definitions require a "type" property.',
      );
    });

    it('factories definition objects', () => {
      expect(
        DefinitionFactory.factory(options, 'foo', {
          type: 'array',
          valueType: 'string',
        }),
      ).toBeInstanceOf(ArrayDefinition);

      expect(DefinitionFactory.factory(options, 'foo', { type: 'boolean' })).toBeInstanceOf(
        BoolDefinition,
      );

      expect(
        DefinitionFactory.factory(options, 'foo', {
          type: 'enum',
          valueType: 'string',
          values: ['foo'],
        }),
      ).toBeInstanceOf(EnumDefinition);

      expect(
        DefinitionFactory.factory(options, 'foo', {
          type: 'instance',
          contract: 'foo',
        }),
      ).toBeInstanceOf(InstanceDefinition);

      expect(DefinitionFactory.factory(options, 'foo', { type: 'number' })).toBeInstanceOf(
        NumberDefinition,
      );

      expect(
        DefinitionFactory.factory(options, 'foo', {
          type: 'object',
          keyType: 'string',
          valueType: 'number',
        }),
      ).toBeInstanceOf(ObjectDefinition);

      expect(
        DefinitionFactory.factory(options, 'foo', {
          type: 'shape',
          attributes: { foo: 'string' },
        }),
      ).toBeInstanceOf(ShapeDefinition);

      expect(DefinitionFactory.factory(options, 'foo', { type: 'string' })).toBeInstanceOf(
        StringDefinition,
      );

      expect(
        DefinitionFactory.factory(options, 'foo', {
          type: 'union',
          valueTypes: ['string'],
        }),
      ).toBeInstanceOf(UnionDefinition);
    });

    it('factories definition objects using aliases', () => {
      expect(DefinitionFactory.factory(options, 'foo', { type: 'bool' })).toBeInstanceOf(
        BoolDefinition,
      );

      expect(
        DefinitionFactory.factory(options, 'foo', {
          type: 'inst',
          contract: 'foo',
        }),
      ).toBeInstanceOf(InstanceDefinition);

      expect(DefinitionFactory.factory(options, 'foo', { type: 'integer' })).toBeInstanceOf(
        NumberDefinition,
      );

      expect(
        DefinitionFactory.factory(options, 'foo', {
          type: 'OBJ',
          keyType: 'string',
          valueType: 'number',
        }),
      ).toBeInstanceOf(ObjectDefinition);

      expect(
        DefinitionFactory.factory(options, 'foo', {
          type: 'StrucT',
          attributes: { foo: 'string' },
        }),
      ).toBeInstanceOf(ShapeDefinition);
    });
  });
});
