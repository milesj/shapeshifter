import Builder from '../../src/Builder';
import FlowRenderer from '../../src/renderers/Flow';
import ArrayDefinition from '../../src/definitions/Array';
import BoolDefinition from '../../src/definitions/Bool';
import EnumDefinition from '../../src/definitions/Enum';
import InstanceDefinition from '../../src/definitions/Instance';
import KeyDefinition from '../../src/definitions/Key';
import NumberDefinition from '../../src/definitions/Number';
import ObjectDefinition from '../../src/definitions/Object';
import ReferenceDefinition from '../../src/definitions/Reference';
import StringDefinition from '../../src/definitions/String';
import UnionDefinition from '../../src/definitions/Union';
import ShapeDefinition from '../../src/definitions/Shape';
import Schematic from '../../src/Schematic';
import { options } from '../../../../tests/mocks';

describe('FlowRenderer', () => {
  let renderer;

  beforeEach(() => {
    renderer = new FlowRenderer(
      {
        ...options,
        renderers: ['flow'],
      },
      new Builder(),
      new Schematic(
        '/foo.json',
        {
          name: 'Foo',
          attributes: { id: 'number' },
        },
        options,
      ),
    );
  });

  describe('beforeParse()', () => {
    it('adds flow comment', () => {
      renderer.beforeParse();

      expect(Array.from(renderer.builder.comments)).toEqual(['/* @flow */']);
    });
  });

  describe('renderArray()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderArray(
          new ArrayDefinition(options, 'foo', {
            nullable: true,
            valueType: {
              type: 'string',
              nullable: true,
            },
          }),
        ),
      ).toBe('?Array<?string>');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderArray(
          new ArrayDefinition(options, 'foo', {
            nullable: false,
            valueType: 'string',
          }),
        ),
      ).toBe('Array<string>');
    });

    it('handles non-primitive', () => {
      expect(
        renderer.renderArray(
          new ArrayDefinition(options, 'foo', {
            valueType: {
              nullable: false,
              type: 'object',
              valueType: {
                type: 'string',
                nullable: false,
              },
            },
          }),
        ),
      ).toBe('Array<{ [key: string]: string }>');
    });

    it('handles instance ofs', () => {
      expect(
        renderer.renderArray(
          new ArrayDefinition(options, 'foo', {
            valueType: {
              type: 'instance',
              contract: 'FooBar',
            },
          }),
        ),
      ).toBe('Array<FooBar>');
    });

    it('defaults value to any', () => {
      const def = new ArrayDefinition(options, 'foo', {
        keyType: 'number',
        valueType: 'string',
      });

      delete def.valueType;

      expect(renderer.renderArray(def)).toBe('Array<any>');
    });
  });

  describe('renderBool()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderBool(
          new BoolDefinition(options, 'foo', {
            nullable: true,
          }),
        ),
      ).toBe('?boolean');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderBool(
          new BoolDefinition(options, 'foo', {
            nullable: false,
          }),
        ),
      ).toBe('boolean');
    });
  });

  describe('renderEnum()', () => {
    it('renders', () => {
      expect(
        renderer.renderEnum(
          new EnumDefinition(options, 'foo', {
            valueType: 'number',
            values: [1, 23, 164],
          }),
        ),
      ).toBe('1 | 23 | 164');
    });
  });

  describe('renderInstance()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderInstance(
          new InstanceDefinition(options, 'foo', {
            nullable: true,
            contract: 'FooBar',
          }),
        ),
      ).toBe('?FooBar');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderInstance(
          new InstanceDefinition(options, 'foo', {
            nullable: false,
            contract: 'FooBar',
          }),
        ),
      ).toBe('FooBar');
    });
  });

  describe('renderKey()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderKey(
          new KeyDefinition(options, 'foo', {
            nullable: true,
          }),
        ),
      ).toBe('?Key');

      expect(Array.from(renderer.builder.header)).toEqual(['export type Key = string | number;']);
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderKey(
          new KeyDefinition(options, 'foo', {
            nullable: false,
          }),
        ),
      ).toBe('Key');

      expect(Array.from(renderer.builder.header)).toEqual(['export type Key = string | number;']);
    });
  });

  describe('renderNumber()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderNumber(
          new NumberDefinition(options, 'foo', {
            nullable: true,
          }),
        ),
      ).toBe('?number');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderNumber(
          new NumberDefinition(options, 'foo', {
            nullable: false,
          }),
        ),
      ).toBe('number');
    });
  });

  describe('renderObject()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderObject(
          new ObjectDefinition(options, 'foo', {
            nullable: true,
            valueType: 'number',
          }),
        ),
      ).toBe('?{ [key: string]: number }');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderObject(
          new ObjectDefinition(options, 'foo', {
            nullable: false,
            valueType: 'number',
          }),
        ),
      ).toBe('{ [key: string]: number }');
    });

    it('handles key type', () => {
      expect(
        renderer.renderObject(
          new ObjectDefinition(options, 'foo', {
            nullable: false,
            keyType: 'number',
            valueType: {
              type: 'array',
              valueType: 'string',
            },
          }),
        ),
      ).toBe('{ [key: number]: Array<string> }');
    });

    it('defaults key to string', () => {
      const def = new ObjectDefinition(options, 'foo', {
        keyType: 'number',
        valueType: 'string',
      });

      delete def.keyType;

      expect(renderer.renderObject(def)).toBe('{ [key: string]: string }');
    });

    it('defaults value to any', () => {
      const def = new ObjectDefinition(options, 'foo', {
        keyType: 'number',
        valueType: 'string',
      });

      delete def.valueType;

      expect(renderer.renderObject(def)).toBe('{ [key: number]: any }');
    });
  });

  describe('renderReference()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderReference(
          new ReferenceDefinition(options, 'foo', {
            nullable: true,
            self: true,
          }),
        ),
      ).toBe('?FooType');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderReference(
          new ReferenceDefinition(options, 'foo', {
            nullable: false,
            self: true,
          }),
        ),
      ).toBe('FooType');
    });
  });

  describe('renderSchema()', () => {
    it('renders with generics', () => {
      renderer.options.schemaGenerics = true;

      expect(
        renderer.renderSchema('QuxSchema', [], {
          resourceName: 'quxs',
        }),
      ).toBe("export const quxSchema = new Schema<QuxType>('quxs');");
    });
  });

  describe('renderShape()', () => {
    it('defaults to object if no attributes', () => {
      const def = new ShapeDefinition(options, 'foo', {
        attributes: { foo: 'string' },
      });

      delete def.attributes;

      expect(renderer.renderShape(def)).toBe('{ [key: string]: any }');
    });
  });

  describe('renderString()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderString(
          new StringDefinition(options, 'foo', {
            nullable: true,
          }),
        ),
      ).toBe('?string');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderString(
          new StringDefinition(options, 'foo', {
            nullable: false,
          }),
        ),
      ).toBe('string');
    });
  });

  describe('renderUnion()', () => {
    const valueTypes: any[] = [
      'string',
      { type: 'bool' },
      {
        type: 'array',
        valueType: {
          type: 'number',
          nullable: true,
        },
      },
    ];

    it('renders nullable', () => {
      expect(
        renderer.renderUnion(
          new UnionDefinition(options, 'foo', {
            nullable: true,
            valueTypes,
          }),
        ),
      ).toBe('string | boolean | Array<?number> | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderUnion(
          new UnionDefinition(options, 'foo', {
            nullable: false,
            valueTypes,
          }),
        ),
      ).toBe('string | boolean | Array<?number>');
    });

    it('handles nested unions', () => {
      valueTypes.push({
        type: 'union',
        valueTypes: [
          {
            type: 'instance',
            contract: 'FooBar',
            nullable: false,
          },
        ],
      });

      expect(
        renderer.renderUnion(
          new UnionDefinition(options, 'foo', {
            nullable: true,
            valueTypes,
          }),
        ),
      ).toBe('string | boolean | Array<?number> | FooBar | null');
    });
  });

  describe('wrapNullable()', () => {
    it('renders nullable', () => {
      expect(renderer.wrapNullable({ isNullable: () => true }, 'foo')).toBe('?foo');
    });

    it('renders non-nullable', () => {
      expect(renderer.wrapNullable({ isNullable: () => false }, 'foo')).toBe('foo');
    });
  });
});
