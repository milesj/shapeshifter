import Builder from '../../src/Builder';
import TypeScriptRenderer from '../../src/renderers/TypeScript';
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
import { options } from '../mocks';

describe('TypeScriptRenderer', () => {
  let renderer: TypeScriptRenderer;

  beforeEach(() => {
    renderer = new TypeScriptRenderer(
      {
        ...options,
        renderers: ['typescript'],
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

    renderer.beforeParse();
  });

  describe('beforeParse()', () => {
    it('does not change suffix if not inferring', () => {
      renderer.beforeParse();

      expect(renderer.suffix).toBe('Interface');
    });

    it('does not change suffix if no prop types', () => {
      renderer.options.inferPropTypesShape = true;
      renderer.beforeParse();

      expect(renderer.suffix).toBe('Interface');
    });

    it('changes suffix if inferring prop types', () => {
      renderer.options.inferPropTypesShape = true;
      renderer.options.renderers.push('prop-types');
      renderer.beforeParse();

      expect(renderer.suffix).toBe('Shape');
    });

    it('doesnt set suffix', () => {
      renderer.suffix = ''; // Reset
      renderer.options.suffix = false;
      renderer.beforeParse();

      expect(renderer.suffix).toBe('');
    });
  });

  describe('renderArray()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderArray(
          new ArrayDefinition(options, 'foo', {
            nullable: true,
            valueType: 'string',
          }),
          0,
        ),
      ).toBe('Array<string> | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderArray(
          new ArrayDefinition(options, 'foo', {
            nullable: false,
            valueType: {
              type: 'string',
              nullable: false,
            },
          }),
          0,
        ),
      ).toBe('Array<string>');
    });

    it('handles non-primitive', () => {
      expect(
        renderer.renderArray(
          new ArrayDefinition(options, 'foo', {
            valueType: {
              type: 'object',
              valueType: 'string',
            },
          }),
          0,
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
          0,
        ),
      ).toBe('Array<FooBar>');
    });

    it('defaults value to any', () => {
      const def = new ArrayDefinition(options, 'foo', {
        valueType: 'string',
      });

      // @ts-expect-error
      delete def.valueType;

      expect(renderer.renderArray(def, 0)).toBe('Array<any>');
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
      ).toBe('boolean | null');
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
          new EnumDefinition(options, 'bar', {
            valueType: 'number',
            values: [1, 23, 164],
          }),
          0,
        ),
      ).toBe('FooBarEnum');
    });

    it('renders a union', () => {
      renderer.options.enums = false;

      expect(
        renderer.renderEnum(
          new EnumDefinition(options, 'bar', {
            valueType: 'number',
            values: [1, 23, 164],
          }),
          0,
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
      ).toBe('FooBar | null');
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
      ).toBe('Key | null');

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
      ).toBe('number | null');
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
          0,
        ),
      ).toBe('{ [key: string]: number } | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderObject(
          new ObjectDefinition(options, 'foo', {
            nullable: false,
            valueType: 'number',
          }),
          0,
        ),
      ).toBe('{ [key: string]: number }');
    });

    it('handles key type', () => {
      expect(
        renderer.renderObject(
          new ObjectDefinition(options, 'foo', {
            keyType: 'number',
            valueType: {
              type: 'array',
              valueType: 'string',
            },
          }),
          0,
        ),
      ).toBe('{ [key: number]: Array<string> }');
    });

    it('defaults key to string', () => {
      const def = new ObjectDefinition(options, 'foo', {
        keyType: 'number',
        valueType: 'string',
      });

      // @ts-expect-error
      delete def.keyType;

      expect(renderer.renderObject(def, 0)).toBe('{ [key: string]: string }');
    });

    it('defaults value to any', () => {
      const def = new ObjectDefinition(options, 'foo', {
        keyType: 'number',
        valueType: 'string',
      });

      // @ts-expect-error
      delete def.valueType;

      expect(renderer.renderObject(def, 0)).toBe('{ [key: number]: any }');
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
      ).toBe('FooInterface | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderReference(
          new ReferenceDefinition(options, 'foo', {
            nullable: false,
            self: true,
          }),
        ),
      ).toBe('FooInterface');
    });

    it('renders with no suffix', () => {
      renderer.suffix = '';

      expect(
        renderer.renderReference(
          new ReferenceDefinition(options, 'foo', {
            nullable: false,
            self: true,
          }),
        ),
      ).toBe('Foo');
    });
  });

  describe('renderSchema()', () => {
    it('renders with generics', () => {
      renderer.options.schemaGenerics = true;

      expect(
        renderer.renderSchema('QuxSchema', [], {
          resourceName: 'quxs',
        }),
      ).toBe("export const quxSchema = new Schema<QuxInterface>('quxs');");
    });

    it('renders with generics and no suffix', () => {
      renderer.options.schemaGenerics = true;
      renderer.suffix = '';

      expect(
        renderer.renderSchema('QuxSchema', [], {
          resourceName: 'quxs',
        }),
      ).toBe("export const quxSchema = new Schema<Qux>('quxs');");
    });
  });

  describe('renderShape()', () => {
    it('defaults to object if no attributes', () => {
      const def = new ShapeDefinition(options, 'foo', {
        attributes: { foo: 'string' },
      });

      // @ts-expect-error
      delete def.attributes;

      expect(renderer.renderShape(def, 0)).toBe('{ [key: string]: any }');
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
      ).toBe('string | null');
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
    const valueTypes = [
      'string',
      { type: 'bool' },
      {
        type: 'array',
        valueType: 'number',
      },
    ];

    it('renders nullable', () => {
      expect(
        renderer.renderUnion(
          new UnionDefinition(options, 'foo', {
            nullable: true,
            valueTypes,
          }),
          0,
        ),
      ).toBe('string | boolean | Array<number> | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderUnion(
          new UnionDefinition(options, 'foo', {
            nullable: false,
            valueTypes,
          }),
          0,
        ),
      ).toBe('string | boolean | Array<number>');
    });

    it('handles nested unions', () => {
      expect(
        renderer.renderUnion(
          new UnionDefinition(options, 'foo', {
            valueTypes: [
              ...valueTypes,
              {
                type: 'union',
                valueTypes: [
                  {
                    type: 'instance',
                    contract: 'FooBar',
                  },
                ],
              },
            ],
          }),
          0,
        ),
      ).toBe('string | boolean | Array<number> | FooBar');
    });
  });

  describe('wrapNullable()', () => {
    it('renders nullable', () => {
      // @ts-expect-error
      expect(renderer.wrapNullable({ isNullable: () => true }, 'foo')).toBe('foo | null');
    });

    it('renders non-nullable', () => {
      // @ts-expect-error
      expect(renderer.wrapNullable({ isNullable: () => false }, 'foo')).toBe('foo');
    });
  });
});
